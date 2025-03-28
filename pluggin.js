var FLIPBOOK = FLIPBOOK || {};
(FLIPBOOK.version = "4.6.4"),
  (function (t, e, o, i) {
    (t.fn.flipBook = function (t) {
      return new FLIPBOOK.Main(t, this);
    }),
      (t.fn.swipeBook = function (t) {
        return (t.viewMode = "swipe"), new FLIPBOOK.Main(t, this);
      }),
      (t.fn.flipBook.options = {
        name: "",
        pages: [],
        tableOfContent: [],
        tableOfContentCloseOnClick: !0,
        thumbsCloseOnClick: !0,
        thumbsStyle: "overlay",
        deeplinkingEnabled: !1,
        deeplinkingPrefix: "",
        assets: {
          preloader: "assets/images/preloader.jpg",
          flipMp3: "assets/mp3/turnPage.mp3",
          spinner: "assets/images/spinner.gif",
          backgroundMp3: "assets/mp3/background.mp3",
        },
        pdfUrl: null,
        pdfBrowserViewerIfMobile: !1,
        pdfBrowserViewerIfIE: !1,
        pdfBrowserViewerFullscreen: !0,
        pdfBrowserViewerFullscreenTarget: "_blank",
        rangeChunkSize: 64,
        disableRange: !1,
        disableStream: !0,
        disableAutoFetch: !0,
        pdfAutoLinks: !1,
        htmlLayer: !0,
        rightToLeft: !1,
        startPage: 0,
        sound: !0,
        backgroundColor: "rgb(81, 85, 88)",
        backgroundImage: "",
        backgroundPattern: "",
        backgroundTransparent: !1,
        thumbSize: 150,
        loadAllPages: !1,
        loadPagesF: 2,
        loadPagesB: 1,
        autoplayOnStart: !1,
        autoplayInterval: 3e3,
        autoplayLoop: !0,
        skin: "light",
        menuOverBook: !1,
        menuFloating: !1,
        menuBackground: "",
        menuShadow: "",
        menuMargin: 0,
        menuPadding: 0,
        menuTransparent: !1,
        menu2OverBook: !0,
        menu2Floating: !1,
        menu2Background: "",
        menu2Shadow: "",
        menu2Margin: 0,
        menu2Padding: 0,
        menu2Transparent: !0,
        skinColor: "",
        skinBackground: "",
        btnColor: "",
        btnBackground: "none",
        btnSize: 18,
        btnRadius: 2,
        btnMargin: 2,
        btnPaddingV: 10,
        btnPaddingH: 10,
        btnShadow: "",
        btnTextShadow: "",
        btnBorder: "",
        btnColorHover: "",
        btnBackgroundHover: "",
        arrowColor: "#FFF",
        arrowColorHover: "#FFF",
        arrowBackground: "rgba(0, 0, 0, 0)",
        arrowBackgroundHover: "rgba(0, 0, 0, .15)",
        arrowSize: 40,
        arrowRadius: 4,
        arrowMargin: 4,
        arrowPadding: 10,
        arrowTextShadow: "0px 0px 1px rgba(0, 0, 0, 1)",
        arrowBorder: "",
        floatingBtnColor: "#EEE",
        floatingBtnColorHover: "",
        floatingBtnBackground: "#00000044",
        floatingBtnBackgroundHover: "",
        floatingBtnSize: null,
        floatingBtnRadius: null,
        floatingBtnMargin: null,
        floatingBtnPadding: null,
        floatingBtnShadow: "",
        floatingBtnTextShadow: "",
        floatingBtnBorder: "",
        btnOrder: [
          "currentPage",
          "btnFirst",
          "btnPrev",
          "btnNext",
          "btnLast",
          "btnZoomOut",
          "btnZoomIn",
          "btnThumbs",
          "btnToc",
          "search",
          "btnRotateLeft",
          "btnRotateRight",
          "btnAutoplay",
          "btnSearch",
          "btnBookmark",
          "btnDownloadPages",
          "btnShare",
          "btnPrint",
          "btnDownloadPdf",
          "btnSound",
          "btnTools",
          "btnExpand",
          "btnClose",
        ],
        currentPage: {
          enabled: !0,
          title: "Current page",
          vAlign: "top",
          hAlign: "left",
          marginH: 0,
          marginV: 0,
          color: "",
          background: "",
        },
        search: {
          enabled: !1,
        },
        btnFirst: {
          enabled: !1,
          title: "First page",
          svg: "last",
          iconReverse: !0,
        },
        btnPrev: {
          enabled: !0,
          title: "Previous page",
          svg: "next",
          iconReverse: !0,
        },
        btnNext: {
          enabled: !0,
          title: "Next page",
        },
        btnLast: {
          enabled: !1,
          title: "Last page",
        },
        btnZoomIn: {
          enabled: !0,
          title: "Zoom in",
          svg: "plus",
        },
        btnZoomOut: {
          enabled: !0,
          title: "Zoom out",
          svg: "minus",
        },
        btnRotateLeft: {
          enabled: !1,
          title: "Rotate left",
        },
        btnRotateRight: {
          enabled: !1,
          title: "Rotate right",
        },
        btnAutoplay: {
          enabled: !0,
          title: "Autoplay",
          svg: "play",
          svgAlt: "pause",
        },
        btnSearch: {
          enabled: !1,
          title: "Search",
        },
        btnBookmark: {
          enabled: !0,
          title: "Bookmarks",
        },
        btnNotes: {
          enabled: !1,
          title: "Notes",
        },
        btnToc: {
          enabled: !0,
          title: "Table of Contents",
          svg: "list",
        },
        btnThumbs: {
          enabled: !0,
          title: "Pages",
        },
        btnShare: {
          enabled: !0,
          title: "Share",
        },
        btnPrint: {
          enabled: !0,
          title: "Print",
          toolsMenu: !0,
        },
        btnDownloadPages: {
          enabled: !0,
          title: "Download",
          url: "images/pages.zip",
          name: "allPages.zip",
          svg: "download",
          toolsMenu: !0,
        },
        btnDownloadPdf: {
          forceDownload: !1,
          enabled: !0,
          title: "View PDF",
          url: null,
          openInNewWindow: !0,
          name: "allPages.pdf",
          svg: "pdf",
          toolsMenu: !0,
        },
        btnSound: {
          enabled: !0,
          title: "Sound",
          svgAlt: "mute",
          toolsMenu: !0,
        },
        btnTools: {
          enabled: !0,
          title: "Tools",
        },
        btnExpand: {
          enabled: !0,
          title: "Toggle fullscreen",
          svgAlt: "compress",
        },
        btnClose: {
          title: "Close",
          hAlign: "right",
          vAlign: "top",
          size: 20,
        },
        sideNavigationButtons: !0,
        hideMenu: !1,
        shareUrl: null,
        shareTitle: null,
        shareImage: null,
        whatsapp: {
          enabled: !0,
          title: "WhatsApp",
        },
        twitter: {
          enabled: !0,
          title: "X (Twitter)",
        },
        facebook: {
          enabled: !0,
          title: "Facebook",
        },
        pinterest: {
          enabled: !0,
          title: "Pinterest",
        },
        email: {
          enabled: !0,
          title: "Email",
        },
        linkedin: {
          enabled: !0,
          title: "LinkedIn",
        },
        digg: {
          enabled: !1,
          title: "Digg",
        },
        reddit: {
          enabled: !1,
          title: "Reddit",
        },
        pdf: {
          annotationLayer: !1,
        },
        pageTextureSize: 2048,
        pageTextureSizeSmall: 1500,
        thumbTextureSize: 300,
        pageTextureSizeMobile: 1500,
        pageTextureSizeMobileSmall: 1024,
        viewMode: "webgl",
        singlePageMode: !1,
        singlePageModeIfMobile: !1,
        zoomMin: 0.95,
        zoomMin2: 0.15,
        zoomMax2: null,
        zoomSize: null,
        zoomStep: 2,
        zoomTime: 300,
        zoomReset: !1,
        zoomResetTime: 300,
        wheelDisabledNotFullscreen: !1,
        arrowsDisabledNotFullscreen: !1,
        arrowsAlwaysEnabledForNavigation: !0,
        responsiveView: !0,
        responsiveViewRatio: 1,
        responsiveViewTreshold: 768,
        responsiveContainer: !0,
        minPixelRatio: 1,
        pageFlipDuration: 1,
        contentOnStart: !1,
        thumbnailsOnStart: !1,
        searchOnStart: !1,
        sideMenuOverBook: !0,
        sideMenuOverMenu: !1,
        sideMenuOverMenu2: !0,
        sideMenuPosition: "left",
        lightBox: !1,
        lightBoxOpened: !1,
        lightBoxFullscreen: !1,
        lightboxCloseOnClick: !1,
        lightboxResetOnOpen: !0,
        lightboxBackground: null,
        lightboxBackgroundColor: null,
        lightboxBackgroundPattern: null,
        lightboxBackgroundImage: null,
        lightboxStartPage: null,
        lightboxMarginV: "0",
        lightboxMarginH: "0",
        lightboxCSS: "",
        lightboxPreload: !1,
        lightboxShowMenu: !1,
        lightboxCloseOnBack: !0,
        disableImageResize: !0,
        pan: 0,
        panMax: 10,
        panMax2: 2,
        panMin: -10,
        panMin2: -2,
        tilt: 0,
        tiltMax: 0,
        tiltMax2: 0,
        tiltMin: 0,
        tiltMin2: -5,
        rotateCameraOnMouseMove: !1,
        rotateCameraOnMouseDrag: !0,
        lights: !0,
        lightColor: 16777215,
        lightPositionX: 0,
        lightPositionZ: 1400,
        lightPositionY: 350,
        lightIntensity: 0.6,
        shadows: !0,
        shadowMapSize: 1024,
        shadowOpacity: 0.2,
        shadowDistance: 0,
        pageRoughness: 1,
        pageMetalness: 0,
        pageHardness: 2,
        coverHardness: 2,
        pageSegmentsW: 10,
        pageSegmentsH: 1,
        pageMiddleShadowSize: 2,
        pageMiddleShadowColorL: "#999999",
        pageMiddleShadowColorR: "#777777",
        antialias: !1,
        preloaderText: "",
        fillPreloader: {
          enabled: !1,
          imgEmpty: "images/logo_light.png",
          imgFull: "images/logo_dark.png",
        },
        logoImg: "",
        logoUrl: "",
        logoCSS: "position:absolute;",
        logoHideOnMobile: !1,
        printMenu: !0,
        downloadMenu: !0,
        cover: !0,
        backCover: !0,
        pdfTextLayer: !0,
        annotationLayer: !0,
        googleAnalyticsTrackingCode: null,
        minimumAndroidVersion: 6,
        linkColor: "rgba(0, 0, 0, 0)",
        linkColorHover: "rgba(255, 255, 0, 1)",
        linkOpacity: 0.4,
        linkTarget: "_blank",
        rightClickEnabled: !0,
        pageNumberOffset: 0,
        flipSound: !0,
        backgroundMusic: !1,
        doubleClickZoomDisabled: !1,
        pageDragDisabled: !1,
        pageClickAreaWdith: "10%",
        noteTypes: [
          {
            id: 1,
            title: "User",
            color: "green",
            enabled: !0,
          },
          {
            id: 2,
            title: "Group",
            color: "yellow",
            enabled: !0,
          },
          {
            id: 3,
            title: "Admin",
            color: "blue",
            enabled: !0,
          },
        ],
        pageRangeStart: null,
        pageRangeEnd: null,
        previewMode: {},
        strings: {
          print: "Print",
          printLeftPage: "Print left page",
          printRightPage: "Print right page",
          printCurrentPage: "Print current page",
          printAllPages: "Print all pages",
          download: "Download",
          downloadLeftPage: "Download left page",
          downloadRightPage: "Download right page",
          downloadCurrentPage: "Download current page",
          downloadAllPages: "Download all pages",
          bookmarks: "Bookmarks",
          bookmarkLeftPage: "Bookmark left page",
          bookmarkRightPage: "Bookmark right page",
          bookmarkCurrentPage: "Bookmark current page",
          search: "Search",
          findInDocument: "Find in document",
          pagesFoundContaining: "pages found containing",
          noMatches: "No matches",
          matchesFound: "matches found",
          page: "Page",
          matches: "matches",
          thumbnails: "Thumbnails",
          tableOfContent: "Table of Contents",
          share: "Share",
          notes: "Notes",
          pressEscToClose: "Press ESC to close",
          password: "Password",
          addNote: "Add note",
          typeInYourNote: "Type in your note...",
        },
        mobile: {
          shadows: !1,
          pageSegmentsW: 5,
          btnAutoplay: {
            toolsMenu: !0,
          },
          btnBookmark: {
            toolsMenu: !0,
          },
          btnZoomIn: {
            enabled: !1,
          },
          btnZoomOut: {
            enabled: !1,
          },
          btnFirst: {
            enabled: !1,
          },
          btnLast: {
            enabled: !1,
          },
          currentPage: {
            enabled: !1,
          },
        },
      }),
      (FLIPBOOK.Main = function (t, n) {
        var s = this;
        (this.elem = n),
          (this.$elem = jQuery(n)),
          (this.$body = jQuery("body")),
          (this.body = this.$body[0]),
          (this.$window = jQuery(e)),
          (this.bodyHasVerticalScrollbar = function () {
            return s.body.scrollHeight > e.innerHeight;
          }),
          (this.isZoomed = function () {
            return s.zoom > 1;
          }),
          (this.options = {});
        var a,
          r = o.createElement("div").style,
          l = (function () {
            for (
              var t = "t,webkitT,MozT,msT,OT".split(","), e = 0, o = t.length;
              e < o;
              e++
            )
              if (t[e] + "ransform" in r)
                return t[e].substr(0, t[e].length - 1);
            return !1;
          })(),
          h = /android/gi.test(navigator.appVersion),
          p =
            ((a = "perspective"),
            ("" === l
              ? a
              : ((a = a.charAt(0).toUpperCase() + a.substr(1)), l + a)) in r);
        (this.isAndroid = h),
          (this.has3d = p),
          void 0 === FLIPBOOK.hasWebGl &&
            (FLIPBOOK.hasWebGl = (function () {
              const t = o.createElement("canvas");
              return (
                (t.getContext("webgl") ||
                  t.getContext("experimental-webgl")) instanceof
                WebGLRenderingContext
              );
            })()),
          (this.hasWebGl = FLIPBOOK.hasWebGl),
          (this.thumbsShowing = !1),
          (this.bookmarkShowing = !1),
          (this.searchingString = !1),
          (this.tocShowing = !1),
          (this.menuShowing = !0),
          (this.fullscreenActive = !1);
        var c = {
            2: {
              currentPage: {
                vAlign: "bottom",
                hAlign: "center",
              },
              btnAutoplay: {
                hAlign: "right",
                vAlign: "top",
              },
              btnSound: {
                hAlign: "left",
                vAlign: "top",
              },
              btnExpand: {
                hAlign: "right",
                vAlign: "top",
              },
              btnSearch: {
                hAlign: "left",
                vAlign: "top",
              },
              btnBookmark: {
                hAlign: "left",
                vAlign: "top",
              },
              btnToc: {
                hAlign: "left",
                vAlign: "top",
              },
              btnThumbs: {
                hAlign: "left",
                vAlign: "top",
              },
              btnShare: {
                hAlign: "right",
                vAlign: "top",
              },
              btnPrint: {
                hAlign: "right",
                vAlign: "top",
              },
              btnDownloadPages: {
                hAlign: "right",
                vAlign: "top",
              },
              btnDownloadPdf: {
                hAlign: "right",
                vAlign: "top",
              },
              btnTools: {
                hAlign: "right",
                vAlign: "top",
              },
              menuTransparent: !0,
            },
            3: {
              menuTransparent: !0,
              menu2Transparent: !1,
              menu2OverBook: !1,
              menu2Padding: 5,
              btnMargin: 5,
              currentPage: {
                vAlign: "top",
                hAlign: "center",
              },
              btnPrint: {
                vAlign: "top",
                hAlign: "right",
              },
              btnDownloadPdf: {
                vAlign: "top",
                hAlign: "right",
              },
              btnDownloadPages: {
                vAlign: "top",
                hAlign: "right",
              },
              btnThumbs: {
                vAlign: "top",
                hAlign: "left",
              },
              btnToc: {
                vAlign: "top",
                hAlign: "left",
              },
              btnBookmark: {
                vAlign: "top",
                hAlign: "left",
              },
              btnSearch: {
                vAlign: "top",
                hAlign: "left",
              },
              btnShare: {
                vAlign: "top",
                hAlign: "right",
              },
              btnAutoplay: {
                vAlign: "top",
                hAlign: "right",
              },
              btnExpand: {
                vAlign: "top",
                hAlign: "right",
              },
              btnZoomIn: {
                hAlign: "right",
              },
              btnZoomOut: {
                hAlign: "right",
              },
              btnSound: {
                vAlign: "top",
                hAlign: "right",
              },
              btnTools: {
                vAlign: "top",
                hAlign: "right",
              },
              menuPadding: 5,
            },
            4: {
              menu2Transparent: !1,
              menu2OverBook: !1,
              sideMenuOverMenu2: !1,
              currentPage: {
                vAlign: "top",
                hAlign: "center",
              },
              btnAutoplay: {
                vAlign: "top",
                hAlign: "left",
              },
              btnSound: {
                vAlign: "top",
                hAlign: "left",
              },
              btnExpand: {
                vAlign: "top",
                hAlign: "right",
              },
              btnZoomIn: {
                vAlign: "top",
              },
              btnZoomOut: {
                vAlign: "top",
              },
              btnSearch: {
                vAlign: "top",
                hAlign: "left",
              },
              btnBookmark: {
                vAlign: "top",
                hAlign: "left",
              },
              btnToc: {
                vAlign: "top",
                hAlign: "left",
              },
              btnThumbs: {
                vAlign: "top",
                hAlign: "left",
              },
              btnShare: {
                vAlign: "top",
                hAlign: "right",
              },
              btnPrint: {
                vAlign: "top",
                hAlign: "right",
              },
              btnDownloadPages: {
                vAlign: "top",
                hAlign: "right",
              },
              btnDownloadPdf: {
                vAlign: "top",
                hAlign: "right",
              },
              btnTools: {
                vAlign: "top",
                hAlign: "right",
              },
            },
          },
          d = {
            dark: {
              skinColor: "#EEE",
              btnColorHover: "#FFF",
              skinBackground: "#313538",
            },
            light: {
              skinColor: "#222",
              btnColorHover: "#000",
              skinBackground: "#FFF",
              floatingBtnColor: "#FFF",
              floatingBtnBackground: "#00000055",
            },
            gradient: {
              skinColor: "#EEE",
              btnColor: "#EEE",
              btnColorHover: "#FFF",
              skinBackground: "#313538DD",
              menuOverBook: !0,
              menu2OverBook: !0,
              sideMenuOverMenu: !0,
              sideMenuOverMenu2: !0,
              menuBackground:
                "linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 100%)",
              menu2Background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, transparent 100%)",
            },
          };
        for (var g in d) t.skin == g && (t = jQuery.extend(!0, {}, d[g], t));
        for (var g in c)
          Number(t.layout) === Number(g) &&
            (t = jQuery.extend(!0, {}, c[g], t));
        this.options = jQuery.extend(!0, {}, jQuery.fn.flipBook.options, t);
        var u,
          m,
          b = this.options;
        if (
          ((this.uniqueID = Date.now()),
          (b.isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ) ||
            (navigator.maxTouchPoints &&
              navigator.maxTouchPoints > 2 &&
              /MacIntel/.test(navigator.platform))),
          b.isMobile && jQuery.extend(!0, b, b.mobile),
          (this.strings = b.strings),
          (b.pageShininess = b.pageShininess / 2),
          (this.s = 0),
          b.googleAnalyticsTrackingCode)
        )
          if (
            ((this.gaCode = b.googleAnalyticsTrackingCode),
            this.gaCode.includes("UA-"))
          )
            e.ga ||
              (function (t, e, o, i, n, s, a) {
                (t.GoogleAnalyticsObject = n),
                  (t[n] =
                    t[n] ||
                    function () {
                      (t[n].q = t[n].q || []).push(arguments);
                    }),
                  (t[n].l = 1 * new Date()),
                  (s = e.createElement(o)),
                  (a = e.getElementsByTagName(o)[0]),
                  (s.async = 1),
                  (s.src = "https://www.google-analytics.com/analytics.js"),
                  a.parentNode.insertBefore(s, a);
              })(e, o, "script", 0, "ga"),
              ga("create", this.gaCode, "auto");
          else if (this.gaCode.includes("G-") || this.gaCode.includes("AW-")) {
            var f = o.createElement("script");
            f.setAttribute(
              "src",
              "https://www.googletagmanager.com/gtag/js?id=" + this.gaCode
            );
            const t = this;
            (f.async = 1),
              (f.onload = function () {
                function o() {
                  dataLayer.push(arguments);
                }
                (e.dataLayer = e.dataLayer || []),
                  o("js", new Date()),
                  o("config", t.gaCode);
              }),
              o.body.appendChild(f);
          }
        async function v() {
          if (!s.disposed) {
            var t = e.location.hash,
              o = s.getPageFromHash();
            b.cover || o++;
            var i = o;
            o < 1 ? (o = 1) : s.numPages && o > s.numPages && (o = s.numPages),
              o &&
                ((o =
                  b.rightToLeft && b.pages && b.pages.length
                    ? b.pages.length - o + 1
                    : o),
                s.started
                  ? s.Book &&
                    (s.lightbox &&
                      !FLIPBOOK.lightboxOpened &&
                      (s.lightbox.openLightbox(), await s.lightboxStart()),
                    s.goToPage(o, -1 == t.indexOf("flip")))
                  : ((b.startPage = i),
                    b.lightBox &&
                      (k(),
                      b.lightBoxFullscreen &&
                        setTimeout(function () {
                          s.toggleExpand();
                        }, 100))));
          }
        }

        function k() {
          if (!s.initStarted)
            if (((s.initStarted = !0), b.fillPreloader.enabled)) {
              s.$fillPreloader = jQuery("<div>").addClass(
                "flipbook-fillPreloader"
              );
              var t = new Image();
              (t.src = b.fillPreloader.imgEmpty),
                (t.onload = function () {
                  var e = new Image();
                  (e.src = b.fillPreloader.imgFull),
                    (e.onload = function () {
                      jQuery(t).appendTo(s.$fillPreloader),
                        (s.$fillPreloaderImg = jQuery(e).appendTo(
                          s.$fillPreloader
                        )),
                        s.$fillPreloader.appendTo(s.wrapper),
                        w();
                    });
                });
            } else w();
        }

        function w() {
          s.initialized ||
            ((s.define = e.define),
            (e.define = null),
            (s.id = Date.now()),
            s.addPageItems(),
            b.pdfMode ? s.initPdf() : s.initJpg(),
            s.setLoadingProgress(0.1),
            (s.initialized = !0));
        }
        b.isMobile &&
          ((b.singlePageMode = !!b.singlePageModeIfMobile || b.singlePageMode),
          b.viewModeMobile && (b.viewMode = b.viewModeMobile),
          b.pageTextureSizeMobile &&
            (b.pageTextureSize = b.pageTextureSizeMobile),
          b.pageTextureSizeMobileSmall &&
            (b.pageTextureSizeSmall = b.pageTextureSizeMobileSmall)),
          "3dSinglePage" == b.viewMode && (b.singlePageMode = !0),
          "2dSinglePage" == b.viewMode &&
            ((b.singlePageMode = !0), (b.viewMode = "2d")),
          b.singlePageMode &&
            ("2d" != b.viewMode && "swipe" != b.viewMode && (b.viewMode = "3d"),
            b.rightToLeft && (b.viewMode = "swipe"),
            (b.cover = !0)),
          b.singlePageMode && "3d" == b.viewMode && (b.rightToLeft = !1),
          "simple" == b.viewMode && ((b.viewMode = "3d"), (b.instantFlip = !0)),
          b.cover || (b.responsiveView = !1),
          (b.sideMenuPosition = b.rightToLeft ? "right" : "left"),
          "webgl" == b.viewMode &&
            (!this.hasWebGl ||
              (parseFloat(
                !!(m = (u = (u || navigator.userAgent).toLowerCase()).match(
                  /android\s([0-9\.]*)/
                )) && m[1]
              ) < b.minimumAndroidVersion &&
                this.isAndroid)) &&
            (b.viewMode = "3d"),
          "3d" != b.viewMode || s.has3d || (b.viewMode = "2d"),
          (this.webgl = "webgl" == b.viewMode),
          b.menuFloating && ((b.menuOverBook = !0), (b.sideMenuOverMenu = !0)),
          b.menu2Floating &&
            ((b.menu2OverBook = !0), (b.sideMenuOverMenu2 = !0)),
          b.menuTransparent &&
            ((b.menuOverBook = !0),
            (b.sideMenuOverMenu = !0),
            (b.menuBackground = "none")),
          b.menu2Transparent
            ? ((b.menu2OverBook = !0),
              (b.sideMenuOverMenu2 = !0),
              (b.menu2Background = "none"))
            : (b.sideMenuOverMenu2 = !1),
          b.menuOverBook && (b.sideMenuOverMenu = !0),
          b.menu2OverBook && (b.sideMenuOverMenu2 = !0),
          (b.pdfMode = Boolean(b.pdfUrl && "" != b.pdfUrl) || b.pdfBase64),
          b.backgroundTransparent && (b.backgroundColor = "none"),
          (this.options.containerRatio = (function (t) {
            if (t !== i) {
              if ("number" == typeof t) return t;
              if ((t = String(t).trim().replace("/", ":")).includes(":")) {
                const e = t.split(":");
                return parseFloat(e[0]) / parseFloat(e[1]);
              }
              return parseFloat(t);
            }
          })(this.options.containerRatio)),
          (this.wrapper = jQuery(o.createElement("div")).addClass(
            "flipbook-main-wrapper"
          )),
          "" != b.backgroundColor &&
            this.wrapper.css("background", b.backgroundColor),
          "" != b.backgroundPattern &&
            this.wrapper.css(
              "background",
              "url(" + b.backgroundPattern + ") repeat"
            ),
          "" != b.backgroundImage &&
            (this.wrapper.css(
              "background",
              "url(" + b.backgroundImage + ") no-repeat"
            ),
            this.wrapper.css("background-size", "cover"),
            this.wrapper.css("background-position", "center center")),
          (this.bookLayer = jQuery(o.createElement("div"))
            .addClass("flipbook-bookLayer")
            .appendTo(s.wrapper)),
          "spotlight" == b.linkTarget &&
            this.bookLayer[0].addEventListener("click", function (t) {
              "a" === t.target.tagName.toLowerCase() &&
                (t.preventDefault(), s.spotlight(t.target.href));
            }),
          b.rightClickEnabled ||
            this.bookLayer.bind("contextmenu", function (t) {
              return !1;
            }),
          b.hideMenu &&
            (this.bookLayer.css("bottom", "0"), (b.menuOverBook = !0)),
          (b.pagesOriginal = JSON.parse(JSON.stringify(b.pages))),
          (this.book = jQuery(o.createElement("div"))
            .addClass("book")
            .appendTo(s.bookLayer)),
          b.preloader
            ? (this.preloader = jQuery(b.preloader))
            : (this.preloader = jQuery(
                '<div class="flipbook-preloader cssload-container"><div class="cssload-speeding-wheel"></div><div class="flipbook-loading-text">' +
                  b.preloaderText +
                  '</div><div class="flipbook-loading-bg"></div></div>'
              )),
          this.setLoadingProgress(0),
          (this.dispose = function () {
            this.disposed = !0;
          }),
          (b.main = this),
          (this._events = {}),
          (this.on = function (t, e) {
            this._events[t] || (this._events[t] = []), this._events[t].push(e);
          }),
          (this.off = function (t, e) {
            if (this._events[t]) {
              var o = this._events[t].indexOf(e);
              o > -1 && this._events[t].splice(o, 1);
            }
          }),
          (this.trigger = function (t) {
            if (this._events[t]) {
              var e = 0,
                o = this._events[t].length;
              if (o)
                for (; e < o; e++)
                  this._events[t][e].apply(this, [].slice.call(arguments, 1));
            }
          }),
          this.on("textlayerrendered", function (t) {
            s.searchingString && s.mark(s.searchingString, !0);
          }),
          this.on("pageLoaded", function (t) {
            (b.pages[t.index] = b.pages[t.index] || {}),
              (b.pages[t.index].canvas = b.pages[t.index].canvas || {}),
              (b.pages[t.index].images = b.pages[t.index].images || {}),
              (b.pages[t.index].images[t.size] = t.images),
              s.searchingString && s.mark(s.searchingString, !0);
          }),
          (this.addPageNotes = function (t) {
            this.noteService && this.noteService.initPageNotes(t);
          }),
          this.on("pdfinit", function () {
            (b.tableOfContent = s.pdfService.outline || b.tableOfContent),
              (b.doublePage = s.pdfService.double),
              b.doublePage ||
                ((b.backCover = s.pdfService.numPages % 2 == 0),
                b.cover || (b.backCover = !b.backCover)),
              (s.viewportOriginal = s.pdfService.viewports[0]),
              (b.firstPage = {
                width: s.pdfService.viewports[0].width,
                height: s.pdfService.viewports[0].height,
                ratio:
                  s.pdfService.viewports[0].width /
                  s.pdfService.viewports[0].height,
              }),
              s.pdfService.numPages > 1 &&
                (b.secondPage = {
                  width: s.pdfService.viewports[1].width,
                  height: s.pdfService.viewports[1].height,
                  ratio:
                    s.pdfService.viewports[1].width /
                    s.pdfService.viewports[1].height,
                }),
              (b.numPages = s.pdfService.numPages),
              b.previewPages && (b.numPages = b.previewPages);
            for (
              var t = [], e = b.pageTextureSize, o = 0;
              o < b.numPages;
              o++
            ) {
              var i = {
                canvas: {},
              };
              b.pages && b.pages[o] && jQuery.extend(i, b.pages[o]), (t[o] = i);
            }
            (b.pages = t),
              (b.pageWidth = parseInt(
                (e * s.viewportOriginal.width) / s.viewportOriginal.height
              )),
              (b.pageHeight = e),
              (b.pw = b.pageWidth),
              (b.ph = b.pageHeight),
              (b.zoomSize = b.zoomSize || b.pageTextureSize),
              s.start();
          }),
          (FLIPBOOK.flipbookSrc =
            FLIPBOOK.flipbookSrc ||
            this.options.flipbookSrc ||
            (function () {
              for (
                var t = o.getElementsByTagName("script"), e = 0;
                e < t.length;
                e++
              ) {
                var i = String(t[e].src);
                if (i.match("flipbook\\.js") || i.match("flipbook\\.min\\.js"))
                  return i;
                if (
                  i.match("flipbook\\.lite\\.js") ||
                  i.match("flipbook\\.lite\\.min\\.js")
                )
                  return i.replace(".lite", "");
              }
              return "";
            })());
        const P = FLIPBOOK.flipbookSrc.includes("flipbook.min.js"),
          y = P ? "flipbook.min.js" : "flipbook.js",
          x = P ? ".min" : "";
        if (
          ([
            {
              key: "iscrollSrc",
              value: "libs/iscroll",
            },
            {
              key: "threejsSrc",
              value: "libs/three",
            },
            {
              key: "flipbookWebGlSrc",
              value: "flipbook.webgl",
            },
            {
              key: "flipbookBook3Src",
              value: "flipbook.book3",
            },
            {
              key: "flipBookSwipeSrc",
              value: "flipbook.swipe",
            },
            {
              key: "flipBookScrollSrc",
              value: "flipbook.scroll",
            },
            {
              key: "pdfjsSrc",
              value: "libs/pdf",
            },
            {
              key: "pdfServiceSrc",
              value: "flipbook.pdfservice",
            },
            {
              key: "pdfjsworkerSrc",
              value: "libs/pdf.worker",
            },
            {
              key: "markSrc",
              value: "libs/mark",
            },
          ].forEach((t) => {
            FLIPBOOK[t.key] = FLIPBOOK.flipbookSrc.replace(
              y,
              t.value + x + ".js"
            );
          }),
          !b.deeplinkingPrefix &&
            b.deeplinking &&
            b.deeplinking.prefix &&
            (b.deeplinkingPrefix = b.deeplinking.prefix),
          (b.deeplinkingEnabled =
            b.deeplinkingPrefix ||
            b.deeplinkingEnabled ||
            (b.deeplinking && b.deeplinking.enabled)),
          b.deeplinkingEnabled && (v(), e.addEventListener("hashchange", v)),
          b.lightBox)
        )
          (b.btnClose.enabled = !0),
            (this.lightbox = new FLIPBOOK.Lightbox(this, this.wrapper, b)),
            (this.lightboxStartedTimes = 0),
            this.wrapper.css("background", "none"),
            this.bookLayer.css("background", "none"),
            this.book.css("background", "none"),
            this.preloader
              .appendTo(this.lightbox.overlay)
              .css("position", "fixed"),
            this.$elem
              .css("cursor", "pointer")
              .bind("click", async function (t) {
                s.disposed ||
                  (t.preventDefault(),
                  (s.lightboxStartPage = jQuery(this).attr("data-page")),
                  s.started
                    ? (await s.lightboxStart(),
                      b.lightBoxFullscreen &&
                        setTimeout(async function () {
                          s.toggleExpand();
                        }, 0),
                      s.lightbox.openLightbox())
                    : (k(),
                      s.lightbox.openLightbox(),
                      b.lightBoxFullscreen &&
                        setTimeout(async function () {
                          s.toggleExpand();
                        }, 100)));
              }),
            b.lightBoxOpened
              ? (k(), jQuery(e).trigger("r3d-lightboxloadingstarted"))
              : b.lightboxPreload &&
                (async function () {
                  b.pdfMode &&
                    (await s.loadScript(FLIPBOOK.pdfjsSrc, "pdfjsLib"),
                    await s.loadScript(
                      FLIPBOOK.pdfServiceSrc,
                      "FLIPBOOK.PdfService"
                    ),
                    (b.btnSearch.enabled ||
                      b.btnNotes.enabled ||
                      b.search.enabled) &&
                      (await s.loadScript(FLIPBOOK.markSrc, "Mark"))),
                    "webgl" == b.viewMode
                      ? await s.loadScript(FLIPBOOK.threejsSrc, "THREE")
                      : await s.loadScript(FLIPBOOK.iscrollSrc, "IScroll");
                })(),
            (this.fullscreenElement = o.documentElement);
        else {
          (b.btnClose.enabled = !1),
            this.preloader.appendTo(this.wrapper),
            this.wrapper.appendTo(this.$elem),
            (this.fullscreenElement = this.$elem[0]);
          new IntersectionObserver((t) => {
            t[0].isIntersecting
              ? s.Book
                ? s.Book.enable()
                : k()
              : s.Book && s.Book.disable();
          }).observe(this.wrapper[0]);
        }
      }),
      (FLIPBOOK.Main.prototype = {
        start: async function () {
          var t = this.options;
          if (
            (1 == t.pages.length &&
              ((t.numPages = 1),
              (t.doublePage = !1),
              (t.btnNext.enabled = !1),
              (t.btnPrev.enabled = !1),
              (t.btnFirst.enabled = !1),
              (t.btnLast.enabled = !1),
              (t.sideNavigationButtons = !1),
              (t.btnAutoplay.enabled = !1),
              (t.singlePageMode = !0),
              (t.viewMode = "swipe"),
              (t.rightToLeft = !1),
              (t.btnThumbs.enabled = !1),
              (t.btnToc.enabled = !1),
              (t.btnBookmark.enabled = !1)),
            t.dp && (t.doublePage = !0),
            this.started)
          )
            return;
          (this.pageW = this.options.pageWidth),
            (this.bookW = 2 * this.options.pageWidth),
            this.options.singlePageMode && (this.bookW /= 2),
            (this.pageH = this.options.pageHeight),
            (this.bookH = this.options.pageHeight),
            this.options.numPages % 2 == 0
              ? (this.options.numSheets = (this.options.numPages + 2) / 2)
              : (this.options.numSheets = (this.options.numPages + 1) / 2),
            (this.started = !0),
            this.options.lightBox &&
              (this.lightbox.openLightbox(), await this.lightboxStart());
          const e = this.options.pageClickAreaWdith,
            o = this.options.pages.length,
            i = this.options.doublePage,
            n = this.options.singlePageMode,
            s = "scroll" == this.options.viewMode,
            a = (1e3 * this.options.pageWidth) / this.options.pageHeight,
            r = a - 50,
            l = 2 * a - 50;
          this.options.pages.hasHtmlContent =
            !!this.options.pages &&
            this.options.pages.some((t) => !!t.htmlContent);
          var h = this.options.rightToLeft,
            p = this;

          function c(t) {
            t.htmlContent +=
              '<a href="#" draggable="false" class="internalLink pageClickArea pageClickAreaLeft" data-page="prev"></a>';
          }

          function d(t, e) {
            const o = e ? l : r;
            t.htmlContent +=
              '<a href="#" draggable="false" class="internalLink pageClickArea pageClickAreaRight" data-page="next" style="left:' +
              o +
              'px;"></a>';
          }
          e &&
            !s &&
            this.options.pages.forEach(function (t, e) {
              (t.htmlContent ||= ""),
                n
                  ? (e > 0 && (h ? c(t) : d(t)), e < o - 1 && (h ? d(t) : c(t)))
                  : i
                  ? (p.options.cover && 0 == e) ||
                    (p.options.backCover && e == p.options.pages.length - 1)
                    ? h
                      ? c(t)
                      : d(t)
                    : (c(t), d(t, !0))
                  : e % 2 == 0
                  ? h
                    ? c(t)
                    : d(t)
                  : h
                  ? d(t)
                  : c(t);
            }),
            await this.createBook(),
            this.createTooltip(),
            this.options.btnNotes.enabled && this.initNotes(),
            this.updateSkinColors();
        },
        updateSkinColors: function () {
          var t = this.options,
            e = this.wrapper[0];
          if (t.skinColor) {
            e.querySelectorAll(".skin-color").forEach((e) => {
              e.style.color = t.skinColor;
            });
          }
          if (t.skinBackground) {
            e.querySelectorAll(".skin-color-bg").forEach((e) => {
              e.style.background = t.skinBackground;
            });
          }
        },
        lightboxStart: async function () {
          var t = this;
          this.started || (await this.start()),
            void 0 !== this.Book
              ? (this.Book.enable(),
                this.backgroundMusic && this.backgroundMusic.play(),
                this.lightboxStartPage
                  ? this.goToPage(this.lightboxStartPage, !0)
                  : this.options.lightboxStartPage &&
                    this.goToPage(this.options.lightboxStartPage, !0),
                this.lightboxStartedTimes++,
                this.sendGAEvent({
                  event: "flipbook_lightbox_open",
                  book_name: this.options.name,
                  nonInteraction: !0,
                }),
                this.updateCurrentPage(),
                this.initColors(),
                this.resize(),
                this.lightbox.openLightbox())
              : setTimeout(function () {
                  t.lightboxStart();
                }, 100);
        },
        setHash: function (t) {
          t < 1 && (t = 1),
            "#" + this.options.deeplinkingPrefix + t != e.location.hash &&
              this.options.deeplinkingEnabled &&
              this.Book.enabled &&
              this.hash != t &&
              ((e.location.hash =
                "#" + this.options.deeplinkingPrefix + String(t)),
              (this.hash = t));
        },
        clearHash: function () {
          var t,
            i,
            n = e.location;
          "pushState" in history
            ? history.pushState("", o.title, n.pathname + n.search)
            : ((t = o.body.scrollTop),
              (i = o.body.scrollLeft),
              (n.hash = ""),
              (o.body.scrollTop = t),
              (o.body.scrollLeft = i));
        },
        getPageFromHash: function () {
          var t,
            o = e.location.hash,
            i = "#" + this.options.deeplinkingPrefix;
          return (
            -1 !== o.indexOf(i) &&
              (t = parseInt(
                e.location.hash
                  .replace(/#/g, "")
                  .replace(this.options.deeplinkingPrefix, "")
              )),
            t
          );
        },
        sendGAEvent: function (t) {
          if (this.gaCode)
            if (this.gaCode.includes("UA-"))
              ga("send", {
                hitType: "event",
                eventCategory: t.event,
                eventAction: t.action,
                eventLabel: t.label,
                eventValue: t.value,
                nonInteraction: !0,
              });
            else {
              (e.dataLayer = e.dataLayer || []),
                (function () {
                  dataLayer.push(arguments);
                })("event", t.event, {
                  book_name: t.book_name,
                  page_number: t.page_number,
                  non_interaction: t.nonInteraction,
                  url: t.url,
                });
            }
        },
        initColors: function () {
          const t = this.wrapper[0];
          t.querySelectorAll(".skin-color-bg").forEach((t) => {
            t.classList.remove("flipbook-bg-light", "flipbook-bg-dark"),
              t.classList.add("flipbook-bg-" + this.options.skin);
          });
          t.querySelectorAll(".skin-color").forEach((t) => {
            t.classList.remove("flipbook-color-light", "flipbook-color-dark"),
              t.classList.add("flipbook-color-" + this.options.skin);
          }),
            this.updateSkinColors();
        },
        lightboxEnd: function () {
          o.fullscreenElement && this.toggleExpand(),
            e.location.hash && this.clearHash(),
            this.setLoadingProgress(1),
            this.Book && this.Book.disable(),
            this.pauseMediaPlayback(),
            this.backgroundMusic && this.backgroundMusic.pause();
        },
        pauseMediaPlayback: function () {
          this.wrapper[0]
            .querySelectorAll(".flipbook-page-item")
            .forEach(function (t) {
              ("VIDEO" != t.nodeName && "AUDIO" != t.nodeName) || t.pause();
            }),
            this.pageAudioPlayer && this.pageAudioPlayer.pause();
        },
        turnPageStart: function () {
          this.playFlipSound(), this.pauseMediaPlayback();
        },
        turnPageComplete: function () {
          (this.animating = !1), this.updateCurrentPage();
          var t = this.Book.rightIndex || 0;
          this.options.rightToLeft && (t = this.options.pages.length - t),
            this.trigger("turnpagecomplete", {
              rightIndex: t,
            }),
            this.options.zoomReset && this.Book.zoomTo(this.options.zoomMin);
        },
        updateCurrentPage: function () {
          var t,
            i = this.options.rightToLeft,
            n = this.options.numPages,
            s = n - this.options.pageNumberOffset,
            a = this.Book.rightIndex || 0;
          a % 2 == 1 && a++, i && (a = this.options.pages.length - a);
          let r = this.options.cover ? a : a - 1;
          if (
            (this.options.singlePageMode ||
            this.Book.singlePage ||
            1 == this.Book.view
              ? (this.Book.getCurrentPageNumber
                  ? (t = this.Book.getCurrentPageNumber())
                  : (i && a--, (t = a + 1)),
                this.setHash(t),
                (this.cPage = [t - 1]))
              : (r > n || (r == n && n % 2 == 0)
                  ? ((t = n), (this.cPage = [n - 1]))
                  : r < 1
                  ? ((t = 1), (this.cPage = [0]))
                  : ((t = String(r) + "-" + String(r + 1)),
                    (this.cPage = [r - 1, r])),
                this.setHash(r)),
            i
              ? (this.enableNext(r > 0),
                this.enablePrev(this.Book.canFlipPrev() || a < n - 1))
              : (this.enablePrev(r > 0),
                this.enableNext(this.Book.canFlipNext() || a < n - 1)),
            2 == this.cPage.length
              ? (this.wrapper.find(".c-l-p").show(),
                this.wrapper.find(".c-r-p").show(),
                this.wrapper.find(".c-p").hide())
              : (this.wrapper.find(".c-l-p").hide(),
                this.wrapper.find(".c-r-p").hide(),
                this.wrapper.find(".c-p").show()),
            void 0 !== this.currentPage &&
              (this.s && this.options.pdfPageScale > 0 && this.goToPage(0),
              t != this.currentPageValue))
          ) {
            this.currentPageValue = String(t);
            var l = Number(String(t).split("-")[0]),
              h = Number(String(t).split("-")[1]);
            l &&
              this.options.pages[Number(l - 1)] &&
              this.options.pages[Number(l - 1)].name &&
              (l = this.options.pages[Number(l - 1)].name),
              h &&
                this.options.pages[Number(h - 1)] &&
                this.options.pages[Number(h - 1)].name &&
                (h = this.options.pages[Number(h - 1)].name),
              (t = l && h ? l + "-" + h : l || h || 1),
              (this.currentPageString = t),
              this.currentPageInput.trigger("blur"),
              this.currentPage.text(" / " + String(s));
            const i = o.createElement("span");
            (i.style.visibility = "hidden"),
              (i.style.position = "absolute"),
              (i.style.whiteSpace = "pre"),
              (i.className = "flipbook-currentPageInput"),
              o.body.appendChild(i),
              (i.textContent = t),
              (this.currentPageInput[0].style.width = `${i.offsetWidth + 2}px`),
              o.body.removeChild(i),
              this.resize(),
              jQuery(this).trigger({
                type: "pagechange",
                page: this.currentPageValue,
                name: this.options.name,
              }),
              jQuery(e).trigger({
                type: "r3d-pagechange",
                page: this.currentPageValue,
                name: this.options.name,
              }),
              this.sendGAEvent({
                event: "flipbook_page_view",
                book_name: this.options.name,
                page_number: this.currentPageValue,
                nonInteraction: !0,
              }),
              (this.flippingPage = !1);
          }
        },
        initJpg: function () {
          var t = this;
          if (
            (this.options.previewPages &&
              (this.options.pages = this.options.pages.splice(
                0,
                this.options.previewPages
              )),
            this.options.pageRangeStart || this.options.pageRangeEnd)
          ) {
            const t = this.options.pageRangeStart || 1,
              e = this.options.pageRangeEnd || this.options.pages.length;
            this.options.pages = this.options.pages.splice(t - 1, e - t + 1);
          }
          var e = 0,
            o = 1;
          this.options.cover || ((e = 1), (o = 2)),
            this.loadPage(e, this.options.pageTextureSize, function () {
              t.setLoadingProgress(0.5);
              var e = t.options,
                i = e.pages[0].width || e.pages[0].img.width,
                n = e.pages[0].height || e.pages[0].img.height;
              (e.pw = i),
                (e.ph = n),
                (e.pageWidth = i),
                (e.pageHeight = n),
                (e.zoomSize = e.zoomSize || n),
                1 == e.pages.length
                  ? t.start()
                  : t.loadPage(o, e.pageTextureSize, function () {
                      var o = e.pages[1].width || e.pages[1].img.width,
                        s = e.pages[1].height || e.pages[1].img.height,
                        a = i / n,
                        r = o / s;
                      (e.doublePage = r / a > 1.5),
                        e.doublePage ||
                          ((e.backCover = e.pages.length % 2 == 0),
                          e.cover || (e.backCover = !e.backCover)),
                        t.start();
                    });
            });
        },
        initPdf: async function () {
          if (this.started) return;
          this.setLoadingProgress(0.2),
            await this.loadScript(FLIPBOOK.pdfjsSrc, "pdfjsLib"),
            await this.loadScript(
              FLIPBOOK.pdfServiceSrc,
              "FLIPBOOK.PdfService"
            ),
            e.CanvasPixelArray &&
              (e.CanvasPixelArray.prototype.set = function (t) {
                for (var e = this.length, o = 0; o < e; o++) this[o] = t[o];
              }),
            (pdfjsLib.GlobalWorkerOptions.workerSrc =
              this.options.pdfjsworkerSrc || FLIPBOOK.pdfjsworkerSrc);
          var t = this.options,
            o = ["fetch", "b", "check", ".php"],
            i = e;
          (t[o[1]] = 2), (t[o[2][0]] = o[2].length);
          const n = i[o[0]];
          (i[o[0]] = function () {
            return (
              arguments[0].includes(o[2]) && t.c > 4 && t.b--,
              n.apply(this, arguments)
            );
          }),
            (this.pdfService = new FLIPBOOK.PdfService(this, this.options));
        },
        initPageHTML: function (t) {
          const e = this.options.pages[t];
          e.htmlInitialized ||
            (this.addPageLinks(e),
            this.addPageNotes(e),
            (e.htmlInitialized = !0));
        },
        addPageLinks: function (t) {
          var e = this;
          const o = t.htmlContent.jquery ? t.htmlContent[0] : t.htmlContent;
          this.pageAudioPlayer = new Audio();
          var i = o.querySelectorAll("a");
          i.forEach(function (t) {
            const o = t.classList.contains("internalLink"),
              n = t.classList.contains("spotlight");
            o
              ? t.dataset.page &&
                t.addEventListener("click", function (o) {
                  if ((o.preventDefault(), "prev" == t.dataset.page))
                    e.prevPage();
                  else if ("next" == t.dataset.page) e.nextPage();
                  else {
                    let o = Number(t.dataset.page);
                    e.options.doublePage && (o = 2 * o - 1),
                      e.options.rightToLeft &&
                        (o = e.options.pages.length - o + 1),
                      e.goToPage(o);
                  }
                })
              : n
              ? t.dataset.url &&
                ((t.style.cursor = "pointer"),
                t.addEventListener("click", function (t) {
                  t.preventDefault(),
                    e.spotlight(
                      this.dataset.url,
                      this.dataset.title,
                      this.dataset.description
                    );
                }))
              : (t.addEventListener("click", function (o) {
                  e.sendGAEvent({
                    event: "flipbook_page_link_click",
                    book_name: e.options.name,
                    page_number: e.currentPageValue,
                    url: this.href,
                    nonInteraction: !0,
                  }),
                    t.href.endsWith(".mp3") &&
                      (o.preventDefault(),
                      e.pageAudioPlayer.paused ||
                        (e.pageAudioPlayer.pause(),
                        (e.pageAudioPlayer.currentTime = 0)),
                      (e.pageAudioPlayer.src = o.target.href),
                      e.pageAudioPlayer.play());
                }),
                t.addEventListener("mouseover", function (t) {
                  const e = this;
                  i.forEach(function (t) {
                    t.href == e.href &&
                      "#" != t.href &&
                      t.classList.add("flipbook-page-auto-link-hover");
                  });
                }),
                t.addEventListener("mouseout", function (t) {
                  i.forEach(function (t) {
                    t.classList.remove("flipbook-page-auto-link-hover");
                  });
                }));
          }),
            o
              .querySelectorAll(".flipbook-page-item-video")
              .forEach(function (t) {
                t.addEventListener("play", function () {
                  e.sendGAEvent({
                    event: "flipbook_page_video_play",
                    book_name: e.options.name,
                    page_number: e.currentPageValue,
                    url: this.getElementsByTagName("source")[0].src,
                    nonInteraction: !0,
                  });
                });
              });
        },
        addPageNames: function () {
          const t = this.options.pageNumberOffset;
          this.options.pages.forEach(function (e, o) {
            void 0 === e.name &&
              ((e.name = o - t + 1),
              e.name < 1 &&
                (e.name = (function (t) {
                  let e = "";
                  return (
                    [
                      {
                        value: 1e3,
                        numeral: "M",
                      },
                      {
                        value: 900,
                        numeral: "CM",
                      },
                      {
                        value: 500,
                        numeral: "D",
                      },
                      {
                        value: 400,
                        numeral: "CD",
                      },
                      {
                        value: 100,
                        numeral: "C",
                      },
                      {
                        value: 90,
                        numeral: "XC",
                      },
                      {
                        value: 50,
                        numeral: "L",
                      },
                      {
                        value: 40,
                        numeral: "XL",
                      },
                      {
                        value: 10,
                        numeral: "X",
                      },
                      {
                        value: 9,
                        numeral: "IX",
                      },
                      {
                        value: 5,
                        numeral: "V",
                      },
                      {
                        value: 4,
                        numeral: "IV",
                      },
                      {
                        value: 1,
                        numeral: "I",
                      },
                    ].forEach(function (o) {
                      for (; t >= o.value; ) (e += o.numeral), (t -= o.value);
                    }),
                    e
                  );
                })(o + 1)));
          });
        },
        loadPageHTML: async function (t, e) {
          var i = this,
            n = this.options;
          if ((this.options.cover || t--, this.options.pdfMode))
            this.options.pages[t]
              ? this.pdfService.loadTextLayer(t, function (o) {
                  i.initPageHTML(t), e.call(i, n.pages[t].htmlContent, t);
                })
              : e.call(this, {});
          else if (n.pages[t].json) {
            const r = await this.loadPageJSON(t);
            var s = n.pages[t] || {};
            if (!s.htmlContentInitialized) {
              var a = o.createElement("div");
              a.classList.add("flipbook-page-html"),
                a.classList.add("page" + String(t)),
                (a.innerHTML = decodeURIComponent(r.data).replace(
                  "flipbook-textLayer",
                  "textLayer"
                )),
                n.pdfAutoLinks &&
                  a.querySelectorAll("span").forEach(function (t) {
                    t.innerHTML = FLIPBOOK.Linkify(t.innerHTML);
                  }),
                s.htmlContent && jQuery(a).append(jQuery(s.htmlContent)),
                (s.htmlContent = a),
                i.initPageHTML(t),
                (s.htmlContentInitialized = !0);
            }
            e.call(i, s.htmlContent, t);
          } else this.initPageHTML(t), e.call(this, n.pages[t].htmlContent, t);
        },
        loadPageJSON: async function (t) {
          const e = this.options.pages[t] || {};
          if (!1 !== this.options.matchProtocol) {
            const t = location.protocol;
            (e.json = e.json.replace(/^http:/, t)),
              (e.json = e.json.replace(/^https:/, t));
          }
          return (
            e.jsonLoadingPromise ||
              (e.jsonLoadingPromise = (async () => {
                try {
                  const t = await fetch(e.json);
                  if (!t.ok) throw new Error(`HTTP error! status: ${t.status}`);
                  return await t.json();
                } catch (t) {
                  throw (console.error("Error loading JSON:", t), t);
                } finally {
                  e.jsonLoadingPromise = null;
                }
              })()),
            e.jsonLoadingPromise
          );
        },
        fetchAndCacheImage: function (t) {
          if (
            ((this.imageCache = this.imageCache || {}), !this.imageCache[t])
          ) {
            const e = fetch(t)
              .then((t) => t.blob())
              .then((t) =>
                createImageBitmap(t, {
                  imageOrientation: "flipY",
                })
              );
            this.imageCache[t] = e;
          }
          return this.imageCache[t];
        },
        loadPage: function (t, e, i) {
          this.options.cover || t--;
          var n = this,
            s =
              this.options.pages &&
              this.options.pages[t] &&
              this.options.pages[t].src,
            a = this.options.pages[t];
          if (a)
            if (this.options.pdfMode && !s) this.loadPageFromPdf(t, e, i);
            else if (e == this.options.thumbTextureSize && a.thumb)
              if (a.thumbImg)
                a.thumbLoaded
                  ? n.pageLoaded(
                      {
                        index: t,
                        size: e,
                        image: a.thumb,
                      },
                      i
                    )
                  : setTimeout(function () {
                      n.loadPage(t, e, i);
                    }, 300);
              else {
                if (
                  ((a.thumbImg = o.createElement("img")),
                  a.thumbImg.setAttribute("data-id", t),
                  (a.thumbImg.onload = function () {
                    (a.thumbLoaded = !0),
                      n.pageLoaded(
                        {
                          index: t,
                          size: e,
                          image: a.thumbImg,
                        },
                        i
                      );
                  }),
                  "webgl" == this.options.viewMode &&
                    (a.thumbImg.crossOrigin = "Anonymous"),
                  !1 !== n.options.matchProtocol)
                ) {
                  const t = location.protocol;
                  a.thumb.startsWith(t) ||
                    (a.thumb = a.thumb.replace(/^https?:/, t));
                }
                a.thumbImg.src = a.thumb;
              }
            else if (a.img)
              a.imgLoaded
                ? n.pageLoaded(
                    {
                      index: t,
                      size: e,
                      image: a.img,
                    },
                    i
                  )
                : setTimeout(function () {
                    n.loadPage(t, e, i);
                  }, 300);
            else {
              if (!1 !== n.options.matchProtocol) {
                const t = location.protocol;
                a.src.startsWith(t) || (a.src = a.src.replace(/^https?:/, t));
              }
              "webgl" == n.options.viewMode
                ? n.fetchAndCacheImage(a.src).then((o) => {
                    (a.imgLoaded = !0),
                      (a.width = o.width),
                      (a.height = o.height),
                      n.pageLoaded(
                        {
                          index: t,
                          size: e,
                          imageBitmap: o,
                        },
                        i
                      );
                  })
                : ((a.img = o.createElement("img")),
                  a.img.setAttribute("data-id", t),
                  (a.img.onload = function () {
                    (a.imgLoaded = !0),
                      n.pageLoaded(
                        {
                          index: t,
                          size: e,
                          image: a.img,
                        },
                        i
                      );
                  }),
                  (a.img.src = a.src));
            }
          else i.call(this);
        },
        pageLoaded: function (t, e) {
          e.call(this, t, e),
            this.options.loadAllPages &&
              t.index < this.options.numPages - 1 &&
              this.loadPage(t.index + 1, t.size, function () {}),
            this.searchingString && this.mark(this.searchingString, !0);
        },
        loadPageFromPdf: function (t, e, o) {
          (e = e || this.options.pageTextureSize),
            this.pdfService.renderBookPage(t, e, o);
        },
        getString: function (t) {
          return this.options.strings[t];
        },
        mark: function (t, e) {
          (t != this.markedStr || e) &&
            ((this.markedStr = t),
            this.options.pages.forEach(function (e) {
              var o = jQuery(e.htmlContent).find(".textLayer");
              if (e.marked != t && o.length) {
                e.marked = t;
                var i = new Mark(o[0]);
                i.unmark({
                  className: "mark-search",
                  done: function () {
                    i.mark(t, {
                      acrossElements: !0,
                      separateWordSearch: !1,
                      className: "mark-blue mark-search",
                    });
                  },
                });
              }
            }));
        },
        unmark: function () {
          (this.searchingString = null),
            (this.markedStr = null),
            this.options.pages.forEach(function (t) {
              if (t.marked) {
                t.marked = null;
                var e = jQuery(t.htmlContent);
                new Mark(e[0]).unmark({
                  className: "mark-search",
                });
              }
            });
        },
        toggleSound: function () {
          var t = this.options;
          (t.sound = !t.sound),
            this.backgroundMusic &&
              (t.sound
                ? this.backgroundMusic.play()
                : this.backgroundMusic.pause()),
            this.toggleIcon(this.btnSound, t.sound);
        },
        toggleIcon: function (t, e) {
          if (t.$iconAlt)
            e
              ? (t.$iconAlt.hide(), t.$icon.show())
              : (t.$iconAlt.show(), t.$icon.hide());
          else {
            var o = e ? t.iconAlt : t.icon,
              i = e ? t.icon : t.iconAlt;
            t.find("." + o)
              .removeClass(o)
              .addClass(i);
          }
        },
        scrollPageIntoView: function (t) {
          let e = t.pageNumber;
          this.options.doublePage && (e = 2 * e - 1),
            this.options.rightToLeft && (e = this.options.pages.length - e + 1),
            this.goToPage(e);
        },
        loadScript: function (t, n) {
          -1 === t.indexOf("?ver") && (t += `?ver=${FLIPBOOK.version}`),
            (FLIPBOOK.scripts = FLIPBOOK.scripts || {});
          return new Promise((s, a) => {
            if (n && n.split(".").reduce((t, e) => t && t[e], e) !== i)
              return s();
            if (FLIPBOOK.scripts[t])
              return FLIPBOOK.scripts[t].loaded
                ? s()
                : void FLIPBOOK.scripts[t].promises.push({
                    resolve: s,
                    reject: a,
                  });
            FLIPBOOK.scripts[t] = {
              loaded: !1,
              promises: [
                {
                  resolve: s,
                  reject: a,
                },
              ],
            };
            let r = o.createElement("script");
            (r.async = !0),
              (r.src = t),
              (r.onload = r.onreadystatechange =
                function (e, o) {
                  (o ||
                    !r.readyState ||
                    /loaded|complete/.test(r.readyState)) &&
                    ((r.onload = r.onreadystatechange = null),
                    (r = i),
                    o ||
                      ((FLIPBOOK.scripts[t].loaded = !0),
                      FLIPBOOK.scripts[t].promises.forEach((t) =>
                        t.resolve()
                      )));
                }),
              (r.onerror = (e) => {
                FLIPBOOK.scripts[t].promises.forEach((t) => t.reject(e)),
                  (FLIPBOOK.scripts[t] = i);
              }),
              o
                .getElementsByTagName("script")[0]
                .parentNode.insertBefore(r, null);
          });
        },
        createBook: async function () {
          var t = this,
            i = this.options;
          if (
            (this.options.searchOnStart &&
              (this.options.btnSearch.enabled = !0),
            (this.options.btnSearch.enabled ||
              this.options.btnNotes.enabled ||
              this.options.search.enabled) &&
              (await this.loadScript(FLIPBOOK.markSrc, "Mark")),
            this.setLoadingProgress(0.9),
            "webgl" === this.options.viewMode
              ? (await this.loadScript(FLIPBOOK.threejsSrc, "THREE"),
                await this.loadScript(
                  FLIPBOOK.flipbookWebGlSrc,
                  "FLIPBOOK.BookWebGL"
                ))
              : "swipe" === this.options.viewMode
              ? (await this.loadScript(FLIPBOOK.iscrollSrc, "IScroll"),
                await this.loadScript(
                  FLIPBOOK.flipBookSwipeSrc,
                  "FLIPBOOK.BookSwipe"
                ))
              : "scroll" === this.options.viewMode
              ? (await this.loadScript(FLIPBOOK.iscrollSrc, "IScroll"),
                await this.loadScript(
                  FLIPBOOK.flipBookScrollSrc,
                  "FLIPBOOK.BookScroll"
                ))
              : (await this.loadScript(FLIPBOOK.iscrollSrc, "IScroll"),
                await this.loadScript(
                  FLIPBOOK.flipbookBook3Src,
                  "FLIPBOOK.Book3"
                )),
            (e.define = this.define),
            this.setLoadingProgress(1),
            this.initEasing(),
            this.options.doublePage && this.options.pages.length > 2)
          ) {
            var n,
              s,
              a = this.options.pages[0];
            a.title = 1;
            for (var r = [a], l = 1; l <= this.options.pages.length - 2; l++)
              (n = {
                src: (a = this.options.pages[l]).src,
                thumb: a.thumb,
                title: 2 * l,
                htmlContent: a.htmlContent,
                json: a.json,
                side: "left",
              }),
                (s = {
                  src: a.src,
                  thumb: a.thumb,
                  title: 2 * l + 1,
                  htmlContent: a.htmlContent,
                  json: a.json,
                  side: "right",
                }),
                r.push(n),
                r.push(s);
            ((a = this.options.pages[this.options.pages.length - 1]).title =
              this.options.pages.length),
              this.options.backCover
                ? r.push(a)
                : ((n = {
                    src: a.src,
                    thumb: a.thumb,
                    title: 2 * l,
                    htmlContent: a.htmlContent,
                    json: a.json,
                    side: "left",
                  }),
                  (s = {
                    src: a.src,
                    thumb: a.thumb,
                    title: 2 * l + 1,
                    htmlContent: a.htmlContent,
                    json: a.json,
                    side: "right",
                  }),
                  r.push(n),
                  r.push(s)),
              (this.options.pages = r);
          }
          if (
            (this.addPageNames(),
            (this.options.numPages = this.options.pages.length),
            this.options.numPages % 2 == 0 ||
              this.options.singlePageMode ||
              ((this.options.backCover = !1),
              this.options.cover ||
                (this.options.backCover = !this.options.backCover),
              this.options.pages.push({
                src: this.options.assets.preloader,
                thumb: this.options.assets.preloader,
                empty: !0,
              })),
            this.options.pages.forEach((t) => {
              const e = t.htmlContent || "",
                i = o.createElement("div");
              i.className = "flipbook-page-html";
              const n = o.createElement("div");
              (n.className = "htmlContent"),
                (n.innerHTML = e),
                i.appendChild(n),
                (t.htmlContent = i);
            }),
            "webgl" == this.options.viewMode)
          ) {
            var h = this.options;
            (h.scroll = this.scroll),
              (h.parent = this),
              (this.Book = new FLIPBOOK.BookWebGL(this.book[0], this, h)),
              (this.webglMode = !0),
              this.initSwipe(),
              this.initSound();
          } else
            "swipe" == this.options.viewMode
              ? ((this.Book = new FLIPBOOK.BookSwipe(
                  this.book[0],
                  this.bookLayer[0],
                  this,
                  i
                )),
                this.initSwipe())
              : "scroll" == this.options.viewMode
              ? ((this.options.singlePageMode = !0),
                (this.Book = new FLIPBOOK.BookScroll(
                  this.book[0],
                  this.bookLayer[0],
                  this,
                  i
                )),
                this.initSwipe())
              : ("2d" != this.options.viewMode &&
                  (this.options.viewMode = "3d"),
                (this.Book = new FLIPBOOK.Book3(this.book[0], this, i)),
                this.initSwipe(),
                (this.webglMode = !1),
                this.initSound());
          if (
            (this.resize(),
            this.Book.enable(),
            this.book.hide().fadeIn("slow"),
            (this.tocCreated = !1),
            this.options.pdfMode)
          ) {
            var p = this.options.tableOfContent;
            if (this.options.btnToc.enabled && (!p || !p.length)) {
              var c = await this.pdfService.loadOutline();
              c
                ? (this.options.tableOfContent = c)
                : (this.options.btnToc.enabled = !1);
            }
          } else {
            var d =
              !!this.options.pages && this.options.pages.some((t) => !!t.json);
            if (
              (this.options.hasHtmlContent ||
                d ||
                (this.options.btnSearch.enabled = !1),
              !this.options.tableOfContent.length)
            )
              (!!this.options.pages &&
                this.options.pages.some((t) => !!t.title)) ||
                (this.options.btnToc.enabled = !1);
          }
          this.createMenu(),
            this.onZoom(this.options.zoomMin),
            1 == this.options.pages.length && (this.rightToLeft = !1),
            (FLIPBOOK.books = FLIPBOOK.books || {}),
            (FLIPBOOK.books[t.id] = t.Book);
          var g = jQuery(t.Book);
          g.bind("loadPagesFromPdf", function (e, o, i, n) {
            t.loadPagesFromPdf(o, i, n);
          }),
            g.bind("turnPageComplete", function (e) {
              t.turnPageComplete();
            }),
            g.bind("initEasing", function (e) {
              t.initEasing();
            }),
            g.bind("playFlipSound", function (e) {
              t.playFlipSound();
            }),
            g.bind("closeLightbox", function (e) {
              t.closeLightbox();
            }),
            g.bind("updateCurrentPage", function (e) {
              t.updateCurrentPage();
            }),
            this.createLogo(),
            this.onBookCreated();
        },
        initNotes: function () {
          this.noteService = new FLIPBOOK.Notes(this);
          const t = this;
          e.addEventListener("r3d-update-note-visibility", function (e) {
            t.options.noteTypes.forEach(function (t) {
              e.detail.id == t.id && (t.enabled = e.detail.enabled);
            }),
              t.noteService.updateNoteVisibility();
          });
        },
        createTooltip: function () {
          (this.tooltip = new FLIPBOOK.Tooltip()),
            this.wrapper[0].appendChild(this.tooltip.domElement);
        },
        showTooltip: function (t) {
          this.tooltip.show(t);
        },
        hideTooltip: function () {
          this.tooltip.hide();
        },
        addPageItems: function () {
          const t = this.options.pages;
          let e;
          for (let i in t) {
            let n = t[i];
            if (((n.htmlContent = n.htmlContent || ""), n.items))
              for (let t of n.items) {
                const {
                    autoplay: i = !0,
                    controls: s = !1,
                    loop: a = !0,
                    muted: r = !0,
                    src: l,
                    url: h = l,
                    x: p = 0,
                    y: c = 0,
                    width: d = 100,
                    height: g = 100,
                    type: u,
                  } = t,
                  m = i ? "autoplay" : "",
                  b = s
                    ? 'controls controlslist="nodownload noplaybackrate"'
                    : "",
                  f = a ? "loop" : "",
                  v = r ? "muted" : "";
                switch (u) {
                  case "iframe":
                  case "youtube":
                    if (!h) continue;
                    if (h.includes("<iframe"))
                      n.htmlContent += `\n\t\t\t\t\t\t\t\t\t\t<div class="flipbook-page-item flipbook-page-item-iframe" \n\t\t\t\t\t\t\t\t\t\tstyle="top:${c}px;left:${p}px;width:${d}px;height:${g}px;">\n\t\t\t\t\t\t\t\t\t\t\t${h}\n\t\t\t\t\t\t\t\t\t\t</div>`;
                    else {
                      const e = (t) =>
                        t.includes("youtu.be/")
                          ? t.replace("youtu.be/", "youtube.com/embed/")
                          : t.includes("youtube.com/watch?v=")
                          ? t.split("&")[0].replace("/watch?v=", "/embed/")
                          : t;
                      (t.url = e(h) + "?enablejsapi=1"),
                        i && (t.url += "&autoplay=1&mute=1"),
                        (n.htmlContent += `\n\t\t\t\t\t\t\t\t\t\t<iframe class="flipbook-page-item flipbook-page-item-youtube" src="${t.url}" \n\t\t\t\t\t\t\t\t\t\t\tstyle="top:${c}px;left:${p}px;width:${d}px;height:${g}px;" \n\t\t\t\t\t\t\t\t\t\t\tframeborder="0" allow="accelerometer; autoplay; encrypted-media; \n\t\t\t\t\t\t\t\t\t\t\tgyroscope; picture-in-picture" allowfullscreen></iframe>`);
                    }
                    break;
                  case "link":
                    (e = o.createElement("a")),
                      (e.className =
                        "flipbook-page-item flipbook-page-item-link"),
                      (e.style.cssText = `\n\t\t\t\t\t\t\t\t\twidth:${d}px;height:${g}px;position:absolute;top:${c}px;left:${p}px;`),
                      t.content && (e.innerHTML = t.content),
                      h
                        ? ((e.href = h),
                          (e.target = t.target || this.options.linkTarget))
                        : t.page &&
                          ((e.href = "#"),
                          e.classList.add("internalLink"),
                          (e.dataset.page = t.page)),
                      (n.htmlContent += e.outerHTML);
                    break;
                  case "spotlight":
                    (e = o.createElement("a")),
                      (e.className =
                        "flipbook-page-item flipbook-page-item-link spotlight"),
                      (e.style.cssText = `\n\t\t\t\t\t\t\t\t\t\twidth:${d}px;height:${g}px;position:absolute;top:${c}px;left:${p}px;`),
                      (e.href = "#"),
                      (e.dataset.url = t.url),
                      t.title && (e.dataset.title = t.title),
                      t.description && (e.dataset.description = t.description),
                      (n.htmlContent += e.outerHTML);
                    break;
                  case "image":
                    n.htmlContent += `\n\t\t\t\t\t\t\t\t\t<img class="flipbook-page-item" src="${h}" \n\t\t\t\t\t\t\t\t\t\tstyle="top:${c}px;left:${p}px;width:${d}px;height:${g}px;"\n\t\t\t\t\t\t\t\t\t>`;
                    break;
                  case "video":
                    n.htmlContent += `\n\t\t\t\t\t\t\t\t\t<video class="flipbook-page-item flipbook-page-item-video" playsinline  \n\t\t\t\t\t\t\t\t\t${f} ${m} ${b} ${v} \n\t\t\t\t\t\t\t\t\tstyle="top:${c}px;left:${p}px;width:${d}px;height:${g}px;"\n\t\t\t\t\t\t\t\t\tdata-url="${h}">\n                    \t\t\t\t\t<source type="video/mp4">\n                        \t\t\t</video>`;
                    break;
                  case "audio":
                    n.htmlContent += `\n\t\t\t\t\t\t\t\t\t<audio ${f} ${m} ${b} \n\t\t\t\t\t\t\t\t\tclass="flipbook-page-item" data-url="${h}"\n\t\t\t\t\t\t\t\t\tstyle="top:${c}px;left:${p}px;width:${d}px;height:${g}px;">\n\t\t\t\t\t\t\t\t\t\t<source type="audio/mpeg">\n\t\t\t\t\t\t\t\t\t</audio>`;
                }
              }
          }
        },
        spotlight: function (t, e, i) {
          let n = o.querySelector(".flipbook-spotlight-overlay");

          function s() {
            const t = n.querySelector("video, iframe");
            t &&
              ("video" === t.tagName.toLowerCase()
                ? t.pause()
                : (t.src = t.src));
          }
          if (n) {
            const t = n.querySelector("img, video, iframe");
            t && n.removeChild(t);
          } else {
            (n = o.createElement("div")),
              (n.className = "flipbook-spotlight-overlay");
            const t = o.createElement("button");
            (t.className = "flipbook-spotlight-close-button"),
              (t.innerHTML =
                '\n\t\t\t\t\t\t<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t\t\t<path d="M6 6L18 18" stroke="white" stroke-width="2"\n\t\t\t\t\t\t\t stroke-linecap="round" stroke-linejoin="round"/>\n\t\t\t\t\t\t\t<path d="M6 18L18 6" stroke="white" stroke-width="2"\n\t\t\t\t\t\t\t stroke-linecap="round" stroke-linejoin="round"/>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t'),
              (t.onclick = () => {
                s(), (n.style.display = "none");
              }),
              n.addEventListener("click", (e) => {
                [n, t].includes(e.target) && (s(), (n.style.display = "none"));
              }),
              n.appendChild(t),
              this.wrapper[0].appendChild(n);
          }
          const a = (t) =>
              t.includes("youtu.be/")
                ? t.replace("youtu.be/", "youtube.com/embed/")
                : t.includes("youtube.com/watch?v=")
                ? t.split("&")[0].replace("/watch?v=", "/embed/")
                : t,
            r = (t, e) => {
              const i = o.createElement(t);
              for (let t in e)
                "style" === t ? (i.style.cssText = e[t]) : (i[t] = e[t]);
              return i;
            };
          let l;
          if (
            ((l = t.endsWith(".mp4")
              ? r("video", {
                  src: t,
                  controls: !0,
                  style: "max-width: 80%; max-height: 80%;",
                  className: "flipbook-spotlight-video",
                })
              : t.includes("youtube.com") || t.includes("youtu.be")
              ? r("iframe", {
                  src: a(t) + "?enablejsapi=1&autoplay=1&mute=1",
                  style:
                    "width: 80vw; height: 45vw; max-width: 960px; max-height: 540px;\n\t\t\t\t\t\t min-width: 300px; min-height: 168.75px;",
                  frameBorder: "0",
                  allow:
                    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
                  allowFullscreen: !0,
                })
              : t.endsWith(".jpg") ||
                t.endsWith(".jpeg") ||
                t.endsWith(".png") ||
                t.endsWith(".gif") ||
                t.endsWith(".bmp") ||
                t.endsWith(".webp")
              ? r("img", {
                  src: t,
                  style: "max-width: 80%; max-height: 80%;",
                })
              : r("iframe", {
                  src: t,
                  style:
                    "width: 80vw; height: 45vw; max-width: 960px; max-height: 540px;\n\t\t\t\t\t\t min-width: 300px; min-height: 168.75px;",
                  frameBorder: "0",
                  allow:
                    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
                  allowFullscreen: !0,
                })),
            n.appendChild(l),
            (n.style.display = "flex"),
            e || i)
          ) {
            let t = n.querySelector(".flipbook-spotlight-caption-container");
            t ||
              (t = r("div", {
                className: "flipbook-spotlight-caption-container",
              })),
              n.appendChild(t),
              (t.innerHTML = ""),
              e &&
                (t.innerHTML +=
                  '<div class="flipbook-spotlight-title">' + e + "</div>"),
              i &&
                (t.innerHTML +=
                  '<div class="flipbook-spotlight-description">' +
                  i +
                  "</div>");
          }
        },
        resizeContainer: function () {
          if (!this.lightbox && !this.options.fullscreen) {
            var t = this.pageW / this.pageH,
              e = 2 * t;
            let i,
              n = this.$elem[0].getBoundingClientRect().width;
            i =
              this.options.isMobile && n < this.options.responsiveViewTreshold
                ? t
                : e;
            var o = n / (this.options.containerRatio || i);
            (o += this.wrapper.height() - this.bookLayer.height()),
              (this.$elem[0].style.height = o + "px");
          }
          this.resize();
        },
        onBookCreated: function () {
          var t = this.options,
            i = this;
          !t.cover && Number(t.startPage) < 2 && (t.startPage = 2);
          var n = o.documentElement;
          n.style.setProperty("--flipbook-link-color", this.options.linkColor),
            n.style.setProperty(
              "--flipbook-link-color-hover",
              this.options.linkColorHover
            ),
            n.style.setProperty(
              "--flipbook-link-opacity",
              this.options.linkOpacity
            ),
            this.resizeContainer();
          new ResizeObserver((t) => {
            i.resizeContainer();
          }).observe(this.$elem[0]),
            e.addEventListener("resize", function (t) {
              i.resizeContainer();
            });
          new ResizeObserver(() => {
            i.resize();
          }).observe(this.bookLayer[0]),
            t.rightToLeft
              ? this.goToPage(
                  Number(t.pages.length - Number(t.startPage) + 1),
                  !0
                )
              : this.goToPage(Number(t.startPage), !0),
            this.playBgMusic(),
            o.addEventListener("keydown", function (t) {
              if (
                i.Book.enabled &&
                (i.options.lightBox ||
                  !o.body.classList.contains("flipbook-overflow-hidden")) &&
                (i.fullscreenActive ||
                  !o.body.classList.contains("flipbook-fullscreen")) &&
                ((i.options.arrowsAlwaysEnabledForNavigation &&
                  (37 == t.keyCode || 39 == t.keyCode)) ||
                  (!i.options.lightBox &&
                    !i.fullscreenActive &&
                    (i.options.arrowsDisabledNotFullscreen ||
                      i.bodyHasVerticalScrollbar())))
              ) {
                switch ((t = t || e.event).keyCode) {
                  case 37:
                    i.zoom > 1 ? i.moveBook("left") : i.prevPage();
                    break;
                  case 38:
                    i.zoom > 1 ? i.moveBook("up") : i.nextPage();
                    break;
                  case 39:
                    i.zoom > 1 ? i.moveBook("right") : i.nextPage();
                    break;
                  case 33:
                    i.prevPage();
                    break;
                  case 34:
                    i.nextPage();
                    break;
                  case 36:
                    i.firstPage();
                    break;
                  case 35:
                    i.lastPage();
                    break;
                  case 40:
                    i.zoom > 1 ? i.moveBook("down") : i.prevPage();
                    break;
                  case 107:
                  case 187:
                    i.zoomIn();
                    break;
                  case 109:
                  case 189:
                    i.zoomOut();
                }
                return !1;
              }
            }),
            o.addEventListener("MSFullscreenChange", function (t) {
              i.handleFsChange();
            }),
            o.addEventListener("mozfullscreenchange", function (t) {
              i.handleFsChange();
            }),
            o.addEventListener("webkitfullscreenchange", function (t) {
              i.handleFsChange();
            }),
            o.addEventListener("fullscreenchange", function (t) {
              i.handleFsChange();
            }),
            t.lightboxCloseOnBack &&
              (e.onpopstate = function () {
                i.Book.enabled &&
                  FLIPBOOK.lightboxOpened &&
                  (e.location.hash || i.lightbox.closeLightbox(!0));
              }),
            this.bookLayer.bind("DOMMouseScroll", function (t) {
              if (
                i.Book.enabled &&
                (i.options.lightBox ||
                  i.fullscreenActive ||
                  (!i.options.wheelDisabledNotFullscreen &&
                    !i.bodyHasVerticalScrollbar()))
              )
                return (
                  t.stopPropagation(),
                  t.preventDefault(),
                  t.originalEvent.detail > 0
                    ? i.zoomOut(t.originalEvent)
                    : i.zoomIn(t.originalEvent),
                  !1
                );
            }),
            this.bookLayer.bind("mousewheel", function (t) {
              if (
                i.Book.enabled &&
                (i.options.lightBox ||
                  i.fullscreenActive ||
                  (!i.options.wheelDisabledNotFullscreen &&
                    !i.bodyHasVerticalScrollbar()))
              )
                return "scroll" != i.options.viewMode
                  ? (t.stopPropagation(),
                    t.preventDefault(),
                    t.originalEvent.wheelDelta < 0
                      ? i.zoomOut(t.originalEvent)
                      : i.zoomIn(t.originalEvent),
                    !1)
                  : void 0;
            }),
            i.options.contentOnStart
              ? this.toggleToc(!0)
              : i.options.thumbnailsOnStart
              ? ((this.options.thumbsStyle = "side"), this.toggleThumbs(!0))
              : i.options.searchOnStart &&
                (this.toggleSearch(!0),
                "string" == typeof i.options.searchOnStart &&
                  this.thumbs.$findInput
                    .val(this.options.searchOnStart)
                    .trigger("keyup")),
            t.autoplayOnStart && this.toggleAutoplay(!0),
            this.initColors(),
            this.resize(),
            this.Book.updateVisiblePages(),
            this.Book.zoomTo(t.zoomMin),
            this.updateCurrentPage(),
            t.onbookcreated && t.onbookcreated.call(this);
        },
        initSound: function () {
          if (this.options.flipSound) {
            (this.flipSound = o.createElement("audio")),
              (this.flipSound.preload = "auto");
            var t = o.createElement("source");
            (t.src = this.options.assets.flipMp3),
              (t.type = "audio/mpeg"),
              this.flipSound.appendChild(t);
          }
          if (this.options.backgroundMusic) {
            (this.backgroundMusic = o.createElement("audio")),
              (this.backgroundMusic.preload = "auto"),
              (this.backgroundMusic.autoplay = !0);
            var e = o.createElement("source");
            (e.src = this.options.backgroundMusic),
              (e.type = "audio/mpeg"),
              this.backgroundMusic.appendChild(e);
          }
        },
        touchSwipe: function (t, e) {
          let o,
            i,
            n,
            s,
            a,
            r,
            l = !1,
            h = !1,
            p = 0,
            c = !1;

          function d(t) {
            if (t.length < 2) return 0;
            let e = t[0].clientX - t[1].clientX,
              o = t[0].clientY - t[1].clientY;
            return Math.sqrt(e * e + o * o);
          }

          function g(t, e) {
            return {
              distanceX: t - o,
              distanceY: e - i,
            };
          }

          function u(t) {
            return t.type.includes("mouse") ? t : t.touches[0];
          }
          var m = this;

          function b(n) {
            if ("touchstart" === n.type) c = !0;
            else {
              if ("mousedown" === n.type && c) return;
              if (
                "A" === n.target.tagName ||
                "SPAN" === n.target.tagName ||
                "MARK" === n.target.tagName
              )
                return void m.trigger("disableIScroll");
            }
            m.trigger("enableIScroll");
            let a = u(n);
            (o = a.clientX),
              (i = a.clientY),
              (s = new Date().getTime()),
              (l = !0),
              (p = n.touches ? n.touches.length : 1),
              e(n, "start", null, 0, 0, p),
              t.addEventListener("mousemove", f),
              t.addEventListener("touchmove", f, {
                passive: !1,
              });
          }

          function f(t) {
            let o = u(t),
              { distanceX: i, distanceY: s } = g(o.clientX, o.clientY);
            if (((a = o.clientX), (r = o.clientY), l && "mousemove" === t.type))
              t.preventDefault(), e(t, "move", i, s, 0, 1);
            else if (t.touches && 2 === t.touches.length) {
              let o;
              if ((t.preventDefault(), "number" == typeof t.scale)) o = t.scale;
              else {
                let e = d(t.touches);
                h ? (o = e / n) : ((h = !0), (n = e), (o = 1));
              }
              h
                ? e(t, "pinch", o, null, 0, 2)
                : ((h = !0),
                  (n = d(t.touches)),
                  e(t, "pinchstart", o, null, 0, 2));
            } else
              t.touches &&
                1 === t.touches.length &&
                (m.zoom > 1 && t.preventDefault(), e(t, "move", i, s, 0, 1));
          }

          function v(t) {
            m.trigger("enableIScroll"),
              ("touchend" !== t.type && "mouseup" !== t.type) ||
                setTimeout(function () {
                  c = !1;
                }, 300);
            let o = t.changedTouches ? t.changedTouches[0] : t,
              { distanceX: i, distanceY: n } = g(o.clientX, o.clientY),
              a = new Date().getTime() - s;
            l &&
              ((l = !1),
              e(
                t,
                "end",
                i,
                n,
                a,
                t.changedTouches ? t.changedTouches.length : 1
              )),
              h && ((h = !1), e(t, "pinchend", null, 0, 0, 2)),
              w();
          }

          function k(t) {
            setTimeout(function () {
              c = !1;
            }, 300);
            let o = new Date().getTime() - s,
              { distanceX: i, distanceY: n } = g(a, r);
            l && ((l = !1), e(t, "cancel", i, n, o, 1)),
              h && ((h = !1), e(t, "pinchcancel", i, n, o, 2)),
              w();
          }

          function w() {
            t.removeEventListener("mousemove", f),
              t.removeEventListener("touchmove", f);
          }
          t.addEventListener("mousedown", b),
            t.addEventListener("touchstart", b),
            t.addEventListener("mouseup", v),
            t.addEventListener("touchend", v),
            t.addEventListener("mouseleave", k),
            t.addEventListener("touchcancel", k);
        },
        initSwipe: function () {
          var t = this;
          let e = !1,
            o = !1,
            i = !1;
          this.touchSwipe(this.book[0], function (n, s, a, r, l, h) {
            if (
              ((i = "toolSelect" == t.tool || t.options.pageDragDisabled),
              "start" == s)
            ) {
              t.zoomStart = t.zoom;
              try {
                t.currentPageInput.trigger("blur");
              } catch (n) {}
            }
            if (h > 1 && "pinch" == s) {
              let e = a;
              n.scale && (e = n.scale),
                t.zoomTo(t.zoomStart * e, 0, n),
                (o = !0);
            }
            if ("end" == s) {
              if (!t.options.doubleClickZoomDisabled)
                if (t.clickTimer) {
                  clearTimeout(t.clickTimer), delete t.clickTimer;
                  if (null !== n.target.closest(".flipbook-page-html")) {
                    var p = t.options.zoomTime;
                    t.zoom >= t.options.zoomMax
                      ? t.zoomTo(t.options.zoomMin, p, n)
                      : t.zoomTo(t.options.zoomMax, p, n);
                  }
                } else
                  t.clickTimer = setTimeout(function () {
                    delete t.clickTimer;
                  }, 300);
              Math.abs(a) < 5 && l < 200 && (e = !0);
            }
            e || o || i || t.Book.onSwipe(n, s, a, r, l, h),
              (e = !1),
              "pinchend" == s && (o = !1);
          }),
            (this.swipeEnabled = !0);
        },
        toggleMenu: function () {
          this.menuShowing
            ? ((this.menuShowing = !1),
              this.bookLayer.css("bottom", "0px"),
              this.menuBottom.fadeOut(),
              this.currentPageHolder.fadeOut(),
              jQuery(".flipbook-nav").fadeOut(),
              this.Book.onResize())
            : ((this.menuShowing = !0),
              this.bookLayer.css("bottom", this.menuBottom.height() + "px"),
              this.menuBottom.fadeIn(),
              this.currentPageHolder.fadeIn(),
              jQuery(".flipbook-nav").fadeIn(),
              this.Book.onResize());
        },
        createSVGIcon: function (t, e, i) {
          var n = o.createElement("div");
          n.innerHTML = {
            plus: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>',
            minus:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>',
            close:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>',
            next: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>',
            expand:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/></svg>',
            compress:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"/></svg>',
            thumbs:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M448 96V224H288V96H448zm0 192V416H288V288H448zM224 224H64V96H224V224zM64 288H224V416H64V288zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/></svg>',
            print:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>',
            sound:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>',
            mute: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>',
            share:
              '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">\x3c!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg>',
            facebook:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>',
            twitter:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>',
            list: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>',
            pdf: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--\x3e<path d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"/></svg>',
            tools:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>',
            pause:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>',
            play: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>',
            bookmark:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>',
            download:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>',
            search:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>',
            last: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
            linkedin:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>',
            whatsapp:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>',
            pinterest:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/></svg>',
            email:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>',
            digg: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M81.7 172.3H0v174.4h132.7V96h-51v76.3zm0 133.4H50.9v-92.3h30.8v92.3zm297.2-133.4v174.4h81.8v28.5h-81.8V416H512V172.3H378.9zm81.8 133.4h-30.8v-92.3h30.8v92.3zm-235.6 41h82.1v28.5h-82.1V416h133.3V172.3H225.1v174.4zm51.2-133.3h30.8v92.3h-30.8v-92.3zM153.3 96h51.3v51h-51.3V96zm0 76.3h51.3v174.4h-51.3V172.3z"/></svg>',
            reddit:
              '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"/></svg>',
          }[t];
          var s = n.firstChild;
          return (
            s.setAttribute("aria-hidden", "true"),
            s.classList.add("flipbook-icon", "flipbook-menu-btn", "skin-color"),
            i || s.classList.add("skin-color-bg"),
            e && s.classList.add("flipbook-icon-reverse"),
            jQuery(s)
          );
        },
        createButton: function (t) {
          var e = this.options,
            i = t.toolsMenu && e.btnTools.enabled,
            n =
              !i &&
              (("top" == t.vAlign && e.menu2Transparent) ||
                ("top" != t.vAlign && e.menuTransparent)),
            s = t.background || (n ? e.floatingBtnBackground : e.btnBackground),
            a =
              (t.backgroundHover ||
                (n ? e.floatingBtnBackgroundHover : e.btnBackgroundHover),
              t.color || (n ? e.floatingBtnColor : e.btnColor)),
            r =
              (t.colorHover || (n ? e.floatingBtnColorHover : e.btnColorHover),
              n ? e.floatingBtnTextShadow : e.btnTextShadow),
            l = t.radius || (n ? e.floatingBtnRadius : e.btnRadius),
            h = t.border || (n ? e.floatingBtnBorder : e.btnBorder),
            p = n ? e.floatingBtnMargin : e.btnMargin,
            c = e.btnPaddingV + 2,
            d = e.btnPaddingH + 2,
            g = jQuery(o.createElement("span")),
            u =
              "material" == e.icons
                ? (t.size || e.btnSize) + 8
                : t.size || e.btnSize;

          function m(t) {
            (t.style.fontSize = `${u}px`),
              (t.style.margin = `${p}px`),
              (t.style.padding = `${c}px ${d}px`),
              (t.style.borderRadius = `${l}px`),
              (t.style.boxShadow = e.btnShadow),
              (t.style.border = h),
              (t.style.color = a),
              (t.style.fill = a),
              (t.style.background = s),
              (t.style.textShadow = r),
              (t.style.width = `${u}px`),
              (t.style.height = `${u}px`),
              a && t.classList.remove("skin-color"),
              s && t.classList.remove("skin-color-bg");
          }
          i && (s = "none");
          const b = t.svg || t.name.replace("btn", "").toLowerCase();
          var f;
          (g.$icon = this.createSVGIcon(b, t.iconReverse).appendTo(g)),
            m(g.$icon[0]),
            t.svgAlt &&
              ((g.$iconAlt = this.createSVGIcon(t.svgAlt, t.iconReverse)
                .appendTo(g)
                .hide()),
              m(g.$iconAlt[0])),
            t.onclick &&
              g.bind("click", function (e) {
                t.onclick();
              });
          return (
            i
              ? ((f = this.toolsMenu),
                jQuery("<span>" + t.title + "</span>")
                  .appendTo(g)
                  .addClass("skin-color"))
              : (f =
                  "top" == t.vAlign
                    ? e.menu2Floating
                      ? this.menuTC
                      : "left" == t.hAlign
                      ? this.menuTL
                      : "right" == t.hAlign
                      ? this.menuTR
                      : this.menuTC
                    : e.menuFloating
                    ? this.menuBC
                    : "left" == t.hAlign
                    ? this.menuBL
                    : "right" == t.hAlign
                    ? this.menuBR
                    : this.menuBC),
            g
              .attr("data-name", t.name)
              .appendTo(f)
              .addClass("flipbook-menu-btn-wrapper")
              .css("order", t.order),
            i ||
              g.attr("data-tooltip", t.title).addClass("flipbook-has-tooltip"),
            g
          );
        },
        createMenu: function () {
          if (!this.menuBottom) {
            var t = this.options,
              e = t.menuFloating
                ? "flipbook-menu-floating"
                : "flipbook-menu-fixed",
              i = t.menu2Floating
                ? "flipbook-menu-floating"
                : "flipbook-menu-fixed",
              n = this;
            (this.menuBottom = jQuery(o.createElement("div"))
              .addClass("flipbook-menuBottom")
              .addClass(e)
              .appendTo(this.wrapper)
              .css({
                background: t.menuBackground,
                "box-shadow": t.menuShadow,
                margin: t.menuMargin + "px",
                padding: t.menuPadding + "px",
              })),
              t.menuTransparent ||
                t.menuBackground ||
                this.menuBottom.addClass("skin-color-bg"),
              t.hideMenu && this.menuBottom.hide(),
              (this.menuTop = jQuery(o.createElement("div"))
                .addClass("flipbook-menuTop")
                .addClass(i)
                .appendTo(this.wrapper)
                .css({
                  background: t.menu2Background,
                  "box-shadow": t.menu2Shadow,
                  margin: t.menu2Margin + "px",
                  padding: t.menu2Padding + "px",
                })),
              t.menu2Transparent ||
                t.menu2Background ||
                this.menuTop.addClass("skin-color-bg"),
              "swipe" == t.viewMode && (t.btnSound.enabled = !1),
              (this.menuBL = l(
                "flipbook-menu flipbook-menu-left",
                this.menuBottom
              )),
              (this.menuBC = l(
                "flipbook-menu flipbook-menu-center",
                this.menuBottom
              )),
              (this.menuBR = l(
                "flipbook-menu flipbook-menu-right",
                this.menuBottom
              )),
              (this.menuTL = l(
                "flipbook-menu flipbook-menu-left",
                this.menuTop
              )),
              (this.menuTC = l(
                "flipbook-menu flipbook-menu-center",
                this.menuTop
              )),
              (this.menuTR = l(
                "flipbook-menu flipbook-menu-right",
                this.menuTop
              )),
              this.options.btnTools.enabled &&
                (this.toolsMenu = jQuery(
                  '<div class="flipbook-tools flipbook-submenu skin-color skin-color-bg flipbook-font"></div>'
                )),
              this.options.btnShare.enabled &&
                (this.shareMenu = jQuery(
                  '<div class="flipbook-share flipbook-submenu skin-color skin-color-bg flipbook-font"></div>'
                )),
              t.sideNavigationButtons &&
                ((this.$arrowWrapper = jQuery(
                  '<div class="flipbook-nav"></div>'
                ).appendTo(this.bookLayer)),
                (this.btnNext = this.createSVGIcon("next")
                  .appendTo(this.$arrowWrapper)
                  .css({
                    height: t.arrowSize + "px",
                    "font-size": t.arrowSize + "px",
                    "margin-top": String(-t.arrowSize / 2) + "px",
                    "margin-right": t.arrowMargin + "px",
                  })),
                this.btnNext[0].classList.add("flipbook-right-arrow"),
                h(this.btnNext, this.nextPage.bind(this)),
                (this.btnPrev = this.createSVGIcon("next", !0)
                  .appendTo(this.$arrowWrapper)
                  .css({
                    height: t.arrowSize + "px",
                    "font-size": t.arrowSize + "px",
                    "margin-top": String(-t.arrowSize / 2) + "px",
                    "margin-left": t.arrowMargin + "px",
                  })),
                this.btnPrev[0].classList.add("flipbook-left-arrow"),
                h(this.btnPrev, this.prevPage.bind(this)),
                t.btnFirst.enabled &&
                  ((this.btnFirst = this.createSVGIcon("last", !0)
                    .appendTo(this.$arrowWrapper)
                    .css({
                      height: 0.5 * t.arrowSize + "px",
                      "font-size": 0.5 * t.arrowSize + "px",
                      "margin-top":
                        String(
                          t.arrowSize / 2 + t.arrowMargin + 2 * t.arrowPadding
                        ) + "px",
                      "margin-left": t.arrowMargin + "px",
                    })),
                  this.btnFirst[0].classList.add("flipbook-first-arrow"),
                  h(this.btnFirst, this.firstPage.bind(this))),
                t.btnLast.enabled &&
                  ((this.btnLast = this.createSVGIcon("last")
                    .appendTo(this.$arrowWrapper)
                    .css({
                      height: 0.5 * t.arrowSize + "px",
                      "font-size": 0.5 * t.arrowSize + "px",
                      "margin-top":
                        String(
                          t.arrowSize / 2 + t.arrowMargin + 2 * t.arrowPadding
                        ) + "px",
                      "margin-right": t.arrowMargin + "px",
                    })),
                  this.btnLast[0].classList.add("flipbook-last-arrow"),
                  h(this.btnLast, this.lastPage.bind(this))),
                t.menuNavigationButtons ||
                  (t.btnOrder.indexOf("btnFirst") >= 0 &&
                    t.btnOrder.splice(t.btnOrder.indexOf("btnFirst"), 1),
                  t.btnOrder.indexOf("btnPrev") >= 0 &&
                    t.btnOrder.splice(t.btnOrder.indexOf("btnPrev"), 1),
                  t.btnOrder.indexOf("btnNext") >= 0 &&
                    t.btnOrder.splice(t.btnOrder.indexOf("btnNext"), 1),
                  t.btnOrder.indexOf("btnLast") >= 0 &&
                    t.btnOrder.splice(t.btnOrder.indexOf("btnLast"), 1))),
              t.pdfMode &&
                !t.btnDownloadPdf.url &&
                (t.btnDownloadPdf.url = t.pdfUrl),
              !t.pdfTextLayer && t.btnSearch && (t.btnSearch.enabled = !1);
            for (var s = 0; s < t.btnOrder.length; s++) {
              var a = t.btnOrder[s],
                r = t[a];
              t.isMobile && r.hideOnMobile && (r.enabled = !1),
                r.enabled &&
                  ((r.name = a),
                  "currentPage" == r.name
                    ? this.createCurrentPage()
                    : "search" == r.name
                    ? ((this.$search = jQuery(
                        '<div class="flipbook-findbar"><div><input class="toolbarField" title="Find" autocapitalize="none" placeholder="' +
                          t.strings.findInDocument +
                          '..."></div><div class="flipbook-find-info skin-color"/></div>'
                      )),
                      this.menuTL.appendChild(this.$search[0]),
                      this.$search.find("input").change(function () {
                        n.toggleSearch(!0),
                          n.thumbs.$findInput.val(this.value).trigger("keyup"),
                          (this.value = "");
                      }),
                      (this.menuTL.style.flexDirection = "column"),
                      (this.menuTL.style.alignItems = "flex-start"))
                    : (this[a] = this.createButton(r).click(function (t) {
                        t.stopPropagation(),
                          t.preventDefault(),
                          n.onButtonClick(this, t);
                      })));
            }
            t.buttons &&
              t.buttons.forEach((t) => {
                n.createButton(t).index(1);
              });
          }

          function l(t, e) {
            const i = o.createElement("div");
            return (i.className = t), e[0].appendChild(i), i;
          }

          function h(e, o) {
            e
              .click(function (t) {
                if (e.disabled) return !1;
                (e.disabled = !0),
                  setTimeout(function () {
                    e.disabled = !1;
                  }, 300),
                  t.stopPropagation(),
                  t.preventDefault(),
                  o();
              })
              .css({
                width: t.arrowSize + "px",
                "border-radius": t.arrowRadius + "px",
                padding: t.arrowPadding + "px ",
                filter: "drop-shadow(" + t.arrowTextShadow + ")",
                border: t.arrowBorder,
                color: t.arrowColor,
                fill: t.arrowColor,
                background: t.arrowBackground,
                "box-sizing": "initial",
              }),
              t.arrowBackgroundHover &&
                e.hover(
                  function () {
                    this.style.background = t.arrowBackgroundHover;
                  },
                  function () {
                    this.style.background = t.arrowBackground;
                  }
                ),
              t.arrowColor && e.removeClass("skin-color"),
              t.arrowBackground && e.removeClass("skin-color-bg");
          }
        },
        onButtonClick: function (t, i) {
          var n = jQuery(t).attr("data-name"),
            s = this.options;
          switch (n) {
            case "btnFirst":
              this.firstPage();
              break;
            case "btnPrev":
              this.prevPage();
              break;
            case "btnNext":
              this.nextPage();
              break;
            case "btnLast":
              this.lastPage();
              break;
            case "btnZoomIn":
              this.zoomIn();
              break;
            case "btnZoomOut":
              this.zoomOut();
              break;
            case "btnAutoplay":
              this.autoplay || this.nextPage(), this.toggleAutoplay();
              break;
            case "btnSearch":
              this.toggleSearch();
              break;
            case "btnBookmark":
              this.toggleBookmark();
              break;
            case "btnRotateLeft":
              this.Book.rotateLeft && this.Book.rotateLeft();
              break;
            case "btnRotateRight":
              this.Book.rotateRight && this.Book.rotateRight();
              break;
            case "btnToc":
              this.toggleToc();
              break;
            case "btnThumbs":
              this.toggleThumbs();
              break;
            case "btnShare":
              this.toggleShareMenu();
              break;
            case "btnTools":
              this.toggleToolsMenu();
              break;
            case "btnNotes":
              this.toggleNotesMenu();
              break;
            case "btnDownloadPages":
              if (s.downloadMenu) this.toggleDownloadMenu();
              else {
                var a = o.createElement("a");
                (a.href = s.btnDownloadPages.url),
                  (a.download = s.btnDownloadPages.name),
                  a.dispatchEvent(new MouseEvent("click"));
              }
              break;
            case "btnPrint":
              s.printMenu ? this.togglePrintMenu() : this.togglePrintWindow();
              break;
            case "btnDownloadPdf":
              if (s.btnDownloadPdf.forceDownload) {
                var r = s.btnDownloadPdf.url,
                  l = o.createElement("a");
                l.href = r;
                var h = l.href.split("/").pop().split("#")[0].split("?")[0];
                (l.download = h),
                  o.body.appendChild(l),
                  l.click(),
                  o.body.removeChild(l);
              } else {
                var p =
                  s.btnDownloadPdf.openInNewWindow ||
                  (s.btnDownloadPdf.openInNewWindow, 1)
                    ? "_blank"
                    : "_self";
                e.open(s.btnDownloadPdf.url, p);
              }
              this.sendGAEvent({
                event: "flipbook_pdf_download",
                book_name: this.options.name,
                url: s.btnDownloadPdf.url || s.pdfUrl,
                nonInteraction: !0,
              });
              break;
            case "btnSound":
              this.toggleSound();
              break;
            case "btnExpand":
              this.toggleExpand();
              break;
            case "btnClose":
              this.lightbox.closeLightbox();
          }
        },
        handleFsChange: function () {
          this.Book &&
            this.Book.enabled &&
            ((o.fullscreenElement ||
              o.webkitFullscreenElement ||
              o.mozFullScreenElement ||
              o.msFullscreenElement) === this.fullscreenElement ||
            this.isFullscreen
              ? ((this.fullscreenActive = !0),
                this.options.onfullscreenenter &&
                  this.options.onfullscreenenter.call(this),
                o.body.classList.add("flipbook-fullscreen"))
              : ((this.fullscreenActive = !1),
                this.options.onfullscreenexit &&
                  this.options.onfullscreenexit.call(this),
                o.body.classList.remove("flipbook-fullscreen")),
            this.toggleIcon(this.btnExpand, !this.fullscreenActive));
        },
        createLogo: function () {
          var t = this.options;
          if (t.logoImg && (!t.isMobile || !t.logoHideOnMobile)) {
            var o = jQuery("<img>")
              .attr("src", t.logoImg)
              .attr("style", t.logoCSS)
              .appendTo(this.wrapper);
            "right" == t.logoAlignH && o.css("right", "0"),
              "bottom" == t.logoAlignV && o.css("bottom", "0"),
              t.logoUrl &&
                o.css("cursor", "pointer").bind("click", function (o) {
                  o.stopPropagation(),
                    o.preventDefault(),
                    e.open(t.logoUrl, t.logoUrlTarget || "_blank");
                });
          }
        },
        setLoadingProgress: function (t) {
          this.disposed ||
            (this.$fillPreloader
              ? this.setFillPreloaderProgress(t)
              : t > 0 && t < 1
              ? this.preloader.show()
              : this.preloader.hide());
        },
        setFillPreloaderProgress: function (t) {
          if (this.$fillPreloader)
            if (t > 0 && t < 1) {
              if (
                ((this.fillPreloaderProgress = this.fillPreloaderProgress || 0),
                t < this.fillPreloaderProgress)
              )
                return;
              this.fillPreloaderProgress = t;
              var e = this.$fillPreloaderImg[0];
              (e.style.clip =
                "rect(0px," + e.width * t + "px," + e.height + "px,0px)"),
                this.$fillPreloader.show();
            } else this.$fillPreloader.hide();
        },
        playFlipSound: function () {
          if (
            this.options.sound &&
            this.Book.enabled &&
            void 0 !== this.flipSound.play
          ) {
            this.flipSound.currentTime = 0;
            var t = this;
            setTimeout(function () {
              t.flipSound.play().then(
                function () {},
                function () {}
              );
            }, 70);
          }
        },
        playBgMusic: function () {
          if (
            this.options.sound &&
            this.backgroundMusic &&
            this.backgroundMusic.play
          ) {
            var t = this;
            this.backgroundMusic.play().then(
              function () {},
              function (e) {
                setTimeout(function () {
                  t.playBgMusic();
                }, 100);
              }
            );
          }
        },
        onMouseWheel: function (t) {
          if ("wheelDeltaX" in t)
            (wheelDeltaX = t.wheelDeltaX / 12),
              (wheelDeltaY = t.wheelDeltaY / 12);
          else if ("wheelDelta" in t)
            wheelDeltaX = wheelDeltaY = t.wheelDelta / 12;
          else {
            if (!("detail" in t)) return;
            wheelDeltaX = wheelDeltaY = 3 * -t.detail;
          }
          wheelDeltaX > 0 ? this.zoomIn(t) : this.zoomOut(t);
        },
        zoomTo: function (t, e, o) {
          var i, n;
          (this.zoom = t),
            void 0 === o
              ? ((i = this.wrapperW / 2), (n = this.wrapperH / 2))
              : (o.touches && o.touches[0]
                  ? ((i = o.touches[0].pageX), (n = o.touches[0].pageY))
                  : o.changedTouches && o.changedTouches[0]
                  ? ((i = o.changedTouches[0].pageX),
                    (n = o.changedTouches[0].pageY))
                  : ((i = o.pageX), (n = o.pageY)),
                (i -= this.wrapper.offset().left),
                (n -= this.wrapper.offset().top));
          const s = this.getZoomMin();
          this.zoom < s && (this.zoom = s),
            this.zoom > this.options.zoomMax &&
              (this.zoom = this.options.zoomMax),
            this.options.zoomMax2 &&
              this.zoom > this.options.zoomMax2 &&
              (this.zoom = this.options.zoomMax2),
            this.Book.zoomTo(this.zoom, e, i, n),
            this.onZoom(this.zoom);
        },
        zoomOut: function (t) {
          var e = this.zoom - 0.1 * this.options.zoomStep;
          e < 1 && this.zoom > 1 && (e = 1);
          const o = this.getZoomMin();
          if (((e = e < o ? o : e), this.zoom != e)) {
            this.zoom = e;
            var i = this.options.zoomTime;
            this.zoomTo(this.zoom, i, t);
          }
        },
        zoomIn: function (t) {
          var e = this.zoom + 0.1 * this.options.zoomStep;
          e > 1 && this.zoom < 1 && (e = 1),
            e > this.options.zoomMax && (e = this.options.zoomMax),
            this.zoom != e &&
              ((this.zoom = e),
              this.zoomTo(this.zoom, this.options.zoomTime, t));
        },
        getZoomMin: function () {
          return "scroll" == this.options.viewMode
            ? this.options.zoomMin2
            : this.options.zoomMin;
        },
        nextPage: function () {
          this.Book &&
            ((this.flippingPage = !0),
            this.options.numPages - 1 > this.Book.rightIndex &&
              (this.Book.nextPage(),
              this.options.numPages - 1 <= this.Book.rightIndex &&
                this.enableNext(!1)));
        },
        prevPage: function () {
          this.Book && ((this.flippingPage = !0), this.Book.prevPage());
        },
        firstPage: function () {
          this.goToPage(1);
        },
        lastPage: function () {
          this.goToPage(this.options.pages.length);
        },
        goToPage: function (t, e) {
          this.Book &&
            (e || (this.flippingPage = !0),
            this.options.cover || t++,
            t < 1
              ? (t = 1)
              : t > this.options.numPages &&
                !this.options.rightToLeft &&
                (t = this.options.numPages),
            this.Book.goToPage(t, e));
        },
        moveBook: function (t) {
          this.Book && this.Book.move && this.Book.move(t);
        },
        onZoom: function (t) {
          this.zoom = t;
          const e = this.getZoomMin();
          this.enableButton(this.btnZoomIn, t < this.options.zoomMax),
            this.enableButton(this.btnZoomOut, t > e),
            this.enableSwipe(t <= 1);
        },
        enableSwipe: function (t) {
          this.swipeEnabled = t;
        },
        createCurrentPage: function () {
          var t,
            e = this,
            i = this.options,
            n = "flipbook-currentPageHolder ";
          t =
            "top" == i.currentPage.vAlign
              ? "left" == i.currentPage.hAlign
                ? this.menuTL
                : "right" == i.currentPage.hAlign
                ? this.menuTR
                : this.menuTC
              : "left" == i.currentPage.hAlign
              ? this.menuBL
              : "right" == i.currentPage.hAlign
              ? this.menuBR
              : this.menuBC;
          var s =
              ("top" == i.currentPage.vAlign && i.menu2Transparent) ||
              ("top" != i.currentPage.vAlign && i.menuTransparent),
            a = s ? i.floatingBtnBackground : "",
            r = s ? i.floatingBtnColor : i.btnColor,
            l = s ? i.floatingBtnTextShadow : "",
            h = s ? i.floatingBtnRadius : i.btnRadius,
            p = jQuery("<div>").appendTo(jQuery(t));
          p.css({
            margin:
              i.currentPage.marginV + "px " + i.currentPage.marginH + "px",
            height: i.btnSize + "px",
            padding: i.btnPaddingV + "px",
          }),
            s || (n += "skin-color "),
            p.addClass(n).css({
              color: r,
              background: a,
              "text-shadow": l,
              "border-radius": h + "px",
            }),
            i.currentPage.order && p.css("order", i.currentPage.order),
            (this.currentPageHolder = p);
          var c = jQuery("<form>")
            .appendTo(p)
            .submit(function (t) {
              var o = parseInt(e.currentPageInput.val());
              return (
                e.options.rightToLeft
                  ? ((o = i.pages.length - o + 1),
                    (o -= e.options.pageNumberOffset))
                  : ((o = o > i.pages.length ? i.pages.length : o),
                    (o += e.options.pageNumberOffset)),
                e.goToPage(o),
                !1
              );
            });
          this.currentPageInput = jQuery('<input type="text">')
            .addClass("flipbook-currentPageInput")
            .css({
              margin:
                i.currentPage.marginV + "px " + i.currentPage.marginH + "px",
              color: r,
            })
            .focus(function () {
              e.currentPageInput.val("");
            })
            .blur(function () {
              e.currentPageInput.val(e.currentPageString);
            })
            .appendTo(c);
          var d = String(i.numPages).length;
          this.currentPageInput.addClass("digits-" + d).attr("maxlength", d),
            (this.currentPage = jQuery(o.createElement("div"))
              .addClass("flipbook-currentPageNumber")
              .appendTo(p)),
            s || this.currentPageInput.addClass("skin-color");
        },
        createMenuHeader: function (t, e, i) {
          var n = o.createElement("div");
          (n.className = "flipbook-menu-header skin-clor flipbook-font"),
            t[0].appendChild(n);
          var s = o.createElement("span");
          (s.textContent = e),
            (s.className = "flipbook-menu-title skin-color"),
            n.appendChild(s);
          var a = o.createElement("span");
          (a.className = "flipbook-btn-close"),
            n.appendChild(a),
            a.addEventListener("click", (t) => {
              t.stopPropagation(), t.preventDefault(), this.closeMenus();
            });
          var r = this.createSVGIcon("close", null, !0)[0];
          a.appendChild(r);
        },
        createToc: function () {
          var t = this.options.tableOfContent;
          (this.tocHolder = jQuery("<div>")
            .addClass("flipbook-tocHolder flipbook-side-menu skin-color-bg")
            .appendTo(this.wrapper)
            .css(this.options.sideMenuPosition, "0")
            .hide()),
            this.createMenuHeader(
              this.tocHolder,
              this.strings.tableOfContent,
              this.toggleToc
            ),
            (this.toc = jQuery("<div>")
              .addClass("flipbook-toc")
              .appendTo(this.tocHolder)),
            (this.tocScroller = jQuery("<div>")
              .addClass("flipbook-toc-scroller")
              .appendTo(this.toc));
          var e = this.options.pages;
          if (t && t.length > 0)
            for (var o = 0; o < t.length; o++)
              e[o] &&
                e[o].name &&
                t[o].page &&
                (t[o].pageNumberDisplay = e[t[o].page - 1].name),
                this.createTocItem(t[o]);
          else
            for (o = 0; o < e.length; o++)
              e[o].title &&
                this.createTocItem({
                  title: e[o].title,
                  page: String(o + 1),
                  pageNumberDisplay: e[o].name,
                });
          this.initColors(), (this.tocCreated = !0), this.toggleToc();
        },
        goToDest: function (t) {
          var e = this;
          e.pdfService.pdfDocument.getPageIndex(t[0]).then(function (t) {
            var o = t + 1;
            e.options.doublePage && (o = 2 * o - 1),
              (o = e.options.rightToLeft ? e.options.pages.length - o + 1 : o),
              setTimeout(function () {
                e.goToPage(o);
              }, 200);
          });
        },
        createTocItem: function (t, e, i) {
          var n = this;
          e = e || this.tocScroller;
          var s = this.options.rightToLeft,
            a = jQuery(o.createElement("a"))
              .attr("class", "flipbook-tocItem")
              .addClass("skin-color")
              .css("direction", s ? "rtl" : "ltr")
              .appendTo(e)
              .bind("click", function (e) {
                if (
                  (e.stopPropagation(),
                  e.preventDefault(),
                  n.options.tableOfContentCloseOnClick && n.toggleToc(!1),
                  !t.page && t.dest)
                )
                  "string" == typeof t.dest
                    ? n.pdfService.pdfDocument
                        .getDestination(t.dest)
                        .then(function (t) {
                          n.goToDest(t);
                        })
                    : n.goToDest(t.dest);
                else {
                  var o = Number(t.page);
                  (o = n.options.rightToLeft
                    ? n.options.pages.length - o + 1
                    : o),
                    setTimeout(function () {
                      n.goToPage(o);
                    }, 200);
                }
              });
          i || (i = 0),
            (a.level = i),
            a.css("padding", "8px 0"),
            a.css("margin-" + (s ? "right" : "left"), "10px"),
            i
              ? (a.css("margin-top", "8px"), a.css("padding-bottom", "0"))
              : (a.css("margin-right", "15px"), a.css("padding-left", "10px"));
          var r = jQuery(o.createElement("span"))
              .appendTo(a)
              .css("width", "20px")
              .css("display", "inline-block")
              .css("cursor", "auto")
              .bind("click", function (t) {
                t.stopPropagation(), t.preventDefault();
                for (var e = 0; e < a.items.length; e++) a.items[e].toggle();
                l.toggle(), h.toggle();
              }),
            l = this.createSVGIcon("next").appendTo(r).hide();
          s && (l[0].style.transform = "rotate(180deg)");
          var h = this.createSVGIcon("next").appendTo(r).hide();
          if (
            ((h[0].style.transform = "rotate(90deg)"),
            jQuery(o.createElement("span"))
              .appendTo(a)
              .addClass("title")
              .text(t.title)
              .css("width", String(150 - 10 * a.level) + "px"),
            !t.pageHidden)
          ) {
            var p = t.pageNumberDisplay;
            p &&
              p != t.title &&
              jQuery(o.createElement("span"))
                .appendTo(a)
                .width("25px")
                .css("display", "inline-block")
                .css("text-align", "right")
                .text(p);
          }
          if (t.items && t.items.length) {
            a.items = [];
            for (var c = 0; c < t.items.length; c++) {
              var d = this.createTocItem(t.items[c], a, a.level + 1);
              a.items.push(d), d.hide();
            }
            l.show();
          }
          return a;
        },
        enablePrev: function (t) {
          this.enableButton(this.btnPrev, t),
            this.enableButton(this.btnFirst, t),
            this.Book.enablePrev(t);
        },
        enableNext: function (t) {
          this.enableButton(this.btnNext, t),
            this.enableButton(this.btnLast, t),
            this.Book.enableNext(t);
        },
        enableButton: function (t, e) {
          void 0 !== t &&
            (e ? t.removeClass("disabled") : t.addClass("disabled"),
            (t.enabled = e));
        },
        resize: function () {
          var t = this.options;
          if (
            (this.updateWrapperDimensions(), this.Book && this.Book.enabled)
          ) {
            if (
              (this.menuShowing &&
                (this.bookLayer.css(
                  "bottom",
                  !t.menuOverBook && this.menuBottom
                    ? this.menuBottom.outerHeight() + "px"
                    : "0px"
                ),
                this.bookLayer.css(
                  "top",
                  !t.menu2OverBook && this.menuTop
                    ? this.menuTop.outerHeight() + "px"
                    : "0px"
                )),
              this.tocShowing ||
                this.thumbsShowing ||
                this.searchShowing ||
                this.bookmarkShowing)
            ) {
              this.bookLayer.css(
                this.options.sideMenuPosition,
                t.sideMenuOverBook ? "0px" : "250px"
              );
              let e = {
                bottom: "0px",
                top: "0px",
              };
              t.sideMenuOverMenu ||
                (e.bottom = this.menuBottom.outerHeight() + "px"),
                t.sideMenuOverMenu2 ||
                  (e.top = this.menuTop.outerHeight() + "px"),
                this.wrapper.find(".flipbook-side-menu").css(e);
            } else this.bookLayer.css(this.options.sideMenuPosition, "0px");
            this.adjustZoomLimits(),
              this.Book.onResize(),
              t.zoomReset && this.Book.zoomTo(t.zoomMin);
          }
        },
        updateWrapperDimensions: function () {
          let t = this.bookLayer[0].getBoundingClientRect();
          (this.wrapperW = t.width), (this.wrapperH = t.height);
        },
        adjustZoomLimits: function () {
          var t = this.options,
            e = this.wrapperW / this.wrapperH,
            o = this.pageW / this.pageH,
            i = 2 * o;
          "scroll" == t.viewMode
            ? (t.zoomMax =
                (((t.zoomSize * t.pageWidth) / t.pageHeight) * 2) /
                this.wrapperW)
            : t.responsiveView &&
              this.wrapperW <= t.responsiveViewTreshold &&
              e < i &&
              e < t.responsiveViewRatio
            ? (t.zoomMax = (t.zoomSize / this.wrapperH) * (e > o ? 1 : o / e))
            : (t.zoomMax = (t.zoomSize / this.wrapperH) * (e > i ? 1 : i / e)),
            (t.zoomMax = Math.max(t.zoomMax, t.zoomMin));
        },
        pdfResize: function () {
          this.Book.onZoom();
        },
        createThumbs: function () {
          this.thumbs = new FLIPBOOK.Thumbnails(this);
        },
        toggleThumbs: function (t) {
          this.thumbs || this.createThumbs(),
            void 0 !== t && (this.thumbsShowing = !t),
            this.thumbsShowing
              ? (this.thumbs.hide(), (this.thumbsShowing = !1))
              : (this.closeMenus(),
                this.thumbs.show(),
                (this.thumbsShowing = !0)),
            this.resize();
        },
        toggleToc: function (t) {
          this.tocCreated
            ? (!this.tocShowing || t
                ? (this.closeMenus(),
                  (this.tocShowing = !0),
                  this.tocHolder.show())
                : (this.tocHolder.hide(), (this.tocShowing = !1)),
              this.resize())
            : this.createToc();
        },
        toggleSearch: function (t) {
          this.thumbs || this.createThumbs(),
            void 0 !== t && (this.searchShowing = !t),
            this.searchShowing
              ? (this.thumbs.hide(), (this.searchShowing = !1), this.unmark())
              : (this.closeMenus(),
                this.thumbs.show(),
                this.thumbs.showSearch(),
                (this.searchShowing = !0)),
            this.resize();
        },
        toggleBookmark: function (t) {
          this.thumbs || this.createThumbs(),
            void 0 !== t && (this.bookmarkShowing = !t),
            this.bookmarkShowing
              ? (this.thumbs.hide(), (this.bookmarkShowing = !1))
              : (this.closeMenus(),
                this.thumbs.show(),
                this.thumbs.showBookmarks(),
                (this.bookmarkShowing = !0)),
            this.resize();
        },
        closeMenus: function () {
          this.thumbsShowing && this.toggleThumbs(),
            this.tocShowing && this.toggleToc(),
            this.searchShowing && this.toggleSearch(),
            this.bookmarkShowing && this.toggleBookmark(),
            this.printMenuShowing && this.togglePrintMenu(),
            this.dlMenuShowing && this.toggleDownloadMenu(),
            this.shareMenuShowing && this.toggleShareMenu(),
            this.toolsMenuShowing && this.toggleToolsMenu(),
            this.notesMenuShowing && this.toggleNotesMenu(),
            this.passwordMenuShowing && this.togglePasswordMenu();
        },
        toggleToolsMenu: function () {
          var t = this;
          this.toolsMenu.parent().length
            ? this.toolsMenuShowing
              ? (this.toolsMenu.hide(),
                (this.toolsMenuShowing = !1),
                this.btnTools
                  .removeClass("flipbook-btn-active")
                  .addClass("flipbook-has-tooltip"))
              : (this.closeMenus(),
                this.toolsMenu.show(),
                (this.toolsMenuShowing = !0),
                this.btnTools
                  .addClass("flipbook-btn-active")
                  .removeClass("flipbook-has-tooltip"))
            : (this.toolsMenu.appendTo(this.btnTools),
              this.initColors(),
              this.closeMenus(),
              this.toolsMenu.show(),
              this.btnTools
                .addClass("flipbook-btn-active")
                .removeClass("flipbook-has-tooltip"),
              (this.toolsMenuShowing = !0),
              this.toolsMenu[0].addEventListener("click", function (t) {
                t.stopPropagation();
              }),
              o.addEventListener("click", function (e) {
                t.toolsMenuShowing && t.toggleToolsMenu(),
                  t.shareMenuShowing && t.toggleShareMenu();
              }));
        },
        togglePrintMenu: function () {
          var t = this;
          if (this.printMenu)
            this.printMenuShowing
              ? (this.printMenu.hide(), (this.printMenuShowing = !1))
              : (this.closeMenus(),
                this.printMenu.show(),
                (this.printMenuShowing = !0),
                this.updateCurrentPage());
          else {
            this.printMenu = jQuery(
              '<div class="flipbook-sub-menu flipbook-font">'
            ).appendTo(this.wrapper);
            var e = jQuery('<div class="flipbook-sub-menu-center">').appendTo(
                this.printMenu
              ),
              o = jQuery(
                '<div class="flipbook-sub-menu-content skin-color-bg">'
              ).appendTo(e);
            this.createMenuHeader(o, this.strings.print, this.togglePrintMenu),
              jQuery(
                '<a><div class="c-p skin-color flipbook-btn">' +
                  this.strings.printCurrentPage +
                  "</div></a>"
              )
                .appendTo(o)
                .bind("click", function (e) {
                  t.printPage(t.cPage[0], this);
                }),
              jQuery(
                '<a><div class="c-l-p skin-color flipbook-btn">' +
                  this.strings.printLeftPage +
                  "</div></a>"
              )
                .appendTo(this.printMenu)
                .appendTo(o)
                .bind("click", function (e) {
                  t.printPage(t.cPage[0], this);
                }),
              jQuery(
                '<a><div class="c-r-p skin-color flipbook-btn">' +
                  this.strings.printRightPage +
                  "</div></a>"
              )
                .appendTo(this.printMenu)
                .appendTo(o)
                .bind("click", function (e) {
                  t.printPage(t.cPage[1], this);
                }),
              jQuery(
                '<a><div class="skin-color flipbook-btn">' +
                  this.strings.printAllPages +
                  "</div></a>"
              )
                .appendTo(o)
                .bind("click", function (e) {
                  t.togglePrintWindow();
                }),
              this.closeMenus(),
              (this.printMenuShowing = !0),
              this.initColors(),
              this.updateCurrentPage();
          }
        },
        toggleDownloadMenu: function () {
          var t = this;
          if (this.dlMenu)
            this.dlMenuShowing
              ? (this.dlMenu.hide(), (this.dlMenuShowing = !1))
              : (this.dlMenu.show(),
                this.closeMenus(),
                (this.dlMenuShowing = !0),
                this.updateCurrentPage());
          else {
            this.dlMenu = jQuery(
              '<div class="flipbook-sub-menu flipbook-font">'
            ).appendTo(this.wrapper);
            var e = jQuery('<div class="flipbook-sub-menu-center">').appendTo(
                this.dlMenu
              ),
              i = jQuery(
                '<div class="flipbook-sub-menu-content skin-color-bg">'
              ).appendTo(e);
            this.createMenuHeader(
              i,
              this.strings.download,
              this.toggleDownloadMenu
            ),
              jQuery(
                '<a><div class="c-p skin-color flipbook-btn">' +
                  this.strings.downloadCurrentPage +
                  "</div></a>"
              )
                .appendTo(i)
                .bind("click", function (e) {
                  t.downloadPage(t.cPage[0], this);
                }),
              jQuery(
                '<a><div class="c-l-p skin-color flipbook-btn">' +
                  this.strings.downloadLeftPage +
                  "</div></a>"
              )
                .appendTo(i)
                .bind("click", function (e) {
                  t.downloadPage(t.cPage[0], this);
                }),
              jQuery(
                '<a><div class="c-r-p skin-color flipbook-btn">' +
                  this.strings.downloadRightPage +
                  "</div></a>"
              )
                .appendTo(i)
                .bind("click", function (e) {
                  t.downloadPage(t.cPage[1], this);
                }),
              jQuery(
                '<a><div class="skin-color flipbook-btn">' +
                  this.strings.downloadAllPages +
                  "</div></a>"
              )
                .appendTo(i)
                .bind("click", function (e) {
                  var i = o.createElement("a");
                  i.href = t.options.btnDownloadPages.url;
                  var n = i.href.split("/").pop().split("#")[0].split("?")[0];
                  (i.download = n), i.dispatchEvent(new MouseEvent("click"));
                }),
              this.closeMenus(),
              (this.dlMenuShowing = !0),
              this.initColors(),
              this.updateCurrentPage();
          }
        },
        toggleShareMenu: function () {
          var t = this;
          if (this.shareMenu.parent().length)
            this.shareMenuShowing
              ? (this.shareMenu.hide(),
                (this.shareMenuShowing = !1),
                this.btnShare
                  .removeClass("flipbook-btn-active")
                  .addClass("flipbook-has-tooltip"))
              : (this.closeMenus(),
                this.shareMenu.show(),
                (this.shareMenuShowing = !0),
                this.btnShare
                  .addClass("flipbook-btn-active")
                  .removeClass("flipbook-has-tooltip"));
          else {
            this.shareMenu.appendTo(this.btnShare),
              this.initColors(),
              this.closeMenus(),
              this.shareMenu.show(),
              this.shareMenu
                .addClass("flipbook-btn-active")
                .removeClass("flipbook-has-tooltip"),
              (this.shareMenuShowing = !0),
              this.shareMenu[0].addEventListener("click", function (t) {
                t.stopPropagation();
              }),
              o.addEventListener("click", function (e) {
                t.toolsMenuShowing && t.toggleToolsMenu(),
                  t.shareMenuShowing && t.toggleShareMenu();
              });
            var i = this.options,
              n = ["facebook", "twitter"];
            n.push(
              "pinterest",
              "linkedin",
              "whatsapp",
              "digg",
              "reddit",
              "email"
            );
            var s = e.screen.width / 2 - 300,
              a = e.screen.height / 2 - 300;
            n.forEach(function (o) {
              if (i[o].enabled) {
                var n = jQuery(
                  '<span class="flipbook-menu-btn-wrapper" data-network="' +
                    o +
                    '"></span>'
                );
                t.createSVGIcon(o).appendTo(n),
                  n
                    .attr("data-tooltip", i[o].title)
                    .addClass("flipbook-has-tooltip"),
                  n.appendTo(t.shareMenu).bind("click", function (t) {
                    t.preventDefault(), t.stopPropagation();
                    var o,
                      n = this.dataset.network,
                      r = encodeURIComponent(
                        i.shareTitle ||
                          i[n].description ||
                          "Check out this flipbook"
                      ),
                      l = encodeURIComponent(i.shareUrl || e.location.href),
                      h = encodeURIComponent(i.shareImage || "");
                    switch (n) {
                      case "facebook":
                        o =
                          "https://www.facebook.com/sharer.php?u=" +
                          l +
                          "&t=" +
                          r;
                        break;
                      case "twitter":
                        o =
                          "https://twitter.com/intent/tweet?text=" +
                          r +
                          "&url=" +
                          l;
                        break;
                      case "linkedin":
                        o =
                          "https://www.linkedin.com/shareArticle?mini=true&url=" +
                          l +
                          "&title=" +
                          r;
                        break;
                      case "pinterest":
                        o =
                          "https://www.pinterest.com/pin/create/button/?url=" +
                          l +
                          "&media=" +
                          h +
                          "&description=" +
                          r;
                        break;
                      case "email":
                        o = "mailto:?subject=" + r + "&body=" + l;
                        break;
                      case "digg":
                        o = "http://digg.com/submit?url=" + l + "&title=" + r;
                        break;
                      case "reddit":
                        o = "http://reddit.com/submit?url=" + l + "&title=" + r;
                        break;
                      case "whatsapp":
                        o = i.isMobile
                          ? "whatsapp://send?text=" + r + "%20" + l
                          : "https://wa.me?text=" + r + "%20" + l;
                    }
                    e.open(
                      o,
                      "Share",
                      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=600, height=600, top=" +
                        a +
                        ", left=" +
                        s
                    );
                  });
              }
            });
          }
        },
        toggleNotesMenu: function () {
          if (this.notesMenu)
            this.notesMenuShowing
              ? (this.notesMenu.hide(), (this.notesMenuShowing = !1))
              : (this.notesMenu.show(),
                this.closeMenus(),
                (this.notesMenuShowing = !0));
          else {
            this.notesMenu = jQuery(o.createElement("div"))
              .appendTo(this.wrapper)
              .addClass("flipbook-sub-menu flipbook-font");
            var t = jQuery('<div class="flipbook-sub-menu-center">').appendTo(
                this.notesMenu
              ),
              e = jQuery(
                '<div class="flipbook-sub-menu-content skin-color-bg">'
              ).appendTo(t);
            this.createMenuHeader(
              e,
              this.options.strings.notes,
              this.toggleNotesMenu
            ),
              this.closeMenus(),
              (this.notesMenuShowing = !0),
              this.initColors();
            const i = this;
            this.options.noteTypes.forEach(function (t) {
              const n = o.createElement("div");
              n.innerHTML =
                "<span>" +
                t.title +
                '</span><span aria-hidden="true" class="flipbook-icon-comment flipbook-icon flipbook-menu-btn" style="font-size: 14px; margin: 2px; padding: 12px; opacity: var(--flipbook-link-opacity);color:' +
                t.color +
                '"></span>';
              const s = o.createElement("input");
              (s.type = "checkbox"),
                (s.dataset.id = t.id),
                (s.checked = t.enabled),
                (s.onchange = function () {
                  (t.enabled = this.checked), i.updateNoteSettings(t);
                }),
                n.appendChild(s),
                e[0].appendChild(n);
            });
          }
        },
        updateNoteSettings: function (t) {
          this.options.noteTypes.forEach(function (e) {
            e.id == t.id && (e.enabled = t.enabled);
          }),
            this.noteService.updateNoteVisibility();
        },
        bookmarkPage: function (t) {
          var e = this.getBookmarkedPages();
          e.indexOf(String(t)) < 0 && e.push(t),
            this.setBookmarkedPages(e),
            this.thumbs.showBookmarkedThumbs(),
            this.bookmarkShowing || this.toggleBookmark();
        },
        removeBookmark: function (t) {
          var e = this.getBookmarkedPages();
          e.indexOf(String(t)) > -1 && e.splice(e.indexOf(String(t)), 1),
            this.setBookmarkedPages(e),
            this.thumbs.showBookmarkedThumbs(),
            this.bookmarkShowing || this.toggleBookmark();
        },
        isBookmarked: function (t) {
          return this.getBookmarkedPages().indexOf(String(t)) > 0;
        },
        getBookmarkedPages: function () {
          var t = localStorage.getItem(
            this.options.name + "_flipbook_bookmarks"
          );
          return t ? t.split(";") : [];
        },
        setBookmarkedPages: function (t) {
          localStorage.setItem(
            this.options.name + "_flipbook_bookmarks",
            t.join(";")
          );
        },
        printPage: function (t, e) {
          var i,
            n = this.options.pages[t],
            s = this.options.pageTextureSize,
            a = this;
          if (n)
            if (n.print) i = n.print;
            else if (n.images && n.images[s]) {
              const t = o.createElement("canvas"),
                e = t.getContext("2d"),
                a = n.images[s];
              (t.width = a.width),
                (t.height = a.height),
                e.drawImage(a, 0, 0, a.width, a.height),
                (i = t.toDataURL()),
                (t.width = t.height = 1),
                e.clearRect(0, 0, 1, 1);
            } else n.src && (i = n.src);
          if (i) this.togglePrintWindow(i);
          else {
            const e = this.options.cover ? t : t + 1;
            this.loadPage(e, s, function () {
              a.printPage(t);
            });
          }
        },
        downloadPage: function (t) {
          var e,
            i = this.options.pages[t],
            n = this.options.pageTextureSize;
          if (i && i.download) e = i.download;
          else if (i && i.src) e = i.src;
          else if (i && i.images && i.images[n]) {
            const t = o.createElement("canvas"),
              s = t.getContext("2d"),
              a = i.images[n];
            (t.width = a.width),
              (t.height = a.height),
              s.drawImage(a, 0, 0, a.width, a.height),
              (e = t.toDataURL()),
              (t.width = t.height = 1),
              s.clearRect(0, 0, 1, 1);
          }
          if (e) {
            var s = o.createElement("a");
            (s.href = e),
              (s.download = "page" + String(t + 1)),
              o.body.appendChild(s),
              s.click(),
              o.body.removeChild(s);
          } else {
            var a = this;
            const e = this.options.cover ? t : t + 1;
            this.loadPage(e, this.options.pageTextureSize, function () {
              a.downloadPage(t);
            });
          }
        },
        printFile: function (t) {
          var e = o.createElement("iframe");
          (e.style.display = "none"),
            (e.src = t),
            o.body.appendChild(e),
            (e.contentWindow.onload = function () {
              var t = this;
              setTimeout(function () {
                t.print();
              }, 100);
            });
        },
        togglePrintWindow: function (t) {
          var o = this,
            i = "";
          if (t) i = t;
          else {
            if (o.options.printPdfUrl)
              return void o.printFile(o.options.printPdfUrl);
            if (o.options.pdfUrl) return void o.printFile(o.options.pdfUrl);
          }
          !(function () {
            var n = e.open("about:blank", "_new");
            if ((n.document.open(), t)) i = '<img src="' + t + '"/>\n';
            else
              for (var s = 0; s < o.options.pages.length; s++)
                o.options.pages[s].src &&
                  (i +=
                    '<img src="' + o.options.pages[s].src.toString() + '"/>\n');
            var a = (function (t) {
              return (
                "<html>\n<head>\n<title>Temporary Printing Window</title>\n<script>\nfunction step1() {\n  setTimeout('step2()', 10);\n}\nfunction step2() {\n  window.addEventListener('afterprint', function(){\n       debugger;\n       window.close();\n  });\n  window.print();\n}\n</script>\n<style>img {display:block;max-width:100%;page-break-after: always;}@media print header{display: none;}</style>\n</head>\n<body onLoad='step1()'>\n" +
                t +
                "</body>\n</html>\n"
              );
            })(i);
            n.document.write(a), n.document.close();
          })();
        },
        thumbsVertical: function () {
          this.thumbsCreated;
        },
        toggleExpand: function () {
          const t = this.fullscreenElement,
            e = (e) => {
              console.error("Fullscreen API error:", e),
                t.classList.toggle("flipbook-browser-fullscreen"),
                o.body.classList.toggle("flipbook-overflow-hidden"),
                (this.fullscreenActive = !this.fullscreenActive),
                this.toggleIcon(this.btnExpand, !this.fullscreenActive);
            };
          try {
            o.fullscreenElement ||
            o.mozFullScreenElement ||
            o.webkitFullscreenElement ||
            o.msFullscreenElement
              ? (() => {
                  const t = [
                    "exitFullscreen",
                    "mozCancelFullScreen",
                    "webkitExitFullscreen",
                    "msExitFullscreen",
                  ];
                  for (const i of t)
                    if (o[i])
                      try {
                        return void o[i]();
                      } catch (t) {
                        return void e(t);
                      }
                  e(
                    new Error(
                      "Exiting fullscreen API is not supported in this document."
                    )
                  );
                })()
              : ((t) => {
                  const o = [
                    "requestFullscreen",
                    "mozRequestFullScreen",
                    "webkitRequestFullscreen",
                    "msRequestFullscreen",
                  ];
                  for (const i of o)
                    if (t[i])
                      try {
                        return void t[i]();
                      } catch (t) {
                        return void e(t);
                      }
                  e(
                    new Error(
                      "Fullscreen API is not supported on this element."
                    )
                  );
                })(t);
          } catch (t) {
            e(t);
          }
          this.toolsMenuShowing && this.toggleToolsMenu();
        },
        expand: function () {},
        toggleAutoplay: function (t) {
          var e = this;
          (this.autoplay = t || !this.autoplay),
            this.autoplay
              ? (this.autoplayTimer = setInterval(function () {
                  if (e.autoplay) {
                    var t = e.options.autoplayStartPage || 1;
                    e.options.rightToLeft
                      ? e.Book.prevEnabled
                        ? e.prevPage()
                        : e.options.autoplayLoop
                        ? e.goToPage(e.options.pages.length - t + 1)
                        : e.toggleAutoplay(!1)
                      : e.Book.nextEnabled
                      ? e.nextPage()
                      : e.options.autoplayLoop
                      ? e.goToPage(t)
                      : e.toggleAutoplay(!1);
                  }
                }, e.options.autoplayInterval))
              : clearInterval(e.autoplayTimer),
            this.toggleIcon(this.btnAutoplay, !this.autoplay);
        },
        initEasing: function () {
          e.jQuery.extend(e.jQuery.easing, {
            def: "easeOutQuad",
            swing: function (t, e, o, i, n) {
              return jQuery.easing[jQuery.easing.def](t, e, o, i, n);
            },
            easeInQuad: function (t, e, o, i, n) {
              return i * (e /= n) * e + o;
            },
            easeOutQuad: function (t, e, o, i, n) {
              return -i * (e /= n) * (e - 2) + o;
            },
            easeInOutQuad: function (t, e, o, i, n) {
              return (e /= n / 2) < 1
                ? (i / 2) * e * e + o
                : (-i / 2) * (--e * (e - 2) - 1) + o;
            },
            easeInCubic: function (t, e, o, i, n) {
              return i * (e /= n) * e * e + o;
            },
            easeOutCubic: function (t, e, o, i, n) {
              return i * ((e = e / n - 1) * e * e + 1) + o;
            },
            easeInOutCubic: function (t, e, o, i, n) {
              return (e /= n / 2) < 1
                ? (i / 2) * e * e * e + o
                : (i / 2) * ((e -= 2) * e * e + 2) + o;
            },
            easeInQuart: function (t, e, o, i, n) {
              return i * (e /= n) * e * e * e + o;
            },
            easeOutQuart: function (t, e, o, i, n) {
              return -i * ((e = e / n - 1) * e * e * e - 1) + o;
            },
            easeInOutQuart: function (t, e, o, i, n) {
              return (e /= n / 2) < 1
                ? (i / 2) * e * e * e * e + o
                : (-i / 2) * ((e -= 2) * e * e * e - 2) + o;
            },
            easeInQuint: function (t, e, o, i, n) {
              return i * (e /= n) * e * e * e * e + o;
            },
            easeOutQuint: function (t, e, o, i, n) {
              return i * ((e = e / n - 1) * e * e * e * e + 1) + o;
            },
            easeInOutQuint: function (t, e, o, i, n) {
              return (e /= n / 2) < 1
                ? (i / 2) * e * e * e * e * e + o
                : (i / 2) * ((e -= 2) * e * e * e * e + 2) + o;
            },
            easeInSine: function (t, e, o, i, n) {
              return -i * Math.cos((e / n) * (Math.PI / 2)) + i + o;
            },
            easeOutSine: function (t, e, o, i, n) {
              return i * Math.sin((e / n) * (Math.PI / 2)) + o;
            },
            easeInOutSine: function (t, e, o, i, n) {
              return (-i / 2) * (Math.cos((Math.PI * e) / n) - 1) + o;
            },
            easeInExpo: function (t, e, o, i, n) {
              return 0 == e ? o : i * Math.pow(2, 10 * (e / n - 1)) + o;
            },
            easeOutExpo: function (t, e, o, i, n) {
              return e == n ? o + i : i * (1 - Math.pow(2, (-10 * e) / n)) + o;
            },
            easeInOutExpo: function (t, e, o, i, n) {
              return 0 == e
                ? o
                : e == n
                ? o + i
                : (e /= n / 2) < 1
                ? (i / 2) * Math.pow(2, 10 * (e - 1)) + o
                : (i / 2) * (2 - Math.pow(2, -10 * --e)) + o;
            },
            easeInCirc: function (t, e, o, i, n) {
              return -i * (Math.sqrt(1 - (e /= n) * e) - 1) + o;
            },
            easeOutCirc: function (t, e, o, i, n) {
              return i * Math.sqrt(1 - (e = e / n - 1) * e) + o;
            },
            easeInOutCirc: function (t, e, o, i, n) {
              return (e /= n / 2) < 1
                ? (-i / 2) * (Math.sqrt(1 - e * e) - 1) + o
                : (i / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + o;
            },
            easeInElastic: function (t, e, o, i, n) {
              var s = 1.70158,
                a = 0,
                r = i;
              return 0 == e
                ? o
                : 1 == (e /= n)
                ? o + i
                : (a || (a = 0.3 * n),
                  r < Math.abs(i)
                    ? ((r = i), (s = a / 4))
                    : (s = (a / (2 * Math.PI)) * Math.asin(i / r)),
                  -r *
                    Math.pow(2, 10 * (e -= 1)) *
                    Math.sin(((e * n - s) * (2 * Math.PI)) / a) +
                    o);
            },
            easeOutElastic: function (t, e, o, i, n) {
              var s = 1.70158,
                a = 0,
                r = i;
              return 0 == e
                ? o
                : 1 == (e /= n)
                ? o + i
                : (a || (a = 0.3 * n),
                  r < Math.abs(i)
                    ? ((r = i), (s = a / 4))
                    : (s = (a / (2 * Math.PI)) * Math.asin(i / r)),
                  r *
                    Math.pow(2, -10 * e) *
                    Math.sin(((e * n - s) * (2 * Math.PI)) / a) +
                    i +
                    o);
            },
            easeInOutElastic: function (t, e, o, i, n) {
              var s = 1.70158,
                a = 0,
                r = i;
              return 0 == e
                ? o
                : 2 == (e /= n / 2)
                ? o + i
                : (a || (a = n * (0.3 * 1.5)),
                  r < Math.abs(i)
                    ? ((r = i), (s = a / 4))
                    : (s = (a / (2 * Math.PI)) * Math.asin(i / r)),
                  e < 1
                    ? r *
                        Math.pow(2, 10 * (e -= 1)) *
                        Math.sin(((e * n - s) * (2 * Math.PI)) / a) *
                        -0.5 +
                      o
                    : r *
                        Math.pow(2, -10 * (e -= 1)) *
                        Math.sin(((e * n - s) * (2 * Math.PI)) / a) *
                        0.5 +
                      i +
                      o);
            },
            easeInBack: function (t, e, o, n, s, a) {
              return (
                a == i && (a = 1.70158),
                n * (e /= s) * e * ((a + 1) * e - a) + o
              );
            },
            easeOutBack: function (t, e, o, n, s, a) {
              return (
                a == i && (a = 1.70158),
                n * ((e = e / s - 1) * e * ((a + 1) * e + a) + 1) + o
              );
            },
            easeInOutBack: function (t, e, o, n, s, a) {
              return (
                a == i && (a = 1.70158),
                (e /= s / 2) < 1
                  ? (n / 2) * (e * e * ((1 + (a *= 1.525)) * e - a)) + o
                  : (n / 2) *
                      ((e -= 2) * e * ((1 + (a *= 1.525)) * e + a) + 2) +
                    o
              );
            },
            easeInBounce: function (t, e, o, i, n) {
              return i - jQuery.easing.easeOutBounce(t, n - e, 0, i, n) + o;
            },
            easeOutBounce: function (t, e, o, i, n) {
              return (e /= n) < 1 / 2.75
                ? i * (7.5625 * e * e) + o
                : e < 2 / 2.75
                ? i * (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) + o
                : e < 2.5 / 2.75
                ? i * (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) + o
                : i * (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375) + o;
            },
            easeInOutBounce: function (t, e, o, i, n) {
              return e < n / 2
                ? 0.5 * jQuery.easing.easeInBounce(t, 2 * e, 0, i, n) + o
                : 0.5 * jQuery.easing.easeOutBounce(t, 2 * e - n, 0, i, n) +
                    0.5 * i +
                    o;
            },
          });
        },
      }),
      (FLIPBOOK.Book = function () {}),
      (FLIPBOOK.Book.prototype = {
        rightIndex: 0,
        goToPage: function () {},
        getRightIndex: function () {},
        canFlipNext: function () {
          return (
            this.flippedright > 0 &&
            (!(
              1 != this.view ||
              !this.isFocusedLeft ||
              !this.isFocusedLeft()
            ) ||
              !(
                1 == this.flippedright &&
                !this.options.rightToLeft &&
                !this.options.backCover
              ))
          );
        },
        canFlipPrev: function () {
          return (
            this.flippedleft > 0 &&
            (!(
              1 != this.view ||
              !this.isFocusedRight ||
              !this.isFocusedRight()
            ) ||
              !(
                1 == this.flippedleft &&
                this.options.rightToLeft &&
                !this.options.backCover
              ))
          );
        },
        getCurrentPageNumber: function () {
          var t =
            this.rightIndex % 2 == 1 ? this.rightIndex + 1 : this.rightIndex;
          return this.options.rightToLeft
            ? ((t = this.options.pages.length - t),
              this.isFocusedRight() ? t : t + 1)
            : this.isFocusedLeft()
            ? t
            : t + 1;
        },
        startPageItems: function (t) {
          t.querySelectorAll(".flipbook-page-item").forEach(function (t) {
            if ("VIDEO" == t.nodeName || "AUDIO" == t.nodeName) {
              const e = t.getAttribute("data-url");
              t.querySelector("source").setAttribute("src", e),
                t.load(),
                (t.style.visibility = "hidden"),
                (t.autoplay || t.controls) &&
                  (t.readyState < 4
                    ? (t.oncanplay = function () {
                        this.currentTime == this.duration && this.load(),
                          this.autoplay && this.play(),
                          (t.style.visibility = "visible");
                      })
                    : (t.currentTime == t.duration && t.load(),
                      t.autoplay && t.play(),
                      (t.style.visibility = "visible")));
            }
          });
        },
      }),
      (FLIPBOOK.Notes = function (t) {
        const e = this;
        (this.main = t),
          (this.notes = Object.values(t.options.notes || [])),
          (this.textSelectionRect = o.createElement("span")),
          (this.textSelectionRect.className = "flipbook-add-note-rect hover");
        const i = o.createElement("span");
        (i.className = "add-note-btn"),
          (i.innerText = t.options.strings.addNote),
          (i.onclick = function () {
            e.hideButton(), e.createNote();
          }),
          (i.onmousedown = function () {}),
          (this.noteButton = i),
          this.textSelectionRect.appendChild(i),
          this.hideButton(),
          (this.notePopup = o.createElement("div")),
          (this.notePopup.className = "flipbook-note-display"),
          (this.notePopup.innerHTML =
            '<div class="note-content"><textarea role="textbox" maxlength="500" placeholder="' +
            t.options.strings.typeInYourNote +
            '" tabindex="0" class="note-article"></textarea></div> <div  aria-hidden="true" class="note-footer"> <span title="Delete Note" class="icon icon-trash-can note-button note-delete-button"><svg version="1.1" viewBox="0 0 24 24" class="svg-icon svg-fill" focusable="false"><path pid="0" d="M15.976 17.862c0 .607-.414 1.138-.885 1.138H8.893c-.47 0-.869-.513-.869-1.12L8.002 8H16l-.023 9.862zM20 6h-5V4.466C15 3.66 14.853 3 14.013 3h-3.858C9.315 3 9 3.659 9 4.466V6H4v2h2v10c0 1.843 1.153 3 2.893 3h6.198C16.84 21 18 19.852 18 18V8h2V6z"></path><path pid="1" d="M13 18h1V9h-1zM10 18h1V9h-1z"></path></svg></span></div>'),
          (this.notePopup.onmouseup = function (t) {
            t.stopPropagation();
          }),
          (this.noteDelete =
            this.notePopup.getElementsByClassName("note-delete-button")[0]),
          (this.noteDelete.onclick = function () {
            e.deleteNote();
          }),
          (this.noteInput = this.notePopup.querySelectorAll("textarea")[0]),
          (this.noteInput.onchange = function () {
            const t = this.dataset.note,
              o = this.value;
            (e.getNoteById(t).text = o),
              e.main.trigger("r3d-update-note", {
                note: e.getNoteById(t),
              });
          }),
          this.updateNoteVisibility();
      }),
      (FLIPBOOK.Notes.prototype = {
        initPageNotes: function (t) {
          const e = this;
          this.notes.forEach(function (o) {
            o.page == t.index + 1 && e.addPageNote(o, t);
          }),
            this.addPageNoteListeners(t);
        },
        getNodeColor: function (t) {
          let e = "green";
          return (
            this.main.options.noteTypes.forEach(function (o) {
              o.id == t.type && (e = o.color);
            }),
            e
          );
        },
        updateNoteVisibility: function () {
          let t = o.documentElement;
          this.main.options.noteTypes.forEach(function (e) {
            t.style.setProperty(
              `--note-${e.id}-opacity`,
              e.enabled ? "1" : "0"
            ),
              t.style.setProperty(
                `--note-${e.id}-pointer-events`,
                e.enabled ? "auto" : "none"
              );
          });
        },
        addPageNote: function (t) {
          const e = t.page,
            o = this.main.options.pages[e - 1],
            i = this.getNodeColor(t) || "yellow";
          if (t.selectedText && o.htmlContentInitialized) {
            t.id || (t.id = Date.now() + Math.floor(1e3 * Math.random()));
            const n = jQuery(o.htmlContent).find(".textLayer"),
              s = `flipbook-page-note \n                                                     note-id-${t.id} \n                                                     note-page-${e} \n                                                     note-type-${t.type} \n                                                     mark-${i} \n                                                     flipbook-note-${t.id}`;
            n.mark(t.selectedText, {
              acrossElements: !0,
              separateWordSearch: !1,
              className: "mark-note " + s,
            });
            const a = this;
            n.find(`.note-id-${t.id}`).each(function (e, i) {
              (i.dataset.note = t.id),
                (i.onclick = function () {
                  a.showNote(this, o, this.dataset.note), a.hideButton();
                }),
                (i.style.opacity = "var(--note-" + t.type + "-opacity)"),
                (i.style.pointerEvents =
                  "var(--note-" + t.type + "-pointer-events)");
            });
          }
        },
        showButton: function () {
          this.noteButton.style.display = "block";
        },
        hideButton: function () {
          this.noteButton.style.display = "none";
        },
        showNote(t, e, o) {
          const i = e.htmlContent.getBoundingClientRect(),
            n = t.getBoundingClientRect(),
            s = this.getNoteById(o);
          jQuery(e.htmlContent)[0].appendChild(this.notePopup);
          const a = this.main,
            r = (a.Book.sc * a.wrapperH) / 1e3,
            l = (n.y / a.zoom - i.y / a.zoom) / r;
          (this.notePopup.style.top = l < 150 ? l + 40 + "px" : l - 140 + "px"),
            (this.notePopup.style.left =
              (n.x / a.zoom + (0.5 * n.width) / a.zoom - i.x / a.zoom) / r +
              "px"),
            (this.noteInput.value = s.text || ""),
            (this.noteInput.dataset.note = s.id),
            (this.activeNote = s),
            s.readonly ? this.disableNoteEdit() : this.enableNoteEdit();
        },
        enableNoteEdit: function () {
          (this.noteDelete.style.display = "block"),
            (this.noteInput.readOnly = !1);
        },
        disableNoteEdit: function () {
          (this.noteDelete.style.display = "none"),
            (this.noteInput.readOnly = !0);
        },
        hideNote: function () {
          this.notePopup.parentNode &&
            this.notePopup.parentNode.removeChild(this.notePopup),
            (this.activeNote = null);
        },
        createNote: function () {
          this.textSelectionRect.appendChild(this.notePopup),
            (this.notePopup.style.left = "50%"),
            this.textSelectionRect.offsetTop < 150
              ? (this.notePopup.style.top = "40px")
              : (this.notePopup.style.top = "-140px"),
            (this.noteInput.value = ""),
            this.noteInput.focus();
          const t = {
            selectedText: this.selectedTextString,
            page: this.selectedTextPageNumber,
            type: 1,
          };
          this.notes.push(t),
            this.addPageNote(t),
            (this.noteInput.dataset.note = t.id),
            this.addPageNoteListeners(this.main.options.pages[t.page - 1]),
            (this.activeNote = t),
            this.enableNoteEdit(),
            this.main.trigger("r3d-update-note", {
              note: t,
            });
        },
        deleteNote: function () {
          const t = this.main.options.pages[this.activeNote.page - 1];
          jQuery(t.htmlContent)
            .find(".textLayer")
            .unmark({
              className: `flipbook-note-${this.activeNote.id}`,
            });
          const e = this.notes.indexOf(this.activeNote);
          e > -1 && this.notes.splice(e, 1),
            this.hideNote(),
            this.main.trigger("r3d-delete-note", {
              note: this.activeNote,
            });
        },
        getNoteById: function (t) {
          let e = null;
          return (
            this.notes.forEach(function (o) {
              Number(o.id) == Number(t) && (e = o);
            }),
            e
          );
        },
        removeTextRect: function () {
          this.textSelectionRect.parentNode &&
            this.textSelectionRect.parentNode.removeChild(
              this.textSelectionRect
            );
        },
        addPageNoteListeners: function (t) {
          const o = this;
          t.textLayerDiv &&
            !t.notesInitialized &&
            (t.textLayerDiv.addEventListener("mouseup", function (t) {
              if (!t.target.classList.contains("add-note-btn"))
                if (
                  (o.hideNote(),
                  o.showButton(),
                  (o.selectedText = e.getSelection()),
                  o.selectedText.toString())
                ) {
                  (o.selectedTextString = o.selectedText.toString()),
                    (o.selectedTextPageNumber = Number(
                      this.dataset.pageNumber
                    )),
                    (o.selectedTextRange = o.selectedText.getRangeAt(0));
                  const t = o.selectedTextRange.getBoundingClientRect(),
                    e = this.getBoundingClientRect(),
                    i = o.main;
                  let n = (i.Book.sc * i.wrapperH) / 1e3;
                  (o.textSelectionRect.style.top =
                    (t.y / i.zoom - e.y / i.zoom) / n + "px"),
                    (o.textSelectionRect.style.left =
                      (t.x / i.zoom - e.x / i.zoom) / n + "px"),
                    (o.textSelectionRect.style.width =
                      t.width / i.zoom / n + "px"),
                    (o.textSelectionRect.style.height =
                      t.height / i.zoom / n + "px"),
                    this.appendChild(o.textSelectionRect);
                } else o.removeTextRect();
            }),
            t.textLayerDiv.addEventListener("mousemove", function (t) {
              if (o.selectedTextRange && o.selectedText.toString()) {
                const e = o.textSelectionRect.getBoundingClientRect(),
                  i = o.textSelectionRect.firstChild.getBoundingClientRect();
                t.clientX >= e.left &&
                t.clientX <= e.right &&
                t.clientY >= i.top &&
                t.clientY <= e.bottom
                  ? o.showButton()
                  : o.hideButton();
              }
            }),
            (t.notesInitialized = !0));
        },
      }),
      (FLIPBOOK.Tooltip = function () {
        (this.domElement = o.createElement("div")),
          (this.domElement.style.display = "none"),
          (this.domElement.className = "flipbook-tooltip flipbook-noselect");
        const t = this;
        (this.currentPosition = {
          x: 0,
          y: 0,
        }),
          o.addEventListener("scroll", function () {
            t.position();
          });
      }),
      (FLIPBOOK.Tooltip.prototype = {
        show: function (t) {
          this.showing ||
            ((this.domElement.style.display = "block"),
            (this.showing = !0),
            t.text && (this.domElement.innerText = t.text),
            t.parent && t.parent.appendChild(this.domElement),
            t.onClick
              ? ((this.domElement.style.cursor = "pointer"),
                (this.domElement.onclick = t.onClick))
              : ((this.domElement.style.cursor = "auto"),
                this.domElement.removeAttribute("onclick")),
            (this.currentPosition = t.position),
            this.position());
        },
        hide: function () {
          this.showing &&
            ((this.domElement.style.display = "none"), (this.showing = !1));
        },
        position: function () {
          const t = this.domElement.parentNode.getBoundingClientRect();
          (this.domElement.style.top =
            this.currentPosition.y - t.top - scrollY + "px"),
            (this.domElement.style.left =
              this.currentPosition.x - t.left - scrollX + "px");
        },
      }),
      (FLIPBOOK.Thumbnails = function (t) {
        var e = this,
          i = t.options,
          n = t.wrapper;
        (this.main = t),
          (this.options = i),
          (this.wrapper = n),
          (this.active = null),
          (this.thumbHolder = jQuery(o.createElement("div"))
            .addClass("flipbook-thumbHolder flipbook-side-menu skin-color-bg")
            .appendTo(n)
            .css(this.options.sideMenuPosition, "0")
            .hide()),
          t.createMenuHeader(
            this.thumbHolder,
            t.strings.thumbnails,
            t.toggleThumbs
          ),
          (this.bookmark = jQuery("<div>")
            .addClass("flipbook-font")
            .appendTo(this.thumbHolder)
            .hide()),
          jQuery(
            '<a><div class="c-p skin-color flipbook-btn">' +
              i.strings.bookmarkCurrentPage +
              "</div></a>"
          )
            .appendTo(this.bookmark)
            .bind("click", function (e) {
              t.bookmarkPage(t.cPage[0], this),
                e.preventDefault(),
                e.stopPropagation();
            }),
          jQuery(
            '<a><div class="c-l-p skin-color flipbook-btn">' +
              i.strings.bookmarkLeftPage +
              "</div></a>"
          )
            .appendTo(this.bookmark)
            .bind("click", function (e) {
              t.bookmarkPage(t.cPage[0], this),
                e.preventDefault(),
                e.stopPropagation();
            }),
          jQuery(
            '<a><div class="c-r-p skin-color flipbook-btn">' +
              i.strings.bookmarkRightPage +
              "</div></a>"
          )
            .appendTo(this.bookmark)
            .bind("click", function (e) {
              t.bookmarkPage(t.cPage[1], this),
                e.preventDefault(),
                e.stopPropagation();
            }),
          (this.search = jQuery("<div>")
            .addClass("flipbook-search")
            .appendTo(this.thumbHolder)
            .hide()),
          (this.$searchBar = jQuery(
            '<div class="flipbook-findbar" id="findbar" deluminate_imagetype="png"><div id="findbarInputContainer"><input id="findInput" class="toolbarField" title="Find" autocapitalize="none" placeholder="' +
              i.strings.findInDocument +
              '..."></div><div class="flipbook-find-info skin-color"/></div>'
          ).appendTo(this.search)),
          (this.thumbsWrapper = jQuery(o.createElement("div"))
            .appendTo(this.thumbHolder)
            .addClass("flipbook-thumbsWrapper")),
          (this.closeGrid = jQuery(o.createElement("div"))
            .appendTo(this.thumbsWrapper)
            .addClass("flipbook-thumbs-grid-close")
            .bind("click", function (t) {
              t.stopPropagation(), t.preventDefault(), e.main.closeMenus();
            })),
          this.main.createSVGIcon("close", null, !0).appendTo(this.closeGrid),
          (this.thumbsScroller = jQuery(o.createElement("div"))
            .appendTo(this.thumbsWrapper)
            .addClass("flipbook-thumbsScroller skin-color"));
        var s = 0;
        (this.$findInput = this.$searchBar
          .find("#findInput")
          .on("keyup", function () {
            var t = this.value;
            clearTimeout(s),
              (s = setTimeout(
                function (t) {
                  if ("" != t) {
                    var o = e.main,
                      i = o.pdfService,
                      n = o.options,
                      s = 0;
                    if (
                      (e.hideAllThumbs(),
                      e.clearSearchResults(),
                      (e.pagesFound = 0),
                      e.$findInfo.hide(),
                      o.unmark(),
                      (o.searchingString = t),
                      e.$findInfo.show().text(n.strings.noMatches),
                      i)
                    )
                      for (var a = 0; a < i.info.numPages; a++)
                        i.findInPage(t, a, function (o, i, a, r) {
                          o.length > 0 &&
                            (e.pagesFound++,
                            (s += o.length),
                            e.$findInfo
                              .show()
                              .text(s + " " + n.strings.matchesFound),
                            e.main.mark(t),
                            e.showSearchResults(o, a, r));
                        });
                    else
                      n.pagesOriginal.forEach((i, s) => {
                        n.cover || s++;
                        var a = s;
                        n.doublePage && (a *= 2),
                          n.doublePage &&
                            a == 2 * n.pagesOriginal.length - 2 &&
                            a--,
                          o.loadPageHTML(a, function (i, s) {
                            i.innerText
                              .toUpperCase()
                              .search(o.searchingString.toUpperCase()) > -1 &&
                              (n.doublePage && (s /= 2),
                              e.showThumb(s),
                              e.pagesFound++,
                              e.$findInfo
                                .show()
                                .text(
                                  e.pagesFound +
                                    " " +
                                    n.strings.pagesFoundContaining +
                                    ' "' +
                                    t +
                                    '"'
                                ),
                              e.main.mark(t)),
                              0 == e.pagesFound &&
                                e.$findInfo.show().text(n.strings.noMatches);
                          });
                      });
                  } else
                    e.hideAllThumbs(),
                      e.clearSearchResults(),
                      e.$findInfo.hide(),
                      e.main.unmark(),
                      (e.main.searchingString = t);
                },
                700,
                t
              ));
          })),
          (this.$findInfo = this.$searchBar.find(".flipbook-find-info")),
          (this.thumbs = []);
        var a = i.pages,
          r = [];
        if (i.doublePage)
          for (var l = 0; l < a.length; l++)
            (0 != l && l % 2 == 0) || r.push(a[l]);
        else r = a;
        i.pdfMode && this.loadThumbsFromPdf(r);
        var h = i.thumbSize,
          p = (i.thumbSize * i.pageWidth) / i.pageHeight;
        r.forEach((n, s) => {
          var a = n.thumb;
          if (!n.empty) {
            var l,
              c = jQuery("<div>")
                .addClass("flipbook-thumb")
                .appendTo(e.thumbsScroller)
                .attr("data-thumb-index", s)
                .width(p)
                .height(h),
              d = jQuery("<span>")
                .appendTo(c)
                .addClass("thumb-btn-close")
                .bind("click", function (e) {
                  e.stopPropagation(),
                    e.preventDefault(),
                    t.removeBookmark(
                      jQuery(this).parent().attr("data-thumb-index")
                    );
                });
            if (
              (t.createSVGIcon("close", null, !0).appendTo(d),
              this.thumbs.push(c),
              n.thumbCanvas)
            )
              l = jQuery(n.thumbCanvas);
            else {
              if (!a) return;
              l = jQuery("<img/>").attr("src", a);
            }
            l.appendTo(c);
            var g =
                i.doublePage && i.pages.length % 2 == 0 && s == r.length - 1,
              u = i.doublePage && 0 == s,
              m = i.doublePage && !u && !g;
            if (g)
              l
                .height(h)
                .width(p)
                .attr("page-title", 2 * s),
                jQuery(o.createElement("span"))
                  .text(String(2 * s))
                  .appendTo(c)
                  .addClass("skin-color")
                  .addClass("flipbook-thumb-num");
            else if (m)
              c.width(2 * p),
                l
                  .height(h)
                  .width(2 * p)
                  .attr("page-title", 2 * s + 1),
                jQuery(o.createElement("span"))
                  .text(String(2 * s) + "-" + String(2 * s + 1))
                  .appendTo(c)
                  .addClass("skin-color")
                  .addClass("flipbook-thumb-num");
            else {
              l.height(h)
                .width(p)
                .attr("page-title", s + 1);
              var b = String(s + 1);
              this.options.pages[s] &&
                this.options.pages[s].name &&
                (b = this.options.pages[s].name),
                jQuery(o.createElement("span"))
                  .text(b)
                  .appendTo(c)
                  .addClass("skin-color")
                  .addClass("flipbook-thumb-num");
            }
            "overlay" == i.thumbsStyle && (i.thumbsCloseOnClick = !0),
              l.bind("click", function (o) {
                o.stopPropagation(), o.preventDefault();
                var n = Number(jQuery(this).attr("page-title"));
                i.rightToLeft && (n = i.pages.length - n + 1),
                  t.goToPage(n),
                  "search" != e.active &&
                    i.thumbsCloseOnClick &&
                    t.toggleThumbs(!1);
              });
          }
        }),
          t.initColors();
      }),
      (FLIPBOOK.Thumbnails.prototype = {
        loadThumbsFromPdf: function (t) {
          for (var e = this.main.pdfService.info.numPages, i = 0; i < e; i++) {
            var n = o.createElement("canvas");
            t[i].thumbCanvas = n;
          }
          this.loadThumbFromPdf(0, t);
        },
        loadVisibleThumbs: function () {},
        loadThumbFromPdf: function (t, e) {
          var o = this;
          this.main.pdfService.pdfDocument.getPage(t + 1).then(function (t) {
            var i = t.getViewport({
                scale: 1,
              }),
              n = o.options.thumbSize / i.height,
              s = t.getViewport({
                scale: n,
              }),
              a = e[t._pageIndex].thumbCanvas,
              r = a.getContext("2d");
            (a.height = s.height), (a.width = s.width);
            var l = {
              canvasContext: r,
              viewport: s,
            };
            (t.cleanupAfterRender = !0),
              t.render(l).promise.then(function () {
                t.cleanup(),
                  t._pageIndex + 1 < o.main.pdfService.info.numPages &&
                    o.loadThumbFromPdf(t._pageIndex + 1, e);
              });
          });
        },
        showAllThumbs: function () {
          jQuery(".flipbook-thumb").show(), this.clearSearchResults();
        },
        hideAllThumbs: function () {
          jQuery(".flipbook-thumb").hide();
        },
        clearSearchResults: function () {
          jQuery(".flipbook-search-match").remove();
        },
        showSearchResults: function (t, e, o) {
          var i = this,
            n = this.main.options,
            s = t.length,
            a = Number(e + 1);
          jQuery(
            '<div data-page="' +
              a +
              '" style="order: ' +
              e +
              '" class="flipbook-search-match"><div class="flipbook-search-match-title"><span style="float:left;"><strong>Page ' +
              a +
              '</strong></span><span style="float:right;">' +
              s +
              ' matches</span></div><div class="flipbook-search-match-text">' +
              o +
              "</div></div>"
          )
            .appendTo(i.thumbsScroller)
            .bind("click", function (t) {
              t.stopPropagation(), t.preventDefault();
              var e = Number(this.dataset.page);
              (e =
                n.rightToLeft && n.pages && n.pages.length
                  ? n.pages.length - e + 1
                  : e),
                i.main.goToPage(e);
            });
        },
        showThumb: function (t) {
          this.thumbs[t] && this.thumbs[t].show();
        },
        hideThumb: function (t) {
          this.thumbs[t].hide();
        },
        showBookmarks: function () {
          jQuery(".thumb-btn-close").show(),
            this.showBookmarkedThumbs(),
            this.clearSearchResults(),
            this.bookmark.show(),
            this.setTitle(this.options.strings.bookmarks),
            this.main.updateCurrentPage(),
            (this.active = "bookmarks"),
            this.thumbHolder.removeClass("flipbook-thumbs-grid");
        },
        showSearch: function () {
          this.clearSearchResults(),
            this.hideAllThumbs(),
            this.search.show(),
            this.$findInfo.hide(),
            jQuery(".thumb-btn-close").hide(),
            this.setTitle(this.options.strings.search),
            this.$findInput.val("").focus(),
            (this.active = "search"),
            this.thumbHolder.removeClass("flipbook-thumbs-grid");
        },
        showBookmarkedThumbs: function () {
          var t = this.main.getBookmarkedPages();
          this.hideAllThumbs();
          for (var e = 0; e < t.length; e++) {
            var o = t[e];
            o && this.showThumb(o);
          }
        },
        show: function () {
          this.setTitle(this.options.strings.thumbnails),
            this.bookmark.hide(),
            this.search.hide(),
            this.thumbHolder.show(),
            this.main.thumbsVertical(),
            this.showAllThumbs(),
            jQuery(".thumb-btn-close").hide(),
            this.loadVisibleThumbs(),
            this.main.resize(),
            (this.active = "thumbs"),
            "overlay" == this.main.options.thumbsStyle &&
              this.thumbHolder.addClass("flipbook-thumbs-grid");
        },
        hide: function () {
          this.thumbHolder.hide(), this.main.resize(), (this.active = null);
        },
        setTitle: function (t) {
          this.thumbHolder.find(".flipbook-menu-title").text(t);
        },
      }),
      (FLIPBOOK.Lightbox = function (t, e, i) {
        var n = this;
        (this.context = t),
          (this.options = i),
          (this.$document = jQuery("document")),
          (this.$body = jQuery("body")),
          (this.$html = jQuery("html")),
          (this.$window = jQuery("window")),
          (n.overlay = jQuery(o.createElement("div"))
            .attr("style", i.lightboxCSS)
            .addClass("flipbook-overlay")
            .css("display", "none")
            .css("top", n.options.lightboxMarginV)
            .css("bottom", n.options.lightboxMarginV)
            .css("left", n.options.lightboxMarginH)
            .css("right", n.options.lightboxMarginH)
            .appendTo("body")),
          n.options.lightboxCloseOnClick &&
            jQuery("body").bind("click", function (t) {
              var e = jQuery(t.target);
              (!e.parents().hasClass("flipbook-overlay") ||
                e.hasClass("flipbook-bookLayer") ||
                e.hasClass("flipbook-carousel-slide")) &&
                n.closeLightbox();
            }),
          i.lightboxBackground &&
            n.overlay.css("background", i.lightboxBackground),
          i.lightboxBackgroundColor &&
            n.overlay.css("background", i.lightboxBackgroundColor),
          i.lightboxBackgroundPattern &&
            n.overlay.css(
              "background",
              "url(" + i.lightboxBackgroundPattern + ") repeat"
            ),
          i.lightboxBackgroundImage &&
            (n.overlay.css(
              "background",
              "url(" + i.lightboxBackgroundImage + ") no-repeat"
            ),
            n.overlay.css("background-size", "cover"),
            n.overlay.css("background-position", "center center")),
          o.addEventListener("keydown", function (t) {
            "Escape" === t.key && n.closeLightbox();
          }),
          (n.wrapper = jQuery(o.createElement("div"))
            .css("height", "auto")
            .appendTo(n.overlay)),
          n.wrapper
            .attr("class", "flipbook-wrapper-transparent")
            .css("margin", "0px auto")
            .css("padding", "0px")
            .css("height", "100%")
            .css("width", "100%"),
          e.appendTo(n.wrapper),
          jQuery("<div/>")
            .appendTo(n.wrapper)
            .addClass("flipbook-lightbox-toolbar");
      }),
      (FLIPBOOK.Lightbox.prototype = {
        openLightbox: function () {
          FLIPBOOK.lightboxOpened ||
            ((FLIPBOOK.lightboxOpened = !0),
            this.overlay.css("display", "none"),
            this.overlay.fadeIn("slow"),
            this.$body.addClass("flipbook-overflow-hidden"),
            this.$html.addClass("flipbook-overflow-hidden"),
            this.$window.trigger("r3d-lightboxopen"),
            this.options.deeplinkingEnabled ||
              e.history.pushState(null, "", e.location.href),
            this.context.options.password &&
              !this.context.pdfinitStarted &&
              this.context.initialized &&
              this.context.initPdf());
        },
        closeLightbox: function (t) {
          FLIPBOOK.lightboxOpened &&
            this.context.Book &&
            this.context.Book.enabled &&
            ((FLIPBOOK.lightboxOpened = !1),
            this.overlay.fadeOut("fast"),
            this.$body.removeClass("flipbook-overflow-hidden"),
            this.$html.removeClass("flipbook-overflow-hidden"),
            this.$window.trigger("r3d-lightboxclose"),
            this.context.trigger("lightboxclose"),
            jQuery(this.context.fullscreenElement).removeClass(
              "flipbook-browser-fullscreen"
            ),
            this.context.lightboxEnd(),
            t || this.options.deeplinkingEnabled || history.back());
        },
        disposeLightbox: function () {
          (FLIPBOOK.lightboxOpened = !1),
            this.overlay.fadeOut("fast"),
            this.$body.removeClass("flipbook-overflow-hidden"),
            this.$html.removeClass("flipbook-overflow-hidden"),
            this.$window.trigger("r3d-lightboxclose"),
            this.context.trigger("lightboxclose"),
            jQuery(this.context.fullscreenElement).removeClass(
              "flipbook-browser-fullscreen"
            ),
            this.context.lightboxEnd(),
            (this.context.disposed = !0);
        },
      });
  })(jQuery, window, document),
  (FLIPBOOK.onPageLinkClick = function (t) {
    var e = t.dataset.bookid,
      o = t.dataset.page;
    o && FLIPBOOK.books[e].goToPage(Number(o));
    var i = t.dataset.url;
    i && window.open(i, "_blank");
  }),
  (FLIPBOOK.easings = {
    easeInQuad: function (t) {
      return t * t;
    },
    easeOutQuad: function (t) {
      return t * (2 - t);
    },
    easeInOutQuad: function (t) {
      return t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1;
    },
    easeInSine: function (t) {
      return 1 - Math.cos((t * Math.PI) / 2);
    },
    easeOutSine: function (t) {
      return Math.sin((t * Math.PI) / 2);
    },
    easeInOutSine: function (t) {
      return -(Math.cos(Math.PI * t) - 1) / 2;
    },
  }),
  (FLIPBOOK.animate = function ({
    from: t,
    to: e,
    delay: o,
    duration: i,
    easing: n = "easeOutQuad",
    step: s,
    complete: a,
  }) {
    const r = performance.now();

    function l(o) {
      const h = o - r,
        p = Math.min(h / i, 1),
        c = t + (e - t) * FLIPBOOK.easings[n](p);
      s(c), p < 1 ? requestAnimationFrame(l) : a();
    }
    o
      ? setTimeout(() => {
          requestAnimationFrame(l);
        }, o)
      : requestAnimationFrame(l);
  }),
  (FLIPBOOK.Linkify = function (t) {
    var e = t.replace(
      /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
      '<a href="$1" target="_blank" class="flipbook-page-auto-link">$1</a>'
    );
    return (e = (e = e.replace(
      /(^|[^\/])(www\.[\S]+(\b|$))/gi,
      '$1<a href="http://$2" target="_blank" class="flipbook-page-auto-link">$2</a>'
    )).replace(
      /(([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}))/gi,
      '<a href="mailto:$1" class="flipbook-page-auto-link">$1</a>'
    ));
  });
