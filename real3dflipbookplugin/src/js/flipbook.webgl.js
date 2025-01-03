/*
 * Real3D FlipBook [https://real3dflipbook.com]
 * @author creativeinteractivemedia [https://codecanyon.net/user/creativeinteractivemedia/portfolio]
 * @version 3.50
 * @date 2024-07-04
 */
var FLIPBOOK = FLIPBOOK || {};

{
    /* FLIPBOOK.PageWebGL */
    FLIPBOOK.PageWebGL = function (book, i, hard, options, preloaderMatF, preloaderMatB) {
        THREE.Object3D.call(this);
        this.book = book;
        this.index = i;
        this.pW = options.pageWidth;
        this.pH = options.pageHeight;
        this.nfacesw = options.pageSegmentsW;
        this.nfacesh = options.pageSegmentsH;
        this.mats = [];
        this.pageHardness = hard;
        this.pageThickness = hard;
        this.duration = options.pageFlipDuration;
        this.angle = 0;
        this.force = 10;
        this.offset = 0;
        this.to = null;
        this.mod = null;
        this.bend = null;
        this.pivot = null;
        this.isFlippedLeft = false;
        this.isFlippedRight = true;
        this.flippingLeft = false;
        this.flippingRight = false;
        this.options = options;

        var index = options.rightToLeft ? options.pages.length / 2 - this.index - 1 : this.index;
        this.indexF = options.rightToLeft ? 2 * index + 1 : 2 * index;
        this.indexB = options.rightToLeft ? 2 * index : 2 * index + 1;
        this.showing = false;
        this.preloaderMatF = preloaderMatF;
        this.preloaderMatB = preloaderMatB;

        this.preloaderMatF = preloaderMatF;
        this.preloaderMatB = preloaderMatB;

        this.htmlLoaded = {
            front: false,
            back: false,
        };

        var self = this;

        if (i == 0 && this.options.cornerCurl) {
            this.nfacesw = 20;
            this.nfacesh = 20;
            var obj = { force: 0 };
            this.cornerCurlTween = new FLIPBOOK.TWEEN.Tween(obj)
                .to({ force: 0.01 }, 1000)
                .yoyo(true)
                .repeat(Infinity)
                .easing(FLIPBOOK.TWEEN.Easing.Sinusoidal.InOut)
                .onUpdate(function (f) {
                    if (self.cornerCurl) {
                        self.b2.force = f * -1.8;
                        self.modF.apply();
                        self.book.needsUpdate = true;
                    }
                })
                .start();
        }

        this.gF = new THREE.BoxGeometry(this.pW, this.pH, 0.01, this.nfacesw, this.nfacesh, 0);
        var basicMat = new THREE.MeshBasicMaterial({
            color: 0xededed,
        });
        var mats = [basicMat, basicMat, basicMat, basicMat, preloaderMatF, preloaderMatB];

        var mats2;
        mats2 = [basicMat, basicMat, basicMat, basicMat, basicMat, basicMat];

        if (this.options.pagePreloader) {
            mats2 = [basicMat, basicMat, basicMat, basicMat, preloaderMatF, preloaderMatB];
        }

        this.cube = new THREE.Mesh(this.gF, mats);
        this.cube.position.x = this.pW * 0.5;
        if (this.options.shadows) {
            this.cube.castShadow = true;
            this.cube.receiveShadow = true;
        }

        this.gF.faceVertexUvs[1] = this.gF.faceVertexUvs[0];

        this.showMat();

        this.cubeEmpty = new THREE.Mesh(new THREE.BoxGeometry(this.pW, this.pH, 0.01, 1, 1, 0), mats2);

        this.cubeEmpty.position.x = this.pW * 0.5;

        this.pageFlippedAngle = (Math.PI * this.options.pageFlippedAngle) / 180;

        this.bendF = new MOD3.Bend(0, 0, 0);
        this.bendF.constraint = MOD3.ModConstant.LEFT;
        if (this.pH > this.pW) {
            this.bendF.switchAxes = true;
        }

        this.b2 = new MOD3.Bend(0, 0, 0);
        this.b2.constraint = MOD3.ModConstant.LEFT;
        if (this.pH > this.pW) {
            this.b2.switchAxes = true;
        }
        this.b2.offset = 0.98;
        this.b2.setAngle(1);

        this.modF = new MOD3.ModifierStack(new MOD3.LibraryThree(), this.cube);
        this.modF.addModifier(this.bendF);

        if (i == 0 && this.options.cornerCurl) {
            this.modF.addModifier(this.b2);
        }

        this.modF.apply();
    };

    FLIPBOOK.PageWebGL.prototype = new THREE.Object3D();
    FLIPBOOK.PageWebGL.prototype.constructor = FLIPBOOK.PageWebGL;

    FLIPBOOK.PageWebGL.prototype.startCornerCurl = function () {
        this.cornerCurl = true;
    };

    FLIPBOOK.PageWebGL.prototype.stopCornerCurl = function () {
        this.cornerCurl = false;
        this.b2.force = 0;
        this.modF.apply();
    };

    FLIPBOOK.PageWebGL.prototype.loadHTML = async function (side, callback) {
        var index = side == 'front' ? this.indexF : this.indexB;
        var self = this;

        if (!this.htmlLoaded[side]) {
            this.options.main.loadPageHTML(index, function (_) {
                self.htmlLoaded[side] = true;
                callback.call(self);
            });
        } else {
            callback.call(this);
        }
    };

    FLIPBOOK.PageWebGL.prototype.load = function (side, callback, _) {
        var main = this.book.main;

        if (!main.wrapperH) {
            return;
        }
        if (!main.zoom) {
            return;
        }

        var self = this;
        var options = this.book.options;

        this.disposed = false;

        var o = options;
        var pageSize = main.wrapperH * main.zoom;
        var size = pageSize < o.pageTextureSizeSmall * 0.8 ? o.pageTextureSizeSmall : o.pageTextureSize;

        if (side == 'front') {
            if (!this.options.cover && this.index == 0) {
                return;
            }

            if (this.sizeFront >= size) {
                if (callback) {
                    callback.call(this);
                }
            } else {
                this.options.main.loadPage(this.indexF, size, function (page) {
                    if (!page) {
                        if (callback) {
                            callback.call(self);
                        }
                        return;
                    }

                    if (self.sizeFront == size) {
                        if (callback) {
                            callback.call(self);
                        }
                        return;
                    }

                    self.sizeFront = size;

                    var t1;

                    if (page.imageBitmap) {
                        t1 = new THREE.CanvasTexture(page.imageBitmap);
                    } else {
                        t1 = new THREE.Texture();

                        t1.image = page.image[size] || page.image;
                    }

                    t1.minFilter = THREE.LinearFilter;

                    t1.needsUpdate = true;

                    var pageIndex = 2 * self.index;
                    if (!self.options.cover) {
                        pageIndex--;
                    }

                    if (self.options.pages[pageIndex].side == 'left') {
                        t1.repeat.x = 0.5;
                    } else if (self.options.pages[pageIndex].side == 'right') {
                        t1.repeat.x = 0.5;
                        t1.offset.x = 0.5;
                    }
                    self.frontMaterial = self.createMaterial(t1);

                    self.setFrontMat(self.frontMaterial);
                    if (callback) {
                        callback.call(self);
                    }
                });
            }
        } else if (side == 'back') {
            if (!this.options.cover && this.index == this.book.pages.length - 1) {
                return;
            }

            if (this.sizeBack >= size) {
                if (callback) {
                    callback.call(this);
                }
            } else {
                this.options.main.loadPage(this.indexB, size, function (page) {
                    if (!page) {
                        if (callback) {
                            callback.call(self);
                        }
                        return;
                    }

                    if (self.sizeBack == size) {
                        if (callback) {
                            callback.call(self);
                        }
                        return;
                    }

                    self.sizeBack = size;

                    self.loadedBack = true;

                    var t2;
                    if (page.imageBitmap) {
                        t2 = new THREE.CanvasTexture(page.imageBitmap);
                    } else {
                        t2 = new THREE.Texture();

                        t2.image = page.image[size] ? page.image[size].clone || page.image[size] : page.image;
                    }

                    t2.minFilter = THREE.LinearFilter;

                    t2.needsUpdate = true;

                    var pageIndex = 2 * self.index + 1;
                    if (!self.options.cover) {
                        pageIndex--;
                    }

                    if (self.options.pages[pageIndex].side == 'left') {
                        t2.repeat.x = 0.5;
                    } else if (self.options.pages[pageIndex].side == 'right') {
                        t2.repeat.x = 0.5;
                        t2.offset.x = 0.5;
                    }
                    self.backMaterial = self.createMaterial(t2, 'back');
                    self.setBackMat(self.backMaterial);

                    if (callback) {
                        callback.call(self);
                    }
                });
            }
        }
    };

    FLIPBOOK.PageWebGL.prototype.unload = function (side) {
        var mat;
        var t;

        if (side == 'front' && this.sizeFront) {
            mat = this.cube.material[4];
            t = mat.map;
            mat.dispose();

            if (t) {
                t.dispose();
            }

            this.sizeFront = 0;
            this.setFrontMat(this.preloaderMatF);
        } else if (side == 'back' && this.sizeBack) {
            mat = this.cube.material[5];
            t = mat.map;
            mat.dispose();

            if (t) {
                t.dispose();
            }

            this.sizeBack = 0;
            this.setBackMat(this.preloaderMatB);
        }
    };

    FLIPBOOK.PageWebGL.prototype.disposeMat = function () {
        if (!this.loaded) {
            return;
        }

        var matF = this.cube.material[4];
        var matB = this.cube.material[5];
        var tF = matF.map;
        var tB = matB.map;
        matF.dispose();
        matB.dispose();

        if (tF) {
            tF.dispose();
        }
        if (tB) {
            tB.dispose();
        }

        this.disposed = true;
        this.loaded = false;
    };

    FLIPBOOK.PageWebGL.prototype.createMaterial = function (map, side) {
        var mat;
        if (this.options.lights) {
            var sTexture = side == 'back' ? this.book.specularB : this.book.specularF;
            var o = this.options;
            mat = new THREE.MeshStandardMaterial({
                map: map,
                roughness: o.pageRoughness,
                metalness: o.pageMetalness,
                emissive: 0x000000,
                color: 0xffffff,
                lightMap: sTexture,
            });
        } else {
            mat = new THREE.MeshBasicMaterial({
                map: map,
            });
        }
        return mat;
    };

    FLIPBOOK.PageWebGL.prototype._setAngle = function (angle) {
        if (angle <= 180 && angle >= -180) {
            angle = (angle / 180) * Math.PI;

            if (angle < 0) {
                angle = angle + Math.PI;
            }

            if (this.angle == angle) {
                return;
            }

            this.angle = angle;
            this.rotation.y = -angle;

            if (this.isFlippedLeft) {
                this.bendF.force =
                    (1.35 * Math.pow(-Math.abs(Math.cos(-angle / 2)), 1)) / Math.pow(this.pageHardness, 1.5);
            } else {
                this.bendF.force =
                    (1.35 * Math.pow(Math.abs(Math.sin(-angle / 2)), 1)) / Math.pow(this.pageHardness, 1.5);
            }

            this.updateBend();

            if (this.book.htmlLayerVisible && Math.abs(angle) > 0.03) {
                this.book._hideHTMLPage(this.book.pageL);
                this.book._hideHTMLPage(this.book.pageR);
                this.book._hideHTMLPage(this.book.pageC);
                this.book._emptyHTMLPage(this.book.pageRInner);
                this.book._emptyHTMLPage(this.book.pageLInner);
                this.book._emptyHTMLPage(this.book.pageCInner);
                this.book.htmlLayerVisible = false;

                this.book.main.trigger('hidepagehtml', { page: this });
            }

            this.book.needsUpdate = true;

            this.book.correctZOrder();
        }
    };

    FLIPBOOK.PageWebGL.prototype.updateBend = function () {
        if (Math.abs(this.bendF.force) < 0.0001) {
            this.bendF.force = 0;
        }
        if (this.bendForce == this.bendF.force) {
            return;
        }

        this.bendForce == this.bendF.force;

        this.stopCornerCurl();
        this.modF.apply();
        this.gF.computeFaceNormals();
        this.gF.computeVertexNormals(true);
        this.book.correctZOrder();
        this.book.needsUpdate = true;
    };

    FLIPBOOK.PageWebGL.prototype.flipLeft = function (onComplete) {
        this.onComplete = onComplete;
        this.dragging = false;
        if (!this.isFlippedLeft && !this.flippingLeft && !this.flippingRight && this.index == this.book.flippedleft) {
            if (this.duration > 0) {
                this.flippingLeft = true;
                this.flipping = true;
                this.force = 0;
                this.to = {
                    angle: this.rotation.y,
                    t: -1,
                    xx: 0,
                    thiss: this,
                    force: this.force,
                    offset: this.offset,
                };
                this.bendIn(-Math.PI);
            } else {
                this.rotation.y = -Math.PI;
                this.flippingLeft = false;
                this.isFlippedLeft = true;
                this.flippingRight = false;
                this.isFlippedRight = false;
            }
        }
    };

    FLIPBOOK.PageWebGL.prototype.flipLeftInstant = function (onComplete) {
        this.onComplete = onComplete;
        this.dragging = false;

        if (!this.isFlippedLeft && !this.flippingLeft && !this.flippingRight && this.index == this.book.flippedleft) {
            this.thiss = this;
            this.xx = 0;
            this.angle = -Math.PI;
            this.flippingLeft = true;
            this.isFlippedLeft = false;
            this.renderFlip();
            this.flippingLeft = false;
            this.isFlippedLeft = true;
            this.flippingRight = false;
            this.isFlippedRight = false;

            this.flipFinished();
        }
    };

    FLIPBOOK.PageWebGL.prototype.hideMat = function () {
        if (this.showing) {
            this.remove(this.cube);
            this.add(this.cubeEmpty);
            this.showing = false;
        }
    };

    FLIPBOOK.PageWebGL.prototype.showMat = function () {
        if (!this.showing) {
            this.add(this.cube);
            this.remove(this.cubeEmpty);
            this.showing = true;
            this.book.needsUpdate = true;
        }
    };

    FLIPBOOK.PageWebGL.prototype.setFrontMat = function (m) {
        if (this.cube.material[4] === m) {
            return;
        }
        this.cube.material[4] = m;
        this.book.needsUpdate = true;
    };

    FLIPBOOK.PageWebGL.prototype.setBackMat = function (m) {
        if (this.cube.material[5] === m) {
            return;
        }
        this.cube.material[5] = m;
        this.book.needsUpdate = true;
    };

    FLIPBOOK.PageWebGL.prototype.flipRightInstant = function (onComplete) {
        this.onComplete = onComplete;
        this.dragging = false;
        if (
            !this.isFlippedRight &&
            !this.flippingRight &&
            !this.flippingLeft &&
            this.index == this.book.getNumPages() - this.book.flippedright - 1
        ) {
            this.thiss = this;
            this.xx = 0;
            this.angle = 0;
            this.flippingRight = true;
            this.isFlippedRight = false;
            this.renderFlip();
            this.flippingLeft = false;
            this.isFlippedLeft = false;
            this.flippingRight = false;
            this.isFlippedRight = true;

            this.flipFinished();
        }
    };

    FLIPBOOK.PageWebGL.prototype.flipRight = function (onComplete) {
        this.onComplete = onComplete;
        this.dragging = false;
        if (
            !this.isFlippedRight &&
            !this.flippingRight &&
            !this.flippingLeft &&
            this.index == this.book.getNumPages() - this.book.flippedright - 1
        ) {
            if (this.duration > 0) {
                this.flippingRight = true;
                this.flipping = true;

                this.force = 0;
                this.to = {
                    angle: this.rotation.y,
                    t: -1,
                    xx: 0,
                    thiss: this,
                    force: this.force,
                    offset: this.offset,
                };
                this.bendIn(0);
            } else {
                this.rotation.y = 0;
                this.flippingLeft = false;
                this.isFlippedLeft = false;
                this.flippingRight = false;
                this.isFlippedRight = true;
            }
        }
    };

    FLIPBOOK.PageWebGL.prototype.bendIn = function (angle) {
        this.bendF.force = 0.0;
        this.bendF.offset = 0.0;

        this.updateBend();

        var time1 = 2 * this.duration * 240 * Math.pow(Math.abs(this.rotation.y - angle) / Math.PI, 0.5);

        time1 *= Math.pow(this.pageHardness, 0.25);

        time1 *= 1 + this.pageHardness / 30;

        new FLIPBOOK.TWEEN.Tween(this.to)
            .to(
                {
                    angle: angle,
                    xx: 1,
                    t: 1,
                },
                time1
            )
            .easing(FLIPBOOK.TWEEN.Easing.Sinusoidal.In)
            .onUpdate(this.renderFlip)
            .onComplete(this.bendOut)
            .start();

        this.options.main.turnPageStart();
    };

    FLIPBOOK.PageWebGL.prototype.bendOut = function () {
        //tween bend.force to 0
        var self = this.thiss;
        var time = self.duration * Math.pow(Math.abs(self.bendF.force), 0.5) * 1000;

        new FLIPBOOK.TWEEN.Tween(self.bendF)
            .to(
                {
                    force: 0,
                    offset: 1,
                },
                time
            )
            .easing(FLIPBOOK.TWEEN.Easing.Sinusoidal.Out)
            .onUpdate(function () {
                self.updateBend();
            })
            .onComplete(function () {
                self.flipFinished(self);
            })
            .start();

        self.book.correctZOrder();
    };
    FLIPBOOK.PageWebGL.prototype.modApply = function () {
        this.thiss.bendF.force = this.thiss.bendB.force = this.force;
        this.thiss.bendF.offset = this.thiss.bendB.offset = this.offset;
        this.thiss.updateBend();
    };
    FLIPBOOK.PageWebGL.prototype.renderFlip = function () {
        this.thiss._setAngle((-this.angle * 180) / Math.PI);
    };
    FLIPBOOK.PageWebGL.prototype.flipFinished = function () {
        var self = this;

        if (self.flippingLeft) {
            self.flippingLeft = false;
            self.isFlippedLeft = true;
            self.flippingRight = false;
            self.isFlippedRight = false;
        } else if (self.flippingRight) {
            self.flippingLeft = false;
            self.isFlippedRight = true;
            self.flippingRight = false;
            self.isFlippedLeft = false;
        }

        self.bendF.force = 0.0;
        self.bendF.offset = 0.0;
        self.updateBend();
        self.flipping = false;
        self.dragging = false;
        if (typeof self.onComplete != 'undefined') {
            self.onComplete(self);
        }
        self.book.flipFinnished();
    };
    FLIPBOOK.PageWebGL.prototype.isFlippedLeft = function () {
        return this.thiss.isFlippedLeft;
    };
    FLIPBOOK.PageWebGL.prototype.isFlippedRight = function () {
        return this.thiss.isFlippedRight;
    };
}

