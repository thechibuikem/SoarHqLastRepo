/*
 * Real3D FlipBook [https://real3dflipbook.com]
 * @author creativeinteractivemedia [https://codecanyon.net/user/creativeinteractivemedia/portfolio]
 * @version 3.50
 * @date 2024-07-04
 */
var FLIPBOOK = FLIPBOOK || {};

FLIPBOOK.Book3 = function (el, main, options) {
    this.options = options;
    this.main = main;

    this.singlePage = options.singlePageMode;
    this.pageWidth = this.options.pageWidth;
    this.pageHeight = this.options.pageHeight;

    this.wrapper = el;
    this.wrapper.classList.add('flipbook-book3');
    this.bookLayer = this.wrapper.parentNode;

    this.flipEasing = 'easeOutQuad';

    this.translateZ = '';

    this.iscroll = new FLIPBOOK.IScroll(this.bookLayer, {
        zoom: true,
        scrollX: true,
        scrollY: true,
        scrollbars: true,
        keepInCenterV: true,
        keepInCenterH: true,
        freeScroll: true,
        preventDefault: false,
    });

    main.on('disableIScroll', () => {
        this.disableIscroll();
    });
    main.on('enableIScroll', () => {
        this.enableIscroll();
    });
    this.iscroll.on('zoomEnd', () => {
        if (isNaN(this.iscroll.scale)) {
            return this.zoomTo(options.zoomMin);
        }

        options.main.onZoom(this.iscroll.scale / this.ratio);
        this.updateVisiblePages();

        let zoomed = options.main.zoom > 1;

        if (this.zoomed !== zoomed) {
            const scrollOptions = this.iscroll.options;
            scrollOptions.eventPassthrough = zoomed ? '' : 'vertical';
            scrollOptions.freeScroll = zoomed;
            this.iscroll.refresh();
            this.zooed = zoomed;
        }
    });

    this.wrapper.style.width = `${2 * this.pageWidth}px`;
    this.wrapper.style.height = `${this.pageHeight}px`;

    this.centerContainer = document.createElement('div');
    this.wrapper.appendChild(this.centerContainer);
    this.centerContainer.className = 'flipbook-center-container3';
    this.centerContainer.style.width = `${2 * this.pageWidth}px`;
    this.centerContainer.style.height = `${this.pageHeight}px`;

    let perspective = 200000;
    if (this.options.perspective) {
        perspective = this.options.perspective;
    } else if (this.options.viewMode === '3d') {
        perspective = 3 * this.pageHeight;
    }

    this.centerContainer.style.perspective = `${perspective}px`;

    this.pagesArr = [];
    this.animating = false;

    var p = this.options.pages;
    this.numPages = p.length;
    var numSheets = p.length / 2;
    if (!this.options.cover) {
        numSheets += 1;
    }

    if (this.singlePage) {
        numSheets = p.length;
    }

    for (var i = 0; i < numSheets; i++) {
        var page = new FLIPBOOK.Page3(this, i);
        this.pagesArr.push(page);
        this.centerContainer.appendChild(page.wrapper);
    }
};

FLIPBOOK.Book3.prototype = Object.create(FLIPBOOK.Book.prototype);

FLIPBOOK.Book3.prototype.constructor = FLIPBOOK.Book3;

FLIPBOOK.Book3.prototype.enableIscroll = function () {
    if (this.iscrollDisabled) {
        this.iscroll.enable();
        this.iscrollDisabled = false;
    }
};

FLIPBOOK.Book3.prototype.disableIscroll = function () {
    if (!this.iscrollDisabled) {
        this.iscroll.disable();
        this.iscroll.initiated = false;
        this.iscrollDisabled = true;
    }
};

FLIPBOOK.Book3.prototype.enableMouseWheelZoom = function () {
    this.iscroll.options.eventPassthrough = 'vertical';
    this.iscroll.refresh();
};

FLIPBOOK.Book3.prototype.disableMouseWheelZoom = function () {
    this.iscroll.options.eventPassthrough = '';
    this.iscroll.refresh();
};

