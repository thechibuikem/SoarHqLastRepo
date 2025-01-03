/*
 * Real3D FlipBook [https://real3dflipbook.com]
 * @author creativeinteractivemedia [https://codecanyon.net/user/creativeinteractivemedia/portfolio]
 * @version 3.50
 * @date 2024-07-04
 */
var FLIPBOOK = FLIPBOOK || {};

FLIPBOOK.BookScroll = function (el, wrapper, main, options) {
    this.options = options;
    this.main = main;
    this.singlePage = options.singlePageMode;
    if (this.singlePage) {
        this.view = 1;
    }
    this.view = 1;

    this.pageWidth = options.pageWidth;
    this.pageHeight = options.pageHeight;
    this.rightIndex = 0;

    this.pageGap = 16;

    this.slides = [];
    this.pagesArr = [];
    this.leftPage = 0;
    this.rightPage = 0;
    this.rotation = 0;

    this.verticalScroller = el;

    this.verticalScroller.style.width = this.pageWidth + 'px';

    options.pageGap = this.pageGap;

    for (let i = 0; i < options.numPages; i++) {
        const page = new FLIPBOOK.PageScroll(this, wrapper, main, options, i);
        this.verticalScroller.appendChild(page.wrapper);
        page.initObserver();
        this.pagesArr.push(page);
    }

    //make new div that has width equal to page width, height equal to page height * number of pages

    this.prevPageEnabled = false;

    this.setRightIndex(0);
    this.currentSlide = 0;
    this.flipping = false;

    this.wrapper = wrapper;

    this.verticalScroller.classList.remove('book');
    this.verticalScroller.style.paddingTop = this.pageGap / 2 + 'px';
    this.verticalScroller.style.paddingBottom = this.pageGap / 2 + 'px';
    this.iscroll = new IScroll(this.wrapper, {
        freeScroll: true,
        mouseWheel: true,
        scrollbars: true,
        interactiveScrollbars: true,
        zoom: true,
        scrollX: true,
        scrollY: true,
        keepInCenterV: true,
        keepInCenterH: true,
        preventDefault: false,
        zoomMin: 0.01,
        zoomMax: 10,
        mouseWheelTimeout: 100,
        disablePointer: false,
        disableTouch: false,
        disableMouse: false,
        momentum: true,
    });

    this.main.on('disableIScroll', () => {
        this.disableIscroll();
    });
    this.main.on('enableIScroll', () => {
        this.enableIscroll();
    });

    var self = this;

    this.iscroll.on('scrollStart', function () {
        self.scrolling = true;
    });

    this.iscroll.on('zoomEnd', function () {
        self.updateRightIndex();
    });

    this.iscroll.on('scrollEnd', function () {
        self.updateRightIndex();
        self.scrolling = false;
        self.pagesArr.forEach((page) => {
            if (page.visibility > 0) {
                page.load();
            }
        });
    });

    this.zoomDisabled = false;

    main.on('pageLoaded', function (_) {});
};

FLIPBOOK.BookScroll.prototype = Object.create(FLIPBOOK.Book.prototype);

FLIPBOOK.BookScroll.prototype.constructor = FLIPBOOK.BookScroll;

FLIPBOOK.BookScroll.prototype.enableIscroll = function () {
    if (this.iscrollDisabled) {
        this.iscroll.enable();
        this.iscrollDisabled = false;
    }
};

FLIPBOOK.BookScroll.prototype.disableIscroll = function () {
    if (!this.iscrollDisabled) {
        this.iscroll.disable();
        this.iscroll.initiated = false;
        this.iscrollDisabled = true;
    }
};

FLIPBOOK.BookScroll.prototype.goToPage = function (value, instant) {
    if (!this.enabled) {
        return;
    }

    if (value > this.options.pages.length) {
        value = this.options.pages.length;
    }

    if (this.singlePage || value % 2 != 0) {
        value--;
    }

    if (value == this.rightIndex) {
        return;
    }

    this.enableIscroll();

    if (isNaN(value) || value < 0) {
        value = 0;
    }

    let y = -value * (this.pageHeight + this.pageGap) * this.iscroll.scale;

    let maxY = -(this.iscroll.scrollerHeight - this.main.wrapperH);

    y = Math.max(y, maxY);

    var duration = instant ? 0 : 600;

    this.iscroll.scrollTo(0, y, duration);

    this.setRightIndex(value);
    this.main.turnPageComplete();
};

FLIPBOOK.BookScroll.prototype.setRightIndex = function (value) {
    if (value != this.rightIndex) {
        this.rightIndex = value;
        this.main.turnPageComplete();
    }
};

FLIPBOOK.BookScroll.prototype.nextPage = function (instant) {
    this.goToPage(this.rightIndex + 2, instant);
};