{
    /* FLIPBOOK.BookWebGL */
    FLIPBOOK.BookWebGL = function (el, main, options) {
        this.wrapper = el;
        this.options = options;
        this.main = main;

        this.options.cameraDistance = 2800;

        this.pageW = options.pageWidth;
        this.pageH = options.pageHeight;

        this.pageW = (1000 * options.pageWidth) / options.pageHeight;
        this.pageH = 1000;

        options.pageWidth = this.pageW;
        options.pageHeight = this.pageH;

        this.scroll = options.scroll;
        this.pagesArr = options.pages;
        this.pages = [];
        this.animating = false;

        this.sc = 1;

        var s = this.wrapper.style;
        s.width = '100%';
        s.height = '100%';
        s.position = 'absolute';
        s.overflow = 'hidden';

        this.options.cameraDistance = this.options.cameraDistance / 1.5;
    };

    FLIPBOOK.BookWebGL.prototype = Object.create(FLIPBOOK.Book.prototype);

    FLIPBOOK.BookWebGL.prototype.constructor = FLIPBOOK.BookWebGL;

    FLIPBOOK.BookWebGL.prototype.init3d = function () {
        // WebGL starts here
        var self = this;
        var VIEW_ANGLE = 30;
        var ASPECT = this.main.wrapperW / this.main.wrapperH;
        var NEAR = 1;
        var FAR = 10000;
        var o = this.options;

        //scene
        this.Scene = new THREE.Scene();
        this.centerContainer = new THREE.Object3D();

        // this.centerContainer.position.z = -100;
        // new FLIPBOOK.TWEEN.Tween(this.centerContainer.position)
        //     .to(
        //         {
        //             z: 0,
        //         },
        //         1000
        //     )
        //     .easing(FLIPBOOK.TWEEN.Easing.Sinusoidal.Out)
        //     .onUpdate(function () {
        //         self.needsUpdate = true;
        //     })
        //     .start();

        this.Scene.add(this.centerContainer);
        this.Camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.Scene.add(this.Camera);
        this.zoom = o.zoomMin;
        this.pan = o.pan;
        this.tilt = o.tilt;

        this.updateCameraPosition();

        var container = this.wrapper;
        var c = document.createElement('canvas');
        c.getContext('webgl');

        var renderer = new THREE.WebGLRenderer({
            antialias: this.options.antialias,
            alpha: true,
        });

        window.renderer = renderer;

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        if (this.options.shadows) {
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFShadowMap;
        }

        window.webglrenderer = this.renderer = renderer;
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        var pr = window.devicePixelRatio < o.minPixelRatio ? o.minPixelRatio : window.devicePixelRatio;
        this.renderer.setPixelRatio(pr);
        container.appendChild(this.renderer.domElement);

        var htmlLayer = false;
        var pages = this.options.pages;
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].htmlContent) {
                htmlLayer = true;
            }
        }

        if (htmlLayer || o.pdfMode) {
            this.initHtmlContent();
        }

        this.canvas = this.renderer.domElement;

        if (this.options.lights) {
            var sCol = o.lightColor;
            var sl = new THREE.SpotLight(sCol);
            sl.intensity = o.lightIntensity;
            sl.position.set(o.lightPositionX, o.lightPositionY, o.lightPositionZ);
            sl.distance = 4000;

            if (this.options.shadows) {
                sl.castShadow = true;
                sl.shadow.bias = -0.000002;
                sl.shadow.mapSize.x = this.options.shadowMapSize;
                sl.shadow.mapSize.y = this.options.shadowMapSize;

                var mat = new THREE.ShadowMaterial();
                mat.opacity = this.options.shadowOpacity;

                var bg = new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 1, 1, 1, 1), mat);

                bg.position.set(0, 0, -o.shadowDistance);
                this.Scene.add(bg);
                bg.receiveShadow = true;
            }

            this.Scene.add(sl);
        }

        this.centerContainer.position.set(0, 0, 0);

        this.onResize();

        // align flipBook center container
        this.centerContainer.position.x = -this.pageW * 0.5 * this.centerContainer.scale.x;

        this.updateHtmlLayerPosition();

        this.flippedleft = 0;
        this.flippedright = 0;

        this.cameraZMin = 300;
        this.cameraZMax = 5000;

        (function a() {
            FLIPBOOK.TWEEN.update();
            if (self.rendering) {
                if (!self.enabled) {
                    return;
                }

                if (self.needsUpdate) {
                    self.renderer.render(self.Scene, self.Camera);
                    self.needsUpdate = false;

                    if (self.htmlLayer) {
                        self.cssRenderer.render(self.Scene, self.Camera);
                    }
                }
            }

            requestAnimationFrame(a);
        })();
    };

    FLIPBOOK.BookWebGL.prototype.onPageUnloaded = function (index) {
        var side;
        var sheetIndex = Math.floor(index / 2);
        if (this.options.rightToLeft) {
            sheetIndex = this.pages.length - sheetIndex - 1;
            side = index % 2 == 0 ? 'back' : 'front';
        } else {
            side = index % 2 == 0 ? 'front' : 'back';
        }

        this.pages[sheetIndex].unload(side);
    };

    FLIPBOOK.BookWebGL.prototype.correctZOrder = function () {
        var left = [];
        var right = [];
        for (var i = 0; i < this.pages.length; i++) {
            var page = this.pages[i];
            if (page.angle > Math.PI / 2) {
                left.unshift(page);
            } else {
                right.push(page);
            }
        }
        var th = FLIPBOOK.th();

        left.forEach((page, index) => {
            page.position.z = -Math.pow(index * th, 0.85);
        });

        right.forEach((page, i) => {
            page.position.z = -Math.pow(i * th, 0.85);
        });
    };

    FLIPBOOK.BookWebGL.prototype.initHtmlContent = function () {
        var htmlLayer = document.createElement('div');
        htmlLayer.className = 'htmlLayer ' + Math.random();

        this.pageR = document.createElement('div');
        this.pageR.classList.add('R');
        this.pageR.style.cssText = `
    width: ${(1000 * this.options.pageWidth) / this.options.pageHeight}px;
    height: 1000px;
    position: absolute;
    top: -500px;
    pointer-events: none;
`;
        htmlLayer.appendChild(this.pageR);

        this.pageRInner = document.createElement('div');
        this.pageRInner.style.pointerEvents = 'all';
        this.pageRInner.classList.add('RInner');
        this.pageR.appendChild(this.pageRInner);

        this.pageL = document.createElement('div');
        this.pageL.classList.add('L');
        this.pageL.style.cssText = `
    width: ${(1000 * this.options.pageWidth) / this.options.pageHeight}px;
    height: 1000px;
    position: absolute;
    top: -500px;
    left: ${(-1000 * this.options.pageWidth) / this.options.pageHeight}px;
    pointer-events: none;
`;
        htmlLayer.appendChild(this.pageL);

        this.pageLInner = document.createElement('div');
        this.pageLInner.style.pointerEvents = 'all';
        this.pageLInner.classList.add('LInner');
        this.pageL.appendChild(this.pageLInner);

        this.pageC = document.createElement('div');
        this.pageC.classList.add('C');
        this.pageC.style.cssText = `
    width: ${(2 * 1000 * this.options.pageWidth) / this.options.pageHeight}px;
    height: 1000px;
    position: absolute;
    top: -500px;
    left: ${(-1000 * this.options.pageWidth) / this.options.pageHeight}px;
    pointer-events: none;
`;
        htmlLayer.appendChild(this.pageC);

        this.pageCInner = document.createElement('div');
        this.pageCInner.style.pointerEvents = 'all';
        this.pageCInner.classList.add('CInner');
        this.pageC.appendChild(this.pageCInner);

        this.htmlLayer = new FLIPBOOK.CSS3DObject(htmlLayer);
        this.Scene.add(this.htmlLayer);
        this.cssRenderer = new FLIPBOOK.CSS3DRenderer();
        this.wrapper.appendChild(this.cssRenderer.domElement);
        this.cssRenderer.domElement.style.position = 'absolute';
        this.cssRenderer.domElement.style.top = '0';
        this.cssRenderer.domElement.style.left = '0';
        this.cssRenderer.domElement.style.pointerEvents = 'none';
        this.cssRenderer.domElement.className = 'cssRenderer ' + Math.random();
    };

    FLIPBOOK.BookWebGL.prototype.enablePrev = function (val) {
        this.prevEnabled = val;
    };

    FLIPBOOK.BookWebGL.prototype.enableNext = function (val) {
        this.nextEnabled = val;
    };

    FLIPBOOK.BookWebGL.prototype.isZoomed = function () {
        return this.main.zoom > this.options.zoomMin && this.main.zoom > 1;
    };
    FLIPBOOK.BookWebGL.prototype.getRightPage = function () {
        return this.pages[this.flippedleft];
    };

    FLIPBOOK.BookWebGL.prototype.getNextPage = function () {
        return this.pages[this.flippedleft + 1];
    };

    FLIPBOOK.BookWebGL.prototype.getLeftPage = function () {
        return this.pages[this.flippedleft - 1];
    };

    FLIPBOOK.BookWebGL.prototype.getPrevPage = function () {
        return this.pages[this.flippedleft - 2];
    };

    FLIPBOOK.BookWebGL.prototype.onSwipe = function (e, phase, distanceX, distanceY, duration, fingerCount) {
        if (this.isZoomed()) {
            if (phase == 'start') {
                this._start(e);
            } else if (phase == 'move') {
                this._move(e, distanceX, distanceY);
            } else if (phase == 'end') {
                this._end(e);
            }
            return;
        }

        var left = this.getLeftPage();
        var right = this.getRightPage();
        var next = this.getNextPage();
        var prev = this.getPrevPage();

        if (
            this.options.rotateCameraOnMouseDrag &&
            (!right || !right.dragging) &&
            (!left || !left.dragging) &&
            (this.onMouseMove == 'rotate' || this.onMouseMove == 'scroll')
        ) {
            return;
        }

        if ((phase == 'cancel' || phase == 'end') && fingerCount <= 1) {
            if (this.view == 1 && this.draggingBook && distanceX < 0) {
                this.nextPage();
                this.draggingBook = false;
                return;
            }

            if (this.view == 1 && this.draggingBook && distanceX > 0) {
                this.prevPage();
                this.draggingBook = false;
                return;
            }

            if (distanceX > 0 && (!right || !right.dragging)) {
                this.prevPage();
            } else if (distanceX < 0 && (!left || !left.dragging)) {
                this.nextPage();
            }

            if (right) {
                right.dragging = false;
            }
            if (left) {
                left.dragging = false;
            }
        } else if (phase == 'move' && fingerCount <= 1) {
            if (this.draggingBook) {
                this.centerContainer.position.x = this.draggingBookStartX + distanceX;
                this.updateHtmlLayerPosition();
                return;
            }

            if (this.view == 1 && this.isFocusedLeft() && distanceX < 0 && this.canFlipNext()) {
                this.draggingBookStartX = this.centerContainer.position.x;
                this.draggingBook = true;
                return;
            }

            if (this.view == 1 && this.isFocusedRight() && distanceX > 0) {
                this.draggingBookStartX = this.centerContainer.position.x;
                this.draggingBook = true;
                return;
            }

            distanceX = (180 * distanceX) / this.wrapperW;

            if ((left && left.flipping) || (right && right.flipping)) {
                return;
            }

            if (distanceX > 0 && this.canFlipPrev()) {
                if (left) {
                    left._setAngle(180 - distanceX);
                    left.dragging = true;
                }
                if (right) {
                    right._setAngle(0);
                    right.dragging = false;
                }
                if (prev) {
                    prev.showMat();
                }
                if (next) {
                    next.hideMat();
                }
            } else if (distanceX < 0 && this.canFlipNext()) {
                if (right) {
                    right._setAngle(-distanceX);
                    right.dragging = true;
                }
                if (left) {
                    left._setAngle(180);
                    left.dragging = false;
                }
                if (prev) {
                    prev.hideMat();
                }
                if (next) {
                    next.showMat();
                }
            }
        }
    };
    FLIPBOOK.BookWebGL.prototype.onResize = function () {
        var m = this.main;
        var w = m.wrapperW;
        var h = m.wrapperH;
        var o = this.options;
        var pw = o.pageWidth;
        var ph = o.pageHeight;
        var r1 = w / h;
        var r2 = pw / ph;

        if (h < 1000 && window.devicePixelRatio == 1) {
            this.renderer.setPixelRatio(2);
        } else {
            var pr = window.devicePixelRatio < o.minPixelRatio ? o.minPixelRatio : window.devicePixelRatio;
            this.renderer.setPixelRatio(pr);
        }

        var s = Math.min(this.zoom, 1);

        var zoomMin = Number(o.zoomMin);

        if (o.responsiveView && w <= o.responsiveViewTreshold && r1 < 2 * r2 && r1 < o.responsiveViewRatio) {
            //switch to single page mode
            this.view = 1;

            if (r2 > r1) {
                this.sc = (zoomMin * r1) / (r2 * s);
            } else {
                this.sc = 1;
            }

            if (this.rightIndex == 0 || this.isFocusedRight()) {
                this.focusRight();
            } else {
                this.focusLeft();
            }
        } else {
            this.view = 2;

            if (r1 < 2 * r2) {
                this.sc = (zoomMin * r1) / (2 * r2 * s);
            } else {
                this.sc = 1;
            }

            if (this.flippedleft == 0) {
                this.focusRight();
            } else if (this.flippedright == 0) {
                this.focusLeft();
            } else {
                this.focusBoth();
            }
        }

        this.renderer.setSize(w, h);

        if (this.htmlLayer) {
            this.cssRenderer.setSize(w, h);
            this.htmlLayer.scale.set(this.sc, this.sc, this.sc);
        }

        // update the camera
        this.Camera.aspect = w / h;
        this.Camera.updateProjectionMatrix();
        this.updateCameraPosition();
        this.updateBookPosition();

        this.options.main.turnPageComplete();

        this.wrapperW = w;
        this.wrapperH = h;
    };

    FLIPBOOK.BookWebGL.prototype.updateCameraPosition = function () {
        //tilt
        var angle = (Math.PI * this.tilt) / 180;
        var cameraX = 0;
        var cameraY = (this.options.cameraDistance * Math.sin(angle)) / this.zoom;
        var cameraZ = (this.options.cameraDistance * Math.cos(angle)) / this.zoom;

        var sc = this.sc;

        this.centerContainer.scale.set(sc, sc, sc);

        //pan
        angle = (Math.PI * this.pan) / 180;
        cameraX = Math.sin(angle) * cameraZ;
        cameraZ = Math.cos(angle) * cameraZ;
        this.cameraZ = cameraZ;

        this.Camera.position.set(Math.round(cameraX), Math.round(cameraY), Math.round(cameraZ));

        this.Camera.lookAt(this.Scene.position);

        this.needsUpdate = true;
    };
    FLIPBOOK.BookWebGL.prototype.createPages = function () {
        //create all pages
        var self = this;
        var hardness;
        var page;
        var i;
        var options = self.options;
        var marginW = options.pageMiddleShadowSize;
        var c = document.createElement('canvas');
        c.width = 64;
        c.height = 64;
        var ctx = c.getContext('2d');
        var grd = ctx.createLinearGradient(64 - marginW, 0, 64, 0);
        grd.addColorStop(0, '#AAAAAA');
        grd.addColorStop(1, options.pageMiddleShadowColorL);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 64, 64);
        var t = new THREE.CanvasTexture(c);
        t.needsUpdate = true;
        self.specularB = t;

        var c2 = document.createElement('canvas');
        c2.width = 64;
        c2.height = 64;
        var ctx2 = c2.getContext('2d');
        var grd2 = ctx2.createLinearGradient(0, 0, marginW, 0);
        grd2.addColorStop(0, options.pageMiddleShadowColorR);
        grd2.addColorStop(1, '#AAAAAA');
        ctx2.fillStyle = grd2;
        ctx2.fillRect(0, 0, 64, 64);
        var t2 = new THREE.CanvasTexture(c2);
        t2.needsUpdate = true;
        self.specularF = t2;

        var preloaderMatF;
        var preloaderMatB;

        if (self.options.pagePreloader) {
            var tex = new THREE.TextureLoader().load(self.options.pagePreloader, function () {});

            if (self.options.lights) {
                preloaderMatF = new THREE.MeshStandardMaterial({
                    map: tex,
                    roughness: self.options.pageRoughness,
                    metalness: self.options.pageMetalness,
                    emissive: 0x000000,
                    color: 0xededed,
                    lightMap: self.specularF,
                });
                preloaderMatB = new THREE.MeshStandardMaterial({
                    map: tex,
                    roughness: self.options.pageRoughness,
                    metalness: self.options.pageMetalness,
                    emissive: 0x000000,
                    color: 0xededed,
                    lightMap: self.specularB,
                });
            } else {
                preloaderMatF = preloaderMatB = new THREE.MeshBasicMaterial({
                    map: tex,
                    color: 0xededed,
                });
            }
        } else {
            if (self.options.lights) {
                preloaderMatF = new THREE.MeshStandardMaterial({
                    roughness: self.options.pageRoughness,
                    metalness: self.options.pageMetalness,
                    emissive: 0x000000,
                    color: 0xededed,
                    lightMap: self.specularF,
                });
                preloaderMatB = new THREE.MeshStandardMaterial({
                    roughness: self.options.pageRoughness,
                    metalness: self.options.pageMetalness,
                    emissive: 0x000000,
                    color: 0xededed,
                    lightMap: self.specularB,
                });
            } else {
                preloaderMatF = preloaderMatB = new THREE.MeshBasicMaterial({
                    color: 0xededed,
                });
            }
        }

        FLIPBOOK.th = function () {
            return 2;
        };

        var th = FLIPBOOK.th();

        var p = self.options.pages;
        var numSheets = p.length / 2;
        if (!self.options.cover) {
            numSheets += 1;
        }

        window.b = self.centerContainer;

        for (i = 0; i < numSheets; i++) {
            hardness = i == 0 || i == numSheets - 1 ? self.options.coverHardness : self.options.pageHardness;
            page = new FLIPBOOK.PageWebGL(self, i, hardness, self.options, preloaderMatF, preloaderMatB);
            self.pages.push(page);
            self.centerContainer.add(page);
            self.flippedright++;
        }

        window.p = self.pages;

        this.correctZOrder();

        if (this.bg) {
            this.bg.position.z = -numSheets * th - 5;
        }

        self.initialized = true;
    };

    FLIPBOOK.BookWebGL.prototype.getNumPages = function () {
        return this.pages.length;
    };

    FLIPBOOK.BookWebGL.prototype.centerContainer = function () {
        return this.centerContainer;
    };

    FLIPBOOK.BookWebGL.prototype.goToPage = function (index, instant, moved) {
        //index in book.pages, not page number

        if (this.view != 1 && index % 2 == 1) {
            index--;
        }
        const right = this.pages[index / 2];
        if (right) {
            right.load('front');
        }
        const left = this.pages[index / 2 - 1];
        if (left) {
            left.load('back');
        }

        var self = this;
        if (!this.initialized) {
            setTimeout(function () {
                self.goToPage(index, instant);
            }, 100);
            return;
        }

        if (instant) {
            for (var i = 0; i < this.pages.length; i++) {
                if (this.pages[i].flippingLeft || this.pages[i].flippingRight) {
                    return;
                }
            }
        }

        if (index < 0) {
            index = 0;
        }
        if (index > this.options.pages.length) {
            index = this.options.pages.length;
        }

        if (this.view == 1 && !moved) {
            var time = instant ? 0 : 300;
            if (index % 2 == 0) {
                this.focusLeft(time);
            } else {
                this.focusRight(time);
            }
        }

        if (index % 2 != 0) {
            index--;
        }
        if (index == this.rightIndex) {
            this.loadPages();
            this.turnPageComplete();
            return;
        }

        this.goingToPage = true;

        if (typeof instant != 'undefined' && instant) {
            if (index > self.rightIndex) {
                while (self.rightIndex < index) {
                    this.nextPageInstant();
                }
            } else {
                while (self.rightIndex > index) {
                    this.prevPageInstant();
                }
            }

            this.updateBookPosition();
            this.loadPages();
            this.turnPageComplete();
            return;
        }

        var flippingIndex = this.rightIndex > index ? this.rightIndex - 2 : this.rightIndex;
        var pageHardness = this.pages[flippingIndex / 2].pageHardness;
        var delay =
            pageHardness == this.options.coverHardness && this.options.coverHardness > this.options.pageHardness
                ? 200
                : 1;

        delay *= Math.pow(pageHardness, 0.5);

        if (this.rightIndex > index) {
            if (this.rightIndex - 2 > index) {
                //first page
                this.prevPage(false);
                setTimeout(function () {
                    self.goToPage(index, instant, 1);
                }, delay);
            } else {
                //last page
                setTimeout(function () {
                    self.prevPage();
                    if (typeof instant != 'undefined' && instant) {
                        for (var i = 0; i < self.pages.length; i++) {
                            self.pages[i].duration = self.options.pageFlipDuration;
                        }
                    }
                    self.loadPages();
                }, delay);
            }
        } else if (this.rightIndex < index) {
            if (this.rightIndex + 2 < index) {
                // first page
                this.nextPage(false);
                setTimeout(function () {
                    self.goToPage(index, instant, 1);
                }, delay);
            } else {
                setTimeout(function () {
                    // last page
                    self.nextPage();
                    if (typeof instant != 'undefined' && instant) {
                        for (var i = 0; i < self.pages.length; i++) {
                            self.pages[i].duration = self.options.pageFlipDuration;
                        }
                    }
                    self.loadPages();
                }, delay);
            }
        }
    };

    FLIPBOOK.BookWebGL.prototype.nextPageInstant = function () {
        if (this.flippedright == 0) {
            return;
        }

        var i;
        for (i = 0; i < this.pages.length; i++) {
            if (this.pages[i].flippingRight) {
                return;
            }
        }

        if (this.view == 1) {
            if (this.isFocusedLeft()) {
                if (!this.goingToPage) {
                    this.focusRight(0);
                    this.turnPageComplete();
                    return;
                } else {
                    this.focusLeft(0, 0);
                }
            }
        } else {
            if (this.flippedright == 1) {
                this.focusLeft(0);
            } else {
                this.focusBoth(0);
            }
        }

        var page = this.pages[this.pages.length - this.flippedright];

        page.flipLeftInstant();
        this.flippedleft++;
        this.flippedright--;
        this.setRightIndex(this.rightIndex + 2);

        this.updateBookPosition();
    };
    FLIPBOOK.BookWebGL.prototype.setRightIndex = function (value) {
        this.rightIndex = value;
    };
    FLIPBOOK.BookWebGL.prototype.prevPageInstant = function (_) {
        if (this.flippedleft == 0) {
            return;
        }

        var i;
        for (i = 0; i < this.pages.length; i++) {
            if (this.pages[i].flippingLeft) {
                return;
            }
        }

        if (this.view == 1) {
            if (!this.goingToPage) {
                if (this.isFocusedRight()) {
                    this.focusLeft(0);
                    this.turnPageComplete();
                    return;
                } else {
                    this.focusRight(0, 0);
                }
            }
        } else {
            if (this.flippedleft == 1) {
                this.focusRight(0);
            } else {
                this.focusBoth(0);
            }
        }

        var page = this.pages[this.flippedleft - 1];

        page.flipRightInstant();
        this.flippedleft--;
        this.flippedright++;

        this.setRightIndex(this.rightIndex - 2);
        this.updateBookPosition();
    };

    FLIPBOOK.BookWebGL.prototype.nextPage = function (load = true) {
        if (!this.nextEnabled) {
            return;
        }

        this.clickedPage = null;

        var i;
        for (i = 0; i < this.pages.length; i++) {
            if (this.pages[i].flippingRight) {
                return;
            }
        }

        if (this.view == 1 && !this.goingToPage && this.isFocusedLeft()) {
            this.focusRight(300, 0, this.turnPageComplete);
            return;
        }

        var page = this.pages[this.pages.length - this.flippedright];
        if (!page) {
            return;
        }

        var nextPage = this.pages[page.index + 1];
        if (!nextPage && !this.options.backCover && !this.options.rightToLeft) {
            return;
        }

        if (nextPage) {
            nextPage.showMat();
        }

        if (this.view == 1) {
            if (!this.goingToPage) {
                this.focusLeft(600, 200);
            }
        } else {
            if (this.flippedright == 1 && this.options.cover) {
                this.focusLeft(500);
            } else {
                this.focusBoth(500);
            }
        }

        if (!page.flipping) {
            var self = this;
            var onComplete;
            if (load) {
                this.loadNextSpread();
                onComplete = function (_) {
                    self.loadPages();
                    self.turnPageComplete();
                };
            }
            page.flipLeft(onComplete);
        }
        this.flippedleft++;

        this.flippedright--;
        this.setRightIndex(this.rightIndex + 2);
    };

    FLIPBOOK.BookWebGL.prototype.updateBookPosition = function () {
        if (this.view == 1) {
            if (this.flippedright == 0) {
                this.focusLeft();
            } else if (this.flippedleft == 0) {
                this.focusRight();
            } else {
                this.isFocusedLeft() ? this.focusLeft() : this.focusRight();
            }
        } else {
            if (this.rightIndex == 0) {
                this.focusRight();
            } else if (this.rightIndex >= this.options.numPages && this.options.cover) {
                this.focusLeft();
            } else {
                this.focusBoth();
            }
        }

        this.updateHtmlLayerPosition();
        this.needsUpdate = true;
    };

    FLIPBOOK.BookWebGL.prototype.updateHtmlLayerPosition = function () {
        if (this.htmlLayer) {
            this.htmlLayer.position.x = this.centerContainer.position.x;
            this.htmlLayer.position.y = this.centerContainer.position.y;
        }

        this.needsUpdate = true;
    };

    FLIPBOOK.BookWebGL.prototype.turnPageComplete = function () {
        this.goingToPage = false;

        this.options.main.turnPageComplete();
    };

    FLIPBOOK.BookWebGL.prototype.loadPages = function () {
        var self = this;

        var pages = this.pages;
        var main = this.options.main;
        for (var i = 0; i < pages.length; i++) {
            var p = pages[i];
            if (p.flippingLeft || p.flippingRight) {
                return;
            }
        }

        if (this.options.cornerCurl && this.pages[0]) {
            if (this.flippedleft == 0) {
                this.pages[0].startCornerCurl();
            } else {
                this.pages[0].stopCornerCurl();
            }
        }

        var rightPage = this.pages[this.flippedleft];
        var leftPage = this.pages[this.flippedleft - 1];
        var updateHtmlLayer = this.updateHtmlLayer;
        var loadMorePages = this.loadMorePages;

        pages.forEach((page) => {
            if (page === rightPage || page === leftPage) {
                page.showMat();
            }

            if (leftPage && page.index < leftPage.index - 2) {
                page.hideMat();
                if (!self.options.pdfMode) {
                    page.disposeMat();
                }
            }

            if (rightPage && page.index > rightPage.index + 2) {
                page.hideMat();
                if (!self.options.pdfMode) {
                    page.disposeMat();
                }
            }
        });

        main.setLoadingProgress(0.1);

        if (leftPage) {
            leftPage.load('back', function (_) {
                if (rightPage) {
                    rightPage.load('front', function (_) {
                        leftPage.loadHTML('back', function () {
                            rightPage.loadHTML('front', function () {
                                updateHtmlLayer.call(self);
                            });
                        });

                        main.setLoadingProgress(1);
                        loadMorePages.call(self);
                    });
                } else {
                    leftPage.loadHTML('back', function () {
                        updateHtmlLayer.call(self);
                    });
                    main.setLoadingProgress(1);
                    loadMorePages.call(self);
                }
            });
        } else {
            rightPage.load('front', function (_) {
                rightPage.loadHTML('front', function () {
                    updateHtmlLayer.call(self);
                });
                main.setLoadingProgress(1);
                loadMorePages.call(self);
            });
        }
    };

    FLIPBOOK.BookWebGL.prototype.focusLeft = function (time, delay, callback) {
        var pw = this.options.pageWidth;
        var newX = pw * 0.5 * this.centerContainer.scale.x;
        var newY = 0;

        this.moveToPos({ x: newX, y: newY }, time, delay, callback);
    };

    FLIPBOOK.BookWebGL.prototype.focusRight = function (time, delay, callback) {
        var pw = this.options.pageWidth;
        var newX = -pw * 0.5 * this.centerContainer.scale.x;
        var newY = 0;

        this.moveToPos({ x: newX, y: newY }, time, delay, callback);
    };

    FLIPBOOK.BookWebGL.prototype.focusBoth = function (time, delay, callback) {
        var newX = 0;
        var newY = 0;

        this.moveToPos({ x: newX, y: newY }, time, delay, callback);
    };

    FLIPBOOK.BookWebGL.prototype.moveToPos = function (pos, time, delay, callback) {
        if (time && this.movingTo != pos && this.centerContainer.position.x != pos.x) {
            var self = this;
            this.movingTo = pos;

            if (this.bookMoveTween) {
                this.bookMoveTween.stop();
            }
            this.bookMoveTween = new FLIPBOOK.TWEEN.Tween(this.centerContainer.position)
                .to(
                    {
                        x: pos.x,
                        y: pos.y,
                    },
                    time
                )
                .easing(FLIPBOOK.TWEEN.Easing.Sinusoidal.Out)
                .onUpdate(function () {
                    self.updateHtmlLayerPosition();
                })
                .onComplete(function () {
                    self.movingTo = null;
                    self.updateHtmlLayerPosition();
                    if (callback) {
                        callback.call(self);
                    }
                })
                .delay(delay || 0)
                .start();
        } else {
            this.centerContainer.position.x = pos.x;
            this.centerContainer.position.y = pos.y;
            if (callback) {
                callback.call(this);
            }
        }
    };

    FLIPBOOK.BookWebGL.prototype.isFocusedLeft = function () {
        return this.centerContainer.position.x > 0;
    };

    FLIPBOOK.BookWebGL.prototype.isFocusedRight = function () {
        return this.centerContainer.position.x < 0;
    };

    FLIPBOOK.BookWebGL.prototype.prevPage = function (load = true) {
        if (!this.prevEnabled) {
            return;
        }

        this.clickedPage = null;

        var i;
        for (i = 0; i < this.pages.length; i++) {
            if (this.pages[i].flippingLeft) {
                return;
            }
        }

        if (this.view == 1 && !this.goingToPage && this.isFocusedRight()) {
            this.focusLeft(300, 0, this.turnPageComplete);
            return;
        }

        var page = this.pages[this.flippedleft - 1];
        if (!page) {
            return;
        }

        if (this.flippedleft == 1 && !this.options.cover) {
            return;
        }

        var prevPage = this.pages[page.index - 1];
        if (!prevPage && this.options.rightToLeft && !this.options.backCover) {
            return;
        }

        if (prevPage) {
            prevPage.showMat();
        }

        if (this.view == 1) {
            if (!this.goingToPage) {
                this.focusRight(600, 200);
            }
        } else {
            if (this.flippedleft == 1) {
                this.focusRight(500);
            } else {
                this.focusBoth(500);
            }
        }

        if (!page.flipping) {
            var self = this;
            var onComplete;
            if (load) {
                this.loadPrevSpread();
                onComplete = function (_) {
                    self.loadPages();
                    self.turnPageComplete();
                };
            }
            page.flipRight(onComplete);
        }
        this.flippedleft--;
        this.flippedright++;

        this.setRightIndex(this.rightIndex - 2);
    };

    FLIPBOOK.BookWebGL.prototype.firstPage = function () {};

    FLIPBOOK.BookWebGL.prototype.flipFinnished = function () {
        this.correctZOrder();
        this.needsUpdate = true;
    };

    FLIPBOOK.BookWebGL.prototype.lastPage = function () {};

    FLIPBOOK.BookWebGL.prototype.updateVisiblePages = function () {};

    FLIPBOOK.BookWebGL.prototype.loadPrevSpread = function () {
        const left = this.pages[this.flippedleft - 1];
        const prev = this.pages[this.flippedleft - 2];

        if (left) {
            left.load('front', function () {}, true);
        }
        if (prev) {
            prev.load('back', function () {}, true);
        }
    };

    FLIPBOOK.BookWebGL.prototype.loadNextSpread = function () {
        const right = this.pages[this.flippedleft];
        const next = this.pages[this.flippedleft + 1];
        if (right) {
            right.load('back', function () {}, true);
        }
        if (next) {
            next.load('front', function () {}, true);
        }
    };

    FLIPBOOK.BookWebGL.prototype.loadMorePages = function () {
        this.loadNextSpread();
        this.loadPrevSpread();
    };

    FLIPBOOK.BookWebGL.prototype._hideHTMLPage = function (page) {
        if (!page.htmlHidden) {
            page.style.display = 'none';
            page.htmlHidden = true;
        }
    };

    FLIPBOOK.BookWebGL.prototype._showHTMLPage = function (page) {
        if (page.htmlHidden) {
            page.style.display = 'block';
            page.htmlHidden = false;
        }
    };

    FLIPBOOK.BookWebGL.prototype._emptyHTMLPage = function (page) {
        if (!page.emptyHTML) {
            // page.innerHTML = '';
            page.emptyHTML = true;
        }
    };

    FLIPBOOK.BookWebGL.prototype._addHTMLContent = function (html, page) {
        page.innerHTML = '';
        page.appendChild(html[0] || html);
        page.emptyHTML = false;
    };

    FLIPBOOK.BookWebGL.prototype.updateHtmlLayer = function (force) {
        if (!this.htmlLayer) {
            return;
        }

        for (var i = 0; i < this.pages.length; i++) {
            if (this.pages[i].flipping) {
                return;
            }
        }

        if (!force && this.htmlContentRightIndex == this.rightIndex) {
            return;
        }

        this.htmlContentRightIndex = this.rightIndex;

        this.htmlLayerVisible = false;

        var R = this.options.rightToLeft ? this.options.pages.length - this.rightIndex - 1 : this.rightIndex;
        var L = this.options.rightToLeft ? R + 1 : R - 1;

        if (!this.options.cover) {
            R--;
            L--;
        }

        this._hideHTMLPage(this.pageL);
        this._hideHTMLPage(this.pageC);
        this._hideHTMLPage(this.pageR);

        this._emptyHTMLPage(this.pageRInner);
        this._emptyHTMLPage(this.pageLInner);
        this._emptyHTMLPage(this.pageCInner);

        var html;

        if (this.options.doublePage) {
            //cover

            if (this.rightIndex == 0) {
                html = this.options.pages[R].htmlContent;
                if (html) {
                    this._addHTMLContent(html, this.pageRInner);
                    this._showHTMLPage(this.pageR);
                    this.htmlLayerVisible = true;
                }

                //back cover
            } else if (this.rightIndex == this.pages.length * 2) {
                html = this.options.pages[L].htmlContent;
                if (html) {
                    this._addHTMLContent(html, this.pageLInner);
                    this._showHTMLPage(this.pageL);

                    this.htmlLayerVisible = true;
                }

                //spreads
            } else {
                html = this.options.pages[L].htmlContent || this.options.pages[R].htmlContent;

                if (html) {
                    this._addHTMLContent(html, this.pageCInner);
                    this._showHTMLPage(this.pageC);

                    this.htmlLayerVisible = true;
                }
            }
        } else {
            if (this.rightIndex != 0) {
                html = this.options.pages[L].htmlContent;

                if (html) {
                    this._addHTMLContent(this.options.pages[L].htmlContent, this.pageLInner);
                    this._showHTMLPage(this.pageL);

                    this.htmlLayerVisible = true;
                }
            }

            if (this.rightIndex != this.pages.length * 2) {
                html = this.options.pages[R].htmlContent;

                if (html) {
                    this._addHTMLContent(this.options.pages[R].htmlContent, this.pageRInner);
                    this._showHTMLPage(this.pageR);
                    this.htmlLayerVisible = true;
                }
            }
        }

        if (this.htmlLayer) {
            this.startPageItems(this.htmlLayer.element);
        }

        this.main.trigger('showpagehtml', { page: {} });
    };

    FLIPBOOK.BookWebGL.prototype.onZoom = function () {};

    FLIPBOOK.BookWebGL.prototype.render = function (rendering) {
        var self = this;
        self.rendering = rendering;
    };

    FLIPBOOK.BookWebGL.prototype.zoomTo = function (amount, time, x, y) {
        if (this.zooming) {
            return;
        }

        if (!this.pages.length) {
            return;
        }

        if (typeof time === 'undefined') {
            time = 0;
        }

        var newCenter = this.centerContainer.position;

        if (typeof x != 'undefined' && typeof y != 'undefined') {
            var ph = this.zoom * this.wrapper.clientHeight;
            var phNew = amount * this.wrapper.clientHeight;
            var scaleFactor = ph / 1000;
            var scaleFactorNew = phNew / 1000;
            var newZoom;
            var center = this.centerContainer.position;
            var focus = {
                x: (x - this.wrapper.clientWidth / 2) / scaleFactor - center.x,
                y: (-y + this.wrapper.clientHeight / 2) / scaleFactor - center.y,
            };
            var focusNew = {
                x: (x - this.wrapper.clientWidth / 2) / scaleFactorNew - center.x,
                y: (-y + this.wrapper.clientHeight / 2) / scaleFactorNew - center.y,
            };

            newCenter = center;
            newCenter.x = center.x - (focus.x - focusNew.x);
            newCenter.y = center.y - (focus.y - focusNew.y);
        }

        var self = this;
        newZoom = amount < this.options.zoomMin ? this.options.zoomMin : amount;

        if (newZoom == this.options.zoom) {
            //reset book position
            var focusedLeft = this.isFocusedLeft();

            if (this.view == 1) {
                focusedLeft ? this.focusLeft() : this.focusRight();
            } else {
                this.centerContainer.position.set(0, 0, 0);
            }

            this.updateBookPosition();
        }

        time = 0;

        if (time > 0) {
            if (!this.zooming) {
                this.zooming = true;

                new FLIPBOOK.TWEEN.Tween(this)
                    .to(
                        {
                            zoom: newZoom,
                        },
                        time
                    )
                    .easing(FLIPBOOK.TWEEN.Easing.Sinusoidal.In)
                    .onUpdate(this.updateCameraPosition)
                    .onComplete(function () {
                        self.zooming = false;
                    })
                    .start();

                new FLIPBOOK.TWEEN.Tween(this.centerContainer.position)
                    .to(
                        {
                            x: newCenter.x,
                            y: newCenter.y,
                        },
                        time
                    )
                    .easing(FLIPBOOK.TWEEN.Easing.Sinusoidal.In)
                    .onUpdate(function () {})
                    .onComplete(function () {})
                    .start();

                if (this.htmlLayer) {
                    new FLIPBOOK.TWEEN.Tween(this.htmlLayer.position)
                        .to(
                            {
                                x: newCenter.x,
                                y: newCenter.y,
                            },
                            time
                        )
                        .easing(FLIPBOOK.TWEEN.Easing.Sinusoidal.In)
                        .start();
                }
            }
        } else {
            this.zoom = newZoom;

            this.centerContainer.position.set(newCenter.x, newCenter.y, 0);

            self.updateHtmlLayerPosition();

            this.updateCameraPosition();

            this.zooming = false;
        }

        if (amount <= 1 && amount <= this.zoom) {
            this.updateBookPosition();
        }

        this.options.main.onZoom(newZoom);

        this.loadPages();
    };

    FLIPBOOK.BookWebGL.prototype.tiltTo = function (amount) {
        var factor = 0.3;
        var newTilt = this.tilt + amount * factor;
        newTilt = newTilt > this.options.tiltMax ? this.options.tiltMax : newTilt;
        newTilt = newTilt < this.options.tiltMin ? this.options.tiltMin : newTilt;

        this.tilt = newTilt;
        this.updateCameraPosition();
    };

    FLIPBOOK.BookWebGL.prototype.panTo = function (amount) {
        var factor = 0.2;
        var newPan = this.pan - amount * factor;
        newPan = newPan > this.options.panMax ? this.options.panMax : newPan;
        newPan = newPan < this.options.panMin ? this.options.panMin : newPan;

        this.pan = newPan;
        this.updateCameraPosition();
    };

    FLIPBOOK.BookWebGL.prototype._start = function (e) {
        this.centerContainerStart = this.centerContainer.position.clone();
        this.mouseDown = true;
        this.onMouseMove = '';
    };

    FLIPBOOK.BookWebGL.prototype._move = function (e, distanceX, distanceY) {
        if (distanceX != 0 || distanceY != 0) {
            this.moved = true;
            this.moveToPos({
                x: this.centerContainerStart.x + distanceX / this.zoom,
                y: this.centerContainerStart.y - distanceY / this.zoom,
            });
            this.updateHtmlLayerPosition();
        }
    };

    FLIPBOOK.BookWebGL.prototype._end = function (e) {
        this.mouseDown = false;
        this.pageMouseDown = false;
        this.moved = false;
    };

    FLIPBOOK.BookWebGL.prototype.enable = function () {
        if (this.enabled) {
            this.onResize();
            return;
        }
        this.enabled = true;

        if (!this.initialized) {
            this.init3d();
            this.createPages();
            this.rendering = false;
            this.onResize();
        }

        this.render(true);
        this.onResize();
    };
    FLIPBOOK.BookWebGL.prototype.disable = function () {
        this.enabled = false;
        this.render(false);
    };
}
/* eslint-disable */
{
    /* MOD3D */
    /**
     *
     * http://github.com/foo123/MOD3
     *
     * MOD3 3D Modifier Library (port of actionscript AS3Mod to javascript)
     * supports: THREE.js, J3D, Copperlicht, Pre3D
     *
     * @author Nikos M.
     * @url http://nikos-web-development.netai.net/
     *
     **/
    var MOD3 = MOD3 || {};
    (function (a) {
        a.Constants = {
            PI: Math.PI,
            invPI: 1 / Math.PI,
            halfPI: 0.5 * Math.PI,
            doublePI: 2 * Math.PI,
            toRad: (1 / 180) * Math.PI,
            toDeg: (1 / 180) * Math.PI,
        };
        a.ModConstant = {
            LEFT: -1,
            RIGHT: 1,
            NONE: 0,
            X: 1,
            Y: 2,
            Z: 4,
        };
    })(MOD3);
    (function (a) {
        var c = a.Constants;
        a.XMath = {};
        a.XMath.normalize = function (c, d, e) {
            return d - c == 0 ? 1 : a.XMath.trim(0, 1, (e - c) / d);
        };
        a.XMath.toRange = function (a, c, e) {
            return c - a == 0 ? 0 : a + (c - a) * e;
        };
        a.XMath.inRange = function (a, c, e, f) {
            typeof f == 'undefined' && (f = !1);
            return f ? e >= a && e <= c : e > a && e < c;
        };
        a.XMath.sign = function (a, c) {
            typeof c == 'undefined' && (c = 0);
            return 0 == a ? c : a > 0 ? 1 : -1;
        };
        a.XMath.trim = function (a, c, e) {
            return Math.min(c, Math.max(a, e));
        };
        a.XMath.wrap = function (a, c, e) {
            return e < a ? e + (c - a) : e >= c ? e - (c - a) : e;
        };
        a.XMath.degToRad = function (a) {
            return a * c.toRad;
        };
        a.XMath.radToDeg = function (a) {
            return a * c.toDeg;
        };
        a.XMath.presicion = function (a, c) {
            var e = Math.pow(10, c);
            return Math.round(a * e) / e;
        };
        a.XMath.uceil = function (a) {
            return a < 0 ? Math.floor(a) : Math.ceil(a);
        };
    })(MOD3);
    (function (a) {
        a.Range = function (a, b) {
            this.start = 0;
            this.end = 1;
            if (typeof a != 'undefined') {
                this.start = a;
            }
            if (typeof b != 'undefined') {
                this.end = b;
            }
        };
        a.Range.prototype.getSize = function () {
            return this.end - this.start;
        };
        a.Range.prototype.move = function (a) {
            this.start += a;
            this.end += a;
        };
        a.Range.prototype.isIn = function (a) {
            return a >= this.start && a <= this.end;
        };
        a.Range.prototype.normalize = function (c) {
            return a.XMath.normalize(this.start, this.end, c);
        };
        a.Range.prototype.toRange = function (c) {
            return a.XMath.toRange(this.start, this.end, c);
        };
        a.Range.prototype.trim = function (c) {
            return a.XMath.trim(this.start, this.end, c);
        };
        a.Range.prototype.interpolate = function (a, b) {
            return this.toRange(b.normalize(a));
        };
        a.Range.prototype.toString = function () {
            return '[' + this.start + ' - ' + this.end + ']';
        };
    })(MOD3);
    (function (a) {
        a.Phase = function (a) {
            this.value = 0;
            if (typeof a != 'undefined') {
                this.value = a;
            }
        };
        a.Phase.prototype.getPhasedValue = function () {
            return Math.sin(this.value);
        };
        a.Phase.prototype.getAbsPhasedValue = function () {
            return Math.abs(this.getPhasedValue());
        };
        a.Phase.prototype.getNormValue = function () {
            return (this.getPhasedValue() + 1) * 0.5;
        };
    })(MOD3);
    (function (a) {
        a.Point = function (a, b) {
            this.y = this.x = 0;
            if (typeof a != 'undefined') {
                this.x = a;
            }
            if (typeof b != 'undefined') {
                this.y = b;
            }
        };
        a.Point.prototype.clone = function () {
            return new a.Point(this.x, this.y);
        };
    })(MOD3);
    (function (a) {
        a.Matrix = function (a, b, d, e) {
            this.m11 = 1;
            this.m21 = this.m12 = 0;
            this.m22 = 1;
            if (typeof a != 'undefined') {
                this.m11 = a;
            }
            if (typeof b != 'undefined') {
                this.m12 = b;
            }
            if (typeof d != 'undefined') {
                this.m21 = d;
            }
            if (typeof e != 'undefined') {
                this.m22 = e;
            }
        };
        a.Matrix.prototype.rotate = function (a) {
            var b = Math.cos(a);
            var a = Math.sin(a);
            this.m11 = b;
            this.m12 = -a;
            this.m21 = a;
            this.m22 = b;
            return this;
        };
        a.Matrix.prototype.scale = function (a, b) {
            this.m21 = this.m12 = 0;
            if (typeof a != 'undefined') {
                this.m22 = this.m11 = a;
            }
            if (typeof b != 'undefined') {
                this.m22 = b;
            }
            return this;
        };
        a.Matrix.prototype.multiply = function (a) {
            var b = this.m11;
            var d = this.m12;
            var e = this.m21;
            var f = this.m22;
            var g = a.m11;
            var h = a.m12;
            var i = a.m21;
            var a = a.m22;
            this.m11 = b * g + d * i;
            this.m12 = b * h + d * a;
            this.m21 = e * g + f * i;
            this.m22 = e * h + f * a;
            return this;
        };
        a.Matrix.prototype.transformPoint = function (c) {
            return new a.Point(this.m11 * c.x + this.m12 * c.y, this.m21 * c.x + this.m22 * c.y);
        };
    })(MOD3);
    (function (a) {
        a.Vector3 = function (a, b, d) {
            this.z = this.y = this.x = null;
            this.x = a;
            this.y = b;
            this.z = d;
        };
        a.Vector3.ZERO = function () {
            return new a.Vector3(0, 0, 0);
        };
        a.Vector3.dot = function (a, b) {
            return a.x * b.x + a.y * b.y + a.z * b.z;
        };
        a.Vector3.prototype.clone = function () {
            return new a.Vector3(this.x, this.y, this.z);
        };
        a.Vector3.prototype.equals = function (a) {
            return this.x == a.x && this.y == a.y && this.z == a.z;
        };
        a.Vector3.prototype.zero = function () {
            this.x = this.y = this.z = 0;
        };
        a.Vector3.prototype.negate = function () {
            return new a.Vector3(-this.x, -this.y, -this.z);
        };
        a.Vector3.prototype.add = function (c) {
            return new a.Vector3(this.x + c.x, this.y + c.y, this.z + c.z);
        };
        a.Vector3.prototype.subtract = function (c) {
            return new a.Vector3(this.x - c.x, this.y - c.y, this.z - c.z);
        };
        a.Vector3.prototype.multiplyScalar = function (c) {
            return new a.Vector3(this.x * c, this.y * c, this.z * c);
        };
        a.Vector3.prototype.multiply = function (c) {
            return new a.Vector3(this.x * c.x, this.y * c.y, this.z * c.z);
        };
        a.Vector3.prototype.divide = function (c) {
            c = 1 / c;
            return new a.Vector3(this.x * c, this.y * c, this.z * c);
        };
        a.Vector3.prototype.normalize = function () {
            var a = this.x;
            var b = this.y;
            var d = this.z;
            var a = a * a + b * b + d * d;
            a > 0 && ((a = 1 / Math.sqrt(a)), (this.x *= a), (this.y *= a), (this.z *= a));
        };
        a.Vector3.prototype.getMagnitude = function () {
            var a = this.x;
            var b = this.y;
            var d = this.z;
            return Math.sqrt(a * a + b * b + d * d);
        };
        a.Vector3.prototype.setMagnitude = function (a) {
            this.normalize();
            this.x *= a;
            this.y *= a;
            this.z *= a;
        };
        a.Vector3.prototype.toString = function () {
            return '[' + this.x + ' , ' + this.y + ' , ' + this.z + ']';
        };
        a.Vector3.prototype.sum = function (a, b) {
            return a.add(b);
        };
        a.Vector3.prototype.dot = function (a, b) {
            return a.x * b.x + a.y * b.y + a.z * b.z;
        };
        a.Vector3.prototype.cross = function (c, b) {
            var d = c.x;
            var e = c.y;
            var f = c.z;
            var g = b.x;
            var h = b.y;
            var i = b.z;
            return new a.Vector3(e * i - f * h, f * g - d * i, d * h - e * g);
        };
        a.Vector3.prototype.distance = function (a, b) {
            var d = a.x - b.x;
            var e = a.y - b.y;
            var f = a.z - b.z;
            return Math.sqrt(d * d + e * e + f * f);
        };
    })(MOD3);
    (function (a) {
        a.Matrix4 = function (a, b, d, e, f, g, h, i, n, m, o, k, p, l, j, q) {
            this.n11 = 1;
            this.n21 = this.n14 = this.n13 = this.n12 = 0;
            this.n22 = 1;
            this.n32 = this.n31 = this.n24 = this.n23 = 0;
            this.n33 = 1;
            this.n43 = this.n42 = this.n41 = this.n34 = 0;
            this.n44 = 1;
            if (typeof a != 'undefined') {
                this.n11 = a;
            }
            if (typeof b != 'undefined') {
                this.n12 = b;
            }
            if (typeof d != 'undefined') {
                this.n13 = d;
            }
            if (typeof e != 'undefined') {
                this.n14 = e;
            }
            if (typeof f != 'undefined') {
                this.n21 = f;
            }
            if (typeof g != 'undefined') {
                this.n22 = g;
            }
            if (typeof h != 'undefined') {
                this.n23 = h;
            }
            if (typeof i != 'undefined') {
                this.n24 = i;
            }
            if (typeof n != 'undefined') {
                this.n31 = n;
            }
            if (typeof m != 'undefined') {
                this.n32 = m;
            }
            if (typeof o != 'undefined') {
                this.n33 = o;
            }
            if (typeof k != 'undefined') {
                this.n34 = k;
            }
            if (typeof p != 'undefined') {
                this.n41 = p;
            }
            if (typeof l != 'undefined') {
                this.n42 = l;
            }
            if (typeof j != 'undefined') {
                this.n43 = j;
            }
            if (typeof q != 'undefined') {
                this.n44 = q;
            }
        };
        a.Matrix4.prototype.translationMatrix = function (a, b, d) {
            this.n14 = a;
            this.n24 = b;
            this.n34 = d;
            return this;
        };
        a.Matrix4.prototype.scaleMatrix = function (a, b, d) {
            this.n11 = a;
            this.n22 = b;
            this.n33 = d;
            return this;
        };
        a.Matrix4.prototype.rotationMatrix = function (a, b, d, e) {
            var f = Math.cos(e);
            var g = Math.sin(e);
            var e = 1 - f;
            var h = a * b * e;
            var i = b * d * e;
            var n = a * d * e;
            var m = g * d;
            var o = g * b;
            g *= a;
            this.n11 = f + a * a * e;
            this.n12 = -m + h;
            this.n13 = o + n;
            this.n14 = 0;
            this.n21 = m + h;
            this.n22 = f + b * b * e;
            this.n23 = -g + i;
            this.n24 = 0;
            this.n31 = -o + n;
            this.n32 = g + i;
            this.n33 = f + d * d * e;
            this.n34 = 0;
            return this;
        };
        a.Matrix4.prototype.calculateMultiply = function (a, b) {
            var d = a.n11;
            var e = b.n11;
            var f = a.n21;
            var g = b.n21;
            var h = a.n31;
            var i = b.n31;
            var n = a.n12;
            var m = b.n12;
            var o = a.n22;
            var k = b.n22;
            var p = a.n32;
            var l = b.n32;
            var j = a.n13;
            var q = b.n13;
            var r = a.n23;
            var t = b.n23;
            var s = a.n33;
            var u = b.n33;
            var v = a.n14;
            var w = b.n14;
            var z = a.n24;
            var x = b.n24;
            var A = a.n34;
            var y = b.n34;
            this.n11 = d * e + n * g + j * i;
            this.n12 = d * m + n * k + j * l;
            this.n13 = d * q + n * t + j * u;
            this.n14 = d * w + n * x + j * y + v;
            this.n21 = f * e + o * g + r * i;
            this.n22 = f * m + o * k + r * l;
            this.n23 = f * q + o * t + r * u;
            this.n24 = f * w + o * x + r * y + z;
            this.n31 = h * e + p * g + s * i;
            this.n32 = h * m + p * k + s * l;
            this.n33 = h * q + p * t + s * u;
            this.n34 = h * w + p * x + s * y + A;
        };
        a.Matrix4.prototype.multiply = function (a, b) {
            this.calculateMultiply(a, b);
            return this;
        };
        a.Matrix4.prototype.multiplyVector = function (a, b) {
            var d = b.x;
            var e = b.y;
            var f = b.z;
            b.x = d * a.n11 + e * a.n12 + f * a.n13 + a.n14;
            b.y = d * a.n21 + e * a.n22 + f * a.n23 + a.n24;
            b.z = d * a.n31 + e * a.n32 + f * a.n33 + a.n34;
        };
    })(MOD3);
    (function (a) {
        a.VertexProxy = function (a) {
            this.originalZ = this.originalY = this.originalX = this.ratioZ = this.ratioY = this.ratioX = null;
            if (typeof a != 'undefined') {
                this.vertex = a;
            }
        };
        a.VertexProxy.prototype.setVertex = function () {};
        a.VertexProxy.prototype.setRatios = function (a, b, d) {
            this.ratioX = a;
            this.ratioY = b;
            this.ratioZ = d;
        };
        a.VertexProxy.prototype.setOriginalPosition = function (a, b, d) {
            this.originalX = a;
            this.originalY = b;
            this.originalZ = d;
        };
        a.VertexProxy.prototype.getX = function () {};
        a.VertexProxy.prototype.getY = function () {};
        a.VertexProxy.prototype.getZ = function () {};
        a.VertexProxy.prototype.setX = function () {};
        a.VertexProxy.prototype.setY = function () {};
        a.VertexProxy.prototype.setZ = function () {};
        a.VertexProxy.prototype.getValue = function (c) {
            switch (c) {
                case a.ModConstant.X:
                    return this.getX();
                case a.ModConstant.Y:
                    return this.getY();
                case a.ModConstant.Z:
                    return this.getZ();
            }
            return 0;
        };
        a.VertexProxy.prototype.setValue = function (c, b) {
            switch (c) {
                case a.ModConstant.X:
                    this.setX(b);
                    break;
                case a.ModConstant.Y:
                    this.setY(b);
                    break;
                case a.ModConstant.Z:
                    this.setZ(b);
            }
        };
        a.VertexProxy.prototype.getRatio = function (c) {
            switch (c) {
                case a.ModConstant.X:
                    return this.ratioX;
                case a.ModConstant.Y:
                    return this.ratioY;
                case a.ModConstant.Z:
                    return this.ratioZ;
            }
            return -1;
        };
        a.VertexProxy.prototype.getOriginalValue = function (c) {
            switch (c) {
                case a.ModConstant.X:
                    return this.originalX;
                case a.ModConstant.Y:
                    return this.originalY;
                case a.ModConstant.Z:
                    return this.originalZ;
            }
            return 0;
        };
        a.VertexProxy.prototype.reset = function () {
            this.setX(this.originalX);
            this.setY(this.originalY);
            this.setZ(this.originalZ);
        };
        a.VertexProxy.prototype.collapse = function () {
            this.originalX = this.getX();
            this.originalY = this.getY();
            this.originalZ = this.getZ();
        };
        a.VertexProxy.prototype.getVector = function () {
            return new a.Vector3(this.getX(), this.getY(), this.getZ());
        };
        a.VertexProxy.prototype.setVector = function (a) {
            this.setX(a.x);
            this.setY(a.y);
            this.setZ(a.z);
        };
        a.VertexProxy.prototype.getRatioVector = function () {
            return new a.Vector3(this.ratioX, this.ratioY, this.ratioZ);
        };
    })(MOD3);
    (function (a) {
        a.FaceProxy = function () {
            this.vertices = [];
        };
        a.FaceProxy.prototype.addVertex = function (a) {
            this.vertices.push(a);
        };
        a.FaceProxy.prototype.getVertices = function () {
            return this.vertices;
        };
    })(MOD3);
    (function (a) {
        a.MeshProxy = function () {
            this.depth =
                this.height =
                this.width =
                this.minAxis =
                this.midAxis =
                this.maxAxis =
                this.minZ =
                this.minY =
                this.minX =
                this.maxZ =
                this.maxY =
                this.maxX =
                    null;
            this.vertices = [];
            this.faces = [];
            this.mesh = null;
        };
        a.MeshProxy.prototype.getVertices = function () {
            return this.vertices;
        };
        a.MeshProxy.prototype.getFaces = function () {
            return this.faces;
        };
        a.MeshProxy.prototype.analyzeGeometry = function () {
            for (
                var c = this.getVertices(),
                    b = c.length,
                    d = b,
                    e,
                    f,
                    g,
                    h,
                    i,
                    n,
                    m,
                    o,
                    k,
                    p,
                    l = !0,
                    j = Math.min,
                    q = Math.max;
                --d >= 0;

            ) {
                (e = c[d]),
                    (f = e.getX()),
                    (g = e.getY()),
                    (h = e.getZ()),
                    l
                        ? ((i = n = f), (m = o = g), (k = p = h), (l = !1))
                        : ((i = j(i, f)), (m = j(m, g)), (k = j(k, h)), (n = q(n, f)), (o = q(o, g)), (p = q(p, h))),
                    e.setOriginalPosition(f, g, h);
            }
            f = n - i;
            g = o - m;
            depth = p - k;
            this.width = f;
            this.height = g;
            this.depth = depth;
            this.minX = i;
            this.maxX = n;
            this.minY = m;
            this.maxY = o;
            this.minZ = k;
            this.maxZ = p;
            d = q(f, q(g, depth));
            j = j(f, j(g, depth));
            if (d == f && j == g) {
                (this.minAxis = a.ModConstant.Y), (this.midAxis = a.ModConstant.Z), (this.maxAxis = a.ModConstant.X);
            } else if (d == f && j == depth) {
                (this.minAxis = a.ModConstant.Z), (this.midAxis = a.ModConstant.Y), (this.maxAxis = a.ModConstant.X);
            } else if (d == g && j == f) {
                (this.minAxis = a.ModConstant.X), (this.midAxis = a.ModConstant.Z), (this.maxAxis = a.ModConstant.Y);
            } else if (d == g && j == depth) {
                (this.minAxis = a.ModConstant.Z), (this.midAxis = a.ModConstant.X), (this.maxAxis = a.ModConstant.Y);
            } else if (d == depth && j == f) {
                (this.minAxis = a.ModConstant.X), (this.midAxis = a.ModConstant.Y), (this.maxAxis = a.ModConstant.Z);
            } else if (d == depth && j == g) {
                (this.minAxis = a.ModConstant.Y), (this.midAxis = a.ModConstant.X), (this.maxAxis = a.ModConstant.Z);
            }
            for (d = b; --d >= 0; ) {
                (e = c[d]), e.setRatios((e.getX() - i) / f, (e.getY() - m) / g, (e.getZ() - k) / depth);
            }
        };
        a.MeshProxy.prototype.resetGeometry = function () {
            for (var a = this.getVertices(), b = a.length; --b >= 0; ) {
                a[b].reset();
            }
        };
        a.MeshProxy.prototype.collapseGeometry = function () {
            for (var a = this.getVertices(), b = a.length; --b >= 0; ) {
                a[b].collapse();
            }
            this.analyzeGeometry();
        };
        a.MeshProxy.prototype.getMin = function (c) {
            switch (c) {
                case a.ModConstant.X:
                    return this.minX;
                case a.ModConstant.Y:
                    return this.minY;
                case a.ModConstant.Z:
                    return this.minZ;
            }
            return -1;
        };
        a.MeshProxy.prototype.getMax = function (c) {
            switch (c) {
                case a.ModConstant.X:
                    return this.maxX;
                case a.ModConstant.Y:
                    return this.maxY;
                case a.ModConstant.Z:
                    return this.maxZ;
            }
            return -1;
        };
        a.MeshProxy.prototype.getSize = function (c) {
            switch (c) {
                case a.ModConstant.X:
                    return this.width;
                case a.ModConstant.Y:
                    return this.height;
                case a.ModConstant.Z:
                    return this.depth;
            }
            return -1;
        };
        a.MeshProxy.prototype.setMesh = function (a) {
            this.mesh = a;
            this.vertices = [];
            this.faces = [];
        };
        a.MeshProxy.prototype.postApply = function () {};
        a.MeshProxy.prototype.updateMeshPosition = function () {};
    })(MOD3);
    (function (a) {
        a.Modifier = function () {
            this.mod = null;
        };
        a.Modifier.prototype.setModifiable = function (a) {
            this.mod = a;
        };
        a.Modifier.prototype.getVertices = function () {
            return this.mod.getVertices();
        };
        a.Modifier.prototype.apply = function () {};
    })(MOD3);
    (function (a) {
        a.Library3d = function () {
            this.id = '';
            this.vertexClass = this.meshClass = null;
        };
    })(MOD3);
    (function (a) {
        a.PluginFactory = {};
        a.PluginFactory.getMeshProxy = function (a) {
            return new a.meshClass();
        };
    })(MOD3);
    (function (a) {
        a.ModifierStack = function (c, b) {
            this.lib3d = c;
            this.stack = this.baseMesh = null;
            this.baseMesh = a.PluginFactory.getMeshProxy(c);
            this.baseMesh.setMesh(b);
            this.baseMesh.analyzeGeometry();
            this.stack = [];
        };
        a.ModifierStack.prototype.addModifier = function (a) {
            a.setModifiable(this.baseMesh);
            this.stack.push(a);
        };
        a.ModifierStack.prototype.apply = function () {
            this.baseMesh.resetGeometry();
            for (var a = this.stack, b = a.length, d = 0; d < b; ) {
                a[d++].apply();
            }
            this.baseMesh.postApply();
        };
        a.ModifierStack.prototype.collapse = function () {
            this.apply();
            this.baseMesh.collapseGeometry();
            this.stack = [];
        };
        a.ModifierStack.prototype.clear = function () {
            this.stack = [];
        };
        a.ModifierStack.prototype.getMeshInfo = function () {
            return this.baseMesh;
        };
    })(MOD3);
    (function (a) {
        a.Bend = function (c, b, d) {
            this.diagAngle = this.angle = this.offset = this.force = null;
            this.constraint = a.ModConstant.NONE;
            this.m2 = this.m1 = this.origin = this.height = this.width = this.mid = this.min = this.max = null;
            this.switchAxes = !1;
            this.force = c;
            this.offset = b;
            this.setAngle(d);
        };
        a.Bend.prototype = new a.Modifier();
        a.Bend.prototype.constructor = a.Bend;
        a.Bend.prototype.setAngle = function (c) {
            this.angle = c;
            this.m1 = new a.Matrix();
            this.m1.rotate(c);
            this.m2 = new a.Matrix();
            this.m2.rotate(-c);
        };
        a.Bend.prototype.setModifiable = function (c) {
            a.Modifier.prototype.setModifiable.call(this, c);
            this.max = this.switchAxes ? this.mod.midAxis : this.mod.maxAxis;
            this.min = this.mod.minAxis;
            this.mid = this.switchAxes ? this.mod.maxAxis : this.mod.midAxis;
            this.width = this.mod.getSize(this.max);
            this.height = this.mod.getSize(this.mid);
            this.origin = this.mod.getMin(this.max);
            this.diagAngle = Math.atan(this.width / this.height);
        };
        a.Bend.prototype.apply = function () {
            if (this.force != 0) {
                for (
                    var c = this.mod.getVertices(),
                        b = c.length,
                        d = this.width,
                        e = this.offset,
                        f = this.origin,
                        g = this.max,
                        h = this.min,
                        i = this.mid,
                        n = this.m1,
                        m = this.m2,
                        o = f + d * e,
                        k = d / Math.PI / this.force,
                        p = a.Constants.doublePI * (d / (k * a.Constants.doublePI)),
                        l,
                        j,
                        q,
                        r,
                        t = 1 / d,
                        s = a.Constants.halfPI,
                        u = Math.sin,
                        v = Math.cos;
                    --b >= 0;

                ) {
                    (d = c[b]),
                        (l = d.getValue(g)),
                        (j = d.getValue(i)),
                        (q = d.getValue(h)),
                        (j = n.transformPoint(new a.Point(l, j))),
                        (l = j.x),
                        (j = j.y),
                        (r = (l - f) * t),
                        (this.constraint == a.ModConstant.LEFT && r <= e) ||
                            (this.constraint == a.ModConstant.RIGHT && r >= e) ||
                            ((r = s - p * e + p * r),
                            (l = u(r) * (k + q)),
                            (r = v(r) * (k + q)),
                            (q = l - k),
                            (l = o - r)),
                        (j = m.transformPoint(new a.Point(l, j))),
                        (l = j.x),
                        (j = j.y),
                        d.setValue(g, l),
                        d.setValue(i, j),
                        d.setValue(h, q);
                }
            }
        };
    })(MOD3);
    (function (a) {
        a.LibraryThree = function () {
            this.id = 'Three.js';
            this.meshClass = a.MeshThree;
            this.vertexClass = a.VertexThree;
        };
        a.LibraryThree.prototype = new a.Library3d();
        a.LibraryThree.prototype.constructor = a.LibraryThree;
    })(MOD3);
    (function (a) {
        a.VertexThree = function (a) {
            this.mesh = a;
        };
        a.VertexThree.prototype = new a.VertexProxy();
        a.VertexThree.prototype.setVertex = function (a) {
            this.vertex = a;
            this.originalX = a.x;
            this.originalY = a.y;
            this.originalZ = a.z;
        };
        a.VertexThree.prototype.getX = function () {
            return this.vertex.x;
        };
        a.VertexThree.prototype.getY = function () {
            return this.vertex.y;
        };
        a.VertexThree.prototype.getZ = function () {
            return this.vertex.z;
        };
        a.VertexThree.prototype.setX = function (a) {
            this.vertex.x = a;
            a = this.mesh;
            a.geometry.verticesNeedUpdate = !0;
            a.geometry.normalsNeedUpdate = !0;
            a.geometry.buffersNeedUpdate = !0;
            a.geometry.dynamic = !0;
        };
        a.VertexThree.prototype.setY = function (a) {
            this.vertex.y = a;
            a = this.mesh;
            a.geometry.verticesNeedUpdate = !0;
            a.geometry.normalsNeedUpdate = !0;
            a.geometry.buffersNeedUpdate = !0;
            a.geometry.dynamic = !0;
        };
        a.VertexThree.prototype.setZ = function (a) {
            this.vertex.z = a;
            a = this.mesh;
            a.geometry.verticesNeedUpdate = !0;
            a.geometry.normalsNeedUpdate = !0;
            a.geometry.buffersNeedUpdate = !0;
            a.geometry.dynamic = !0;
        };
    })(MOD3);
    (function (a) {
        a.MeshThree = function () {};
        a.MeshThree.prototype = new a.MeshProxy();
        a.MeshThree.prototype.setMesh = function (c) {
            a.MeshProxy.prototype.setMesh.call(this, c);
            for (
                var c = [],
                    b = 0,
                    d = this.mesh.geometry.vertices,
                    e = d.length,
                    f = this.mesh.geometry.faces,
                    g = f.length,
                    h,
                    b = 0;
                b < e;

            ) {
                (h = new a.VertexThree(this.mesh)), h.setVertex(d[b]), this.vertices.push(h), (c[d[b]] = h), b++;
            }
            for (b = 0; b < g; ) {
                (e = new a.FaceProxy()),
                    f[b] instanceof THREE.Face3
                        ? (e.addVertex(c[d[f[b].a]]), e.addVertex(c[d[f[b].b]]), e.addVertex(c[d[f[b].c]]))
                        : f[b] instanceof THREE.Face4 &&
                          (e.addVertex(c[d[f[b].a]]),
                          e.addVertex(c[d[f[b].b]]),
                          e.addVertex(c[d[f[b].c]]),
                          e.addVertex(c[d[f[b].d]])),
                    this.faces.push(e),
                    b++;
            }
            delete lookup;
        };
        a.MeshThree.prototype.updateMeshPosition = function (a) {
            var b = this.mesh;
            b.position.x += a.x;
            b.position.y += a.y;
            b.position.z += a.z;
        };
    })(MOD3);
}