FLIPBOOK.Book3.prototype.enablePrev = function (val) {
    this.prevEnabled = val;
};

FLIPBOOK.Book3.prototype.enablePan = function () {
    this.iscroll.enable();
};

FLIPBOOK.Book3.prototype.disablePan = function () {
    this.iscroll.disable();
};

FLIPBOOK.Book3.prototype.setRightIndex = function (val) {
    this.rightIndex = val;
};

FLIPBOOK.Book3.prototype.enableNext = function (val) {
    this.nextEnabled = val;
};

FLIPBOOK.Book3.prototype.isZoomed = function () {
    return this.options.main.zoom > this.options.zoomMin && this.options.main.zoom > 1;
};

FLIPBOOK.Book3.prototype.getNumPages = function () {};

FLIPBOOK.Book3.prototype.move = function (direction) {
    if (this.zoom <= 1) {
        return;
    }

    var iscroll = this.iscroll;
    var offset2 = 0;

    if (iscroll) {
        var posX = iscroll.x;
        var posY = iscroll.y;
        var offset = 20 * this.zoom;
        switch (direction) {
            case 'left':
                posX += offset;
                break;
            case 'right':
                posX -= offset;
                break;
            case 'up':
                posY += offset;
                break;
            case 'down':
                posY -= offset;
                break;
        }

        if (posX > 0) {
            posX = offset2;
        }
        if (posX < iscroll.maxScrollX) {
            posX = iscroll.maxScrollX - offset2;
        }
        if (posY > 0) {
            posY = offset2;
        }
        if (posY < iscroll.maxScrollY) {
            posY = iscroll.maxScrollY - offset2;
        }

        iscroll.scrollTo(posX, posY, 0);
    }
};

FLIPBOOK.Book3.prototype.zoomTo = function (zoom, time, x, y) {
    if (!this.enabled) {
        return;
    }

    x = x || 0;
    y = y || 0;
    time = time || 0;
    this.zoom = zoom;

    time = 0;

    var iscroll = this.iscroll;
    if (iscroll) {
        iscroll.zoom(zoom * this.ratio, x, y, time);
    }
};

FLIPBOOK.Book3.prototype.setWrapperW = function (w) {
    if (this.wrapperW != w) {
        this.wrapper.style.width = w + 'px';
        this.wrapperW = w;
    }
};

FLIPBOOK.Book3.prototype.updateBookPosition = function () {
    if (this.options.singlePageMode) {
        this.setWrapperW(this.pageWidth);
        if (this.iscroll) {
            this.iscroll.refresh();
        }
        this.view = 1;
        this.focusRight();
        return;
    }

    if (this.view == 1) {
        this.setWrapperW(this.pageWidth);
    } else {
        this.setWrapperW(2 * this.pageWidth);
    }
    if (this.iscroll) {
        this.iscroll.refresh();
    }

    if (this.view == 2) {
        if (this.isCover()) {
            this.focusRight();
        } else if (this.isBackCover()) {
            if (!this.options.cover) {
                this.focusBoth();
            } else {
                this.focusLeft();
            }
        } else {
            this.focusBoth();
        }
    } else if (this.view == 1) {
        if (this.isCover()) {
            this.focusRight();
        } else if (this.isBackCover()) {
            this.focusLeft();
        }
    }
};

FLIPBOOK.Book3.prototype.focusLeft = function (time, delay) {
    var pos = this.view == 1 || this.options.singlePageMode ? 0 : this.pageWidth / 2;

    this.setBookPosition(pos, time, delay);
};

FLIPBOOK.Book3.prototype.focusRight = function (time, delay, updatePageNumber) {
    var pos = this.view == 1 || this.options.singlePageMode ? -this.pageWidth : -this.pageWidth / 2;

    this.setBookPosition(pos, time, delay, updatePageNumber);
};

FLIPBOOK.Book3.prototype.focusBoth = function (time, delay) {
    var pos = this.view == 1 ? -this.pageWidth / 2 : 0;

    this.setBookPosition(pos, time, delay);
};