FLIPBOOK.BookScroll.prototype.prevPage = function (instant) {
    this.goToPage(this.rightIndex, instant);
};

FLIPBOOK.BookScroll.prototype.enablePrev = function (val) {
    this.prevEnabled = val;
};

FLIPBOOK.BookScroll.prototype.enableNext = function (val) {
    this.nextEnabled = val;
};

FLIPBOOK.BookScroll.prototype.isFocusedRight = function () {
    return this.rightIndex % 2 == 0;
};

FLIPBOOK.BookScroll.prototype.isFocusedLeft = function () {
    return this.rightIndex % 2 == 1;
};

FLIPBOOK.BookScroll.prototype.updateVisiblePages = function () {};

FLIPBOOK.BookScroll.prototype.disable = function () {
    this.enabled = false;
};

FLIPBOOK.BookScroll.prototype.enable = function () {
    this.enabled = true;
    this.onResize();
};

FLIPBOOK.BookScroll.prototype.resize = function () {};

FLIPBOOK.BookScroll.prototype.onResize = function () {
    var w = this.main.wrapperW;
    var h = this.main.wrapperH;

    if (w == 0 || h == 0 || (this.w === w && this.h === h)) {
        return;
    }

    this.w = w;
    this.h = h;

    if (this.zoom) {
        this.iscroll.refresh();
        this.fit();
        this.iscroll.scrollTo(0, this.iscroll.y, 0);
    }
    this.updateRightIndex();
};

FLIPBOOK.BookScroll.prototype.updateRightIndex = function () {
    let maxVisibility = 0;
    let currentIndex = 0;
    this.pagesArr.forEach((page) => {
        if (page.visibility > maxVisibility) {
            maxVisibility = page.visibility;
            currentIndex = page.index;
        }
    });
    this.setRightIndex(currentIndex);
};

FLIPBOOK.BookScroll.prototype.zoomIn = function (value, time, e) {
    if (e && e.type === 'mousewheel') {
        return;
    }
    this.zoomTo(value);
};

FLIPBOOK.BookScroll.prototype.fitToHeight = function () {
    this.iscroll.zoom((this.zoom * this.main.wrapperH) / this.pageHeight, 0, 0, 0);
};

FLIPBOOK.BookScroll.prototype.fitToWidth = function () {
    this.iscroll.zoom((this.zoom * this.main.wrapperW) / this.pageWidth, 0, 0, 0);
};

FLIPBOOK.BookScroll.prototype.fit = function () {
    if (this.main.wrapperW / this.main.wrapperH < this.pageWidth / this.pageHeight) {
        this.fitToWidth();
    } else {
        this.fitToHeight();
    }
};

FLIPBOOK.BookScroll.prototype.zoomTo = function (zoom, time, x, y) {
    if (!this.enabled || this.zoomDisabled) {
        return;
    }
    var m = this.main;
    var w = m.wrapperW;
    var h = m.wrapperH;

    if (w == 0 || h == 0) {
        return;
    }

    this.zoom = zoom;
    this.fit();

    if (zoom > 1) {
        this.disableFlip();
    }

    this.onZoom(zoom);
};

FLIPBOOK.BookScroll.prototype.zoomOut = function (value) {
    this.zoomTo(value);
};

FLIPBOOK.BookScroll.prototype.onZoom = function (zoom) {
    this.options.main.onZoom(zoom);
};

FLIPBOOK.BookScroll.prototype.enable = function () {
    this.enabled = true;
};

FLIPBOOK.BookScroll.prototype.disable = function () {
    this.enabled = false;
};

FLIPBOOK.BookScroll.prototype.onSwipe = function (event, phase, direction) {
    if (phase == 'start') {
        return;
    }
    if (phase == 'end' || phase == 'cancel') {
        return;
    }
    if (direction == 'up' || direction == 'down') {
        return;
    }
};

FLIPBOOK.BookScroll.prototype.disableFlip = function () {};

FLIPBOOK.BookScroll.prototype.enableFlip = function () {};

FLIPBOOK.BookScroll.prototype.enablePan = function () {};

FLIPBOOK.BookScroll.prototype.disablePan = function () {};

FLIPBOOK.BookScroll.prototype.canFlipNext = function () {
    return this.rightIndex + 1 < this.options.numPages;
};