{
    /**
     * Tween.js - Licensed under the MIT license
     * https://github.com/sole/tween.js
     * ----------------------------------------------
     *
     * See https://github.com/sole/tween.js/graphs/contributors for the full list of contributors.
     * Thank you all, you're awesome!
     */

    // performance.now polyfill
    (function (root) {
        if ('performance' in root === false) {
            root.performance = {};
        }

        // IE 8
        Date.now =
            Date.now ||
            function () {
                return new Date().getTime();
            };

        if ('now' in root.performance === false) {
            var offset =
                root.performance.timing && root.performance.timing.navigationStart
                    ? performance.timing.navigationStart
                    : Date.now();

            root.performance.now = function () {
                return Date.now() - offset;
            };
        }
    })(this);

    FLIPBOOK.TWEEN =
        FLIPBOOK.TWEEN ||
        (function () {
            var _tweens = [];

            return {
                REVISION: '14',

                getAll: function () {
                    return _tweens;
                },

                removeAll: function () {
                    _tweens = [];
                },

                add: function (tween) {
                    _tweens.push(tween);
                },

                remove: function (tween) {
                    var i = _tweens.indexOf(tween);

                    if (i !== -1) {
                        _tweens.splice(i, 1);
                    }
                },

                update: function (time) {
                    if (_tweens.length === 0) {
                        return false;
                    }

                    var i = 0;

                    time = time !== undefined ? time : window.performance.now();

                    while (i < _tweens.length) {
                        if (_tweens[i].update(time)) {
                            i++;
                        } else {
                            _tweens.splice(i, 1);
                        }
                    }

                    return true;
                },
            };
        })();

    FLIPBOOK.TWEEN.Tween = function (object) {
        var _object = object;
        var _valuesStart = {};
        var _valuesEnd = {};
        var _valuesStartRepeat = {};
        var _duration = 1000;
        var _repeat = 0;
        var _yoyo = false;
        var _isPlaying = false;
        var _reversed = false;
        var _delayTime = 0;
        var _startTime = null;
        var _easingFunction = FLIPBOOK.TWEEN.Easing.Linear.None;
        var _interpolationFunction = FLIPBOOK.TWEEN.Interpolation.Linear;
        var _chainedTweens = [];
        var _onStartCallback = null;
        var _onStartCallbackFired = false;
        var _onUpdateCallback = null;
        var _onCompleteCallback = null;
        var _onStopCallback = null;

        // Set all starting values present on the target object
        for (var field in object) {
            _valuesStart[field] = parseFloat(object[field], 10);
        }

        this.to = function (properties, duration) {
            if (duration !== undefined) {
                _duration = duration;
            }

            _valuesEnd = properties;

            return this;
        };

        this.start = function (time) {
            FLIPBOOK.TWEEN.add(this);

            _isPlaying = true;

            _onStartCallbackFired = false;

            _startTime = time !== undefined ? time : window.performance.now();
            _startTime += _delayTime;

            for (var property in _valuesEnd) {
                // check if an Array was provided as property value
                if (_valuesEnd[property] instanceof Array) {
                    if (_valuesEnd[property].length === 0) {
                        continue;
                    }

                    // create a local copy of the Array with the start value at the front
                    _valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);
                }

                _valuesStart[property] = _object[property];

                if (_valuesStart[property] instanceof Array === false) {
                    _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                }

                _valuesStartRepeat[property] = _valuesStart[property] || 0;
            }

            return this;
        };

        this.stop = function () {
            if (!_isPlaying) {
                return this;
            }

            FLIPBOOK.TWEEN.remove(this);
            _isPlaying = false;

            if (_onStopCallback !== null) {
                _onStopCallback.call(_object);
            }

            this.stopChainedTweens();
            return this;
        };

        this.stopChainedTweens = function () {
            for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
                _chainedTweens[i].stop();
            }
        };

        this.delay = function (amount) {
            _delayTime = amount;
            return this;
        };

        this.repeat = function (times) {
            _repeat = times;
            return this;
        };

        this.yoyo = function (yoyo) {
            _yoyo = yoyo;
            return this;
        };

        this.easing = function (easing) {
            _easingFunction = easing;
            return this;
        };

        this.interpolation = function (interpolation) {
            _interpolationFunction = interpolation;
            return this;
        };

        this.chain = function () {
            _chainedTweens = arguments;
            return this;
        };

        this.onStart = function (callback) {
            _onStartCallback = callback;
            return this;
        };

        this.onUpdate = function (callback) {
            _onUpdateCallback = callback;
            return this;
        };

        this.onComplete = function (callback) {
            _onCompleteCallback = callback;
            return this;
        };

        this.onStop = function (callback) {
            _onStopCallback = callback;
            return this;
        };

        this.update = function (time) {
            var property;

            if (time < _startTime) {
                return true;
            }

            if (_onStartCallbackFired === false) {
                if (_onStartCallback !== null) {
                    _onStartCallback.call(_object);
                }

                _onStartCallbackFired = true;
            }

            var elapsed = (time - _startTime) / _duration;
            elapsed = elapsed > 1 ? 1 : elapsed;

            var value = _easingFunction(elapsed);

            for (property in _valuesEnd) {
                var start = _valuesStart[property] || 0;
                var end = _valuesEnd[property];

                if (end instanceof Array) {
                    _object[property] = _interpolationFunction(end, value);
                } else {
                    // Parses relative end values with start as base (e.g.: +10, -3)
                    if (typeof end === 'string') {
                        end = start + parseFloat(end, 10);
                    }

                    // protect against non numeric properties.
                    if (typeof end === 'number') {
                        _object[property] = start + (end - start) * value;
                    }
                }
            }

            if (_onUpdateCallback !== null) {
                _onUpdateCallback.call(_object, value);
            }

            if (elapsed == 1) {
                if (_repeat > 0) {
                    if (isFinite(_repeat)) {
                        _repeat--;
                    }

                    // reassign starting values, restart by making startTime = now
                    for (property in _valuesStartRepeat) {
                        if (typeof _valuesEnd[property] === 'string') {
                            _valuesStartRepeat[property] =
                                _valuesStartRepeat[property] + parseFloat(_valuesEnd[property], 10);
                        }

                        if (_yoyo) {
                            var tmp = _valuesStartRepeat[property];
                            _valuesStartRepeat[property] = _valuesEnd[property];
                            _valuesEnd[property] = tmp;
                        }

                        _valuesStart[property] = _valuesStartRepeat[property];
                    }

                    if (_yoyo) {
                        _reversed = !_reversed;
                    }

                    _startTime = time + _delayTime;

                    return true;
                } else {
                    if (_onCompleteCallback !== null) {
                        _onCompleteCallback.call(_object);
                    }

                    for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
                        _chainedTweens[i].start(time);
                    }

                    return false;
                }
            }

            return true;
        };
    };

    FLIPBOOK.TWEEN.Easing = {
        Linear: {
            None: function (k) {
                return k;
            },
        },

        Quadratic: {
            In: function (k) {
                return k * k;
            },

            Out: function (k) {
                return k * (2 - k);
            },

            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k;
                }
                return -0.5 * (--k * (k - 2) - 1);
            },
        },

        Cubic: {
            In: function (k) {
                return k * k * k;
            },

            Out: function (k) {
                return --k * k * k + 1;
            },

            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k;
                }
                return 0.5 * ((k -= 2) * k * k + 2);
            },
        },

        Quartic: {
            In: function (k) {
                return k * k * k * k;
            },

            Out: function (k) {
                return 1 - --k * k * k * k;
            },

            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k * k;
                }
                return -0.5 * ((k -= 2) * k * k * k - 2);
            },
        },

        Quintic: {
            In: function (k) {
                return k * k * k * k * k;
            },

            Out: function (k) {
                return --k * k * k * k * k + 1;
            },

            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k * k * k;
                }
                return 0.5 * ((k -= 2) * k * k * k * k + 2);
            },
        },

        Sinusoidal: {
            In: function (k) {
                return 1 - Math.cos((k * Math.PI) / 2);
            },

            Out: function (k) {
                return Math.sin((k * Math.PI) / 2);
            },

            InOut: function (k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            },
        },

        Exponential: {
            In: function (k) {
                return k === 0 ? 0 : Math.pow(1024, k - 1);
            },

            Out: function (k) {
                return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
            },

            InOut: function (k) {
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if ((k *= 2) < 1) {
                    return 0.5 * Math.pow(1024, k - 1);
                }
                return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
            },
        },

        Circular: {
            In: function (k) {
                return 1 - Math.sqrt(1 - k * k);
            },

            Out: function (k) {
                return Math.sqrt(1 - --k * k);
            },

            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return -0.5 * (Math.sqrt(1 - k * k) - 1);
                }
                return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
            },
        },

        Elastic: {
            In: function (k) {
                var s;
                var a = 0.1;
                var p = 0.4;
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = (p * Math.asin(1 / a)) / (2 * Math.PI);
                }
                return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p));
            },

            Out: function (k) {
                var s;
                var a = 0.1;
                var p = 0.4;
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = (p * Math.asin(1 / a)) / (2 * Math.PI);
                }
                return a * Math.pow(2, -10 * k) * Math.sin(((k - s) * (2 * Math.PI)) / p) + 1;
            },

            InOut: function (k) {
                var s;
                var a = 0.1;
                var p = 0.4;
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                } else {
                    s = (p * Math.asin(1 / a)) / (2 * Math.PI);
                }
                if ((k *= 2) < 1) {
                    return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p));
                }
                return a * Math.pow(2, -10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p) * 0.5 + 1;
            },
        },

        Back: {
            In: function (k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s);
            },

            Out: function (k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1;
            },

            InOut: function (k) {
                var s = 1.70158 * 1.525;
                if ((k *= 2) < 1) {
                    return 0.5 * (k * k * ((s + 1) * k - s));
                }
                return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
            },
        },

        Bounce: {
            In: function (k) {
                return 1 - FLIPBOOK.TWEEN.Easing.Bounce.Out(1 - k);
            },

            Out: function (k) {
                if (k < 1 / 2.75) {
                    return 7.5625 * k * k;
                } else if (k < 2 / 2.75) {
                    return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
                } else if (k < 2.5 / 2.75) {
                    return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
                } else {
                    return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
                }
            },

            InOut: function (k) {
                if (k < 0.5) {
                    return FLIPBOOK.TWEEN.Easing.Bounce.In(k * 2) * 0.5;
                }
                return FLIPBOOK.TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
            },
        },
    };

    FLIPBOOK.TWEEN.Interpolation = {
        Linear: function (v, k) {
            var m = v.length - 1;
            var f = m * k;
            var i = Math.floor(f);
            var fn = FLIPBOOK.TWEEN.Interpolation.Utils.Linear;

            if (k < 0) {
                return fn(v[0], v[1], f);
            }
            if (k > 1) {
                return fn(v[m], v[m - 1], m - f);
            }

            return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
        },

        Bezier: function (v, k) {
            var b = 0;
            var n = v.length - 1;
            var pw = Math.pow;
            var bn = FLIPBOOK.TWEEN.Interpolation.Utils.Bernstein;
            var i;

            for (i = 0; i <= n; i++) {
                b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
            }

            return b;
        },

        CatmullRom: function (v, k) {
            var m = v.length - 1;
            var f = m * k;
            var i = Math.floor(f);
            var fn = FLIPBOOK.TWEEN.Interpolation.Utils.CatmullRom;

            if (v[0] === v[m]) {
                if (k < 0) {
                    i = Math.floor((f = m * (1 + k)));
                }

                return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
            } else {
                if (k < 0) {
                    return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
                }
                if (k > 1) {
                    return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
                }

                return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
            }
        },

        Utils: {
            Linear: function (p0, p1, t) {
                return (p1 - p0) * t + p0;
            },

            Bernstein: function (n, i) {
                var fc = FLIPBOOK.TWEEN.Interpolation.Utils.Factorial;
                return fc(n) / fc(i) / fc(n - i);
            },

            Factorial: (function () {
                var a = [1];

                return function (n) {
                    var s = 1;
                    var i;
                    if (a[n]) {
                        return a[n];
                    }
                    for (i = n; i > 1; i--) {
                        s *= i;
                    }
                    return (a[n] = s);
                };
            })(),

            CatmullRom: function (p0, p1, p2, p3, t) {
                var v0 = (p2 - p0) * 0.5;
                var v1 = (p3 - p1) * 0.5;
                var t2 = t * t;
                var t3 = t * t2;
                return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
            },
        },
    };
}