FLIPBOOK.Book3.prototype.setBookPosition = function (pos, time, delay, updatePageNumber) {
    if (this.centerContainerPosition == pos) {
        return;
    }
    var start = this.centerContainerPosition;

    if (time) {
        var self = this;
        delay = delay || 0;

        const animationParams = {
            from: start,
            to: pos,
            delay,
            duration: time,
            step(now) {
                self.centerContainer.style.transform = 'translateX(' + now + 'px) ' + self.translateZ;
            },
            complete() {
                self.centerContainerPosition = pos;
                if (updatePageNumber) {
                    self.updateFlipped();
                    self.options.main.turnPageComplete();
                }
            },
        };

        this.animate(animationParams);
    } else if (this.centerContainerPosition != pos) {
        this.centerContainerPosition = pos;
        this.centerContainer.style.transform = 'translateX(' + pos + 'px) ' + this.translateZ;

        this.updateFlipped();
        this.options.main.turnPageComplete();
    }
};

FLIPBOOK.Book3.prototype.updateVisiblePages = function (loadNextPrev) {
    if (typeof loadNextPrev == 'undefined') {
        loadNextPrev = true;
    }
    var self = this;

    var index = this.rightIndex;
    if (!this.singlePage) {
        index /= 2;
    }

    // if (!this.options.backCover && this.options.rightToLeft) {
    //     index--;
    // }

    var right = this.pagesArr[index];
    var next = this.pagesArr[index + 1];
    var left = this.pagesArr[index - 1];
    var prev = this.pagesArr[index - 2];

    if (left) {
        left._setAngle(180);
    }
    if (right) {
        right._setAngle(0);
    }

    for (var i = 0; i < this.pagesArr.length; i++) {
        if (this.pagesArr[i] == right) {
            this.pagesArr[i].show();
            this.pagesArr[i].unpauseHtml('front');
            this.pagesArr[i].pauseHtml('back');
        } else if (this.pagesArr[i] == left && !this.singlePage) {
            this.pagesArr[i].show();
            this.pagesArr[i].unpauseHtml('back');
            this.pagesArr[i].pauseHtml('front');
        } else {
            this.pagesArr[i].hide();
            this.pagesArr[i].pauseHtml('front');
            this.pagesArr[i].pauseHtml('back');
        }

        this.pagesArr[i]._setZIndex(0);
    }
    this.updateBookPosition();

    if (left && !this.singlePage) {
        self.options.main.setLoadingProgress(0.1);
        left.load('back', function () {
            self.options.main.setLoadingProgress(1);
            left.startHTML('back');
            if (right) {
                self.options.main.setLoadingProgress(0.1);
                right.load('front', function () {
                    self.options.main.setLoadingProgress(1);
                    right.load('back', null, true);
                    if (next) {
                        next.load('front', null, true);
                    }
                    if (!self.options.doublePage || self.view != 2) {
                        right.startHTML('front');
                    }
                });
            } else {
                left.load('front', null, true);
                if (prev) {
                    prev.load('back', null, true);
                }
            }
        });
    } else {
        self.options.main.setLoadingProgress(0.1);
        right.load('front', function () {
            self.options.main.setLoadingProgress(1);
            if (!self.singlePage) {
                right.load('back', null, true);
            } else {
                if (left) {
                    left.load('front', null, true);
                }
            }
            if (next) {
                next.load('front', null, true);
            }
            right.startHTML('front');
        });
    }
};

FLIPBOOK.Book3.prototype.enable = function () {
    this.onResize();
    this.enabled = true;
};

FLIPBOOK.Book3.prototype.disable = function () {
    this.onResize();
    this.enabled = false;
};

FLIPBOOK.Book3.prototype.getLeftPage = function () {
    return this.pagesArr[this.flippedleft - 1];
};

FLIPBOOK.Book3.prototype.getRightPage = function () {
    return this.pagesArr[this.flippedleft];
};

FLIPBOOK.Book3.prototype.getLeftBackPage = function () {
    return this.pagesArr[this.flippedleft - 2];
};

FLIPBOOK.Book3.prototype.getRightBackPage = function () {
    return this.pagesArr[this.flippedleft + 1];
};