FLIPBOOK.PageScroll = function (book, bookWrapper, main, options, index, texture, html) {
    this.rotation = 0;
    this.bookWrapper = bookWrapper;
    this.index = index;
    this.options = options;
    this.texture = texture;
    this.html = html;
    this.index = index;
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'flipbook-scroll-page';
    this.wrapper.style.marginBottom = this.options.pageGap + 'px';
    this.main = main;
    this.book = book;

    this.inner = document.createElement('div');
    this.inner.className = 'flipbook-scroll-page-inner';
    this.wrapper.appendChild(this.inner);

    this.bg = document.createElement('div');
    this.bg.className = 'flipbook-scroll-page-bg';
    this.inner.appendChild(this.bg);

    this.html = document.createElement('div');
    this.html.className = 'flipbook-page3-html';
    this.wrapper.appendChild(this.html);
    this.html.style.width = (1000 * this.options.pageWidth) / this.options.pageHeight + 'px';
    this.html.style.transform = 'scale(' + this.options.pageHeight / 1000 + ') translateZ(0)';

    if (this.options.doublePage) {
        if (this.index % 2 == 0 && this.index > 0) {
            this.html.style.left = '-100%';
        } else {
            this.html.style.left = '0';
        }
    }

    this.preloader = document.createElement('img');

    if (options.pagePreloader) {
        this.preloader.src = options.pagePreloader;
        this.preloader.className = 'flipbook-page-preloader-image';
    } else {
        this.preloader.src = options.assets.spinner;
        this.preloader.className = 'flipbook-page-preloader';
    }

    this.inner.appendChild(this.preloader);

    this.setSize(this.pw, this.ph);
};

FLIPBOOK.PageScroll.prototype = {
    initObserver: function () {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                const visibility = entry.intersectionRatio;

                if (visibility > 0) {
                    this.show(visibility);
                } else {
                    this.hide();
                }
            },
            { root: this.bookWrapper, threshold: [0, 0.1, 0.5] }
        );
        observer.observe(this.wrapper);
    },

    show: function (visibility) {
        this.visibility = visibility;
        if (!this.book.scrolling) {
            this.load();
        }
        if (!this.isVisible) {
            this.bg.style.display = 'block';
            this.html.style.display = 'block';
            this.isVisible = true;
        }
    },

    load: function (callback, thumb) {
        if (this.loaded) {
            return;
        }
        if (this.visibility == 0) {
            return;
        }
        this.loaded = true;
        var size = this.options.pageTextureSize;

        if (this.size >= size) {
            if (!thumb) {
                this.loadHTML();
            }
            if (callback) {
                callback.call(this);
            }
            return;
        }

        this.size = size;

        var self = this;

        var index = this.options.rightToLeft ? this.options.numPages - this.index - 1 : this.index;

        this.options.main.loadPage(index, size, function (page) {
            page = page || {};

            if (page && page.image) {
                var img = page.image[size] || page.image;
                img.classList.add('page-scroll-img');

                if (
                    self.index % 2 == 0 &&
                    (self.options.pages[index].side == 'left' || self.options.pages[index].side == 'right')
                ) {
                    if (!img.clone) {
                        img.clone = new Image();
                        img.clone.src = img.src;
                    }
                    img = img.clone;
                }

                self.bg.appendChild(img);

                if (self.options.doublePage && self.index > 0 && self.index % 2 == 0) {
                    img.style.left = '-100%';
                }

                if (self.options.doublePage) {
                    if (self.index == 0 || (self.index == self.options.pages.length - 1 && self.options.backCover)) {
                        img.style.width = '100%';
                    } else {
                        img.style.width = '200%';
                    }
                } else {
                    img.style.width = '100%';
                }

                self.inner.removeChild(self.preloader);
            }

            if (!thumb) {
                self.loadHTML();
            }

            if (callback) {
                callback.call(self);
            }
        });
    },

    hide: function () {
        this.visibility = 0;
        if (this.isVisible) {
            this.bg.style.display = 'none';
            this.html.style.display = 'none';
            this.isVisible = false;
            this.pauseHTML();
        }
    },

    pauseHTML: function () {
        var mediaElements = this.html.querySelectorAll('video, audio');
        mediaElements.forEach(function (media) {
            media.pause();
        });
    },

    loadHTML: function () {
        var self = this;

        var index = this.options.rightToLeft ? this.options.numPages - this.index - 1 : this.index;

        if (this.htmlContent) {
            this.updateHtmlContent();
        } else {
            this.options.main.loadPageHTML(index, function (html) {
                self.htmlContent = html;
                self.updateHtmlContent();
            });
        }
    },

    setSize: function () {
        this.wrapper.style.width = this.options.pageWidth + 'px';
        this.wrapper.style.height = this.options.pageHeight + 'px';
        this.updateHtmlContent();
    },

    updateHtmlContent: function () {
        var c = this.htmlContent;

        if (c && !this.htmlContentVisible) {
            if (c.jquery) {
                c = c[0];
            }
            this.htmlContentVisible = true;

            this.html.replaceChildren();
            this.html.appendChild(c);
            this.startHTML();
            this.main.trigger('showpagehtml', { page: this });
        }
    },

    startHTML: function () {
        this.book.startPageItems(this.wrapper);
    },
};