{
    /**
     * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
     * @author mrdoob / http://mrdoob.com/
     * @author yomotsu / https://yomotsu.net/
     */

    FLIPBOOK.CSS3DObject = function (element) {
        THREE.Object3D.call(this);

        this.element = element;
        this.element.style.position = 'absolute';
        this.element.style.pointerEvents = 'auto';

        this.addEventListener('removed', function () {
            this.traverse(function (object) {
                if (object.element instanceof Element && object.element.parentNode !== null) {
                    object.element.parentNode.removeChild(object.element);
                }
            });
        });
    };

    FLIPBOOK.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);
    FLIPBOOK.CSS3DObject.prototype.constructor = FLIPBOOK.CSS3DObject;

    FLIPBOOK.CSS3DSprite = function (element) {
        FLIPBOOK.CSS3DObject.call(this, element);
    };

    FLIPBOOK.CSS3DSprite.prototype = Object.create(FLIPBOOK.CSS3DObject.prototype);
    FLIPBOOK.CSS3DSprite.prototype.constructor = FLIPBOOK.CSS3DSprite;

    //

    FLIPBOOK.CSS3DRenderer = function () {
        var _this = this;

        var _width;
        var _height;
        var _widthHalf;
        var _heightHalf;

        var matrix = new THREE.Matrix4();

        var cache = {
            camera: { fov: 0, style: '' },
            objects: new WeakMap(),
        };

        var domElement = document.createElement('div');
        domElement.style.overflow = 'hidden';

        this.domElement = domElement;

        var cameraElement = document.createElement('div');

        cameraElement.style.WebkitTransformStyle = 'preserve-3d';
        cameraElement.style.transformStyle = 'preserve-3d';
        cameraElement.style.pointerEvents = 'none';

        domElement.appendChild(cameraElement);

        var isIE = /Trident/i.test(navigator.userAgent);

        this.getSize = function () {
            return {
                width: _width,
                height: _height,
            };
        };

        this.setSize = function (width, height) {
            _width = width;
            _height = height;
            _widthHalf = _width / 2;
            _heightHalf = _height / 2;

            domElement.style.width = width + 'px';
            domElement.style.height = height + 'px';

            cameraElement.style.width = width + 'px';
            cameraElement.style.height = height + 'px';
        };

        function epsilon(value) {
            return Math.abs(value) < 1e-10 ? 0 : value;
        }

        function getCameraCSSMatrix(matrix) {
            var elements = matrix.elements;

            return (
                'matrix3d(' +
                epsilon(elements[0]) +
                ',' +
                epsilon(-elements[1]) +
                ',' +
                epsilon(elements[2]) +
                ',' +
                epsilon(elements[3]) +
                ',' +
                epsilon(elements[4]) +
                ',' +
                epsilon(-elements[5]) +
                ',' +
                epsilon(elements[6]) +
                ',' +
                epsilon(elements[7]) +
                ',' +
                epsilon(elements[8]) +
                ',' +
                epsilon(-elements[9]) +
                ',' +
                epsilon(elements[10]) +
                ',' +
                epsilon(elements[11]) +
                ',' +
                epsilon(elements[12]) +
                ',' +
                epsilon(-elements[13]) +
                ',' +
                epsilon(elements[14]) +
                ',' +
                epsilon(elements[15]) +
                ')'
            );
        }

        function getObjectCSSMatrix(matrix, cameraCSSMatrix) {
            var elements = matrix.elements;
            var matrix3d =
                'matrix3d(' +
                epsilon(elements[0]) +
                ',' +
                epsilon(elements[1]) +
                ',' +
                epsilon(elements[2]) +
                ',' +
                epsilon(elements[3]) +
                ',' +
                epsilon(-elements[4]) +
                ',' +
                epsilon(-elements[5]) +
                ',' +
                epsilon(-elements[6]) +
                ',' +
                epsilon(-elements[7]) +
                ',' +
                epsilon(elements[8]) +
                ',' +
                epsilon(elements[9]) +
                ',' +
                epsilon(elements[10]) +
                ',' +
                epsilon(elements[11]) +
                ',' +
                epsilon(elements[12]) +
                ',' +
                epsilon(elements[13]) +
                ',' +
                epsilon(elements[14]) +
                ',' +
                epsilon(elements[15]) +
                ')';

            if (isIE) {
                return (
                    'translate(-50%,-50%)' +
                    'translate(' +
                    _widthHalf +
                    'px,' +
                    _heightHalf +
                    'px)' +
                    cameraCSSMatrix +
                    matrix3d
                );
            }

            return 'translate(-50%,-50%)' + matrix3d;
        }

        function renderObject(object, scene, camera, cameraCSSMatrix) {
            if (object instanceof FLIPBOOK.CSS3DObject) {
                object.onBeforeRender(_this, scene, camera);

                var style;

                if (object instanceof FLIPBOOK.CSS3DSprite) {
                    // http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

                    matrix.copy(camera.matrixWorldInverse);
                    matrix.transpose();
                    matrix.copyPosition(object.matrixWorld);
                    matrix.scale(object.scale);

                    matrix.elements[3] = 0;
                    matrix.elements[7] = 0;
                    matrix.elements[11] = 0;
                    matrix.elements[15] = 1;

                    style = getObjectCSSMatrix(matrix, cameraCSSMatrix);
                } else {
                    style = getObjectCSSMatrix(object.matrixWorld, cameraCSSMatrix);
                }

                var element = object.element;
                var cachedObject = cache.objects.get(object);

                if (cachedObject === undefined || cachedObject.style !== style) {
                    element.style.WebkitTransform = style;
                    element.style.transform = style;

                    var objectData = { style: style };

                    if (isIE) {
                        objectData.distanceToCameraSquared = getDistanceToSquared(camera, object);
                    }

                    cache.objects.set(object, objectData);
                }

                if (element.parentNode !== cameraElement) {
                    cameraElement.appendChild(element);
                }

                object.onAfterRender(_this, scene, camera);
            }

            for (var i = 0, l = object.children.length; i < l; i++) {
                renderObject(object.children[i], scene, camera, cameraCSSMatrix);
            }
        }

        var getDistanceToSquared = (function () {
            var a = new THREE.Vector3();
            var b = new THREE.Vector3();

            return function (object1, object2) {
                a.setFromMatrixPosition(object1.matrixWorld);
                b.setFromMatrixPosition(object2.matrixWorld);

                return a.distanceToSquared(b);
            };
        })();

        function filterAndFlatten(scene) {
            var result = [];

            scene.traverse(function (object) {
                if (object instanceof THREE.CSS3DObject) {
                    result.push(object);
                }
            });

            return result;
        }

        function zOrder(scene) {
            var sorted = filterAndFlatten(scene).sort(function (a, b) {
                var distanceA = cache.objects.get(a).distanceToCameraSquared;
                var distanceB = cache.objects.get(b).distanceToCameraSquared;

                return distanceA - distanceB;
            });

            var zMax = sorted.length;

            for (var i = 0, l = sorted.length; i < l; i++) {
                sorted[i].element.style.zIndex = zMax - i;
            }
        }

        this.render = function (scene, camera) {
            var fov = camera.projectionMatrix.elements[5] * _heightHalf;

            if (cache.camera.fov !== fov) {
                if (camera.isPerspectiveCamera) {
                    domElement.style.WebkitPerspective = fov + 'px';
                    domElement.style.perspective = fov + 'px';
                } else {
                    domElement.style.WebkitPerspective = '';
                    domElement.style.perspective = '';
                }

                cache.camera.fov = fov;
            }

            if (scene.autoUpdate === true) {
                scene.updateMatrixWorld();
            }
            if (camera.parent === null) {
                camera.updateMatrixWorld();
            }

            if (camera.isOrthographicCamera) {
                var tx = -(camera.right + camera.left) / 2;
                var ty = (camera.top + camera.bottom) / 2;
            }

            var cameraCSSMatrix = camera.isOrthographicCamera
                ? 'scale(' +
                  fov +
                  ')' +
                  'translate(' +
                  epsilon(tx) +
                  'px,' +
                  epsilon(ty) +
                  'px)' +
                  getCameraCSSMatrix(camera.matrixWorldInverse)
                : 'translateZ(' + fov + 'px)' + getCameraCSSMatrix(camera.matrixWorldInverse);

            var style = cameraCSSMatrix + 'translate(' + _widthHalf + 'px,' + _heightHalf + 'px)';

            if (cache.camera.style !== style && !isIE) {
                cameraElement.style.WebkitTransform = style;
                cameraElement.style.transform = style;

                cache.camera.style = style;
            }

            renderObject(scene, scene, camera, cameraCSSMatrix);

            if (isIE) {
                // IE10 and 11 does not support 'preserve-3d'.
                // Thus, z-order in 3D will not work.
                // We have to calc z-order manually and set CSS z-index for IE.
                // FYI: z-index can't handle object intersection
                zOrder(scene);
            }
        };
    };
}