FLIPBOOK.Book3.prototype.getNextPage = function () {
    return this.pagesArr[this.flippedleft + 2];
};

FLIPBOOK.Book3.prototype.getPrevPage = function () {
    return this.pagesArr[this.flippedleft - 3];
};

FLIPBOOK.Book3.prototype.nextPage = function () {
    if (!this.nextEnabled) {
        return;
    }

    if (this.view == 1 && this.isFocusedLeft() && !this.singlePage) {
        var duration = 700;
        var d = (this.options.pageFlipDuration * duration) / 2;
        this.focusRight(d, 0, true);
        return;
    }
    this.goToPage(this.rightIndex + 2);
};

FLIPBOOK.Book3.prototype.prevPage = function () {
    if (!this.prevEnabled) {
        return;
    }

    if (this.view == 1 && this.isFocusedRight() && !this.singlePage) {
        var duration = 700;
        var d = (this.options.pageFlipDuration * duration) / 2;
        this.focusLeft(d, 0, true);
        return;
    }
    var target = this.singlePage ? this.rightIndex : this.rightIndex - 2;
    this.goToPage(target);
};

FLIPBOOK.Book3.prototype.goToPage = function (index, instant) {
    if (!this.enabled) {
        return;
    }

    if (this.flipping) {
        return;
    }

    if (this.singlePage || index % 2 != 0) {
        index--;
    }

    if (index < 0) {
        index = 0;
    }

    if (index > this.options.pages.length) {
        index = this.options.pages.length;
    }

    if (index == this.rightIndex) {
        return;
    }

    if (instant || this.options.instantFlip) {
        this.setRightIndex(index);
        this.updateFlipped();
        this.updateVisiblePages();
        this.options.main.turnPageComplete();
    } else {
        var self = this;
        var end;
        var duration = 600;
        var d = this.options.pageFlipDuration * duration;
        var easing = this.flipEasing;
        if (typeof jQuery.easing[easing] == 'undefined') {
            this.options.main.initEasing();
        }

        if (index > this.rightIndex) {
            end = 180;
            if (self.angle <= 0 || self.angle >= 180 || !self.angle) {
                self.angle = 1;
            }
        } else if (index < this.rightIndex) {
            end = -180;
            if (self.angle >= 0 || self.angle <= -180 || !self.angle) {
                self.angle = -1;
            }
        }

        this.flipping = true;

        if (!this.singlePage) {
            if (this.view == 1) {
                if (index < this.rightIndex) {
                    this.focusRight(d);
                } else {
                    this.focusLeft(d);
                }
            } else {
                if (index == 0) {
                    this.focusRight(d);
                } else if (index == this.pagesArr.length * 2) {
                    this.focusLeft(d);
                } else {
                    this.focusBoth(d);
                }
            }
        }

        this.goingToPage = index;

        if (this.singlePage) {
            d /= 2;
        }

        const animationParams = {
            from: self.angle,
            to: end,
            duration: d,
            easing: easing,
            step(now) {
                self._setPageAngle(now);
            },
            complete() {
                self.setRightIndex(self.goingToPage);
                self.angle = 0;
                self.flipping = false;

                self.updateFlipped();
                self.updateVisiblePages();
                self.options.main.turnPageComplete();
            },
        };
        this.animate(animationParams);

        this.options.main.turnPageStart();
    }
};

FLIPBOOK.Book3.prototype.animate = function (params) {
    const jq = true;
    if (!jq) {
        FLIPBOOK.animate(params);
    } else {
        jQuery({
            someValue: params.from,
        }).animate(
            {
                someValue: params.to,
            },
            params
        );
    }
};

FLIPBOOK.Book3.prototype.updateFlipped = function () {
    if (this.singlePage) {
        this.flippedleft = this.rightIndex;
        this.flippedright = this.options.pages.length - this.rightIndex;
    } else {
        this.flippedleft = (this.rightIndex + (this.rightIndex % 2)) / 2;
        this.flippedright = this.options.pages.length / 2 - this.flippedleft;
    }
};

FLIPBOOK.Book3.prototype.onSwipe = function (event, phase, distanceX, distanceY, duration, fingerCount) {
    if (this.isZoomed() || event.target.className === 'flipbook-page-link' || this.flipping) {
        return;
    }

    const angle = (-distanceX * 180) / this.main.wrapperW;
    const threshold = 5;
    const distance = Math.abs(distanceX);

    if (phase === 'start') {
        this.dragging = true;
        return;
    }

    if ((phase === 'end' || phase === 'cancel') && fingerCount <= 1 && distance > threshold) {
        angle > 0 ? this.nextPage() : this.prevPage();
        this.dragging = false;
        return;
    }

    if (phase === 'move' && fingerCount <= 1 && this.dragging && distance > threshold) {
        let increment = angle > 0 ? (this.singlePage ? 1 : 2) : this.singlePage ? -1 : -2;
        if ((angle > 0 && !this.nextEnabled) || (angle < 0 && !this.prevEnabled)) {
            return;
        }

        this.goingToPage = this.rightIndex + increment;

        if (
            this.goingToPage !== this.rightIndex &&
            this.goingToPage >= 0 &&
            this.goingToPage <= this.pagesArr.length * 2 &&
            !this.options.instantFlip
        ) {
            this._setPageAngle(angle);
        }
    }
};

FLIPBOOK.Book3.prototype.pauseHtml = function () {
    for (var i = 0; i < this.pagesArr.length; i++) {
        this.pagesArr[i].pauseHtml();
    }
};

FLIPBOOK.Book3.prototype._setPageAngle = function (angle) {
    if (this.angle == angle) {
        return;
    }

    this.angle = angle;

    var prev;
    var next;
    var left;
    var right;
    this.angle = angle;
    // this.pauseHtml();

    var ri = this.rightIndex;
    var ri2 = this.goingToPage;
    // if (this.options.rightToLeft && !this.options.backCover) {
    //     ri--;
    //     ri2--;
    // }

    var flippping;

    if (this.singlePage) {
        right = this.pagesArr[ri];
        left = this.pagesArr[ri - 1];
        if (angle > 0) {
            right._setAngle(angle / 2);
            next = this.pagesArr[ri2];
            if (next) {
                next.show();
                next.load('front');
            }
        } else {
            left = this.pagesArr[ri2];
            left.show();
            left.load('front');
            left._setAngle(angle / 2 + 90);
        }

        if (next) {
            next._setAngle(0);
        }
        if (prev) {
            prev._setAngle(90);
        }
    } else {
        right = this.pagesArr[ri / 2];
        left = this.pagesArr[ri / 2 - 1];
        var newRight = this.pagesArr[ri2 / 2 - 1];
        var newLeft = this.pagesArr[ri2 / 2];
        if (angle > 0) {
            if (this.view == 1 && this.isFocusedLeft()) {
                return;
            }
            //flipping from right to left
            //angle 0 -> 180

            if (angle < 90) {
                flippping = right;
                newRight.hide();
            } else {
                flippping = newRight;
                right.hide();
            }
            flippping.show();
            flippping._setAngle(angle);
            next = this.pagesArr[ri2 / 2];
            flippping.load(
                'back',
                function () {
                    if (next) {
                        next.show();
                        next.load('front', null, true);
                    }
                },
                true
            );
        } else {
            if (this.view == 1 && this.isFocusedRight()) {
                return;
            }
            //flipping from left to right
            //angle 0 -> -180

            if (angle > -90) {
                flippping = left;
                newLeft.hide();
            } else {
                flippping = newLeft;
                left.hide();
            }
            flippping.show();
            flippping._setAngle(180 + angle);
            prev = this.pagesArr[ri2 / 2 - 1];
            flippping.load(
                'front',
                function () {
                    if (prev) {
                        prev.show();
                        prev.load('back', null, true);
                    }
                },
                true
            );
        }

        if (next) {
            next._setAngle(0);
        }
        if (prev) {
            prev._setAngle(180);
        }
    }
};

FLIPBOOK.Book3.prototype.isCover = function () {
    return this.rightIndex == 0;
};

FLIPBOOK.Book3.prototype.isBackCover = function () {
    return this.rightIndex == this.options.pages.length;
};

FLIPBOOK.Book3.prototype.onPageUnloaded = function (index) {
    var pageIndex = index;

    if (this.options.rightToLeft) {
        pageIndex = this.options.pages.length - index - 1;
    }

    if (this.pagesArr[pageIndex]) {
        this.pagesArr[pageIndex].unload();
    }
};

FLIPBOOK.Book3.prototype.onResize = function () {
    var self = this;

    var main = this.main;
    var w = main.wrapperW;
    var h = main.wrapperH;
    var bw = main.bookW;
    var bh = main.bookH;
    var pw = main.pageW;
    var ph = main.pageH;
    var r1 = w / h;
    var r2 = pw / ph;
    var options = this.options;

    function fitToHeight() {
        self.ratio = h / bh;
        fit();
    }

    function fitToWidth() {
        self.ratio = self.view == 1 ? w / pw : w / bw;
        fit();
    }

    function fit() {
        if (self.iscroll) {
            self.iscroll.options.zoomMin = self.ratio * options.zoomMin;
        }
        if (self.iscroll) {
            self.iscroll.options.zoomMax = self.ratio * options.zoomMax;
        }

        self.updateBookPosition();
        if (self.iscroll) {
            self.iscroll.zoom(self.ratio * options.main.zoom, w / 2, h / 2, 0);
        }

        self.bookScale = self.iscroll.scale;
    }

    var s = Math.min(this.zoom, 1);

    var zoomMin = Number(this.options.zoomMin);

    if (
        this.singlePage ||
        (this.options.responsiveView &&
            w <= this.options.responsiveViewTreshold &&
            r1 < 2 * r2 &&
            r1 < this.options.responsiveViewRatio)
    ) {
        this.view = 1;

        if (r2 > r1) {
            this.sc = (zoomMin * r1) / (r2 * s);
        } else {
            this.sc = 1;
        }

        if (w / h > pw / ph) {
            fitToHeight();
        } else {
            fitToWidth();
        }
    } else {
        this.view = 2;

        if (r1 < 2 * r2) {
            this.sc = (zoomMin * r1) / (2 * r2 * s);
        } else {
            this.sc = 1;
        }

        if (w / h >= bw / bh) {
            fitToHeight();
        } else {
            fitToWidth();
        }
    }

    this.updateBookPosition();
    this.updateFlipped();
    this.options.main.turnPageComplete();
};

FLIPBOOK.Book3.prototype.isFocusedRight = function () {
    var center = this.view == 1 ? -this.pageWidth / 2 : 0;
    if (this.singlePage) {
        return this.rightIndex % 2 == 0;
    } else {
        return this.centerContainerPosition < center;
    }
};

FLIPBOOK.Book3.prototype.isFocusedLeft = function () {
    var center = this.view == 1 ? -this.pageWidth / 2 : 0;

    if (this.singlePage) {
        return this.rightIndex % 2 == 1;
    } else {
        return this.centerContainerPosition > center;
    }
};

FLIPBOOK.Page3 = function (book, index) {
    this.book = book;
    this.main = book.main;
    this.options = book.options;

    this.index = index;
    this.translateZ = '';
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'flipbook-page3';
    this.wrapper.style.width = book.options.pageWidth + 'px';
    this.wrapper.style.height = book.options.pageHeight + 'px';
    this.angle = 0;

    var options = book.options;

    let preloaderSrc = options.pagePreloader || options.assets.spinner;
    let preloaderClass = options.pagePreloader ? 'flipbook-page-preloader-image' : 'flipbook-page-preloader';

    this.front = document.createElement('div');
    this.wrapper.appendChild(this.front);
    this.front.className = 'flipbook-page3-inner flipbook-page3-inner-front';

    this.bgFront = document.createElement('div');
    this.front.appendChild(this.bgFront);
    this.bgFront.className = 'flipbook-page3-bg';

    this.htmlFront = document.createElement('div');
    this.front.appendChild(this.htmlFront);
    this.htmlFront.className = 'flipbook-page3-html page_' + String(2 * index);
    this.htmlFront.style.width = (1000 * options.pageWidth) / options.pageHeight + 'px';
    this.htmlFront.style.transform = 'scale(' + this.options.pageHeight / 1000 + ') ' + this.translateZ;

    this.html = { front: this.htmlFront };

    this.frontHtmlContentVisible = false;

    this.preloaderFront = new Image();
    this.preloaderFront.src = preloaderSrc;
    this.preloaderFront.className = preloaderClass;
    this.front.appendChild(this.preloaderFront);

    if (!options.singlePageMode) {
        this.back = document.createElement('div');
        this.wrapper.appendChild(this.back);
        this.back.className = 'flipbook-page3-inner flipbook-page3-inner-back';
        this._setVisibility(this.back, false);

        this.bgBack = document.createElement('div');
        this.back.appendChild(this.bgBack);
        this.bgBack.className = 'flipbook-page3-bg';

        this.htmlBack = document.createElement('div');
        this.back.appendChild(this.htmlBack);
        this.htmlBack.className = 'flipbook-page3-html page_' + String(2 * index + 1);
        this.htmlBack.style.width = (1000 * options.pageWidth) / options.pageHeight + 'px';
        this.htmlBack.style.transform = 'scale(' + this.options.pageHeight / 1000 + ') ' + this.translateZ;

        this.html.back = this.htmlBack;

        this.backHtmlContentVisible = false;

        this.preloaderBack = new Image();
        this.preloaderBack.src = preloaderSrc;
        this.preloaderBack.className = preloaderClass;
        this.back.appendChild(this.preloaderBack);
    }

    this.htmlPaused = { front: false, back: false };

    this.hide();
    this.zIndex = 0;

    if (this.options.rightToLeft && !this.options.backCover) {
        index++;
    }
    this.wrapper.style.left = String(this.book.options.pageWidth - 1) + 'px';
};

FLIPBOOK.Page3.prototype = {
    load: function (side, callback, thumb) {
        var pageSize = this.book.pageHeight * this.book.iscroll.scale * window.devicePixelRatio;
        var o = this.options;
        var size = pageSize < o.pageTextureSizeSmall ? o.pageTextureSizeSmall : o.pageTextureSize;
        var isFront = side == 'front' || o.singlePageMode;
        if ((this.sizeFront == size && isFront) || (this.sizeBack == size && !isFront)) {
            if (!thumb) {
                this.loadHTML(side);
            }
            if (callback) {
                callback.call(this);
            }
        } else {
            if (isFront) {
                this.sizeFront = size;
            } else {
                this.sizeBack = size;
            }

            var self = this;

            var pageIndex = o.singlePageMode ? this.index : isFront ? this.index * 2 : this.index * 2 + 1;

            var index = o.rightToLeft ? o.pages.length - pageIndex - 1 : pageIndex;

            o.main.loadPage(index, size, function (page) {
                if (page && page.image) {
                    var img = page.image[size] || page.image;

                    if (isFront && self.options.pages[index].side == 'right') {
                        if (!img.clone) {
                            img.clone = new Image();
                            img.clone.src = img.src;
                        }
                        img = img.clone;
                        img.style.transform = 'translateX(-50%) ' + self.translateZ;
                    }

                    if (isFront) {
                        self.bgFront.replaceChildren(img);
                        self.preloaderFront.style.display = 'none';
                    } else {
                        self.bgBack.replaceChildren(img);
                        self.preloaderBack.style.display = 'none';
                    }

                    if (!thumb) {
                        self.loadHTML(side);
                    }
                }

                if (callback) {
                    callback.call(self);
                }
            });
        }
    },

    loadHTML: function (side) {
        var self = this;

        var isFront = side == 'front';

        var pageIndex = this.options.singlePageMode ? this.index : isFront ? this.index * 2 : this.index * 2 + 1;

        var o = this.options;
        var index = o.rightToLeft ? o.pages.length - pageIndex - 1 : pageIndex;

        if (index < 0) {
            return;
        }

        if (this.htmlContent && this.htmlContent[side]) {
            this.updateHtmlContent(side);
        } else {
            this.options.main.loadPageHTML(index, function (html) {
                self.htmlContent = this.htmlContent || {};
                self.htmlContent[side] = html;
                self.updateHtmlContent(side);
            });
        }
    },

    startHTML: function (side) {
        this.book.startPageItems(this.html[side]);
    },

    unload: function () {
        this.size = null;
        this.mat = false;
        this.pageSize = null;
    },

    pauseHtml: function (side) {
        if (!this.htmlPaused[side]) {
            this.htmlPaused[side] = true;
            const htmlContainer = this.html[side];
            if (!htmlContainer) {
                return;
            }
            this.main.trigger('hidepagehtml', { page: this });

            var mediaElements = htmlContainer.querySelectorAll('video, audio');
            mediaElements.forEach(function (media) {
                media.pause();
            });

            var iframes = htmlContainer.querySelectorAll('iframe');
            for (var i = 0; i < iframes.length; i++) {
                var iframe = iframes[i];
                var src = iframe.src;
                var youtubeRegex = /(?:youtube\.com\/embed\/|youtu\.be\/)/;
                // var youtubeRegex =
                //     /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

                // if (youtubeRegex.test(src)) {
                //     var youtubeVideo = iframe.contentWindow;
                //     youtubeVideo.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                // } else {
                this.removedIframes = this.removedIframes || [];
                this.removedIframes.push({
                    iframe: iframe,
                    parentNode: iframe.parentNode,
                });
                iframe.parentNode.removeChild(iframe);
                // }
            }
        }
    },

    unpauseHtml: function (side) {
        this.htmlPaused[side] = false;
        if (this.removedIframes && this.removedIframes.length) {
            this.removedIframes.forEach(function (obj) {
                obj.parentNode.appendChild(obj.iframe);
            });
        }
        this.removedIframes = [];
    },

    showHtml: function () {
        if (!this.htmlContentVisible) {
            this.htmlContentVisible = true;
        }
    },

    updateHtmlContent: function (side) {
        this.htmlLoaded = this.htmlLoaded || {};
        if (!this.htmlLoaded[side]) {
            var c = this.htmlContent[side];
            if (c.jquery) {
                c = c[0];
            }

            this.htmlLoaded[side] = true;
            var container = this.html[side];
            container.appendChild(c);

            this.main.trigger('showpagehtml', { page: this });
        }
    },

    show: function () {
        if (this.hidden) {
            this.wrapper.style.display = 'block';
            this.setShadowOpacity(0);
            this.showHtml();
        }
        this.hidden = false;
    },

    setShadowOpacity: function (val) {
        if (this.shadowOpacity != val && !this.hidden) {
            this.wrapper.style.setProperty('--page3-shadow-opacity', val);
            this.shadowOpacity = val;
        }
    },

    hide: function () {
        if (!this.hidden) {
            this.wrapper.style.display = 'none';
            this.setShadowOpacity(0);
        }

        this.hidden = true;
    },

    _setVisibility: function (div, visible) {
        if (div && div.dataset.visible != visible) {
            div.dataset.visible = visible;
            div.style.opacity = visible ? '1' : '0';
            div.style.pointerEvents = visible ? 'auto' : 'none';
        }
    },

    _setAngle: function (angle) {
        angle = -angle;

        if (angle != this.angle) {
            this.setShadowOpacity((1 - Math.abs(angle + 90) / 90) * 0.2);
            this.wrapper.style.setProperty('--page3-rotate-y', String(angle + 'deg'));
            this._setVisibility(this.front, angle > -90);
            this._setVisibility(this.back, angle < -90);
            this.angle = angle;
            var i;
            var max = 0;
            for (i = 0; i < this.book.pagesArr.length; i++) {
                if (i != this.index && this.book.pagesArr[i].zIndex > max) {
                    max = this.book.pagesArr[i].zIndex;
                }
            }
            this._setZIndex(max + 1);
        }
    },

    _setZIndex: function (val) {
        if (this.zIndex != val) {
            this.wrapper.style['z-index'] = val;
        }
        this.zIndex = val;
    },
};
