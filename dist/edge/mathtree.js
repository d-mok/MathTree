(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __decorateClass = (decorators, target, key, kind) => {
    var result2 = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
      if (decorator = decorators[i2])
        result2 = (kind ? decorator(target, key, result2) : decorator(result2)) || result2;
    if (kind && result2)
      __defProp(target, key, result2);
    return result2;
  };

  // node_modules/katex/dist/katex.js
  var require_katex = __commonJS({
    "node_modules/katex/dist/katex.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["katex"] = factory();
        else
          root["katex"] = factory();
      })(typeof self !== "undefined" ? self : exports, function() {
        return function() {
          "use strict";
          var __webpack_require__ = {};
          !function() {
            __webpack_require__.d = function(exports2, definition) {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          }();
          !function() {
            __webpack_require__.o = function(obj, prop) {
              return Object.prototype.hasOwnProperty.call(obj, prop);
            };
          }();
          var __webpack_exports__ = {};
          __webpack_require__.d(__webpack_exports__, {
            "default": function() {
              return katex_webpack;
            }
          });
          ;
          var ParseError = function ParseError2(message, token) {
            this.position = void 0;
            var error4 = "KaTeX parse error: " + message;
            var start;
            var loc = token && token.loc;
            if (loc && loc.start <= loc.end) {
              var input = loc.lexer.input;
              start = loc.start;
              var end = loc.end;
              if (start === input.length) {
                error4 += " at end of input: ";
              } else {
                error4 += " at position " + (start + 1) + ": ";
              }
              var underlined = input.slice(start, end).replace(/[^]/g, "$&\u0332");
              var left2;
              if (start > 15) {
                left2 = "\u2026" + input.slice(start - 15, start);
              } else {
                left2 = input.slice(0, start);
              }
              var right;
              if (end + 15 < input.length) {
                right = input.slice(end, end + 15) + "\u2026";
              } else {
                right = input.slice(end);
              }
              error4 += left2 + underlined + right;
            }
            var self2 = new Error(error4);
            self2.name = "ParseError";
            self2.__proto__ = ParseError2.prototype;
            self2.position = start;
            return self2;
          };
          ParseError.prototype.__proto__ = Error.prototype;
          var src_ParseError = ParseError;
          ;
          var contains = function contains2(list3, elem) {
            return list3.indexOf(elem) !== -1;
          };
          var deflt = function deflt2(setting, defaultIfUndefined) {
            return setting === void 0 ? defaultIfUndefined : setting;
          };
          var uppercase = /([A-Z])/g;
          var hyphenate = function hyphenate2(str3) {
            return str3.replace(uppercase, "-$1").toLowerCase();
          };
          var ESCAPE_LOOKUP = {
            "&": "&amp;",
            ">": "&gt;",
            "<": "&lt;",
            '"': "&quot;",
            "'": "&#x27;"
          };
          var ESCAPE_REGEX = /[&><"']/g;
          function utils_escape(text) {
            return String(text).replace(ESCAPE_REGEX, function(match3) {
              return ESCAPE_LOOKUP[match3];
            });
          }
          var getBaseElem = function getBaseElem2(group) {
            if (group.type === "ordgroup") {
              if (group.body.length === 1) {
                return getBaseElem2(group.body[0]);
              } else {
                return group;
              }
            } else if (group.type === "color") {
              if (group.body.length === 1) {
                return getBaseElem2(group.body[0]);
              } else {
                return group;
              }
            } else if (group.type === "font") {
              return getBaseElem2(group.body);
            } else {
              return group;
            }
          };
          var isCharacterBox = function isCharacterBox2(group) {
            var baseElem = getBaseElem(group);
            return baseElem.type === "mathord" || baseElem.type === "textord" || baseElem.type === "atom";
          };
          var assert = function assert2(value) {
            if (!value) {
              throw new Error("Expected non-null, but got " + String(value));
            }
            return value;
          };
          var protocolFromUrl = function protocolFromUrl2(url) {
            var protocol = /^\s*([^\\/#]*?)(?::|&#0*58|&#x0*3a)/i.exec(url);
            return protocol != null ? protocol[1] : "_relative";
          };
          var utils = {
            contains,
            deflt,
            escape: utils_escape,
            hyphenate,
            getBaseElem,
            isCharacterBox,
            protocolFromUrl
          };
          ;
          var Settings = /* @__PURE__ */ function() {
            function Settings2(options2) {
              this.displayMode = void 0;
              this.output = void 0;
              this.leqno = void 0;
              this.fleqn = void 0;
              this.throwOnError = void 0;
              this.errorColor = void 0;
              this.macros = void 0;
              this.minRuleThickness = void 0;
              this.colorIsTextColor = void 0;
              this.strict = void 0;
              this.trust = void 0;
              this.maxSize = void 0;
              this.maxExpand = void 0;
              this.globalGroup = void 0;
              options2 = options2 || {};
              this.displayMode = utils.deflt(options2.displayMode, false);
              this.output = utils.deflt(options2.output, "htmlAndMathml");
              this.leqno = utils.deflt(options2.leqno, false);
              this.fleqn = utils.deflt(options2.fleqn, false);
              this.throwOnError = utils.deflt(options2.throwOnError, true);
              this.errorColor = utils.deflt(options2.errorColor, "#cc0000");
              this.macros = options2.macros || {};
              this.minRuleThickness = Math.max(0, utils.deflt(options2.minRuleThickness, 0));
              this.colorIsTextColor = utils.deflt(options2.colorIsTextColor, false);
              this.strict = utils.deflt(options2.strict, "warn");
              this.trust = utils.deflt(options2.trust, false);
              this.maxSize = Math.max(0, utils.deflt(options2.maxSize, Infinity));
              this.maxExpand = Math.max(0, utils.deflt(options2.maxExpand, 1e3));
              this.globalGroup = utils.deflt(options2.globalGroup, false);
            }
            var _proto = Settings2.prototype;
            _proto.reportNonstrict = function reportNonstrict(errorCode, errorMsg, token) {
              var strict = this.strict;
              if (typeof strict === "function") {
                strict = strict(errorCode, errorMsg, token);
              }
              if (!strict || strict === "ignore") {
                return;
              } else if (strict === true || strict === "error") {
                throw new src_ParseError("LaTeX-incompatible input and strict mode is set to 'error': " + (errorMsg + " [" + errorCode + "]"), token);
              } else if (strict === "warn") {
                typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
              } else {
                typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
              }
            };
            _proto.useStrictBehavior = function useStrictBehavior(errorCode, errorMsg, token) {
              var strict = this.strict;
              if (typeof strict === "function") {
                try {
                  strict = strict(errorCode, errorMsg, token);
                } catch (error4) {
                  strict = "error";
                }
              }
              if (!strict || strict === "ignore") {
                return false;
              } else if (strict === true || strict === "error") {
                return true;
              } else if (strict === "warn") {
                typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
                return false;
              } else {
                typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
                return false;
              }
            };
            _proto.isTrusted = function isTrusted(context2) {
              if (context2.url && !context2.protocol) {
                context2.protocol = utils.protocolFromUrl(context2.url);
              }
              var trust = typeof this.trust === "function" ? this.trust(context2) : this.trust;
              return Boolean(trust);
            };
            return Settings2;
          }();
          ;
          var Style = /* @__PURE__ */ function() {
            function Style2(id, size, cramped) {
              this.id = void 0;
              this.size = void 0;
              this.cramped = void 0;
              this.id = id;
              this.size = size;
              this.cramped = cramped;
            }
            var _proto = Style2.prototype;
            _proto.sup = function sup() {
              return styles[_sup[this.id]];
            };
            _proto.sub = function sub() {
              return styles[_sub[this.id]];
            };
            _proto.fracNum = function fracNum() {
              return styles[_fracNum[this.id]];
            };
            _proto.fracDen = function fracDen() {
              return styles[_fracDen[this.id]];
            };
            _proto.cramp = function cramp() {
              return styles[_cramp[this.id]];
            };
            _proto.text = function text() {
              return styles[_text[this.id]];
            };
            _proto.isTight = function isTight() {
              return this.size >= 2;
            };
            return Style2;
          }();
          var D2 = 0;
          var Dc = 1;
          var T2 = 2;
          var Tc = 3;
          var S2 = 4;
          var Sc = 5;
          var SS = 6;
          var SSc = 7;
          var styles = [new Style(D2, 0, false), new Style(Dc, 0, true), new Style(T2, 1, false), new Style(Tc, 1, true), new Style(S2, 2, false), new Style(Sc, 2, true), new Style(SS, 3, false), new Style(SSc, 3, true)];
          var _sup = [S2, Sc, S2, Sc, SS, SSc, SS, SSc];
          var _sub = [Sc, Sc, Sc, Sc, SSc, SSc, SSc, SSc];
          var _fracNum = [T2, Tc, S2, Sc, SS, SSc, SS, SSc];
          var _fracDen = [Tc, Tc, Sc, Sc, SSc, SSc, SSc, SSc];
          var _cramp = [Dc, Dc, Tc, Tc, Sc, Sc, SSc, SSc];
          var _text = [D2, Dc, T2, Tc, T2, Tc, T2, Tc];
          var src_Style = {
            DISPLAY: styles[D2],
            TEXT: styles[T2],
            SCRIPT: styles[S2],
            SCRIPTSCRIPT: styles[SS]
          };
          ;
          var scriptData = [{
            name: "latin",
            blocks: [
              [256, 591],
              [768, 879]
            ]
          }, {
            name: "cyrillic",
            blocks: [[1024, 1279]]
          }, {
            name: "armenian",
            blocks: [[1328, 1423]]
          }, {
            name: "brahmic",
            blocks: [[2304, 4255]]
          }, {
            name: "georgian",
            blocks: [[4256, 4351]]
          }, {
            name: "cjk",
            blocks: [
              [12288, 12543],
              [19968, 40879],
              [65280, 65376]
            ]
          }, {
            name: "hangul",
            blocks: [[44032, 55215]]
          }];
          function scriptFromCodepoint(codepoint) {
            for (var i3 = 0; i3 < scriptData.length; i3++) {
              var script = scriptData[i3];
              for (var _i6 = 0; _i6 < script.blocks.length; _i6++) {
                var block = script.blocks[_i6];
                if (codepoint >= block[0] && codepoint <= block[1]) {
                  return script.name;
                }
              }
            }
            return null;
          }
          var allBlocks = [];
          scriptData.forEach(function(s3) {
            return s3.blocks.forEach(function(b2) {
              return allBlocks.push.apply(allBlocks, b2);
            });
          });
          function supportedCodepoint(codepoint) {
            for (var i3 = 0; i3 < allBlocks.length; i3 += 2) {
              if (codepoint >= allBlocks[i3] && codepoint <= allBlocks[i3 + 1]) {
                return true;
              }
            }
            return false;
          }
          ;
          var hLinePad = 80;
          var sqrtMain = function sqrtMain2(extraViniculum, hLinePad2) {
            return "M95," + (622 + extraViniculum + hLinePad2) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + extraViniculum / 2.075 + " -" + extraViniculum + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + extraViniculum) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + extraViniculum) + " " + hLinePad2 + "h400000v" + (40 + extraViniculum) + "h-400000z";
          };
          var sqrtSize1 = function sqrtSize12(extraViniculum, hLinePad2) {
            return "M263," + (601 + extraViniculum + hLinePad2) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + extraViniculum / 2.084 + " -" + extraViniculum + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + extraViniculum) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + extraViniculum) + " " + hLinePad2 + "h400000v" + (40 + extraViniculum) + "h-400000z";
          };
          var sqrtSize2 = function sqrtSize22(extraViniculum, hLinePad2) {
            return "M983 " + (10 + extraViniculum + hLinePad2) + "\nl" + extraViniculum / 3.13 + " -" + extraViniculum + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + extraViniculum) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + extraViniculum) + " " + hLinePad2 + "h400000v" + (40 + extraViniculum) + "h-400000z";
          };
          var sqrtSize3 = function sqrtSize32(extraViniculum, hLinePad2) {
            return "M424," + (2398 + extraViniculum + hLinePad2) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + extraViniculum / 4.223 + " -" + extraViniculum + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + extraViniculum) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + extraViniculum) + " " + hLinePad2 + "\nh400000v" + (40 + extraViniculum) + "h-400000z";
          };
          var sqrtSize4 = function sqrtSize42(extraViniculum, hLinePad2) {
            return "M473," + (2713 + extraViniculum + hLinePad2) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + extraViniculum / 5.298 + " -" + extraViniculum + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + extraViniculum) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + extraViniculum) + " " + hLinePad2 + "h400000v" + (40 + extraViniculum) + "H1017.7z";
          };
          var phasePath = function phasePath2(y2) {
            var x2 = y2 / 2;
            return "M400000 " + y2 + " H0 L" + x2 + " 0 l65 45 L145 " + (y2 - 80) + " H400000z";
          };
          var sqrtTall = function sqrtTall2(extraViniculum, hLinePad2, viewBoxHeight) {
            var vertSegment = viewBoxHeight - 54 - hLinePad2 - extraViniculum;
            return "M702 " + (extraViniculum + hLinePad2) + "H400000" + (40 + extraViniculum) + "\nH742v" + vertSegment + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 " + hLinePad2 + "H400000v" + (40 + extraViniculum) + "H742z";
          };
          var sqrtPath = function sqrtPath2(size, extraViniculum, viewBoxHeight) {
            extraViniculum = 1e3 * extraViniculum;
            var path2 = "";
            switch (size) {
              case "sqrtMain":
                path2 = sqrtMain(extraViniculum, hLinePad);
                break;
              case "sqrtSize1":
                path2 = sqrtSize1(extraViniculum, hLinePad);
                break;
              case "sqrtSize2":
                path2 = sqrtSize2(extraViniculum, hLinePad);
                break;
              case "sqrtSize3":
                path2 = sqrtSize3(extraViniculum, hLinePad);
                break;
              case "sqrtSize4":
                path2 = sqrtSize4(extraViniculum, hLinePad);
                break;
              case "sqrtTall":
                path2 = sqrtTall(extraViniculum, hLinePad, viewBoxHeight);
            }
            return path2;
          };
          var innerPath = function innerPath2(name, height) {
            switch (name) {
              case "\u239C":
                return "M291 0 H417 V" + height + " H291z M291 0 H417 V" + height + " H291z";
              case "\u2223":
                return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z";
              case "\u2225":
                return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z" + ("M367 0 H410 V" + height + " H367z M367 0 H410 V" + height + " H367z");
              case "\u239F":
                return "M457 0 H583 V" + height + " H457z M457 0 H583 V" + height + " H457z";
              case "\u23A2":
                return "M319 0 H403 V" + height + " H319z M319 0 H403 V" + height + " H319z";
              case "\u23A5":
                return "M263 0 H347 V" + height + " H263z M263 0 H347 V" + height + " H263z";
              case "\u23AA":
                return "M384 0 H504 V" + height + " H384z M384 0 H504 V" + height + " H384z";
              case "\u23D0":
                return "M312 0 H355 V" + height + " H312z M312 0 H355 V" + height + " H312z";
              case "\u2016":
                return "M257 0 H300 V" + height + " H257z M257 0 H300 V" + height + " H257z" + ("M478 0 H521 V" + height + " H478z M478 0 H521 V" + height + " H478z");
              default:
                return "";
            }
          };
          var path = {
            doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
            doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
            leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
            leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
            leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
            leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
            leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
            leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
            leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
            leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
            leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
            lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
            leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
            leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
            leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
            longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
            midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
            midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
            oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
            oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
            oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
            oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
            rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
            rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
            rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
            rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
            rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
            rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
            rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
            rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
            rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
            righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
            rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
            rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
            twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
            twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
            tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
            tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
            tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
            tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
            vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
            widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
            widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
            widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
            widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
            widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
            widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
            widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
            widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
            baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
            rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
            baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
            rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
            shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
            shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
          };
          ;
          var DocumentFragment = /* @__PURE__ */ function() {
            function DocumentFragment2(children) {
              this.children = void 0;
              this.classes = void 0;
              this.height = void 0;
              this.depth = void 0;
              this.maxFontSize = void 0;
              this.style = void 0;
              this.children = children;
              this.classes = [];
              this.height = 0;
              this.depth = 0;
              this.maxFontSize = 0;
              this.style = {};
            }
            var _proto = DocumentFragment2.prototype;
            _proto.hasClass = function hasClass(className) {
              return utils.contains(this.classes, className);
            };
            _proto.toNode = function toNode() {
              var frag = document.createDocumentFragment();
              for (var i3 = 0; i3 < this.children.length; i3++) {
                frag.appendChild(this.children[i3].toNode());
              }
              return frag;
            };
            _proto.toMarkup = function toMarkup() {
              var markup = "";
              for (var i3 = 0; i3 < this.children.length; i3++) {
                markup += this.children[i3].toMarkup();
              }
              return markup;
            };
            _proto.toText = function toText() {
              var toText2 = function toText3(child) {
                return child.toText();
              };
              return this.children.map(toText2).join("");
            };
            return DocumentFragment2;
          }();
          ;
          var fontMetricsData = {
            "AMS-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "65": [0, 0.68889, 0, 0, 0.72222],
              "66": [0, 0.68889, 0, 0, 0.66667],
              "67": [0, 0.68889, 0, 0, 0.72222],
              "68": [0, 0.68889, 0, 0, 0.72222],
              "69": [0, 0.68889, 0, 0, 0.66667],
              "70": [0, 0.68889, 0, 0, 0.61111],
              "71": [0, 0.68889, 0, 0, 0.77778],
              "72": [0, 0.68889, 0, 0, 0.77778],
              "73": [0, 0.68889, 0, 0, 0.38889],
              "74": [0.16667, 0.68889, 0, 0, 0.5],
              "75": [0, 0.68889, 0, 0, 0.77778],
              "76": [0, 0.68889, 0, 0, 0.66667],
              "77": [0, 0.68889, 0, 0, 0.94445],
              "78": [0, 0.68889, 0, 0, 0.72222],
              "79": [0.16667, 0.68889, 0, 0, 0.77778],
              "80": [0, 0.68889, 0, 0, 0.61111],
              "81": [0.16667, 0.68889, 0, 0, 0.77778],
              "82": [0, 0.68889, 0, 0, 0.72222],
              "83": [0, 0.68889, 0, 0, 0.55556],
              "84": [0, 0.68889, 0, 0, 0.66667],
              "85": [0, 0.68889, 0, 0, 0.72222],
              "86": [0, 0.68889, 0, 0, 0.72222],
              "87": [0, 0.68889, 0, 0, 1],
              "88": [0, 0.68889, 0, 0, 0.72222],
              "89": [0, 0.68889, 0, 0, 0.72222],
              "90": [0, 0.68889, 0, 0, 0.66667],
              "107": [0, 0.68889, 0, 0, 0.55556],
              "160": [0, 0, 0, 0, 0.25],
              "165": [0, 0.675, 0.025, 0, 0.75],
              "174": [0.15559, 0.69224, 0, 0, 0.94666],
              "240": [0, 0.68889, 0, 0, 0.55556],
              "295": [0, 0.68889, 0, 0, 0.54028],
              "710": [0, 0.825, 0, 0, 2.33334],
              "732": [0, 0.9, 0, 0, 2.33334],
              "770": [0, 0.825, 0, 0, 2.33334],
              "771": [0, 0.9, 0, 0, 2.33334],
              "989": [0.08167, 0.58167, 0, 0, 0.77778],
              "1008": [0, 0.43056, 0.04028, 0, 0.66667],
              "8245": [0, 0.54986, 0, 0, 0.275],
              "8463": [0, 0.68889, 0, 0, 0.54028],
              "8487": [0, 0.68889, 0, 0, 0.72222],
              "8498": [0, 0.68889, 0, 0, 0.55556],
              "8502": [0, 0.68889, 0, 0, 0.66667],
              "8503": [0, 0.68889, 0, 0, 0.44445],
              "8504": [0, 0.68889, 0, 0, 0.66667],
              "8513": [0, 0.68889, 0, 0, 0.63889],
              "8592": [-0.03598, 0.46402, 0, 0, 0.5],
              "8594": [-0.03598, 0.46402, 0, 0, 0.5],
              "8602": [-0.13313, 0.36687, 0, 0, 1],
              "8603": [-0.13313, 0.36687, 0, 0, 1],
              "8606": [0.01354, 0.52239, 0, 0, 1],
              "8608": [0.01354, 0.52239, 0, 0, 1],
              "8610": [0.01354, 0.52239, 0, 0, 1.11111],
              "8611": [0.01354, 0.52239, 0, 0, 1.11111],
              "8619": [0, 0.54986, 0, 0, 1],
              "8620": [0, 0.54986, 0, 0, 1],
              "8621": [-0.13313, 0.37788, 0, 0, 1.38889],
              "8622": [-0.13313, 0.36687, 0, 0, 1],
              "8624": [0, 0.69224, 0, 0, 0.5],
              "8625": [0, 0.69224, 0, 0, 0.5],
              "8630": [0, 0.43056, 0, 0, 1],
              "8631": [0, 0.43056, 0, 0, 1],
              "8634": [0.08198, 0.58198, 0, 0, 0.77778],
              "8635": [0.08198, 0.58198, 0, 0, 0.77778],
              "8638": [0.19444, 0.69224, 0, 0, 0.41667],
              "8639": [0.19444, 0.69224, 0, 0, 0.41667],
              "8642": [0.19444, 0.69224, 0, 0, 0.41667],
              "8643": [0.19444, 0.69224, 0, 0, 0.41667],
              "8644": [0.1808, 0.675, 0, 0, 1],
              "8646": [0.1808, 0.675, 0, 0, 1],
              "8647": [0.1808, 0.675, 0, 0, 1],
              "8648": [0.19444, 0.69224, 0, 0, 0.83334],
              "8649": [0.1808, 0.675, 0, 0, 1],
              "8650": [0.19444, 0.69224, 0, 0, 0.83334],
              "8651": [0.01354, 0.52239, 0, 0, 1],
              "8652": [0.01354, 0.52239, 0, 0, 1],
              "8653": [-0.13313, 0.36687, 0, 0, 1],
              "8654": [-0.13313, 0.36687, 0, 0, 1],
              "8655": [-0.13313, 0.36687, 0, 0, 1],
              "8666": [0.13667, 0.63667, 0, 0, 1],
              "8667": [0.13667, 0.63667, 0, 0, 1],
              "8669": [-0.13313, 0.37788, 0, 0, 1],
              "8672": [-0.064, 0.437, 0, 0, 1.334],
              "8674": [-0.064, 0.437, 0, 0, 1.334],
              "8705": [0, 0.825, 0, 0, 0.5],
              "8708": [0, 0.68889, 0, 0, 0.55556],
              "8709": [0.08167, 0.58167, 0, 0, 0.77778],
              "8717": [0, 0.43056, 0, 0, 0.42917],
              "8722": [-0.03598, 0.46402, 0, 0, 0.5],
              "8724": [0.08198, 0.69224, 0, 0, 0.77778],
              "8726": [0.08167, 0.58167, 0, 0, 0.77778],
              "8733": [0, 0.69224, 0, 0, 0.77778],
              "8736": [0, 0.69224, 0, 0, 0.72222],
              "8737": [0, 0.69224, 0, 0, 0.72222],
              "8738": [0.03517, 0.52239, 0, 0, 0.72222],
              "8739": [0.08167, 0.58167, 0, 0, 0.22222],
              "8740": [0.25142, 0.74111, 0, 0, 0.27778],
              "8741": [0.08167, 0.58167, 0, 0, 0.38889],
              "8742": [0.25142, 0.74111, 0, 0, 0.5],
              "8756": [0, 0.69224, 0, 0, 0.66667],
              "8757": [0, 0.69224, 0, 0, 0.66667],
              "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
              "8765": [-0.13313, 0.37788, 0, 0, 0.77778],
              "8769": [-0.13313, 0.36687, 0, 0, 0.77778],
              "8770": [-0.03625, 0.46375, 0, 0, 0.77778],
              "8774": [0.30274, 0.79383, 0, 0, 0.77778],
              "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
              "8778": [0.08167, 0.58167, 0, 0, 0.77778],
              "8782": [0.06062, 0.54986, 0, 0, 0.77778],
              "8783": [0.06062, 0.54986, 0, 0, 0.77778],
              "8785": [0.08198, 0.58198, 0, 0, 0.77778],
              "8786": [0.08198, 0.58198, 0, 0, 0.77778],
              "8787": [0.08198, 0.58198, 0, 0, 0.77778],
              "8790": [0, 0.69224, 0, 0, 0.77778],
              "8791": [0.22958, 0.72958, 0, 0, 0.77778],
              "8796": [0.08198, 0.91667, 0, 0, 0.77778],
              "8806": [0.25583, 0.75583, 0, 0, 0.77778],
              "8807": [0.25583, 0.75583, 0, 0, 0.77778],
              "8808": [0.25142, 0.75726, 0, 0, 0.77778],
              "8809": [0.25142, 0.75726, 0, 0, 0.77778],
              "8812": [0.25583, 0.75583, 0, 0, 0.5],
              "8814": [0.20576, 0.70576, 0, 0, 0.77778],
              "8815": [0.20576, 0.70576, 0, 0, 0.77778],
              "8816": [0.30274, 0.79383, 0, 0, 0.77778],
              "8817": [0.30274, 0.79383, 0, 0, 0.77778],
              "8818": [0.22958, 0.72958, 0, 0, 0.77778],
              "8819": [0.22958, 0.72958, 0, 0, 0.77778],
              "8822": [0.1808, 0.675, 0, 0, 0.77778],
              "8823": [0.1808, 0.675, 0, 0, 0.77778],
              "8828": [0.13667, 0.63667, 0, 0, 0.77778],
              "8829": [0.13667, 0.63667, 0, 0, 0.77778],
              "8830": [0.22958, 0.72958, 0, 0, 0.77778],
              "8831": [0.22958, 0.72958, 0, 0, 0.77778],
              "8832": [0.20576, 0.70576, 0, 0, 0.77778],
              "8833": [0.20576, 0.70576, 0, 0, 0.77778],
              "8840": [0.30274, 0.79383, 0, 0, 0.77778],
              "8841": [0.30274, 0.79383, 0, 0, 0.77778],
              "8842": [0.13597, 0.63597, 0, 0, 0.77778],
              "8843": [0.13597, 0.63597, 0, 0, 0.77778],
              "8847": [0.03517, 0.54986, 0, 0, 0.77778],
              "8848": [0.03517, 0.54986, 0, 0, 0.77778],
              "8858": [0.08198, 0.58198, 0, 0, 0.77778],
              "8859": [0.08198, 0.58198, 0, 0, 0.77778],
              "8861": [0.08198, 0.58198, 0, 0, 0.77778],
              "8862": [0, 0.675, 0, 0, 0.77778],
              "8863": [0, 0.675, 0, 0, 0.77778],
              "8864": [0, 0.675, 0, 0, 0.77778],
              "8865": [0, 0.675, 0, 0, 0.77778],
              "8872": [0, 0.69224, 0, 0, 0.61111],
              "8873": [0, 0.69224, 0, 0, 0.72222],
              "8874": [0, 0.69224, 0, 0, 0.88889],
              "8876": [0, 0.68889, 0, 0, 0.61111],
              "8877": [0, 0.68889, 0, 0, 0.61111],
              "8878": [0, 0.68889, 0, 0, 0.72222],
              "8879": [0, 0.68889, 0, 0, 0.72222],
              "8882": [0.03517, 0.54986, 0, 0, 0.77778],
              "8883": [0.03517, 0.54986, 0, 0, 0.77778],
              "8884": [0.13667, 0.63667, 0, 0, 0.77778],
              "8885": [0.13667, 0.63667, 0, 0, 0.77778],
              "8888": [0, 0.54986, 0, 0, 1.11111],
              "8890": [0.19444, 0.43056, 0, 0, 0.55556],
              "8891": [0.19444, 0.69224, 0, 0, 0.61111],
              "8892": [0.19444, 0.69224, 0, 0, 0.61111],
              "8901": [0, 0.54986, 0, 0, 0.27778],
              "8903": [0.08167, 0.58167, 0, 0, 0.77778],
              "8905": [0.08167, 0.58167, 0, 0, 0.77778],
              "8906": [0.08167, 0.58167, 0, 0, 0.77778],
              "8907": [0, 0.69224, 0, 0, 0.77778],
              "8908": [0, 0.69224, 0, 0, 0.77778],
              "8909": [-0.03598, 0.46402, 0, 0, 0.77778],
              "8910": [0, 0.54986, 0, 0, 0.76042],
              "8911": [0, 0.54986, 0, 0, 0.76042],
              "8912": [0.03517, 0.54986, 0, 0, 0.77778],
              "8913": [0.03517, 0.54986, 0, 0, 0.77778],
              "8914": [0, 0.54986, 0, 0, 0.66667],
              "8915": [0, 0.54986, 0, 0, 0.66667],
              "8916": [0, 0.69224, 0, 0, 0.66667],
              "8918": [0.0391, 0.5391, 0, 0, 0.77778],
              "8919": [0.0391, 0.5391, 0, 0, 0.77778],
              "8920": [0.03517, 0.54986, 0, 0, 1.33334],
              "8921": [0.03517, 0.54986, 0, 0, 1.33334],
              "8922": [0.38569, 0.88569, 0, 0, 0.77778],
              "8923": [0.38569, 0.88569, 0, 0, 0.77778],
              "8926": [0.13667, 0.63667, 0, 0, 0.77778],
              "8927": [0.13667, 0.63667, 0, 0, 0.77778],
              "8928": [0.30274, 0.79383, 0, 0, 0.77778],
              "8929": [0.30274, 0.79383, 0, 0, 0.77778],
              "8934": [0.23222, 0.74111, 0, 0, 0.77778],
              "8935": [0.23222, 0.74111, 0, 0, 0.77778],
              "8936": [0.23222, 0.74111, 0, 0, 0.77778],
              "8937": [0.23222, 0.74111, 0, 0, 0.77778],
              "8938": [0.20576, 0.70576, 0, 0, 0.77778],
              "8939": [0.20576, 0.70576, 0, 0, 0.77778],
              "8940": [0.30274, 0.79383, 0, 0, 0.77778],
              "8941": [0.30274, 0.79383, 0, 0, 0.77778],
              "8994": [0.19444, 0.69224, 0, 0, 0.77778],
              "8995": [0.19444, 0.69224, 0, 0, 0.77778],
              "9416": [0.15559, 0.69224, 0, 0, 0.90222],
              "9484": [0, 0.69224, 0, 0, 0.5],
              "9488": [0, 0.69224, 0, 0, 0.5],
              "9492": [0, 0.37788, 0, 0, 0.5],
              "9496": [0, 0.37788, 0, 0, 0.5],
              "9585": [0.19444, 0.68889, 0, 0, 0.88889],
              "9586": [0.19444, 0.74111, 0, 0, 0.88889],
              "9632": [0, 0.675, 0, 0, 0.77778],
              "9633": [0, 0.675, 0, 0, 0.77778],
              "9650": [0, 0.54986, 0, 0, 0.72222],
              "9651": [0, 0.54986, 0, 0, 0.72222],
              "9654": [0.03517, 0.54986, 0, 0, 0.77778],
              "9660": [0, 0.54986, 0, 0, 0.72222],
              "9661": [0, 0.54986, 0, 0, 0.72222],
              "9664": [0.03517, 0.54986, 0, 0, 0.77778],
              "9674": [0.11111, 0.69224, 0, 0, 0.66667],
              "9733": [0.19444, 0.69224, 0, 0, 0.94445],
              "10003": [0, 0.69224, 0, 0, 0.83334],
              "10016": [0, 0.69224, 0, 0, 0.83334],
              "10731": [0.11111, 0.69224, 0, 0, 0.66667],
              "10846": [0.19444, 0.75583, 0, 0, 0.61111],
              "10877": [0.13667, 0.63667, 0, 0, 0.77778],
              "10878": [0.13667, 0.63667, 0, 0, 0.77778],
              "10885": [0.25583, 0.75583, 0, 0, 0.77778],
              "10886": [0.25583, 0.75583, 0, 0, 0.77778],
              "10887": [0.13597, 0.63597, 0, 0, 0.77778],
              "10888": [0.13597, 0.63597, 0, 0, 0.77778],
              "10889": [0.26167, 0.75726, 0, 0, 0.77778],
              "10890": [0.26167, 0.75726, 0, 0, 0.77778],
              "10891": [0.48256, 0.98256, 0, 0, 0.77778],
              "10892": [0.48256, 0.98256, 0, 0, 0.77778],
              "10901": [0.13667, 0.63667, 0, 0, 0.77778],
              "10902": [0.13667, 0.63667, 0, 0, 0.77778],
              "10933": [0.25142, 0.75726, 0, 0, 0.77778],
              "10934": [0.25142, 0.75726, 0, 0, 0.77778],
              "10935": [0.26167, 0.75726, 0, 0, 0.77778],
              "10936": [0.26167, 0.75726, 0, 0, 0.77778],
              "10937": [0.26167, 0.75726, 0, 0, 0.77778],
              "10938": [0.26167, 0.75726, 0, 0, 0.77778],
              "10949": [0.25583, 0.75583, 0, 0, 0.77778],
              "10950": [0.25583, 0.75583, 0, 0, 0.77778],
              "10955": [0.28481, 0.79383, 0, 0, 0.77778],
              "10956": [0.28481, 0.79383, 0, 0, 0.77778],
              "57350": [0.08167, 0.58167, 0, 0, 0.22222],
              "57351": [0.08167, 0.58167, 0, 0, 0.38889],
              "57352": [0.08167, 0.58167, 0, 0, 0.77778],
              "57353": [0, 0.43056, 0.04028, 0, 0.66667],
              "57356": [0.25142, 0.75726, 0, 0, 0.77778],
              "57357": [0.25142, 0.75726, 0, 0, 0.77778],
              "57358": [0.41951, 0.91951, 0, 0, 0.77778],
              "57359": [0.30274, 0.79383, 0, 0, 0.77778],
              "57360": [0.30274, 0.79383, 0, 0, 0.77778],
              "57361": [0.41951, 0.91951, 0, 0, 0.77778],
              "57366": [0.25142, 0.75726, 0, 0, 0.77778],
              "57367": [0.25142, 0.75726, 0, 0, 0.77778],
              "57368": [0.25142, 0.75726, 0, 0, 0.77778],
              "57369": [0.25142, 0.75726, 0, 0, 0.77778],
              "57370": [0.13597, 0.63597, 0, 0, 0.77778],
              "57371": [0.13597, 0.63597, 0, 0, 0.77778]
            },
            "Caligraphic-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "65": [0, 0.68333, 0, 0.19445, 0.79847],
              "66": [0, 0.68333, 0.03041, 0.13889, 0.65681],
              "67": [0, 0.68333, 0.05834, 0.13889, 0.52653],
              "68": [0, 0.68333, 0.02778, 0.08334, 0.77139],
              "69": [0, 0.68333, 0.08944, 0.11111, 0.52778],
              "70": [0, 0.68333, 0.09931, 0.11111, 0.71875],
              "71": [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
              "72": [0, 0.68333, 965e-5, 0.11111, 0.84452],
              "73": [0, 0.68333, 0.07382, 0, 0.54452],
              "74": [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
              "75": [0, 0.68333, 0.01445, 0.05556, 0.76195],
              "76": [0, 0.68333, 0, 0.13889, 0.68972],
              "77": [0, 0.68333, 0, 0.13889, 1.2009],
              "78": [0, 0.68333, 0.14736, 0.08334, 0.82049],
              "79": [0, 0.68333, 0.02778, 0.11111, 0.79611],
              "80": [0, 0.68333, 0.08222, 0.08334, 0.69556],
              "81": [0.09722, 0.68333, 0, 0.11111, 0.81667],
              "82": [0, 0.68333, 0, 0.08334, 0.8475],
              "83": [0, 0.68333, 0.075, 0.13889, 0.60556],
              "84": [0, 0.68333, 0.25417, 0, 0.54464],
              "85": [0, 0.68333, 0.09931, 0.08334, 0.62583],
              "86": [0, 0.68333, 0.08222, 0, 0.61278],
              "87": [0, 0.68333, 0.08222, 0.08334, 0.98778],
              "88": [0, 0.68333, 0.14643, 0.13889, 0.7133],
              "89": [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
              "90": [0, 0.68333, 0.07944, 0.13889, 0.72473],
              "160": [0, 0, 0, 0, 0.25]
            },
            "Fraktur-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69141, 0, 0, 0.29574],
              "34": [0, 0.69141, 0, 0, 0.21471],
              "38": [0, 0.69141, 0, 0, 0.73786],
              "39": [0, 0.69141, 0, 0, 0.21201],
              "40": [0.24982, 0.74947, 0, 0, 0.38865],
              "41": [0.24982, 0.74947, 0, 0, 0.38865],
              "42": [0, 0.62119, 0, 0, 0.27764],
              "43": [0.08319, 0.58283, 0, 0, 0.75623],
              "44": [0, 0.10803, 0, 0, 0.27764],
              "45": [0.08319, 0.58283, 0, 0, 0.75623],
              "46": [0, 0.10803, 0, 0, 0.27764],
              "47": [0.24982, 0.74947, 0, 0, 0.50181],
              "48": [0, 0.47534, 0, 0, 0.50181],
              "49": [0, 0.47534, 0, 0, 0.50181],
              "50": [0, 0.47534, 0, 0, 0.50181],
              "51": [0.18906, 0.47534, 0, 0, 0.50181],
              "52": [0.18906, 0.47534, 0, 0, 0.50181],
              "53": [0.18906, 0.47534, 0, 0, 0.50181],
              "54": [0, 0.69141, 0, 0, 0.50181],
              "55": [0.18906, 0.47534, 0, 0, 0.50181],
              "56": [0, 0.69141, 0, 0, 0.50181],
              "57": [0.18906, 0.47534, 0, 0, 0.50181],
              "58": [0, 0.47534, 0, 0, 0.21606],
              "59": [0.12604, 0.47534, 0, 0, 0.21606],
              "61": [-0.13099, 0.36866, 0, 0, 0.75623],
              "63": [0, 0.69141, 0, 0, 0.36245],
              "65": [0, 0.69141, 0, 0, 0.7176],
              "66": [0, 0.69141, 0, 0, 0.88397],
              "67": [0, 0.69141, 0, 0, 0.61254],
              "68": [0, 0.69141, 0, 0, 0.83158],
              "69": [0, 0.69141, 0, 0, 0.66278],
              "70": [0.12604, 0.69141, 0, 0, 0.61119],
              "71": [0, 0.69141, 0, 0, 0.78539],
              "72": [0.06302, 0.69141, 0, 0, 0.7203],
              "73": [0, 0.69141, 0, 0, 0.55448],
              "74": [0.12604, 0.69141, 0, 0, 0.55231],
              "75": [0, 0.69141, 0, 0, 0.66845],
              "76": [0, 0.69141, 0, 0, 0.66602],
              "77": [0, 0.69141, 0, 0, 1.04953],
              "78": [0, 0.69141, 0, 0, 0.83212],
              "79": [0, 0.69141, 0, 0, 0.82699],
              "80": [0.18906, 0.69141, 0, 0, 0.82753],
              "81": [0.03781, 0.69141, 0, 0, 0.82699],
              "82": [0, 0.69141, 0, 0, 0.82807],
              "83": [0, 0.69141, 0, 0, 0.82861],
              "84": [0, 0.69141, 0, 0, 0.66899],
              "85": [0, 0.69141, 0, 0, 0.64576],
              "86": [0, 0.69141, 0, 0, 0.83131],
              "87": [0, 0.69141, 0, 0, 1.04602],
              "88": [0, 0.69141, 0, 0, 0.71922],
              "89": [0.18906, 0.69141, 0, 0, 0.83293],
              "90": [0.12604, 0.69141, 0, 0, 0.60201],
              "91": [0.24982, 0.74947, 0, 0, 0.27764],
              "93": [0.24982, 0.74947, 0, 0, 0.27764],
              "94": [0, 0.69141, 0, 0, 0.49965],
              "97": [0, 0.47534, 0, 0, 0.50046],
              "98": [0, 0.69141, 0, 0, 0.51315],
              "99": [0, 0.47534, 0, 0, 0.38946],
              "100": [0, 0.62119, 0, 0, 0.49857],
              "101": [0, 0.47534, 0, 0, 0.40053],
              "102": [0.18906, 0.69141, 0, 0, 0.32626],
              "103": [0.18906, 0.47534, 0, 0, 0.5037],
              "104": [0.18906, 0.69141, 0, 0, 0.52126],
              "105": [0, 0.69141, 0, 0, 0.27899],
              "106": [0, 0.69141, 0, 0, 0.28088],
              "107": [0, 0.69141, 0, 0, 0.38946],
              "108": [0, 0.69141, 0, 0, 0.27953],
              "109": [0, 0.47534, 0, 0, 0.76676],
              "110": [0, 0.47534, 0, 0, 0.52666],
              "111": [0, 0.47534, 0, 0, 0.48885],
              "112": [0.18906, 0.52396, 0, 0, 0.50046],
              "113": [0.18906, 0.47534, 0, 0, 0.48912],
              "114": [0, 0.47534, 0, 0, 0.38919],
              "115": [0, 0.47534, 0, 0, 0.44266],
              "116": [0, 0.62119, 0, 0, 0.33301],
              "117": [0, 0.47534, 0, 0, 0.5172],
              "118": [0, 0.52396, 0, 0, 0.5118],
              "119": [0, 0.52396, 0, 0, 0.77351],
              "120": [0.18906, 0.47534, 0, 0, 0.38865],
              "121": [0.18906, 0.47534, 0, 0, 0.49884],
              "122": [0.18906, 0.47534, 0, 0, 0.39054],
              "160": [0, 0, 0, 0, 0.25],
              "8216": [0, 0.69141, 0, 0, 0.21471],
              "8217": [0, 0.69141, 0, 0, 0.21471],
              "58112": [0, 0.62119, 0, 0, 0.49749],
              "58113": [0, 0.62119, 0, 0, 0.4983],
              "58114": [0.18906, 0.69141, 0, 0, 0.33328],
              "58115": [0.18906, 0.69141, 0, 0, 0.32923],
              "58116": [0.18906, 0.47534, 0, 0, 0.50343],
              "58117": [0, 0.69141, 0, 0, 0.33301],
              "58118": [0, 0.62119, 0, 0, 0.33409],
              "58119": [0, 0.47534, 0, 0, 0.50073]
            },
            "Main-Bold": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0, 0, 0.35],
              "34": [0, 0.69444, 0, 0, 0.60278],
              "35": [0.19444, 0.69444, 0, 0, 0.95833],
              "36": [0.05556, 0.75, 0, 0, 0.575],
              "37": [0.05556, 0.75, 0, 0, 0.95833],
              "38": [0, 0.69444, 0, 0, 0.89444],
              "39": [0, 0.69444, 0, 0, 0.31944],
              "40": [0.25, 0.75, 0, 0, 0.44722],
              "41": [0.25, 0.75, 0, 0, 0.44722],
              "42": [0, 0.75, 0, 0, 0.575],
              "43": [0.13333, 0.63333, 0, 0, 0.89444],
              "44": [0.19444, 0.15556, 0, 0, 0.31944],
              "45": [0, 0.44444, 0, 0, 0.38333],
              "46": [0, 0.15556, 0, 0, 0.31944],
              "47": [0.25, 0.75, 0, 0, 0.575],
              "48": [0, 0.64444, 0, 0, 0.575],
              "49": [0, 0.64444, 0, 0, 0.575],
              "50": [0, 0.64444, 0, 0, 0.575],
              "51": [0, 0.64444, 0, 0, 0.575],
              "52": [0, 0.64444, 0, 0, 0.575],
              "53": [0, 0.64444, 0, 0, 0.575],
              "54": [0, 0.64444, 0, 0, 0.575],
              "55": [0, 0.64444, 0, 0, 0.575],
              "56": [0, 0.64444, 0, 0, 0.575],
              "57": [0, 0.64444, 0, 0, 0.575],
              "58": [0, 0.44444, 0, 0, 0.31944],
              "59": [0.19444, 0.44444, 0, 0, 0.31944],
              "60": [0.08556, 0.58556, 0, 0, 0.89444],
              "61": [-0.10889, 0.39111, 0, 0, 0.89444],
              "62": [0.08556, 0.58556, 0, 0, 0.89444],
              "63": [0, 0.69444, 0, 0, 0.54305],
              "64": [0, 0.69444, 0, 0, 0.89444],
              "65": [0, 0.68611, 0, 0, 0.86944],
              "66": [0, 0.68611, 0, 0, 0.81805],
              "67": [0, 0.68611, 0, 0, 0.83055],
              "68": [0, 0.68611, 0, 0, 0.88194],
              "69": [0, 0.68611, 0, 0, 0.75555],
              "70": [0, 0.68611, 0, 0, 0.72361],
              "71": [0, 0.68611, 0, 0, 0.90416],
              "72": [0, 0.68611, 0, 0, 0.9],
              "73": [0, 0.68611, 0, 0, 0.43611],
              "74": [0, 0.68611, 0, 0, 0.59444],
              "75": [0, 0.68611, 0, 0, 0.90138],
              "76": [0, 0.68611, 0, 0, 0.69166],
              "77": [0, 0.68611, 0, 0, 1.09166],
              "78": [0, 0.68611, 0, 0, 0.9],
              "79": [0, 0.68611, 0, 0, 0.86388],
              "80": [0, 0.68611, 0, 0, 0.78611],
              "81": [0.19444, 0.68611, 0, 0, 0.86388],
              "82": [0, 0.68611, 0, 0, 0.8625],
              "83": [0, 0.68611, 0, 0, 0.63889],
              "84": [0, 0.68611, 0, 0, 0.8],
              "85": [0, 0.68611, 0, 0, 0.88472],
              "86": [0, 0.68611, 0.01597, 0, 0.86944],
              "87": [0, 0.68611, 0.01597, 0, 1.18888],
              "88": [0, 0.68611, 0, 0, 0.86944],
              "89": [0, 0.68611, 0.02875, 0, 0.86944],
              "90": [0, 0.68611, 0, 0, 0.70277],
              "91": [0.25, 0.75, 0, 0, 0.31944],
              "92": [0.25, 0.75, 0, 0, 0.575],
              "93": [0.25, 0.75, 0, 0, 0.31944],
              "94": [0, 0.69444, 0, 0, 0.575],
              "95": [0.31, 0.13444, 0.03194, 0, 0.575],
              "97": [0, 0.44444, 0, 0, 0.55902],
              "98": [0, 0.69444, 0, 0, 0.63889],
              "99": [0, 0.44444, 0, 0, 0.51111],
              "100": [0, 0.69444, 0, 0, 0.63889],
              "101": [0, 0.44444, 0, 0, 0.52708],
              "102": [0, 0.69444, 0.10903, 0, 0.35139],
              "103": [0.19444, 0.44444, 0.01597, 0, 0.575],
              "104": [0, 0.69444, 0, 0, 0.63889],
              "105": [0, 0.69444, 0, 0, 0.31944],
              "106": [0.19444, 0.69444, 0, 0, 0.35139],
              "107": [0, 0.69444, 0, 0, 0.60694],
              "108": [0, 0.69444, 0, 0, 0.31944],
              "109": [0, 0.44444, 0, 0, 0.95833],
              "110": [0, 0.44444, 0, 0, 0.63889],
              "111": [0, 0.44444, 0, 0, 0.575],
              "112": [0.19444, 0.44444, 0, 0, 0.63889],
              "113": [0.19444, 0.44444, 0, 0, 0.60694],
              "114": [0, 0.44444, 0, 0, 0.47361],
              "115": [0, 0.44444, 0, 0, 0.45361],
              "116": [0, 0.63492, 0, 0, 0.44722],
              "117": [0, 0.44444, 0, 0, 0.63889],
              "118": [0, 0.44444, 0.01597, 0, 0.60694],
              "119": [0, 0.44444, 0.01597, 0, 0.83055],
              "120": [0, 0.44444, 0, 0, 0.60694],
              "121": [0.19444, 0.44444, 0.01597, 0, 0.60694],
              "122": [0, 0.44444, 0, 0, 0.51111],
              "123": [0.25, 0.75, 0, 0, 0.575],
              "124": [0.25, 0.75, 0, 0, 0.31944],
              "125": [0.25, 0.75, 0, 0, 0.575],
              "126": [0.35, 0.34444, 0, 0, 0.575],
              "160": [0, 0, 0, 0, 0.25],
              "163": [0, 0.69444, 0, 0, 0.86853],
              "168": [0, 0.69444, 0, 0, 0.575],
              "172": [0, 0.44444, 0, 0, 0.76666],
              "176": [0, 0.69444, 0, 0, 0.86944],
              "177": [0.13333, 0.63333, 0, 0, 0.89444],
              "184": [0.17014, 0, 0, 0, 0.51111],
              "198": [0, 0.68611, 0, 0, 1.04166],
              "215": [0.13333, 0.63333, 0, 0, 0.89444],
              "216": [0.04861, 0.73472, 0, 0, 0.89444],
              "223": [0, 0.69444, 0, 0, 0.59722],
              "230": [0, 0.44444, 0, 0, 0.83055],
              "247": [0.13333, 0.63333, 0, 0, 0.89444],
              "248": [0.09722, 0.54167, 0, 0, 0.575],
              "305": [0, 0.44444, 0, 0, 0.31944],
              "338": [0, 0.68611, 0, 0, 1.16944],
              "339": [0, 0.44444, 0, 0, 0.89444],
              "567": [0.19444, 0.44444, 0, 0, 0.35139],
              "710": [0, 0.69444, 0, 0, 0.575],
              "711": [0, 0.63194, 0, 0, 0.575],
              "713": [0, 0.59611, 0, 0, 0.575],
              "714": [0, 0.69444, 0, 0, 0.575],
              "715": [0, 0.69444, 0, 0, 0.575],
              "728": [0, 0.69444, 0, 0, 0.575],
              "729": [0, 0.69444, 0, 0, 0.31944],
              "730": [0, 0.69444, 0, 0, 0.86944],
              "732": [0, 0.69444, 0, 0, 0.575],
              "733": [0, 0.69444, 0, 0, 0.575],
              "915": [0, 0.68611, 0, 0, 0.69166],
              "916": [0, 0.68611, 0, 0, 0.95833],
              "920": [0, 0.68611, 0, 0, 0.89444],
              "923": [0, 0.68611, 0, 0, 0.80555],
              "926": [0, 0.68611, 0, 0, 0.76666],
              "928": [0, 0.68611, 0, 0, 0.9],
              "931": [0, 0.68611, 0, 0, 0.83055],
              "933": [0, 0.68611, 0, 0, 0.89444],
              "934": [0, 0.68611, 0, 0, 0.83055],
              "936": [0, 0.68611, 0, 0, 0.89444],
              "937": [0, 0.68611, 0, 0, 0.83055],
              "8211": [0, 0.44444, 0.03194, 0, 0.575],
              "8212": [0, 0.44444, 0.03194, 0, 1.14999],
              "8216": [0, 0.69444, 0, 0, 0.31944],
              "8217": [0, 0.69444, 0, 0, 0.31944],
              "8220": [0, 0.69444, 0, 0, 0.60278],
              "8221": [0, 0.69444, 0, 0, 0.60278],
              "8224": [0.19444, 0.69444, 0, 0, 0.51111],
              "8225": [0.19444, 0.69444, 0, 0, 0.51111],
              "8242": [0, 0.55556, 0, 0, 0.34444],
              "8407": [0, 0.72444, 0.15486, 0, 0.575],
              "8463": [0, 0.69444, 0, 0, 0.66759],
              "8465": [0, 0.69444, 0, 0, 0.83055],
              "8467": [0, 0.69444, 0, 0, 0.47361],
              "8472": [0.19444, 0.44444, 0, 0, 0.74027],
              "8476": [0, 0.69444, 0, 0, 0.83055],
              "8501": [0, 0.69444, 0, 0, 0.70277],
              "8592": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8593": [0.19444, 0.69444, 0, 0, 0.575],
              "8594": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8595": [0.19444, 0.69444, 0, 0, 0.575],
              "8596": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8597": [0.25, 0.75, 0, 0, 0.575],
              "8598": [0.19444, 0.69444, 0, 0, 1.14999],
              "8599": [0.19444, 0.69444, 0, 0, 1.14999],
              "8600": [0.19444, 0.69444, 0, 0, 1.14999],
              "8601": [0.19444, 0.69444, 0, 0, 1.14999],
              "8636": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8637": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8640": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8641": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8656": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8657": [0.19444, 0.69444, 0, 0, 0.70277],
              "8658": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8659": [0.19444, 0.69444, 0, 0, 0.70277],
              "8660": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8661": [0.25, 0.75, 0, 0, 0.70277],
              "8704": [0, 0.69444, 0, 0, 0.63889],
              "8706": [0, 0.69444, 0.06389, 0, 0.62847],
              "8707": [0, 0.69444, 0, 0, 0.63889],
              "8709": [0.05556, 0.75, 0, 0, 0.575],
              "8711": [0, 0.68611, 0, 0, 0.95833],
              "8712": [0.08556, 0.58556, 0, 0, 0.76666],
              "8715": [0.08556, 0.58556, 0, 0, 0.76666],
              "8722": [0.13333, 0.63333, 0, 0, 0.89444],
              "8723": [0.13333, 0.63333, 0, 0, 0.89444],
              "8725": [0.25, 0.75, 0, 0, 0.575],
              "8726": [0.25, 0.75, 0, 0, 0.575],
              "8727": [-0.02778, 0.47222, 0, 0, 0.575],
              "8728": [-0.02639, 0.47361, 0, 0, 0.575],
              "8729": [-0.02639, 0.47361, 0, 0, 0.575],
              "8730": [0.18, 0.82, 0, 0, 0.95833],
              "8733": [0, 0.44444, 0, 0, 0.89444],
              "8734": [0, 0.44444, 0, 0, 1.14999],
              "8736": [0, 0.69224, 0, 0, 0.72222],
              "8739": [0.25, 0.75, 0, 0, 0.31944],
              "8741": [0.25, 0.75, 0, 0, 0.575],
              "8743": [0, 0.55556, 0, 0, 0.76666],
              "8744": [0, 0.55556, 0, 0, 0.76666],
              "8745": [0, 0.55556, 0, 0, 0.76666],
              "8746": [0, 0.55556, 0, 0, 0.76666],
              "8747": [0.19444, 0.69444, 0.12778, 0, 0.56875],
              "8764": [-0.10889, 0.39111, 0, 0, 0.89444],
              "8768": [0.19444, 0.69444, 0, 0, 0.31944],
              "8771": [222e-5, 0.50222, 0, 0, 0.89444],
              "8773": [0.027, 0.638, 0, 0, 0.894],
              "8776": [0.02444, 0.52444, 0, 0, 0.89444],
              "8781": [222e-5, 0.50222, 0, 0, 0.89444],
              "8801": [222e-5, 0.50222, 0, 0, 0.89444],
              "8804": [0.19667, 0.69667, 0, 0, 0.89444],
              "8805": [0.19667, 0.69667, 0, 0, 0.89444],
              "8810": [0.08556, 0.58556, 0, 0, 1.14999],
              "8811": [0.08556, 0.58556, 0, 0, 1.14999],
              "8826": [0.08556, 0.58556, 0, 0, 0.89444],
              "8827": [0.08556, 0.58556, 0, 0, 0.89444],
              "8834": [0.08556, 0.58556, 0, 0, 0.89444],
              "8835": [0.08556, 0.58556, 0, 0, 0.89444],
              "8838": [0.19667, 0.69667, 0, 0, 0.89444],
              "8839": [0.19667, 0.69667, 0, 0, 0.89444],
              "8846": [0, 0.55556, 0, 0, 0.76666],
              "8849": [0.19667, 0.69667, 0, 0, 0.89444],
              "8850": [0.19667, 0.69667, 0, 0, 0.89444],
              "8851": [0, 0.55556, 0, 0, 0.76666],
              "8852": [0, 0.55556, 0, 0, 0.76666],
              "8853": [0.13333, 0.63333, 0, 0, 0.89444],
              "8854": [0.13333, 0.63333, 0, 0, 0.89444],
              "8855": [0.13333, 0.63333, 0, 0, 0.89444],
              "8856": [0.13333, 0.63333, 0, 0, 0.89444],
              "8857": [0.13333, 0.63333, 0, 0, 0.89444],
              "8866": [0, 0.69444, 0, 0, 0.70277],
              "8867": [0, 0.69444, 0, 0, 0.70277],
              "8868": [0, 0.69444, 0, 0, 0.89444],
              "8869": [0, 0.69444, 0, 0, 0.89444],
              "8900": [-0.02639, 0.47361, 0, 0, 0.575],
              "8901": [-0.02639, 0.47361, 0, 0, 0.31944],
              "8902": [-0.02778, 0.47222, 0, 0, 0.575],
              "8968": [0.25, 0.75, 0, 0, 0.51111],
              "8969": [0.25, 0.75, 0, 0, 0.51111],
              "8970": [0.25, 0.75, 0, 0, 0.51111],
              "8971": [0.25, 0.75, 0, 0, 0.51111],
              "8994": [-0.13889, 0.36111, 0, 0, 1.14999],
              "8995": [-0.13889, 0.36111, 0, 0, 1.14999],
              "9651": [0.19444, 0.69444, 0, 0, 1.02222],
              "9657": [-0.02778, 0.47222, 0, 0, 0.575],
              "9661": [0.19444, 0.69444, 0, 0, 1.02222],
              "9667": [-0.02778, 0.47222, 0, 0, 0.575],
              "9711": [0.19444, 0.69444, 0, 0, 1.14999],
              "9824": [0.12963, 0.69444, 0, 0, 0.89444],
              "9825": [0.12963, 0.69444, 0, 0, 0.89444],
              "9826": [0.12963, 0.69444, 0, 0, 0.89444],
              "9827": [0.12963, 0.69444, 0, 0, 0.89444],
              "9837": [0, 0.75, 0, 0, 0.44722],
              "9838": [0.19444, 0.69444, 0, 0, 0.44722],
              "9839": [0.19444, 0.69444, 0, 0, 0.44722],
              "10216": [0.25, 0.75, 0, 0, 0.44722],
              "10217": [0.25, 0.75, 0, 0, 0.44722],
              "10815": [0, 0.68611, 0, 0, 0.9],
              "10927": [0.19667, 0.69667, 0, 0, 0.89444],
              "10928": [0.19667, 0.69667, 0, 0, 0.89444],
              "57376": [0.19444, 0.69444, 0, 0, 0]
            },
            "Main-BoldItalic": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0.11417, 0, 0.38611],
              "34": [0, 0.69444, 0.07939, 0, 0.62055],
              "35": [0.19444, 0.69444, 0.06833, 0, 0.94444],
              "37": [0.05556, 0.75, 0.12861, 0, 0.94444],
              "38": [0, 0.69444, 0.08528, 0, 0.88555],
              "39": [0, 0.69444, 0.12945, 0, 0.35555],
              "40": [0.25, 0.75, 0.15806, 0, 0.47333],
              "41": [0.25, 0.75, 0.03306, 0, 0.47333],
              "42": [0, 0.75, 0.14333, 0, 0.59111],
              "43": [0.10333, 0.60333, 0.03306, 0, 0.88555],
              "44": [0.19444, 0.14722, 0, 0, 0.35555],
              "45": [0, 0.44444, 0.02611, 0, 0.41444],
              "46": [0, 0.14722, 0, 0, 0.35555],
              "47": [0.25, 0.75, 0.15806, 0, 0.59111],
              "48": [0, 0.64444, 0.13167, 0, 0.59111],
              "49": [0, 0.64444, 0.13167, 0, 0.59111],
              "50": [0, 0.64444, 0.13167, 0, 0.59111],
              "51": [0, 0.64444, 0.13167, 0, 0.59111],
              "52": [0.19444, 0.64444, 0.13167, 0, 0.59111],
              "53": [0, 0.64444, 0.13167, 0, 0.59111],
              "54": [0, 0.64444, 0.13167, 0, 0.59111],
              "55": [0.19444, 0.64444, 0.13167, 0, 0.59111],
              "56": [0, 0.64444, 0.13167, 0, 0.59111],
              "57": [0, 0.64444, 0.13167, 0, 0.59111],
              "58": [0, 0.44444, 0.06695, 0, 0.35555],
              "59": [0.19444, 0.44444, 0.06695, 0, 0.35555],
              "61": [-0.10889, 0.39111, 0.06833, 0, 0.88555],
              "63": [0, 0.69444, 0.11472, 0, 0.59111],
              "64": [0, 0.69444, 0.09208, 0, 0.88555],
              "65": [0, 0.68611, 0, 0, 0.86555],
              "66": [0, 0.68611, 0.0992, 0, 0.81666],
              "67": [0, 0.68611, 0.14208, 0, 0.82666],
              "68": [0, 0.68611, 0.09062, 0, 0.87555],
              "69": [0, 0.68611, 0.11431, 0, 0.75666],
              "70": [0, 0.68611, 0.12903, 0, 0.72722],
              "71": [0, 0.68611, 0.07347, 0, 0.89527],
              "72": [0, 0.68611, 0.17208, 0, 0.8961],
              "73": [0, 0.68611, 0.15681, 0, 0.47166],
              "74": [0, 0.68611, 0.145, 0, 0.61055],
              "75": [0, 0.68611, 0.14208, 0, 0.89499],
              "76": [0, 0.68611, 0, 0, 0.69777],
              "77": [0, 0.68611, 0.17208, 0, 1.07277],
              "78": [0, 0.68611, 0.17208, 0, 0.8961],
              "79": [0, 0.68611, 0.09062, 0, 0.85499],
              "80": [0, 0.68611, 0.0992, 0, 0.78721],
              "81": [0.19444, 0.68611, 0.09062, 0, 0.85499],
              "82": [0, 0.68611, 0.02559, 0, 0.85944],
              "83": [0, 0.68611, 0.11264, 0, 0.64999],
              "84": [0, 0.68611, 0.12903, 0, 0.7961],
              "85": [0, 0.68611, 0.17208, 0, 0.88083],
              "86": [0, 0.68611, 0.18625, 0, 0.86555],
              "87": [0, 0.68611, 0.18625, 0, 1.15999],
              "88": [0, 0.68611, 0.15681, 0, 0.86555],
              "89": [0, 0.68611, 0.19803, 0, 0.86555],
              "90": [0, 0.68611, 0.14208, 0, 0.70888],
              "91": [0.25, 0.75, 0.1875, 0, 0.35611],
              "93": [0.25, 0.75, 0.09972, 0, 0.35611],
              "94": [0, 0.69444, 0.06709, 0, 0.59111],
              "95": [0.31, 0.13444, 0.09811, 0, 0.59111],
              "97": [0, 0.44444, 0.09426, 0, 0.59111],
              "98": [0, 0.69444, 0.07861, 0, 0.53222],
              "99": [0, 0.44444, 0.05222, 0, 0.53222],
              "100": [0, 0.69444, 0.10861, 0, 0.59111],
              "101": [0, 0.44444, 0.085, 0, 0.53222],
              "102": [0.19444, 0.69444, 0.21778, 0, 0.4],
              "103": [0.19444, 0.44444, 0.105, 0, 0.53222],
              "104": [0, 0.69444, 0.09426, 0, 0.59111],
              "105": [0, 0.69326, 0.11387, 0, 0.35555],
              "106": [0.19444, 0.69326, 0.1672, 0, 0.35555],
              "107": [0, 0.69444, 0.11111, 0, 0.53222],
              "108": [0, 0.69444, 0.10861, 0, 0.29666],
              "109": [0, 0.44444, 0.09426, 0, 0.94444],
              "110": [0, 0.44444, 0.09426, 0, 0.64999],
              "111": [0, 0.44444, 0.07861, 0, 0.59111],
              "112": [0.19444, 0.44444, 0.07861, 0, 0.59111],
              "113": [0.19444, 0.44444, 0.105, 0, 0.53222],
              "114": [0, 0.44444, 0.11111, 0, 0.50167],
              "115": [0, 0.44444, 0.08167, 0, 0.48694],
              "116": [0, 0.63492, 0.09639, 0, 0.385],
              "117": [0, 0.44444, 0.09426, 0, 0.62055],
              "118": [0, 0.44444, 0.11111, 0, 0.53222],
              "119": [0, 0.44444, 0.11111, 0, 0.76777],
              "120": [0, 0.44444, 0.12583, 0, 0.56055],
              "121": [0.19444, 0.44444, 0.105, 0, 0.56166],
              "122": [0, 0.44444, 0.13889, 0, 0.49055],
              "126": [0.35, 0.34444, 0.11472, 0, 0.59111],
              "160": [0, 0, 0, 0, 0.25],
              "168": [0, 0.69444, 0.11473, 0, 0.59111],
              "176": [0, 0.69444, 0, 0, 0.94888],
              "184": [0.17014, 0, 0, 0, 0.53222],
              "198": [0, 0.68611, 0.11431, 0, 1.02277],
              "216": [0.04861, 0.73472, 0.09062, 0, 0.88555],
              "223": [0.19444, 0.69444, 0.09736, 0, 0.665],
              "230": [0, 0.44444, 0.085, 0, 0.82666],
              "248": [0.09722, 0.54167, 0.09458, 0, 0.59111],
              "305": [0, 0.44444, 0.09426, 0, 0.35555],
              "338": [0, 0.68611, 0.11431, 0, 1.14054],
              "339": [0, 0.44444, 0.085, 0, 0.82666],
              "567": [0.19444, 0.44444, 0.04611, 0, 0.385],
              "710": [0, 0.69444, 0.06709, 0, 0.59111],
              "711": [0, 0.63194, 0.08271, 0, 0.59111],
              "713": [0, 0.59444, 0.10444, 0, 0.59111],
              "714": [0, 0.69444, 0.08528, 0, 0.59111],
              "715": [0, 0.69444, 0, 0, 0.59111],
              "728": [0, 0.69444, 0.10333, 0, 0.59111],
              "729": [0, 0.69444, 0.12945, 0, 0.35555],
              "730": [0, 0.69444, 0, 0, 0.94888],
              "732": [0, 0.69444, 0.11472, 0, 0.59111],
              "733": [0, 0.69444, 0.11472, 0, 0.59111],
              "915": [0, 0.68611, 0.12903, 0, 0.69777],
              "916": [0, 0.68611, 0, 0, 0.94444],
              "920": [0, 0.68611, 0.09062, 0, 0.88555],
              "923": [0, 0.68611, 0, 0, 0.80666],
              "926": [0, 0.68611, 0.15092, 0, 0.76777],
              "928": [0, 0.68611, 0.17208, 0, 0.8961],
              "931": [0, 0.68611, 0.11431, 0, 0.82666],
              "933": [0, 0.68611, 0.10778, 0, 0.88555],
              "934": [0, 0.68611, 0.05632, 0, 0.82666],
              "936": [0, 0.68611, 0.10778, 0, 0.88555],
              "937": [0, 0.68611, 0.0992, 0, 0.82666],
              "8211": [0, 0.44444, 0.09811, 0, 0.59111],
              "8212": [0, 0.44444, 0.09811, 0, 1.18221],
              "8216": [0, 0.69444, 0.12945, 0, 0.35555],
              "8217": [0, 0.69444, 0.12945, 0, 0.35555],
              "8220": [0, 0.69444, 0.16772, 0, 0.62055],
              "8221": [0, 0.69444, 0.07939, 0, 0.62055]
            },
            "Main-Italic": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0.12417, 0, 0.30667],
              "34": [0, 0.69444, 0.06961, 0, 0.51444],
              "35": [0.19444, 0.69444, 0.06616, 0, 0.81777],
              "37": [0.05556, 0.75, 0.13639, 0, 0.81777],
              "38": [0, 0.69444, 0.09694, 0, 0.76666],
              "39": [0, 0.69444, 0.12417, 0, 0.30667],
              "40": [0.25, 0.75, 0.16194, 0, 0.40889],
              "41": [0.25, 0.75, 0.03694, 0, 0.40889],
              "42": [0, 0.75, 0.14917, 0, 0.51111],
              "43": [0.05667, 0.56167, 0.03694, 0, 0.76666],
              "44": [0.19444, 0.10556, 0, 0, 0.30667],
              "45": [0, 0.43056, 0.02826, 0, 0.35778],
              "46": [0, 0.10556, 0, 0, 0.30667],
              "47": [0.25, 0.75, 0.16194, 0, 0.51111],
              "48": [0, 0.64444, 0.13556, 0, 0.51111],
              "49": [0, 0.64444, 0.13556, 0, 0.51111],
              "50": [0, 0.64444, 0.13556, 0, 0.51111],
              "51": [0, 0.64444, 0.13556, 0, 0.51111],
              "52": [0.19444, 0.64444, 0.13556, 0, 0.51111],
              "53": [0, 0.64444, 0.13556, 0, 0.51111],
              "54": [0, 0.64444, 0.13556, 0, 0.51111],
              "55": [0.19444, 0.64444, 0.13556, 0, 0.51111],
              "56": [0, 0.64444, 0.13556, 0, 0.51111],
              "57": [0, 0.64444, 0.13556, 0, 0.51111],
              "58": [0, 0.43056, 0.0582, 0, 0.30667],
              "59": [0.19444, 0.43056, 0.0582, 0, 0.30667],
              "61": [-0.13313, 0.36687, 0.06616, 0, 0.76666],
              "63": [0, 0.69444, 0.1225, 0, 0.51111],
              "64": [0, 0.69444, 0.09597, 0, 0.76666],
              "65": [0, 0.68333, 0, 0, 0.74333],
              "66": [0, 0.68333, 0.10257, 0, 0.70389],
              "67": [0, 0.68333, 0.14528, 0, 0.71555],
              "68": [0, 0.68333, 0.09403, 0, 0.755],
              "69": [0, 0.68333, 0.12028, 0, 0.67833],
              "70": [0, 0.68333, 0.13305, 0, 0.65277],
              "71": [0, 0.68333, 0.08722, 0, 0.77361],
              "72": [0, 0.68333, 0.16389, 0, 0.74333],
              "73": [0, 0.68333, 0.15806, 0, 0.38555],
              "74": [0, 0.68333, 0.14028, 0, 0.525],
              "75": [0, 0.68333, 0.14528, 0, 0.76888],
              "76": [0, 0.68333, 0, 0, 0.62722],
              "77": [0, 0.68333, 0.16389, 0, 0.89666],
              "78": [0, 0.68333, 0.16389, 0, 0.74333],
              "79": [0, 0.68333, 0.09403, 0, 0.76666],
              "80": [0, 0.68333, 0.10257, 0, 0.67833],
              "81": [0.19444, 0.68333, 0.09403, 0, 0.76666],
              "82": [0, 0.68333, 0.03868, 0, 0.72944],
              "83": [0, 0.68333, 0.11972, 0, 0.56222],
              "84": [0, 0.68333, 0.13305, 0, 0.71555],
              "85": [0, 0.68333, 0.16389, 0, 0.74333],
              "86": [0, 0.68333, 0.18361, 0, 0.74333],
              "87": [0, 0.68333, 0.18361, 0, 0.99888],
              "88": [0, 0.68333, 0.15806, 0, 0.74333],
              "89": [0, 0.68333, 0.19383, 0, 0.74333],
              "90": [0, 0.68333, 0.14528, 0, 0.61333],
              "91": [0.25, 0.75, 0.1875, 0, 0.30667],
              "93": [0.25, 0.75, 0.10528, 0, 0.30667],
              "94": [0, 0.69444, 0.06646, 0, 0.51111],
              "95": [0.31, 0.12056, 0.09208, 0, 0.51111],
              "97": [0, 0.43056, 0.07671, 0, 0.51111],
              "98": [0, 0.69444, 0.06312, 0, 0.46],
              "99": [0, 0.43056, 0.05653, 0, 0.46],
              "100": [0, 0.69444, 0.10333, 0, 0.51111],
              "101": [0, 0.43056, 0.07514, 0, 0.46],
              "102": [0.19444, 0.69444, 0.21194, 0, 0.30667],
              "103": [0.19444, 0.43056, 0.08847, 0, 0.46],
              "104": [0, 0.69444, 0.07671, 0, 0.51111],
              "105": [0, 0.65536, 0.1019, 0, 0.30667],
              "106": [0.19444, 0.65536, 0.14467, 0, 0.30667],
              "107": [0, 0.69444, 0.10764, 0, 0.46],
              "108": [0, 0.69444, 0.10333, 0, 0.25555],
              "109": [0, 0.43056, 0.07671, 0, 0.81777],
              "110": [0, 0.43056, 0.07671, 0, 0.56222],
              "111": [0, 0.43056, 0.06312, 0, 0.51111],
              "112": [0.19444, 0.43056, 0.06312, 0, 0.51111],
              "113": [0.19444, 0.43056, 0.08847, 0, 0.46],
              "114": [0, 0.43056, 0.10764, 0, 0.42166],
              "115": [0, 0.43056, 0.08208, 0, 0.40889],
              "116": [0, 0.61508, 0.09486, 0, 0.33222],
              "117": [0, 0.43056, 0.07671, 0, 0.53666],
              "118": [0, 0.43056, 0.10764, 0, 0.46],
              "119": [0, 0.43056, 0.10764, 0, 0.66444],
              "120": [0, 0.43056, 0.12042, 0, 0.46389],
              "121": [0.19444, 0.43056, 0.08847, 0, 0.48555],
              "122": [0, 0.43056, 0.12292, 0, 0.40889],
              "126": [0.35, 0.31786, 0.11585, 0, 0.51111],
              "160": [0, 0, 0, 0, 0.25],
              "168": [0, 0.66786, 0.10474, 0, 0.51111],
              "176": [0, 0.69444, 0, 0, 0.83129],
              "184": [0.17014, 0, 0, 0, 0.46],
              "198": [0, 0.68333, 0.12028, 0, 0.88277],
              "216": [0.04861, 0.73194, 0.09403, 0, 0.76666],
              "223": [0.19444, 0.69444, 0.10514, 0, 0.53666],
              "230": [0, 0.43056, 0.07514, 0, 0.71555],
              "248": [0.09722, 0.52778, 0.09194, 0, 0.51111],
              "338": [0, 0.68333, 0.12028, 0, 0.98499],
              "339": [0, 0.43056, 0.07514, 0, 0.71555],
              "710": [0, 0.69444, 0.06646, 0, 0.51111],
              "711": [0, 0.62847, 0.08295, 0, 0.51111],
              "713": [0, 0.56167, 0.10333, 0, 0.51111],
              "714": [0, 0.69444, 0.09694, 0, 0.51111],
              "715": [0, 0.69444, 0, 0, 0.51111],
              "728": [0, 0.69444, 0.10806, 0, 0.51111],
              "729": [0, 0.66786, 0.11752, 0, 0.30667],
              "730": [0, 0.69444, 0, 0, 0.83129],
              "732": [0, 0.66786, 0.11585, 0, 0.51111],
              "733": [0, 0.69444, 0.1225, 0, 0.51111],
              "915": [0, 0.68333, 0.13305, 0, 0.62722],
              "916": [0, 0.68333, 0, 0, 0.81777],
              "920": [0, 0.68333, 0.09403, 0, 0.76666],
              "923": [0, 0.68333, 0, 0, 0.69222],
              "926": [0, 0.68333, 0.15294, 0, 0.66444],
              "928": [0, 0.68333, 0.16389, 0, 0.74333],
              "931": [0, 0.68333, 0.12028, 0, 0.71555],
              "933": [0, 0.68333, 0.11111, 0, 0.76666],
              "934": [0, 0.68333, 0.05986, 0, 0.71555],
              "936": [0, 0.68333, 0.11111, 0, 0.76666],
              "937": [0, 0.68333, 0.10257, 0, 0.71555],
              "8211": [0, 0.43056, 0.09208, 0, 0.51111],
              "8212": [0, 0.43056, 0.09208, 0, 1.02222],
              "8216": [0, 0.69444, 0.12417, 0, 0.30667],
              "8217": [0, 0.69444, 0.12417, 0, 0.30667],
              "8220": [0, 0.69444, 0.1685, 0, 0.51444],
              "8221": [0, 0.69444, 0.06961, 0, 0.51444],
              "8463": [0, 0.68889, 0, 0, 0.54028]
            },
            "Main-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0, 0, 0.27778],
              "34": [0, 0.69444, 0, 0, 0.5],
              "35": [0.19444, 0.69444, 0, 0, 0.83334],
              "36": [0.05556, 0.75, 0, 0, 0.5],
              "37": [0.05556, 0.75, 0, 0, 0.83334],
              "38": [0, 0.69444, 0, 0, 0.77778],
              "39": [0, 0.69444, 0, 0, 0.27778],
              "40": [0.25, 0.75, 0, 0, 0.38889],
              "41": [0.25, 0.75, 0, 0, 0.38889],
              "42": [0, 0.75, 0, 0, 0.5],
              "43": [0.08333, 0.58333, 0, 0, 0.77778],
              "44": [0.19444, 0.10556, 0, 0, 0.27778],
              "45": [0, 0.43056, 0, 0, 0.33333],
              "46": [0, 0.10556, 0, 0, 0.27778],
              "47": [0.25, 0.75, 0, 0, 0.5],
              "48": [0, 0.64444, 0, 0, 0.5],
              "49": [0, 0.64444, 0, 0, 0.5],
              "50": [0, 0.64444, 0, 0, 0.5],
              "51": [0, 0.64444, 0, 0, 0.5],
              "52": [0, 0.64444, 0, 0, 0.5],
              "53": [0, 0.64444, 0, 0, 0.5],
              "54": [0, 0.64444, 0, 0, 0.5],
              "55": [0, 0.64444, 0, 0, 0.5],
              "56": [0, 0.64444, 0, 0, 0.5],
              "57": [0, 0.64444, 0, 0, 0.5],
              "58": [0, 0.43056, 0, 0, 0.27778],
              "59": [0.19444, 0.43056, 0, 0, 0.27778],
              "60": [0.0391, 0.5391, 0, 0, 0.77778],
              "61": [-0.13313, 0.36687, 0, 0, 0.77778],
              "62": [0.0391, 0.5391, 0, 0, 0.77778],
              "63": [0, 0.69444, 0, 0, 0.47222],
              "64": [0, 0.69444, 0, 0, 0.77778],
              "65": [0, 0.68333, 0, 0, 0.75],
              "66": [0, 0.68333, 0, 0, 0.70834],
              "67": [0, 0.68333, 0, 0, 0.72222],
              "68": [0, 0.68333, 0, 0, 0.76389],
              "69": [0, 0.68333, 0, 0, 0.68056],
              "70": [0, 0.68333, 0, 0, 0.65278],
              "71": [0, 0.68333, 0, 0, 0.78472],
              "72": [0, 0.68333, 0, 0, 0.75],
              "73": [0, 0.68333, 0, 0, 0.36111],
              "74": [0, 0.68333, 0, 0, 0.51389],
              "75": [0, 0.68333, 0, 0, 0.77778],
              "76": [0, 0.68333, 0, 0, 0.625],
              "77": [0, 0.68333, 0, 0, 0.91667],
              "78": [0, 0.68333, 0, 0, 0.75],
              "79": [0, 0.68333, 0, 0, 0.77778],
              "80": [0, 0.68333, 0, 0, 0.68056],
              "81": [0.19444, 0.68333, 0, 0, 0.77778],
              "82": [0, 0.68333, 0, 0, 0.73611],
              "83": [0, 0.68333, 0, 0, 0.55556],
              "84": [0, 0.68333, 0, 0, 0.72222],
              "85": [0, 0.68333, 0, 0, 0.75],
              "86": [0, 0.68333, 0.01389, 0, 0.75],
              "87": [0, 0.68333, 0.01389, 0, 1.02778],
              "88": [0, 0.68333, 0, 0, 0.75],
              "89": [0, 0.68333, 0.025, 0, 0.75],
              "90": [0, 0.68333, 0, 0, 0.61111],
              "91": [0.25, 0.75, 0, 0, 0.27778],
              "92": [0.25, 0.75, 0, 0, 0.5],
              "93": [0.25, 0.75, 0, 0, 0.27778],
              "94": [0, 0.69444, 0, 0, 0.5],
              "95": [0.31, 0.12056, 0.02778, 0, 0.5],
              "97": [0, 0.43056, 0, 0, 0.5],
              "98": [0, 0.69444, 0, 0, 0.55556],
              "99": [0, 0.43056, 0, 0, 0.44445],
              "100": [0, 0.69444, 0, 0, 0.55556],
              "101": [0, 0.43056, 0, 0, 0.44445],
              "102": [0, 0.69444, 0.07778, 0, 0.30556],
              "103": [0.19444, 0.43056, 0.01389, 0, 0.5],
              "104": [0, 0.69444, 0, 0, 0.55556],
              "105": [0, 0.66786, 0, 0, 0.27778],
              "106": [0.19444, 0.66786, 0, 0, 0.30556],
              "107": [0, 0.69444, 0, 0, 0.52778],
              "108": [0, 0.69444, 0, 0, 0.27778],
              "109": [0, 0.43056, 0, 0, 0.83334],
              "110": [0, 0.43056, 0, 0, 0.55556],
              "111": [0, 0.43056, 0, 0, 0.5],
              "112": [0.19444, 0.43056, 0, 0, 0.55556],
              "113": [0.19444, 0.43056, 0, 0, 0.52778],
              "114": [0, 0.43056, 0, 0, 0.39167],
              "115": [0, 0.43056, 0, 0, 0.39445],
              "116": [0, 0.61508, 0, 0, 0.38889],
              "117": [0, 0.43056, 0, 0, 0.55556],
              "118": [0, 0.43056, 0.01389, 0, 0.52778],
              "119": [0, 0.43056, 0.01389, 0, 0.72222],
              "120": [0, 0.43056, 0, 0, 0.52778],
              "121": [0.19444, 0.43056, 0.01389, 0, 0.52778],
              "122": [0, 0.43056, 0, 0, 0.44445],
              "123": [0.25, 0.75, 0, 0, 0.5],
              "124": [0.25, 0.75, 0, 0, 0.27778],
              "125": [0.25, 0.75, 0, 0, 0.5],
              "126": [0.35, 0.31786, 0, 0, 0.5],
              "160": [0, 0, 0, 0, 0.25],
              "163": [0, 0.69444, 0, 0, 0.76909],
              "167": [0.19444, 0.69444, 0, 0, 0.44445],
              "168": [0, 0.66786, 0, 0, 0.5],
              "172": [0, 0.43056, 0, 0, 0.66667],
              "176": [0, 0.69444, 0, 0, 0.75],
              "177": [0.08333, 0.58333, 0, 0, 0.77778],
              "182": [0.19444, 0.69444, 0, 0, 0.61111],
              "184": [0.17014, 0, 0, 0, 0.44445],
              "198": [0, 0.68333, 0, 0, 0.90278],
              "215": [0.08333, 0.58333, 0, 0, 0.77778],
              "216": [0.04861, 0.73194, 0, 0, 0.77778],
              "223": [0, 0.69444, 0, 0, 0.5],
              "230": [0, 0.43056, 0, 0, 0.72222],
              "247": [0.08333, 0.58333, 0, 0, 0.77778],
              "248": [0.09722, 0.52778, 0, 0, 0.5],
              "305": [0, 0.43056, 0, 0, 0.27778],
              "338": [0, 0.68333, 0, 0, 1.01389],
              "339": [0, 0.43056, 0, 0, 0.77778],
              "567": [0.19444, 0.43056, 0, 0, 0.30556],
              "710": [0, 0.69444, 0, 0, 0.5],
              "711": [0, 0.62847, 0, 0, 0.5],
              "713": [0, 0.56778, 0, 0, 0.5],
              "714": [0, 0.69444, 0, 0, 0.5],
              "715": [0, 0.69444, 0, 0, 0.5],
              "728": [0, 0.69444, 0, 0, 0.5],
              "729": [0, 0.66786, 0, 0, 0.27778],
              "730": [0, 0.69444, 0, 0, 0.75],
              "732": [0, 0.66786, 0, 0, 0.5],
              "733": [0, 0.69444, 0, 0, 0.5],
              "915": [0, 0.68333, 0, 0, 0.625],
              "916": [0, 0.68333, 0, 0, 0.83334],
              "920": [0, 0.68333, 0, 0, 0.77778],
              "923": [0, 0.68333, 0, 0, 0.69445],
              "926": [0, 0.68333, 0, 0, 0.66667],
              "928": [0, 0.68333, 0, 0, 0.75],
              "931": [0, 0.68333, 0, 0, 0.72222],
              "933": [0, 0.68333, 0, 0, 0.77778],
              "934": [0, 0.68333, 0, 0, 0.72222],
              "936": [0, 0.68333, 0, 0, 0.77778],
              "937": [0, 0.68333, 0, 0, 0.72222],
              "8211": [0, 0.43056, 0.02778, 0, 0.5],
              "8212": [0, 0.43056, 0.02778, 0, 1],
              "8216": [0, 0.69444, 0, 0, 0.27778],
              "8217": [0, 0.69444, 0, 0, 0.27778],
              "8220": [0, 0.69444, 0, 0, 0.5],
              "8221": [0, 0.69444, 0, 0, 0.5],
              "8224": [0.19444, 0.69444, 0, 0, 0.44445],
              "8225": [0.19444, 0.69444, 0, 0, 0.44445],
              "8230": [0, 0.123, 0, 0, 1.172],
              "8242": [0, 0.55556, 0, 0, 0.275],
              "8407": [0, 0.71444, 0.15382, 0, 0.5],
              "8463": [0, 0.68889, 0, 0, 0.54028],
              "8465": [0, 0.69444, 0, 0, 0.72222],
              "8467": [0, 0.69444, 0, 0.11111, 0.41667],
              "8472": [0.19444, 0.43056, 0, 0.11111, 0.63646],
              "8476": [0, 0.69444, 0, 0, 0.72222],
              "8501": [0, 0.69444, 0, 0, 0.61111],
              "8592": [-0.13313, 0.36687, 0, 0, 1],
              "8593": [0.19444, 0.69444, 0, 0, 0.5],
              "8594": [-0.13313, 0.36687, 0, 0, 1],
              "8595": [0.19444, 0.69444, 0, 0, 0.5],
              "8596": [-0.13313, 0.36687, 0, 0, 1],
              "8597": [0.25, 0.75, 0, 0, 0.5],
              "8598": [0.19444, 0.69444, 0, 0, 1],
              "8599": [0.19444, 0.69444, 0, 0, 1],
              "8600": [0.19444, 0.69444, 0, 0, 1],
              "8601": [0.19444, 0.69444, 0, 0, 1],
              "8614": [0.011, 0.511, 0, 0, 1],
              "8617": [0.011, 0.511, 0, 0, 1.126],
              "8618": [0.011, 0.511, 0, 0, 1.126],
              "8636": [-0.13313, 0.36687, 0, 0, 1],
              "8637": [-0.13313, 0.36687, 0, 0, 1],
              "8640": [-0.13313, 0.36687, 0, 0, 1],
              "8641": [-0.13313, 0.36687, 0, 0, 1],
              "8652": [0.011, 0.671, 0, 0, 1],
              "8656": [-0.13313, 0.36687, 0, 0, 1],
              "8657": [0.19444, 0.69444, 0, 0, 0.61111],
              "8658": [-0.13313, 0.36687, 0, 0, 1],
              "8659": [0.19444, 0.69444, 0, 0, 0.61111],
              "8660": [-0.13313, 0.36687, 0, 0, 1],
              "8661": [0.25, 0.75, 0, 0, 0.61111],
              "8704": [0, 0.69444, 0, 0, 0.55556],
              "8706": [0, 0.69444, 0.05556, 0.08334, 0.5309],
              "8707": [0, 0.69444, 0, 0, 0.55556],
              "8709": [0.05556, 0.75, 0, 0, 0.5],
              "8711": [0, 0.68333, 0, 0, 0.83334],
              "8712": [0.0391, 0.5391, 0, 0, 0.66667],
              "8715": [0.0391, 0.5391, 0, 0, 0.66667],
              "8722": [0.08333, 0.58333, 0, 0, 0.77778],
              "8723": [0.08333, 0.58333, 0, 0, 0.77778],
              "8725": [0.25, 0.75, 0, 0, 0.5],
              "8726": [0.25, 0.75, 0, 0, 0.5],
              "8727": [-0.03472, 0.46528, 0, 0, 0.5],
              "8728": [-0.05555, 0.44445, 0, 0, 0.5],
              "8729": [-0.05555, 0.44445, 0, 0, 0.5],
              "8730": [0.2, 0.8, 0, 0, 0.83334],
              "8733": [0, 0.43056, 0, 0, 0.77778],
              "8734": [0, 0.43056, 0, 0, 1],
              "8736": [0, 0.69224, 0, 0, 0.72222],
              "8739": [0.25, 0.75, 0, 0, 0.27778],
              "8741": [0.25, 0.75, 0, 0, 0.5],
              "8743": [0, 0.55556, 0, 0, 0.66667],
              "8744": [0, 0.55556, 0, 0, 0.66667],
              "8745": [0, 0.55556, 0, 0, 0.66667],
              "8746": [0, 0.55556, 0, 0, 0.66667],
              "8747": [0.19444, 0.69444, 0.11111, 0, 0.41667],
              "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
              "8768": [0.19444, 0.69444, 0, 0, 0.27778],
              "8771": [-0.03625, 0.46375, 0, 0, 0.77778],
              "8773": [-0.022, 0.589, 0, 0, 0.778],
              "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
              "8781": [-0.03625, 0.46375, 0, 0, 0.77778],
              "8784": [-0.133, 0.673, 0, 0, 0.778],
              "8801": [-0.03625, 0.46375, 0, 0, 0.77778],
              "8804": [0.13597, 0.63597, 0, 0, 0.77778],
              "8805": [0.13597, 0.63597, 0, 0, 0.77778],
              "8810": [0.0391, 0.5391, 0, 0, 1],
              "8811": [0.0391, 0.5391, 0, 0, 1],
              "8826": [0.0391, 0.5391, 0, 0, 0.77778],
              "8827": [0.0391, 0.5391, 0, 0, 0.77778],
              "8834": [0.0391, 0.5391, 0, 0, 0.77778],
              "8835": [0.0391, 0.5391, 0, 0, 0.77778],
              "8838": [0.13597, 0.63597, 0, 0, 0.77778],
              "8839": [0.13597, 0.63597, 0, 0, 0.77778],
              "8846": [0, 0.55556, 0, 0, 0.66667],
              "8849": [0.13597, 0.63597, 0, 0, 0.77778],
              "8850": [0.13597, 0.63597, 0, 0, 0.77778],
              "8851": [0, 0.55556, 0, 0, 0.66667],
              "8852": [0, 0.55556, 0, 0, 0.66667],
              "8853": [0.08333, 0.58333, 0, 0, 0.77778],
              "8854": [0.08333, 0.58333, 0, 0, 0.77778],
              "8855": [0.08333, 0.58333, 0, 0, 0.77778],
              "8856": [0.08333, 0.58333, 0, 0, 0.77778],
              "8857": [0.08333, 0.58333, 0, 0, 0.77778],
              "8866": [0, 0.69444, 0, 0, 0.61111],
              "8867": [0, 0.69444, 0, 0, 0.61111],
              "8868": [0, 0.69444, 0, 0, 0.77778],
              "8869": [0, 0.69444, 0, 0, 0.77778],
              "8872": [0.249, 0.75, 0, 0, 0.867],
              "8900": [-0.05555, 0.44445, 0, 0, 0.5],
              "8901": [-0.05555, 0.44445, 0, 0, 0.27778],
              "8902": [-0.03472, 0.46528, 0, 0, 0.5],
              "8904": [5e-3, 0.505, 0, 0, 0.9],
              "8942": [0.03, 0.903, 0, 0, 0.278],
              "8943": [-0.19, 0.313, 0, 0, 1.172],
              "8945": [-0.1, 0.823, 0, 0, 1.282],
              "8968": [0.25, 0.75, 0, 0, 0.44445],
              "8969": [0.25, 0.75, 0, 0, 0.44445],
              "8970": [0.25, 0.75, 0, 0, 0.44445],
              "8971": [0.25, 0.75, 0, 0, 0.44445],
              "8994": [-0.14236, 0.35764, 0, 0, 1],
              "8995": [-0.14236, 0.35764, 0, 0, 1],
              "9136": [0.244, 0.744, 0, 0, 0.412],
              "9137": [0.244, 0.745, 0, 0, 0.412],
              "9651": [0.19444, 0.69444, 0, 0, 0.88889],
              "9657": [-0.03472, 0.46528, 0, 0, 0.5],
              "9661": [0.19444, 0.69444, 0, 0, 0.88889],
              "9667": [-0.03472, 0.46528, 0, 0, 0.5],
              "9711": [0.19444, 0.69444, 0, 0, 1],
              "9824": [0.12963, 0.69444, 0, 0, 0.77778],
              "9825": [0.12963, 0.69444, 0, 0, 0.77778],
              "9826": [0.12963, 0.69444, 0, 0, 0.77778],
              "9827": [0.12963, 0.69444, 0, 0, 0.77778],
              "9837": [0, 0.75, 0, 0, 0.38889],
              "9838": [0.19444, 0.69444, 0, 0, 0.38889],
              "9839": [0.19444, 0.69444, 0, 0, 0.38889],
              "10216": [0.25, 0.75, 0, 0, 0.38889],
              "10217": [0.25, 0.75, 0, 0, 0.38889],
              "10222": [0.244, 0.744, 0, 0, 0.412],
              "10223": [0.244, 0.745, 0, 0, 0.412],
              "10229": [0.011, 0.511, 0, 0, 1.609],
              "10230": [0.011, 0.511, 0, 0, 1.638],
              "10231": [0.011, 0.511, 0, 0, 1.859],
              "10232": [0.024, 0.525, 0, 0, 1.609],
              "10233": [0.024, 0.525, 0, 0, 1.638],
              "10234": [0.024, 0.525, 0, 0, 1.858],
              "10236": [0.011, 0.511, 0, 0, 1.638],
              "10815": [0, 0.68333, 0, 0, 0.75],
              "10927": [0.13597, 0.63597, 0, 0, 0.77778],
              "10928": [0.13597, 0.63597, 0, 0, 0.77778],
              "57376": [0.19444, 0.69444, 0, 0, 0]
            },
            "Math-BoldItalic": {
              "32": [0, 0, 0, 0, 0.25],
              "48": [0, 0.44444, 0, 0, 0.575],
              "49": [0, 0.44444, 0, 0, 0.575],
              "50": [0, 0.44444, 0, 0, 0.575],
              "51": [0.19444, 0.44444, 0, 0, 0.575],
              "52": [0.19444, 0.44444, 0, 0, 0.575],
              "53": [0.19444, 0.44444, 0, 0, 0.575],
              "54": [0, 0.64444, 0, 0, 0.575],
              "55": [0.19444, 0.44444, 0, 0, 0.575],
              "56": [0, 0.64444, 0, 0, 0.575],
              "57": [0.19444, 0.44444, 0, 0, 0.575],
              "65": [0, 0.68611, 0, 0, 0.86944],
              "66": [0, 0.68611, 0.04835, 0, 0.8664],
              "67": [0, 0.68611, 0.06979, 0, 0.81694],
              "68": [0, 0.68611, 0.03194, 0, 0.93812],
              "69": [0, 0.68611, 0.05451, 0, 0.81007],
              "70": [0, 0.68611, 0.15972, 0, 0.68889],
              "71": [0, 0.68611, 0, 0, 0.88673],
              "72": [0, 0.68611, 0.08229, 0, 0.98229],
              "73": [0, 0.68611, 0.07778, 0, 0.51111],
              "74": [0, 0.68611, 0.10069, 0, 0.63125],
              "75": [0, 0.68611, 0.06979, 0, 0.97118],
              "76": [0, 0.68611, 0, 0, 0.75555],
              "77": [0, 0.68611, 0.11424, 0, 1.14201],
              "78": [0, 0.68611, 0.11424, 0, 0.95034],
              "79": [0, 0.68611, 0.03194, 0, 0.83666],
              "80": [0, 0.68611, 0.15972, 0, 0.72309],
              "81": [0.19444, 0.68611, 0, 0, 0.86861],
              "82": [0, 0.68611, 421e-5, 0, 0.87235],
              "83": [0, 0.68611, 0.05382, 0, 0.69271],
              "84": [0, 0.68611, 0.15972, 0, 0.63663],
              "85": [0, 0.68611, 0.11424, 0, 0.80027],
              "86": [0, 0.68611, 0.25555, 0, 0.67778],
              "87": [0, 0.68611, 0.15972, 0, 1.09305],
              "88": [0, 0.68611, 0.07778, 0, 0.94722],
              "89": [0, 0.68611, 0.25555, 0, 0.67458],
              "90": [0, 0.68611, 0.06979, 0, 0.77257],
              "97": [0, 0.44444, 0, 0, 0.63287],
              "98": [0, 0.69444, 0, 0, 0.52083],
              "99": [0, 0.44444, 0, 0, 0.51342],
              "100": [0, 0.69444, 0, 0, 0.60972],
              "101": [0, 0.44444, 0, 0, 0.55361],
              "102": [0.19444, 0.69444, 0.11042, 0, 0.56806],
              "103": [0.19444, 0.44444, 0.03704, 0, 0.5449],
              "104": [0, 0.69444, 0, 0, 0.66759],
              "105": [0, 0.69326, 0, 0, 0.4048],
              "106": [0.19444, 0.69326, 0.0622, 0, 0.47083],
              "107": [0, 0.69444, 0.01852, 0, 0.6037],
              "108": [0, 0.69444, 88e-4, 0, 0.34815],
              "109": [0, 0.44444, 0, 0, 1.0324],
              "110": [0, 0.44444, 0, 0, 0.71296],
              "111": [0, 0.44444, 0, 0, 0.58472],
              "112": [0.19444, 0.44444, 0, 0, 0.60092],
              "113": [0.19444, 0.44444, 0.03704, 0, 0.54213],
              "114": [0, 0.44444, 0.03194, 0, 0.5287],
              "115": [0, 0.44444, 0, 0, 0.53125],
              "116": [0, 0.63492, 0, 0, 0.41528],
              "117": [0, 0.44444, 0, 0, 0.68102],
              "118": [0, 0.44444, 0.03704, 0, 0.56666],
              "119": [0, 0.44444, 0.02778, 0, 0.83148],
              "120": [0, 0.44444, 0, 0, 0.65903],
              "121": [0.19444, 0.44444, 0.03704, 0, 0.59028],
              "122": [0, 0.44444, 0.04213, 0, 0.55509],
              "160": [0, 0, 0, 0, 0.25],
              "915": [0, 0.68611, 0.15972, 0, 0.65694],
              "916": [0, 0.68611, 0, 0, 0.95833],
              "920": [0, 0.68611, 0.03194, 0, 0.86722],
              "923": [0, 0.68611, 0, 0, 0.80555],
              "926": [0, 0.68611, 0.07458, 0, 0.84125],
              "928": [0, 0.68611, 0.08229, 0, 0.98229],
              "931": [0, 0.68611, 0.05451, 0, 0.88507],
              "933": [0, 0.68611, 0.15972, 0, 0.67083],
              "934": [0, 0.68611, 0, 0, 0.76666],
              "936": [0, 0.68611, 0.11653, 0, 0.71402],
              "937": [0, 0.68611, 0.04835, 0, 0.8789],
              "945": [0, 0.44444, 0, 0, 0.76064],
              "946": [0.19444, 0.69444, 0.03403, 0, 0.65972],
              "947": [0.19444, 0.44444, 0.06389, 0, 0.59003],
              "948": [0, 0.69444, 0.03819, 0, 0.52222],
              "949": [0, 0.44444, 0, 0, 0.52882],
              "950": [0.19444, 0.69444, 0.06215, 0, 0.50833],
              "951": [0.19444, 0.44444, 0.03704, 0, 0.6],
              "952": [0, 0.69444, 0.03194, 0, 0.5618],
              "953": [0, 0.44444, 0, 0, 0.41204],
              "954": [0, 0.44444, 0, 0, 0.66759],
              "955": [0, 0.69444, 0, 0, 0.67083],
              "956": [0.19444, 0.44444, 0, 0, 0.70787],
              "957": [0, 0.44444, 0.06898, 0, 0.57685],
              "958": [0.19444, 0.69444, 0.03021, 0, 0.50833],
              "959": [0, 0.44444, 0, 0, 0.58472],
              "960": [0, 0.44444, 0.03704, 0, 0.68241],
              "961": [0.19444, 0.44444, 0, 0, 0.6118],
              "962": [0.09722, 0.44444, 0.07917, 0, 0.42361],
              "963": [0, 0.44444, 0.03704, 0, 0.68588],
              "964": [0, 0.44444, 0.13472, 0, 0.52083],
              "965": [0, 0.44444, 0.03704, 0, 0.63055],
              "966": [0.19444, 0.44444, 0, 0, 0.74722],
              "967": [0.19444, 0.44444, 0, 0, 0.71805],
              "968": [0.19444, 0.69444, 0.03704, 0, 0.75833],
              "969": [0, 0.44444, 0.03704, 0, 0.71782],
              "977": [0, 0.69444, 0, 0, 0.69155],
              "981": [0.19444, 0.69444, 0, 0, 0.7125],
              "982": [0, 0.44444, 0.03194, 0, 0.975],
              "1009": [0.19444, 0.44444, 0, 0, 0.6118],
              "1013": [0, 0.44444, 0, 0, 0.48333],
              "57649": [0, 0.44444, 0, 0, 0.39352],
              "57911": [0.19444, 0.44444, 0, 0, 0.43889]
            },
            "Math-Italic": {
              "32": [0, 0, 0, 0, 0.25],
              "48": [0, 0.43056, 0, 0, 0.5],
              "49": [0, 0.43056, 0, 0, 0.5],
              "50": [0, 0.43056, 0, 0, 0.5],
              "51": [0.19444, 0.43056, 0, 0, 0.5],
              "52": [0.19444, 0.43056, 0, 0, 0.5],
              "53": [0.19444, 0.43056, 0, 0, 0.5],
              "54": [0, 0.64444, 0, 0, 0.5],
              "55": [0.19444, 0.43056, 0, 0, 0.5],
              "56": [0, 0.64444, 0, 0, 0.5],
              "57": [0.19444, 0.43056, 0, 0, 0.5],
              "65": [0, 0.68333, 0, 0.13889, 0.75],
              "66": [0, 0.68333, 0.05017, 0.08334, 0.75851],
              "67": [0, 0.68333, 0.07153, 0.08334, 0.71472],
              "68": [0, 0.68333, 0.02778, 0.05556, 0.82792],
              "69": [0, 0.68333, 0.05764, 0.08334, 0.7382],
              "70": [0, 0.68333, 0.13889, 0.08334, 0.64306],
              "71": [0, 0.68333, 0, 0.08334, 0.78625],
              "72": [0, 0.68333, 0.08125, 0.05556, 0.83125],
              "73": [0, 0.68333, 0.07847, 0.11111, 0.43958],
              "74": [0, 0.68333, 0.09618, 0.16667, 0.55451],
              "75": [0, 0.68333, 0.07153, 0.05556, 0.84931],
              "76": [0, 0.68333, 0, 0.02778, 0.68056],
              "77": [0, 0.68333, 0.10903, 0.08334, 0.97014],
              "78": [0, 0.68333, 0.10903, 0.08334, 0.80347],
              "79": [0, 0.68333, 0.02778, 0.08334, 0.76278],
              "80": [0, 0.68333, 0.13889, 0.08334, 0.64201],
              "81": [0.19444, 0.68333, 0, 0.08334, 0.79056],
              "82": [0, 0.68333, 773e-5, 0.08334, 0.75929],
              "83": [0, 0.68333, 0.05764, 0.08334, 0.6132],
              "84": [0, 0.68333, 0.13889, 0.08334, 0.58438],
              "85": [0, 0.68333, 0.10903, 0.02778, 0.68278],
              "86": [0, 0.68333, 0.22222, 0, 0.58333],
              "87": [0, 0.68333, 0.13889, 0, 0.94445],
              "88": [0, 0.68333, 0.07847, 0.08334, 0.82847],
              "89": [0, 0.68333, 0.22222, 0, 0.58056],
              "90": [0, 0.68333, 0.07153, 0.08334, 0.68264],
              "97": [0, 0.43056, 0, 0, 0.52859],
              "98": [0, 0.69444, 0, 0, 0.42917],
              "99": [0, 0.43056, 0, 0.05556, 0.43276],
              "100": [0, 0.69444, 0, 0.16667, 0.52049],
              "101": [0, 0.43056, 0, 0.05556, 0.46563],
              "102": [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
              "103": [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
              "104": [0, 0.69444, 0, 0, 0.57616],
              "105": [0, 0.65952, 0, 0, 0.34451],
              "106": [0.19444, 0.65952, 0.05724, 0, 0.41181],
              "107": [0, 0.69444, 0.03148, 0, 0.5206],
              "108": [0, 0.69444, 0.01968, 0.08334, 0.29838],
              "109": [0, 0.43056, 0, 0, 0.87801],
              "110": [0, 0.43056, 0, 0, 0.60023],
              "111": [0, 0.43056, 0, 0.05556, 0.48472],
              "112": [0.19444, 0.43056, 0, 0.08334, 0.50313],
              "113": [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
              "114": [0, 0.43056, 0.02778, 0.05556, 0.45116],
              "115": [0, 0.43056, 0, 0.05556, 0.46875],
              "116": [0, 0.61508, 0, 0.08334, 0.36111],
              "117": [0, 0.43056, 0, 0.02778, 0.57246],
              "118": [0, 0.43056, 0.03588, 0.02778, 0.48472],
              "119": [0, 0.43056, 0.02691, 0.08334, 0.71592],
              "120": [0, 0.43056, 0, 0.02778, 0.57153],
              "121": [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
              "122": [0, 0.43056, 0.04398, 0.05556, 0.46505],
              "160": [0, 0, 0, 0, 0.25],
              "915": [0, 0.68333, 0.13889, 0.08334, 0.61528],
              "916": [0, 0.68333, 0, 0.16667, 0.83334],
              "920": [0, 0.68333, 0.02778, 0.08334, 0.76278],
              "923": [0, 0.68333, 0, 0.16667, 0.69445],
              "926": [0, 0.68333, 0.07569, 0.08334, 0.74236],
              "928": [0, 0.68333, 0.08125, 0.05556, 0.83125],
              "931": [0, 0.68333, 0.05764, 0.08334, 0.77986],
              "933": [0, 0.68333, 0.13889, 0.05556, 0.58333],
              "934": [0, 0.68333, 0, 0.08334, 0.66667],
              "936": [0, 0.68333, 0.11, 0.05556, 0.61222],
              "937": [0, 0.68333, 0.05017, 0.08334, 0.7724],
              "945": [0, 0.43056, 37e-4, 0.02778, 0.6397],
              "946": [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
              "947": [0.19444, 0.43056, 0.05556, 0, 0.51773],
              "948": [0, 0.69444, 0.03785, 0.05556, 0.44444],
              "949": [0, 0.43056, 0, 0.08334, 0.46632],
              "950": [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
              "951": [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
              "952": [0, 0.69444, 0.02778, 0.08334, 0.46944],
              "953": [0, 0.43056, 0, 0.05556, 0.35394],
              "954": [0, 0.43056, 0, 0, 0.57616],
              "955": [0, 0.69444, 0, 0, 0.58334],
              "956": [0.19444, 0.43056, 0, 0.02778, 0.60255],
              "957": [0, 0.43056, 0.06366, 0.02778, 0.49398],
              "958": [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
              "959": [0, 0.43056, 0, 0.05556, 0.48472],
              "960": [0, 0.43056, 0.03588, 0, 0.57003],
              "961": [0.19444, 0.43056, 0, 0.08334, 0.51702],
              "962": [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
              "963": [0, 0.43056, 0.03588, 0, 0.57141],
              "964": [0, 0.43056, 0.1132, 0.02778, 0.43715],
              "965": [0, 0.43056, 0.03588, 0.02778, 0.54028],
              "966": [0.19444, 0.43056, 0, 0.08334, 0.65417],
              "967": [0.19444, 0.43056, 0, 0.05556, 0.62569],
              "968": [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
              "969": [0, 0.43056, 0.03588, 0, 0.62245],
              "977": [0, 0.69444, 0, 0.08334, 0.59144],
              "981": [0.19444, 0.69444, 0, 0.08334, 0.59583],
              "982": [0, 0.43056, 0.02778, 0, 0.82813],
              "1009": [0.19444, 0.43056, 0, 0.08334, 0.51702],
              "1013": [0, 0.43056, 0, 0.05556, 0.4059],
              "57649": [0, 0.43056, 0, 0.02778, 0.32246],
              "57911": [0.19444, 0.43056, 0, 0.08334, 0.38403]
            },
            "SansSerif-Bold": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0, 0, 0.36667],
              "34": [0, 0.69444, 0, 0, 0.55834],
              "35": [0.19444, 0.69444, 0, 0, 0.91667],
              "36": [0.05556, 0.75, 0, 0, 0.55],
              "37": [0.05556, 0.75, 0, 0, 1.02912],
              "38": [0, 0.69444, 0, 0, 0.83056],
              "39": [0, 0.69444, 0, 0, 0.30556],
              "40": [0.25, 0.75, 0, 0, 0.42778],
              "41": [0.25, 0.75, 0, 0, 0.42778],
              "42": [0, 0.75, 0, 0, 0.55],
              "43": [0.11667, 0.61667, 0, 0, 0.85556],
              "44": [0.10556, 0.13056, 0, 0, 0.30556],
              "45": [0, 0.45833, 0, 0, 0.36667],
              "46": [0, 0.13056, 0, 0, 0.30556],
              "47": [0.25, 0.75, 0, 0, 0.55],
              "48": [0, 0.69444, 0, 0, 0.55],
              "49": [0, 0.69444, 0, 0, 0.55],
              "50": [0, 0.69444, 0, 0, 0.55],
              "51": [0, 0.69444, 0, 0, 0.55],
              "52": [0, 0.69444, 0, 0, 0.55],
              "53": [0, 0.69444, 0, 0, 0.55],
              "54": [0, 0.69444, 0, 0, 0.55],
              "55": [0, 0.69444, 0, 0, 0.55],
              "56": [0, 0.69444, 0, 0, 0.55],
              "57": [0, 0.69444, 0, 0, 0.55],
              "58": [0, 0.45833, 0, 0, 0.30556],
              "59": [0.10556, 0.45833, 0, 0, 0.30556],
              "61": [-0.09375, 0.40625, 0, 0, 0.85556],
              "63": [0, 0.69444, 0, 0, 0.51945],
              "64": [0, 0.69444, 0, 0, 0.73334],
              "65": [0, 0.69444, 0, 0, 0.73334],
              "66": [0, 0.69444, 0, 0, 0.73334],
              "67": [0, 0.69444, 0, 0, 0.70278],
              "68": [0, 0.69444, 0, 0, 0.79445],
              "69": [0, 0.69444, 0, 0, 0.64167],
              "70": [0, 0.69444, 0, 0, 0.61111],
              "71": [0, 0.69444, 0, 0, 0.73334],
              "72": [0, 0.69444, 0, 0, 0.79445],
              "73": [0, 0.69444, 0, 0, 0.33056],
              "74": [0, 0.69444, 0, 0, 0.51945],
              "75": [0, 0.69444, 0, 0, 0.76389],
              "76": [0, 0.69444, 0, 0, 0.58056],
              "77": [0, 0.69444, 0, 0, 0.97778],
              "78": [0, 0.69444, 0, 0, 0.79445],
              "79": [0, 0.69444, 0, 0, 0.79445],
              "80": [0, 0.69444, 0, 0, 0.70278],
              "81": [0.10556, 0.69444, 0, 0, 0.79445],
              "82": [0, 0.69444, 0, 0, 0.70278],
              "83": [0, 0.69444, 0, 0, 0.61111],
              "84": [0, 0.69444, 0, 0, 0.73334],
              "85": [0, 0.69444, 0, 0, 0.76389],
              "86": [0, 0.69444, 0.01528, 0, 0.73334],
              "87": [0, 0.69444, 0.01528, 0, 1.03889],
              "88": [0, 0.69444, 0, 0, 0.73334],
              "89": [0, 0.69444, 0.0275, 0, 0.73334],
              "90": [0, 0.69444, 0, 0, 0.67223],
              "91": [0.25, 0.75, 0, 0, 0.34306],
              "93": [0.25, 0.75, 0, 0, 0.34306],
              "94": [0, 0.69444, 0, 0, 0.55],
              "95": [0.35, 0.10833, 0.03056, 0, 0.55],
              "97": [0, 0.45833, 0, 0, 0.525],
              "98": [0, 0.69444, 0, 0, 0.56111],
              "99": [0, 0.45833, 0, 0, 0.48889],
              "100": [0, 0.69444, 0, 0, 0.56111],
              "101": [0, 0.45833, 0, 0, 0.51111],
              "102": [0, 0.69444, 0.07639, 0, 0.33611],
              "103": [0.19444, 0.45833, 0.01528, 0, 0.55],
              "104": [0, 0.69444, 0, 0, 0.56111],
              "105": [0, 0.69444, 0, 0, 0.25556],
              "106": [0.19444, 0.69444, 0, 0, 0.28611],
              "107": [0, 0.69444, 0, 0, 0.53056],
              "108": [0, 0.69444, 0, 0, 0.25556],
              "109": [0, 0.45833, 0, 0, 0.86667],
              "110": [0, 0.45833, 0, 0, 0.56111],
              "111": [0, 0.45833, 0, 0, 0.55],
              "112": [0.19444, 0.45833, 0, 0, 0.56111],
              "113": [0.19444, 0.45833, 0, 0, 0.56111],
              "114": [0, 0.45833, 0.01528, 0, 0.37222],
              "115": [0, 0.45833, 0, 0, 0.42167],
              "116": [0, 0.58929, 0, 0, 0.40417],
              "117": [0, 0.45833, 0, 0, 0.56111],
              "118": [0, 0.45833, 0.01528, 0, 0.5],
              "119": [0, 0.45833, 0.01528, 0, 0.74445],
              "120": [0, 0.45833, 0, 0, 0.5],
              "121": [0.19444, 0.45833, 0.01528, 0, 0.5],
              "122": [0, 0.45833, 0, 0, 0.47639],
              "126": [0.35, 0.34444, 0, 0, 0.55],
              "160": [0, 0, 0, 0, 0.25],
              "168": [0, 0.69444, 0, 0, 0.55],
              "176": [0, 0.69444, 0, 0, 0.73334],
              "180": [0, 0.69444, 0, 0, 0.55],
              "184": [0.17014, 0, 0, 0, 0.48889],
              "305": [0, 0.45833, 0, 0, 0.25556],
              "567": [0.19444, 0.45833, 0, 0, 0.28611],
              "710": [0, 0.69444, 0, 0, 0.55],
              "711": [0, 0.63542, 0, 0, 0.55],
              "713": [0, 0.63778, 0, 0, 0.55],
              "728": [0, 0.69444, 0, 0, 0.55],
              "729": [0, 0.69444, 0, 0, 0.30556],
              "730": [0, 0.69444, 0, 0, 0.73334],
              "732": [0, 0.69444, 0, 0, 0.55],
              "733": [0, 0.69444, 0, 0, 0.55],
              "915": [0, 0.69444, 0, 0, 0.58056],
              "916": [0, 0.69444, 0, 0, 0.91667],
              "920": [0, 0.69444, 0, 0, 0.85556],
              "923": [0, 0.69444, 0, 0, 0.67223],
              "926": [0, 0.69444, 0, 0, 0.73334],
              "928": [0, 0.69444, 0, 0, 0.79445],
              "931": [0, 0.69444, 0, 0, 0.79445],
              "933": [0, 0.69444, 0, 0, 0.85556],
              "934": [0, 0.69444, 0, 0, 0.79445],
              "936": [0, 0.69444, 0, 0, 0.85556],
              "937": [0, 0.69444, 0, 0, 0.79445],
              "8211": [0, 0.45833, 0.03056, 0, 0.55],
              "8212": [0, 0.45833, 0.03056, 0, 1.10001],
              "8216": [0, 0.69444, 0, 0, 0.30556],
              "8217": [0, 0.69444, 0, 0, 0.30556],
              "8220": [0, 0.69444, 0, 0, 0.55834],
              "8221": [0, 0.69444, 0, 0, 0.55834]
            },
            "SansSerif-Italic": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0.05733, 0, 0.31945],
              "34": [0, 0.69444, 316e-5, 0, 0.5],
              "35": [0.19444, 0.69444, 0.05087, 0, 0.83334],
              "36": [0.05556, 0.75, 0.11156, 0, 0.5],
              "37": [0.05556, 0.75, 0.03126, 0, 0.83334],
              "38": [0, 0.69444, 0.03058, 0, 0.75834],
              "39": [0, 0.69444, 0.07816, 0, 0.27778],
              "40": [0.25, 0.75, 0.13164, 0, 0.38889],
              "41": [0.25, 0.75, 0.02536, 0, 0.38889],
              "42": [0, 0.75, 0.11775, 0, 0.5],
              "43": [0.08333, 0.58333, 0.02536, 0, 0.77778],
              "44": [0.125, 0.08333, 0, 0, 0.27778],
              "45": [0, 0.44444, 0.01946, 0, 0.33333],
              "46": [0, 0.08333, 0, 0, 0.27778],
              "47": [0.25, 0.75, 0.13164, 0, 0.5],
              "48": [0, 0.65556, 0.11156, 0, 0.5],
              "49": [0, 0.65556, 0.11156, 0, 0.5],
              "50": [0, 0.65556, 0.11156, 0, 0.5],
              "51": [0, 0.65556, 0.11156, 0, 0.5],
              "52": [0, 0.65556, 0.11156, 0, 0.5],
              "53": [0, 0.65556, 0.11156, 0, 0.5],
              "54": [0, 0.65556, 0.11156, 0, 0.5],
              "55": [0, 0.65556, 0.11156, 0, 0.5],
              "56": [0, 0.65556, 0.11156, 0, 0.5],
              "57": [0, 0.65556, 0.11156, 0, 0.5],
              "58": [0, 0.44444, 0.02502, 0, 0.27778],
              "59": [0.125, 0.44444, 0.02502, 0, 0.27778],
              "61": [-0.13, 0.37, 0.05087, 0, 0.77778],
              "63": [0, 0.69444, 0.11809, 0, 0.47222],
              "64": [0, 0.69444, 0.07555, 0, 0.66667],
              "65": [0, 0.69444, 0, 0, 0.66667],
              "66": [0, 0.69444, 0.08293, 0, 0.66667],
              "67": [0, 0.69444, 0.11983, 0, 0.63889],
              "68": [0, 0.69444, 0.07555, 0, 0.72223],
              "69": [0, 0.69444, 0.11983, 0, 0.59722],
              "70": [0, 0.69444, 0.13372, 0, 0.56945],
              "71": [0, 0.69444, 0.11983, 0, 0.66667],
              "72": [0, 0.69444, 0.08094, 0, 0.70834],
              "73": [0, 0.69444, 0.13372, 0, 0.27778],
              "74": [0, 0.69444, 0.08094, 0, 0.47222],
              "75": [0, 0.69444, 0.11983, 0, 0.69445],
              "76": [0, 0.69444, 0, 0, 0.54167],
              "77": [0, 0.69444, 0.08094, 0, 0.875],
              "78": [0, 0.69444, 0.08094, 0, 0.70834],
              "79": [0, 0.69444, 0.07555, 0, 0.73611],
              "80": [0, 0.69444, 0.08293, 0, 0.63889],
              "81": [0.125, 0.69444, 0.07555, 0, 0.73611],
              "82": [0, 0.69444, 0.08293, 0, 0.64584],
              "83": [0, 0.69444, 0.09205, 0, 0.55556],
              "84": [0, 0.69444, 0.13372, 0, 0.68056],
              "85": [0, 0.69444, 0.08094, 0, 0.6875],
              "86": [0, 0.69444, 0.1615, 0, 0.66667],
              "87": [0, 0.69444, 0.1615, 0, 0.94445],
              "88": [0, 0.69444, 0.13372, 0, 0.66667],
              "89": [0, 0.69444, 0.17261, 0, 0.66667],
              "90": [0, 0.69444, 0.11983, 0, 0.61111],
              "91": [0.25, 0.75, 0.15942, 0, 0.28889],
              "93": [0.25, 0.75, 0.08719, 0, 0.28889],
              "94": [0, 0.69444, 0.0799, 0, 0.5],
              "95": [0.35, 0.09444, 0.08616, 0, 0.5],
              "97": [0, 0.44444, 981e-5, 0, 0.48056],
              "98": [0, 0.69444, 0.03057, 0, 0.51667],
              "99": [0, 0.44444, 0.08336, 0, 0.44445],
              "100": [0, 0.69444, 0.09483, 0, 0.51667],
              "101": [0, 0.44444, 0.06778, 0, 0.44445],
              "102": [0, 0.69444, 0.21705, 0, 0.30556],
              "103": [0.19444, 0.44444, 0.10836, 0, 0.5],
              "104": [0, 0.69444, 0.01778, 0, 0.51667],
              "105": [0, 0.67937, 0.09718, 0, 0.23889],
              "106": [0.19444, 0.67937, 0.09162, 0, 0.26667],
              "107": [0, 0.69444, 0.08336, 0, 0.48889],
              "108": [0, 0.69444, 0.09483, 0, 0.23889],
              "109": [0, 0.44444, 0.01778, 0, 0.79445],
              "110": [0, 0.44444, 0.01778, 0, 0.51667],
              "111": [0, 0.44444, 0.06613, 0, 0.5],
              "112": [0.19444, 0.44444, 0.0389, 0, 0.51667],
              "113": [0.19444, 0.44444, 0.04169, 0, 0.51667],
              "114": [0, 0.44444, 0.10836, 0, 0.34167],
              "115": [0, 0.44444, 0.0778, 0, 0.38333],
              "116": [0, 0.57143, 0.07225, 0, 0.36111],
              "117": [0, 0.44444, 0.04169, 0, 0.51667],
              "118": [0, 0.44444, 0.10836, 0, 0.46111],
              "119": [0, 0.44444, 0.10836, 0, 0.68334],
              "120": [0, 0.44444, 0.09169, 0, 0.46111],
              "121": [0.19444, 0.44444, 0.10836, 0, 0.46111],
              "122": [0, 0.44444, 0.08752, 0, 0.43472],
              "126": [0.35, 0.32659, 0.08826, 0, 0.5],
              "160": [0, 0, 0, 0, 0.25],
              "168": [0, 0.67937, 0.06385, 0, 0.5],
              "176": [0, 0.69444, 0, 0, 0.73752],
              "184": [0.17014, 0, 0, 0, 0.44445],
              "305": [0, 0.44444, 0.04169, 0, 0.23889],
              "567": [0.19444, 0.44444, 0.04169, 0, 0.26667],
              "710": [0, 0.69444, 0.0799, 0, 0.5],
              "711": [0, 0.63194, 0.08432, 0, 0.5],
              "713": [0, 0.60889, 0.08776, 0, 0.5],
              "714": [0, 0.69444, 0.09205, 0, 0.5],
              "715": [0, 0.69444, 0, 0, 0.5],
              "728": [0, 0.69444, 0.09483, 0, 0.5],
              "729": [0, 0.67937, 0.07774, 0, 0.27778],
              "730": [0, 0.69444, 0, 0, 0.73752],
              "732": [0, 0.67659, 0.08826, 0, 0.5],
              "733": [0, 0.69444, 0.09205, 0, 0.5],
              "915": [0, 0.69444, 0.13372, 0, 0.54167],
              "916": [0, 0.69444, 0, 0, 0.83334],
              "920": [0, 0.69444, 0.07555, 0, 0.77778],
              "923": [0, 0.69444, 0, 0, 0.61111],
              "926": [0, 0.69444, 0.12816, 0, 0.66667],
              "928": [0, 0.69444, 0.08094, 0, 0.70834],
              "931": [0, 0.69444, 0.11983, 0, 0.72222],
              "933": [0, 0.69444, 0.09031, 0, 0.77778],
              "934": [0, 0.69444, 0.04603, 0, 0.72222],
              "936": [0, 0.69444, 0.09031, 0, 0.77778],
              "937": [0, 0.69444, 0.08293, 0, 0.72222],
              "8211": [0, 0.44444, 0.08616, 0, 0.5],
              "8212": [0, 0.44444, 0.08616, 0, 1],
              "8216": [0, 0.69444, 0.07816, 0, 0.27778],
              "8217": [0, 0.69444, 0.07816, 0, 0.27778],
              "8220": [0, 0.69444, 0.14205, 0, 0.5],
              "8221": [0, 0.69444, 316e-5, 0, 0.5]
            },
            "SansSerif-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0, 0, 0.31945],
              "34": [0, 0.69444, 0, 0, 0.5],
              "35": [0.19444, 0.69444, 0, 0, 0.83334],
              "36": [0.05556, 0.75, 0, 0, 0.5],
              "37": [0.05556, 0.75, 0, 0, 0.83334],
              "38": [0, 0.69444, 0, 0, 0.75834],
              "39": [0, 0.69444, 0, 0, 0.27778],
              "40": [0.25, 0.75, 0, 0, 0.38889],
              "41": [0.25, 0.75, 0, 0, 0.38889],
              "42": [0, 0.75, 0, 0, 0.5],
              "43": [0.08333, 0.58333, 0, 0, 0.77778],
              "44": [0.125, 0.08333, 0, 0, 0.27778],
              "45": [0, 0.44444, 0, 0, 0.33333],
              "46": [0, 0.08333, 0, 0, 0.27778],
              "47": [0.25, 0.75, 0, 0, 0.5],
              "48": [0, 0.65556, 0, 0, 0.5],
              "49": [0, 0.65556, 0, 0, 0.5],
              "50": [0, 0.65556, 0, 0, 0.5],
              "51": [0, 0.65556, 0, 0, 0.5],
              "52": [0, 0.65556, 0, 0, 0.5],
              "53": [0, 0.65556, 0, 0, 0.5],
              "54": [0, 0.65556, 0, 0, 0.5],
              "55": [0, 0.65556, 0, 0, 0.5],
              "56": [0, 0.65556, 0, 0, 0.5],
              "57": [0, 0.65556, 0, 0, 0.5],
              "58": [0, 0.44444, 0, 0, 0.27778],
              "59": [0.125, 0.44444, 0, 0, 0.27778],
              "61": [-0.13, 0.37, 0, 0, 0.77778],
              "63": [0, 0.69444, 0, 0, 0.47222],
              "64": [0, 0.69444, 0, 0, 0.66667],
              "65": [0, 0.69444, 0, 0, 0.66667],
              "66": [0, 0.69444, 0, 0, 0.66667],
              "67": [0, 0.69444, 0, 0, 0.63889],
              "68": [0, 0.69444, 0, 0, 0.72223],
              "69": [0, 0.69444, 0, 0, 0.59722],
              "70": [0, 0.69444, 0, 0, 0.56945],
              "71": [0, 0.69444, 0, 0, 0.66667],
              "72": [0, 0.69444, 0, 0, 0.70834],
              "73": [0, 0.69444, 0, 0, 0.27778],
              "74": [0, 0.69444, 0, 0, 0.47222],
              "75": [0, 0.69444, 0, 0, 0.69445],
              "76": [0, 0.69444, 0, 0, 0.54167],
              "77": [0, 0.69444, 0, 0, 0.875],
              "78": [0, 0.69444, 0, 0, 0.70834],
              "79": [0, 0.69444, 0, 0, 0.73611],
              "80": [0, 0.69444, 0, 0, 0.63889],
              "81": [0.125, 0.69444, 0, 0, 0.73611],
              "82": [0, 0.69444, 0, 0, 0.64584],
              "83": [0, 0.69444, 0, 0, 0.55556],
              "84": [0, 0.69444, 0, 0, 0.68056],
              "85": [0, 0.69444, 0, 0, 0.6875],
              "86": [0, 0.69444, 0.01389, 0, 0.66667],
              "87": [0, 0.69444, 0.01389, 0, 0.94445],
              "88": [0, 0.69444, 0, 0, 0.66667],
              "89": [0, 0.69444, 0.025, 0, 0.66667],
              "90": [0, 0.69444, 0, 0, 0.61111],
              "91": [0.25, 0.75, 0, 0, 0.28889],
              "93": [0.25, 0.75, 0, 0, 0.28889],
              "94": [0, 0.69444, 0, 0, 0.5],
              "95": [0.35, 0.09444, 0.02778, 0, 0.5],
              "97": [0, 0.44444, 0, 0, 0.48056],
              "98": [0, 0.69444, 0, 0, 0.51667],
              "99": [0, 0.44444, 0, 0, 0.44445],
              "100": [0, 0.69444, 0, 0, 0.51667],
              "101": [0, 0.44444, 0, 0, 0.44445],
              "102": [0, 0.69444, 0.06944, 0, 0.30556],
              "103": [0.19444, 0.44444, 0.01389, 0, 0.5],
              "104": [0, 0.69444, 0, 0, 0.51667],
              "105": [0, 0.67937, 0, 0, 0.23889],
              "106": [0.19444, 0.67937, 0, 0, 0.26667],
              "107": [0, 0.69444, 0, 0, 0.48889],
              "108": [0, 0.69444, 0, 0, 0.23889],
              "109": [0, 0.44444, 0, 0, 0.79445],
              "110": [0, 0.44444, 0, 0, 0.51667],
              "111": [0, 0.44444, 0, 0, 0.5],
              "112": [0.19444, 0.44444, 0, 0, 0.51667],
              "113": [0.19444, 0.44444, 0, 0, 0.51667],
              "114": [0, 0.44444, 0.01389, 0, 0.34167],
              "115": [0, 0.44444, 0, 0, 0.38333],
              "116": [0, 0.57143, 0, 0, 0.36111],
              "117": [0, 0.44444, 0, 0, 0.51667],
              "118": [0, 0.44444, 0.01389, 0, 0.46111],
              "119": [0, 0.44444, 0.01389, 0, 0.68334],
              "120": [0, 0.44444, 0, 0, 0.46111],
              "121": [0.19444, 0.44444, 0.01389, 0, 0.46111],
              "122": [0, 0.44444, 0, 0, 0.43472],
              "126": [0.35, 0.32659, 0, 0, 0.5],
              "160": [0, 0, 0, 0, 0.25],
              "168": [0, 0.67937, 0, 0, 0.5],
              "176": [0, 0.69444, 0, 0, 0.66667],
              "184": [0.17014, 0, 0, 0, 0.44445],
              "305": [0, 0.44444, 0, 0, 0.23889],
              "567": [0.19444, 0.44444, 0, 0, 0.26667],
              "710": [0, 0.69444, 0, 0, 0.5],
              "711": [0, 0.63194, 0, 0, 0.5],
              "713": [0, 0.60889, 0, 0, 0.5],
              "714": [0, 0.69444, 0, 0, 0.5],
              "715": [0, 0.69444, 0, 0, 0.5],
              "728": [0, 0.69444, 0, 0, 0.5],
              "729": [0, 0.67937, 0, 0, 0.27778],
              "730": [0, 0.69444, 0, 0, 0.66667],
              "732": [0, 0.67659, 0, 0, 0.5],
              "733": [0, 0.69444, 0, 0, 0.5],
              "915": [0, 0.69444, 0, 0, 0.54167],
              "916": [0, 0.69444, 0, 0, 0.83334],
              "920": [0, 0.69444, 0, 0, 0.77778],
              "923": [0, 0.69444, 0, 0, 0.61111],
              "926": [0, 0.69444, 0, 0, 0.66667],
              "928": [0, 0.69444, 0, 0, 0.70834],
              "931": [0, 0.69444, 0, 0, 0.72222],
              "933": [0, 0.69444, 0, 0, 0.77778],
              "934": [0, 0.69444, 0, 0, 0.72222],
              "936": [0, 0.69444, 0, 0, 0.77778],
              "937": [0, 0.69444, 0, 0, 0.72222],
              "8211": [0, 0.44444, 0.02778, 0, 0.5],
              "8212": [0, 0.44444, 0.02778, 0, 1],
              "8216": [0, 0.69444, 0, 0, 0.27778],
              "8217": [0, 0.69444, 0, 0, 0.27778],
              "8220": [0, 0.69444, 0, 0, 0.5],
              "8221": [0, 0.69444, 0, 0, 0.5]
            },
            "Script-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "65": [0, 0.7, 0.22925, 0, 0.80253],
              "66": [0, 0.7, 0.04087, 0, 0.90757],
              "67": [0, 0.7, 0.1689, 0, 0.66619],
              "68": [0, 0.7, 0.09371, 0, 0.77443],
              "69": [0, 0.7, 0.18583, 0, 0.56162],
              "70": [0, 0.7, 0.13634, 0, 0.89544],
              "71": [0, 0.7, 0.17322, 0, 0.60961],
              "72": [0, 0.7, 0.29694, 0, 0.96919],
              "73": [0, 0.7, 0.19189, 0, 0.80907],
              "74": [0.27778, 0.7, 0.19189, 0, 1.05159],
              "75": [0, 0.7, 0.31259, 0, 0.91364],
              "76": [0, 0.7, 0.19189, 0, 0.87373],
              "77": [0, 0.7, 0.15981, 0, 1.08031],
              "78": [0, 0.7, 0.3525, 0, 0.9015],
              "79": [0, 0.7, 0.08078, 0, 0.73787],
              "80": [0, 0.7, 0.08078, 0, 1.01262],
              "81": [0, 0.7, 0.03305, 0, 0.88282],
              "82": [0, 0.7, 0.06259, 0, 0.85],
              "83": [0, 0.7, 0.19189, 0, 0.86767],
              "84": [0, 0.7, 0.29087, 0, 0.74697],
              "85": [0, 0.7, 0.25815, 0, 0.79996],
              "86": [0, 0.7, 0.27523, 0, 0.62204],
              "87": [0, 0.7, 0.27523, 0, 0.80532],
              "88": [0, 0.7, 0.26006, 0, 0.94445],
              "89": [0, 0.7, 0.2939, 0, 0.70961],
              "90": [0, 0.7, 0.24037, 0, 0.8212],
              "160": [0, 0, 0, 0, 0.25]
            },
            "Size1-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "40": [0.35001, 0.85, 0, 0, 0.45834],
              "41": [0.35001, 0.85, 0, 0, 0.45834],
              "47": [0.35001, 0.85, 0, 0, 0.57778],
              "91": [0.35001, 0.85, 0, 0, 0.41667],
              "92": [0.35001, 0.85, 0, 0, 0.57778],
              "93": [0.35001, 0.85, 0, 0, 0.41667],
              "123": [0.35001, 0.85, 0, 0, 0.58334],
              "125": [0.35001, 0.85, 0, 0, 0.58334],
              "160": [0, 0, 0, 0, 0.25],
              "710": [0, 0.72222, 0, 0, 0.55556],
              "732": [0, 0.72222, 0, 0, 0.55556],
              "770": [0, 0.72222, 0, 0, 0.55556],
              "771": [0, 0.72222, 0, 0, 0.55556],
              "8214": [-99e-5, 0.601, 0, 0, 0.77778],
              "8593": [1e-5, 0.6, 0, 0, 0.66667],
              "8595": [1e-5, 0.6, 0, 0, 0.66667],
              "8657": [1e-5, 0.6, 0, 0, 0.77778],
              "8659": [1e-5, 0.6, 0, 0, 0.77778],
              "8719": [0.25001, 0.75, 0, 0, 0.94445],
              "8720": [0.25001, 0.75, 0, 0, 0.94445],
              "8721": [0.25001, 0.75, 0, 0, 1.05556],
              "8730": [0.35001, 0.85, 0, 0, 1],
              "8739": [-599e-5, 0.606, 0, 0, 0.33333],
              "8741": [-599e-5, 0.606, 0, 0, 0.55556],
              "8747": [0.30612, 0.805, 0.19445, 0, 0.47222],
              "8748": [0.306, 0.805, 0.19445, 0, 0.47222],
              "8749": [0.306, 0.805, 0.19445, 0, 0.47222],
              "8750": [0.30612, 0.805, 0.19445, 0, 0.47222],
              "8896": [0.25001, 0.75, 0, 0, 0.83334],
              "8897": [0.25001, 0.75, 0, 0, 0.83334],
              "8898": [0.25001, 0.75, 0, 0, 0.83334],
              "8899": [0.25001, 0.75, 0, 0, 0.83334],
              "8968": [0.35001, 0.85, 0, 0, 0.47222],
              "8969": [0.35001, 0.85, 0, 0, 0.47222],
              "8970": [0.35001, 0.85, 0, 0, 0.47222],
              "8971": [0.35001, 0.85, 0, 0, 0.47222],
              "9168": [-99e-5, 0.601, 0, 0, 0.66667],
              "10216": [0.35001, 0.85, 0, 0, 0.47222],
              "10217": [0.35001, 0.85, 0, 0, 0.47222],
              "10752": [0.25001, 0.75, 0, 0, 1.11111],
              "10753": [0.25001, 0.75, 0, 0, 1.11111],
              "10754": [0.25001, 0.75, 0, 0, 1.11111],
              "10756": [0.25001, 0.75, 0, 0, 0.83334],
              "10758": [0.25001, 0.75, 0, 0, 0.83334]
            },
            "Size2-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "40": [0.65002, 1.15, 0, 0, 0.59722],
              "41": [0.65002, 1.15, 0, 0, 0.59722],
              "47": [0.65002, 1.15, 0, 0, 0.81111],
              "91": [0.65002, 1.15, 0, 0, 0.47222],
              "92": [0.65002, 1.15, 0, 0, 0.81111],
              "93": [0.65002, 1.15, 0, 0, 0.47222],
              "123": [0.65002, 1.15, 0, 0, 0.66667],
              "125": [0.65002, 1.15, 0, 0, 0.66667],
              "160": [0, 0, 0, 0, 0.25],
              "710": [0, 0.75, 0, 0, 1],
              "732": [0, 0.75, 0, 0, 1],
              "770": [0, 0.75, 0, 0, 1],
              "771": [0, 0.75, 0, 0, 1],
              "8719": [0.55001, 1.05, 0, 0, 1.27778],
              "8720": [0.55001, 1.05, 0, 0, 1.27778],
              "8721": [0.55001, 1.05, 0, 0, 1.44445],
              "8730": [0.65002, 1.15, 0, 0, 1],
              "8747": [0.86225, 1.36, 0.44445, 0, 0.55556],
              "8748": [0.862, 1.36, 0.44445, 0, 0.55556],
              "8749": [0.862, 1.36, 0.44445, 0, 0.55556],
              "8750": [0.86225, 1.36, 0.44445, 0, 0.55556],
              "8896": [0.55001, 1.05, 0, 0, 1.11111],
              "8897": [0.55001, 1.05, 0, 0, 1.11111],
              "8898": [0.55001, 1.05, 0, 0, 1.11111],
              "8899": [0.55001, 1.05, 0, 0, 1.11111],
              "8968": [0.65002, 1.15, 0, 0, 0.52778],
              "8969": [0.65002, 1.15, 0, 0, 0.52778],
              "8970": [0.65002, 1.15, 0, 0, 0.52778],
              "8971": [0.65002, 1.15, 0, 0, 0.52778],
              "10216": [0.65002, 1.15, 0, 0, 0.61111],
              "10217": [0.65002, 1.15, 0, 0, 0.61111],
              "10752": [0.55001, 1.05, 0, 0, 1.51112],
              "10753": [0.55001, 1.05, 0, 0, 1.51112],
              "10754": [0.55001, 1.05, 0, 0, 1.51112],
              "10756": [0.55001, 1.05, 0, 0, 1.11111],
              "10758": [0.55001, 1.05, 0, 0, 1.11111]
            },
            "Size3-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "40": [0.95003, 1.45, 0, 0, 0.73611],
              "41": [0.95003, 1.45, 0, 0, 0.73611],
              "47": [0.95003, 1.45, 0, 0, 1.04445],
              "91": [0.95003, 1.45, 0, 0, 0.52778],
              "92": [0.95003, 1.45, 0, 0, 1.04445],
              "93": [0.95003, 1.45, 0, 0, 0.52778],
              "123": [0.95003, 1.45, 0, 0, 0.75],
              "125": [0.95003, 1.45, 0, 0, 0.75],
              "160": [0, 0, 0, 0, 0.25],
              "710": [0, 0.75, 0, 0, 1.44445],
              "732": [0, 0.75, 0, 0, 1.44445],
              "770": [0, 0.75, 0, 0, 1.44445],
              "771": [0, 0.75, 0, 0, 1.44445],
              "8730": [0.95003, 1.45, 0, 0, 1],
              "8968": [0.95003, 1.45, 0, 0, 0.58334],
              "8969": [0.95003, 1.45, 0, 0, 0.58334],
              "8970": [0.95003, 1.45, 0, 0, 0.58334],
              "8971": [0.95003, 1.45, 0, 0, 0.58334],
              "10216": [0.95003, 1.45, 0, 0, 0.75],
              "10217": [0.95003, 1.45, 0, 0, 0.75]
            },
            "Size4-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "40": [1.25003, 1.75, 0, 0, 0.79167],
              "41": [1.25003, 1.75, 0, 0, 0.79167],
              "47": [1.25003, 1.75, 0, 0, 1.27778],
              "91": [1.25003, 1.75, 0, 0, 0.58334],
              "92": [1.25003, 1.75, 0, 0, 1.27778],
              "93": [1.25003, 1.75, 0, 0, 0.58334],
              "123": [1.25003, 1.75, 0, 0, 0.80556],
              "125": [1.25003, 1.75, 0, 0, 0.80556],
              "160": [0, 0, 0, 0, 0.25],
              "710": [0, 0.825, 0, 0, 1.8889],
              "732": [0, 0.825, 0, 0, 1.8889],
              "770": [0, 0.825, 0, 0, 1.8889],
              "771": [0, 0.825, 0, 0, 1.8889],
              "8730": [1.25003, 1.75, 0, 0, 1],
              "8968": [1.25003, 1.75, 0, 0, 0.63889],
              "8969": [1.25003, 1.75, 0, 0, 0.63889],
              "8970": [1.25003, 1.75, 0, 0, 0.63889],
              "8971": [1.25003, 1.75, 0, 0, 0.63889],
              "9115": [0.64502, 1.155, 0, 0, 0.875],
              "9116": [1e-5, 0.6, 0, 0, 0.875],
              "9117": [0.64502, 1.155, 0, 0, 0.875],
              "9118": [0.64502, 1.155, 0, 0, 0.875],
              "9119": [1e-5, 0.6, 0, 0, 0.875],
              "9120": [0.64502, 1.155, 0, 0, 0.875],
              "9121": [0.64502, 1.155, 0, 0, 0.66667],
              "9122": [-99e-5, 0.601, 0, 0, 0.66667],
              "9123": [0.64502, 1.155, 0, 0, 0.66667],
              "9124": [0.64502, 1.155, 0, 0, 0.66667],
              "9125": [-99e-5, 0.601, 0, 0, 0.66667],
              "9126": [0.64502, 1.155, 0, 0, 0.66667],
              "9127": [1e-5, 0.9, 0, 0, 0.88889],
              "9128": [0.65002, 1.15, 0, 0, 0.88889],
              "9129": [0.90001, 0, 0, 0, 0.88889],
              "9130": [0, 0.3, 0, 0, 0.88889],
              "9131": [1e-5, 0.9, 0, 0, 0.88889],
              "9132": [0.65002, 1.15, 0, 0, 0.88889],
              "9133": [0.90001, 0, 0, 0, 0.88889],
              "9143": [0.88502, 0.915, 0, 0, 1.05556],
              "10216": [1.25003, 1.75, 0, 0, 0.80556],
              "10217": [1.25003, 1.75, 0, 0, 0.80556],
              "57344": [-499e-5, 0.605, 0, 0, 1.05556],
              "57345": [-499e-5, 0.605, 0, 0, 1.05556],
              "57680": [0, 0.12, 0, 0, 0.45],
              "57681": [0, 0.12, 0, 0, 0.45],
              "57682": [0, 0.12, 0, 0, 0.45],
              "57683": [0, 0.12, 0, 0, 0.45]
            },
            "Typewriter-Regular": {
              "32": [0, 0, 0, 0, 0.525],
              "33": [0, 0.61111, 0, 0, 0.525],
              "34": [0, 0.61111, 0, 0, 0.525],
              "35": [0, 0.61111, 0, 0, 0.525],
              "36": [0.08333, 0.69444, 0, 0, 0.525],
              "37": [0.08333, 0.69444, 0, 0, 0.525],
              "38": [0, 0.61111, 0, 0, 0.525],
              "39": [0, 0.61111, 0, 0, 0.525],
              "40": [0.08333, 0.69444, 0, 0, 0.525],
              "41": [0.08333, 0.69444, 0, 0, 0.525],
              "42": [0, 0.52083, 0, 0, 0.525],
              "43": [-0.08056, 0.53055, 0, 0, 0.525],
              "44": [0.13889, 0.125, 0, 0, 0.525],
              "45": [-0.08056, 0.53055, 0, 0, 0.525],
              "46": [0, 0.125, 0, 0, 0.525],
              "47": [0.08333, 0.69444, 0, 0, 0.525],
              "48": [0, 0.61111, 0, 0, 0.525],
              "49": [0, 0.61111, 0, 0, 0.525],
              "50": [0, 0.61111, 0, 0, 0.525],
              "51": [0, 0.61111, 0, 0, 0.525],
              "52": [0, 0.61111, 0, 0, 0.525],
              "53": [0, 0.61111, 0, 0, 0.525],
              "54": [0, 0.61111, 0, 0, 0.525],
              "55": [0, 0.61111, 0, 0, 0.525],
              "56": [0, 0.61111, 0, 0, 0.525],
              "57": [0, 0.61111, 0, 0, 0.525],
              "58": [0, 0.43056, 0, 0, 0.525],
              "59": [0.13889, 0.43056, 0, 0, 0.525],
              "60": [-0.05556, 0.55556, 0, 0, 0.525],
              "61": [-0.19549, 0.41562, 0, 0, 0.525],
              "62": [-0.05556, 0.55556, 0, 0, 0.525],
              "63": [0, 0.61111, 0, 0, 0.525],
              "64": [0, 0.61111, 0, 0, 0.525],
              "65": [0, 0.61111, 0, 0, 0.525],
              "66": [0, 0.61111, 0, 0, 0.525],
              "67": [0, 0.61111, 0, 0, 0.525],
              "68": [0, 0.61111, 0, 0, 0.525],
              "69": [0, 0.61111, 0, 0, 0.525],
              "70": [0, 0.61111, 0, 0, 0.525],
              "71": [0, 0.61111, 0, 0, 0.525],
              "72": [0, 0.61111, 0, 0, 0.525],
              "73": [0, 0.61111, 0, 0, 0.525],
              "74": [0, 0.61111, 0, 0, 0.525],
              "75": [0, 0.61111, 0, 0, 0.525],
              "76": [0, 0.61111, 0, 0, 0.525],
              "77": [0, 0.61111, 0, 0, 0.525],
              "78": [0, 0.61111, 0, 0, 0.525],
              "79": [0, 0.61111, 0, 0, 0.525],
              "80": [0, 0.61111, 0, 0, 0.525],
              "81": [0.13889, 0.61111, 0, 0, 0.525],
              "82": [0, 0.61111, 0, 0, 0.525],
              "83": [0, 0.61111, 0, 0, 0.525],
              "84": [0, 0.61111, 0, 0, 0.525],
              "85": [0, 0.61111, 0, 0, 0.525],
              "86": [0, 0.61111, 0, 0, 0.525],
              "87": [0, 0.61111, 0, 0, 0.525],
              "88": [0, 0.61111, 0, 0, 0.525],
              "89": [0, 0.61111, 0, 0, 0.525],
              "90": [0, 0.61111, 0, 0, 0.525],
              "91": [0.08333, 0.69444, 0, 0, 0.525],
              "92": [0.08333, 0.69444, 0, 0, 0.525],
              "93": [0.08333, 0.69444, 0, 0, 0.525],
              "94": [0, 0.61111, 0, 0, 0.525],
              "95": [0.09514, 0, 0, 0, 0.525],
              "96": [0, 0.61111, 0, 0, 0.525],
              "97": [0, 0.43056, 0, 0, 0.525],
              "98": [0, 0.61111, 0, 0, 0.525],
              "99": [0, 0.43056, 0, 0, 0.525],
              "100": [0, 0.61111, 0, 0, 0.525],
              "101": [0, 0.43056, 0, 0, 0.525],
              "102": [0, 0.61111, 0, 0, 0.525],
              "103": [0.22222, 0.43056, 0, 0, 0.525],
              "104": [0, 0.61111, 0, 0, 0.525],
              "105": [0, 0.61111, 0, 0, 0.525],
              "106": [0.22222, 0.61111, 0, 0, 0.525],
              "107": [0, 0.61111, 0, 0, 0.525],
              "108": [0, 0.61111, 0, 0, 0.525],
              "109": [0, 0.43056, 0, 0, 0.525],
              "110": [0, 0.43056, 0, 0, 0.525],
              "111": [0, 0.43056, 0, 0, 0.525],
              "112": [0.22222, 0.43056, 0, 0, 0.525],
              "113": [0.22222, 0.43056, 0, 0, 0.525],
              "114": [0, 0.43056, 0, 0, 0.525],
              "115": [0, 0.43056, 0, 0, 0.525],
              "116": [0, 0.55358, 0, 0, 0.525],
              "117": [0, 0.43056, 0, 0, 0.525],
              "118": [0, 0.43056, 0, 0, 0.525],
              "119": [0, 0.43056, 0, 0, 0.525],
              "120": [0, 0.43056, 0, 0, 0.525],
              "121": [0.22222, 0.43056, 0, 0, 0.525],
              "122": [0, 0.43056, 0, 0, 0.525],
              "123": [0.08333, 0.69444, 0, 0, 0.525],
              "124": [0.08333, 0.69444, 0, 0, 0.525],
              "125": [0.08333, 0.69444, 0, 0, 0.525],
              "126": [0, 0.61111, 0, 0, 0.525],
              "127": [0, 0.61111, 0, 0, 0.525],
              "160": [0, 0, 0, 0, 0.525],
              "176": [0, 0.61111, 0, 0, 0.525],
              "184": [0.19445, 0, 0, 0, 0.525],
              "305": [0, 0.43056, 0, 0, 0.525],
              "567": [0.22222, 0.43056, 0, 0, 0.525],
              "711": [0, 0.56597, 0, 0, 0.525],
              "713": [0, 0.56555, 0, 0, 0.525],
              "714": [0, 0.61111, 0, 0, 0.525],
              "715": [0, 0.61111, 0, 0, 0.525],
              "728": [0, 0.61111, 0, 0, 0.525],
              "730": [0, 0.61111, 0, 0, 0.525],
              "770": [0, 0.61111, 0, 0, 0.525],
              "771": [0, 0.61111, 0, 0, 0.525],
              "776": [0, 0.61111, 0, 0, 0.525],
              "915": [0, 0.61111, 0, 0, 0.525],
              "916": [0, 0.61111, 0, 0, 0.525],
              "920": [0, 0.61111, 0, 0, 0.525],
              "923": [0, 0.61111, 0, 0, 0.525],
              "926": [0, 0.61111, 0, 0, 0.525],
              "928": [0, 0.61111, 0, 0, 0.525],
              "931": [0, 0.61111, 0, 0, 0.525],
              "933": [0, 0.61111, 0, 0, 0.525],
              "934": [0, 0.61111, 0, 0, 0.525],
              "936": [0, 0.61111, 0, 0, 0.525],
              "937": [0, 0.61111, 0, 0, 0.525],
              "8216": [0, 0.61111, 0, 0, 0.525],
              "8217": [0, 0.61111, 0, 0, 0.525],
              "8242": [0, 0.61111, 0, 0, 0.525],
              "9251": [0.11111, 0.21944, 0, 0, 0.525]
            }
          };
          ;
          var sigmasAndXis = {
            slant: [0.25, 0.25, 0.25],
            space: [0, 0, 0],
            stretch: [0, 0, 0],
            shrink: [0, 0, 0],
            xHeight: [0.431, 0.431, 0.431],
            quad: [1, 1.171, 1.472],
            extraSpace: [0, 0, 0],
            num1: [0.677, 0.732, 0.925],
            num2: [0.394, 0.384, 0.387],
            num3: [0.444, 0.471, 0.504],
            denom1: [0.686, 0.752, 1.025],
            denom2: [0.345, 0.344, 0.532],
            sup1: [0.413, 0.503, 0.504],
            sup2: [0.363, 0.431, 0.404],
            sup3: [0.289, 0.286, 0.294],
            sub1: [0.15, 0.143, 0.2],
            sub2: [0.247, 0.286, 0.4],
            supDrop: [0.386, 0.353, 0.494],
            subDrop: [0.05, 0.071, 0.1],
            delim1: [2.39, 1.7, 1.98],
            delim2: [1.01, 1.157, 1.42],
            axisHeight: [0.25, 0.25, 0.25],
            defaultRuleThickness: [0.04, 0.049, 0.049],
            bigOpSpacing1: [0.111, 0.111, 0.111],
            bigOpSpacing2: [0.166, 0.166, 0.166],
            bigOpSpacing3: [0.2, 0.2, 0.2],
            bigOpSpacing4: [0.6, 0.611, 0.611],
            bigOpSpacing5: [0.1, 0.143, 0.143],
            sqrtRuleThickness: [0.04, 0.04, 0.04],
            ptPerEm: [10, 10, 10],
            doubleRuleSep: [0.2, 0.2, 0.2],
            arrayRuleWidth: [0.04, 0.04, 0.04],
            fboxsep: [0.3, 0.3, 0.3],
            fboxrule: [0.04, 0.04, 0.04]
          };
          var extraCharacterMap = {
            "\xC5": "A",
            "\xD0": "D",
            "\xDE": "o",
            "\xE5": "a",
            "\xF0": "d",
            "\xFE": "o",
            "\u0410": "A",
            "\u0411": "B",
            "\u0412": "B",
            "\u0413": "F",
            "\u0414": "A",
            "\u0415": "E",
            "\u0416": "K",
            "\u0417": "3",
            "\u0418": "N",
            "\u0419": "N",
            "\u041A": "K",
            "\u041B": "N",
            "\u041C": "M",
            "\u041D": "H",
            "\u041E": "O",
            "\u041F": "N",
            "\u0420": "P",
            "\u0421": "C",
            "\u0422": "T",
            "\u0423": "y",
            "\u0424": "O",
            "\u0425": "X",
            "\u0426": "U",
            "\u0427": "h",
            "\u0428": "W",
            "\u0429": "W",
            "\u042A": "B",
            "\u042B": "X",
            "\u042C": "B",
            "\u042D": "3",
            "\u042E": "X",
            "\u042F": "R",
            "\u0430": "a",
            "\u0431": "b",
            "\u0432": "a",
            "\u0433": "r",
            "\u0434": "y",
            "\u0435": "e",
            "\u0436": "m",
            "\u0437": "e",
            "\u0438": "n",
            "\u0439": "n",
            "\u043A": "n",
            "\u043B": "n",
            "\u043C": "m",
            "\u043D": "n",
            "\u043E": "o",
            "\u043F": "n",
            "\u0440": "p",
            "\u0441": "c",
            "\u0442": "o",
            "\u0443": "y",
            "\u0444": "b",
            "\u0445": "x",
            "\u0446": "n",
            "\u0447": "n",
            "\u0448": "w",
            "\u0449": "w",
            "\u044A": "a",
            "\u044B": "m",
            "\u044C": "a",
            "\u044D": "e",
            "\u044E": "m",
            "\u044F": "r"
          };
          function setFontMetrics(fontName, metrics) {
            fontMetricsData[fontName] = metrics;
          }
          function getCharacterMetrics(character, font, mode) {
            if (!fontMetricsData[font]) {
              throw new Error("Font metrics not found for font: " + font + ".");
            }
            var ch2 = character.charCodeAt(0);
            var metrics = fontMetricsData[font][ch2];
            if (!metrics && character[0] in extraCharacterMap) {
              ch2 = extraCharacterMap[character[0]].charCodeAt(0);
              metrics = fontMetricsData[font][ch2];
            }
            if (!metrics && mode === "text") {
              if (supportedCodepoint(ch2)) {
                metrics = fontMetricsData[font][77];
              }
            }
            if (metrics) {
              return {
                depth: metrics[0],
                height: metrics[1],
                italic: metrics[2],
                skew: metrics[3],
                width: metrics[4]
              };
            }
          }
          var fontMetricsBySizeIndex = {};
          function getGlobalMetrics(size) {
            var sizeIndex;
            if (size >= 5) {
              sizeIndex = 0;
            } else if (size >= 3) {
              sizeIndex = 1;
            } else {
              sizeIndex = 2;
            }
            if (!fontMetricsBySizeIndex[sizeIndex]) {
              var metrics = fontMetricsBySizeIndex[sizeIndex] = {
                cssEmPerMu: sigmasAndXis.quad[sizeIndex] / 18
              };
              for (var key in sigmasAndXis) {
                if (sigmasAndXis.hasOwnProperty(key)) {
                  metrics[key] = sigmasAndXis[key][sizeIndex];
                }
              }
            }
            return fontMetricsBySizeIndex[sizeIndex];
          }
          ;
          var sizeStyleMap = [
            [1, 1, 1],
            [2, 1, 1],
            [3, 1, 1],
            [4, 2, 1],
            [5, 2, 1],
            [6, 3, 1],
            [7, 4, 2],
            [8, 6, 3],
            [9, 7, 6],
            [10, 8, 7],
            [11, 10, 9]
          ];
          var sizeMultipliers = [
            0.5,
            0.6,
            0.7,
            0.8,
            0.9,
            1,
            1.2,
            1.44,
            1.728,
            2.074,
            2.488
          ];
          var sizeAtStyle = function sizeAtStyle2(size, style) {
            return style.size < 2 ? size : sizeStyleMap[size - 1][style.size - 1];
          };
          var Options = /* @__PURE__ */ function() {
            function Options2(data2) {
              this.style = void 0;
              this.color = void 0;
              this.size = void 0;
              this.textSize = void 0;
              this.phantom = void 0;
              this.font = void 0;
              this.fontFamily = void 0;
              this.fontWeight = void 0;
              this.fontShape = void 0;
              this.sizeMultiplier = void 0;
              this.maxSize = void 0;
              this.minRuleThickness = void 0;
              this._fontMetrics = void 0;
              this.style = data2.style;
              this.color = data2.color;
              this.size = data2.size || Options2.BASESIZE;
              this.textSize = data2.textSize || this.size;
              this.phantom = !!data2.phantom;
              this.font = data2.font || "";
              this.fontFamily = data2.fontFamily || "";
              this.fontWeight = data2.fontWeight || "";
              this.fontShape = data2.fontShape || "";
              this.sizeMultiplier = sizeMultipliers[this.size - 1];
              this.maxSize = data2.maxSize;
              this.minRuleThickness = data2.minRuleThickness;
              this._fontMetrics = void 0;
            }
            var _proto = Options2.prototype;
            _proto.extend = function extend(extension) {
              var data2 = {
                style: this.style,
                size: this.size,
                textSize: this.textSize,
                color: this.color,
                phantom: this.phantom,
                font: this.font,
                fontFamily: this.fontFamily,
                fontWeight: this.fontWeight,
                fontShape: this.fontShape,
                maxSize: this.maxSize,
                minRuleThickness: this.minRuleThickness
              };
              for (var key in extension) {
                if (extension.hasOwnProperty(key)) {
                  data2[key] = extension[key];
                }
              }
              return new Options2(data2);
            };
            _proto.havingStyle = function havingStyle(style) {
              if (this.style === style) {
                return this;
              } else {
                return this.extend({
                  style,
                  size: sizeAtStyle(this.textSize, style)
                });
              }
            };
            _proto.havingCrampedStyle = function havingCrampedStyle() {
              return this.havingStyle(this.style.cramp());
            };
            _proto.havingSize = function havingSize(size) {
              if (this.size === size && this.textSize === size) {
                return this;
              } else {
                return this.extend({
                  style: this.style.text(),
                  size,
                  textSize: size,
                  sizeMultiplier: sizeMultipliers[size - 1]
                });
              }
            };
            _proto.havingBaseStyle = function havingBaseStyle(style) {
              style = style || this.style.text();
              var wantSize = sizeAtStyle(Options2.BASESIZE, style);
              if (this.size === wantSize && this.textSize === Options2.BASESIZE && this.style === style) {
                return this;
              } else {
                return this.extend({
                  style,
                  size: wantSize
                });
              }
            };
            _proto.havingBaseSizing = function havingBaseSizing() {
              var size;
              switch (this.style.id) {
                case 4:
                case 5:
                  size = 3;
                  break;
                case 6:
                case 7:
                  size = 1;
                  break;
                default:
                  size = 6;
              }
              return this.extend({
                style: this.style.text(),
                size
              });
            };
            _proto.withColor = function withColor(color) {
              return this.extend({
                color
              });
            };
            _proto.withPhantom = function withPhantom() {
              return this.extend({
                phantom: true
              });
            };
            _proto.withFont = function withFont(font) {
              return this.extend({
                font
              });
            };
            _proto.withTextFontFamily = function withTextFontFamily(fontFamily) {
              return this.extend({
                fontFamily,
                font: ""
              });
            };
            _proto.withTextFontWeight = function withTextFontWeight(fontWeight) {
              return this.extend({
                fontWeight,
                font: ""
              });
            };
            _proto.withTextFontShape = function withTextFontShape(fontShape) {
              return this.extend({
                fontShape,
                font: ""
              });
            };
            _proto.sizingClasses = function sizingClasses(oldOptions) {
              if (oldOptions.size !== this.size) {
                return ["sizing", "reset-size" + oldOptions.size, "size" + this.size];
              } else {
                return [];
              }
            };
            _proto.baseSizingClasses = function baseSizingClasses() {
              if (this.size !== Options2.BASESIZE) {
                return ["sizing", "reset-size" + this.size, "size" + Options2.BASESIZE];
              } else {
                return [];
              }
            };
            _proto.fontMetrics = function fontMetrics() {
              if (!this._fontMetrics) {
                this._fontMetrics = getGlobalMetrics(this.size);
              }
              return this._fontMetrics;
            };
            _proto.getColor = function getColor() {
              if (this.phantom) {
                return "transparent";
              } else {
                return this.color;
              }
            };
            return Options2;
          }();
          Options.BASESIZE = 6;
          var src_Options = Options;
          ;
          var ptPerUnit = {
            "pt": 1,
            "mm": 7227 / 2540,
            "cm": 7227 / 254,
            "in": 72.27,
            "bp": 803 / 800,
            "pc": 12,
            "dd": 1238 / 1157,
            "cc": 14856 / 1157,
            "nd": 685 / 642,
            "nc": 1370 / 107,
            "sp": 1 / 65536,
            "px": 803 / 800
          };
          var relativeUnit = {
            "ex": true,
            "em": true,
            "mu": true
          };
          var validUnit = function validUnit2(unit) {
            if (typeof unit !== "string") {
              unit = unit.unit;
            }
            return unit in ptPerUnit || unit in relativeUnit || unit === "ex";
          };
          var calculateSize = function calculateSize2(sizeValue, options2) {
            var scale;
            if (sizeValue.unit in ptPerUnit) {
              scale = ptPerUnit[sizeValue.unit] / options2.fontMetrics().ptPerEm / options2.sizeMultiplier;
            } else if (sizeValue.unit === "mu") {
              scale = options2.fontMetrics().cssEmPerMu;
            } else {
              var unitOptions;
              if (options2.style.isTight()) {
                unitOptions = options2.havingStyle(options2.style.text());
              } else {
                unitOptions = options2;
              }
              if (sizeValue.unit === "ex") {
                scale = unitOptions.fontMetrics().xHeight;
              } else if (sizeValue.unit === "em") {
                scale = unitOptions.fontMetrics().quad;
              } else {
                throw new src_ParseError("Invalid unit: '" + sizeValue.unit + "'");
              }
              if (unitOptions !== options2) {
                scale *= unitOptions.sizeMultiplier / options2.sizeMultiplier;
              }
            }
            return Math.min(sizeValue.number * scale, options2.maxSize);
          };
          var makeEm = function makeEm2(n2) {
            return +n2.toFixed(4) + "em";
          };
          ;
          var createClass = function createClass2(classes) {
            return classes.filter(function(cls) {
              return cls;
            }).join(" ");
          };
          var initNode = function initNode2(classes, options2, style) {
            this.classes = classes || [];
            this.attributes = {};
            this.height = 0;
            this.depth = 0;
            this.maxFontSize = 0;
            this.style = style || {};
            if (options2) {
              if (options2.style.isTight()) {
                this.classes.push("mtight");
              }
              var color = options2.getColor();
              if (color) {
                this.style.color = color;
              }
            }
          };
          var _toNode = function toNode(tagName) {
            var node = document.createElement(tagName);
            node.className = createClass(this.classes);
            for (var style in this.style) {
              if (this.style.hasOwnProperty(style)) {
                node.style[style] = this.style[style];
              }
            }
            for (var attr in this.attributes) {
              if (this.attributes.hasOwnProperty(attr)) {
                node.setAttribute(attr, this.attributes[attr]);
              }
            }
            for (var i3 = 0; i3 < this.children.length; i3++) {
              node.appendChild(this.children[i3].toNode());
            }
            return node;
          };
          var _toMarkup = function toMarkup(tagName) {
            var markup = "<" + tagName;
            if (this.classes.length) {
              markup += ' class="' + utils.escape(createClass(this.classes)) + '"';
            }
            var styles2 = "";
            for (var style in this.style) {
              if (this.style.hasOwnProperty(style)) {
                styles2 += utils.hyphenate(style) + ":" + this.style[style] + ";";
              }
            }
            if (styles2) {
              markup += ' style="' + utils.escape(styles2) + '"';
            }
            for (var attr in this.attributes) {
              if (this.attributes.hasOwnProperty(attr)) {
                markup += " " + attr + '="' + utils.escape(this.attributes[attr]) + '"';
              }
            }
            markup += ">";
            for (var i3 = 0; i3 < this.children.length; i3++) {
              markup += this.children[i3].toMarkup();
            }
            markup += "</" + tagName + ">";
            return markup;
          };
          var Span = /* @__PURE__ */ function() {
            function Span2(classes, children, options2, style) {
              this.children = void 0;
              this.attributes = void 0;
              this.classes = void 0;
              this.height = void 0;
              this.depth = void 0;
              this.width = void 0;
              this.maxFontSize = void 0;
              this.style = void 0;
              initNode.call(this, classes, options2, style);
              this.children = children || [];
            }
            var _proto = Span2.prototype;
            _proto.setAttribute = function setAttribute(attribute, value) {
              this.attributes[attribute] = value;
            };
            _proto.hasClass = function hasClass(className) {
              return utils.contains(this.classes, className);
            };
            _proto.toNode = function toNode() {
              return _toNode.call(this, "span");
            };
            _proto.toMarkup = function toMarkup() {
              return _toMarkup.call(this, "span");
            };
            return Span2;
          }();
          var Anchor = /* @__PURE__ */ function() {
            function Anchor2(href, classes, children, options2) {
              this.children = void 0;
              this.attributes = void 0;
              this.classes = void 0;
              this.height = void 0;
              this.depth = void 0;
              this.maxFontSize = void 0;
              this.style = void 0;
              initNode.call(this, classes, options2);
              this.children = children || [];
              this.setAttribute("href", href);
            }
            var _proto2 = Anchor2.prototype;
            _proto2.setAttribute = function setAttribute(attribute, value) {
              this.attributes[attribute] = value;
            };
            _proto2.hasClass = function hasClass(className) {
              return utils.contains(this.classes, className);
            };
            _proto2.toNode = function toNode() {
              return _toNode.call(this, "a");
            };
            _proto2.toMarkup = function toMarkup() {
              return _toMarkup.call(this, "a");
            };
            return Anchor2;
          }();
          var Img = /* @__PURE__ */ function() {
            function Img2(src, alt, style) {
              this.src = void 0;
              this.alt = void 0;
              this.classes = void 0;
              this.height = void 0;
              this.depth = void 0;
              this.maxFontSize = void 0;
              this.style = void 0;
              this.alt = alt;
              this.src = src;
              this.classes = ["mord"];
              this.style = style;
            }
            var _proto3 = Img2.prototype;
            _proto3.hasClass = function hasClass(className) {
              return utils.contains(this.classes, className);
            };
            _proto3.toNode = function toNode() {
              var node = document.createElement("img");
              node.src = this.src;
              node.alt = this.alt;
              node.className = "mord";
              for (var style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                  node.style[style] = this.style[style];
                }
              }
              return node;
            };
            _proto3.toMarkup = function toMarkup() {
              var markup = "<img  src='" + this.src + " 'alt='" + this.alt + "' ";
              var styles2 = "";
              for (var style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                  styles2 += utils.hyphenate(style) + ":" + this.style[style] + ";";
                }
              }
              if (styles2) {
                markup += ' style="' + utils.escape(styles2) + '"';
              }
              markup += "'/>";
              return markup;
            };
            return Img2;
          }();
          var iCombinations = {
            "\xEE": "\u0131\u0302",
            "\xEF": "\u0131\u0308",
            "\xED": "\u0131\u0301",
            "\xEC": "\u0131\u0300"
          };
          var SymbolNode = /* @__PURE__ */ function() {
            function SymbolNode2(text, height, depth, italic, skew, width, classes, style) {
              this.text = void 0;
              this.height = void 0;
              this.depth = void 0;
              this.italic = void 0;
              this.skew = void 0;
              this.width = void 0;
              this.maxFontSize = void 0;
              this.classes = void 0;
              this.style = void 0;
              this.text = text;
              this.height = height || 0;
              this.depth = depth || 0;
              this.italic = italic || 0;
              this.skew = skew || 0;
              this.width = width || 0;
              this.classes = classes || [];
              this.style = style || {};
              this.maxFontSize = 0;
              var script = scriptFromCodepoint(this.text.charCodeAt(0));
              if (script) {
                this.classes.push(script + "_fallback");
              }
              if (/[îïíì]/.test(this.text)) {
                this.text = iCombinations[this.text];
              }
            }
            var _proto4 = SymbolNode2.prototype;
            _proto4.hasClass = function hasClass(className) {
              return utils.contains(this.classes, className);
            };
            _proto4.toNode = function toNode() {
              var node = document.createTextNode(this.text);
              var span = null;
              if (this.italic > 0) {
                span = document.createElement("span");
                span.style.marginRight = makeEm(this.italic);
              }
              if (this.classes.length > 0) {
                span = span || document.createElement("span");
                span.className = createClass(this.classes);
              }
              for (var style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                  span = span || document.createElement("span");
                  span.style[style] = this.style[style];
                }
              }
              if (span) {
                span.appendChild(node);
                return span;
              } else {
                return node;
              }
            };
            _proto4.toMarkup = function toMarkup() {
              var needsSpan = false;
              var markup = "<span";
              if (this.classes.length) {
                needsSpan = true;
                markup += ' class="';
                markup += utils.escape(createClass(this.classes));
                markup += '"';
              }
              var styles2 = "";
              if (this.italic > 0) {
                styles2 += "margin-right:" + this.italic + "em;";
              }
              for (var style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                  styles2 += utils.hyphenate(style) + ":" + this.style[style] + ";";
                }
              }
              if (styles2) {
                needsSpan = true;
                markup += ' style="' + utils.escape(styles2) + '"';
              }
              var escaped = utils.escape(this.text);
              if (needsSpan) {
                markup += ">";
                markup += escaped;
                markup += "</span>";
                return markup;
              } else {
                return escaped;
              }
            };
            return SymbolNode2;
          }();
          var SvgNode = /* @__PURE__ */ function() {
            function SvgNode2(children, attributes) {
              this.children = void 0;
              this.attributes = void 0;
              this.children = children || [];
              this.attributes = attributes || {};
            }
            var _proto5 = SvgNode2.prototype;
            _proto5.toNode = function toNode() {
              var svgNS = "http://www.w3.org/2000/svg";
              var node = document.createElementNS(svgNS, "svg");
              for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  node.setAttribute(attr, this.attributes[attr]);
                }
              }
              for (var i3 = 0; i3 < this.children.length; i3++) {
                node.appendChild(this.children[i3].toNode());
              }
              return node;
            };
            _proto5.toMarkup = function toMarkup() {
              var markup = '<svg xmlns="http://www.w3.org/2000/svg"';
              for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  markup += " " + attr + "='" + this.attributes[attr] + "'";
                }
              }
              markup += ">";
              for (var i3 = 0; i3 < this.children.length; i3++) {
                markup += this.children[i3].toMarkup();
              }
              markup += "</svg>";
              return markup;
            };
            return SvgNode2;
          }();
          var PathNode = /* @__PURE__ */ function() {
            function PathNode2(pathName, alternate) {
              this.pathName = void 0;
              this.alternate = void 0;
              this.pathName = pathName;
              this.alternate = alternate;
            }
            var _proto6 = PathNode2.prototype;
            _proto6.toNode = function toNode() {
              var svgNS = "http://www.w3.org/2000/svg";
              var node = document.createElementNS(svgNS, "path");
              if (this.alternate) {
                node.setAttribute("d", this.alternate);
              } else {
                node.setAttribute("d", path[this.pathName]);
              }
              return node;
            };
            _proto6.toMarkup = function toMarkup() {
              if (this.alternate) {
                return "<path d='" + this.alternate + "'/>";
              } else {
                return "<path d='" + path[this.pathName] + "'/>";
              }
            };
            return PathNode2;
          }();
          var LineNode = /* @__PURE__ */ function() {
            function LineNode2(attributes) {
              this.attributes = void 0;
              this.attributes = attributes || {};
            }
            var _proto7 = LineNode2.prototype;
            _proto7.toNode = function toNode() {
              var svgNS = "http://www.w3.org/2000/svg";
              var node = document.createElementNS(svgNS, "line");
              for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  node.setAttribute(attr, this.attributes[attr]);
                }
              }
              return node;
            };
            _proto7.toMarkup = function toMarkup() {
              var markup = "<line";
              for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  markup += " " + attr + "='" + this.attributes[attr] + "'";
                }
              }
              markup += "/>";
              return markup;
            };
            return LineNode2;
          }();
          function assertSymbolDomNode(group) {
            if (group instanceof SymbolNode) {
              return group;
            } else {
              throw new Error("Expected symbolNode but got " + String(group) + ".");
            }
          }
          function assertSpan(group) {
            if (group instanceof Span) {
              return group;
            } else {
              throw new Error("Expected span<HtmlDomNode> but got " + String(group) + ".");
            }
          }
          ;
          var ATOMS = {
            "bin": 1,
            "close": 1,
            "inner": 1,
            "open": 1,
            "punct": 1,
            "rel": 1
          };
          var NON_ATOMS = {
            "accent-token": 1,
            "mathord": 1,
            "op-token": 1,
            "spacing": 1,
            "textord": 1
          };
          var symbols = {
            "math": {},
            "text": {}
          };
          var src_symbols = symbols;
          function defineSymbol(mode, font, group, replace, name, acceptUnicodeChar) {
            symbols[mode][name] = {
              font,
              group,
              replace
            };
            if (acceptUnicodeChar && replace) {
              symbols[mode][replace] = symbols[mode][name];
            }
          }
          var math = "math";
          var symbols_text = "text";
          var main = "main";
          var ams = "ams";
          var accent = "accent-token";
          var bin = "bin";
          var symbols_close = "close";
          var inner = "inner";
          var mathord = "mathord";
          var op = "op-token";
          var symbols_open = "open";
          var punct = "punct";
          var rel = "rel";
          var spacing = "spacing";
          var textord = "textord";
          defineSymbol(math, main, rel, "\u2261", "\\equiv", true);
          defineSymbol(math, main, rel, "\u227A", "\\prec", true);
          defineSymbol(math, main, rel, "\u227B", "\\succ", true);
          defineSymbol(math, main, rel, "\u223C", "\\sim", true);
          defineSymbol(math, main, rel, "\u22A5", "\\perp");
          defineSymbol(math, main, rel, "\u2AAF", "\\preceq", true);
          defineSymbol(math, main, rel, "\u2AB0", "\\succeq", true);
          defineSymbol(math, main, rel, "\u2243", "\\simeq", true);
          defineSymbol(math, main, rel, "\u2223", "\\mid", true);
          defineSymbol(math, main, rel, "\u226A", "\\ll", true);
          defineSymbol(math, main, rel, "\u226B", "\\gg", true);
          defineSymbol(math, main, rel, "\u224D", "\\asymp", true);
          defineSymbol(math, main, rel, "\u2225", "\\parallel");
          defineSymbol(math, main, rel, "\u22C8", "\\bowtie", true);
          defineSymbol(math, main, rel, "\u2323", "\\smile", true);
          defineSymbol(math, main, rel, "\u2291", "\\sqsubseteq", true);
          defineSymbol(math, main, rel, "\u2292", "\\sqsupseteq", true);
          defineSymbol(math, main, rel, "\u2250", "\\doteq", true);
          defineSymbol(math, main, rel, "\u2322", "\\frown", true);
          defineSymbol(math, main, rel, "\u220B", "\\ni", true);
          defineSymbol(math, main, rel, "\u221D", "\\propto", true);
          defineSymbol(math, main, rel, "\u22A2", "\\vdash", true);
          defineSymbol(math, main, rel, "\u22A3", "\\dashv", true);
          defineSymbol(math, main, rel, "\u220B", "\\owns");
          defineSymbol(math, main, punct, ".", "\\ldotp");
          defineSymbol(math, main, punct, "\u22C5", "\\cdotp");
          defineSymbol(math, main, textord, "#", "\\#");
          defineSymbol(symbols_text, main, textord, "#", "\\#");
          defineSymbol(math, main, textord, "&", "\\&");
          defineSymbol(symbols_text, main, textord, "&", "\\&");
          defineSymbol(math, main, textord, "\u2135", "\\aleph", true);
          defineSymbol(math, main, textord, "\u2200", "\\forall", true);
          defineSymbol(math, main, textord, "\u210F", "\\hbar", true);
          defineSymbol(math, main, textord, "\u2203", "\\exists", true);
          defineSymbol(math, main, textord, "\u2207", "\\nabla", true);
          defineSymbol(math, main, textord, "\u266D", "\\flat", true);
          defineSymbol(math, main, textord, "\u2113", "\\ell", true);
          defineSymbol(math, main, textord, "\u266E", "\\natural", true);
          defineSymbol(math, main, textord, "\u2663", "\\clubsuit", true);
          defineSymbol(math, main, textord, "\u2118", "\\wp", true);
          defineSymbol(math, main, textord, "\u266F", "\\sharp", true);
          defineSymbol(math, main, textord, "\u2662", "\\diamondsuit", true);
          defineSymbol(math, main, textord, "\u211C", "\\Re", true);
          defineSymbol(math, main, textord, "\u2661", "\\heartsuit", true);
          defineSymbol(math, main, textord, "\u2111", "\\Im", true);
          defineSymbol(math, main, textord, "\u2660", "\\spadesuit", true);
          defineSymbol(math, main, textord, "\xA7", "\\S", true);
          defineSymbol(symbols_text, main, textord, "\xA7", "\\S");
          defineSymbol(math, main, textord, "\xB6", "\\P", true);
          defineSymbol(symbols_text, main, textord, "\xB6", "\\P");
          defineSymbol(math, main, textord, "\u2020", "\\dag");
          defineSymbol(symbols_text, main, textord, "\u2020", "\\dag");
          defineSymbol(symbols_text, main, textord, "\u2020", "\\textdagger");
          defineSymbol(math, main, textord, "\u2021", "\\ddag");
          defineSymbol(symbols_text, main, textord, "\u2021", "\\ddag");
          defineSymbol(symbols_text, main, textord, "\u2021", "\\textdaggerdbl");
          defineSymbol(math, main, symbols_close, "\u23B1", "\\rmoustache", true);
          defineSymbol(math, main, symbols_open, "\u23B0", "\\lmoustache", true);
          defineSymbol(math, main, symbols_close, "\u27EF", "\\rgroup", true);
          defineSymbol(math, main, symbols_open, "\u27EE", "\\lgroup", true);
          defineSymbol(math, main, bin, "\u2213", "\\mp", true);
          defineSymbol(math, main, bin, "\u2296", "\\ominus", true);
          defineSymbol(math, main, bin, "\u228E", "\\uplus", true);
          defineSymbol(math, main, bin, "\u2293", "\\sqcap", true);
          defineSymbol(math, main, bin, "\u2217", "\\ast");
          defineSymbol(math, main, bin, "\u2294", "\\sqcup", true);
          defineSymbol(math, main, bin, "\u25EF", "\\bigcirc", true);
          defineSymbol(math, main, bin, "\u2219", "\\bullet");
          defineSymbol(math, main, bin, "\u2021", "\\ddagger");
          defineSymbol(math, main, bin, "\u2240", "\\wr", true);
          defineSymbol(math, main, bin, "\u2A3F", "\\amalg");
          defineSymbol(math, main, bin, "&", "\\And");
          defineSymbol(math, main, rel, "\u27F5", "\\longleftarrow", true);
          defineSymbol(math, main, rel, "\u21D0", "\\Leftarrow", true);
          defineSymbol(math, main, rel, "\u27F8", "\\Longleftarrow", true);
          defineSymbol(math, main, rel, "\u27F6", "\\longrightarrow", true);
          defineSymbol(math, main, rel, "\u21D2", "\\Rightarrow", true);
          defineSymbol(math, main, rel, "\u27F9", "\\Longrightarrow", true);
          defineSymbol(math, main, rel, "\u2194", "\\leftrightarrow", true);
          defineSymbol(math, main, rel, "\u27F7", "\\longleftrightarrow", true);
          defineSymbol(math, main, rel, "\u21D4", "\\Leftrightarrow", true);
          defineSymbol(math, main, rel, "\u27FA", "\\Longleftrightarrow", true);
          defineSymbol(math, main, rel, "\u21A6", "\\mapsto", true);
          defineSymbol(math, main, rel, "\u27FC", "\\longmapsto", true);
          defineSymbol(math, main, rel, "\u2197", "\\nearrow", true);
          defineSymbol(math, main, rel, "\u21A9", "\\hookleftarrow", true);
          defineSymbol(math, main, rel, "\u21AA", "\\hookrightarrow", true);
          defineSymbol(math, main, rel, "\u2198", "\\searrow", true);
          defineSymbol(math, main, rel, "\u21BC", "\\leftharpoonup", true);
          defineSymbol(math, main, rel, "\u21C0", "\\rightharpoonup", true);
          defineSymbol(math, main, rel, "\u2199", "\\swarrow", true);
          defineSymbol(math, main, rel, "\u21BD", "\\leftharpoondown", true);
          defineSymbol(math, main, rel, "\u21C1", "\\rightharpoondown", true);
          defineSymbol(math, main, rel, "\u2196", "\\nwarrow", true);
          defineSymbol(math, main, rel, "\u21CC", "\\rightleftharpoons", true);
          defineSymbol(math, ams, rel, "\u226E", "\\nless", true);
          defineSymbol(math, ams, rel, "\uE010", "\\@nleqslant");
          defineSymbol(math, ams, rel, "\uE011", "\\@nleqq");
          defineSymbol(math, ams, rel, "\u2A87", "\\lneq", true);
          defineSymbol(math, ams, rel, "\u2268", "\\lneqq", true);
          defineSymbol(math, ams, rel, "\uE00C", "\\@lvertneqq");
          defineSymbol(math, ams, rel, "\u22E6", "\\lnsim", true);
          defineSymbol(math, ams, rel, "\u2A89", "\\lnapprox", true);
          defineSymbol(math, ams, rel, "\u2280", "\\nprec", true);
          defineSymbol(math, ams, rel, "\u22E0", "\\npreceq", true);
          defineSymbol(math, ams, rel, "\u22E8", "\\precnsim", true);
          defineSymbol(math, ams, rel, "\u2AB9", "\\precnapprox", true);
          defineSymbol(math, ams, rel, "\u2241", "\\nsim", true);
          defineSymbol(math, ams, rel, "\uE006", "\\@nshortmid");
          defineSymbol(math, ams, rel, "\u2224", "\\nmid", true);
          defineSymbol(math, ams, rel, "\u22AC", "\\nvdash", true);
          defineSymbol(math, ams, rel, "\u22AD", "\\nvDash", true);
          defineSymbol(math, ams, rel, "\u22EA", "\\ntriangleleft");
          defineSymbol(math, ams, rel, "\u22EC", "\\ntrianglelefteq", true);
          defineSymbol(math, ams, rel, "\u228A", "\\subsetneq", true);
          defineSymbol(math, ams, rel, "\uE01A", "\\@varsubsetneq");
          defineSymbol(math, ams, rel, "\u2ACB", "\\subsetneqq", true);
          defineSymbol(math, ams, rel, "\uE017", "\\@varsubsetneqq");
          defineSymbol(math, ams, rel, "\u226F", "\\ngtr", true);
          defineSymbol(math, ams, rel, "\uE00F", "\\@ngeqslant");
          defineSymbol(math, ams, rel, "\uE00E", "\\@ngeqq");
          defineSymbol(math, ams, rel, "\u2A88", "\\gneq", true);
          defineSymbol(math, ams, rel, "\u2269", "\\gneqq", true);
          defineSymbol(math, ams, rel, "\uE00D", "\\@gvertneqq");
          defineSymbol(math, ams, rel, "\u22E7", "\\gnsim", true);
          defineSymbol(math, ams, rel, "\u2A8A", "\\gnapprox", true);
          defineSymbol(math, ams, rel, "\u2281", "\\nsucc", true);
          defineSymbol(math, ams, rel, "\u22E1", "\\nsucceq", true);
          defineSymbol(math, ams, rel, "\u22E9", "\\succnsim", true);
          defineSymbol(math, ams, rel, "\u2ABA", "\\succnapprox", true);
          defineSymbol(math, ams, rel, "\u2246", "\\ncong", true);
          defineSymbol(math, ams, rel, "\uE007", "\\@nshortparallel");
          defineSymbol(math, ams, rel, "\u2226", "\\nparallel", true);
          defineSymbol(math, ams, rel, "\u22AF", "\\nVDash", true);
          defineSymbol(math, ams, rel, "\u22EB", "\\ntriangleright");
          defineSymbol(math, ams, rel, "\u22ED", "\\ntrianglerighteq", true);
          defineSymbol(math, ams, rel, "\uE018", "\\@nsupseteqq");
          defineSymbol(math, ams, rel, "\u228B", "\\supsetneq", true);
          defineSymbol(math, ams, rel, "\uE01B", "\\@varsupsetneq");
          defineSymbol(math, ams, rel, "\u2ACC", "\\supsetneqq", true);
          defineSymbol(math, ams, rel, "\uE019", "\\@varsupsetneqq");
          defineSymbol(math, ams, rel, "\u22AE", "\\nVdash", true);
          defineSymbol(math, ams, rel, "\u2AB5", "\\precneqq", true);
          defineSymbol(math, ams, rel, "\u2AB6", "\\succneqq", true);
          defineSymbol(math, ams, rel, "\uE016", "\\@nsubseteqq");
          defineSymbol(math, ams, bin, "\u22B4", "\\unlhd");
          defineSymbol(math, ams, bin, "\u22B5", "\\unrhd");
          defineSymbol(math, ams, rel, "\u219A", "\\nleftarrow", true);
          defineSymbol(math, ams, rel, "\u219B", "\\nrightarrow", true);
          defineSymbol(math, ams, rel, "\u21CD", "\\nLeftarrow", true);
          defineSymbol(math, ams, rel, "\u21CF", "\\nRightarrow", true);
          defineSymbol(math, ams, rel, "\u21AE", "\\nleftrightarrow", true);
          defineSymbol(math, ams, rel, "\u21CE", "\\nLeftrightarrow", true);
          defineSymbol(math, ams, rel, "\u25B3", "\\vartriangle");
          defineSymbol(math, ams, textord, "\u210F", "\\hslash");
          defineSymbol(math, ams, textord, "\u25BD", "\\triangledown");
          defineSymbol(math, ams, textord, "\u25CA", "\\lozenge");
          defineSymbol(math, ams, textord, "\u24C8", "\\circledS");
          defineSymbol(math, ams, textord, "\xAE", "\\circledR");
          defineSymbol(symbols_text, ams, textord, "\xAE", "\\circledR");
          defineSymbol(math, ams, textord, "\u2221", "\\measuredangle", true);
          defineSymbol(math, ams, textord, "\u2204", "\\nexists");
          defineSymbol(math, ams, textord, "\u2127", "\\mho");
          defineSymbol(math, ams, textord, "\u2132", "\\Finv", true);
          defineSymbol(math, ams, textord, "\u2141", "\\Game", true);
          defineSymbol(math, ams, textord, "\u2035", "\\backprime");
          defineSymbol(math, ams, textord, "\u25B2", "\\blacktriangle");
          defineSymbol(math, ams, textord, "\u25BC", "\\blacktriangledown");
          defineSymbol(math, ams, textord, "\u25A0", "\\blacksquare");
          defineSymbol(math, ams, textord, "\u29EB", "\\blacklozenge");
          defineSymbol(math, ams, textord, "\u2605", "\\bigstar");
          defineSymbol(math, ams, textord, "\u2222", "\\sphericalangle", true);
          defineSymbol(math, ams, textord, "\u2201", "\\complement", true);
          defineSymbol(math, ams, textord, "\xF0", "\\eth", true);
          defineSymbol(symbols_text, main, textord, "\xF0", "\xF0");
          defineSymbol(math, ams, textord, "\u2571", "\\diagup");
          defineSymbol(math, ams, textord, "\u2572", "\\diagdown");
          defineSymbol(math, ams, textord, "\u25A1", "\\square");
          defineSymbol(math, ams, textord, "\u25A1", "\\Box");
          defineSymbol(math, ams, textord, "\u25CA", "\\Diamond");
          defineSymbol(math, ams, textord, "\xA5", "\\yen", true);
          defineSymbol(symbols_text, ams, textord, "\xA5", "\\yen", true);
          defineSymbol(math, ams, textord, "\u2713", "\\checkmark", true);
          defineSymbol(symbols_text, ams, textord, "\u2713", "\\checkmark");
          defineSymbol(math, ams, textord, "\u2136", "\\beth", true);
          defineSymbol(math, ams, textord, "\u2138", "\\daleth", true);
          defineSymbol(math, ams, textord, "\u2137", "\\gimel", true);
          defineSymbol(math, ams, textord, "\u03DD", "\\digamma", true);
          defineSymbol(math, ams, textord, "\u03F0", "\\varkappa");
          defineSymbol(math, ams, symbols_open, "\u250C", "\\@ulcorner", true);
          defineSymbol(math, ams, symbols_close, "\u2510", "\\@urcorner", true);
          defineSymbol(math, ams, symbols_open, "\u2514", "\\@llcorner", true);
          defineSymbol(math, ams, symbols_close, "\u2518", "\\@lrcorner", true);
          defineSymbol(math, ams, rel, "\u2266", "\\leqq", true);
          defineSymbol(math, ams, rel, "\u2A7D", "\\leqslant", true);
          defineSymbol(math, ams, rel, "\u2A95", "\\eqslantless", true);
          defineSymbol(math, ams, rel, "\u2272", "\\lesssim", true);
          defineSymbol(math, ams, rel, "\u2A85", "\\lessapprox", true);
          defineSymbol(math, ams, rel, "\u224A", "\\approxeq", true);
          defineSymbol(math, ams, bin, "\u22D6", "\\lessdot");
          defineSymbol(math, ams, rel, "\u22D8", "\\lll", true);
          defineSymbol(math, ams, rel, "\u2276", "\\lessgtr", true);
          defineSymbol(math, ams, rel, "\u22DA", "\\lesseqgtr", true);
          defineSymbol(math, ams, rel, "\u2A8B", "\\lesseqqgtr", true);
          defineSymbol(math, ams, rel, "\u2251", "\\doteqdot");
          defineSymbol(math, ams, rel, "\u2253", "\\risingdotseq", true);
          defineSymbol(math, ams, rel, "\u2252", "\\fallingdotseq", true);
          defineSymbol(math, ams, rel, "\u223D", "\\backsim", true);
          defineSymbol(math, ams, rel, "\u22CD", "\\backsimeq", true);
          defineSymbol(math, ams, rel, "\u2AC5", "\\subseteqq", true);
          defineSymbol(math, ams, rel, "\u22D0", "\\Subset", true);
          defineSymbol(math, ams, rel, "\u228F", "\\sqsubset", true);
          defineSymbol(math, ams, rel, "\u227C", "\\preccurlyeq", true);
          defineSymbol(math, ams, rel, "\u22DE", "\\curlyeqprec", true);
          defineSymbol(math, ams, rel, "\u227E", "\\precsim", true);
          defineSymbol(math, ams, rel, "\u2AB7", "\\precapprox", true);
          defineSymbol(math, ams, rel, "\u22B2", "\\vartriangleleft");
          defineSymbol(math, ams, rel, "\u22B4", "\\trianglelefteq");
          defineSymbol(math, ams, rel, "\u22A8", "\\vDash", true);
          defineSymbol(math, ams, rel, "\u22AA", "\\Vvdash", true);
          defineSymbol(math, ams, rel, "\u2323", "\\smallsmile");
          defineSymbol(math, ams, rel, "\u2322", "\\smallfrown");
          defineSymbol(math, ams, rel, "\u224F", "\\bumpeq", true);
          defineSymbol(math, ams, rel, "\u224E", "\\Bumpeq", true);
          defineSymbol(math, ams, rel, "\u2267", "\\geqq", true);
          defineSymbol(math, ams, rel, "\u2A7E", "\\geqslant", true);
          defineSymbol(math, ams, rel, "\u2A96", "\\eqslantgtr", true);
          defineSymbol(math, ams, rel, "\u2273", "\\gtrsim", true);
          defineSymbol(math, ams, rel, "\u2A86", "\\gtrapprox", true);
          defineSymbol(math, ams, bin, "\u22D7", "\\gtrdot");
          defineSymbol(math, ams, rel, "\u22D9", "\\ggg", true);
          defineSymbol(math, ams, rel, "\u2277", "\\gtrless", true);
          defineSymbol(math, ams, rel, "\u22DB", "\\gtreqless", true);
          defineSymbol(math, ams, rel, "\u2A8C", "\\gtreqqless", true);
          defineSymbol(math, ams, rel, "\u2256", "\\eqcirc", true);
          defineSymbol(math, ams, rel, "\u2257", "\\circeq", true);
          defineSymbol(math, ams, rel, "\u225C", "\\triangleq", true);
          defineSymbol(math, ams, rel, "\u223C", "\\thicksim");
          defineSymbol(math, ams, rel, "\u2248", "\\thickapprox");
          defineSymbol(math, ams, rel, "\u2AC6", "\\supseteqq", true);
          defineSymbol(math, ams, rel, "\u22D1", "\\Supset", true);
          defineSymbol(math, ams, rel, "\u2290", "\\sqsupset", true);
          defineSymbol(math, ams, rel, "\u227D", "\\succcurlyeq", true);
          defineSymbol(math, ams, rel, "\u22DF", "\\curlyeqsucc", true);
          defineSymbol(math, ams, rel, "\u227F", "\\succsim", true);
          defineSymbol(math, ams, rel, "\u2AB8", "\\succapprox", true);
          defineSymbol(math, ams, rel, "\u22B3", "\\vartriangleright");
          defineSymbol(math, ams, rel, "\u22B5", "\\trianglerighteq");
          defineSymbol(math, ams, rel, "\u22A9", "\\Vdash", true);
          defineSymbol(math, ams, rel, "\u2223", "\\shortmid");
          defineSymbol(math, ams, rel, "\u2225", "\\shortparallel");
          defineSymbol(math, ams, rel, "\u226C", "\\between", true);
          defineSymbol(math, ams, rel, "\u22D4", "\\pitchfork", true);
          defineSymbol(math, ams, rel, "\u221D", "\\varpropto");
          defineSymbol(math, ams, rel, "\u25C0", "\\blacktriangleleft");
          defineSymbol(math, ams, rel, "\u2234", "\\therefore", true);
          defineSymbol(math, ams, rel, "\u220D", "\\backepsilon");
          defineSymbol(math, ams, rel, "\u25B6", "\\blacktriangleright");
          defineSymbol(math, ams, rel, "\u2235", "\\because", true);
          defineSymbol(math, ams, rel, "\u22D8", "\\llless");
          defineSymbol(math, ams, rel, "\u22D9", "\\gggtr");
          defineSymbol(math, ams, bin, "\u22B2", "\\lhd");
          defineSymbol(math, ams, bin, "\u22B3", "\\rhd");
          defineSymbol(math, ams, rel, "\u2242", "\\eqsim", true);
          defineSymbol(math, main, rel, "\u22C8", "\\Join");
          defineSymbol(math, ams, rel, "\u2251", "\\Doteq", true);
          defineSymbol(math, ams, bin, "\u2214", "\\dotplus", true);
          defineSymbol(math, ams, bin, "\u2216", "\\smallsetminus");
          defineSymbol(math, ams, bin, "\u22D2", "\\Cap", true);
          defineSymbol(math, ams, bin, "\u22D3", "\\Cup", true);
          defineSymbol(math, ams, bin, "\u2A5E", "\\doublebarwedge", true);
          defineSymbol(math, ams, bin, "\u229F", "\\boxminus", true);
          defineSymbol(math, ams, bin, "\u229E", "\\boxplus", true);
          defineSymbol(math, ams, bin, "\u22C7", "\\divideontimes", true);
          defineSymbol(math, ams, bin, "\u22C9", "\\ltimes", true);
          defineSymbol(math, ams, bin, "\u22CA", "\\rtimes", true);
          defineSymbol(math, ams, bin, "\u22CB", "\\leftthreetimes", true);
          defineSymbol(math, ams, bin, "\u22CC", "\\rightthreetimes", true);
          defineSymbol(math, ams, bin, "\u22CF", "\\curlywedge", true);
          defineSymbol(math, ams, bin, "\u22CE", "\\curlyvee", true);
          defineSymbol(math, ams, bin, "\u229D", "\\circleddash", true);
          defineSymbol(math, ams, bin, "\u229B", "\\circledast", true);
          defineSymbol(math, ams, bin, "\u22C5", "\\centerdot");
          defineSymbol(math, ams, bin, "\u22BA", "\\intercal", true);
          defineSymbol(math, ams, bin, "\u22D2", "\\doublecap");
          defineSymbol(math, ams, bin, "\u22D3", "\\doublecup");
          defineSymbol(math, ams, bin, "\u22A0", "\\boxtimes", true);
          defineSymbol(math, ams, rel, "\u21E2", "\\dashrightarrow", true);
          defineSymbol(math, ams, rel, "\u21E0", "\\dashleftarrow", true);
          defineSymbol(math, ams, rel, "\u21C7", "\\leftleftarrows", true);
          defineSymbol(math, ams, rel, "\u21C6", "\\leftrightarrows", true);
          defineSymbol(math, ams, rel, "\u21DA", "\\Lleftarrow", true);
          defineSymbol(math, ams, rel, "\u219E", "\\twoheadleftarrow", true);
          defineSymbol(math, ams, rel, "\u21A2", "\\leftarrowtail", true);
          defineSymbol(math, ams, rel, "\u21AB", "\\looparrowleft", true);
          defineSymbol(math, ams, rel, "\u21CB", "\\leftrightharpoons", true);
          defineSymbol(math, ams, rel, "\u21B6", "\\curvearrowleft", true);
          defineSymbol(math, ams, rel, "\u21BA", "\\circlearrowleft", true);
          defineSymbol(math, ams, rel, "\u21B0", "\\Lsh", true);
          defineSymbol(math, ams, rel, "\u21C8", "\\upuparrows", true);
          defineSymbol(math, ams, rel, "\u21BF", "\\upharpoonleft", true);
          defineSymbol(math, ams, rel, "\u21C3", "\\downharpoonleft", true);
          defineSymbol(math, main, rel, "\u22B6", "\\origof", true);
          defineSymbol(math, main, rel, "\u22B7", "\\imageof", true);
          defineSymbol(math, ams, rel, "\u22B8", "\\multimap", true);
          defineSymbol(math, ams, rel, "\u21AD", "\\leftrightsquigarrow", true);
          defineSymbol(math, ams, rel, "\u21C9", "\\rightrightarrows", true);
          defineSymbol(math, ams, rel, "\u21C4", "\\rightleftarrows", true);
          defineSymbol(math, ams, rel, "\u21A0", "\\twoheadrightarrow", true);
          defineSymbol(math, ams, rel, "\u21A3", "\\rightarrowtail", true);
          defineSymbol(math, ams, rel, "\u21AC", "\\looparrowright", true);
          defineSymbol(math, ams, rel, "\u21B7", "\\curvearrowright", true);
          defineSymbol(math, ams, rel, "\u21BB", "\\circlearrowright", true);
          defineSymbol(math, ams, rel, "\u21B1", "\\Rsh", true);
          defineSymbol(math, ams, rel, "\u21CA", "\\downdownarrows", true);
          defineSymbol(math, ams, rel, "\u21BE", "\\upharpoonright", true);
          defineSymbol(math, ams, rel, "\u21C2", "\\downharpoonright", true);
          defineSymbol(math, ams, rel, "\u21DD", "\\rightsquigarrow", true);
          defineSymbol(math, ams, rel, "\u21DD", "\\leadsto");
          defineSymbol(math, ams, rel, "\u21DB", "\\Rrightarrow", true);
          defineSymbol(math, ams, rel, "\u21BE", "\\restriction");
          defineSymbol(math, main, textord, "\u2018", "`");
          defineSymbol(math, main, textord, "$", "\\$");
          defineSymbol(symbols_text, main, textord, "$", "\\$");
          defineSymbol(symbols_text, main, textord, "$", "\\textdollar");
          defineSymbol(math, main, textord, "%", "\\%");
          defineSymbol(symbols_text, main, textord, "%", "\\%");
          defineSymbol(math, main, textord, "_", "\\_");
          defineSymbol(symbols_text, main, textord, "_", "\\_");
          defineSymbol(symbols_text, main, textord, "_", "\\textunderscore");
          defineSymbol(math, main, textord, "\u2220", "\\angle", true);
          defineSymbol(math, main, textord, "\u221E", "\\infty", true);
          defineSymbol(math, main, textord, "\u2032", "\\prime");
          defineSymbol(math, main, textord, "\u25B3", "\\triangle");
          defineSymbol(math, main, textord, "\u0393", "\\Gamma", true);
          defineSymbol(math, main, textord, "\u0394", "\\Delta", true);
          defineSymbol(math, main, textord, "\u0398", "\\Theta", true);
          defineSymbol(math, main, textord, "\u039B", "\\Lambda", true);
          defineSymbol(math, main, textord, "\u039E", "\\Xi", true);
          defineSymbol(math, main, textord, "\u03A0", "\\Pi", true);
          defineSymbol(math, main, textord, "\u03A3", "\\Sigma", true);
          defineSymbol(math, main, textord, "\u03A5", "\\Upsilon", true);
          defineSymbol(math, main, textord, "\u03A6", "\\Phi", true);
          defineSymbol(math, main, textord, "\u03A8", "\\Psi", true);
          defineSymbol(math, main, textord, "\u03A9", "\\Omega", true);
          defineSymbol(math, main, textord, "A", "\u0391");
          defineSymbol(math, main, textord, "B", "\u0392");
          defineSymbol(math, main, textord, "E", "\u0395");
          defineSymbol(math, main, textord, "Z", "\u0396");
          defineSymbol(math, main, textord, "H", "\u0397");
          defineSymbol(math, main, textord, "I", "\u0399");
          defineSymbol(math, main, textord, "K", "\u039A");
          defineSymbol(math, main, textord, "M", "\u039C");
          defineSymbol(math, main, textord, "N", "\u039D");
          defineSymbol(math, main, textord, "O", "\u039F");
          defineSymbol(math, main, textord, "P", "\u03A1");
          defineSymbol(math, main, textord, "T", "\u03A4");
          defineSymbol(math, main, textord, "X", "\u03A7");
          defineSymbol(math, main, textord, "\xAC", "\\neg", true);
          defineSymbol(math, main, textord, "\xAC", "\\lnot");
          defineSymbol(math, main, textord, "\u22A4", "\\top");
          defineSymbol(math, main, textord, "\u22A5", "\\bot");
          defineSymbol(math, main, textord, "\u2205", "\\emptyset");
          defineSymbol(math, ams, textord, "\u2205", "\\varnothing");
          defineSymbol(math, main, mathord, "\u03B1", "\\alpha", true);
          defineSymbol(math, main, mathord, "\u03B2", "\\beta", true);
          defineSymbol(math, main, mathord, "\u03B3", "\\gamma", true);
          defineSymbol(math, main, mathord, "\u03B4", "\\delta", true);
          defineSymbol(math, main, mathord, "\u03F5", "\\epsilon", true);
          defineSymbol(math, main, mathord, "\u03B6", "\\zeta", true);
          defineSymbol(math, main, mathord, "\u03B7", "\\eta", true);
          defineSymbol(math, main, mathord, "\u03B8", "\\theta", true);
          defineSymbol(math, main, mathord, "\u03B9", "\\iota", true);
          defineSymbol(math, main, mathord, "\u03BA", "\\kappa", true);
          defineSymbol(math, main, mathord, "\u03BB", "\\lambda", true);
          defineSymbol(math, main, mathord, "\u03BC", "\\mu", true);
          defineSymbol(math, main, mathord, "\u03BD", "\\nu", true);
          defineSymbol(math, main, mathord, "\u03BE", "\\xi", true);
          defineSymbol(math, main, mathord, "\u03BF", "\\omicron", true);
          defineSymbol(math, main, mathord, "\u03C0", "\\pi", true);
          defineSymbol(math, main, mathord, "\u03C1", "\\rho", true);
          defineSymbol(math, main, mathord, "\u03C3", "\\sigma", true);
          defineSymbol(math, main, mathord, "\u03C4", "\\tau", true);
          defineSymbol(math, main, mathord, "\u03C5", "\\upsilon", true);
          defineSymbol(math, main, mathord, "\u03D5", "\\phi", true);
          defineSymbol(math, main, mathord, "\u03C7", "\\chi", true);
          defineSymbol(math, main, mathord, "\u03C8", "\\psi", true);
          defineSymbol(math, main, mathord, "\u03C9", "\\omega", true);
          defineSymbol(math, main, mathord, "\u03B5", "\\varepsilon", true);
          defineSymbol(math, main, mathord, "\u03D1", "\\vartheta", true);
          defineSymbol(math, main, mathord, "\u03D6", "\\varpi", true);
          defineSymbol(math, main, mathord, "\u03F1", "\\varrho", true);
          defineSymbol(math, main, mathord, "\u03C2", "\\varsigma", true);
          defineSymbol(math, main, mathord, "\u03C6", "\\varphi", true);
          defineSymbol(math, main, bin, "\u2217", "*", true);
          defineSymbol(math, main, bin, "+", "+");
          defineSymbol(math, main, bin, "\u2212", "-", true);
          defineSymbol(math, main, bin, "\u22C5", "\\cdot", true);
          defineSymbol(math, main, bin, "\u2218", "\\circ");
          defineSymbol(math, main, bin, "\xF7", "\\div", true);
          defineSymbol(math, main, bin, "\xB1", "\\pm", true);
          defineSymbol(math, main, bin, "\xD7", "\\times", true);
          defineSymbol(math, main, bin, "\u2229", "\\cap", true);
          defineSymbol(math, main, bin, "\u222A", "\\cup", true);
          defineSymbol(math, main, bin, "\u2216", "\\setminus");
          defineSymbol(math, main, bin, "\u2227", "\\land");
          defineSymbol(math, main, bin, "\u2228", "\\lor");
          defineSymbol(math, main, bin, "\u2227", "\\wedge", true);
          defineSymbol(math, main, bin, "\u2228", "\\vee", true);
          defineSymbol(math, main, textord, "\u221A", "\\surd");
          defineSymbol(math, main, symbols_open, "\u27E8", "\\langle", true);
          defineSymbol(math, main, symbols_open, "\u2223", "\\lvert");
          defineSymbol(math, main, symbols_open, "\u2225", "\\lVert");
          defineSymbol(math, main, symbols_close, "?", "?");
          defineSymbol(math, main, symbols_close, "!", "!");
          defineSymbol(math, main, symbols_close, "\u27E9", "\\rangle", true);
          defineSymbol(math, main, symbols_close, "\u2223", "\\rvert");
          defineSymbol(math, main, symbols_close, "\u2225", "\\rVert");
          defineSymbol(math, main, rel, "=", "=");
          defineSymbol(math, main, rel, ":", ":");
          defineSymbol(math, main, rel, "\u2248", "\\approx", true);
          defineSymbol(math, main, rel, "\u2245", "\\cong", true);
          defineSymbol(math, main, rel, "\u2265", "\\ge");
          defineSymbol(math, main, rel, "\u2265", "\\geq", true);
          defineSymbol(math, main, rel, "\u2190", "\\gets");
          defineSymbol(math, main, rel, ">", "\\gt", true);
          defineSymbol(math, main, rel, "\u2208", "\\in", true);
          defineSymbol(math, main, rel, "\uE020", "\\@not");
          defineSymbol(math, main, rel, "\u2282", "\\subset", true);
          defineSymbol(math, main, rel, "\u2283", "\\supset", true);
          defineSymbol(math, main, rel, "\u2286", "\\subseteq", true);
          defineSymbol(math, main, rel, "\u2287", "\\supseteq", true);
          defineSymbol(math, ams, rel, "\u2288", "\\nsubseteq", true);
          defineSymbol(math, ams, rel, "\u2289", "\\nsupseteq", true);
          defineSymbol(math, main, rel, "\u22A8", "\\models");
          defineSymbol(math, main, rel, "\u2190", "\\leftarrow", true);
          defineSymbol(math, main, rel, "\u2264", "\\le");
          defineSymbol(math, main, rel, "\u2264", "\\leq", true);
          defineSymbol(math, main, rel, "<", "\\lt", true);
          defineSymbol(math, main, rel, "\u2192", "\\rightarrow", true);
          defineSymbol(math, main, rel, "\u2192", "\\to");
          defineSymbol(math, ams, rel, "\u2271", "\\ngeq", true);
          defineSymbol(math, ams, rel, "\u2270", "\\nleq", true);
          defineSymbol(math, main, spacing, "\xA0", "\\ ");
          defineSymbol(math, main, spacing, "\xA0", "\\space");
          defineSymbol(math, main, spacing, "\xA0", "\\nobreakspace");
          defineSymbol(symbols_text, main, spacing, "\xA0", "\\ ");
          defineSymbol(symbols_text, main, spacing, "\xA0", " ");
          defineSymbol(symbols_text, main, spacing, "\xA0", "\\space");
          defineSymbol(symbols_text, main, spacing, "\xA0", "\\nobreakspace");
          defineSymbol(math, main, spacing, null, "\\nobreak");
          defineSymbol(math, main, spacing, null, "\\allowbreak");
          defineSymbol(math, main, punct, ",", ",");
          defineSymbol(math, main, punct, ";", ";");
          defineSymbol(math, ams, bin, "\u22BC", "\\barwedge", true);
          defineSymbol(math, ams, bin, "\u22BB", "\\veebar", true);
          defineSymbol(math, main, bin, "\u2299", "\\odot", true);
          defineSymbol(math, main, bin, "\u2295", "\\oplus", true);
          defineSymbol(math, main, bin, "\u2297", "\\otimes", true);
          defineSymbol(math, main, textord, "\u2202", "\\partial", true);
          defineSymbol(math, main, bin, "\u2298", "\\oslash", true);
          defineSymbol(math, ams, bin, "\u229A", "\\circledcirc", true);
          defineSymbol(math, ams, bin, "\u22A1", "\\boxdot", true);
          defineSymbol(math, main, bin, "\u25B3", "\\bigtriangleup");
          defineSymbol(math, main, bin, "\u25BD", "\\bigtriangledown");
          defineSymbol(math, main, bin, "\u2020", "\\dagger");
          defineSymbol(math, main, bin, "\u22C4", "\\diamond");
          defineSymbol(math, main, bin, "\u22C6", "\\star");
          defineSymbol(math, main, bin, "\u25C3", "\\triangleleft");
          defineSymbol(math, main, bin, "\u25B9", "\\triangleright");
          defineSymbol(math, main, symbols_open, "{", "\\{");
          defineSymbol(symbols_text, main, textord, "{", "\\{");
          defineSymbol(symbols_text, main, textord, "{", "\\textbraceleft");
          defineSymbol(math, main, symbols_close, "}", "\\}");
          defineSymbol(symbols_text, main, textord, "}", "\\}");
          defineSymbol(symbols_text, main, textord, "}", "\\textbraceright");
          defineSymbol(math, main, symbols_open, "{", "\\lbrace");
          defineSymbol(math, main, symbols_close, "}", "\\rbrace");
          defineSymbol(math, main, symbols_open, "[", "\\lbrack", true);
          defineSymbol(symbols_text, main, textord, "[", "\\lbrack", true);
          defineSymbol(math, main, symbols_close, "]", "\\rbrack", true);
          defineSymbol(symbols_text, main, textord, "]", "\\rbrack", true);
          defineSymbol(math, main, symbols_open, "(", "\\lparen", true);
          defineSymbol(math, main, symbols_close, ")", "\\rparen", true);
          defineSymbol(symbols_text, main, textord, "<", "\\textless", true);
          defineSymbol(symbols_text, main, textord, ">", "\\textgreater", true);
          defineSymbol(math, main, symbols_open, "\u230A", "\\lfloor", true);
          defineSymbol(math, main, symbols_close, "\u230B", "\\rfloor", true);
          defineSymbol(math, main, symbols_open, "\u2308", "\\lceil", true);
          defineSymbol(math, main, symbols_close, "\u2309", "\\rceil", true);
          defineSymbol(math, main, textord, "\\", "\\backslash");
          defineSymbol(math, main, textord, "\u2223", "|");
          defineSymbol(math, main, textord, "\u2223", "\\vert");
          defineSymbol(symbols_text, main, textord, "|", "\\textbar", true);
          defineSymbol(math, main, textord, "\u2225", "\\|");
          defineSymbol(math, main, textord, "\u2225", "\\Vert");
          defineSymbol(symbols_text, main, textord, "\u2225", "\\textbardbl");
          defineSymbol(symbols_text, main, textord, "~", "\\textasciitilde");
          defineSymbol(symbols_text, main, textord, "\\", "\\textbackslash");
          defineSymbol(symbols_text, main, textord, "^", "\\textasciicircum");
          defineSymbol(math, main, rel, "\u2191", "\\uparrow", true);
          defineSymbol(math, main, rel, "\u21D1", "\\Uparrow", true);
          defineSymbol(math, main, rel, "\u2193", "\\downarrow", true);
          defineSymbol(math, main, rel, "\u21D3", "\\Downarrow", true);
          defineSymbol(math, main, rel, "\u2195", "\\updownarrow", true);
          defineSymbol(math, main, rel, "\u21D5", "\\Updownarrow", true);
          defineSymbol(math, main, op, "\u2210", "\\coprod");
          defineSymbol(math, main, op, "\u22C1", "\\bigvee");
          defineSymbol(math, main, op, "\u22C0", "\\bigwedge");
          defineSymbol(math, main, op, "\u2A04", "\\biguplus");
          defineSymbol(math, main, op, "\u22C2", "\\bigcap");
          defineSymbol(math, main, op, "\u22C3", "\\bigcup");
          defineSymbol(math, main, op, "\u222B", "\\int");
          defineSymbol(math, main, op, "\u222B", "\\intop");
          defineSymbol(math, main, op, "\u222C", "\\iint");
          defineSymbol(math, main, op, "\u222D", "\\iiint");
          defineSymbol(math, main, op, "\u220F", "\\prod");
          defineSymbol(math, main, op, "\u2211", "\\sum");
          defineSymbol(math, main, op, "\u2A02", "\\bigotimes");
          defineSymbol(math, main, op, "\u2A01", "\\bigoplus");
          defineSymbol(math, main, op, "\u2A00", "\\bigodot");
          defineSymbol(math, main, op, "\u222E", "\\oint");
          defineSymbol(math, main, op, "\u222F", "\\oiint");
          defineSymbol(math, main, op, "\u2230", "\\oiiint");
          defineSymbol(math, main, op, "\u2A06", "\\bigsqcup");
          defineSymbol(math, main, op, "\u222B", "\\smallint");
          defineSymbol(symbols_text, main, inner, "\u2026", "\\textellipsis");
          defineSymbol(math, main, inner, "\u2026", "\\mathellipsis");
          defineSymbol(symbols_text, main, inner, "\u2026", "\\ldots", true);
          defineSymbol(math, main, inner, "\u2026", "\\ldots", true);
          defineSymbol(math, main, inner, "\u22EF", "\\@cdots", true);
          defineSymbol(math, main, inner, "\u22F1", "\\ddots", true);
          defineSymbol(math, main, textord, "\u22EE", "\\varvdots");
          defineSymbol(math, main, accent, "\u02CA", "\\acute");
          defineSymbol(math, main, accent, "\u02CB", "\\grave");
          defineSymbol(math, main, accent, "\xA8", "\\ddot");
          defineSymbol(math, main, accent, "~", "\\tilde");
          defineSymbol(math, main, accent, "\u02C9", "\\bar");
          defineSymbol(math, main, accent, "\u02D8", "\\breve");
          defineSymbol(math, main, accent, "\u02C7", "\\check");
          defineSymbol(math, main, accent, "^", "\\hat");
          defineSymbol(math, main, accent, "\u20D7", "\\vec");
          defineSymbol(math, main, accent, "\u02D9", "\\dot");
          defineSymbol(math, main, accent, "\u02DA", "\\mathring");
          defineSymbol(math, main, mathord, "\uE131", "\\@imath");
          defineSymbol(math, main, mathord, "\uE237", "\\@jmath");
          defineSymbol(math, main, textord, "\u0131", "\u0131");
          defineSymbol(math, main, textord, "\u0237", "\u0237");
          defineSymbol(symbols_text, main, textord, "\u0131", "\\i", true);
          defineSymbol(symbols_text, main, textord, "\u0237", "\\j", true);
          defineSymbol(symbols_text, main, textord, "\xDF", "\\ss", true);
          defineSymbol(symbols_text, main, textord, "\xE6", "\\ae", true);
          defineSymbol(symbols_text, main, textord, "\u0153", "\\oe", true);
          defineSymbol(symbols_text, main, textord, "\xF8", "\\o", true);
          defineSymbol(symbols_text, main, textord, "\xC6", "\\AE", true);
          defineSymbol(symbols_text, main, textord, "\u0152", "\\OE", true);
          defineSymbol(symbols_text, main, textord, "\xD8", "\\O", true);
          defineSymbol(symbols_text, main, accent, "\u02CA", "\\'");
          defineSymbol(symbols_text, main, accent, "\u02CB", "\\`");
          defineSymbol(symbols_text, main, accent, "\u02C6", "\\^");
          defineSymbol(symbols_text, main, accent, "\u02DC", "\\~");
          defineSymbol(symbols_text, main, accent, "\u02C9", "\\=");
          defineSymbol(symbols_text, main, accent, "\u02D8", "\\u");
          defineSymbol(symbols_text, main, accent, "\u02D9", "\\.");
          defineSymbol(symbols_text, main, accent, "\xB8", "\\c");
          defineSymbol(symbols_text, main, accent, "\u02DA", "\\r");
          defineSymbol(symbols_text, main, accent, "\u02C7", "\\v");
          defineSymbol(symbols_text, main, accent, "\xA8", '\\"');
          defineSymbol(symbols_text, main, accent, "\u02DD", "\\H");
          defineSymbol(symbols_text, main, accent, "\u25EF", "\\textcircled");
          var ligatures = {
            "--": true,
            "---": true,
            "``": true,
            "''": true
          };
          defineSymbol(symbols_text, main, textord, "\u2013", "--", true);
          defineSymbol(symbols_text, main, textord, "\u2013", "\\textendash");
          defineSymbol(symbols_text, main, textord, "\u2014", "---", true);
          defineSymbol(symbols_text, main, textord, "\u2014", "\\textemdash");
          defineSymbol(symbols_text, main, textord, "\u2018", "`", true);
          defineSymbol(symbols_text, main, textord, "\u2018", "\\textquoteleft");
          defineSymbol(symbols_text, main, textord, "\u2019", "'", true);
          defineSymbol(symbols_text, main, textord, "\u2019", "\\textquoteright");
          defineSymbol(symbols_text, main, textord, "\u201C", "``", true);
          defineSymbol(symbols_text, main, textord, "\u201C", "\\textquotedblleft");
          defineSymbol(symbols_text, main, textord, "\u201D", "''", true);
          defineSymbol(symbols_text, main, textord, "\u201D", "\\textquotedblright");
          defineSymbol(math, main, textord, "\xB0", "\\degree", true);
          defineSymbol(symbols_text, main, textord, "\xB0", "\\degree");
          defineSymbol(symbols_text, main, textord, "\xB0", "\\textdegree", true);
          defineSymbol(math, main, textord, "\xA3", "\\pounds");
          defineSymbol(math, main, textord, "\xA3", "\\mathsterling", true);
          defineSymbol(symbols_text, main, textord, "\xA3", "\\pounds");
          defineSymbol(symbols_text, main, textord, "\xA3", "\\textsterling", true);
          defineSymbol(math, ams, textord, "\u2720", "\\maltese");
          defineSymbol(symbols_text, ams, textord, "\u2720", "\\maltese");
          var mathTextSymbols = '0123456789/@."';
          for (var i2 = 0; i2 < mathTextSymbols.length; i2++) {
            var ch = mathTextSymbols.charAt(i2);
            defineSymbol(math, main, textord, ch, ch);
          }
          var textSymbols = '0123456789!@*()-=+";:?/.,';
          for (var _i = 0; _i < textSymbols.length; _i++) {
            var _ch = textSymbols.charAt(_i);
            defineSymbol(symbols_text, main, textord, _ch, _ch);
          }
          var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          for (var _i2 = 0; _i2 < letters.length; _i2++) {
            var _ch2 = letters.charAt(_i2);
            defineSymbol(math, main, mathord, _ch2, _ch2);
            defineSymbol(symbols_text, main, textord, _ch2, _ch2);
          }
          defineSymbol(math, ams, textord, "C", "\u2102");
          defineSymbol(symbols_text, ams, textord, "C", "\u2102");
          defineSymbol(math, ams, textord, "H", "\u210D");
          defineSymbol(symbols_text, ams, textord, "H", "\u210D");
          defineSymbol(math, ams, textord, "N", "\u2115");
          defineSymbol(symbols_text, ams, textord, "N", "\u2115");
          defineSymbol(math, ams, textord, "P", "\u2119");
          defineSymbol(symbols_text, ams, textord, "P", "\u2119");
          defineSymbol(math, ams, textord, "Q", "\u211A");
          defineSymbol(symbols_text, ams, textord, "Q", "\u211A");
          defineSymbol(math, ams, textord, "R", "\u211D");
          defineSymbol(symbols_text, ams, textord, "R", "\u211D");
          defineSymbol(math, ams, textord, "Z", "\u2124");
          defineSymbol(symbols_text, ams, textord, "Z", "\u2124");
          defineSymbol(math, main, mathord, "h", "\u210E");
          defineSymbol(symbols_text, main, mathord, "h", "\u210E");
          var wideChar = "";
          for (var _i3 = 0; _i3 < letters.length; _i3++) {
            var _ch3 = letters.charAt(_i3);
            wideChar = String.fromCharCode(55349, 56320 + _i3);
            defineSymbol(math, main, mathord, _ch3, wideChar);
            defineSymbol(symbols_text, main, textord, _ch3, wideChar);
            wideChar = String.fromCharCode(55349, 56372 + _i3);
            defineSymbol(math, main, mathord, _ch3, wideChar);
            defineSymbol(symbols_text, main, textord, _ch3, wideChar);
            wideChar = String.fromCharCode(55349, 56424 + _i3);
            defineSymbol(math, main, mathord, _ch3, wideChar);
            defineSymbol(symbols_text, main, textord, _ch3, wideChar);
            wideChar = String.fromCharCode(55349, 56580 + _i3);
            defineSymbol(math, main, mathord, _ch3, wideChar);
            defineSymbol(symbols_text, main, textord, _ch3, wideChar);
            wideChar = String.fromCharCode(55349, 56736 + _i3);
            defineSymbol(math, main, mathord, _ch3, wideChar);
            defineSymbol(symbols_text, main, textord, _ch3, wideChar);
            wideChar = String.fromCharCode(55349, 56788 + _i3);
            defineSymbol(math, main, mathord, _ch3, wideChar);
            defineSymbol(symbols_text, main, textord, _ch3, wideChar);
            wideChar = String.fromCharCode(55349, 56840 + _i3);
            defineSymbol(math, main, mathord, _ch3, wideChar);
            defineSymbol(symbols_text, main, textord, _ch3, wideChar);
            wideChar = String.fromCharCode(55349, 56944 + _i3);
            defineSymbol(math, main, mathord, _ch3, wideChar);
            defineSymbol(symbols_text, main, textord, _ch3, wideChar);
            if (_i3 < 26) {
              wideChar = String.fromCharCode(55349, 56632 + _i3);
              defineSymbol(math, main, mathord, _ch3, wideChar);
              defineSymbol(symbols_text, main, textord, _ch3, wideChar);
              wideChar = String.fromCharCode(55349, 56476 + _i3);
              defineSymbol(math, main, mathord, _ch3, wideChar);
              defineSymbol(symbols_text, main, textord, _ch3, wideChar);
            }
          }
          wideChar = String.fromCharCode(55349, 56668);
          defineSymbol(math, main, mathord, "k", wideChar);
          defineSymbol(symbols_text, main, textord, "k", wideChar);
          for (var _i4 = 0; _i4 < 10; _i4++) {
            var _ch4 = _i4.toString();
            wideChar = String.fromCharCode(55349, 57294 + _i4);
            defineSymbol(math, main, mathord, _ch4, wideChar);
            defineSymbol(symbols_text, main, textord, _ch4, wideChar);
            wideChar = String.fromCharCode(55349, 57314 + _i4);
            defineSymbol(math, main, mathord, _ch4, wideChar);
            defineSymbol(symbols_text, main, textord, _ch4, wideChar);
            wideChar = String.fromCharCode(55349, 57324 + _i4);
            defineSymbol(math, main, mathord, _ch4, wideChar);
            defineSymbol(symbols_text, main, textord, _ch4, wideChar);
            wideChar = String.fromCharCode(55349, 57334 + _i4);
            defineSymbol(math, main, mathord, _ch4, wideChar);
            defineSymbol(symbols_text, main, textord, _ch4, wideChar);
          }
          var extraLatin = "\xD0\xDE\xFE";
          for (var _i5 = 0; _i5 < extraLatin.length; _i5++) {
            var _ch5 = extraLatin.charAt(_i5);
            defineSymbol(math, main, mathord, _ch5, _ch5);
            defineSymbol(symbols_text, main, textord, _ch5, _ch5);
          }
          ;
          var wideLatinLetterData = [
            ["mathbf", "textbf", "Main-Bold"],
            ["mathbf", "textbf", "Main-Bold"],
            ["mathnormal", "textit", "Math-Italic"],
            ["mathnormal", "textit", "Math-Italic"],
            ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
            ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
            ["mathscr", "textscr", "Script-Regular"],
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
            ["mathfrak", "textfrak", "Fraktur-Regular"],
            ["mathfrak", "textfrak", "Fraktur-Regular"],
            ["mathbb", "textbb", "AMS-Regular"],
            ["mathbb", "textbb", "AMS-Regular"],
            ["", "", ""],
            ["", "", ""],
            ["mathsf", "textsf", "SansSerif-Regular"],
            ["mathsf", "textsf", "SansSerif-Regular"],
            ["mathboldsf", "textboldsf", "SansSerif-Bold"],
            ["mathboldsf", "textboldsf", "SansSerif-Bold"],
            ["mathitsf", "textitsf", "SansSerif-Italic"],
            ["mathitsf", "textitsf", "SansSerif-Italic"],
            ["", "", ""],
            ["", "", ""],
            ["mathtt", "texttt", "Typewriter-Regular"],
            ["mathtt", "texttt", "Typewriter-Regular"]
          ];
          var wideNumeralData = [
            ["mathbf", "textbf", "Main-Bold"],
            ["", "", ""],
            ["mathsf", "textsf", "SansSerif-Regular"],
            ["mathboldsf", "textboldsf", "SansSerif-Bold"],
            ["mathtt", "texttt", "Typewriter-Regular"]
          ];
          var wideCharacterFont = function wideCharacterFont2(wideChar2, mode) {
            var H2 = wideChar2.charCodeAt(0);
            var L2 = wideChar2.charCodeAt(1);
            var codePoint = (H2 - 55296) * 1024 + (L2 - 56320) + 65536;
            var j2 = mode === "math" ? 0 : 1;
            if (119808 <= codePoint && codePoint < 120484) {
              var i3 = Math.floor((codePoint - 119808) / 26);
              return [wideLatinLetterData[i3][2], wideLatinLetterData[i3][j2]];
            } else if (120782 <= codePoint && codePoint <= 120831) {
              var _i6 = Math.floor((codePoint - 120782) / 10);
              return [wideNumeralData[_i6][2], wideNumeralData[_i6][j2]];
            } else if (codePoint === 120485 || codePoint === 120486) {
              return [wideLatinLetterData[0][2], wideLatinLetterData[0][j2]];
            } else if (120486 < codePoint && codePoint < 120782) {
              return ["", ""];
            } else {
              throw new src_ParseError("Unsupported character: " + wideChar2);
            }
          };
          ;
          var lookupSymbol = function lookupSymbol2(value, fontName, mode) {
            if (src_symbols[mode][value] && src_symbols[mode][value].replace) {
              value = src_symbols[mode][value].replace;
            }
            return {
              value,
              metrics: getCharacterMetrics(value, fontName, mode)
            };
          };
          var makeSymbol = function makeSymbol2(value, fontName, mode, options2, classes) {
            var lookup = lookupSymbol(value, fontName, mode);
            var metrics = lookup.metrics;
            value = lookup.value;
            var symbolNode;
            if (metrics) {
              var italic = metrics.italic;
              if (mode === "text" || options2 && options2.font === "mathit") {
                italic = 0;
              }
              symbolNode = new SymbolNode(value, metrics.height, metrics.depth, italic, metrics.skew, metrics.width, classes);
            } else {
              typeof console !== "undefined" && console.warn("No character metrics " + ("for '" + value + "' in style '" + fontName + "' and mode '" + mode + "'"));
              symbolNode = new SymbolNode(value, 0, 0, 0, 0, 0, classes);
            }
            if (options2) {
              symbolNode.maxFontSize = options2.sizeMultiplier;
              if (options2.style.isTight()) {
                symbolNode.classes.push("mtight");
              }
              var color = options2.getColor();
              if (color) {
                symbolNode.style.color = color;
              }
            }
            return symbolNode;
          };
          var mathsym = function mathsym2(value, mode, options2, classes) {
            if (classes === void 0) {
              classes = [];
            }
            if (options2.font === "boldsymbol" && lookupSymbol(value, "Main-Bold", mode).metrics) {
              return makeSymbol(value, "Main-Bold", mode, options2, classes.concat(["mathbf"]));
            } else if (value === "\\" || src_symbols[mode][value].font === "main") {
              return makeSymbol(value, "Main-Regular", mode, options2, classes);
            } else {
              return makeSymbol(value, "AMS-Regular", mode, options2, classes.concat(["amsrm"]));
            }
          };
          var boldsymbol = function boldsymbol2(value, mode, options2, classes, type) {
            if (type !== "textord" && lookupSymbol(value, "Math-BoldItalic", mode).metrics) {
              return {
                fontName: "Math-BoldItalic",
                fontClass: "boldsymbol"
              };
            } else {
              return {
                fontName: "Main-Bold",
                fontClass: "mathbf"
              };
            }
          };
          var makeOrd = function makeOrd2(group, options2, type) {
            var mode = group.mode;
            var text = group.text;
            var classes = ["mord"];
            var isFont = mode === "math" || mode === "text" && options2.font;
            var fontOrFamily = isFont ? options2.font : options2.fontFamily;
            if (text.charCodeAt(0) === 55349) {
              var _wideCharacterFont = wideCharacterFont(text, mode), wideFontName = _wideCharacterFont[0], wideFontClass = _wideCharacterFont[1];
              return makeSymbol(text, wideFontName, mode, options2, classes.concat(wideFontClass));
            } else if (fontOrFamily) {
              var fontName;
              var fontClasses;
              if (fontOrFamily === "boldsymbol") {
                var fontData = boldsymbol(text, mode, options2, classes, type);
                fontName = fontData.fontName;
                fontClasses = [fontData.fontClass];
              } else if (isFont) {
                fontName = fontMap[fontOrFamily].fontName;
                fontClasses = [fontOrFamily];
              } else {
                fontName = retrieveTextFontName(fontOrFamily, options2.fontWeight, options2.fontShape);
                fontClasses = [fontOrFamily, options2.fontWeight, options2.fontShape];
              }
              if (lookupSymbol(text, fontName, mode).metrics) {
                return makeSymbol(text, fontName, mode, options2, classes.concat(fontClasses));
              } else if (ligatures.hasOwnProperty(text) && fontName.substr(0, 10) === "Typewriter") {
                var parts = [];
                for (var i3 = 0; i3 < text.length; i3++) {
                  parts.push(makeSymbol(text[i3], fontName, mode, options2, classes.concat(fontClasses)));
                }
                return makeFragment(parts);
              }
            }
            if (type === "mathord") {
              return makeSymbol(text, "Math-Italic", mode, options2, classes.concat(["mathnormal"]));
            } else if (type === "textord") {
              var font = src_symbols[mode][text] && src_symbols[mode][text].font;
              if (font === "ams") {
                var _fontName = retrieveTextFontName("amsrm", options2.fontWeight, options2.fontShape);
                return makeSymbol(text, _fontName, mode, options2, classes.concat("amsrm", options2.fontWeight, options2.fontShape));
              } else if (font === "main" || !font) {
                var _fontName2 = retrieveTextFontName("textrm", options2.fontWeight, options2.fontShape);
                return makeSymbol(text, _fontName2, mode, options2, classes.concat(options2.fontWeight, options2.fontShape));
              } else {
                var _fontName3 = retrieveTextFontName(font, options2.fontWeight, options2.fontShape);
                return makeSymbol(text, _fontName3, mode, options2, classes.concat(_fontName3, options2.fontWeight, options2.fontShape));
              }
            } else {
              throw new Error("unexpected type: " + type + " in makeOrd");
            }
          };
          var canCombine = function canCombine2(prev, next) {
            if (createClass(prev.classes) !== createClass(next.classes) || prev.skew !== next.skew || prev.maxFontSize !== next.maxFontSize) {
              return false;
            }
            if (prev.classes.length === 1) {
              var cls = prev.classes[0];
              if (cls === "mbin" || cls === "mord") {
                return false;
              }
            }
            for (var style in prev.style) {
              if (prev.style.hasOwnProperty(style) && prev.style[style] !== next.style[style]) {
                return false;
              }
            }
            for (var _style in next.style) {
              if (next.style.hasOwnProperty(_style) && prev.style[_style] !== next.style[_style]) {
                return false;
              }
            }
            return true;
          };
          var tryCombineChars = function tryCombineChars2(chars) {
            for (var i3 = 0; i3 < chars.length - 1; i3++) {
              var prev = chars[i3];
              var next = chars[i3 + 1];
              if (prev instanceof SymbolNode && next instanceof SymbolNode && canCombine(prev, next)) {
                prev.text += next.text;
                prev.height = Math.max(prev.height, next.height);
                prev.depth = Math.max(prev.depth, next.depth);
                prev.italic = next.italic;
                chars.splice(i3 + 1, 1);
                i3--;
              }
            }
            return chars;
          };
          var sizeElementFromChildren = function sizeElementFromChildren2(elem) {
            var height = 0;
            var depth = 0;
            var maxFontSize = 0;
            for (var i3 = 0; i3 < elem.children.length; i3++) {
              var child = elem.children[i3];
              if (child.height > height) {
                height = child.height;
              }
              if (child.depth > depth) {
                depth = child.depth;
              }
              if (child.maxFontSize > maxFontSize) {
                maxFontSize = child.maxFontSize;
              }
            }
            elem.height = height;
            elem.depth = depth;
            elem.maxFontSize = maxFontSize;
          };
          var makeSpan = function makeSpan2(classes, children, options2, style) {
            var span = new Span(classes, children, options2, style);
            sizeElementFromChildren(span);
            return span;
          };
          var makeSvgSpan = function makeSvgSpan2(classes, children, options2, style) {
            return new Span(classes, children, options2, style);
          };
          var makeLineSpan = function makeLineSpan2(className, options2, thickness) {
            var line = makeSpan([className], [], options2);
            line.height = Math.max(thickness || options2.fontMetrics().defaultRuleThickness, options2.minRuleThickness);
            line.style.borderBottomWidth = makeEm(line.height);
            line.maxFontSize = 1;
            return line;
          };
          var makeAnchor = function makeAnchor2(href, classes, children, options2) {
            var anchor = new Anchor(href, classes, children, options2);
            sizeElementFromChildren(anchor);
            return anchor;
          };
          var makeFragment = function makeFragment2(children) {
            var fragment = new DocumentFragment(children);
            sizeElementFromChildren(fragment);
            return fragment;
          };
          var wrapFragment = function wrapFragment2(group, options2) {
            if (group instanceof DocumentFragment) {
              return makeSpan([], [group], options2);
            }
            return group;
          };
          var getVListChildrenAndDepth = function getVListChildrenAndDepth2(params) {
            if (params.positionType === "individualShift") {
              var oldChildren = params.children;
              var children = [oldChildren[0]];
              var _depth = -oldChildren[0].shift - oldChildren[0].elem.depth;
              var currPos = _depth;
              for (var i3 = 1; i3 < oldChildren.length; i3++) {
                var diff = -oldChildren[i3].shift - currPos - oldChildren[i3].elem.depth;
                var size = diff - (oldChildren[i3 - 1].elem.height + oldChildren[i3 - 1].elem.depth);
                currPos = currPos + diff;
                children.push({
                  type: "kern",
                  size
                });
                children.push(oldChildren[i3]);
              }
              return {
                children,
                depth: _depth
              };
            }
            var depth;
            if (params.positionType === "top") {
              var bottom = params.positionData;
              for (var _i6 = 0; _i6 < params.children.length; _i6++) {
                var child = params.children[_i6];
                bottom -= child.type === "kern" ? child.size : child.elem.height + child.elem.depth;
              }
              depth = bottom;
            } else if (params.positionType === "bottom") {
              depth = -params.positionData;
            } else {
              var firstChild = params.children[0];
              if (firstChild.type !== "elem") {
                throw new Error('First child must have type "elem".');
              }
              if (params.positionType === "shift") {
                depth = -firstChild.elem.depth - params.positionData;
              } else if (params.positionType === "firstBaseline") {
                depth = -firstChild.elem.depth;
              } else {
                throw new Error("Invalid positionType " + params.positionType + ".");
              }
            }
            return {
              children: params.children,
              depth
            };
          };
          var makeVList = function makeVList2(params, options2) {
            var _getVListChildrenAndD = getVListChildrenAndDepth(params), children = _getVListChildrenAndD.children, depth = _getVListChildrenAndD.depth;
            var pstrutSize = 0;
            for (var i3 = 0; i3 < children.length; i3++) {
              var child = children[i3];
              if (child.type === "elem") {
                var elem = child.elem;
                pstrutSize = Math.max(pstrutSize, elem.maxFontSize, elem.height);
              }
            }
            pstrutSize += 2;
            var pstrut = makeSpan(["pstrut"], []);
            pstrut.style.height = makeEm(pstrutSize);
            var realChildren = [];
            var minPos = depth;
            var maxPos = depth;
            var currPos = depth;
            for (var _i22 = 0; _i22 < children.length; _i22++) {
              var _child = children[_i22];
              if (_child.type === "kern") {
                currPos += _child.size;
              } else {
                var _elem = _child.elem;
                var classes = _child.wrapperClasses || [];
                var style = _child.wrapperStyle || {};
                var childWrap = makeSpan(classes, [pstrut, _elem], void 0, style);
                childWrap.style.top = makeEm(-pstrutSize - currPos - _elem.depth);
                if (_child.marginLeft) {
                  childWrap.style.marginLeft = _child.marginLeft;
                }
                if (_child.marginRight) {
                  childWrap.style.marginRight = _child.marginRight;
                }
                realChildren.push(childWrap);
                currPos += _elem.height + _elem.depth;
              }
              minPos = Math.min(minPos, currPos);
              maxPos = Math.max(maxPos, currPos);
            }
            var vlist = makeSpan(["vlist"], realChildren);
            vlist.style.height = makeEm(maxPos);
            var rows;
            if (minPos < 0) {
              var emptySpan = makeSpan([], []);
              var depthStrut = makeSpan(["vlist"], [emptySpan]);
              depthStrut.style.height = makeEm(-minPos);
              var topStrut = makeSpan(["vlist-s"], [new SymbolNode("\u200B")]);
              rows = [makeSpan(["vlist-r"], [vlist, topStrut]), makeSpan(["vlist-r"], [depthStrut])];
            } else {
              rows = [makeSpan(["vlist-r"], [vlist])];
            }
            var vtable = makeSpan(["vlist-t"], rows);
            if (rows.length === 2) {
              vtable.classes.push("vlist-t2");
            }
            vtable.height = maxPos;
            vtable.depth = -minPos;
            return vtable;
          };
          var makeGlue = function makeGlue2(measurement, options2) {
            var rule = makeSpan(["mspace"], [], options2);
            var size = calculateSize(measurement, options2);
            rule.style.marginRight = makeEm(size);
            return rule;
          };
          var retrieveTextFontName = function retrieveTextFontName2(fontFamily, fontWeight, fontShape) {
            var baseFontName = "";
            switch (fontFamily) {
              case "amsrm":
                baseFontName = "AMS";
                break;
              case "textrm":
                baseFontName = "Main";
                break;
              case "textsf":
                baseFontName = "SansSerif";
                break;
              case "texttt":
                baseFontName = "Typewriter";
                break;
              default:
                baseFontName = fontFamily;
            }
            var fontStylesName;
            if (fontWeight === "textbf" && fontShape === "textit") {
              fontStylesName = "BoldItalic";
            } else if (fontWeight === "textbf") {
              fontStylesName = "Bold";
            } else if (fontWeight === "textit") {
              fontStylesName = "Italic";
            } else {
              fontStylesName = "Regular";
            }
            return baseFontName + "-" + fontStylesName;
          };
          var fontMap = {
            "mathbf": {
              variant: "bold",
              fontName: "Main-Bold"
            },
            "mathrm": {
              variant: "normal",
              fontName: "Main-Regular"
            },
            "textit": {
              variant: "italic",
              fontName: "Main-Italic"
            },
            "mathit": {
              variant: "italic",
              fontName: "Main-Italic"
            },
            "mathnormal": {
              variant: "italic",
              fontName: "Math-Italic"
            },
            "mathbb": {
              variant: "double-struck",
              fontName: "AMS-Regular"
            },
            "mathcal": {
              variant: "script",
              fontName: "Caligraphic-Regular"
            },
            "mathfrak": {
              variant: "fraktur",
              fontName: "Fraktur-Regular"
            },
            "mathscr": {
              variant: "script",
              fontName: "Script-Regular"
            },
            "mathsf": {
              variant: "sans-serif",
              fontName: "SansSerif-Regular"
            },
            "mathtt": {
              variant: "monospace",
              fontName: "Typewriter-Regular"
            }
          };
          var svgData = {
            vec: ["vec", 0.471, 0.714],
            oiintSize1: ["oiintSize1", 0.957, 0.499],
            oiintSize2: ["oiintSize2", 1.472, 0.659],
            oiiintSize1: ["oiiintSize1", 1.304, 0.499],
            oiiintSize2: ["oiiintSize2", 1.98, 0.659]
          };
          var staticSvg = function staticSvg2(value, options2) {
            var _svgData$value = svgData[value], pathName = _svgData$value[0], width = _svgData$value[1], height = _svgData$value[2];
            var path2 = new PathNode(pathName);
            var svgNode = new SvgNode([path2], {
              "width": makeEm(width),
              "height": makeEm(height),
              "style": "width:" + makeEm(width),
              "viewBox": "0 0 " + 1e3 * width + " " + 1e3 * height,
              "preserveAspectRatio": "xMinYMin"
            });
            var span = makeSvgSpan(["overlay"], [svgNode], options2);
            span.height = height;
            span.style.height = makeEm(height);
            span.style.width = makeEm(width);
            return span;
          };
          var buildCommon = {
            fontMap,
            makeSymbol,
            mathsym,
            makeSpan,
            makeSvgSpan,
            makeLineSpan,
            makeAnchor,
            makeFragment,
            wrapFragment,
            makeVList,
            makeOrd,
            makeGlue,
            staticSvg,
            svgData,
            tryCombineChars
          };
          ;
          var thinspace = {
            number: 3,
            unit: "mu"
          };
          var mediumspace = {
            number: 4,
            unit: "mu"
          };
          var thickspace = {
            number: 5,
            unit: "mu"
          };
          var spacings = {
            mord: {
              mop: thinspace,
              mbin: mediumspace,
              mrel: thickspace,
              minner: thinspace
            },
            mop: {
              mord: thinspace,
              mop: thinspace,
              mrel: thickspace,
              minner: thinspace
            },
            mbin: {
              mord: mediumspace,
              mop: mediumspace,
              mopen: mediumspace,
              minner: mediumspace
            },
            mrel: {
              mord: thickspace,
              mop: thickspace,
              mopen: thickspace,
              minner: thickspace
            },
            mopen: {},
            mclose: {
              mop: thinspace,
              mbin: mediumspace,
              mrel: thickspace,
              minner: thinspace
            },
            mpunct: {
              mord: thinspace,
              mop: thinspace,
              mrel: thickspace,
              mopen: thinspace,
              mclose: thinspace,
              mpunct: thinspace,
              minner: thinspace
            },
            minner: {
              mord: thinspace,
              mop: thinspace,
              mbin: mediumspace,
              mrel: thickspace,
              mopen: thinspace,
              mpunct: thinspace,
              minner: thinspace
            }
          };
          var tightSpacings = {
            mord: {
              mop: thinspace
            },
            mop: {
              mord: thinspace,
              mop: thinspace
            },
            mbin: {},
            mrel: {},
            mopen: {},
            mclose: {
              mop: thinspace
            },
            mpunct: {},
            minner: {
              mop: thinspace
            }
          };
          ;
          var _functions = {};
          var _htmlGroupBuilders = {};
          var _mathmlGroupBuilders = {};
          function defineFunction(_ref) {
            var type = _ref.type, names = _ref.names, props = _ref.props, handler = _ref.handler, htmlBuilder2 = _ref.htmlBuilder, mathmlBuilder2 = _ref.mathmlBuilder;
            var data2 = {
              type,
              numArgs: props.numArgs,
              argTypes: props.argTypes,
              allowedInArgument: !!props.allowedInArgument,
              allowedInText: !!props.allowedInText,
              allowedInMath: props.allowedInMath === void 0 ? true : props.allowedInMath,
              numOptionalArgs: props.numOptionalArgs || 0,
              infix: !!props.infix,
              primitive: !!props.primitive,
              handler
            };
            for (var i3 = 0; i3 < names.length; ++i3) {
              _functions[names[i3]] = data2;
            }
            if (type) {
              if (htmlBuilder2) {
                _htmlGroupBuilders[type] = htmlBuilder2;
              }
              if (mathmlBuilder2) {
                _mathmlGroupBuilders[type] = mathmlBuilder2;
              }
            }
          }
          function defineFunctionBuilders(_ref2) {
            var type = _ref2.type, htmlBuilder2 = _ref2.htmlBuilder, mathmlBuilder2 = _ref2.mathmlBuilder;
            defineFunction({
              type,
              names: [],
              props: {
                numArgs: 0
              },
              handler: function handler() {
                throw new Error("Should never be called.");
              },
              htmlBuilder: htmlBuilder2,
              mathmlBuilder: mathmlBuilder2
            });
          }
          var normalizeArgument = function normalizeArgument2(arg) {
            return arg.type === "ordgroup" && arg.body.length === 1 ? arg.body[0] : arg;
          };
          var ordargument = function ordargument2(arg) {
            return arg.type === "ordgroup" ? arg.body : [arg];
          };
          ;
          var buildHTML_makeSpan = buildCommon.makeSpan;
          var binLeftCanceller = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"];
          var binRightCanceller = ["rightmost", "mrel", "mclose", "mpunct"];
          var styleMap = {
            "display": src_Style.DISPLAY,
            "text": src_Style.TEXT,
            "script": src_Style.SCRIPT,
            "scriptscript": src_Style.SCRIPTSCRIPT
          };
          var DomEnum = {
            mord: "mord",
            mop: "mop",
            mbin: "mbin",
            mrel: "mrel",
            mopen: "mopen",
            mclose: "mclose",
            mpunct: "mpunct",
            minner: "minner"
          };
          var buildExpression = function buildExpression2(expression, options2, isRealGroup, surrounding) {
            if (surrounding === void 0) {
              surrounding = [null, null];
            }
            var groups = [];
            for (var i3 = 0; i3 < expression.length; i3++) {
              var output = buildGroup(expression[i3], options2);
              if (output instanceof DocumentFragment) {
                var children = output.children;
                groups.push.apply(groups, children);
              } else {
                groups.push(output);
              }
            }
            buildCommon.tryCombineChars(groups);
            if (!isRealGroup) {
              return groups;
            }
            var glueOptions = options2;
            if (expression.length === 1) {
              var node = expression[0];
              if (node.type === "sizing") {
                glueOptions = options2.havingSize(node.size);
              } else if (node.type === "styling") {
                glueOptions = options2.havingStyle(styleMap[node.style]);
              }
            }
            var dummyPrev = buildHTML_makeSpan([surrounding[0] || "leftmost"], [], options2);
            var dummyNext = buildHTML_makeSpan([surrounding[1] || "rightmost"], [], options2);
            var isRoot = isRealGroup === "root";
            traverseNonSpaceNodes(groups, function(node2, prev) {
              var prevType = prev.classes[0];
              var type = node2.classes[0];
              if (prevType === "mbin" && utils.contains(binRightCanceller, type)) {
                prev.classes[0] = "mord";
              } else if (type === "mbin" && utils.contains(binLeftCanceller, prevType)) {
                node2.classes[0] = "mord";
              }
            }, {
              node: dummyPrev
            }, dummyNext, isRoot);
            traverseNonSpaceNodes(groups, function(node2, prev) {
              var prevType = getTypeOfDomTree(prev);
              var type = getTypeOfDomTree(node2);
              var space = prevType && type ? node2.hasClass("mtight") ? tightSpacings[prevType][type] : spacings[prevType][type] : null;
              if (space) {
                return buildCommon.makeGlue(space, glueOptions);
              }
            }, {
              node: dummyPrev
            }, dummyNext, isRoot);
            return groups;
          };
          var traverseNonSpaceNodes = function traverseNonSpaceNodes2(nodes, callback, prev, next, isRoot) {
            if (next) {
              nodes.push(next);
            }
            var i3 = 0;
            for (; i3 < nodes.length; i3++) {
              var node = nodes[i3];
              var partialGroup = checkPartialGroup(node);
              if (partialGroup) {
                traverseNonSpaceNodes2(partialGroup.children, callback, prev, null, isRoot);
                continue;
              }
              var nonspace = !node.hasClass("mspace");
              if (nonspace) {
                var result2 = callback(node, prev.node);
                if (result2) {
                  if (prev.insertAfter) {
                    prev.insertAfter(result2);
                  } else {
                    nodes.unshift(result2);
                    i3++;
                  }
                }
              }
              if (nonspace) {
                prev.node = node;
              } else if (isRoot && node.hasClass("newline")) {
                prev.node = buildHTML_makeSpan(["leftmost"]);
              }
              prev.insertAfter = function(index) {
                return function(n2) {
                  nodes.splice(index + 1, 0, n2);
                  i3++;
                };
              }(i3);
            }
            if (next) {
              nodes.pop();
            }
          };
          var checkPartialGroup = function checkPartialGroup2(node) {
            if (node instanceof DocumentFragment || node instanceof Anchor || node instanceof Span && node.hasClass("enclosing")) {
              return node;
            }
            return null;
          };
          var getOutermostNode = function getOutermostNode2(node, side2) {
            var partialGroup = checkPartialGroup(node);
            if (partialGroup) {
              var children = partialGroup.children;
              if (children.length) {
                if (side2 === "right") {
                  return getOutermostNode2(children[children.length - 1], "right");
                } else if (side2 === "left") {
                  return getOutermostNode2(children[0], "left");
                }
              }
            }
            return node;
          };
          var getTypeOfDomTree = function getTypeOfDomTree2(node, side2) {
            if (!node) {
              return null;
            }
            if (side2) {
              node = getOutermostNode(node, side2);
            }
            return DomEnum[node.classes[0]] || null;
          };
          var makeNullDelimiter = function makeNullDelimiter2(options2, classes) {
            var moreClasses = ["nulldelimiter"].concat(options2.baseSizingClasses());
            return buildHTML_makeSpan(classes.concat(moreClasses));
          };
          var buildGroup = function buildGroup2(group, options2, baseOptions) {
            if (!group) {
              return buildHTML_makeSpan();
            }
            if (_htmlGroupBuilders[group.type]) {
              var groupNode = _htmlGroupBuilders[group.type](group, options2);
              if (baseOptions && options2.size !== baseOptions.size) {
                groupNode = buildHTML_makeSpan(options2.sizingClasses(baseOptions), [groupNode], options2);
                var multiplier = options2.sizeMultiplier / baseOptions.sizeMultiplier;
                groupNode.height *= multiplier;
                groupNode.depth *= multiplier;
              }
              return groupNode;
            } else {
              throw new src_ParseError("Got group of unknown type: '" + group.type + "'");
            }
          };
          function buildHTMLUnbreakable(children, options2) {
            var body = buildHTML_makeSpan(["base"], children, options2);
            var strut = buildHTML_makeSpan(["strut"]);
            strut.style.height = makeEm(body.height + body.depth);
            if (body.depth) {
              strut.style.verticalAlign = makeEm(-body.depth);
            }
            body.children.unshift(strut);
            return body;
          }
          function buildHTML(tree, options2) {
            var tag = null;
            if (tree.length === 1 && tree[0].type === "tag") {
              tag = tree[0].tag;
              tree = tree[0].body;
            }
            var expression = buildExpression(tree, options2, "root");
            var eqnNum;
            if (expression.length === 2 && expression[1].hasClass("tag")) {
              eqnNum = expression.pop();
            }
            var children = [];
            var parts = [];
            for (var i3 = 0; i3 < expression.length; i3++) {
              parts.push(expression[i3]);
              if (expression[i3].hasClass("mbin") || expression[i3].hasClass("mrel") || expression[i3].hasClass("allowbreak")) {
                var nobreak = false;
                while (i3 < expression.length - 1 && expression[i3 + 1].hasClass("mspace") && !expression[i3 + 1].hasClass("newline")) {
                  i3++;
                  parts.push(expression[i3]);
                  if (expression[i3].hasClass("nobreak")) {
                    nobreak = true;
                  }
                }
                if (!nobreak) {
                  children.push(buildHTMLUnbreakable(parts, options2));
                  parts = [];
                }
              } else if (expression[i3].hasClass("newline")) {
                parts.pop();
                if (parts.length > 0) {
                  children.push(buildHTMLUnbreakable(parts, options2));
                  parts = [];
                }
                children.push(expression[i3]);
              }
            }
            if (parts.length > 0) {
              children.push(buildHTMLUnbreakable(parts, options2));
            }
            var tagChild;
            if (tag) {
              tagChild = buildHTMLUnbreakable(buildExpression(tag, options2, true));
              tagChild.classes = ["tag"];
              children.push(tagChild);
            } else if (eqnNum) {
              children.push(eqnNum);
            }
            var htmlNode = buildHTML_makeSpan(["katex-html"], children);
            htmlNode.setAttribute("aria-hidden", "true");
            if (tagChild) {
              var strut = tagChild.children[0];
              strut.style.height = makeEm(htmlNode.height + htmlNode.depth);
              if (htmlNode.depth) {
                strut.style.verticalAlign = makeEm(-htmlNode.depth);
              }
            }
            return htmlNode;
          }
          ;
          function newDocumentFragment(children) {
            return new DocumentFragment(children);
          }
          var MathNode = /* @__PURE__ */ function() {
            function MathNode2(type, children, classes) {
              this.type = void 0;
              this.attributes = void 0;
              this.children = void 0;
              this.classes = void 0;
              this.type = type;
              this.attributes = {};
              this.children = children || [];
              this.classes = classes || [];
            }
            var _proto = MathNode2.prototype;
            _proto.setAttribute = function setAttribute(name, value) {
              this.attributes[name] = value;
            };
            _proto.getAttribute = function getAttribute(name) {
              return this.attributes[name];
            };
            _proto.toNode = function toNode() {
              var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
              for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  node.setAttribute(attr, this.attributes[attr]);
                }
              }
              if (this.classes.length > 0) {
                node.className = createClass(this.classes);
              }
              for (var i3 = 0; i3 < this.children.length; i3++) {
                node.appendChild(this.children[i3].toNode());
              }
              return node;
            };
            _proto.toMarkup = function toMarkup() {
              var markup = "<" + this.type;
              for (var attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  markup += " " + attr + '="';
                  markup += utils.escape(this.attributes[attr]);
                  markup += '"';
                }
              }
              if (this.classes.length > 0) {
                markup += ' class ="' + utils.escape(createClass(this.classes)) + '"';
              }
              markup += ">";
              for (var i3 = 0; i3 < this.children.length; i3++) {
                markup += this.children[i3].toMarkup();
              }
              markup += "</" + this.type + ">";
              return markup;
            };
            _proto.toText = function toText() {
              return this.children.map(function(child) {
                return child.toText();
              }).join("");
            };
            return MathNode2;
          }();
          var TextNode = /* @__PURE__ */ function() {
            function TextNode2(text) {
              this.text = void 0;
              this.text = text;
            }
            var _proto2 = TextNode2.prototype;
            _proto2.toNode = function toNode() {
              return document.createTextNode(this.text);
            };
            _proto2.toMarkup = function toMarkup() {
              return utils.escape(this.toText());
            };
            _proto2.toText = function toText() {
              return this.text;
            };
            return TextNode2;
          }();
          var SpaceNode = /* @__PURE__ */ function() {
            function SpaceNode2(width) {
              this.width = void 0;
              this.character = void 0;
              this.width = width;
              if (width >= 0.05555 && width <= 0.05556) {
                this.character = "\u200A";
              } else if (width >= 0.1666 && width <= 0.1667) {
                this.character = "\u2009";
              } else if (width >= 0.2222 && width <= 0.2223) {
                this.character = "\u2005";
              } else if (width >= 0.2777 && width <= 0.2778) {
                this.character = "\u2005\u200A";
              } else if (width >= -0.05556 && width <= -0.05555) {
                this.character = "\u200A\u2063";
              } else if (width >= -0.1667 && width <= -0.1666) {
                this.character = "\u2009\u2063";
              } else if (width >= -0.2223 && width <= -0.2222) {
                this.character = "\u205F\u2063";
              } else if (width >= -0.2778 && width <= -0.2777) {
                this.character = "\u2005\u2063";
              } else {
                this.character = null;
              }
            }
            var _proto3 = SpaceNode2.prototype;
            _proto3.toNode = function toNode() {
              if (this.character) {
                return document.createTextNode(this.character);
              } else {
                var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
                node.setAttribute("width", makeEm(this.width));
                return node;
              }
            };
            _proto3.toMarkup = function toMarkup() {
              if (this.character) {
                return "<mtext>" + this.character + "</mtext>";
              } else {
                return '<mspace width="' + makeEm(this.width) + '"/>';
              }
            };
            _proto3.toText = function toText() {
              if (this.character) {
                return this.character;
              } else {
                return " ";
              }
            };
            return SpaceNode2;
          }();
          var mathMLTree = {
            MathNode,
            TextNode,
            SpaceNode,
            newDocumentFragment
          };
          ;
          var makeText = function makeText2(text, mode, options2) {
            if (src_symbols[mode][text] && src_symbols[mode][text].replace && text.charCodeAt(0) !== 55349 && !(ligatures.hasOwnProperty(text) && options2 && (options2.fontFamily && options2.fontFamily.substr(4, 2) === "tt" || options2.font && options2.font.substr(4, 2) === "tt"))) {
              text = src_symbols[mode][text].replace;
            }
            return new mathMLTree.TextNode(text);
          };
          var makeRow = function makeRow2(body) {
            if (body.length === 1) {
              return body[0];
            } else {
              return new mathMLTree.MathNode("mrow", body);
            }
          };
          var getVariant = function getVariant2(group, options2) {
            if (options2.fontFamily === "texttt") {
              return "monospace";
            } else if (options2.fontFamily === "textsf") {
              if (options2.fontShape === "textit" && options2.fontWeight === "textbf") {
                return "sans-serif-bold-italic";
              } else if (options2.fontShape === "textit") {
                return "sans-serif-italic";
              } else if (options2.fontWeight === "textbf") {
                return "bold-sans-serif";
              } else {
                return "sans-serif";
              }
            } else if (options2.fontShape === "textit" && options2.fontWeight === "textbf") {
              return "bold-italic";
            } else if (options2.fontShape === "textit") {
              return "italic";
            } else if (options2.fontWeight === "textbf") {
              return "bold";
            }
            var font = options2.font;
            if (!font || font === "mathnormal") {
              return null;
            }
            var mode = group.mode;
            if (font === "mathit") {
              return "italic";
            } else if (font === "boldsymbol") {
              return group.type === "textord" ? "bold" : "bold-italic";
            } else if (font === "mathbf") {
              return "bold";
            } else if (font === "mathbb") {
              return "double-struck";
            } else if (font === "mathfrak") {
              return "fraktur";
            } else if (font === "mathscr" || font === "mathcal") {
              return "script";
            } else if (font === "mathsf") {
              return "sans-serif";
            } else if (font === "mathtt") {
              return "monospace";
            }
            var text = group.text;
            if (utils.contains(["\\imath", "\\jmath"], text)) {
              return null;
            }
            if (src_symbols[mode][text] && src_symbols[mode][text].replace) {
              text = src_symbols[mode][text].replace;
            }
            var fontName = buildCommon.fontMap[font].fontName;
            if (getCharacterMetrics(text, fontName, mode)) {
              return buildCommon.fontMap[font].variant;
            }
            return null;
          };
          var buildMathML_buildExpression = function buildExpression2(expression, options2, isOrdgroup) {
            if (expression.length === 1) {
              var group = buildMathML_buildGroup(expression[0], options2);
              if (isOrdgroup && group instanceof MathNode && group.type === "mo") {
                group.setAttribute("lspace", "0em");
                group.setAttribute("rspace", "0em");
              }
              return [group];
            }
            var groups = [];
            var lastGroup;
            for (var i3 = 0; i3 < expression.length; i3++) {
              var _group = buildMathML_buildGroup(expression[i3], options2);
              if (_group instanceof MathNode && lastGroup instanceof MathNode) {
                if (_group.type === "mtext" && lastGroup.type === "mtext" && _group.getAttribute("mathvariant") === lastGroup.getAttribute("mathvariant")) {
                  var _lastGroup$children;
                  (_lastGroup$children = lastGroup.children).push.apply(_lastGroup$children, _group.children);
                  continue;
                } else if (_group.type === "mn" && lastGroup.type === "mn") {
                  var _lastGroup$children2;
                  (_lastGroup$children2 = lastGroup.children).push.apply(_lastGroup$children2, _group.children);
                  continue;
                } else if (_group.type === "mi" && _group.children.length === 1 && lastGroup.type === "mn") {
                  var child = _group.children[0];
                  if (child instanceof TextNode && child.text === ".") {
                    var _lastGroup$children3;
                    (_lastGroup$children3 = lastGroup.children).push.apply(_lastGroup$children3, _group.children);
                    continue;
                  }
                } else if (lastGroup.type === "mi" && lastGroup.children.length === 1) {
                  var lastChild = lastGroup.children[0];
                  if (lastChild instanceof TextNode && lastChild.text === "\u0338" && (_group.type === "mo" || _group.type === "mi" || _group.type === "mn")) {
                    var _child = _group.children[0];
                    if (_child instanceof TextNode && _child.text.length > 0) {
                      _child.text = _child.text.slice(0, 1) + "\u0338" + _child.text.slice(1);
                      groups.pop();
                    }
                  }
                }
              }
              groups.push(_group);
              lastGroup = _group;
            }
            return groups;
          };
          var buildExpressionRow = function buildExpressionRow2(expression, options2, isOrdgroup) {
            return makeRow(buildMathML_buildExpression(expression, options2, isOrdgroup));
          };
          var buildMathML_buildGroup = function buildGroup2(group, options2) {
            if (!group) {
              return new mathMLTree.MathNode("mrow");
            }
            if (_mathmlGroupBuilders[group.type]) {
              var result2 = _mathmlGroupBuilders[group.type](group, options2);
              return result2;
            } else {
              throw new src_ParseError("Got group of unknown type: '" + group.type + "'");
            }
          };
          function buildMathML(tree, texExpression, options2, isDisplayMode, forMathmlOnly) {
            var expression = buildMathML_buildExpression(tree, options2);
            var wrapper;
            if (expression.length === 1 && expression[0] instanceof MathNode && utils.contains(["mrow", "mtable"], expression[0].type)) {
              wrapper = expression[0];
            } else {
              wrapper = new mathMLTree.MathNode("mrow", expression);
            }
            var annotation = new mathMLTree.MathNode("annotation", [new mathMLTree.TextNode(texExpression)]);
            annotation.setAttribute("encoding", "application/x-tex");
            var semantics = new mathMLTree.MathNode("semantics", [wrapper, annotation]);
            var math2 = new mathMLTree.MathNode("math", [semantics]);
            math2.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
            if (isDisplayMode) {
              math2.setAttribute("display", "block");
            }
            var wrapperClass = forMathmlOnly ? "katex" : "katex-mathml";
            return buildCommon.makeSpan([wrapperClass], [math2]);
          }
          ;
          var optionsFromSettings = function optionsFromSettings2(settings) {
            return new src_Options({
              style: settings.displayMode ? src_Style.DISPLAY : src_Style.TEXT,
              maxSize: settings.maxSize,
              minRuleThickness: settings.minRuleThickness
            });
          };
          var displayWrap = function displayWrap2(node, settings) {
            if (settings.displayMode) {
              var classes = ["katex-display"];
              if (settings.leqno) {
                classes.push("leqno");
              }
              if (settings.fleqn) {
                classes.push("fleqn");
              }
              node = buildCommon.makeSpan(classes, [node]);
            }
            return node;
          };
          var buildTree = function buildTree2(tree, expression, settings) {
            var options2 = optionsFromSettings(settings);
            var katexNode;
            if (settings.output === "mathml") {
              return buildMathML(tree, expression, options2, settings.displayMode, true);
            } else if (settings.output === "html") {
              var htmlNode = buildHTML(tree, options2);
              katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
            } else {
              var mathMLNode = buildMathML(tree, expression, options2, settings.displayMode, false);
              var _htmlNode = buildHTML(tree, options2);
              katexNode = buildCommon.makeSpan(["katex"], [mathMLNode, _htmlNode]);
            }
            return displayWrap(katexNode, settings);
          };
          var buildHTMLTree = function buildHTMLTree2(tree, expression, settings) {
            var options2 = optionsFromSettings(settings);
            var htmlNode = buildHTML(tree, options2);
            var katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
            return displayWrap(katexNode, settings);
          };
          var src_buildTree = null;
          ;
          var stretchyCodePoint = {
            widehat: "^",
            widecheck: "\u02C7",
            widetilde: "~",
            utilde: "~",
            overleftarrow: "\u2190",
            underleftarrow: "\u2190",
            xleftarrow: "\u2190",
            overrightarrow: "\u2192",
            underrightarrow: "\u2192",
            xrightarrow: "\u2192",
            underbrace: "\u23DF",
            overbrace: "\u23DE",
            overgroup: "\u23E0",
            undergroup: "\u23E1",
            overleftrightarrow: "\u2194",
            underleftrightarrow: "\u2194",
            xleftrightarrow: "\u2194",
            Overrightarrow: "\u21D2",
            xRightarrow: "\u21D2",
            overleftharpoon: "\u21BC",
            xleftharpoonup: "\u21BC",
            overrightharpoon: "\u21C0",
            xrightharpoonup: "\u21C0",
            xLeftarrow: "\u21D0",
            xLeftrightarrow: "\u21D4",
            xhookleftarrow: "\u21A9",
            xhookrightarrow: "\u21AA",
            xmapsto: "\u21A6",
            xrightharpoondown: "\u21C1",
            xleftharpoondown: "\u21BD",
            xrightleftharpoons: "\u21CC",
            xleftrightharpoons: "\u21CB",
            xtwoheadleftarrow: "\u219E",
            xtwoheadrightarrow: "\u21A0",
            xlongequal: "=",
            xtofrom: "\u21C4",
            xrightleftarrows: "\u21C4",
            xrightequilibrium: "\u21CC",
            xleftequilibrium: "\u21CB",
            "\\cdrightarrow": "\u2192",
            "\\cdleftarrow": "\u2190",
            "\\cdlongequal": "="
          };
          var mathMLnode = function mathMLnode2(label) {
            var node = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(stretchyCodePoint[label.replace(/^\\/, "")])]);
            node.setAttribute("stretchy", "true");
            return node;
          };
          var katexImagesData = {
            overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
            overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
            underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
            underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
            xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
            "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
            xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
            "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
            Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
            xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
            xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
            overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
            xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
            xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
            overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
            xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
            xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
            xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
            "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
            xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
            xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
            overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
            overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
            underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
            underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
            xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
            xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
            xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
            xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
            xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
            xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
            overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
            underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
            overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
            undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
            xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
            xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
            xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
            xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
            xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
          };
          var groupLength = function groupLength2(arg) {
            if (arg.type === "ordgroup") {
              return arg.body.length;
            } else {
              return 1;
            }
          };
          var svgSpan = function svgSpan2(group, options2) {
            function buildSvgSpan_() {
              var viewBoxWidth = 4e5;
              var label = group.label.substr(1);
              if (utils.contains(["widehat", "widecheck", "widetilde", "utilde"], label)) {
                var grp = group;
                var numChars = groupLength(grp.base);
                var viewBoxHeight;
                var pathName;
                var _height;
                if (numChars > 5) {
                  if (label === "widehat" || label === "widecheck") {
                    viewBoxHeight = 420;
                    viewBoxWidth = 2364;
                    _height = 0.42;
                    pathName = label + "4";
                  } else {
                    viewBoxHeight = 312;
                    viewBoxWidth = 2340;
                    _height = 0.34;
                    pathName = "tilde4";
                  }
                } else {
                  var imgIndex = [1, 1, 2, 2, 3, 3][numChars];
                  if (label === "widehat" || label === "widecheck") {
                    viewBoxWidth = [0, 1062, 2364, 2364, 2364][imgIndex];
                    viewBoxHeight = [0, 239, 300, 360, 420][imgIndex];
                    _height = [0, 0.24, 0.3, 0.3, 0.36, 0.42][imgIndex];
                    pathName = label + imgIndex;
                  } else {
                    viewBoxWidth = [0, 600, 1033, 2339, 2340][imgIndex];
                    viewBoxHeight = [0, 260, 286, 306, 312][imgIndex];
                    _height = [0, 0.26, 0.286, 0.3, 0.306, 0.34][imgIndex];
                    pathName = "tilde" + imgIndex;
                  }
                }
                var path2 = new PathNode(pathName);
                var svgNode = new SvgNode([path2], {
                  "width": "100%",
                  "height": makeEm(_height),
                  "viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight,
                  "preserveAspectRatio": "none"
                });
                return {
                  span: buildCommon.makeSvgSpan([], [svgNode], options2),
                  minWidth: 0,
                  height: _height
                };
              } else {
                var spans = [];
                var data2 = katexImagesData[label];
                var paths = data2[0], _minWidth = data2[1], _viewBoxHeight = data2[2];
                var _height2 = _viewBoxHeight / 1e3;
                var numSvgChildren = paths.length;
                var widthClasses;
                var aligns;
                if (numSvgChildren === 1) {
                  var align1 = data2[3];
                  widthClasses = ["hide-tail"];
                  aligns = [align1];
                } else if (numSvgChildren === 2) {
                  widthClasses = ["halfarrow-left", "halfarrow-right"];
                  aligns = ["xMinYMin", "xMaxYMin"];
                } else if (numSvgChildren === 3) {
                  widthClasses = ["brace-left", "brace-center", "brace-right"];
                  aligns = ["xMinYMin", "xMidYMin", "xMaxYMin"];
                } else {
                  throw new Error("Correct katexImagesData or update code here to support\n                    " + numSvgChildren + " children.");
                }
                for (var i3 = 0; i3 < numSvgChildren; i3++) {
                  var _path = new PathNode(paths[i3]);
                  var _svgNode = new SvgNode([_path], {
                    "width": "400em",
                    "height": makeEm(_height2),
                    "viewBox": "0 0 " + viewBoxWidth + " " + _viewBoxHeight,
                    "preserveAspectRatio": aligns[i3] + " slice"
                  });
                  var _span = buildCommon.makeSvgSpan([widthClasses[i3]], [_svgNode], options2);
                  if (numSvgChildren === 1) {
                    return {
                      span: _span,
                      minWidth: _minWidth,
                      height: _height2
                    };
                  } else {
                    _span.style.height = makeEm(_height2);
                    spans.push(_span);
                  }
                }
                return {
                  span: buildCommon.makeSpan(["stretchy"], spans, options2),
                  minWidth: _minWidth,
                  height: _height2
                };
              }
            }
            var _buildSvgSpan_ = buildSvgSpan_(), span = _buildSvgSpan_.span, minWidth = _buildSvgSpan_.minWidth, height = _buildSvgSpan_.height;
            span.height = height;
            span.style.height = makeEm(height);
            if (minWidth > 0) {
              span.style.minWidth = makeEm(minWidth);
            }
            return span;
          };
          var encloseSpan = function encloseSpan2(inner2, label, topPad, bottomPad, options2) {
            var img;
            var totalHeight = inner2.height + inner2.depth + topPad + bottomPad;
            if (/fbox|color|angl/.test(label)) {
              img = buildCommon.makeSpan(["stretchy", label], [], options2);
              if (label === "fbox") {
                var color = options2.color && options2.getColor();
                if (color) {
                  img.style.borderColor = color;
                }
              }
            } else {
              var lines = [];
              if (/^[bx]cancel$/.test(label)) {
                lines.push(new LineNode({
                  "x1": "0",
                  "y1": "0",
                  "x2": "100%",
                  "y2": "100%",
                  "stroke-width": "0.046em"
                }));
              }
              if (/^x?cancel$/.test(label)) {
                lines.push(new LineNode({
                  "x1": "0",
                  "y1": "100%",
                  "x2": "100%",
                  "y2": "0",
                  "stroke-width": "0.046em"
                }));
              }
              var svgNode = new SvgNode(lines, {
                "width": "100%",
                "height": makeEm(totalHeight)
              });
              img = buildCommon.makeSvgSpan([], [svgNode], options2);
            }
            img.height = totalHeight;
            img.style.height = makeEm(totalHeight);
            return img;
          };
          var stretchy = {
            encloseSpan,
            mathMLnode,
            svgSpan
          };
          ;
          function assertNodeType(node, type) {
            if (!node || node.type !== type) {
              throw new Error("Expected node of type " + type + ", but got " + (node ? "node of type " + node.type : String(node)));
            }
            return node;
          }
          function assertSymbolNodeType(node) {
            var typedNode = checkSymbolNodeType(node);
            if (!typedNode) {
              throw new Error("Expected node of symbol group type, but got " + (node ? "node of type " + node.type : String(node)));
            }
            return typedNode;
          }
          function checkSymbolNodeType(node) {
            if (node && (node.type === "atom" || NON_ATOMS.hasOwnProperty(node.type))) {
              return node;
            }
            return null;
          }
          ;
          var htmlBuilder = function htmlBuilder2(grp, options2) {
            var base2;
            var group;
            var supSubGroup;
            if (grp && grp.type === "supsub") {
              group = assertNodeType(grp.base, "accent");
              base2 = group.base;
              grp.base = base2;
              supSubGroup = assertSpan(buildGroup(grp, options2));
              grp.base = group;
            } else {
              group = assertNodeType(grp, "accent");
              base2 = group.base;
            }
            var body = buildGroup(base2, options2.havingCrampedStyle());
            var mustShift = group.isShifty && utils.isCharacterBox(base2);
            var skew = 0;
            if (mustShift) {
              var baseChar = utils.getBaseElem(base2);
              var baseGroup = buildGroup(baseChar, options2.havingCrampedStyle());
              skew = assertSymbolDomNode(baseGroup).skew;
            }
            var accentBelow = group.label === "\\c";
            var clearance = accentBelow ? body.height + body.depth : Math.min(body.height, options2.fontMetrics().xHeight);
            var accentBody;
            if (!group.isStretchy) {
              var accent2;
              var width;
              if (group.label === "\\vec") {
                accent2 = buildCommon.staticSvg("vec", options2);
                width = buildCommon.svgData.vec[1];
              } else {
                accent2 = buildCommon.makeOrd({
                  mode: group.mode,
                  text: group.label
                }, options2, "textord");
                accent2 = assertSymbolDomNode(accent2);
                accent2.italic = 0;
                width = accent2.width;
                if (accentBelow) {
                  clearance += accent2.depth;
                }
              }
              accentBody = buildCommon.makeSpan(["accent-body"], [accent2]);
              var accentFull = group.label === "\\textcircled";
              if (accentFull) {
                accentBody.classes.push("accent-full");
                clearance = body.height;
              }
              var left2 = skew;
              if (!accentFull) {
                left2 -= width / 2;
              }
              accentBody.style.left = makeEm(left2);
              if (group.label === "\\textcircled") {
                accentBody.style.top = ".2em";
              }
              accentBody = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: body
                }, {
                  type: "kern",
                  size: -clearance
                }, {
                  type: "elem",
                  elem: accentBody
                }]
              }, options2);
            } else {
              accentBody = stretchy.svgSpan(group, options2);
              accentBody = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: body
                }, {
                  type: "elem",
                  elem: accentBody,
                  wrapperClasses: ["svg-align"],
                  wrapperStyle: skew > 0 ? {
                    width: "calc(100% - " + makeEm(2 * skew) + ")",
                    marginLeft: makeEm(2 * skew)
                  } : void 0
                }]
              }, options2);
            }
            var accentWrap = buildCommon.makeSpan(["mord", "accent"], [accentBody], options2);
            if (supSubGroup) {
              supSubGroup.children[0] = accentWrap;
              supSubGroup.height = Math.max(accentWrap.height, supSubGroup.height);
              supSubGroup.classes[0] = "mord";
              return supSubGroup;
            } else {
              return accentWrap;
            }
          };
          var mathmlBuilder = function mathmlBuilder2(group, options2) {
            var accentNode = group.isStretchy ? stretchy.mathMLnode(group.label) : new mathMLTree.MathNode("mo", [makeText(group.label, group.mode)]);
            var node = new mathMLTree.MathNode("mover", [buildMathML_buildGroup(group.base, options2), accentNode]);
            node.setAttribute("accent", "true");
            return node;
          };
          var NON_STRETCHY_ACCENT_REGEX = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map(function(accent2) {
            return "\\" + accent2;
          }).join("|"));
          defineFunction({
            type: "accent",
            names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
            props: {
              numArgs: 1
            },
            handler: function handler(context2, args) {
              var base2 = normalizeArgument(args[0]);
              var isStretchy = !NON_STRETCHY_ACCENT_REGEX.test(context2.funcName);
              var isShifty = !isStretchy || context2.funcName === "\\widehat" || context2.funcName === "\\widetilde" || context2.funcName === "\\widecheck";
              return {
                type: "accent",
                mode: context2.parser.mode,
                label: context2.funcName,
                isStretchy,
                isShifty,
                base: base2
              };
            },
            htmlBuilder,
            mathmlBuilder
          });
          defineFunction({
            type: "accent",
            names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"],
            props: {
              numArgs: 1,
              allowedInText: true,
              allowedInMath: true,
              argTypes: ["primitive"]
            },
            handler: function handler(context2, args) {
              var base2 = args[0];
              var mode = context2.parser.mode;
              if (mode === "math") {
                context2.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + context2.funcName + " works only in text mode");
                mode = "text";
              }
              return {
                type: "accent",
                mode,
                label: context2.funcName,
                isStretchy: false,
                isShifty: true,
                base: base2
              };
            },
            htmlBuilder,
            mathmlBuilder
          });
          ;
          defineFunction({
            type: "accentUnder",
            names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
            props: {
              numArgs: 1
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var base2 = args[0];
              return {
                type: "accentUnder",
                mode: parser.mode,
                label: funcName,
                base: base2
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var innerGroup = buildGroup(group.base, options2);
              var accentBody = stretchy.svgSpan(group, options2);
              var kern = group.label === "\\utilde" ? 0.12 : 0;
              var vlist = buildCommon.makeVList({
                positionType: "top",
                positionData: innerGroup.height,
                children: [{
                  type: "elem",
                  elem: accentBody,
                  wrapperClasses: ["svg-align"]
                }, {
                  type: "kern",
                  size: kern
                }, {
                  type: "elem",
                  elem: innerGroup
                }]
              }, options2);
              return buildCommon.makeSpan(["mord", "accentunder"], [vlist], options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var accentNode = stretchy.mathMLnode(group.label);
              var node = new mathMLTree.MathNode("munder", [buildMathML_buildGroup(group.base, options2), accentNode]);
              node.setAttribute("accentunder", "true");
              return node;
            }
          });
          ;
          var paddedNode = function paddedNode2(group) {
            var node = new mathMLTree.MathNode("mpadded", group ? [group] : []);
            node.setAttribute("width", "+0.6em");
            node.setAttribute("lspace", "0.3em");
            return node;
          };
          defineFunction({
            type: "xArrow",
            names: [
              "\\xleftarrow",
              "\\xrightarrow",
              "\\xLeftarrow",
              "\\xRightarrow",
              "\\xleftrightarrow",
              "\\xLeftrightarrow",
              "\\xhookleftarrow",
              "\\xhookrightarrow",
              "\\xmapsto",
              "\\xrightharpoondown",
              "\\xrightharpoonup",
              "\\xleftharpoondown",
              "\\xleftharpoonup",
              "\\xrightleftharpoons",
              "\\xleftrightharpoons",
              "\\xlongequal",
              "\\xtwoheadrightarrow",
              "\\xtwoheadleftarrow",
              "\\xtofrom",
              "\\xrightleftarrows",
              "\\xrightequilibrium",
              "\\xleftequilibrium",
              "\\\\cdrightarrow",
              "\\\\cdleftarrow",
              "\\\\cdlongequal"
            ],
            props: {
              numArgs: 1,
              numOptionalArgs: 1
            },
            handler: function handler(_ref, args, optArgs) {
              var parser = _ref.parser, funcName = _ref.funcName;
              return {
                type: "xArrow",
                mode: parser.mode,
                label: funcName,
                body: args[0],
                below: optArgs[0]
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var style = options2.style;
              var newOptions = options2.havingStyle(style.sup());
              var upperGroup = buildCommon.wrapFragment(buildGroup(group.body, newOptions, options2), options2);
              var arrowPrefix = group.label.slice(0, 2) === "\\x" ? "x" : "cd";
              upperGroup.classes.push(arrowPrefix + "-arrow-pad");
              var lowerGroup;
              if (group.below) {
                newOptions = options2.havingStyle(style.sub());
                lowerGroup = buildCommon.wrapFragment(buildGroup(group.below, newOptions, options2), options2);
                lowerGroup.classes.push(arrowPrefix + "-arrow-pad");
              }
              var arrowBody = stretchy.svgSpan(group, options2);
              var arrowShift = -options2.fontMetrics().axisHeight + 0.5 * arrowBody.height;
              var upperShift = -options2.fontMetrics().axisHeight - 0.5 * arrowBody.height - 0.111;
              if (upperGroup.depth > 0.25 || group.label === "\\xleftequilibrium") {
                upperShift -= upperGroup.depth;
              }
              var vlist;
              if (lowerGroup) {
                var lowerShift = -options2.fontMetrics().axisHeight + lowerGroup.height + 0.5 * arrowBody.height + 0.111;
                vlist = buildCommon.makeVList({
                  positionType: "individualShift",
                  children: [{
                    type: "elem",
                    elem: upperGroup,
                    shift: upperShift
                  }, {
                    type: "elem",
                    elem: arrowBody,
                    shift: arrowShift
                  }, {
                    type: "elem",
                    elem: lowerGroup,
                    shift: lowerShift
                  }]
                }, options2);
              } else {
                vlist = buildCommon.makeVList({
                  positionType: "individualShift",
                  children: [{
                    type: "elem",
                    elem: upperGroup,
                    shift: upperShift
                  }, {
                    type: "elem",
                    elem: arrowBody,
                    shift: arrowShift
                  }]
                }, options2);
              }
              vlist.children[0].children[0].children[1].classes.push("svg-align");
              return buildCommon.makeSpan(["mrel", "x-arrow"], [vlist], options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var arrowNode = stretchy.mathMLnode(group.label);
              arrowNode.setAttribute("minsize", group.label.charAt(0) === "x" ? "1.75em" : "3.0em");
              var node;
              if (group.body) {
                var upperNode = paddedNode(buildMathML_buildGroup(group.body, options2));
                if (group.below) {
                  var lowerNode = paddedNode(buildMathML_buildGroup(group.below, options2));
                  node = new mathMLTree.MathNode("munderover", [arrowNode, lowerNode, upperNode]);
                } else {
                  node = new mathMLTree.MathNode("mover", [arrowNode, upperNode]);
                }
              } else if (group.below) {
                var _lowerNode = paddedNode(buildMathML_buildGroup(group.below, options2));
                node = new mathMLTree.MathNode("munder", [arrowNode, _lowerNode]);
              } else {
                node = paddedNode();
                node = new mathMLTree.MathNode("mover", [arrowNode, node]);
              }
              return node;
            }
          });
          ;
          var cdArrowFunctionName = {
            ">": "\\\\cdrightarrow",
            "<": "\\\\cdleftarrow",
            "=": "\\\\cdlongequal",
            "A": "\\uparrow",
            "V": "\\downarrow",
            "|": "\\Vert",
            ".": "no arrow"
          };
          var newCell = function newCell2() {
            return {
              type: "styling",
              body: [],
              mode: "math",
              style: "display"
            };
          };
          var isStartOfArrow = function isStartOfArrow2(node) {
            return node.type === "textord" && node.text === "@";
          };
          var isLabelEnd = function isLabelEnd2(node, endChar) {
            return (node.type === "mathord" || node.type === "atom") && node.text === endChar;
          };
          function cdArrow(arrowChar, labels, parser) {
            var funcName = cdArrowFunctionName[arrowChar];
            switch (funcName) {
              case "\\\\cdrightarrow":
              case "\\\\cdleftarrow":
                return parser.callFunction(funcName, [labels[0]], [labels[1]]);
              case "\\uparrow":
              case "\\downarrow": {
                var leftLabel = parser.callFunction("\\\\cdleft", [labels[0]], []);
                var bareArrow = {
                  type: "atom",
                  text: funcName,
                  mode: "math",
                  family: "rel"
                };
                var sizedArrow = parser.callFunction("\\Big", [bareArrow], []);
                var rightLabel = parser.callFunction("\\\\cdright", [labels[1]], []);
                var arrowGroup = {
                  type: "ordgroup",
                  mode: "math",
                  body: [leftLabel, sizedArrow, rightLabel]
                };
                return parser.callFunction("\\\\cdparent", [arrowGroup], []);
              }
              case "\\\\cdlongequal":
                return parser.callFunction("\\\\cdlongequal", [], []);
              case "\\Vert": {
                var arrow = {
                  type: "textord",
                  text: "\\Vert",
                  mode: "math"
                };
                return parser.callFunction("\\Big", [arrow], []);
              }
              default:
                return {
                  type: "textord",
                  text: " ",
                  mode: "math"
                };
            }
          }
          function parseCD(parser) {
            var parsedRows = [];
            parser.gullet.beginGroup();
            parser.gullet.macros.set("\\cr", "\\\\\\relax");
            parser.gullet.beginGroup();
            while (true) {
              parsedRows.push(parser.parseExpression(false, "\\\\"));
              parser.gullet.endGroup();
              parser.gullet.beginGroup();
              var next = parser.fetch().text;
              if (next === "&" || next === "\\\\") {
                parser.consume();
              } else if (next === "\\end") {
                if (parsedRows[parsedRows.length - 1].length === 0) {
                  parsedRows.pop();
                }
                break;
              } else {
                throw new src_ParseError("Expected \\\\ or \\cr or \\end", parser.nextToken);
              }
            }
            var row = [];
            var body = [row];
            for (var i3 = 0; i3 < parsedRows.length; i3++) {
              var rowNodes = parsedRows[i3];
              var cell = newCell();
              for (var j2 = 0; j2 < rowNodes.length; j2++) {
                if (!isStartOfArrow(rowNodes[j2])) {
                  cell.body.push(rowNodes[j2]);
                } else {
                  row.push(cell);
                  j2 += 1;
                  var arrowChar = assertSymbolNodeType(rowNodes[j2]).text;
                  var labels = new Array(2);
                  labels[0] = {
                    type: "ordgroup",
                    mode: "math",
                    body: []
                  };
                  labels[1] = {
                    type: "ordgroup",
                    mode: "math",
                    body: []
                  };
                  if ("=|.".indexOf(arrowChar) > -1) {
                  } else if ("<>AV".indexOf(arrowChar) > -1) {
                    for (var labelNum = 0; labelNum < 2; labelNum++) {
                      var inLabel = true;
                      for (var k2 = j2 + 1; k2 < rowNodes.length; k2++) {
                        if (isLabelEnd(rowNodes[k2], arrowChar)) {
                          inLabel = false;
                          j2 = k2;
                          break;
                        }
                        if (isStartOfArrow(rowNodes[k2])) {
                          throw new src_ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[k2]);
                        }
                        labels[labelNum].body.push(rowNodes[k2]);
                      }
                      if (inLabel) {
                        throw new src_ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[j2]);
                      }
                    }
                  } else {
                    throw new src_ParseError('Expected one of "<>AV=|." after @', rowNodes[j2]);
                  }
                  var arrow = cdArrow(arrowChar, labels, parser);
                  var wrappedArrow = {
                    type: "styling",
                    body: [arrow],
                    mode: "math",
                    style: "display"
                  };
                  row.push(wrappedArrow);
                  cell = newCell();
                }
              }
              if (i3 % 2 === 0) {
                row.push(cell);
              } else {
                row.shift();
              }
              row = [];
              body.push(row);
            }
            parser.gullet.endGroup();
            parser.gullet.endGroup();
            var cols = new Array(body[0].length).fill({
              type: "align",
              align: "c",
              pregap: 0.25,
              postgap: 0.25
            });
            return {
              type: "array",
              mode: "math",
              body,
              arraystretch: 1,
              addJot: true,
              rowGaps: [null],
              cols,
              colSeparationType: "CD",
              hLinesBeforeRow: new Array(body.length + 1).fill([])
            };
          }
          defineFunction({
            type: "cdlabel",
            names: ["\\\\cdleft", "\\\\cdright"],
            props: {
              numArgs: 1
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              return {
                type: "cdlabel",
                mode: parser.mode,
                side: funcName.slice(4),
                label: args[0]
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var newOptions = options2.havingStyle(options2.style.sup());
              var label = buildCommon.wrapFragment(buildGroup(group.label, newOptions, options2), options2);
              label.classes.push("cd-label-" + group.side);
              label.style.bottom = makeEm(0.8 - label.depth);
              label.height = 0;
              label.depth = 0;
              return label;
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var label = new mathMLTree.MathNode("mrow", [buildMathML_buildGroup(group.label, options2)]);
              label = new mathMLTree.MathNode("mpadded", [label]);
              label.setAttribute("width", "0");
              if (group.side === "left") {
                label.setAttribute("lspace", "-1width");
              }
              label.setAttribute("voffset", "0.7em");
              label = new mathMLTree.MathNode("mstyle", [label]);
              label.setAttribute("displaystyle", "false");
              label.setAttribute("scriptlevel", "1");
              return label;
            }
          });
          defineFunction({
            type: "cdlabelparent",
            names: ["\\\\cdparent"],
            props: {
              numArgs: 1
            },
            handler: function handler(_ref2, args) {
              var parser = _ref2.parser;
              return {
                type: "cdlabelparent",
                mode: parser.mode,
                fragment: args[0]
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var parent = buildCommon.wrapFragment(buildGroup(group.fragment, options2), options2);
              parent.classes.push("cd-vert-arrow");
              return parent;
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              return new mathMLTree.MathNode("mrow", [buildMathML_buildGroup(group.fragment, options2)]);
            }
          });
          ;
          defineFunction({
            type: "textord",
            names: ["\\@char"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              var arg = assertNodeType(args[0], "ordgroup");
              var group = arg.body;
              var number = "";
              for (var i3 = 0; i3 < group.length; i3++) {
                var node = assertNodeType(group[i3], "textord");
                number += node.text;
              }
              var code2 = parseInt(number);
              var text;
              if (isNaN(code2)) {
                throw new src_ParseError("\\@char has non-numeric argument " + number);
              } else if (code2 < 0 || code2 >= 1114111) {
                throw new src_ParseError("\\@char with invalid code point " + number);
              } else if (code2 <= 65535) {
                text = String.fromCharCode(code2);
              } else {
                code2 -= 65536;
                text = String.fromCharCode((code2 >> 10) + 55296, (code2 & 1023) + 56320);
              }
              return {
                type: "textord",
                mode: parser.mode,
                text
              };
            }
          });
          ;
          var color_htmlBuilder = function htmlBuilder2(group, options2) {
            var elements = buildExpression(group.body, options2.withColor(group.color), false);
            return buildCommon.makeFragment(elements);
          };
          var color_mathmlBuilder = function mathmlBuilder2(group, options2) {
            var inner2 = buildMathML_buildExpression(group.body, options2.withColor(group.color));
            var node = new mathMLTree.MathNode("mstyle", inner2);
            node.setAttribute("mathcolor", group.color);
            return node;
          };
          defineFunction({
            type: "color",
            names: ["\\textcolor"],
            props: {
              numArgs: 2,
              allowedInText: true,
              argTypes: ["color", "original"]
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              var color = assertNodeType(args[0], "color-token").color;
              var body = args[1];
              return {
                type: "color",
                mode: parser.mode,
                color,
                body: ordargument(body)
              };
            },
            htmlBuilder: color_htmlBuilder,
            mathmlBuilder: color_mathmlBuilder
          });
          defineFunction({
            type: "color",
            names: ["\\color"],
            props: {
              numArgs: 1,
              allowedInText: true,
              argTypes: ["color"]
            },
            handler: function handler(_ref2, args) {
              var parser = _ref2.parser, breakOnTokenText = _ref2.breakOnTokenText;
              var color = assertNodeType(args[0], "color-token").color;
              parser.gullet.macros.set("\\current@color", color);
              var body = parser.parseExpression(true, breakOnTokenText);
              return {
                type: "color",
                mode: parser.mode,
                color,
                body
              };
            },
            htmlBuilder: color_htmlBuilder,
            mathmlBuilder: color_mathmlBuilder
          });
          ;
          defineFunction({
            type: "cr",
            names: ["\\\\"],
            props: {
              numArgs: 0,
              numOptionalArgs: 1,
              argTypes: ["size"],
              allowedInText: true
            },
            handler: function handler(_ref, args, optArgs) {
              var parser = _ref.parser;
              var size = optArgs[0];
              var newLine = !parser.settings.displayMode || !parser.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
              return {
                type: "cr",
                mode: parser.mode,
                newLine,
                size: size && assertNodeType(size, "size").value
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var span = buildCommon.makeSpan(["mspace"], [], options2);
              if (group.newLine) {
                span.classes.push("newline");
                if (group.size) {
                  span.style.marginTop = makeEm(calculateSize(group.size, options2));
                }
              }
              return span;
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var node = new mathMLTree.MathNode("mspace");
              if (group.newLine) {
                node.setAttribute("linebreak", "newline");
                if (group.size) {
                  node.setAttribute("height", makeEm(calculateSize(group.size, options2)));
                }
              }
              return node;
            }
          });
          ;
          var globalMap = {
            "\\global": "\\global",
            "\\long": "\\\\globallong",
            "\\\\globallong": "\\\\globallong",
            "\\def": "\\gdef",
            "\\gdef": "\\gdef",
            "\\edef": "\\xdef",
            "\\xdef": "\\xdef",
            "\\let": "\\\\globallet",
            "\\futurelet": "\\\\globalfuture"
          };
          var checkControlSequence = function checkControlSequence2(tok) {
            var name = tok.text;
            if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) {
              throw new src_ParseError("Expected a control sequence", tok);
            }
            return name;
          };
          var getRHS = function getRHS2(parser) {
            var tok = parser.gullet.popToken();
            if (tok.text === "=") {
              tok = parser.gullet.popToken();
              if (tok.text === " ") {
                tok = parser.gullet.popToken();
              }
            }
            return tok;
          };
          var letCommand = function letCommand2(parser, name, tok, global) {
            var macro = parser.gullet.macros.get(tok.text);
            if (macro == null) {
              tok.noexpand = true;
              macro = {
                tokens: [tok],
                numArgs: 0,
                unexpandable: !parser.gullet.isExpandable(tok.text)
              };
            }
            parser.gullet.macros.set(name, macro, global);
          };
          defineFunction({
            type: "internal",
            names: [
              "\\global",
              "\\long",
              "\\\\globallong"
            ],
            props: {
              numArgs: 0,
              allowedInText: true
            },
            handler: function handler(_ref) {
              var parser = _ref.parser, funcName = _ref.funcName;
              parser.consumeSpaces();
              var token = parser.fetch();
              if (globalMap[token.text]) {
                if (funcName === "\\global" || funcName === "\\\\globallong") {
                  token.text = globalMap[token.text];
                }
                return assertNodeType(parser.parseFunction(), "internal");
              }
              throw new src_ParseError("Invalid token after macro prefix", token);
            }
          });
          defineFunction({
            type: "internal",
            names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
            props: {
              numArgs: 0,
              allowedInText: true,
              primitive: true
            },
            handler: function handler(_ref2) {
              var parser = _ref2.parser, funcName = _ref2.funcName;
              var tok = parser.gullet.popToken();
              var name = tok.text;
              if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) {
                throw new src_ParseError("Expected a control sequence", tok);
              }
              var numArgs = 0;
              var insert;
              var delimiters2 = [[]];
              while (parser.gullet.future().text !== "{") {
                tok = parser.gullet.popToken();
                if (tok.text === "#") {
                  if (parser.gullet.future().text === "{") {
                    insert = parser.gullet.future();
                    delimiters2[numArgs].push("{");
                    break;
                  }
                  tok = parser.gullet.popToken();
                  if (!/^[1-9]$/.test(tok.text)) {
                    throw new src_ParseError('Invalid argument number "' + tok.text + '"');
                  }
                  if (parseInt(tok.text) !== numArgs + 1) {
                    throw new src_ParseError('Argument number "' + tok.text + '" out of order');
                  }
                  numArgs++;
                  delimiters2.push([]);
                } else if (tok.text === "EOF") {
                  throw new src_ParseError("Expected a macro definition");
                } else {
                  delimiters2[numArgs].push(tok.text);
                }
              }
              var _parser$gullet$consum = parser.gullet.consumeArg(), tokens = _parser$gullet$consum.tokens;
              if (insert) {
                tokens.unshift(insert);
              }
              if (funcName === "\\edef" || funcName === "\\xdef") {
                tokens = parser.gullet.expandTokens(tokens);
                tokens.reverse();
              }
              parser.gullet.macros.set(name, {
                tokens,
                numArgs,
                delimiters: delimiters2
              }, funcName === globalMap[funcName]);
              return {
                type: "internal",
                mode: parser.mode
              };
            }
          });
          defineFunction({
            type: "internal",
            names: [
              "\\let",
              "\\\\globallet"
            ],
            props: {
              numArgs: 0,
              allowedInText: true,
              primitive: true
            },
            handler: function handler(_ref3) {
              var parser = _ref3.parser, funcName = _ref3.funcName;
              var name = checkControlSequence(parser.gullet.popToken());
              parser.gullet.consumeSpaces();
              var tok = getRHS(parser);
              letCommand(parser, name, tok, funcName === "\\\\globallet");
              return {
                type: "internal",
                mode: parser.mode
              };
            }
          });
          defineFunction({
            type: "internal",
            names: [
              "\\futurelet",
              "\\\\globalfuture"
            ],
            props: {
              numArgs: 0,
              allowedInText: true,
              primitive: true
            },
            handler: function handler(_ref4) {
              var parser = _ref4.parser, funcName = _ref4.funcName;
              var name = checkControlSequence(parser.gullet.popToken());
              var middle = parser.gullet.popToken();
              var tok = parser.gullet.popToken();
              letCommand(parser, name, tok, funcName === "\\\\globalfuture");
              parser.gullet.pushToken(tok);
              parser.gullet.pushToken(middle);
              return {
                type: "internal",
                mode: parser.mode
              };
            }
          });
          ;
          var getMetrics = function getMetrics2(symbol, font, mode) {
            var replace = src_symbols.math[symbol] && src_symbols.math[symbol].replace;
            var metrics = getCharacterMetrics(replace || symbol, font, mode);
            if (!metrics) {
              throw new Error("Unsupported symbol " + symbol + " and font size " + font + ".");
            }
            return metrics;
          };
          var styleWrap = function styleWrap2(delim, toStyle, options2, classes) {
            var newOptions = options2.havingBaseStyle(toStyle);
            var span = buildCommon.makeSpan(classes.concat(newOptions.sizingClasses(options2)), [delim], options2);
            var delimSizeMultiplier = newOptions.sizeMultiplier / options2.sizeMultiplier;
            span.height *= delimSizeMultiplier;
            span.depth *= delimSizeMultiplier;
            span.maxFontSize = newOptions.sizeMultiplier;
            return span;
          };
          var centerSpan = function centerSpan2(span, options2, style) {
            var newOptions = options2.havingBaseStyle(style);
            var shift = (1 - options2.sizeMultiplier / newOptions.sizeMultiplier) * options2.fontMetrics().axisHeight;
            span.classes.push("delimcenter");
            span.style.top = makeEm(shift);
            span.height -= shift;
            span.depth += shift;
          };
          var makeSmallDelim = function makeSmallDelim2(delim, style, center, options2, mode, classes) {
            var text = buildCommon.makeSymbol(delim, "Main-Regular", mode, options2);
            var span = styleWrap(text, style, options2, classes);
            if (center) {
              centerSpan(span, options2, style);
            }
            return span;
          };
          var mathrmSize = function mathrmSize2(value, size, mode, options2) {
            return buildCommon.makeSymbol(value, "Size" + size + "-Regular", mode, options2);
          };
          var makeLargeDelim = function makeLargeDelim2(delim, size, center, options2, mode, classes) {
            var inner2 = mathrmSize(delim, size, mode, options2);
            var span = styleWrap(buildCommon.makeSpan(["delimsizing", "size" + size], [inner2], options2), src_Style.TEXT, options2, classes);
            if (center) {
              centerSpan(span, options2, src_Style.TEXT);
            }
            return span;
          };
          var makeGlyphSpan = function makeGlyphSpan2(symbol, font, mode) {
            var sizeClass;
            if (font === "Size1-Regular") {
              sizeClass = "delim-size1";
            } else {
              sizeClass = "delim-size4";
            }
            var corner = buildCommon.makeSpan(["delimsizinginner", sizeClass], [buildCommon.makeSpan([], [buildCommon.makeSymbol(symbol, font, mode)])]);
            return {
              type: "elem",
              elem: corner
            };
          };
          var makeInner = function makeInner2(ch2, height, options2) {
            var width = fontMetricsData["Size4-Regular"][ch2.charCodeAt(0)] ? fontMetricsData["Size4-Regular"][ch2.charCodeAt(0)][4] : fontMetricsData["Size1-Regular"][ch2.charCodeAt(0)][4];
            var path2 = new PathNode("inner", innerPath(ch2, Math.round(1e3 * height)));
            var svgNode = new SvgNode([path2], {
              "width": makeEm(width),
              "height": makeEm(height),
              "style": "width:" + makeEm(width),
              "viewBox": "0 0 " + 1e3 * width + " " + Math.round(1e3 * height),
              "preserveAspectRatio": "xMinYMin"
            });
            var span = buildCommon.makeSvgSpan([], [svgNode], options2);
            span.height = height;
            span.style.height = makeEm(height);
            span.style.width = makeEm(width);
            return {
              type: "elem",
              elem: span
            };
          };
          var lapInEms = 8e-3;
          var lap = {
            type: "kern",
            size: -1 * lapInEms
          };
          var verts = ["|", "\\lvert", "\\rvert", "\\vert"];
          var doubleVerts = ["\\|", "\\lVert", "\\rVert", "\\Vert"];
          var makeStackedDelim = function makeStackedDelim2(delim, heightTotal, center, options2, mode, classes) {
            var top;
            var middle;
            var repeat;
            var bottom;
            top = repeat = bottom = delim;
            middle = null;
            var font = "Size1-Regular";
            if (delim === "\\uparrow") {
              repeat = bottom = "\u23D0";
            } else if (delim === "\\Uparrow") {
              repeat = bottom = "\u2016";
            } else if (delim === "\\downarrow") {
              top = repeat = "\u23D0";
            } else if (delim === "\\Downarrow") {
              top = repeat = "\u2016";
            } else if (delim === "\\updownarrow") {
              top = "\\uparrow";
              repeat = "\u23D0";
              bottom = "\\downarrow";
            } else if (delim === "\\Updownarrow") {
              top = "\\Uparrow";
              repeat = "\u2016";
              bottom = "\\Downarrow";
            } else if (utils.contains(verts, delim)) {
              repeat = "\u2223";
            } else if (utils.contains(doubleVerts, delim)) {
              repeat = "\u2225";
            } else if (delim === "[" || delim === "\\lbrack") {
              top = "\u23A1";
              repeat = "\u23A2";
              bottom = "\u23A3";
              font = "Size4-Regular";
            } else if (delim === "]" || delim === "\\rbrack") {
              top = "\u23A4";
              repeat = "\u23A5";
              bottom = "\u23A6";
              font = "Size4-Regular";
            } else if (delim === "\\lfloor" || delim === "\u230A") {
              repeat = top = "\u23A2";
              bottom = "\u23A3";
              font = "Size4-Regular";
            } else if (delim === "\\lceil" || delim === "\u2308") {
              top = "\u23A1";
              repeat = bottom = "\u23A2";
              font = "Size4-Regular";
            } else if (delim === "\\rfloor" || delim === "\u230B") {
              repeat = top = "\u23A5";
              bottom = "\u23A6";
              font = "Size4-Regular";
            } else if (delim === "\\rceil" || delim === "\u2309") {
              top = "\u23A4";
              repeat = bottom = "\u23A5";
              font = "Size4-Regular";
            } else if (delim === "(" || delim === "\\lparen") {
              top = "\u239B";
              repeat = "\u239C";
              bottom = "\u239D";
              font = "Size4-Regular";
            } else if (delim === ")" || delim === "\\rparen") {
              top = "\u239E";
              repeat = "\u239F";
              bottom = "\u23A0";
              font = "Size4-Regular";
            } else if (delim === "\\{" || delim === "\\lbrace") {
              top = "\u23A7";
              middle = "\u23A8";
              bottom = "\u23A9";
              repeat = "\u23AA";
              font = "Size4-Regular";
            } else if (delim === "\\}" || delim === "\\rbrace") {
              top = "\u23AB";
              middle = "\u23AC";
              bottom = "\u23AD";
              repeat = "\u23AA";
              font = "Size4-Regular";
            } else if (delim === "\\lgroup" || delim === "\u27EE") {
              top = "\u23A7";
              bottom = "\u23A9";
              repeat = "\u23AA";
              font = "Size4-Regular";
            } else if (delim === "\\rgroup" || delim === "\u27EF") {
              top = "\u23AB";
              bottom = "\u23AD";
              repeat = "\u23AA";
              font = "Size4-Regular";
            } else if (delim === "\\lmoustache" || delim === "\u23B0") {
              top = "\u23A7";
              bottom = "\u23AD";
              repeat = "\u23AA";
              font = "Size4-Regular";
            } else if (delim === "\\rmoustache" || delim === "\u23B1") {
              top = "\u23AB";
              bottom = "\u23A9";
              repeat = "\u23AA";
              font = "Size4-Regular";
            }
            var topMetrics = getMetrics(top, font, mode);
            var topHeightTotal = topMetrics.height + topMetrics.depth;
            var repeatMetrics = getMetrics(repeat, font, mode);
            var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
            var bottomMetrics = getMetrics(bottom, font, mode);
            var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
            var middleHeightTotal = 0;
            var middleFactor = 1;
            if (middle !== null) {
              var middleMetrics = getMetrics(middle, font, mode);
              middleHeightTotal = middleMetrics.height + middleMetrics.depth;
              middleFactor = 2;
            }
            var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;
            var repeatCount = Math.max(0, Math.ceil((heightTotal - minHeight) / (middleFactor * repeatHeightTotal)));
            var realHeightTotal = minHeight + repeatCount * middleFactor * repeatHeightTotal;
            var axisHeight = options2.fontMetrics().axisHeight;
            if (center) {
              axisHeight *= options2.sizeMultiplier;
            }
            var depth = realHeightTotal / 2 - axisHeight;
            var stack = [];
            stack.push(makeGlyphSpan(bottom, font, mode));
            stack.push(lap);
            if (middle === null) {
              var innerHeight = realHeightTotal - topHeightTotal - bottomHeightTotal + 2 * lapInEms;
              stack.push(makeInner(repeat, innerHeight, options2));
            } else {
              var _innerHeight = (realHeightTotal - topHeightTotal - bottomHeightTotal - middleHeightTotal) / 2 + 2 * lapInEms;
              stack.push(makeInner(repeat, _innerHeight, options2));
              stack.push(lap);
              stack.push(makeGlyphSpan(middle, font, mode));
              stack.push(lap);
              stack.push(makeInner(repeat, _innerHeight, options2));
            }
            stack.push(lap);
            stack.push(makeGlyphSpan(top, font, mode));
            var newOptions = options2.havingBaseStyle(src_Style.TEXT);
            var inner2 = buildCommon.makeVList({
              positionType: "bottom",
              positionData: depth,
              children: stack
            }, newOptions);
            return styleWrap(buildCommon.makeSpan(["delimsizing", "mult"], [inner2], newOptions), src_Style.TEXT, options2, classes);
          };
          var vbPad = 80;
          var emPad = 0.08;
          var sqrtSvg = function sqrtSvg2(sqrtName, height, viewBoxHeight, extraViniculum, options2) {
            var path2 = sqrtPath(sqrtName, extraViniculum, viewBoxHeight);
            var pathNode = new PathNode(sqrtName, path2);
            var svg = new SvgNode([pathNode], {
              "width": "400em",
              "height": makeEm(height),
              "viewBox": "0 0 400000 " + viewBoxHeight,
              "preserveAspectRatio": "xMinYMin slice"
            });
            return buildCommon.makeSvgSpan(["hide-tail"], [svg], options2);
          };
          var makeSqrtImage = function makeSqrtImage2(height, options2) {
            var newOptions = options2.havingBaseSizing();
            var delim = traverseSequence("\\surd", height * newOptions.sizeMultiplier, stackLargeDelimiterSequence, newOptions);
            var sizeMultiplier = newOptions.sizeMultiplier;
            var extraViniculum = Math.max(0, options2.minRuleThickness - options2.fontMetrics().sqrtRuleThickness);
            var span;
            var spanHeight = 0;
            var texHeight = 0;
            var viewBoxHeight = 0;
            var advanceWidth;
            if (delim.type === "small") {
              viewBoxHeight = 1e3 + 1e3 * extraViniculum + vbPad;
              if (height < 1) {
                sizeMultiplier = 1;
              } else if (height < 1.4) {
                sizeMultiplier = 0.7;
              }
              spanHeight = (1 + extraViniculum + emPad) / sizeMultiplier;
              texHeight = (1 + extraViniculum) / sizeMultiplier;
              span = sqrtSvg("sqrtMain", spanHeight, viewBoxHeight, extraViniculum, options2);
              span.style.minWidth = "0.853em";
              advanceWidth = 0.833 / sizeMultiplier;
            } else if (delim.type === "large") {
              viewBoxHeight = (1e3 + vbPad) * sizeToMaxHeight[delim.size];
              texHeight = (sizeToMaxHeight[delim.size] + extraViniculum) / sizeMultiplier;
              spanHeight = (sizeToMaxHeight[delim.size] + extraViniculum + emPad) / sizeMultiplier;
              span = sqrtSvg("sqrtSize" + delim.size, spanHeight, viewBoxHeight, extraViniculum, options2);
              span.style.minWidth = "1.02em";
              advanceWidth = 1 / sizeMultiplier;
            } else {
              spanHeight = height + extraViniculum + emPad;
              texHeight = height + extraViniculum;
              viewBoxHeight = Math.floor(1e3 * height + extraViniculum) + vbPad;
              span = sqrtSvg("sqrtTall", spanHeight, viewBoxHeight, extraViniculum, options2);
              span.style.minWidth = "0.742em";
              advanceWidth = 1.056;
            }
            span.height = texHeight;
            span.style.height = makeEm(spanHeight);
            return {
              span,
              advanceWidth,
              ruleWidth: (options2.fontMetrics().sqrtRuleThickness + extraViniculum) * sizeMultiplier
            };
          };
          var stackLargeDelimiters = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "\\surd"];
          var stackAlwaysDelimiters = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1"];
          var stackNeverDelimiters = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"];
          var sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3];
          var makeSizedDelim = function makeSizedDelim2(delim, size, options2, mode, classes) {
            if (delim === "<" || delim === "\\lt" || delim === "\u27E8") {
              delim = "\\langle";
            } else if (delim === ">" || delim === "\\gt" || delim === "\u27E9") {
              delim = "\\rangle";
            }
            if (utils.contains(stackLargeDelimiters, delim) || utils.contains(stackNeverDelimiters, delim)) {
              return makeLargeDelim(delim, size, false, options2, mode, classes);
            } else if (utils.contains(stackAlwaysDelimiters, delim)) {
              return makeStackedDelim(delim, sizeToMaxHeight[size], false, options2, mode, classes);
            } else {
              throw new src_ParseError("Illegal delimiter: '" + delim + "'");
            }
          };
          var stackNeverDelimiterSequence = [{
            type: "small",
            style: src_Style.SCRIPTSCRIPT
          }, {
            type: "small",
            style: src_Style.SCRIPT
          }, {
            type: "small",
            style: src_Style.TEXT
          }, {
            type: "large",
            size: 1
          }, {
            type: "large",
            size: 2
          }, {
            type: "large",
            size: 3
          }, {
            type: "large",
            size: 4
          }];
          var stackAlwaysDelimiterSequence = [{
            type: "small",
            style: src_Style.SCRIPTSCRIPT
          }, {
            type: "small",
            style: src_Style.SCRIPT
          }, {
            type: "small",
            style: src_Style.TEXT
          }, {
            type: "stack"
          }];
          var stackLargeDelimiterSequence = [{
            type: "small",
            style: src_Style.SCRIPTSCRIPT
          }, {
            type: "small",
            style: src_Style.SCRIPT
          }, {
            type: "small",
            style: src_Style.TEXT
          }, {
            type: "large",
            size: 1
          }, {
            type: "large",
            size: 2
          }, {
            type: "large",
            size: 3
          }, {
            type: "large",
            size: 4
          }, {
            type: "stack"
          }];
          var delimTypeToFont = function delimTypeToFont2(type) {
            if (type.type === "small") {
              return "Main-Regular";
            } else if (type.type === "large") {
              return "Size" + type.size + "-Regular";
            } else if (type.type === "stack") {
              return "Size4-Regular";
            } else {
              throw new Error("Add support for delim type '" + type.type + "' here.");
            }
          };
          var traverseSequence = function traverseSequence2(delim, height, sequence, options2) {
            var start = Math.min(2, 3 - options2.style.size);
            for (var i3 = start; i3 < sequence.length; i3++) {
              if (sequence[i3].type === "stack") {
                break;
              }
              var metrics = getMetrics(delim, delimTypeToFont(sequence[i3]), "math");
              var heightDepth = metrics.height + metrics.depth;
              if (sequence[i3].type === "small") {
                var newOptions = options2.havingBaseStyle(sequence[i3].style);
                heightDepth *= newOptions.sizeMultiplier;
              }
              if (heightDepth > height) {
                return sequence[i3];
              }
            }
            return sequence[sequence.length - 1];
          };
          var makeCustomSizedDelim = function makeCustomSizedDelim2(delim, height, center, options2, mode, classes) {
            if (delim === "<" || delim === "\\lt" || delim === "\u27E8") {
              delim = "\\langle";
            } else if (delim === ">" || delim === "\\gt" || delim === "\u27E9") {
              delim = "\\rangle";
            }
            var sequence;
            if (utils.contains(stackNeverDelimiters, delim)) {
              sequence = stackNeverDelimiterSequence;
            } else if (utils.contains(stackLargeDelimiters, delim)) {
              sequence = stackLargeDelimiterSequence;
            } else {
              sequence = stackAlwaysDelimiterSequence;
            }
            var delimType = traverseSequence(delim, height, sequence, options2);
            if (delimType.type === "small") {
              return makeSmallDelim(delim, delimType.style, center, options2, mode, classes);
            } else if (delimType.type === "large") {
              return makeLargeDelim(delim, delimType.size, center, options2, mode, classes);
            } else {
              return makeStackedDelim(delim, height, center, options2, mode, classes);
            }
          };
          var makeLeftRightDelim = function makeLeftRightDelim2(delim, height, depth, options2, mode, classes) {
            var axisHeight = options2.fontMetrics().axisHeight * options2.sizeMultiplier;
            var delimiterFactor = 901;
            var delimiterExtend = 5 / options2.fontMetrics().ptPerEm;
            var maxDistFromAxis = Math.max(height - axisHeight, depth + axisHeight);
            var totalHeight = Math.max(maxDistFromAxis / 500 * delimiterFactor, 2 * maxDistFromAxis - delimiterExtend);
            return makeCustomSizedDelim(delim, totalHeight, true, options2, mode, classes);
          };
          var delimiter = {
            sqrtImage: makeSqrtImage,
            sizedDelim: makeSizedDelim,
            sizeToMaxHeight,
            customSizedDelim: makeCustomSizedDelim,
            leftRightDelim: makeLeftRightDelim
          };
          ;
          var delimiterSizes = {
            "\\bigl": {
              mclass: "mopen",
              size: 1
            },
            "\\Bigl": {
              mclass: "mopen",
              size: 2
            },
            "\\biggl": {
              mclass: "mopen",
              size: 3
            },
            "\\Biggl": {
              mclass: "mopen",
              size: 4
            },
            "\\bigr": {
              mclass: "mclose",
              size: 1
            },
            "\\Bigr": {
              mclass: "mclose",
              size: 2
            },
            "\\biggr": {
              mclass: "mclose",
              size: 3
            },
            "\\Biggr": {
              mclass: "mclose",
              size: 4
            },
            "\\bigm": {
              mclass: "mrel",
              size: 1
            },
            "\\Bigm": {
              mclass: "mrel",
              size: 2
            },
            "\\biggm": {
              mclass: "mrel",
              size: 3
            },
            "\\Biggm": {
              mclass: "mrel",
              size: 4
            },
            "\\big": {
              mclass: "mord",
              size: 1
            },
            "\\Big": {
              mclass: "mord",
              size: 2
            },
            "\\bigg": {
              mclass: "mord",
              size: 3
            },
            "\\Bigg": {
              mclass: "mord",
              size: 4
            }
          };
          var delimiters = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "<", ">", "\\langle", "\u27E8", "\\rangle", "\u27E9", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];
          function checkDelimiter(delim, context2) {
            var symDelim = checkSymbolNodeType(delim);
            if (symDelim && utils.contains(delimiters, symDelim.text)) {
              return symDelim;
            } else if (symDelim) {
              throw new src_ParseError("Invalid delimiter '" + symDelim.text + "' after '" + context2.funcName + "'", delim);
            } else {
              throw new src_ParseError("Invalid delimiter type '" + delim.type + "'", delim);
            }
          }
          defineFunction({
            type: "delimsizing",
            names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
            props: {
              numArgs: 1,
              argTypes: ["primitive"]
            },
            handler: function handler(context2, args) {
              var delim = checkDelimiter(args[0], context2);
              return {
                type: "delimsizing",
                mode: context2.parser.mode,
                size: delimiterSizes[context2.funcName].size,
                mclass: delimiterSizes[context2.funcName].mclass,
                delim: delim.text
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              if (group.delim === ".") {
                return buildCommon.makeSpan([group.mclass]);
              }
              return delimiter.sizedDelim(group.delim, group.size, options2, group.mode, [group.mclass]);
            },
            mathmlBuilder: function mathmlBuilder2(group) {
              var children = [];
              if (group.delim !== ".") {
                children.push(makeText(group.delim, group.mode));
              }
              var node = new mathMLTree.MathNode("mo", children);
              if (group.mclass === "mopen" || group.mclass === "mclose") {
                node.setAttribute("fence", "true");
              } else {
                node.setAttribute("fence", "false");
              }
              node.setAttribute("stretchy", "true");
              var size = makeEm(delimiter.sizeToMaxHeight[group.size]);
              node.setAttribute("minsize", size);
              node.setAttribute("maxsize", size);
              return node;
            }
          });
          function assertParsed(group) {
            if (!group.body) {
              throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
            }
          }
          defineFunction({
            type: "leftright-right",
            names: ["\\right"],
            props: {
              numArgs: 1,
              primitive: true
            },
            handler: function handler(context2, args) {
              var color = context2.parser.gullet.macros.get("\\current@color");
              if (color && typeof color !== "string") {
                throw new src_ParseError("\\current@color set to non-string in \\right");
              }
              return {
                type: "leftright-right",
                mode: context2.parser.mode,
                delim: checkDelimiter(args[0], context2).text,
                color
              };
            }
          });
          defineFunction({
            type: "leftright",
            names: ["\\left"],
            props: {
              numArgs: 1,
              primitive: true
            },
            handler: function handler(context2, args) {
              var delim = checkDelimiter(args[0], context2);
              var parser = context2.parser;
              ++parser.leftrightDepth;
              var body = parser.parseExpression(false);
              --parser.leftrightDepth;
              parser.expect("\\right", false);
              var right = assertNodeType(parser.parseFunction(), "leftright-right");
              return {
                type: "leftright",
                mode: parser.mode,
                body,
                left: delim.text,
                right: right.delim,
                rightColor: right.color
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              assertParsed(group);
              var inner2 = buildExpression(group.body, options2, true, ["mopen", "mclose"]);
              var innerHeight = 0;
              var innerDepth = 0;
              var hadMiddle = false;
              for (var i3 = 0; i3 < inner2.length; i3++) {
                if (inner2[i3].isMiddle) {
                  hadMiddle = true;
                } else {
                  innerHeight = Math.max(inner2[i3].height, innerHeight);
                  innerDepth = Math.max(inner2[i3].depth, innerDepth);
                }
              }
              innerHeight *= options2.sizeMultiplier;
              innerDepth *= options2.sizeMultiplier;
              var leftDelim;
              if (group.left === ".") {
                leftDelim = makeNullDelimiter(options2, ["mopen"]);
              } else {
                leftDelim = delimiter.leftRightDelim(group.left, innerHeight, innerDepth, options2, group.mode, ["mopen"]);
              }
              inner2.unshift(leftDelim);
              if (hadMiddle) {
                for (var _i6 = 1; _i6 < inner2.length; _i6++) {
                  var middleDelim = inner2[_i6];
                  var isMiddle = middleDelim.isMiddle;
                  if (isMiddle) {
                    inner2[_i6] = delimiter.leftRightDelim(isMiddle.delim, innerHeight, innerDepth, isMiddle.options, group.mode, []);
                  }
                }
              }
              var rightDelim;
              if (group.right === ".") {
                rightDelim = makeNullDelimiter(options2, ["mclose"]);
              } else {
                var colorOptions = group.rightColor ? options2.withColor(group.rightColor) : options2;
                rightDelim = delimiter.leftRightDelim(group.right, innerHeight, innerDepth, colorOptions, group.mode, ["mclose"]);
              }
              inner2.push(rightDelim);
              return buildCommon.makeSpan(["minner"], inner2, options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              assertParsed(group);
              var inner2 = buildMathML_buildExpression(group.body, options2);
              if (group.left !== ".") {
                var leftNode = new mathMLTree.MathNode("mo", [makeText(group.left, group.mode)]);
                leftNode.setAttribute("fence", "true");
                inner2.unshift(leftNode);
              }
              if (group.right !== ".") {
                var rightNode = new mathMLTree.MathNode("mo", [makeText(group.right, group.mode)]);
                rightNode.setAttribute("fence", "true");
                if (group.rightColor) {
                  rightNode.setAttribute("mathcolor", group.rightColor);
                }
                inner2.push(rightNode);
              }
              return makeRow(inner2);
            }
          });
          defineFunction({
            type: "middle",
            names: ["\\middle"],
            props: {
              numArgs: 1,
              primitive: true
            },
            handler: function handler(context2, args) {
              var delim = checkDelimiter(args[0], context2);
              if (!context2.parser.leftrightDepth) {
                throw new src_ParseError("\\middle without preceding \\left", delim);
              }
              return {
                type: "middle",
                mode: context2.parser.mode,
                delim: delim.text
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var middleDelim;
              if (group.delim === ".") {
                middleDelim = makeNullDelimiter(options2, []);
              } else {
                middleDelim = delimiter.sizedDelim(group.delim, 1, options2, group.mode, []);
                var isMiddle = {
                  delim: group.delim,
                  options: options2
                };
                middleDelim.isMiddle = isMiddle;
              }
              return middleDelim;
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var textNode = group.delim === "\\vert" || group.delim === "|" ? makeText("|", "text") : makeText(group.delim, group.mode);
              var middleNode = new mathMLTree.MathNode("mo", [textNode]);
              middleNode.setAttribute("fence", "true");
              middleNode.setAttribute("lspace", "0.05em");
              middleNode.setAttribute("rspace", "0.05em");
              return middleNode;
            }
          });
          ;
          var enclose_htmlBuilder = function htmlBuilder2(group, options2) {
            var inner2 = buildCommon.wrapFragment(buildGroup(group.body, options2), options2);
            var label = group.label.substr(1);
            var scale = options2.sizeMultiplier;
            var img;
            var imgShift = 0;
            var isSingleChar = utils.isCharacterBox(group.body);
            if (label === "sout") {
              img = buildCommon.makeSpan(["stretchy", "sout"]);
              img.height = options2.fontMetrics().defaultRuleThickness / scale;
              imgShift = -0.5 * options2.fontMetrics().xHeight;
            } else if (label === "phase") {
              var lineWeight = calculateSize({
                number: 0.6,
                unit: "pt"
              }, options2);
              var clearance = calculateSize({
                number: 0.35,
                unit: "ex"
              }, options2);
              var newOptions = options2.havingBaseSizing();
              scale = scale / newOptions.sizeMultiplier;
              var angleHeight = inner2.height + inner2.depth + lineWeight + clearance;
              inner2.style.paddingLeft = makeEm(angleHeight / 2 + lineWeight);
              var viewBoxHeight = Math.floor(1e3 * angleHeight * scale);
              var path2 = phasePath(viewBoxHeight);
              var svgNode = new SvgNode([new PathNode("phase", path2)], {
                "width": "400em",
                "height": makeEm(viewBoxHeight / 1e3),
                "viewBox": "0 0 400000 " + viewBoxHeight,
                "preserveAspectRatio": "xMinYMin slice"
              });
              img = buildCommon.makeSvgSpan(["hide-tail"], [svgNode], options2);
              img.style.height = makeEm(angleHeight);
              imgShift = inner2.depth + lineWeight + clearance;
            } else {
              if (/cancel/.test(label)) {
                if (!isSingleChar) {
                  inner2.classes.push("cancel-pad");
                }
              } else if (label === "angl") {
                inner2.classes.push("anglpad");
              } else {
                inner2.classes.push("boxpad");
              }
              var topPad = 0;
              var bottomPad = 0;
              var ruleThickness = 0;
              if (/box/.test(label)) {
                ruleThickness = Math.max(options2.fontMetrics().fboxrule, options2.minRuleThickness);
                topPad = options2.fontMetrics().fboxsep + (label === "colorbox" ? 0 : ruleThickness);
                bottomPad = topPad;
              } else if (label === "angl") {
                ruleThickness = Math.max(options2.fontMetrics().defaultRuleThickness, options2.minRuleThickness);
                topPad = 4 * ruleThickness;
                bottomPad = Math.max(0, 0.25 - inner2.depth);
              } else {
                topPad = isSingleChar ? 0.2 : 0;
                bottomPad = topPad;
              }
              img = stretchy.encloseSpan(inner2, label, topPad, bottomPad, options2);
              if (/fbox|boxed|fcolorbox/.test(label)) {
                img.style.borderStyle = "solid";
                img.style.borderWidth = makeEm(ruleThickness);
              } else if (label === "angl" && ruleThickness !== 0.049) {
                img.style.borderTopWidth = makeEm(ruleThickness);
                img.style.borderRightWidth = makeEm(ruleThickness);
              }
              imgShift = inner2.depth + bottomPad;
              if (group.backgroundColor) {
                img.style.backgroundColor = group.backgroundColor;
                if (group.borderColor) {
                  img.style.borderColor = group.borderColor;
                }
              }
            }
            var vlist;
            if (group.backgroundColor) {
              vlist = buildCommon.makeVList({
                positionType: "individualShift",
                children: [
                  {
                    type: "elem",
                    elem: img,
                    shift: imgShift
                  },
                  {
                    type: "elem",
                    elem: inner2,
                    shift: 0
                  }
                ]
              }, options2);
            } else {
              var classes = /cancel|phase/.test(label) ? ["svg-align"] : [];
              vlist = buildCommon.makeVList({
                positionType: "individualShift",
                children: [
                  {
                    type: "elem",
                    elem: inner2,
                    shift: 0
                  },
                  {
                    type: "elem",
                    elem: img,
                    shift: imgShift,
                    wrapperClasses: classes
                  }
                ]
              }, options2);
            }
            if (/cancel/.test(label)) {
              vlist.height = inner2.height;
              vlist.depth = inner2.depth;
            }
            if (/cancel/.test(label) && !isSingleChar) {
              return buildCommon.makeSpan(["mord", "cancel-lap"], [vlist], options2);
            } else {
              return buildCommon.makeSpan(["mord"], [vlist], options2);
            }
          };
          var enclose_mathmlBuilder = function mathmlBuilder2(group, options2) {
            var fboxsep = 0;
            var node = new mathMLTree.MathNode(group.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose", [buildMathML_buildGroup(group.body, options2)]);
            switch (group.label) {
              case "\\cancel":
                node.setAttribute("notation", "updiagonalstrike");
                break;
              case "\\bcancel":
                node.setAttribute("notation", "downdiagonalstrike");
                break;
              case "\\phase":
                node.setAttribute("notation", "phasorangle");
                break;
              case "\\sout":
                node.setAttribute("notation", "horizontalstrike");
                break;
              case "\\fbox":
                node.setAttribute("notation", "box");
                break;
              case "\\angl":
                node.setAttribute("notation", "actuarial");
                break;
              case "\\fcolorbox":
              case "\\colorbox":
                fboxsep = options2.fontMetrics().fboxsep * options2.fontMetrics().ptPerEm;
                node.setAttribute("width", "+" + 2 * fboxsep + "pt");
                node.setAttribute("height", "+" + 2 * fboxsep + "pt");
                node.setAttribute("lspace", fboxsep + "pt");
                node.setAttribute("voffset", fboxsep + "pt");
                if (group.label === "\\fcolorbox") {
                  var thk = Math.max(options2.fontMetrics().fboxrule, options2.minRuleThickness);
                  node.setAttribute("style", "border: " + thk + "em solid " + String(group.borderColor));
                }
                break;
              case "\\xcancel":
                node.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
                break;
            }
            if (group.backgroundColor) {
              node.setAttribute("mathbackground", group.backgroundColor);
            }
            return node;
          };
          defineFunction({
            type: "enclose",
            names: ["\\colorbox"],
            props: {
              numArgs: 2,
              allowedInText: true,
              argTypes: ["color", "text"]
            },
            handler: function handler(_ref, args, optArgs) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var color = assertNodeType(args[0], "color-token").color;
              var body = args[1];
              return {
                type: "enclose",
                mode: parser.mode,
                label: funcName,
                backgroundColor: color,
                body
              };
            },
            htmlBuilder: enclose_htmlBuilder,
            mathmlBuilder: enclose_mathmlBuilder
          });
          defineFunction({
            type: "enclose",
            names: ["\\fcolorbox"],
            props: {
              numArgs: 3,
              allowedInText: true,
              argTypes: ["color", "color", "text"]
            },
            handler: function handler(_ref2, args, optArgs) {
              var parser = _ref2.parser, funcName = _ref2.funcName;
              var borderColor = assertNodeType(args[0], "color-token").color;
              var backgroundColor = assertNodeType(args[1], "color-token").color;
              var body = args[2];
              return {
                type: "enclose",
                mode: parser.mode,
                label: funcName,
                backgroundColor,
                borderColor,
                body
              };
            },
            htmlBuilder: enclose_htmlBuilder,
            mathmlBuilder: enclose_mathmlBuilder
          });
          defineFunction({
            type: "enclose",
            names: ["\\fbox"],
            props: {
              numArgs: 1,
              argTypes: ["hbox"],
              allowedInText: true
            },
            handler: function handler(_ref3, args) {
              var parser = _ref3.parser;
              return {
                type: "enclose",
                mode: parser.mode,
                label: "\\fbox",
                body: args[0]
              };
            }
          });
          defineFunction({
            type: "enclose",
            names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
            props: {
              numArgs: 1
            },
            handler: function handler(_ref4, args) {
              var parser = _ref4.parser, funcName = _ref4.funcName;
              var body = args[0];
              return {
                type: "enclose",
                mode: parser.mode,
                label: funcName,
                body
              };
            },
            htmlBuilder: enclose_htmlBuilder,
            mathmlBuilder: enclose_mathmlBuilder
          });
          defineFunction({
            type: "enclose",
            names: ["\\angl"],
            props: {
              numArgs: 1,
              argTypes: ["hbox"],
              allowedInText: false
            },
            handler: function handler(_ref5, args) {
              var parser = _ref5.parser;
              return {
                type: "enclose",
                mode: parser.mode,
                label: "\\angl",
                body: args[0]
              };
            }
          });
          ;
          var _environments = {};
          function defineEnvironment(_ref) {
            var type = _ref.type, names = _ref.names, props = _ref.props, handler = _ref.handler, htmlBuilder2 = _ref.htmlBuilder, mathmlBuilder2 = _ref.mathmlBuilder;
            var data2 = {
              type,
              numArgs: props.numArgs || 0,
              allowedInText: false,
              numOptionalArgs: 0,
              handler
            };
            for (var i3 = 0; i3 < names.length; ++i3) {
              _environments[names[i3]] = data2;
            }
            if (htmlBuilder2) {
              _htmlGroupBuilders[type] = htmlBuilder2;
            }
            if (mathmlBuilder2) {
              _mathmlGroupBuilders[type] = mathmlBuilder2;
            }
          }
          ;
          function getHLines(parser) {
            var hlineInfo = [];
            parser.consumeSpaces();
            var nxt = parser.fetch().text;
            while (nxt === "\\hline" || nxt === "\\hdashline") {
              parser.consume();
              hlineInfo.push(nxt === "\\hdashline");
              parser.consumeSpaces();
              nxt = parser.fetch().text;
            }
            return hlineInfo;
          }
          var validateAmsEnvironmentContext = function validateAmsEnvironmentContext2(context2) {
            var settings = context2.parser.settings;
            if (!settings.displayMode) {
              throw new src_ParseError("{" + context2.envName + "} can be used only in display mode.");
            }
          };
          function parseArray(parser, _ref, style) {
            var hskipBeforeAndAfter = _ref.hskipBeforeAndAfter, addJot = _ref.addJot, cols = _ref.cols, arraystretch = _ref.arraystretch, colSeparationType = _ref.colSeparationType, addEqnNum = _ref.addEqnNum, singleRow = _ref.singleRow, emptySingleRow = _ref.emptySingleRow, maxNumCols = _ref.maxNumCols, leqno = _ref.leqno;
            parser.gullet.beginGroup();
            if (!singleRow) {
              parser.gullet.macros.set("\\cr", "\\\\\\relax");
            }
            if (!arraystretch) {
              var stretch = parser.gullet.expandMacroAsText("\\arraystretch");
              if (stretch == null) {
                arraystretch = 1;
              } else {
                arraystretch = parseFloat(stretch);
                if (!arraystretch || arraystretch < 0) {
                  throw new src_ParseError("Invalid \\arraystretch: " + stretch);
                }
              }
            }
            parser.gullet.beginGroup();
            var row = [];
            var body = [row];
            var rowGaps = [];
            var hLinesBeforeRow = [];
            hLinesBeforeRow.push(getHLines(parser));
            while (true) {
              var cell = parser.parseExpression(false, singleRow ? "\\end" : "\\\\");
              parser.gullet.endGroup();
              parser.gullet.beginGroup();
              cell = {
                type: "ordgroup",
                mode: parser.mode,
                body: cell
              };
              if (style) {
                cell = {
                  type: "styling",
                  mode: parser.mode,
                  style,
                  body: [cell]
                };
              }
              row.push(cell);
              var next = parser.fetch().text;
              if (next === "&") {
                if (maxNumCols && row.length === maxNumCols) {
                  if (singleRow || colSeparationType) {
                    throw new src_ParseError("Too many tab characters: &", parser.nextToken);
                  } else {
                    parser.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
                  }
                }
                parser.consume();
              } else if (next === "\\end") {
                if (row.length === 1 && cell.type === "styling" && cell.body[0].body.length === 0 && (body.length > 1 || !emptySingleRow)) {
                  body.pop();
                }
                if (hLinesBeforeRow.length < body.length + 1) {
                  hLinesBeforeRow.push([]);
                }
                break;
              } else if (next === "\\\\") {
                parser.consume();
                var size = void 0;
                if (parser.gullet.future().text !== " ") {
                  size = parser.parseSizeGroup(true);
                }
                rowGaps.push(size ? size.value : null);
                hLinesBeforeRow.push(getHLines(parser));
                row = [];
                body.push(row);
              } else {
                throw new src_ParseError("Expected & or \\\\ or \\cr or \\end", parser.nextToken);
              }
            }
            parser.gullet.endGroup();
            parser.gullet.endGroup();
            return {
              type: "array",
              mode: parser.mode,
              addJot,
              arraystretch,
              body,
              cols,
              rowGaps,
              hskipBeforeAndAfter,
              hLinesBeforeRow,
              colSeparationType,
              addEqnNum,
              leqno
            };
          }
          function dCellStyle(envName) {
            if (envName.substr(0, 1) === "d") {
              return "display";
            } else {
              return "text";
            }
          }
          var array_htmlBuilder = function htmlBuilder2(group, options2) {
            var r3;
            var c3;
            var nr = group.body.length;
            var hLinesBeforeRow = group.hLinesBeforeRow;
            var nc = 0;
            var body = new Array(nr);
            var hlines = [];
            var ruleThickness = Math.max(options2.fontMetrics().arrayRuleWidth, options2.minRuleThickness);
            var pt = 1 / options2.fontMetrics().ptPerEm;
            var arraycolsep = 5 * pt;
            if (group.colSeparationType && group.colSeparationType === "small") {
              var localMultiplier = options2.havingStyle(src_Style.SCRIPT).sizeMultiplier;
              arraycolsep = 0.2778 * (localMultiplier / options2.sizeMultiplier);
            }
            var baselineskip = group.colSeparationType === "CD" ? calculateSize({
              number: 3,
              unit: "ex"
            }, options2) : 12 * pt;
            var jot = 3 * pt;
            var arrayskip = group.arraystretch * baselineskip;
            var arstrutHeight = 0.7 * arrayskip;
            var arstrutDepth = 0.3 * arrayskip;
            var totalHeight = 0;
            function setHLinePos(hlinesInGap) {
              for (var i3 = 0; i3 < hlinesInGap.length; ++i3) {
                if (i3 > 0) {
                  totalHeight += 0.25;
                }
                hlines.push({
                  pos: totalHeight,
                  isDashed: hlinesInGap[i3]
                });
              }
            }
            setHLinePos(hLinesBeforeRow[0]);
            for (r3 = 0; r3 < group.body.length; ++r3) {
              var inrow = group.body[r3];
              var height = arstrutHeight;
              var depth = arstrutDepth;
              if (nc < inrow.length) {
                nc = inrow.length;
              }
              var outrow = new Array(inrow.length);
              for (c3 = 0; c3 < inrow.length; ++c3) {
                var elt = buildGroup(inrow[c3], options2);
                if (depth < elt.depth) {
                  depth = elt.depth;
                }
                if (height < elt.height) {
                  height = elt.height;
                }
                outrow[c3] = elt;
              }
              var rowGap = group.rowGaps[r3];
              var gap = 0;
              if (rowGap) {
                gap = calculateSize(rowGap, options2);
                if (gap > 0) {
                  gap += arstrutDepth;
                  if (depth < gap) {
                    depth = gap;
                  }
                  gap = 0;
                }
              }
              if (group.addJot) {
                depth += jot;
              }
              outrow.height = height;
              outrow.depth = depth;
              totalHeight += height;
              outrow.pos = totalHeight;
              totalHeight += depth + gap;
              body[r3] = outrow;
              setHLinePos(hLinesBeforeRow[r3 + 1]);
            }
            var offset = totalHeight / 2 + options2.fontMetrics().axisHeight;
            var colDescriptions = group.cols || [];
            var cols = [];
            var colSep;
            var colDescrNum;
            var eqnNumSpans = [];
            if (group.addEqnNum) {
              for (r3 = 0; r3 < nr; ++r3) {
                var rw = body[r3];
                var shift = rw.pos - offset;
                var eqnTag = buildCommon.makeSpan(["eqn-num"], [], options2);
                eqnTag.depth = rw.depth;
                eqnTag.height = rw.height;
                eqnNumSpans.push({
                  type: "elem",
                  elem: eqnTag,
                  shift
                });
              }
            }
            for (c3 = 0, colDescrNum = 0; c3 < nc || colDescrNum < colDescriptions.length; ++c3, ++colDescrNum) {
              var colDescr = colDescriptions[colDescrNum] || {};
              var firstSeparator = true;
              while (colDescr.type === "separator") {
                if (!firstSeparator) {
                  colSep = buildCommon.makeSpan(["arraycolsep"], []);
                  colSep.style.width = makeEm(options2.fontMetrics().doubleRuleSep);
                  cols.push(colSep);
                }
                if (colDescr.separator === "|" || colDescr.separator === ":") {
                  var lineType = colDescr.separator === "|" ? "solid" : "dashed";
                  var separator = buildCommon.makeSpan(["vertical-separator"], [], options2);
                  separator.style.height = makeEm(totalHeight);
                  separator.style.borderRightWidth = makeEm(ruleThickness);
                  separator.style.borderRightStyle = lineType;
                  separator.style.margin = "0 " + makeEm(-ruleThickness / 2);
                  var _shift = totalHeight - offset;
                  if (_shift) {
                    separator.style.verticalAlign = makeEm(-_shift);
                  }
                  cols.push(separator);
                } else {
                  throw new src_ParseError("Invalid separator type: " + colDescr.separator);
                }
                colDescrNum++;
                colDescr = colDescriptions[colDescrNum] || {};
                firstSeparator = false;
              }
              if (c3 >= nc) {
                continue;
              }
              var sepwidth = void 0;
              if (c3 > 0 || group.hskipBeforeAndAfter) {
                sepwidth = utils.deflt(colDescr.pregap, arraycolsep);
                if (sepwidth !== 0) {
                  colSep = buildCommon.makeSpan(["arraycolsep"], []);
                  colSep.style.width = makeEm(sepwidth);
                  cols.push(colSep);
                }
              }
              var col = [];
              for (r3 = 0; r3 < nr; ++r3) {
                var row = body[r3];
                var elem = row[c3];
                if (!elem) {
                  continue;
                }
                var _shift2 = row.pos - offset;
                elem.depth = row.depth;
                elem.height = row.height;
                col.push({
                  type: "elem",
                  elem,
                  shift: _shift2
                });
              }
              col = buildCommon.makeVList({
                positionType: "individualShift",
                children: col
              }, options2);
              col = buildCommon.makeSpan(["col-align-" + (colDescr.align || "c")], [col]);
              cols.push(col);
              if (c3 < nc - 1 || group.hskipBeforeAndAfter) {
                sepwidth = utils.deflt(colDescr.postgap, arraycolsep);
                if (sepwidth !== 0) {
                  colSep = buildCommon.makeSpan(["arraycolsep"], []);
                  colSep.style.width = makeEm(sepwidth);
                  cols.push(colSep);
                }
              }
            }
            body = buildCommon.makeSpan(["mtable"], cols);
            if (hlines.length > 0) {
              var line = buildCommon.makeLineSpan("hline", options2, ruleThickness);
              var dashes = buildCommon.makeLineSpan("hdashline", options2, ruleThickness);
              var vListElems = [{
                type: "elem",
                elem: body,
                shift: 0
              }];
              while (hlines.length > 0) {
                var hline = hlines.pop();
                var lineShift = hline.pos - offset;
                if (hline.isDashed) {
                  vListElems.push({
                    type: "elem",
                    elem: dashes,
                    shift: lineShift
                  });
                } else {
                  vListElems.push({
                    type: "elem",
                    elem: line,
                    shift: lineShift
                  });
                }
              }
              body = buildCommon.makeVList({
                positionType: "individualShift",
                children: vListElems
              }, options2);
            }
            if (!group.addEqnNum) {
              return buildCommon.makeSpan(["mord"], [body], options2);
            } else {
              var eqnNumCol = buildCommon.makeVList({
                positionType: "individualShift",
                children: eqnNumSpans
              }, options2);
              eqnNumCol = buildCommon.makeSpan(["tag"], [eqnNumCol], options2);
              return buildCommon.makeFragment([body, eqnNumCol]);
            }
          };
          var alignMap = {
            c: "center ",
            l: "left ",
            r: "right "
          };
          var array_mathmlBuilder = function mathmlBuilder2(group, options2) {
            var tbl = [];
            var glue = new mathMLTree.MathNode("mtd", [], ["mtr-glue"]);
            var tag = new mathMLTree.MathNode("mtd", [], ["mml-eqn-num"]);
            for (var i3 = 0; i3 < group.body.length; i3++) {
              var rw = group.body[i3];
              var row = [];
              for (var j2 = 0; j2 < rw.length; j2++) {
                row.push(new mathMLTree.MathNode("mtd", [buildMathML_buildGroup(rw[j2], options2)]));
              }
              if (group.addEqnNum) {
                row.unshift(glue);
                row.push(glue);
                if (group.leqno) {
                  row.unshift(tag);
                } else {
                  row.push(tag);
                }
              }
              tbl.push(new mathMLTree.MathNode("mtr", row));
            }
            var table = new mathMLTree.MathNode("mtable", tbl);
            var gap = group.arraystretch === 0.5 ? 0.1 : 0.16 + group.arraystretch - 1 + (group.addJot ? 0.09 : 0);
            table.setAttribute("rowspacing", makeEm(gap));
            var menclose = "";
            var align = "";
            if (group.cols && group.cols.length > 0) {
              var cols = group.cols;
              var columnLines = "";
              var prevTypeWasAlign = false;
              var iStart = 0;
              var iEnd = cols.length;
              if (cols[0].type === "separator") {
                menclose += "top ";
                iStart = 1;
              }
              if (cols[cols.length - 1].type === "separator") {
                menclose += "bottom ";
                iEnd -= 1;
              }
              for (var _i6 = iStart; _i6 < iEnd; _i6++) {
                if (cols[_i6].type === "align") {
                  align += alignMap[cols[_i6].align];
                  if (prevTypeWasAlign) {
                    columnLines += "none ";
                  }
                  prevTypeWasAlign = true;
                } else if (cols[_i6].type === "separator") {
                  if (prevTypeWasAlign) {
                    columnLines += cols[_i6].separator === "|" ? "solid " : "dashed ";
                    prevTypeWasAlign = false;
                  }
                }
              }
              table.setAttribute("columnalign", align.trim());
              if (/[sd]/.test(columnLines)) {
                table.setAttribute("columnlines", columnLines.trim());
              }
            }
            if (group.colSeparationType === "align") {
              var _cols = group.cols || [];
              var spacing2 = "";
              for (var _i22 = 1; _i22 < _cols.length; _i22++) {
                spacing2 += _i22 % 2 ? "0em " : "1em ";
              }
              table.setAttribute("columnspacing", spacing2.trim());
            } else if (group.colSeparationType === "alignat" || group.colSeparationType === "gather") {
              table.setAttribute("columnspacing", "0em");
            } else if (group.colSeparationType === "small") {
              table.setAttribute("columnspacing", "0.2778em");
            } else if (group.colSeparationType === "CD") {
              table.setAttribute("columnspacing", "0.5em");
            } else {
              table.setAttribute("columnspacing", "1em");
            }
            var rowLines = "";
            var hlines = group.hLinesBeforeRow;
            menclose += hlines[0].length > 0 ? "left " : "";
            menclose += hlines[hlines.length - 1].length > 0 ? "right " : "";
            for (var _i32 = 1; _i32 < hlines.length - 1; _i32++) {
              rowLines += hlines[_i32].length === 0 ? "none " : hlines[_i32][0] ? "dashed " : "solid ";
            }
            if (/[sd]/.test(rowLines)) {
              table.setAttribute("rowlines", rowLines.trim());
            }
            if (menclose !== "") {
              table = new mathMLTree.MathNode("menclose", [table]);
              table.setAttribute("notation", menclose.trim());
            }
            if (group.arraystretch && group.arraystretch < 1) {
              table = new mathMLTree.MathNode("mstyle", [table]);
              table.setAttribute("scriptlevel", "1");
            }
            return table;
          };
          var alignedHandler = function alignedHandler2(context2, args) {
            if (context2.envName.indexOf("ed") === -1) {
              validateAmsEnvironmentContext(context2);
            }
            var cols = [];
            var separationType = context2.envName.indexOf("at") > -1 ? "alignat" : "align";
            var res = parseArray(context2.parser, {
              cols,
              addJot: true,
              addEqnNum: context2.envName === "align" || context2.envName === "alignat",
              emptySingleRow: true,
              colSeparationType: separationType,
              maxNumCols: context2.envName === "split" ? 2 : void 0,
              leqno: context2.parser.settings.leqno
            }, "display");
            var numMaths;
            var numCols = 0;
            var emptyGroup = {
              type: "ordgroup",
              mode: context2.mode,
              body: []
            };
            if (args[0] && args[0].type === "ordgroup") {
              var arg0 = "";
              for (var i3 = 0; i3 < args[0].body.length; i3++) {
                var textord2 = assertNodeType(args[0].body[i3], "textord");
                arg0 += textord2.text;
              }
              numMaths = Number(arg0);
              numCols = numMaths * 2;
            }
            var isAligned = !numCols;
            res.body.forEach(function(row) {
              for (var _i42 = 1; _i42 < row.length; _i42 += 2) {
                var styling = assertNodeType(row[_i42], "styling");
                var ordgroup = assertNodeType(styling.body[0], "ordgroup");
                ordgroup.body.unshift(emptyGroup);
              }
              if (!isAligned) {
                var curMaths = row.length / 2;
                if (numMaths < curMaths) {
                  throw new src_ParseError("Too many math in a row: " + ("expected " + numMaths + ", but got " + curMaths), row[0]);
                }
              } else if (numCols < row.length) {
                numCols = row.length;
              }
            });
            for (var _i52 = 0; _i52 < numCols; ++_i52) {
              var align = "r";
              var pregap = 0;
              if (_i52 % 2 === 1) {
                align = "l";
              } else if (_i52 > 0 && isAligned) {
                pregap = 1;
              }
              cols[_i52] = {
                type: "align",
                align,
                pregap,
                postgap: 0
              };
            }
            res.colSeparationType = isAligned ? "align" : "alignat";
            return res;
          };
          defineEnvironment({
            type: "array",
            names: ["array", "darray"],
            props: {
              numArgs: 1
            },
            handler: function handler(context2, args) {
              var symNode = checkSymbolNodeType(args[0]);
              var colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
              var cols = colalign.map(function(nde) {
                var node = assertSymbolNodeType(nde);
                var ca = node.text;
                if ("lcr".indexOf(ca) !== -1) {
                  return {
                    type: "align",
                    align: ca
                  };
                } else if (ca === "|") {
                  return {
                    type: "separator",
                    separator: "|"
                  };
                } else if (ca === ":") {
                  return {
                    type: "separator",
                    separator: ":"
                  };
                }
                throw new src_ParseError("Unknown column alignment: " + ca, nde);
              });
              var res = {
                cols,
                hskipBeforeAndAfter: true,
                maxNumCols: cols.length
              };
              return parseArray(context2.parser, res, dCellStyle(context2.envName));
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"],
            props: {
              numArgs: 0
            },
            handler: function handler(context2) {
              var delimiters2 = {
                "matrix": null,
                "pmatrix": ["(", ")"],
                "bmatrix": ["[", "]"],
                "Bmatrix": ["\\{", "\\}"],
                "vmatrix": ["|", "|"],
                "Vmatrix": ["\\Vert", "\\Vert"]
              }[context2.envName.replace("*", "")];
              var colAlign = "c";
              var payload = {
                hskipBeforeAndAfter: false,
                cols: [{
                  type: "align",
                  align: colAlign
                }]
              };
              if (context2.envName.charAt(context2.envName.length - 1) === "*") {
                var parser = context2.parser;
                parser.consumeSpaces();
                if (parser.fetch().text === "[") {
                  parser.consume();
                  parser.consumeSpaces();
                  colAlign = parser.fetch().text;
                  if ("lcr".indexOf(colAlign) === -1) {
                    throw new src_ParseError("Expected l or c or r", parser.nextToken);
                  }
                  parser.consume();
                  parser.consumeSpaces();
                  parser.expect("]");
                  parser.consume();
                  payload.cols = [{
                    type: "align",
                    align: colAlign
                  }];
                }
              }
              var res = parseArray(context2.parser, payload, dCellStyle(context2.envName));
              var numCols = Math.max.apply(Math, [0].concat(res.body.map(function(row) {
                return row.length;
              })));
              res.cols = new Array(numCols).fill({
                type: "align",
                align: colAlign
              });
              return delimiters2 ? {
                type: "leftright",
                mode: context2.mode,
                body: [res],
                left: delimiters2[0],
                right: delimiters2[1],
                rightColor: void 0
              } : res;
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["smallmatrix"],
            props: {
              numArgs: 0
            },
            handler: function handler(context2) {
              var payload = {
                arraystretch: 0.5
              };
              var res = parseArray(context2.parser, payload, "script");
              res.colSeparationType = "small";
              return res;
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["subarray"],
            props: {
              numArgs: 1
            },
            handler: function handler(context2, args) {
              var symNode = checkSymbolNodeType(args[0]);
              var colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
              var cols = colalign.map(function(nde) {
                var node = assertSymbolNodeType(nde);
                var ca = node.text;
                if ("lc".indexOf(ca) !== -1) {
                  return {
                    type: "align",
                    align: ca
                  };
                }
                throw new src_ParseError("Unknown column alignment: " + ca, nde);
              });
              if (cols.length > 1) {
                throw new src_ParseError("{subarray} can contain only one column");
              }
              var res = {
                cols,
                hskipBeforeAndAfter: false,
                arraystretch: 0.5
              };
              res = parseArray(context2.parser, res, "script");
              if (res.body.length > 0 && res.body[0].length > 1) {
                throw new src_ParseError("{subarray} can contain only one column");
              }
              return res;
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["cases", "dcases", "rcases", "drcases"],
            props: {
              numArgs: 0
            },
            handler: function handler(context2) {
              var payload = {
                arraystretch: 1.2,
                cols: [{
                  type: "align",
                  align: "l",
                  pregap: 0,
                  postgap: 1
                }, {
                  type: "align",
                  align: "l",
                  pregap: 0,
                  postgap: 0
                }]
              };
              var res = parseArray(context2.parser, payload, dCellStyle(context2.envName));
              return {
                type: "leftright",
                mode: context2.mode,
                body: [res],
                left: context2.envName.indexOf("r") > -1 ? "." : "\\{",
                right: context2.envName.indexOf("r") > -1 ? "\\}" : ".",
                rightColor: void 0
              };
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["align", "align*", "aligned", "split"],
            props: {
              numArgs: 0
            },
            handler: alignedHandler,
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["gathered", "gather", "gather*"],
            props: {
              numArgs: 0
            },
            handler: function handler(context2) {
              if (utils.contains(["gather", "gather*"], context2.envName)) {
                validateAmsEnvironmentContext(context2);
              }
              var res = {
                cols: [{
                  type: "align",
                  align: "c"
                }],
                addJot: true,
                colSeparationType: "gather",
                addEqnNum: context2.envName === "gather",
                emptySingleRow: true,
                leqno: context2.parser.settings.leqno
              };
              return parseArray(context2.parser, res, "display");
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["alignat", "alignat*", "alignedat"],
            props: {
              numArgs: 1
            },
            handler: alignedHandler,
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["equation", "equation*"],
            props: {
              numArgs: 0
            },
            handler: function handler(context2) {
              validateAmsEnvironmentContext(context2);
              var res = {
                addEqnNum: context2.envName === "equation",
                emptySingleRow: true,
                singleRow: true,
                maxNumCols: 1,
                leqno: context2.parser.settings.leqno
              };
              return parseArray(context2.parser, res, "display");
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["CD"],
            props: {
              numArgs: 0
            },
            handler: function handler(context2) {
              validateAmsEnvironmentContext(context2);
              return parseCD(context2.parser);
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineFunction({
            type: "text",
            names: ["\\hline", "\\hdashline"],
            props: {
              numArgs: 0,
              allowedInText: true,
              allowedInMath: true
            },
            handler: function handler(context2, args) {
              throw new src_ParseError(context2.funcName + " valid only within array environment");
            }
          });
          ;
          var environments = _environments;
          var src_environments = environments;
          ;
          defineFunction({
            type: "environment",
            names: ["\\begin", "\\end"],
            props: {
              numArgs: 1,
              argTypes: ["text"]
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var nameGroup = args[0];
              if (nameGroup.type !== "ordgroup") {
                throw new src_ParseError("Invalid environment name", nameGroup);
              }
              var envName = "";
              for (var i3 = 0; i3 < nameGroup.body.length; ++i3) {
                envName += assertNodeType(nameGroup.body[i3], "textord").text;
              }
              if (funcName === "\\begin") {
                if (!src_environments.hasOwnProperty(envName)) {
                  throw new src_ParseError("No such environment: " + envName, nameGroup);
                }
                var env = src_environments[envName];
                var _parser$parseArgument = parser.parseArguments("\\begin{" + envName + "}", env), _args = _parser$parseArgument.args, optArgs = _parser$parseArgument.optArgs;
                var context2 = {
                  mode: parser.mode,
                  envName,
                  parser
                };
                var result2 = env.handler(context2, _args, optArgs);
                parser.expect("\\end", false);
                var endNameToken = parser.nextToken;
                var end = assertNodeType(parser.parseFunction(), "environment");
                if (end.name !== envName) {
                  throw new src_ParseError("Mismatch: \\begin{" + envName + "} matched by \\end{" + end.name + "}", endNameToken);
                }
                return result2;
              }
              return {
                type: "environment",
                mode: parser.mode,
                name: envName,
                nameGroup
              };
            }
          });
          ;
          var mclass_makeSpan = buildCommon.makeSpan;
          function mclass_htmlBuilder(group, options2) {
            var elements = buildExpression(group.body, options2, true);
            return mclass_makeSpan([group.mclass], elements, options2);
          }
          function mclass_mathmlBuilder(group, options2) {
            var node;
            var inner2 = buildMathML_buildExpression(group.body, options2);
            if (group.mclass === "minner") {
              return mathMLTree.newDocumentFragment(inner2);
            } else if (group.mclass === "mord") {
              if (group.isCharacterBox) {
                node = inner2[0];
                node.type = "mi";
              } else {
                node = new mathMLTree.MathNode("mi", inner2);
              }
            } else {
              if (group.isCharacterBox) {
                node = inner2[0];
                node.type = "mo";
              } else {
                node = new mathMLTree.MathNode("mo", inner2);
              }
              if (group.mclass === "mbin") {
                node.attributes.lspace = "0.22em";
                node.attributes.rspace = "0.22em";
              } else if (group.mclass === "mpunct") {
                node.attributes.lspace = "0em";
                node.attributes.rspace = "0.17em";
              } else if (group.mclass === "mopen" || group.mclass === "mclose") {
                node.attributes.lspace = "0em";
                node.attributes.rspace = "0em";
              }
            }
            return node;
          }
          defineFunction({
            type: "mclass",
            names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
            props: {
              numArgs: 1,
              primitive: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var body = args[0];
              return {
                type: "mclass",
                mode: parser.mode,
                mclass: "m" + funcName.substr(5),
                body: ordargument(body),
                isCharacterBox: utils.isCharacterBox(body)
              };
            },
            htmlBuilder: mclass_htmlBuilder,
            mathmlBuilder: mclass_mathmlBuilder
          });
          var binrelClass = function binrelClass2(arg) {
            var atom = arg.type === "ordgroup" && arg.body.length ? arg.body[0] : arg;
            if (atom.type === "atom" && (atom.family === "bin" || atom.family === "rel")) {
              return "m" + atom.family;
            } else {
              return "mord";
            }
          };
          defineFunction({
            type: "mclass",
            names: ["\\@binrel"],
            props: {
              numArgs: 2
            },
            handler: function handler(_ref2, args) {
              var parser = _ref2.parser;
              return {
                type: "mclass",
                mode: parser.mode,
                mclass: binrelClass(args[0]),
                body: ordargument(args[1]),
                isCharacterBox: utils.isCharacterBox(args[1])
              };
            }
          });
          defineFunction({
            type: "mclass",
            names: ["\\stackrel", "\\overset", "\\underset"],
            props: {
              numArgs: 2
            },
            handler: function handler(_ref3, args) {
              var parser = _ref3.parser, funcName = _ref3.funcName;
              var baseArg = args[1];
              var shiftedArg = args[0];
              var mclass;
              if (funcName !== "\\stackrel") {
                mclass = binrelClass(baseArg);
              } else {
                mclass = "mrel";
              }
              var baseOp = {
                type: "op",
                mode: baseArg.mode,
                limits: true,
                alwaysHandleSupSub: true,
                parentIsSupSub: false,
                symbol: false,
                suppressBaseShift: funcName !== "\\stackrel",
                body: ordargument(baseArg)
              };
              var supsub = {
                type: "supsub",
                mode: shiftedArg.mode,
                base: baseOp,
                sup: funcName === "\\underset" ? null : shiftedArg,
                sub: funcName === "\\underset" ? shiftedArg : null
              };
              return {
                type: "mclass",
                mode: parser.mode,
                mclass,
                body: [supsub],
                isCharacterBox: utils.isCharacterBox(supsub)
              };
            },
            htmlBuilder: mclass_htmlBuilder,
            mathmlBuilder: mclass_mathmlBuilder
          });
          ;
          var font_htmlBuilder = function htmlBuilder2(group, options2) {
            var font = group.font;
            var newOptions = options2.withFont(font);
            return buildGroup(group.body, newOptions);
          };
          var font_mathmlBuilder = function mathmlBuilder2(group, options2) {
            var font = group.font;
            var newOptions = options2.withFont(font);
            return buildMathML_buildGroup(group.body, newOptions);
          };
          var fontAliases = {
            "\\Bbb": "\\mathbb",
            "\\bold": "\\mathbf",
            "\\frak": "\\mathfrak",
            "\\bm": "\\boldsymbol"
          };
          defineFunction({
            type: "font",
            names: [
              "\\mathrm",
              "\\mathit",
              "\\mathbf",
              "\\mathnormal",
              "\\mathbb",
              "\\mathcal",
              "\\mathfrak",
              "\\mathscr",
              "\\mathsf",
              "\\mathtt",
              "\\Bbb",
              "\\bold",
              "\\frak"
            ],
            props: {
              numArgs: 1,
              allowedInArgument: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var body = normalizeArgument(args[0]);
              var func = funcName;
              if (func in fontAliases) {
                func = fontAliases[func];
              }
              return {
                type: "font",
                mode: parser.mode,
                font: func.slice(1),
                body
              };
            },
            htmlBuilder: font_htmlBuilder,
            mathmlBuilder: font_mathmlBuilder
          });
          defineFunction({
            type: "mclass",
            names: ["\\boldsymbol", "\\bm"],
            props: {
              numArgs: 1
            },
            handler: function handler(_ref2, args) {
              var parser = _ref2.parser;
              var body = args[0];
              var isCharacterBox2 = utils.isCharacterBox(body);
              return {
                type: "mclass",
                mode: parser.mode,
                mclass: binrelClass(body),
                body: [{
                  type: "font",
                  mode: parser.mode,
                  font: "boldsymbol",
                  body
                }],
                isCharacterBox: isCharacterBox2
              };
            }
          });
          defineFunction({
            type: "font",
            names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
            props: {
              numArgs: 0,
              allowedInText: true
            },
            handler: function handler(_ref3, args) {
              var parser = _ref3.parser, funcName = _ref3.funcName, breakOnTokenText = _ref3.breakOnTokenText;
              var mode = parser.mode;
              var body = parser.parseExpression(true, breakOnTokenText);
              var style = "math" + funcName.slice(1);
              return {
                type: "font",
                mode,
                font: style,
                body: {
                  type: "ordgroup",
                  mode: parser.mode,
                  body
                }
              };
            },
            htmlBuilder: font_htmlBuilder,
            mathmlBuilder: font_mathmlBuilder
          });
          ;
          var adjustStyle = function adjustStyle2(size, originalStyle) {
            var style = originalStyle;
            if (size === "display") {
              style = style.id >= src_Style.SCRIPT.id ? style.text() : src_Style.DISPLAY;
            } else if (size === "text" && style.size === src_Style.DISPLAY.size) {
              style = src_Style.TEXT;
            } else if (size === "script") {
              style = src_Style.SCRIPT;
            } else if (size === "scriptscript") {
              style = src_Style.SCRIPTSCRIPT;
            }
            return style;
          };
          var genfrac_htmlBuilder = function htmlBuilder2(group, options2) {
            var style = adjustStyle(group.size, options2.style);
            var nstyle = style.fracNum();
            var dstyle = style.fracDen();
            var newOptions;
            newOptions = options2.havingStyle(nstyle);
            var numerm = buildGroup(group.numer, newOptions, options2);
            if (group.continued) {
              var hStrut = 8.5 / options2.fontMetrics().ptPerEm;
              var dStrut = 3.5 / options2.fontMetrics().ptPerEm;
              numerm.height = numerm.height < hStrut ? hStrut : numerm.height;
              numerm.depth = numerm.depth < dStrut ? dStrut : numerm.depth;
            }
            newOptions = options2.havingStyle(dstyle);
            var denomm = buildGroup(group.denom, newOptions, options2);
            var rule;
            var ruleWidth;
            var ruleSpacing;
            if (group.hasBarLine) {
              if (group.barSize) {
                ruleWidth = calculateSize(group.barSize, options2);
                rule = buildCommon.makeLineSpan("frac-line", options2, ruleWidth);
              } else {
                rule = buildCommon.makeLineSpan("frac-line", options2);
              }
              ruleWidth = rule.height;
              ruleSpacing = rule.height;
            } else {
              rule = null;
              ruleWidth = 0;
              ruleSpacing = options2.fontMetrics().defaultRuleThickness;
            }
            var numShift;
            var clearance;
            var denomShift;
            if (style.size === src_Style.DISPLAY.size || group.size === "display") {
              numShift = options2.fontMetrics().num1;
              if (ruleWidth > 0) {
                clearance = 3 * ruleSpacing;
              } else {
                clearance = 7 * ruleSpacing;
              }
              denomShift = options2.fontMetrics().denom1;
            } else {
              if (ruleWidth > 0) {
                numShift = options2.fontMetrics().num2;
                clearance = ruleSpacing;
              } else {
                numShift = options2.fontMetrics().num3;
                clearance = 3 * ruleSpacing;
              }
              denomShift = options2.fontMetrics().denom2;
            }
            var frac;
            if (!rule) {
              var candidateClearance = numShift - numerm.depth - (denomm.height - denomShift);
              if (candidateClearance < clearance) {
                numShift += 0.5 * (clearance - candidateClearance);
                denomShift += 0.5 * (clearance - candidateClearance);
              }
              frac = buildCommon.makeVList({
                positionType: "individualShift",
                children: [{
                  type: "elem",
                  elem: denomm,
                  shift: denomShift
                }, {
                  type: "elem",
                  elem: numerm,
                  shift: -numShift
                }]
              }, options2);
            } else {
              var axisHeight = options2.fontMetrics().axisHeight;
              if (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth) < clearance) {
                numShift += clearance - (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth));
              }
              if (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift) < clearance) {
                denomShift += clearance - (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift));
              }
              var midShift = -(axisHeight - 0.5 * ruleWidth);
              frac = buildCommon.makeVList({
                positionType: "individualShift",
                children: [{
                  type: "elem",
                  elem: denomm,
                  shift: denomShift
                }, {
                  type: "elem",
                  elem: rule,
                  shift: midShift
                }, {
                  type: "elem",
                  elem: numerm,
                  shift: -numShift
                }]
              }, options2);
            }
            newOptions = options2.havingStyle(style);
            frac.height *= newOptions.sizeMultiplier / options2.sizeMultiplier;
            frac.depth *= newOptions.sizeMultiplier / options2.sizeMultiplier;
            var delimSize;
            if (style.size === src_Style.DISPLAY.size) {
              delimSize = options2.fontMetrics().delim1;
            } else if (style.size === src_Style.SCRIPTSCRIPT.size) {
              delimSize = options2.havingStyle(src_Style.SCRIPT).fontMetrics().delim2;
            } else {
              delimSize = options2.fontMetrics().delim2;
            }
            var leftDelim;
            var rightDelim;
            if (group.leftDelim == null) {
              leftDelim = makeNullDelimiter(options2, ["mopen"]);
            } else {
              leftDelim = delimiter.customSizedDelim(group.leftDelim, delimSize, true, options2.havingStyle(style), group.mode, ["mopen"]);
            }
            if (group.continued) {
              rightDelim = buildCommon.makeSpan([]);
            } else if (group.rightDelim == null) {
              rightDelim = makeNullDelimiter(options2, ["mclose"]);
            } else {
              rightDelim = delimiter.customSizedDelim(group.rightDelim, delimSize, true, options2.havingStyle(style), group.mode, ["mclose"]);
            }
            return buildCommon.makeSpan(["mord"].concat(newOptions.sizingClasses(options2)), [leftDelim, buildCommon.makeSpan(["mfrac"], [frac]), rightDelim], options2);
          };
          var genfrac_mathmlBuilder = function mathmlBuilder2(group, options2) {
            var node = new mathMLTree.MathNode("mfrac", [buildMathML_buildGroup(group.numer, options2), buildMathML_buildGroup(group.denom, options2)]);
            if (!group.hasBarLine) {
              node.setAttribute("linethickness", "0px");
            } else if (group.barSize) {
              var ruleWidth = calculateSize(group.barSize, options2);
              node.setAttribute("linethickness", makeEm(ruleWidth));
            }
            var style = adjustStyle(group.size, options2.style);
            if (style.size !== options2.style.size) {
              node = new mathMLTree.MathNode("mstyle", [node]);
              var isDisplay = style.size === src_Style.DISPLAY.size ? "true" : "false";
              node.setAttribute("displaystyle", isDisplay);
              node.setAttribute("scriptlevel", "0");
            }
            if (group.leftDelim != null || group.rightDelim != null) {
              var withDelims = [];
              if (group.leftDelim != null) {
                var leftOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.leftDelim.replace("\\", ""))]);
                leftOp.setAttribute("fence", "true");
                withDelims.push(leftOp);
              }
              withDelims.push(node);
              if (group.rightDelim != null) {
                var rightOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.rightDelim.replace("\\", ""))]);
                rightOp.setAttribute("fence", "true");
                withDelims.push(rightOp);
              }
              return makeRow(withDelims);
            }
            return node;
          };
          defineFunction({
            type: "genfrac",
            names: [
              "\\dfrac",
              "\\frac",
              "\\tfrac",
              "\\dbinom",
              "\\binom",
              "\\tbinom",
              "\\\\atopfrac",
              "\\\\bracefrac",
              "\\\\brackfrac"
            ],
            props: {
              numArgs: 2,
              allowedInArgument: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var numer = args[0];
              var denom = args[1];
              var hasBarLine;
              var leftDelim = null;
              var rightDelim = null;
              var size = "auto";
              switch (funcName) {
                case "\\dfrac":
                case "\\frac":
                case "\\tfrac":
                  hasBarLine = true;
                  break;
                case "\\\\atopfrac":
                  hasBarLine = false;
                  break;
                case "\\dbinom":
                case "\\binom":
                case "\\tbinom":
                  hasBarLine = false;
                  leftDelim = "(";
                  rightDelim = ")";
                  break;
                case "\\\\bracefrac":
                  hasBarLine = false;
                  leftDelim = "\\{";
                  rightDelim = "\\}";
                  break;
                case "\\\\brackfrac":
                  hasBarLine = false;
                  leftDelim = "[";
                  rightDelim = "]";
                  break;
                default:
                  throw new Error("Unrecognized genfrac command");
              }
              switch (funcName) {
                case "\\dfrac":
                case "\\dbinom":
                  size = "display";
                  break;
                case "\\tfrac":
                case "\\tbinom":
                  size = "text";
                  break;
              }
              return {
                type: "genfrac",
                mode: parser.mode,
                continued: false,
                numer,
                denom,
                hasBarLine,
                leftDelim,
                rightDelim,
                size,
                barSize: null
              };
            },
            htmlBuilder: genfrac_htmlBuilder,
            mathmlBuilder: genfrac_mathmlBuilder
          });
          defineFunction({
            type: "genfrac",
            names: ["\\cfrac"],
            props: {
              numArgs: 2
            },
            handler: function handler(_ref2, args) {
              var parser = _ref2.parser, funcName = _ref2.funcName;
              var numer = args[0];
              var denom = args[1];
              return {
                type: "genfrac",
                mode: parser.mode,
                continued: true,
                numer,
                denom,
                hasBarLine: true,
                leftDelim: null,
                rightDelim: null,
                size: "display",
                barSize: null
              };
            }
          });
          defineFunction({
            type: "infix",
            names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
            props: {
              numArgs: 0,
              infix: true
            },
            handler: function handler(_ref3) {
              var parser = _ref3.parser, funcName = _ref3.funcName, token = _ref3.token;
              var replaceWith;
              switch (funcName) {
                case "\\over":
                  replaceWith = "\\frac";
                  break;
                case "\\choose":
                  replaceWith = "\\binom";
                  break;
                case "\\atop":
                  replaceWith = "\\\\atopfrac";
                  break;
                case "\\brace":
                  replaceWith = "\\\\bracefrac";
                  break;
                case "\\brack":
                  replaceWith = "\\\\brackfrac";
                  break;
                default:
                  throw new Error("Unrecognized infix genfrac command");
              }
              return {
                type: "infix",
                mode: parser.mode,
                replaceWith,
                token
              };
            }
          });
          var stylArray = ["display", "text", "script", "scriptscript"];
          var delimFromValue = function delimFromValue2(delimString) {
            var delim = null;
            if (delimString.length > 0) {
              delim = delimString;
              delim = delim === "." ? null : delim;
            }
            return delim;
          };
          defineFunction({
            type: "genfrac",
            names: ["\\genfrac"],
            props: {
              numArgs: 6,
              allowedInArgument: true,
              argTypes: ["math", "math", "size", "text", "math", "math"]
            },
            handler: function handler(_ref4, args) {
              var parser = _ref4.parser;
              var numer = args[4];
              var denom = args[5];
              var leftNode = normalizeArgument(args[0]);
              var leftDelim = leftNode.type === "atom" && leftNode.family === "open" ? delimFromValue(leftNode.text) : null;
              var rightNode = normalizeArgument(args[1]);
              var rightDelim = rightNode.type === "atom" && rightNode.family === "close" ? delimFromValue(rightNode.text) : null;
              var barNode = assertNodeType(args[2], "size");
              var hasBarLine;
              var barSize = null;
              if (barNode.isBlank) {
                hasBarLine = true;
              } else {
                barSize = barNode.value;
                hasBarLine = barSize.number > 0;
              }
              var size = "auto";
              var styl = args[3];
              if (styl.type === "ordgroup") {
                if (styl.body.length > 0) {
                  var textOrd = assertNodeType(styl.body[0], "textord");
                  size = stylArray[Number(textOrd.text)];
                }
              } else {
                styl = assertNodeType(styl, "textord");
                size = stylArray[Number(styl.text)];
              }
              return {
                type: "genfrac",
                mode: parser.mode,
                numer,
                denom,
                continued: false,
                hasBarLine,
                barSize,
                leftDelim,
                rightDelim,
                size
              };
            },
            htmlBuilder: genfrac_htmlBuilder,
            mathmlBuilder: genfrac_mathmlBuilder
          });
          defineFunction({
            type: "infix",
            names: ["\\above"],
            props: {
              numArgs: 1,
              argTypes: ["size"],
              infix: true
            },
            handler: function handler(_ref5, args) {
              var parser = _ref5.parser, funcName = _ref5.funcName, token = _ref5.token;
              return {
                type: "infix",
                mode: parser.mode,
                replaceWith: "\\\\abovefrac",
                size: assertNodeType(args[0], "size").value,
                token
              };
            }
          });
          defineFunction({
            type: "genfrac",
            names: ["\\\\abovefrac"],
            props: {
              numArgs: 3,
              argTypes: ["math", "size", "math"]
            },
            handler: function handler(_ref6, args) {
              var parser = _ref6.parser, funcName = _ref6.funcName;
              var numer = args[0];
              var barSize = assert(assertNodeType(args[1], "infix").size);
              var denom = args[2];
              var hasBarLine = barSize.number > 0;
              return {
                type: "genfrac",
                mode: parser.mode,
                numer,
                denom,
                continued: false,
                hasBarLine,
                barSize,
                leftDelim: null,
                rightDelim: null,
                size: "auto"
              };
            },
            htmlBuilder: genfrac_htmlBuilder,
            mathmlBuilder: genfrac_mathmlBuilder
          });
          ;
          var horizBrace_htmlBuilder = function htmlBuilder2(grp, options2) {
            var style = options2.style;
            var supSubGroup;
            var group;
            if (grp.type === "supsub") {
              supSubGroup = grp.sup ? buildGroup(grp.sup, options2.havingStyle(style.sup()), options2) : buildGroup(grp.sub, options2.havingStyle(style.sub()), options2);
              group = assertNodeType(grp.base, "horizBrace");
            } else {
              group = assertNodeType(grp, "horizBrace");
            }
            var body = buildGroup(group.base, options2.havingBaseStyle(src_Style.DISPLAY));
            var braceBody = stretchy.svgSpan(group, options2);
            var vlist;
            if (group.isOver) {
              vlist = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: body
                }, {
                  type: "kern",
                  size: 0.1
                }, {
                  type: "elem",
                  elem: braceBody
                }]
              }, options2);
              vlist.children[0].children[0].children[1].classes.push("svg-align");
            } else {
              vlist = buildCommon.makeVList({
                positionType: "bottom",
                positionData: body.depth + 0.1 + braceBody.height,
                children: [{
                  type: "elem",
                  elem: braceBody
                }, {
                  type: "kern",
                  size: 0.1
                }, {
                  type: "elem",
                  elem: body
                }]
              }, options2);
              vlist.children[0].children[0].children[0].classes.push("svg-align");
            }
            if (supSubGroup) {
              var vSpan = buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options2);
              if (group.isOver) {
                vlist = buildCommon.makeVList({
                  positionType: "firstBaseline",
                  children: [{
                    type: "elem",
                    elem: vSpan
                  }, {
                    type: "kern",
                    size: 0.2
                  }, {
                    type: "elem",
                    elem: supSubGroup
                  }]
                }, options2);
              } else {
                vlist = buildCommon.makeVList({
                  positionType: "bottom",
                  positionData: vSpan.depth + 0.2 + supSubGroup.height + supSubGroup.depth,
                  children: [{
                    type: "elem",
                    elem: supSubGroup
                  }, {
                    type: "kern",
                    size: 0.2
                  }, {
                    type: "elem",
                    elem: vSpan
                  }]
                }, options2);
              }
            }
            return buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options2);
          };
          var horizBrace_mathmlBuilder = function mathmlBuilder2(group, options2) {
            var accentNode = stretchy.mathMLnode(group.label);
            return new mathMLTree.MathNode(group.isOver ? "mover" : "munder", [buildMathML_buildGroup(group.base, options2), accentNode]);
          };
          defineFunction({
            type: "horizBrace",
            names: ["\\overbrace", "\\underbrace"],
            props: {
              numArgs: 1
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              return {
                type: "horizBrace",
                mode: parser.mode,
                label: funcName,
                isOver: /^\\over/.test(funcName),
                base: args[0]
              };
            },
            htmlBuilder: horizBrace_htmlBuilder,
            mathmlBuilder: horizBrace_mathmlBuilder
          });
          ;
          defineFunction({
            type: "href",
            names: ["\\href"],
            props: {
              numArgs: 2,
              argTypes: ["url", "original"],
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              var body = args[1];
              var href = assertNodeType(args[0], "url").url;
              if (!parser.settings.isTrusted({
                command: "\\href",
                url: href
              })) {
                return parser.formatUnsupportedCmd("\\href");
              }
              return {
                type: "href",
                mode: parser.mode,
                href,
                body: ordargument(body)
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var elements = buildExpression(group.body, options2, false);
              return buildCommon.makeAnchor(group.href, [], elements, options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var math2 = buildExpressionRow(group.body, options2);
              if (!(math2 instanceof MathNode)) {
                math2 = new MathNode("mrow", [math2]);
              }
              math2.setAttribute("href", group.href);
              return math2;
            }
          });
          defineFunction({
            type: "href",
            names: ["\\url"],
            props: {
              numArgs: 1,
              argTypes: ["url"],
              allowedInText: true
            },
            handler: function handler(_ref2, args) {
              var parser = _ref2.parser;
              var href = assertNodeType(args[0], "url").url;
              if (!parser.settings.isTrusted({
                command: "\\url",
                url: href
              })) {
                return parser.formatUnsupportedCmd("\\url");
              }
              var chars = [];
              for (var i3 = 0; i3 < href.length; i3++) {
                var c3 = href[i3];
                if (c3 === "~") {
                  c3 = "\\textasciitilde";
                }
                chars.push({
                  type: "textord",
                  mode: "text",
                  text: c3
                });
              }
              var body = {
                type: "text",
                mode: parser.mode,
                font: "\\texttt",
                body: chars
              };
              return {
                type: "href",
                mode: parser.mode,
                href,
                body: ordargument(body)
              };
            }
          });
          ;
          defineFunction({
            type: "hbox",
            names: ["\\hbox"],
            props: {
              numArgs: 1,
              argTypes: ["text"],
              allowedInText: true,
              primitive: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              return {
                type: "hbox",
                mode: parser.mode,
                body: ordargument(args[0])
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var elements = buildExpression(group.body, options2, false);
              return buildCommon.makeFragment(elements);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              return new mathMLTree.MathNode("mrow", buildMathML_buildExpression(group.body, options2));
            }
          });
          ;
          defineFunction({
            type: "html",
            names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
            props: {
              numArgs: 2,
              argTypes: ["raw", "original"],
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName, token = _ref.token;
              var value = assertNodeType(args[0], "raw").string;
              var body = args[1];
              if (parser.settings.strict) {
                parser.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
              }
              var trustContext;
              var attributes = {};
              switch (funcName) {
                case "\\htmlClass":
                  attributes.class = value;
                  trustContext = {
                    command: "\\htmlClass",
                    class: value
                  };
                  break;
                case "\\htmlId":
                  attributes.id = value;
                  trustContext = {
                    command: "\\htmlId",
                    id: value
                  };
                  break;
                case "\\htmlStyle":
                  attributes.style = value;
                  trustContext = {
                    command: "\\htmlStyle",
                    style: value
                  };
                  break;
                case "\\htmlData": {
                  var data2 = value.split(",");
                  for (var i3 = 0; i3 < data2.length; i3++) {
                    var keyVal = data2[i3].split("=");
                    if (keyVal.length !== 2) {
                      throw new src_ParseError("Error parsing key-value for \\htmlData");
                    }
                    attributes["data-" + keyVal[0].trim()] = keyVal[1].trim();
                  }
                  trustContext = {
                    command: "\\htmlData",
                    attributes
                  };
                  break;
                }
                default:
                  throw new Error("Unrecognized html command");
              }
              if (!parser.settings.isTrusted(trustContext)) {
                return parser.formatUnsupportedCmd(funcName);
              }
              return {
                type: "html",
                mode: parser.mode,
                attributes,
                body: ordargument(body)
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var elements = buildExpression(group.body, options2, false);
              var classes = ["enclosing"];
              if (group.attributes.class) {
                classes.push.apply(classes, group.attributes.class.trim().split(/\s+/));
              }
              var span = buildCommon.makeSpan(classes, elements, options2);
              for (var attr in group.attributes) {
                if (attr !== "class" && group.attributes.hasOwnProperty(attr)) {
                  span.setAttribute(attr, group.attributes[attr]);
                }
              }
              return span;
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              return buildExpressionRow(group.body, options2);
            }
          });
          ;
          defineFunction({
            type: "htmlmathml",
            names: ["\\html@mathml"],
            props: {
              numArgs: 2,
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              return {
                type: "htmlmathml",
                mode: parser.mode,
                html: ordargument(args[0]),
                mathml: ordargument(args[1])
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var elements = buildExpression(group.html, options2, false);
              return buildCommon.makeFragment(elements);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              return buildExpressionRow(group.mathml, options2);
            }
          });
          ;
          var sizeData = function sizeData2(str3) {
            if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(str3)) {
              return {
                number: +str3,
                unit: "bp"
              };
            } else {
              var match3 = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(str3);
              if (!match3) {
                throw new src_ParseError("Invalid size: '" + str3 + "' in \\includegraphics");
              }
              var data2 = {
                number: +(match3[1] + match3[2]),
                unit: match3[3]
              };
              if (!validUnit(data2)) {
                throw new src_ParseError("Invalid unit: '" + data2.unit + "' in \\includegraphics.");
              }
              return data2;
            }
          };
          defineFunction({
            type: "includegraphics",
            names: ["\\includegraphics"],
            props: {
              numArgs: 1,
              numOptionalArgs: 1,
              argTypes: ["raw", "url"],
              allowedInText: false
            },
            handler: function handler(_ref, args, optArgs) {
              var parser = _ref.parser;
              var width = {
                number: 0,
                unit: "em"
              };
              var height = {
                number: 0.9,
                unit: "em"
              };
              var totalheight = {
                number: 0,
                unit: "em"
              };
              var alt = "";
              if (optArgs[0]) {
                var attributeStr = assertNodeType(optArgs[0], "raw").string;
                var attributes = attributeStr.split(",");
                for (var i3 = 0; i3 < attributes.length; i3++) {
                  var keyVal = attributes[i3].split("=");
                  if (keyVal.length === 2) {
                    var str3 = keyVal[1].trim();
                    switch (keyVal[0].trim()) {
                      case "alt":
                        alt = str3;
                        break;
                      case "width":
                        width = sizeData(str3);
                        break;
                      case "height":
                        height = sizeData(str3);
                        break;
                      case "totalheight":
                        totalheight = sizeData(str3);
                        break;
                      default:
                        throw new src_ParseError("Invalid key: '" + keyVal[0] + "' in \\includegraphics.");
                    }
                  }
                }
              }
              var src = assertNodeType(args[0], "url").url;
              if (alt === "") {
                alt = src;
                alt = alt.replace(/^.*[\\/]/, "");
                alt = alt.substring(0, alt.lastIndexOf("."));
              }
              if (!parser.settings.isTrusted({
                command: "\\includegraphics",
                url: src
              })) {
                return parser.formatUnsupportedCmd("\\includegraphics");
              }
              return {
                type: "includegraphics",
                mode: parser.mode,
                alt,
                width,
                height,
                totalheight,
                src
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var height = calculateSize(group.height, options2);
              var depth = 0;
              if (group.totalheight.number > 0) {
                depth = calculateSize(group.totalheight, options2) - height;
              }
              var width = 0;
              if (group.width.number > 0) {
                width = calculateSize(group.width, options2);
              }
              var style = {
                height: makeEm(height + depth)
              };
              if (width > 0) {
                style.width = makeEm(width);
              }
              if (depth > 0) {
                style.verticalAlign = makeEm(-depth);
              }
              var node = new Img(group.src, group.alt, style);
              node.height = height;
              node.depth = depth;
              return node;
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var node = new mathMLTree.MathNode("mglyph", []);
              node.setAttribute("alt", group.alt);
              var height = calculateSize(group.height, options2);
              var depth = 0;
              if (group.totalheight.number > 0) {
                depth = calculateSize(group.totalheight, options2) - height;
                node.setAttribute("valign", makeEm(-depth));
              }
              node.setAttribute("height", makeEm(height + depth));
              if (group.width.number > 0) {
                var width = calculateSize(group.width, options2);
                node.setAttribute("width", makeEm(width));
              }
              node.setAttribute("src", group.src);
              return node;
            }
          });
          ;
          defineFunction({
            type: "kern",
            names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
            props: {
              numArgs: 1,
              argTypes: ["size"],
              primitive: true,
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var size = assertNodeType(args[0], "size");
              if (parser.settings.strict) {
                var mathFunction = funcName[1] === "m";
                var muUnit = size.value.unit === "mu";
                if (mathFunction) {
                  if (!muUnit) {
                    parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " supports only mu units, " + ("not " + size.value.unit + " units"));
                  }
                  if (parser.mode !== "math") {
                    parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " works only in math mode");
                  }
                } else {
                  if (muUnit) {
                    parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " doesn't support mu units");
                  }
                }
              }
              return {
                type: "kern",
                mode: parser.mode,
                dimension: size.value
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              return buildCommon.makeGlue(group.dimension, options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var dimension = calculateSize(group.dimension, options2);
              return new mathMLTree.SpaceNode(dimension);
            }
          });
          ;
          defineFunction({
            type: "lap",
            names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var body = args[0];
              return {
                type: "lap",
                mode: parser.mode,
                alignment: funcName.slice(5),
                body
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var inner2;
              if (group.alignment === "clap") {
                inner2 = buildCommon.makeSpan([], [buildGroup(group.body, options2)]);
                inner2 = buildCommon.makeSpan(["inner"], [inner2], options2);
              } else {
                inner2 = buildCommon.makeSpan(["inner"], [buildGroup(group.body, options2)]);
              }
              var fix2 = buildCommon.makeSpan(["fix"], []);
              var node = buildCommon.makeSpan([group.alignment], [inner2, fix2], options2);
              var strut = buildCommon.makeSpan(["strut"]);
              strut.style.height = makeEm(node.height + node.depth);
              if (node.depth) {
                strut.style.verticalAlign = makeEm(-node.depth);
              }
              node.children.unshift(strut);
              node = buildCommon.makeSpan(["thinbox"], [node], options2);
              return buildCommon.makeSpan(["mord", "vbox"], [node], options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var node = new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options2)]);
              if (group.alignment !== "rlap") {
                var offset = group.alignment === "llap" ? "-1" : "-0.5";
                node.setAttribute("lspace", offset + "width");
              }
              node.setAttribute("width", "0px");
              return node;
            }
          });
          ;
          defineFunction({
            type: "styling",
            names: ["\\(", "$"],
            props: {
              numArgs: 0,
              allowedInText: true,
              allowedInMath: false
            },
            handler: function handler(_ref, args) {
              var funcName = _ref.funcName, parser = _ref.parser;
              var outerMode = parser.mode;
              parser.switchMode("math");
              var close = funcName === "\\(" ? "\\)" : "$";
              var body = parser.parseExpression(false, close);
              parser.expect(close);
              parser.switchMode(outerMode);
              return {
                type: "styling",
                mode: parser.mode,
                style: "text",
                body
              };
            }
          });
          defineFunction({
            type: "text",
            names: ["\\)", "\\]"],
            props: {
              numArgs: 0,
              allowedInText: true,
              allowedInMath: false
            },
            handler: function handler(context2, args) {
              throw new src_ParseError("Mismatched " + context2.funcName);
            }
          });
          ;
          var chooseMathStyle = function chooseMathStyle2(group, options2) {
            switch (options2.style.size) {
              case src_Style.DISPLAY.size:
                return group.display;
              case src_Style.TEXT.size:
                return group.text;
              case src_Style.SCRIPT.size:
                return group.script;
              case src_Style.SCRIPTSCRIPT.size:
                return group.scriptscript;
              default:
                return group.text;
            }
          };
          defineFunction({
            type: "mathchoice",
            names: ["\\mathchoice"],
            props: {
              numArgs: 4,
              primitive: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              return {
                type: "mathchoice",
                mode: parser.mode,
                display: ordargument(args[0]),
                text: ordargument(args[1]),
                script: ordargument(args[2]),
                scriptscript: ordargument(args[3])
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var body = chooseMathStyle(group, options2);
              var elements = buildExpression(body, options2, false);
              return buildCommon.makeFragment(elements);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var body = chooseMathStyle(group, options2);
              return buildExpressionRow(body, options2);
            }
          });
          ;
          var assembleSupSub = function assembleSupSub2(base2, supGroup, subGroup, options2, style, slant, baseShift) {
            base2 = buildCommon.makeSpan([], [base2]);
            var subIsSingleCharacter = subGroup && utils.isCharacterBox(subGroup);
            var sub;
            var sup;
            if (supGroup) {
              var elem = buildGroup(supGroup, options2.havingStyle(style.sup()), options2);
              sup = {
                elem,
                kern: Math.max(options2.fontMetrics().bigOpSpacing1, options2.fontMetrics().bigOpSpacing3 - elem.depth)
              };
            }
            if (subGroup) {
              var _elem = buildGroup(subGroup, options2.havingStyle(style.sub()), options2);
              sub = {
                elem: _elem,
                kern: Math.max(options2.fontMetrics().bigOpSpacing2, options2.fontMetrics().bigOpSpacing4 - _elem.height)
              };
            }
            var finalGroup;
            if (sup && sub) {
              var bottom = options2.fontMetrics().bigOpSpacing5 + sub.elem.height + sub.elem.depth + sub.kern + base2.depth + baseShift;
              finalGroup = buildCommon.makeVList({
                positionType: "bottom",
                positionData: bottom,
                children: [{
                  type: "kern",
                  size: options2.fontMetrics().bigOpSpacing5
                }, {
                  type: "elem",
                  elem: sub.elem,
                  marginLeft: makeEm(-slant)
                }, {
                  type: "kern",
                  size: sub.kern
                }, {
                  type: "elem",
                  elem: base2
                }, {
                  type: "kern",
                  size: sup.kern
                }, {
                  type: "elem",
                  elem: sup.elem,
                  marginLeft: makeEm(slant)
                }, {
                  type: "kern",
                  size: options2.fontMetrics().bigOpSpacing5
                }]
              }, options2);
            } else if (sub) {
              var top = base2.height - baseShift;
              finalGroup = buildCommon.makeVList({
                positionType: "top",
                positionData: top,
                children: [{
                  type: "kern",
                  size: options2.fontMetrics().bigOpSpacing5
                }, {
                  type: "elem",
                  elem: sub.elem,
                  marginLeft: makeEm(-slant)
                }, {
                  type: "kern",
                  size: sub.kern
                }, {
                  type: "elem",
                  elem: base2
                }]
              }, options2);
            } else if (sup) {
              var _bottom = base2.depth + baseShift;
              finalGroup = buildCommon.makeVList({
                positionType: "bottom",
                positionData: _bottom,
                children: [{
                  type: "elem",
                  elem: base2
                }, {
                  type: "kern",
                  size: sup.kern
                }, {
                  type: "elem",
                  elem: sup.elem,
                  marginLeft: makeEm(slant)
                }, {
                  type: "kern",
                  size: options2.fontMetrics().bigOpSpacing5
                }]
              }, options2);
            } else {
              return base2;
            }
            var parts = [finalGroup];
            if (sub && slant !== 0 && !subIsSingleCharacter) {
              var spacer = buildCommon.makeSpan(["mspace"], [], options2);
              spacer.style.marginRight = makeEm(slant);
              parts.unshift(spacer);
            }
            return buildCommon.makeSpan(["mop", "op-limits"], parts, options2);
          };
          ;
          var noSuccessor = ["\\smallint"];
          var op_htmlBuilder = function htmlBuilder2(grp, options2) {
            var supGroup;
            var subGroup;
            var hasLimits = false;
            var group;
            if (grp.type === "supsub") {
              supGroup = grp.sup;
              subGroup = grp.sub;
              group = assertNodeType(grp.base, "op");
              hasLimits = true;
            } else {
              group = assertNodeType(grp, "op");
            }
            var style = options2.style;
            var large = false;
            if (style.size === src_Style.DISPLAY.size && group.symbol && !utils.contains(noSuccessor, group.name)) {
              large = true;
            }
            var base2;
            if (group.symbol) {
              var fontName = large ? "Size2-Regular" : "Size1-Regular";
              var stash = "";
              if (group.name === "\\oiint" || group.name === "\\oiiint") {
                stash = group.name.substr(1);
                group.name = stash === "oiint" ? "\\iint" : "\\iiint";
              }
              base2 = buildCommon.makeSymbol(group.name, fontName, "math", options2, ["mop", "op-symbol", large ? "large-op" : "small-op"]);
              if (stash.length > 0) {
                var italic = base2.italic;
                var oval = buildCommon.staticSvg(stash + "Size" + (large ? "2" : "1"), options2);
                base2 = buildCommon.makeVList({
                  positionType: "individualShift",
                  children: [{
                    type: "elem",
                    elem: base2,
                    shift: 0
                  }, {
                    type: "elem",
                    elem: oval,
                    shift: large ? 0.08 : 0
                  }]
                }, options2);
                group.name = "\\" + stash;
                base2.classes.unshift("mop");
                base2.italic = italic;
              }
            } else if (group.body) {
              var inner2 = buildExpression(group.body, options2, true);
              if (inner2.length === 1 && inner2[0] instanceof SymbolNode) {
                base2 = inner2[0];
                base2.classes[0] = "mop";
              } else {
                base2 = buildCommon.makeSpan(["mop"], inner2, options2);
              }
            } else {
              var output = [];
              for (var i3 = 1; i3 < group.name.length; i3++) {
                output.push(buildCommon.mathsym(group.name[i3], group.mode, options2));
              }
              base2 = buildCommon.makeSpan(["mop"], output, options2);
            }
            var baseShift = 0;
            var slant = 0;
            if ((base2 instanceof SymbolNode || group.name === "\\oiint" || group.name === "\\oiiint") && !group.suppressBaseShift) {
              baseShift = (base2.height - base2.depth) / 2 - options2.fontMetrics().axisHeight;
              slant = base2.italic;
            }
            if (hasLimits) {
              return assembleSupSub(base2, supGroup, subGroup, options2, style, slant, baseShift);
            } else {
              if (baseShift) {
                base2.style.position = "relative";
                base2.style.top = makeEm(baseShift);
              }
              return base2;
            }
          };
          var op_mathmlBuilder = function mathmlBuilder2(group, options2) {
            var node;
            if (group.symbol) {
              node = new MathNode("mo", [makeText(group.name, group.mode)]);
              if (utils.contains(noSuccessor, group.name)) {
                node.setAttribute("largeop", "false");
              }
            } else if (group.body) {
              node = new MathNode("mo", buildMathML_buildExpression(group.body, options2));
            } else {
              node = new MathNode("mi", [new TextNode(group.name.slice(1))]);
              var operator = new MathNode("mo", [makeText("\u2061", "text")]);
              if (group.parentIsSupSub) {
                node = new MathNode("mrow", [node, operator]);
              } else {
                node = newDocumentFragment([node, operator]);
              }
            }
            return node;
          };
          var singleCharBigOps = {
            "\u220F": "\\prod",
            "\u2210": "\\coprod",
            "\u2211": "\\sum",
            "\u22C0": "\\bigwedge",
            "\u22C1": "\\bigvee",
            "\u22C2": "\\bigcap",
            "\u22C3": "\\bigcup",
            "\u2A00": "\\bigodot",
            "\u2A01": "\\bigoplus",
            "\u2A02": "\\bigotimes",
            "\u2A04": "\\biguplus",
            "\u2A06": "\\bigsqcup"
          };
          defineFunction({
            type: "op",
            names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "\u220F", "\u2210", "\u2211", "\u22C0", "\u22C1", "\u22C2", "\u22C3", "\u2A00", "\u2A01", "\u2A02", "\u2A04", "\u2A06"],
            props: {
              numArgs: 0
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var fName = funcName;
              if (fName.length === 1) {
                fName = singleCharBigOps[fName];
              }
              return {
                type: "op",
                mode: parser.mode,
                limits: true,
                parentIsSupSub: false,
                symbol: true,
                name: fName
              };
            },
            htmlBuilder: op_htmlBuilder,
            mathmlBuilder: op_mathmlBuilder
          });
          defineFunction({
            type: "op",
            names: ["\\mathop"],
            props: {
              numArgs: 1,
              primitive: true
            },
            handler: function handler(_ref2, args) {
              var parser = _ref2.parser;
              var body = args[0];
              return {
                type: "op",
                mode: parser.mode,
                limits: false,
                parentIsSupSub: false,
                symbol: false,
                body: ordargument(body)
              };
            },
            htmlBuilder: op_htmlBuilder,
            mathmlBuilder: op_mathmlBuilder
          });
          var singleCharIntegrals = {
            "\u222B": "\\int",
            "\u222C": "\\iint",
            "\u222D": "\\iiint",
            "\u222E": "\\oint",
            "\u222F": "\\oiint",
            "\u2230": "\\oiiint"
          };
          defineFunction({
            type: "op",
            names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
            props: {
              numArgs: 0
            },
            handler: function handler(_ref3) {
              var parser = _ref3.parser, funcName = _ref3.funcName;
              return {
                type: "op",
                mode: parser.mode,
                limits: false,
                parentIsSupSub: false,
                symbol: false,
                name: funcName
              };
            },
            htmlBuilder: op_htmlBuilder,
            mathmlBuilder: op_mathmlBuilder
          });
          defineFunction({
            type: "op",
            names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
            props: {
              numArgs: 0
            },
            handler: function handler(_ref4) {
              var parser = _ref4.parser, funcName = _ref4.funcName;
              return {
                type: "op",
                mode: parser.mode,
                limits: true,
                parentIsSupSub: false,
                symbol: false,
                name: funcName
              };
            },
            htmlBuilder: op_htmlBuilder,
            mathmlBuilder: op_mathmlBuilder
          });
          defineFunction({
            type: "op",
            names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "\u222B", "\u222C", "\u222D", "\u222E", "\u222F", "\u2230"],
            props: {
              numArgs: 0
            },
            handler: function handler(_ref5) {
              var parser = _ref5.parser, funcName = _ref5.funcName;
              var fName = funcName;
              if (fName.length === 1) {
                fName = singleCharIntegrals[fName];
              }
              return {
                type: "op",
                mode: parser.mode,
                limits: false,
                parentIsSupSub: false,
                symbol: true,
                name: fName
              };
            },
            htmlBuilder: op_htmlBuilder,
            mathmlBuilder: op_mathmlBuilder
          });
          ;
          var _macros = {};
          function defineMacro(name, body) {
            _macros[name] = body;
          }
          ;
          var operatorname_htmlBuilder = function htmlBuilder2(grp, options2) {
            var supGroup;
            var subGroup;
            var hasLimits = false;
            var group;
            if (grp.type === "supsub") {
              supGroup = grp.sup;
              subGroup = grp.sub;
              group = assertNodeType(grp.base, "operatorname");
              hasLimits = true;
            } else {
              group = assertNodeType(grp, "operatorname");
            }
            var base2;
            if (group.body.length > 0) {
              var body = group.body.map(function(child2) {
                var childText = child2.text;
                if (typeof childText === "string") {
                  return {
                    type: "textord",
                    mode: child2.mode,
                    text: childText
                  };
                } else {
                  return child2;
                }
              });
              var expression = buildExpression(body, options2.withFont("mathrm"), true);
              for (var i3 = 0; i3 < expression.length; i3++) {
                var child = expression[i3];
                if (child instanceof SymbolNode) {
                  child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
                }
              }
              base2 = buildCommon.makeSpan(["mop"], expression, options2);
            } else {
              base2 = buildCommon.makeSpan(["mop"], [], options2);
            }
            if (hasLimits) {
              return assembleSupSub(base2, supGroup, subGroup, options2, options2.style, 0, 0);
            } else {
              return base2;
            }
          };
          var operatorname_mathmlBuilder = function mathmlBuilder2(group, options2) {
            var expression = buildMathML_buildExpression(group.body, options2.withFont("mathrm"));
            var isAllString = true;
            for (var i3 = 0; i3 < expression.length; i3++) {
              var node = expression[i3];
              if (node instanceof mathMLTree.SpaceNode) {
              } else if (node instanceof mathMLTree.MathNode) {
                switch (node.type) {
                  case "mi":
                  case "mn":
                  case "ms":
                  case "mspace":
                  case "mtext":
                    break;
                  case "mo": {
                    var child = node.children[0];
                    if (node.children.length === 1 && child instanceof mathMLTree.TextNode) {
                      child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
                    } else {
                      isAllString = false;
                    }
                    break;
                  }
                  default:
                    isAllString = false;
                }
              } else {
                isAllString = false;
              }
            }
            if (isAllString) {
              var word = expression.map(function(node2) {
                return node2.toText();
              }).join("");
              expression = [new mathMLTree.TextNode(word)];
            }
            var identifier = new mathMLTree.MathNode("mi", expression);
            identifier.setAttribute("mathvariant", "normal");
            var operator = new mathMLTree.MathNode("mo", [makeText("\u2061", "text")]);
            if (group.parentIsSupSub) {
              return new mathMLTree.MathNode("mrow", [identifier, operator]);
            } else {
              return mathMLTree.newDocumentFragment([identifier, operator]);
            }
          };
          defineFunction({
            type: "operatorname",
            names: ["\\operatorname@", "\\operatornamewithlimits"],
            props: {
              numArgs: 1
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var body = args[0];
              return {
                type: "operatorname",
                mode: parser.mode,
                body: ordargument(body),
                alwaysHandleSupSub: funcName === "\\operatornamewithlimits",
                limits: false,
                parentIsSupSub: false
              };
            },
            htmlBuilder: operatorname_htmlBuilder,
            mathmlBuilder: operatorname_mathmlBuilder
          });
          defineMacro("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
          ;
          defineFunctionBuilders({
            type: "ordgroup",
            htmlBuilder: function htmlBuilder2(group, options2) {
              if (group.semisimple) {
                return buildCommon.makeFragment(buildExpression(group.body, options2, false));
              }
              return buildCommon.makeSpan(["mord"], buildExpression(group.body, options2, true), options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              return buildExpressionRow(group.body, options2, true);
            }
          });
          ;
          defineFunction({
            type: "overline",
            names: ["\\overline"],
            props: {
              numArgs: 1
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              var body = args[0];
              return {
                type: "overline",
                mode: parser.mode,
                body
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var innerGroup = buildGroup(group.body, options2.havingCrampedStyle());
              var line = buildCommon.makeLineSpan("overline-line", options2);
              var defaultRuleThickness = options2.fontMetrics().defaultRuleThickness;
              var vlist = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: innerGroup
                }, {
                  type: "kern",
                  size: 3 * defaultRuleThickness
                }, {
                  type: "elem",
                  elem: line
                }, {
                  type: "kern",
                  size: defaultRuleThickness
                }]
              }, options2);
              return buildCommon.makeSpan(["mord", "overline"], [vlist], options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u203E")]);
              operator.setAttribute("stretchy", "true");
              var node = new mathMLTree.MathNode("mover", [buildMathML_buildGroup(group.body, options2), operator]);
              node.setAttribute("accent", "true");
              return node;
            }
          });
          ;
          defineFunction({
            type: "phantom",
            names: ["\\phantom"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              var body = args[0];
              return {
                type: "phantom",
                mode: parser.mode,
                body: ordargument(body)
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var elements = buildExpression(group.body, options2.withPhantom(), false);
              return buildCommon.makeFragment(elements);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var inner2 = buildMathML_buildExpression(group.body, options2);
              return new mathMLTree.MathNode("mphantom", inner2);
            }
          });
          defineFunction({
            type: "hphantom",
            names: ["\\hphantom"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler: function handler(_ref2, args) {
              var parser = _ref2.parser;
              var body = args[0];
              return {
                type: "hphantom",
                mode: parser.mode,
                body
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var node = buildCommon.makeSpan([], [buildGroup(group.body, options2.withPhantom())]);
              node.height = 0;
              node.depth = 0;
              if (node.children) {
                for (var i3 = 0; i3 < node.children.length; i3++) {
                  node.children[i3].height = 0;
                  node.children[i3].depth = 0;
                }
              }
              node = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: node
                }]
              }, options2);
              return buildCommon.makeSpan(["mord"], [node], options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var inner2 = buildMathML_buildExpression(ordargument(group.body), options2);
              var phantom = new mathMLTree.MathNode("mphantom", inner2);
              var node = new mathMLTree.MathNode("mpadded", [phantom]);
              node.setAttribute("height", "0px");
              node.setAttribute("depth", "0px");
              return node;
            }
          });
          defineFunction({
            type: "vphantom",
            names: ["\\vphantom"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler: function handler(_ref3, args) {
              var parser = _ref3.parser;
              var body = args[0];
              return {
                type: "vphantom",
                mode: parser.mode,
                body
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var inner2 = buildCommon.makeSpan(["inner"], [buildGroup(group.body, options2.withPhantom())]);
              var fix2 = buildCommon.makeSpan(["fix"], []);
              return buildCommon.makeSpan(["mord", "rlap"], [inner2, fix2], options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var inner2 = buildMathML_buildExpression(ordargument(group.body), options2);
              var phantom = new mathMLTree.MathNode("mphantom", inner2);
              var node = new mathMLTree.MathNode("mpadded", [phantom]);
              node.setAttribute("width", "0px");
              return node;
            }
          });
          ;
          defineFunction({
            type: "raisebox",
            names: ["\\raisebox"],
            props: {
              numArgs: 2,
              argTypes: ["size", "hbox"],
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              var amount = assertNodeType(args[0], "size").value;
              var body = args[1];
              return {
                type: "raisebox",
                mode: parser.mode,
                dy: amount,
                body
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var body = buildGroup(group.body, options2);
              var dy = calculateSize(group.dy, options2);
              return buildCommon.makeVList({
                positionType: "shift",
                positionData: -dy,
                children: [{
                  type: "elem",
                  elem: body
                }]
              }, options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var node = new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options2)]);
              var dy = group.dy.number + group.dy.unit;
              node.setAttribute("voffset", dy);
              return node;
            }
          });
          ;
          defineFunction({
            type: "rule",
            names: ["\\rule"],
            props: {
              numArgs: 2,
              numOptionalArgs: 1,
              argTypes: ["size", "size", "size"]
            },
            handler: function handler(_ref, args, optArgs) {
              var parser = _ref.parser;
              var shift = optArgs[0];
              var width = assertNodeType(args[0], "size");
              var height = assertNodeType(args[1], "size");
              return {
                type: "rule",
                mode: parser.mode,
                shift: shift && assertNodeType(shift, "size").value,
                width: width.value,
                height: height.value
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var rule = buildCommon.makeSpan(["mord", "rule"], [], options2);
              var width = calculateSize(group.width, options2);
              var height = calculateSize(group.height, options2);
              var shift = group.shift ? calculateSize(group.shift, options2) : 0;
              rule.style.borderRightWidth = makeEm(width);
              rule.style.borderTopWidth = makeEm(height);
              rule.style.bottom = makeEm(shift);
              rule.width = width;
              rule.height = height + shift;
              rule.depth = -shift;
              rule.maxFontSize = height * 1.125 * options2.sizeMultiplier;
              return rule;
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var width = calculateSize(group.width, options2);
              var height = calculateSize(group.height, options2);
              var shift = group.shift ? calculateSize(group.shift, options2) : 0;
              var color = options2.color && options2.getColor() || "black";
              var rule = new mathMLTree.MathNode("mspace");
              rule.setAttribute("mathbackground", color);
              rule.setAttribute("width", makeEm(width));
              rule.setAttribute("height", makeEm(height));
              var wrapper = new mathMLTree.MathNode("mpadded", [rule]);
              if (shift >= 0) {
                wrapper.setAttribute("height", makeEm(shift));
              } else {
                wrapper.setAttribute("height", makeEm(shift));
                wrapper.setAttribute("depth", makeEm(-shift));
              }
              wrapper.setAttribute("voffset", makeEm(shift));
              return wrapper;
            }
          });
          ;
          function sizingGroup(value, options2, baseOptions) {
            var inner2 = buildExpression(value, options2, false);
            var multiplier = options2.sizeMultiplier / baseOptions.sizeMultiplier;
            for (var i3 = 0; i3 < inner2.length; i3++) {
              var pos = inner2[i3].classes.indexOf("sizing");
              if (pos < 0) {
                Array.prototype.push.apply(inner2[i3].classes, options2.sizingClasses(baseOptions));
              } else if (inner2[i3].classes[pos + 1] === "reset-size" + options2.size) {
                inner2[i3].classes[pos + 1] = "reset-size" + baseOptions.size;
              }
              inner2[i3].height *= multiplier;
              inner2[i3].depth *= multiplier;
            }
            return buildCommon.makeFragment(inner2);
          }
          var sizeFuncs = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"];
          var sizing_htmlBuilder = function htmlBuilder2(group, options2) {
            var newOptions = options2.havingSize(group.size);
            return sizingGroup(group.body, newOptions, options2);
          };
          defineFunction({
            type: "sizing",
            names: sizeFuncs,
            props: {
              numArgs: 0,
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var breakOnTokenText = _ref.breakOnTokenText, funcName = _ref.funcName, parser = _ref.parser;
              var body = parser.parseExpression(false, breakOnTokenText);
              return {
                type: "sizing",
                mode: parser.mode,
                size: sizeFuncs.indexOf(funcName) + 1,
                body
              };
            },
            htmlBuilder: sizing_htmlBuilder,
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var newOptions = options2.havingSize(group.size);
              var inner2 = buildMathML_buildExpression(group.body, newOptions);
              var node = new mathMLTree.MathNode("mstyle", inner2);
              node.setAttribute("mathsize", makeEm(newOptions.sizeMultiplier));
              return node;
            }
          });
          ;
          defineFunction({
            type: "smash",
            names: ["\\smash"],
            props: {
              numArgs: 1,
              numOptionalArgs: 1,
              allowedInText: true
            },
            handler: function handler(_ref, args, optArgs) {
              var parser = _ref.parser;
              var smashHeight = false;
              var smashDepth = false;
              var tbArg = optArgs[0] && assertNodeType(optArgs[0], "ordgroup");
              if (tbArg) {
                var letter = "";
                for (var i3 = 0; i3 < tbArg.body.length; ++i3) {
                  var node = tbArg.body[i3];
                  letter = node.text;
                  if (letter === "t") {
                    smashHeight = true;
                  } else if (letter === "b") {
                    smashDepth = true;
                  } else {
                    smashHeight = false;
                    smashDepth = false;
                    break;
                  }
                }
              } else {
                smashHeight = true;
                smashDepth = true;
              }
              var body = args[0];
              return {
                type: "smash",
                mode: parser.mode,
                body,
                smashHeight,
                smashDepth
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var node = buildCommon.makeSpan([], [buildGroup(group.body, options2)]);
              if (!group.smashHeight && !group.smashDepth) {
                return node;
              }
              if (group.smashHeight) {
                node.height = 0;
                if (node.children) {
                  for (var i3 = 0; i3 < node.children.length; i3++) {
                    node.children[i3].height = 0;
                  }
                }
              }
              if (group.smashDepth) {
                node.depth = 0;
                if (node.children) {
                  for (var _i6 = 0; _i6 < node.children.length; _i6++) {
                    node.children[_i6].depth = 0;
                  }
                }
              }
              var smashedNode = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: node
                }]
              }, options2);
              return buildCommon.makeSpan(["mord"], [smashedNode], options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var node = new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options2)]);
              if (group.smashHeight) {
                node.setAttribute("height", "0px");
              }
              if (group.smashDepth) {
                node.setAttribute("depth", "0px");
              }
              return node;
            }
          });
          ;
          defineFunction({
            type: "sqrt",
            names: ["\\sqrt"],
            props: {
              numArgs: 1,
              numOptionalArgs: 1
            },
            handler: function handler(_ref, args, optArgs) {
              var parser = _ref.parser;
              var index = optArgs[0];
              var body = args[0];
              return {
                type: "sqrt",
                mode: parser.mode,
                body,
                index
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var inner2 = buildGroup(group.body, options2.havingCrampedStyle());
              if (inner2.height === 0) {
                inner2.height = options2.fontMetrics().xHeight;
              }
              inner2 = buildCommon.wrapFragment(inner2, options2);
              var metrics = options2.fontMetrics();
              var theta = metrics.defaultRuleThickness;
              var phi = theta;
              if (options2.style.id < src_Style.TEXT.id) {
                phi = options2.fontMetrics().xHeight;
              }
              var lineClearance = theta + phi / 4;
              var minDelimiterHeight = inner2.height + inner2.depth + lineClearance + theta;
              var _delimiter$sqrtImage = delimiter.sqrtImage(minDelimiterHeight, options2), img = _delimiter$sqrtImage.span, ruleWidth = _delimiter$sqrtImage.ruleWidth, advanceWidth = _delimiter$sqrtImage.advanceWidth;
              var delimDepth = img.height - ruleWidth;
              if (delimDepth > inner2.height + inner2.depth + lineClearance) {
                lineClearance = (lineClearance + delimDepth - inner2.height - inner2.depth) / 2;
              }
              var imgShift = img.height - inner2.height - lineClearance - ruleWidth;
              inner2.style.paddingLeft = makeEm(advanceWidth);
              var body = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: inner2,
                  wrapperClasses: ["svg-align"]
                }, {
                  type: "kern",
                  size: -(inner2.height + imgShift)
                }, {
                  type: "elem",
                  elem: img
                }, {
                  type: "kern",
                  size: ruleWidth
                }]
              }, options2);
              if (!group.index) {
                return buildCommon.makeSpan(["mord", "sqrt"], [body], options2);
              } else {
                var newOptions = options2.havingStyle(src_Style.SCRIPTSCRIPT);
                var rootm = buildGroup(group.index, newOptions, options2);
                var toShift = 0.6 * (body.height - body.depth);
                var rootVList = buildCommon.makeVList({
                  positionType: "shift",
                  positionData: -toShift,
                  children: [{
                    type: "elem",
                    elem: rootm
                  }]
                }, options2);
                var rootVListWrap = buildCommon.makeSpan(["root"], [rootVList]);
                return buildCommon.makeSpan(["mord", "sqrt"], [rootVListWrap, body], options2);
              }
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var body = group.body, index = group.index;
              return index ? new mathMLTree.MathNode("mroot", [buildMathML_buildGroup(body, options2), buildMathML_buildGroup(index, options2)]) : new mathMLTree.MathNode("msqrt", [buildMathML_buildGroup(body, options2)]);
            }
          });
          ;
          var styling_styleMap = {
            "display": src_Style.DISPLAY,
            "text": src_Style.TEXT,
            "script": src_Style.SCRIPT,
            "scriptscript": src_Style.SCRIPTSCRIPT
          };
          defineFunction({
            type: "styling",
            names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
            props: {
              numArgs: 0,
              allowedInText: true,
              primitive: true
            },
            handler: function handler(_ref, args) {
              var breakOnTokenText = _ref.breakOnTokenText, funcName = _ref.funcName, parser = _ref.parser;
              var body = parser.parseExpression(true, breakOnTokenText);
              var style = funcName.slice(1, funcName.length - 5);
              return {
                type: "styling",
                mode: parser.mode,
                style,
                body
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var newStyle = styling_styleMap[group.style];
              var newOptions = options2.havingStyle(newStyle).withFont("");
              return sizingGroup(group.body, newOptions, options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var newStyle = styling_styleMap[group.style];
              var newOptions = options2.havingStyle(newStyle);
              var inner2 = buildMathML_buildExpression(group.body, newOptions);
              var node = new mathMLTree.MathNode("mstyle", inner2);
              var styleAttributes = {
                "display": ["0", "true"],
                "text": ["0", "false"],
                "script": ["1", "false"],
                "scriptscript": ["2", "false"]
              };
              var attr = styleAttributes[group.style];
              node.setAttribute("scriptlevel", attr[0]);
              node.setAttribute("displaystyle", attr[1]);
              return node;
            }
          });
          ;
          var htmlBuilderDelegate = function htmlBuilderDelegate2(group, options2) {
            var base2 = group.base;
            if (!base2) {
              return null;
            } else if (base2.type === "op") {
              var delegate = base2.limits && (options2.style.size === src_Style.DISPLAY.size || base2.alwaysHandleSupSub);
              return delegate ? op_htmlBuilder : null;
            } else if (base2.type === "operatorname") {
              var _delegate = base2.alwaysHandleSupSub && (options2.style.size === src_Style.DISPLAY.size || base2.limits);
              return _delegate ? operatorname_htmlBuilder : null;
            } else if (base2.type === "accent") {
              return utils.isCharacterBox(base2.base) ? htmlBuilder : null;
            } else if (base2.type === "horizBrace") {
              var isSup = !group.sub;
              return isSup === base2.isOver ? horizBrace_htmlBuilder : null;
            } else {
              return null;
            }
          };
          defineFunctionBuilders({
            type: "supsub",
            htmlBuilder: function htmlBuilder2(group, options2) {
              var builderDelegate = htmlBuilderDelegate(group, options2);
              if (builderDelegate) {
                return builderDelegate(group, options2);
              }
              var valueBase = group.base, valueSup = group.sup, valueSub = group.sub;
              var base2 = buildGroup(valueBase, options2);
              var supm;
              var subm;
              var metrics = options2.fontMetrics();
              var supShift = 0;
              var subShift = 0;
              var isCharacterBox2 = valueBase && utils.isCharacterBox(valueBase);
              if (valueSup) {
                var newOptions = options2.havingStyle(options2.style.sup());
                supm = buildGroup(valueSup, newOptions, options2);
                if (!isCharacterBox2) {
                  supShift = base2.height - newOptions.fontMetrics().supDrop * newOptions.sizeMultiplier / options2.sizeMultiplier;
                }
              }
              if (valueSub) {
                var _newOptions = options2.havingStyle(options2.style.sub());
                subm = buildGroup(valueSub, _newOptions, options2);
                if (!isCharacterBox2) {
                  subShift = base2.depth + _newOptions.fontMetrics().subDrop * _newOptions.sizeMultiplier / options2.sizeMultiplier;
                }
              }
              var minSupShift;
              if (options2.style === src_Style.DISPLAY) {
                minSupShift = metrics.sup1;
              } else if (options2.style.cramped) {
                minSupShift = metrics.sup3;
              } else {
                minSupShift = metrics.sup2;
              }
              var multiplier = options2.sizeMultiplier;
              var marginRight = makeEm(0.5 / metrics.ptPerEm / multiplier);
              var marginLeft = null;
              if (subm) {
                var isOiint = group.base && group.base.type === "op" && group.base.name && (group.base.name === "\\oiint" || group.base.name === "\\oiiint");
                if (base2 instanceof SymbolNode || isOiint) {
                  marginLeft = makeEm(-base2.italic);
                }
              }
              var supsub;
              if (supm && subm) {
                supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
                subShift = Math.max(subShift, metrics.sub2);
                var ruleWidth = metrics.defaultRuleThickness;
                var maxWidth = 4 * ruleWidth;
                if (supShift - supm.depth - (subm.height - subShift) < maxWidth) {
                  subShift = maxWidth - (supShift - supm.depth) + subm.height;
                  var psi = 0.8 * metrics.xHeight - (supShift - supm.depth);
                  if (psi > 0) {
                    supShift += psi;
                    subShift -= psi;
                  }
                }
                var vlistElem = [{
                  type: "elem",
                  elem: subm,
                  shift: subShift,
                  marginRight,
                  marginLeft
                }, {
                  type: "elem",
                  elem: supm,
                  shift: -supShift,
                  marginRight
                }];
                supsub = buildCommon.makeVList({
                  positionType: "individualShift",
                  children: vlistElem
                }, options2);
              } else if (subm) {
                subShift = Math.max(subShift, metrics.sub1, subm.height - 0.8 * metrics.xHeight);
                var _vlistElem = [{
                  type: "elem",
                  elem: subm,
                  marginLeft,
                  marginRight
                }];
                supsub = buildCommon.makeVList({
                  positionType: "shift",
                  positionData: subShift,
                  children: _vlistElem
                }, options2);
              } else if (supm) {
                supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
                supsub = buildCommon.makeVList({
                  positionType: "shift",
                  positionData: -supShift,
                  children: [{
                    type: "elem",
                    elem: supm,
                    marginRight
                  }]
                }, options2);
              } else {
                throw new Error("supsub must have either sup or sub.");
              }
              var mclass = getTypeOfDomTree(base2, "right") || "mord";
              return buildCommon.makeSpan([mclass], [base2, buildCommon.makeSpan(["msupsub"], [supsub])], options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var isBrace = false;
              var isOver;
              var isSup;
              if (group.base && group.base.type === "horizBrace") {
                isSup = !!group.sup;
                if (isSup === group.base.isOver) {
                  isBrace = true;
                  isOver = group.base.isOver;
                }
              }
              if (group.base && (group.base.type === "op" || group.base.type === "operatorname")) {
                group.base.parentIsSupSub = true;
              }
              var children = [buildMathML_buildGroup(group.base, options2)];
              if (group.sub) {
                children.push(buildMathML_buildGroup(group.sub, options2));
              }
              if (group.sup) {
                children.push(buildMathML_buildGroup(group.sup, options2));
              }
              var nodeType;
              if (isBrace) {
                nodeType = isOver ? "mover" : "munder";
              } else if (!group.sub) {
                var base2 = group.base;
                if (base2 && base2.type === "op" && base2.limits && (options2.style === src_Style.DISPLAY || base2.alwaysHandleSupSub)) {
                  nodeType = "mover";
                } else if (base2 && base2.type === "operatorname" && base2.alwaysHandleSupSub && (base2.limits || options2.style === src_Style.DISPLAY)) {
                  nodeType = "mover";
                } else {
                  nodeType = "msup";
                }
              } else if (!group.sup) {
                var _base = group.base;
                if (_base && _base.type === "op" && _base.limits && (options2.style === src_Style.DISPLAY || _base.alwaysHandleSupSub)) {
                  nodeType = "munder";
                } else if (_base && _base.type === "operatorname" && _base.alwaysHandleSupSub && (_base.limits || options2.style === src_Style.DISPLAY)) {
                  nodeType = "munder";
                } else {
                  nodeType = "msub";
                }
              } else {
                var _base2 = group.base;
                if (_base2 && _base2.type === "op" && _base2.limits && options2.style === src_Style.DISPLAY) {
                  nodeType = "munderover";
                } else if (_base2 && _base2.type === "operatorname" && _base2.alwaysHandleSupSub && (options2.style === src_Style.DISPLAY || _base2.limits)) {
                  nodeType = "munderover";
                } else {
                  nodeType = "msubsup";
                }
              }
              return new mathMLTree.MathNode(nodeType, children);
            }
          });
          ;
          defineFunctionBuilders({
            type: "atom",
            htmlBuilder: function htmlBuilder2(group, options2) {
              return buildCommon.mathsym(group.text, group.mode, options2, ["m" + group.family]);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var node = new mathMLTree.MathNode("mo", [makeText(group.text, group.mode)]);
              if (group.family === "bin") {
                var variant = getVariant(group, options2);
                if (variant === "bold-italic") {
                  node.setAttribute("mathvariant", variant);
                }
              } else if (group.family === "punct") {
                node.setAttribute("separator", "true");
              } else if (group.family === "open" || group.family === "close") {
                node.setAttribute("stretchy", "false");
              }
              return node;
            }
          });
          ;
          var defaultVariant = {
            "mi": "italic",
            "mn": "normal",
            "mtext": "normal"
          };
          defineFunctionBuilders({
            type: "mathord",
            htmlBuilder: function htmlBuilder2(group, options2) {
              return buildCommon.makeOrd(group, options2, "mathord");
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var node = new mathMLTree.MathNode("mi", [makeText(group.text, group.mode, options2)]);
              var variant = getVariant(group, options2) || "italic";
              if (variant !== defaultVariant[node.type]) {
                node.setAttribute("mathvariant", variant);
              }
              return node;
            }
          });
          defineFunctionBuilders({
            type: "textord",
            htmlBuilder: function htmlBuilder2(group, options2) {
              return buildCommon.makeOrd(group, options2, "textord");
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var text = makeText(group.text, group.mode, options2);
              var variant = getVariant(group, options2) || "normal";
              var node;
              if (group.mode === "text") {
                node = new mathMLTree.MathNode("mtext", [text]);
              } else if (/[0-9]/.test(group.text)) {
                node = new mathMLTree.MathNode("mn", [text]);
              } else if (group.text === "\\prime") {
                node = new mathMLTree.MathNode("mo", [text]);
              } else {
                node = new mathMLTree.MathNode("mi", [text]);
              }
              if (variant !== defaultVariant[node.type]) {
                node.setAttribute("mathvariant", variant);
              }
              return node;
            }
          });
          ;
          var cssSpace = {
            "\\nobreak": "nobreak",
            "\\allowbreak": "allowbreak"
          };
          var regularSpace = {
            " ": {},
            "\\ ": {},
            "~": {
              className: "nobreak"
            },
            "\\space": {},
            "\\nobreakspace": {
              className: "nobreak"
            }
          };
          defineFunctionBuilders({
            type: "spacing",
            htmlBuilder: function htmlBuilder2(group, options2) {
              if (regularSpace.hasOwnProperty(group.text)) {
                var className = regularSpace[group.text].className || "";
                if (group.mode === "text") {
                  var ord = buildCommon.makeOrd(group, options2, "textord");
                  ord.classes.push(className);
                  return ord;
                } else {
                  return buildCommon.makeSpan(["mspace", className], [buildCommon.mathsym(group.text, group.mode, options2)], options2);
                }
              } else if (cssSpace.hasOwnProperty(group.text)) {
                return buildCommon.makeSpan(["mspace", cssSpace[group.text]], [], options2);
              } else {
                throw new src_ParseError('Unknown type of space "' + group.text + '"');
              }
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var node;
              if (regularSpace.hasOwnProperty(group.text)) {
                node = new mathMLTree.MathNode("mtext", [new mathMLTree.TextNode("\xA0")]);
              } else if (cssSpace.hasOwnProperty(group.text)) {
                return new mathMLTree.MathNode("mspace");
              } else {
                throw new src_ParseError('Unknown type of space "' + group.text + '"');
              }
              return node;
            }
          });
          ;
          var pad = function pad2() {
            var padNode = new mathMLTree.MathNode("mtd", []);
            padNode.setAttribute("width", "50%");
            return padNode;
          };
          defineFunctionBuilders({
            type: "tag",
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var table = new mathMLTree.MathNode("mtable", [new mathMLTree.MathNode("mtr", [pad(), new mathMLTree.MathNode("mtd", [buildExpressionRow(group.body, options2)]), pad(), new mathMLTree.MathNode("mtd", [buildExpressionRow(group.tag, options2)])])]);
              table.setAttribute("width", "100%");
              return table;
            }
          });
          ;
          var textFontFamilies = {
            "\\text": void 0,
            "\\textrm": "textrm",
            "\\textsf": "textsf",
            "\\texttt": "texttt",
            "\\textnormal": "textrm"
          };
          var textFontWeights = {
            "\\textbf": "textbf",
            "\\textmd": "textmd"
          };
          var textFontShapes = {
            "\\textit": "textit",
            "\\textup": "textup"
          };
          var optionsWithFont = function optionsWithFont2(group, options2) {
            var font = group.font;
            if (!font) {
              return options2;
            } else if (textFontFamilies[font]) {
              return options2.withTextFontFamily(textFontFamilies[font]);
            } else if (textFontWeights[font]) {
              return options2.withTextFontWeight(textFontWeights[font]);
            } else {
              return options2.withTextFontShape(textFontShapes[font]);
            }
          };
          defineFunction({
            type: "text",
            names: [
              "\\text",
              "\\textrm",
              "\\textsf",
              "\\texttt",
              "\\textnormal",
              "\\textbf",
              "\\textmd",
              "\\textit",
              "\\textup"
            ],
            props: {
              numArgs: 1,
              argTypes: ["text"],
              allowedInArgument: true,
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser, funcName = _ref.funcName;
              var body = args[0];
              return {
                type: "text",
                mode: parser.mode,
                body: ordargument(body),
                font: funcName
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var newOptions = optionsWithFont(group, options2);
              var inner2 = buildExpression(group.body, newOptions, true);
              return buildCommon.makeSpan(["mord", "text"], inner2, newOptions);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var newOptions = optionsWithFont(group, options2);
              return buildExpressionRow(group.body, newOptions);
            }
          });
          ;
          defineFunction({
            type: "underline",
            names: ["\\underline"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              return {
                type: "underline",
                mode: parser.mode,
                body: args[0]
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var innerGroup = buildGroup(group.body, options2);
              var line = buildCommon.makeLineSpan("underline-line", options2);
              var defaultRuleThickness = options2.fontMetrics().defaultRuleThickness;
              var vlist = buildCommon.makeVList({
                positionType: "top",
                positionData: innerGroup.height,
                children: [{
                  type: "kern",
                  size: defaultRuleThickness
                }, {
                  type: "elem",
                  elem: line
                }, {
                  type: "kern",
                  size: 3 * defaultRuleThickness
                }, {
                  type: "elem",
                  elem: innerGroup
                }]
              }, options2);
              return buildCommon.makeSpan(["mord", "underline"], [vlist], options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u203E")]);
              operator.setAttribute("stretchy", "true");
              var node = new mathMLTree.MathNode("munder", [buildMathML_buildGroup(group.body, options2), operator]);
              node.setAttribute("accentunder", "true");
              return node;
            }
          });
          ;
          defineFunction({
            type: "vcenter",
            names: ["\\vcenter"],
            props: {
              numArgs: 1,
              argTypes: ["original"],
              allowedInText: false
            },
            handler: function handler(_ref, args) {
              var parser = _ref.parser;
              return {
                type: "vcenter",
                mode: parser.mode,
                body: args[0]
              };
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var body = buildGroup(group.body, options2);
              var axisHeight = options2.fontMetrics().axisHeight;
              var dy = 0.5 * (body.height - axisHeight - (body.depth + axisHeight));
              return buildCommon.makeVList({
                positionType: "shift",
                positionData: dy,
                children: [{
                  type: "elem",
                  elem: body
                }]
              }, options2);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              return new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options2)], ["vcenter"]);
            }
          });
          ;
          defineFunction({
            type: "verb",
            names: ["\\verb"],
            props: {
              numArgs: 0,
              allowedInText: true
            },
            handler: function handler(context2, args, optArgs) {
              throw new src_ParseError("\\verb ended by end of line instead of matching delimiter");
            },
            htmlBuilder: function htmlBuilder2(group, options2) {
              var text = makeVerb(group);
              var body = [];
              var newOptions = options2.havingStyle(options2.style.text());
              for (var i3 = 0; i3 < text.length; i3++) {
                var c3 = text[i3];
                if (c3 === "~") {
                  c3 = "\\textasciitilde";
                }
                body.push(buildCommon.makeSymbol(c3, "Typewriter-Regular", group.mode, newOptions, ["mord", "texttt"]));
              }
              return buildCommon.makeSpan(["mord", "text"].concat(newOptions.sizingClasses(options2)), buildCommon.tryCombineChars(body), newOptions);
            },
            mathmlBuilder: function mathmlBuilder2(group, options2) {
              var text = new mathMLTree.TextNode(makeVerb(group));
              var node = new mathMLTree.MathNode("mtext", [text]);
              node.setAttribute("mathvariant", "monospace");
              return node;
            }
          });
          var makeVerb = function makeVerb2(group) {
            return group.body.replace(/ /g, group.star ? "\u2423" : "\xA0");
          };
          ;
          var functions = _functions;
          var src_functions = functions;
          ;
          var SourceLocation = /* @__PURE__ */ function() {
            function SourceLocation2(lexer, start, end) {
              this.lexer = void 0;
              this.start = void 0;
              this.end = void 0;
              this.lexer = lexer;
              this.start = start;
              this.end = end;
            }
            SourceLocation2.range = function range2(first, second) {
              if (!second) {
                return first && first.loc;
              } else if (!first || !first.loc || !second.loc || first.loc.lexer !== second.loc.lexer) {
                return null;
              } else {
                return new SourceLocation2(first.loc.lexer, first.loc.start, second.loc.end);
              }
            };
            return SourceLocation2;
          }();
          ;
          var Token = /* @__PURE__ */ function() {
            function Token2(text, loc) {
              this.text = void 0;
              this.loc = void 0;
              this.noexpand = void 0;
              this.treatAsRelax = void 0;
              this.text = text;
              this.loc = loc;
            }
            var _proto = Token2.prototype;
            _proto.range = function range2(endToken, text) {
              return new Token2(text, SourceLocation.range(this, endToken));
            };
            return Token2;
          }();
          ;
          var spaceRegexString = "[ \r\n	]";
          var controlWordRegexString = "\\\\[a-zA-Z@]+";
          var controlSymbolRegexString = "\\\\[^\uD800-\uDFFF]";
          var controlWordWhitespaceRegexString = "(" + controlWordRegexString + ")" + spaceRegexString + "*";
          var controlSpaceRegexString = "\\\\(\n|[ \r	]+\n?)[ \r	]*";
          var combiningDiacriticalMarkString = "[\u0300-\u036F]";
          var combiningDiacriticalMarksEndRegex = new RegExp(combiningDiacriticalMarkString + "+$");
          var tokenRegexString = "(" + spaceRegexString + "+)|" + (controlSpaceRegexString + "|") + "([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + (combiningDiacriticalMarkString + "*") + "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + (combiningDiacriticalMarkString + "*") + "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + ("|" + controlWordWhitespaceRegexString) + ("|" + controlSymbolRegexString + ")");
          var Lexer = /* @__PURE__ */ function() {
            function Lexer2(input, settings) {
              this.input = void 0;
              this.settings = void 0;
              this.tokenRegex = void 0;
              this.catcodes = void 0;
              this.input = input;
              this.settings = settings;
              this.tokenRegex = new RegExp(tokenRegexString, "g");
              this.catcodes = {
                "%": 14,
                "~": 13
              };
            }
            var _proto = Lexer2.prototype;
            _proto.setCatcode = function setCatcode(char, code2) {
              this.catcodes[char] = code2;
            };
            _proto.lex = function lex() {
              var input = this.input;
              var pos = this.tokenRegex.lastIndex;
              if (pos === input.length) {
                return new Token("EOF", new SourceLocation(this, pos, pos));
              }
              var match3 = this.tokenRegex.exec(input);
              if (match3 === null || match3.index !== pos) {
                throw new src_ParseError("Unexpected character: '" + input[pos] + "'", new Token(input[pos], new SourceLocation(this, pos, pos + 1)));
              }
              var text = match3[6] || match3[3] || (match3[2] ? "\\ " : " ");
              if (this.catcodes[text] === 14) {
                var nlIndex = input.indexOf("\n", this.tokenRegex.lastIndex);
                if (nlIndex === -1) {
                  this.tokenRegex.lastIndex = input.length;
                  this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)");
                } else {
                  this.tokenRegex.lastIndex = nlIndex + 1;
                }
                return this.lex();
              }
              return new Token(text, new SourceLocation(this, pos, this.tokenRegex.lastIndex));
            };
            return Lexer2;
          }();
          ;
          var Namespace = /* @__PURE__ */ function() {
            function Namespace2(builtins, globalMacros) {
              if (builtins === void 0) {
                builtins = {};
              }
              if (globalMacros === void 0) {
                globalMacros = {};
              }
              this.current = void 0;
              this.builtins = void 0;
              this.undefStack = void 0;
              this.current = globalMacros;
              this.builtins = builtins;
              this.undefStack = [];
            }
            var _proto = Namespace2.prototype;
            _proto.beginGroup = function beginGroup() {
              this.undefStack.push({});
            };
            _proto.endGroup = function endGroup() {
              if (this.undefStack.length === 0) {
                throw new src_ParseError("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
              }
              var undefs = this.undefStack.pop();
              for (var undef in undefs) {
                if (undefs.hasOwnProperty(undef)) {
                  if (undefs[undef] === void 0) {
                    delete this.current[undef];
                  } else {
                    this.current[undef] = undefs[undef];
                  }
                }
              }
            };
            _proto.endGroups = function endGroups() {
              while (this.undefStack.length > 0) {
                this.endGroup();
              }
            };
            _proto.has = function has(name) {
              return this.current.hasOwnProperty(name) || this.builtins.hasOwnProperty(name);
            };
            _proto.get = function get(name) {
              if (this.current.hasOwnProperty(name)) {
                return this.current[name];
              } else {
                return this.builtins[name];
              }
            };
            _proto.set = function set(name, value, global) {
              if (global === void 0) {
                global = false;
              }
              if (global) {
                for (var i3 = 0; i3 < this.undefStack.length; i3++) {
                  delete this.undefStack[i3][name];
                }
                if (this.undefStack.length > 0) {
                  this.undefStack[this.undefStack.length - 1][name] = value;
                }
              } else {
                var top = this.undefStack[this.undefStack.length - 1];
                if (top && !top.hasOwnProperty(name)) {
                  top[name] = this.current[name];
                }
              }
              this.current[name] = value;
            };
            return Namespace2;
          }();
          ;
          var macros = _macros;
          var src_macros = macros;
          defineMacro("\\noexpand", function(context2) {
            var t2 = context2.popToken();
            if (context2.isExpandable(t2.text)) {
              t2.noexpand = true;
              t2.treatAsRelax = true;
            }
            return {
              tokens: [t2],
              numArgs: 0
            };
          });
          defineMacro("\\expandafter", function(context2) {
            var t2 = context2.popToken();
            context2.expandOnce(true);
            return {
              tokens: [t2],
              numArgs: 0
            };
          });
          defineMacro("\\@firstoftwo", function(context2) {
            var args = context2.consumeArgs(2);
            return {
              tokens: args[0],
              numArgs: 0
            };
          });
          defineMacro("\\@secondoftwo", function(context2) {
            var args = context2.consumeArgs(2);
            return {
              tokens: args[1],
              numArgs: 0
            };
          });
          defineMacro("\\@ifnextchar", function(context2) {
            var args = context2.consumeArgs(3);
            context2.consumeSpaces();
            var nextToken = context2.future();
            if (args[0].length === 1 && args[0][0].text === nextToken.text) {
              return {
                tokens: args[1],
                numArgs: 0
              };
            } else {
              return {
                tokens: args[2],
                numArgs: 0
              };
            }
          });
          defineMacro("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
          defineMacro("\\TextOrMath", function(context2) {
            var args = context2.consumeArgs(2);
            if (context2.mode === "text") {
              return {
                tokens: args[0],
                numArgs: 0
              };
            } else {
              return {
                tokens: args[1],
                numArgs: 0
              };
            }
          });
          var digitToNumber = {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "a": 10,
            "A": 10,
            "b": 11,
            "B": 11,
            "c": 12,
            "C": 12,
            "d": 13,
            "D": 13,
            "e": 14,
            "E": 14,
            "f": 15,
            "F": 15
          };
          defineMacro("\\char", function(context2) {
            var token = context2.popToken();
            var base2;
            var number = "";
            if (token.text === "'") {
              base2 = 8;
              token = context2.popToken();
            } else if (token.text === '"') {
              base2 = 16;
              token = context2.popToken();
            } else if (token.text === "`") {
              token = context2.popToken();
              if (token.text[0] === "\\") {
                number = token.text.charCodeAt(1);
              } else if (token.text === "EOF") {
                throw new src_ParseError("\\char` missing argument");
              } else {
                number = token.text.charCodeAt(0);
              }
            } else {
              base2 = 10;
            }
            if (base2) {
              number = digitToNumber[token.text];
              if (number == null || number >= base2) {
                throw new src_ParseError("Invalid base-" + base2 + " digit " + token.text);
              }
              var digit;
              while ((digit = digitToNumber[context2.future().text]) != null && digit < base2) {
                number *= base2;
                number += digit;
                context2.popToken();
              }
            }
            return "\\@char{" + number + "}";
          });
          var newcommand = function newcommand2(context2, existsOK, nonexistsOK) {
            var arg = context2.consumeArg().tokens;
            if (arg.length !== 1) {
              throw new src_ParseError("\\newcommand's first argument must be a macro name");
            }
            var name = arg[0].text;
            var exists = context2.isDefined(name);
            if (exists && !existsOK) {
              throw new src_ParseError("\\newcommand{" + name + "} attempting to redefine " + (name + "; use \\renewcommand"));
            }
            if (!exists && !nonexistsOK) {
              throw new src_ParseError("\\renewcommand{" + name + "} when command " + name + " does not yet exist; use \\newcommand");
            }
            var numArgs = 0;
            arg = context2.consumeArg().tokens;
            if (arg.length === 1 && arg[0].text === "[") {
              var argText = "";
              var token = context2.expandNextToken();
              while (token.text !== "]" && token.text !== "EOF") {
                argText += token.text;
                token = context2.expandNextToken();
              }
              if (!argText.match(/^\s*[0-9]+\s*$/)) {
                throw new src_ParseError("Invalid number of arguments: " + argText);
              }
              numArgs = parseInt(argText);
              arg = context2.consumeArg().tokens;
            }
            context2.macros.set(name, {
              tokens: arg,
              numArgs
            });
            return "";
          };
          defineMacro("\\newcommand", function(context2) {
            return newcommand(context2, false, true);
          });
          defineMacro("\\renewcommand", function(context2) {
            return newcommand(context2, true, false);
          });
          defineMacro("\\providecommand", function(context2) {
            return newcommand(context2, true, true);
          });
          defineMacro("\\message", function(context2) {
            var arg = context2.consumeArgs(1)[0];
            console.log(arg.reverse().map(function(token) {
              return token.text;
            }).join(""));
            return "";
          });
          defineMacro("\\errmessage", function(context2) {
            var arg = context2.consumeArgs(1)[0];
            console.error(arg.reverse().map(function(token) {
              return token.text;
            }).join(""));
            return "";
          });
          defineMacro("\\show", function(context2) {
            var tok = context2.popToken();
            var name = tok.text;
            console.log(tok, context2.macros.get(name), src_functions[name], src_symbols.math[name], src_symbols.text[name]);
            return "";
          });
          defineMacro("\\bgroup", "{");
          defineMacro("\\egroup", "}");
          defineMacro("~", "\\nobreakspace");
          defineMacro("\\lq", "`");
          defineMacro("\\rq", "'");
          defineMacro("\\aa", "\\r a");
          defineMacro("\\AA", "\\r A");
          defineMacro("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`\xA9}");
          defineMacro("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
          defineMacro("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`\xAE}");
          defineMacro("\u212C", "\\mathscr{B}");
          defineMacro("\u2130", "\\mathscr{E}");
          defineMacro("\u2131", "\\mathscr{F}");
          defineMacro("\u210B", "\\mathscr{H}");
          defineMacro("\u2110", "\\mathscr{I}");
          defineMacro("\u2112", "\\mathscr{L}");
          defineMacro("\u2133", "\\mathscr{M}");
          defineMacro("\u211B", "\\mathscr{R}");
          defineMacro("\u212D", "\\mathfrak{C}");
          defineMacro("\u210C", "\\mathfrak{H}");
          defineMacro("\u2128", "\\mathfrak{Z}");
          defineMacro("\\Bbbk", "\\Bbb{k}");
          defineMacro("\xB7", "\\cdotp");
          defineMacro("\\llap", "\\mathllap{\\textrm{#1}}");
          defineMacro("\\rlap", "\\mathrlap{\\textrm{#1}}");
          defineMacro("\\clap", "\\mathclap{\\textrm{#1}}");
          defineMacro("\\mathstrut", "\\vphantom{(}");
          defineMacro("\\underbar", "\\underline{\\text{#1}}");
          defineMacro("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');
          defineMacro("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`\u2260}}");
          defineMacro("\\ne", "\\neq");
          defineMacro("\u2260", "\\neq");
          defineMacro("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`\u2209}}");
          defineMacro("\u2209", "\\notin");
          defineMacro("\u2258", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`\u2258}}");
          defineMacro("\u2259", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}");
          defineMacro("\u225A", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225A}}");
          defineMacro("\u225B", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`\u225B}}");
          defineMacro("\u225D", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`\u225D}}");
          defineMacro("\u225E", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`\u225E}}");
          defineMacro("\u225F", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225F}}");
          defineMacro("\u27C2", "\\perp");
          defineMacro("\u203C", "\\mathclose{!\\mkern-0.8mu!}");
          defineMacro("\u220C", "\\notni");
          defineMacro("\u231C", "\\ulcorner");
          defineMacro("\u231D", "\\urcorner");
          defineMacro("\u231E", "\\llcorner");
          defineMacro("\u231F", "\\lrcorner");
          defineMacro("\xA9", "\\copyright");
          defineMacro("\xAE", "\\textregistered");
          defineMacro("\uFE0F", "\\textregistered");
          defineMacro("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
          defineMacro("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
          defineMacro("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
          defineMacro("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
          defineMacro("\\vdots", "\\mathord{\\varvdots\\rule{0pt}{15pt}}");
          defineMacro("\u22EE", "\\vdots");
          defineMacro("\\varGamma", "\\mathit{\\Gamma}");
          defineMacro("\\varDelta", "\\mathit{\\Delta}");
          defineMacro("\\varTheta", "\\mathit{\\Theta}");
          defineMacro("\\varLambda", "\\mathit{\\Lambda}");
          defineMacro("\\varXi", "\\mathit{\\Xi}");
          defineMacro("\\varPi", "\\mathit{\\Pi}");
          defineMacro("\\varSigma", "\\mathit{\\Sigma}");
          defineMacro("\\varUpsilon", "\\mathit{\\Upsilon}");
          defineMacro("\\varPhi", "\\mathit{\\Phi}");
          defineMacro("\\varPsi", "\\mathit{\\Psi}");
          defineMacro("\\varOmega", "\\mathit{\\Omega}");
          defineMacro("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
          defineMacro("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu");
          defineMacro("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
          defineMacro("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
          defineMacro("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
          defineMacro("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
          var dotsByToken = {
            ",": "\\dotsc",
            "\\not": "\\dotsb",
            "+": "\\dotsb",
            "=": "\\dotsb",
            "<": "\\dotsb",
            ">": "\\dotsb",
            "-": "\\dotsb",
            "*": "\\dotsb",
            ":": "\\dotsb",
            "\\DOTSB": "\\dotsb",
            "\\coprod": "\\dotsb",
            "\\bigvee": "\\dotsb",
            "\\bigwedge": "\\dotsb",
            "\\biguplus": "\\dotsb",
            "\\bigcap": "\\dotsb",
            "\\bigcup": "\\dotsb",
            "\\prod": "\\dotsb",
            "\\sum": "\\dotsb",
            "\\bigotimes": "\\dotsb",
            "\\bigoplus": "\\dotsb",
            "\\bigodot": "\\dotsb",
            "\\bigsqcup": "\\dotsb",
            "\\And": "\\dotsb",
            "\\longrightarrow": "\\dotsb",
            "\\Longrightarrow": "\\dotsb",
            "\\longleftarrow": "\\dotsb",
            "\\Longleftarrow": "\\dotsb",
            "\\longleftrightarrow": "\\dotsb",
            "\\Longleftrightarrow": "\\dotsb",
            "\\mapsto": "\\dotsb",
            "\\longmapsto": "\\dotsb",
            "\\hookrightarrow": "\\dotsb",
            "\\doteq": "\\dotsb",
            "\\mathbin": "\\dotsb",
            "\\mathrel": "\\dotsb",
            "\\relbar": "\\dotsb",
            "\\Relbar": "\\dotsb",
            "\\xrightarrow": "\\dotsb",
            "\\xleftarrow": "\\dotsb",
            "\\DOTSI": "\\dotsi",
            "\\int": "\\dotsi",
            "\\oint": "\\dotsi",
            "\\iint": "\\dotsi",
            "\\iiint": "\\dotsi",
            "\\iiiint": "\\dotsi",
            "\\idotsint": "\\dotsi",
            "\\DOTSX": "\\dotsx"
          };
          defineMacro("\\dots", function(context2) {
            var thedots = "\\dotso";
            var next = context2.expandAfterFuture().text;
            if (next in dotsByToken) {
              thedots = dotsByToken[next];
            } else if (next.substr(0, 4) === "\\not") {
              thedots = "\\dotsb";
            } else if (next in src_symbols.math) {
              if (utils.contains(["bin", "rel"], src_symbols.math[next].group)) {
                thedots = "\\dotsb";
              }
            }
            return thedots;
          });
          var spaceAfterDots = {
            ")": true,
            "]": true,
            "\\rbrack": true,
            "\\}": true,
            "\\rbrace": true,
            "\\rangle": true,
            "\\rceil": true,
            "\\rfloor": true,
            "\\rgroup": true,
            "\\rmoustache": true,
            "\\right": true,
            "\\bigr": true,
            "\\biggr": true,
            "\\Bigr": true,
            "\\Biggr": true,
            "$": true,
            ";": true,
            ".": true,
            ",": true
          };
          defineMacro("\\dotso", function(context2) {
            var next = context2.future().text;
            if (next in spaceAfterDots) {
              return "\\ldots\\,";
            } else {
              return "\\ldots";
            }
          });
          defineMacro("\\dotsc", function(context2) {
            var next = context2.future().text;
            if (next in spaceAfterDots && next !== ",") {
              return "\\ldots\\,";
            } else {
              return "\\ldots";
            }
          });
          defineMacro("\\cdots", function(context2) {
            var next = context2.future().text;
            if (next in spaceAfterDots) {
              return "\\@cdots\\,";
            } else {
              return "\\@cdots";
            }
          });
          defineMacro("\\dotsb", "\\cdots");
          defineMacro("\\dotsm", "\\cdots");
          defineMacro("\\dotsi", "\\!\\cdots");
          defineMacro("\\dotsx", "\\ldots\\,");
          defineMacro("\\DOTSI", "\\relax");
          defineMacro("\\DOTSB", "\\relax");
          defineMacro("\\DOTSX", "\\relax");
          defineMacro("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
          defineMacro("\\,", "\\tmspace+{3mu}{.1667em}");
          defineMacro("\\thinspace", "\\,");
          defineMacro("\\>", "\\mskip{4mu}");
          defineMacro("\\:", "\\tmspace+{4mu}{.2222em}");
          defineMacro("\\medspace", "\\:");
          defineMacro("\\;", "\\tmspace+{5mu}{.2777em}");
          defineMacro("\\thickspace", "\\;");
          defineMacro("\\!", "\\tmspace-{3mu}{.1667em}");
          defineMacro("\\negthinspace", "\\!");
          defineMacro("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
          defineMacro("\\negthickspace", "\\tmspace-{5mu}{.277em}");
          defineMacro("\\enspace", "\\kern.5em ");
          defineMacro("\\enskip", "\\hskip.5em\\relax");
          defineMacro("\\quad", "\\hskip1em\\relax");
          defineMacro("\\qquad", "\\hskip2em\\relax");
          defineMacro("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
          defineMacro("\\tag@paren", "\\tag@literal{({#1})}");
          defineMacro("\\tag@literal", function(context2) {
            if (context2.macros.get("\\df@tag")) {
              throw new src_ParseError("Multiple \\tag");
            }
            return "\\gdef\\df@tag{\\text{#1}}";
          });
          defineMacro("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
          defineMacro("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
          defineMacro("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
          defineMacro("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
          defineMacro("\\pmb", "\\html@mathml{\\@binrel{#1}{\\mathrlap{#1}\\kern0.5px#1}}{\\mathbf{#1}}");
          defineMacro("\\newline", "\\\\\\relax");
          defineMacro("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
          var latexRaiseA = makeEm(fontMetricsData["Main-Regular"]["T".charCodeAt(0)][1] - 0.7 * fontMetricsData["Main-Regular"]["A".charCodeAt(0)][1]);
          defineMacro("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
          defineMacro("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
          defineMacro("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
          defineMacro("\\@hspace", "\\hskip #1\\relax");
          defineMacro("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
          defineMacro("\\ordinarycolon", ":");
          defineMacro("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
          defineMacro("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
          defineMacro("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
          defineMacro("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
          defineMacro("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
          defineMacro("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
          defineMacro("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
          defineMacro("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
          defineMacro("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
          defineMacro("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
          defineMacro("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
          defineMacro("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
          defineMacro("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
          defineMacro("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
          defineMacro("\u2237", "\\dblcolon");
          defineMacro("\u2239", "\\eqcolon");
          defineMacro("\u2254", "\\coloneqq");
          defineMacro("\u2255", "\\eqqcolon");
          defineMacro("\u2A74", "\\Coloneqq");
          defineMacro("\\ratio", "\\vcentcolon");
          defineMacro("\\coloncolon", "\\dblcolon");
          defineMacro("\\colonequals", "\\coloneqq");
          defineMacro("\\coloncolonequals", "\\Coloneqq");
          defineMacro("\\equalscolon", "\\eqqcolon");
          defineMacro("\\equalscoloncolon", "\\Eqqcolon");
          defineMacro("\\colonminus", "\\coloneq");
          defineMacro("\\coloncolonminus", "\\Coloneq");
          defineMacro("\\minuscolon", "\\eqcolon");
          defineMacro("\\minuscoloncolon", "\\Eqcolon");
          defineMacro("\\coloncolonapprox", "\\Colonapprox");
          defineMacro("\\coloncolonsim", "\\Colonsim");
          defineMacro("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
          defineMacro("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
          defineMacro("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
          defineMacro("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
          defineMacro("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220C}}");
          defineMacro("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
          defineMacro("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
          defineMacro("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
          defineMacro("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
          defineMacro("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
          defineMacro("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
          defineMacro("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
          defineMacro("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
          defineMacro("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{\u2269}");
          defineMacro("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{\u2268}");
          defineMacro("\\ngeqq", "\\html@mathml{\\@ngeqq}{\u2271}");
          defineMacro("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{\u2271}");
          defineMacro("\\nleqq", "\\html@mathml{\\@nleqq}{\u2270}");
          defineMacro("\\nleqslant", "\\html@mathml{\\@nleqslant}{\u2270}");
          defineMacro("\\nshortmid", "\\html@mathml{\\@nshortmid}{\u2224}");
          defineMacro("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{\u2226}");
          defineMacro("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{\u2288}");
          defineMacro("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{\u2289}");
          defineMacro("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{\u228A}");
          defineMacro("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{\u2ACB}");
          defineMacro("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{\u228B}");
          defineMacro("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{\u2ACC}");
          defineMacro("\\imath", "\\html@mathml{\\@imath}{\u0131}");
          defineMacro("\\jmath", "\\html@mathml{\\@jmath}{\u0237}");
          defineMacro("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`\u27E6}}");
          defineMacro("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`\u27E7}}");
          defineMacro("\u27E6", "\\llbracket");
          defineMacro("\u27E7", "\\rrbracket");
          defineMacro("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`\u2983}}");
          defineMacro("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`\u2984}}");
          defineMacro("\u2983", "\\lBrace");
          defineMacro("\u2984", "\\rBrace");
          defineMacro("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`\u29B5}}");
          defineMacro("\u29B5", "\\minuso");
          defineMacro("\\darr", "\\downarrow");
          defineMacro("\\dArr", "\\Downarrow");
          defineMacro("\\Darr", "\\Downarrow");
          defineMacro("\\lang", "\\langle");
          defineMacro("\\rang", "\\rangle");
          defineMacro("\\uarr", "\\uparrow");
          defineMacro("\\uArr", "\\Uparrow");
          defineMacro("\\Uarr", "\\Uparrow");
          defineMacro("\\N", "\\mathbb{N}");
          defineMacro("\\R", "\\mathbb{R}");
          defineMacro("\\Z", "\\mathbb{Z}");
          defineMacro("\\alef", "\\aleph");
          defineMacro("\\alefsym", "\\aleph");
          defineMacro("\\Alpha", "\\mathrm{A}");
          defineMacro("\\Beta", "\\mathrm{B}");
          defineMacro("\\bull", "\\bullet");
          defineMacro("\\Chi", "\\mathrm{X}");
          defineMacro("\\clubs", "\\clubsuit");
          defineMacro("\\cnums", "\\mathbb{C}");
          defineMacro("\\Complex", "\\mathbb{C}");
          defineMacro("\\Dagger", "\\ddagger");
          defineMacro("\\diamonds", "\\diamondsuit");
          defineMacro("\\empty", "\\emptyset");
          defineMacro("\\Epsilon", "\\mathrm{E}");
          defineMacro("\\Eta", "\\mathrm{H}");
          defineMacro("\\exist", "\\exists");
          defineMacro("\\harr", "\\leftrightarrow");
          defineMacro("\\hArr", "\\Leftrightarrow");
          defineMacro("\\Harr", "\\Leftrightarrow");
          defineMacro("\\hearts", "\\heartsuit");
          defineMacro("\\image", "\\Im");
          defineMacro("\\infin", "\\infty");
          defineMacro("\\Iota", "\\mathrm{I}");
          defineMacro("\\isin", "\\in");
          defineMacro("\\Kappa", "\\mathrm{K}");
          defineMacro("\\larr", "\\leftarrow");
          defineMacro("\\lArr", "\\Leftarrow");
          defineMacro("\\Larr", "\\Leftarrow");
          defineMacro("\\lrarr", "\\leftrightarrow");
          defineMacro("\\lrArr", "\\Leftrightarrow");
          defineMacro("\\Lrarr", "\\Leftrightarrow");
          defineMacro("\\Mu", "\\mathrm{M}");
          defineMacro("\\natnums", "\\mathbb{N}");
          defineMacro("\\Nu", "\\mathrm{N}");
          defineMacro("\\Omicron", "\\mathrm{O}");
          defineMacro("\\plusmn", "\\pm");
          defineMacro("\\rarr", "\\rightarrow");
          defineMacro("\\rArr", "\\Rightarrow");
          defineMacro("\\Rarr", "\\Rightarrow");
          defineMacro("\\real", "\\Re");
          defineMacro("\\reals", "\\mathbb{R}");
          defineMacro("\\Reals", "\\mathbb{R}");
          defineMacro("\\Rho", "\\mathrm{P}");
          defineMacro("\\sdot", "\\cdot");
          defineMacro("\\sect", "\\S");
          defineMacro("\\spades", "\\spadesuit");
          defineMacro("\\sub", "\\subset");
          defineMacro("\\sube", "\\subseteq");
          defineMacro("\\supe", "\\supseteq");
          defineMacro("\\Tau", "\\mathrm{T}");
          defineMacro("\\thetasym", "\\vartheta");
          defineMacro("\\weierp", "\\wp");
          defineMacro("\\Zeta", "\\mathrm{Z}");
          defineMacro("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
          defineMacro("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
          defineMacro("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
          defineMacro("\\bra", "\\mathinner{\\langle{#1}|}");
          defineMacro("\\ket", "\\mathinner{|{#1}\\rangle}");
          defineMacro("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
          defineMacro("\\Bra", "\\left\\langle#1\\right|");
          defineMacro("\\Ket", "\\left|#1\\right\\rangle");
          defineMacro("\\angln", "{\\angl n}");
          defineMacro("\\blue", "\\textcolor{##6495ed}{#1}");
          defineMacro("\\orange", "\\textcolor{##ffa500}{#1}");
          defineMacro("\\pink", "\\textcolor{##ff00af}{#1}");
          defineMacro("\\red", "\\textcolor{##df0030}{#1}");
          defineMacro("\\green", "\\textcolor{##28ae7b}{#1}");
          defineMacro("\\gray", "\\textcolor{gray}{#1}");
          defineMacro("\\purple", "\\textcolor{##9d38bd}{#1}");
          defineMacro("\\blueA", "\\textcolor{##ccfaff}{#1}");
          defineMacro("\\blueB", "\\textcolor{##80f6ff}{#1}");
          defineMacro("\\blueC", "\\textcolor{##63d9ea}{#1}");
          defineMacro("\\blueD", "\\textcolor{##11accd}{#1}");
          defineMacro("\\blueE", "\\textcolor{##0c7f99}{#1}");
          defineMacro("\\tealA", "\\textcolor{##94fff5}{#1}");
          defineMacro("\\tealB", "\\textcolor{##26edd5}{#1}");
          defineMacro("\\tealC", "\\textcolor{##01d1c1}{#1}");
          defineMacro("\\tealD", "\\textcolor{##01a995}{#1}");
          defineMacro("\\tealE", "\\textcolor{##208170}{#1}");
          defineMacro("\\greenA", "\\textcolor{##b6ffb0}{#1}");
          defineMacro("\\greenB", "\\textcolor{##8af281}{#1}");
          defineMacro("\\greenC", "\\textcolor{##74cf70}{#1}");
          defineMacro("\\greenD", "\\textcolor{##1fab54}{#1}");
          defineMacro("\\greenE", "\\textcolor{##0d923f}{#1}");
          defineMacro("\\goldA", "\\textcolor{##ffd0a9}{#1}");
          defineMacro("\\goldB", "\\textcolor{##ffbb71}{#1}");
          defineMacro("\\goldC", "\\textcolor{##ff9c39}{#1}");
          defineMacro("\\goldD", "\\textcolor{##e07d10}{#1}");
          defineMacro("\\goldE", "\\textcolor{##a75a05}{#1}");
          defineMacro("\\redA", "\\textcolor{##fca9a9}{#1}");
          defineMacro("\\redB", "\\textcolor{##ff8482}{#1}");
          defineMacro("\\redC", "\\textcolor{##f9685d}{#1}");
          defineMacro("\\redD", "\\textcolor{##e84d39}{#1}");
          defineMacro("\\redE", "\\textcolor{##bc2612}{#1}");
          defineMacro("\\maroonA", "\\textcolor{##ffbde0}{#1}");
          defineMacro("\\maroonB", "\\textcolor{##ff92c6}{#1}");
          defineMacro("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
          defineMacro("\\maroonD", "\\textcolor{##ca337c}{#1}");
          defineMacro("\\maroonE", "\\textcolor{##9e034e}{#1}");
          defineMacro("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
          defineMacro("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
          defineMacro("\\purpleC", "\\textcolor{##aa87ff}{#1}");
          defineMacro("\\purpleD", "\\textcolor{##7854ab}{#1}");
          defineMacro("\\purpleE", "\\textcolor{##543b78}{#1}");
          defineMacro("\\mintA", "\\textcolor{##f5f9e8}{#1}");
          defineMacro("\\mintB", "\\textcolor{##edf2df}{#1}");
          defineMacro("\\mintC", "\\textcolor{##e0e5cc}{#1}");
          defineMacro("\\grayA", "\\textcolor{##f6f7f7}{#1}");
          defineMacro("\\grayB", "\\textcolor{##f0f1f2}{#1}");
          defineMacro("\\grayC", "\\textcolor{##e3e5e6}{#1}");
          defineMacro("\\grayD", "\\textcolor{##d6d8da}{#1}");
          defineMacro("\\grayE", "\\textcolor{##babec2}{#1}");
          defineMacro("\\grayF", "\\textcolor{##888d93}{#1}");
          defineMacro("\\grayG", "\\textcolor{##626569}{#1}");
          defineMacro("\\grayH", "\\textcolor{##3b3e40}{#1}");
          defineMacro("\\grayI", "\\textcolor{##21242c}{#1}");
          defineMacro("\\kaBlue", "\\textcolor{##314453}{#1}");
          defineMacro("\\kaGreen", "\\textcolor{##71B307}{#1}");
          ;
          var implicitCommands = {
            "\\relax": true,
            "^": true,
            "_": true,
            "\\limits": true,
            "\\nolimits": true
          };
          var MacroExpander = /* @__PURE__ */ function() {
            function MacroExpander2(input, settings, mode) {
              this.settings = void 0;
              this.expansionCount = void 0;
              this.lexer = void 0;
              this.macros = void 0;
              this.stack = void 0;
              this.mode = void 0;
              this.settings = settings;
              this.expansionCount = 0;
              this.feed(input);
              this.macros = new Namespace(src_macros, settings.macros);
              this.mode = mode;
              this.stack = [];
            }
            var _proto = MacroExpander2.prototype;
            _proto.feed = function feed(input) {
              this.lexer = new Lexer(input, this.settings);
            };
            _proto.switchMode = function switchMode(newMode) {
              this.mode = newMode;
            };
            _proto.beginGroup = function beginGroup() {
              this.macros.beginGroup();
            };
            _proto.endGroup = function endGroup() {
              this.macros.endGroup();
            };
            _proto.endGroups = function endGroups() {
              this.macros.endGroups();
            };
            _proto.future = function future() {
              if (this.stack.length === 0) {
                this.pushToken(this.lexer.lex());
              }
              return this.stack[this.stack.length - 1];
            };
            _proto.popToken = function popToken() {
              this.future();
              return this.stack.pop();
            };
            _proto.pushToken = function pushToken(token) {
              this.stack.push(token);
            };
            _proto.pushTokens = function pushTokens(tokens) {
              var _this$stack;
              (_this$stack = this.stack).push.apply(_this$stack, tokens);
            };
            _proto.scanArgument = function scanArgument(isOptional) {
              var start;
              var end;
              var tokens;
              if (isOptional) {
                this.consumeSpaces();
                if (this.future().text !== "[") {
                  return null;
                }
                start = this.popToken();
                var _this$consumeArg = this.consumeArg(["]"]);
                tokens = _this$consumeArg.tokens;
                end = _this$consumeArg.end;
              } else {
                var _this$consumeArg2 = this.consumeArg();
                tokens = _this$consumeArg2.tokens;
                start = _this$consumeArg2.start;
                end = _this$consumeArg2.end;
              }
              this.pushToken(new Token("EOF", end.loc));
              this.pushTokens(tokens);
              return start.range(end, "");
            };
            _proto.consumeSpaces = function consumeSpaces() {
              for (; ; ) {
                var token = this.future();
                if (token.text === " ") {
                  this.stack.pop();
                } else {
                  break;
                }
              }
            };
            _proto.consumeArg = function consumeArg(delims) {
              var tokens = [];
              var isDelimited = delims && delims.length > 0;
              if (!isDelimited) {
                this.consumeSpaces();
              }
              var start = this.future();
              var tok;
              var depth = 0;
              var match3 = 0;
              do {
                tok = this.popToken();
                tokens.push(tok);
                if (tok.text === "{") {
                  ++depth;
                } else if (tok.text === "}") {
                  --depth;
                  if (depth === -1) {
                    throw new src_ParseError("Extra }", tok);
                  }
                } else if (tok.text === "EOF") {
                  throw new src_ParseError("Unexpected end of input in a macro argument, expected '" + (delims && isDelimited ? delims[match3] : "}") + "'", tok);
                }
                if (delims && isDelimited) {
                  if ((depth === 0 || depth === 1 && delims[match3] === "{") && tok.text === delims[match3]) {
                    ++match3;
                    if (match3 === delims.length) {
                      tokens.splice(-match3, match3);
                      break;
                    }
                  } else {
                    match3 = 0;
                  }
                }
              } while (depth !== 0 || isDelimited);
              if (start.text === "{" && tokens[tokens.length - 1].text === "}") {
                tokens.pop();
                tokens.shift();
              }
              tokens.reverse();
              return {
                tokens,
                start,
                end: tok
              };
            };
            _proto.consumeArgs = function consumeArgs(numArgs, delimiters2) {
              if (delimiters2) {
                if (delimiters2.length !== numArgs + 1) {
                  throw new src_ParseError("The length of delimiters doesn't match the number of args!");
                }
                var delims = delimiters2[0];
                for (var i3 = 0; i3 < delims.length; i3++) {
                  var tok = this.popToken();
                  if (delims[i3] !== tok.text) {
                    throw new src_ParseError("Use of the macro doesn't match its definition", tok);
                  }
                }
              }
              var args = [];
              for (var _i6 = 0; _i6 < numArgs; _i6++) {
                args.push(this.consumeArg(delimiters2 && delimiters2[_i6 + 1]).tokens);
              }
              return args;
            };
            _proto.expandOnce = function expandOnce(expandableOnly) {
              var topToken = this.popToken();
              var name = topToken.text;
              var expansion = !topToken.noexpand ? this._getExpansion(name) : null;
              if (expansion == null || expandableOnly && expansion.unexpandable) {
                if (expandableOnly && expansion == null && name[0] === "\\" && !this.isDefined(name)) {
                  throw new src_ParseError("Undefined control sequence: " + name);
                }
                this.pushToken(topToken);
                return topToken;
              }
              this.expansionCount++;
              if (this.expansionCount > this.settings.maxExpand) {
                throw new src_ParseError("Too many expansions: infinite loop or need to increase maxExpand setting");
              }
              var tokens = expansion.tokens;
              var args = this.consumeArgs(expansion.numArgs, expansion.delimiters);
              if (expansion.numArgs) {
                tokens = tokens.slice();
                for (var i3 = tokens.length - 1; i3 >= 0; --i3) {
                  var tok = tokens[i3];
                  if (tok.text === "#") {
                    if (i3 === 0) {
                      throw new src_ParseError("Incomplete placeholder at end of macro body", tok);
                    }
                    tok = tokens[--i3];
                    if (tok.text === "#") {
                      tokens.splice(i3 + 1, 1);
                    } else if (/^[1-9]$/.test(tok.text)) {
                      var _tokens;
                      (_tokens = tokens).splice.apply(_tokens, [i3, 2].concat(args[+tok.text - 1]));
                    } else {
                      throw new src_ParseError("Not a valid argument number", tok);
                    }
                  }
                }
              }
              this.pushTokens(tokens);
              return tokens;
            };
            _proto.expandAfterFuture = function expandAfterFuture() {
              this.expandOnce();
              return this.future();
            };
            _proto.expandNextToken = function expandNextToken() {
              for (; ; ) {
                var expanded = this.expandOnce();
                if (expanded instanceof Token) {
                  if (expanded.text === "\\relax" || expanded.treatAsRelax) {
                    this.stack.pop();
                  } else {
                    return this.stack.pop();
                  }
                }
              }
              throw new Error();
            };
            _proto.expandMacro = function expandMacro(name) {
              return this.macros.has(name) ? this.expandTokens([new Token(name)]) : void 0;
            };
            _proto.expandTokens = function expandTokens(tokens) {
              var output = [];
              var oldStackLength = this.stack.length;
              this.pushTokens(tokens);
              while (this.stack.length > oldStackLength) {
                var expanded = this.expandOnce(true);
                if (expanded instanceof Token) {
                  if (expanded.treatAsRelax) {
                    expanded.noexpand = false;
                    expanded.treatAsRelax = false;
                  }
                  output.push(this.stack.pop());
                }
              }
              return output;
            };
            _proto.expandMacroAsText = function expandMacroAsText(name) {
              var tokens = this.expandMacro(name);
              if (tokens) {
                return tokens.map(function(token) {
                  return token.text;
                }).join("");
              } else {
                return tokens;
              }
            };
            _proto._getExpansion = function _getExpansion(name) {
              var definition = this.macros.get(name);
              if (definition == null) {
                return definition;
              }
              if (name.length === 1) {
                var catcode = this.lexer.catcodes[name];
                if (catcode != null && catcode !== 13) {
                  return;
                }
              }
              var expansion = typeof definition === "function" ? definition(this) : definition;
              if (typeof expansion === "string") {
                var numArgs = 0;
                if (expansion.indexOf("#") !== -1) {
                  var stripped = expansion.replace(/##/g, "");
                  while (stripped.indexOf("#" + (numArgs + 1)) !== -1) {
                    ++numArgs;
                  }
                }
                var bodyLexer = new Lexer(expansion, this.settings);
                var tokens = [];
                var tok = bodyLexer.lex();
                while (tok.text !== "EOF") {
                  tokens.push(tok);
                  tok = bodyLexer.lex();
                }
                tokens.reverse();
                var expanded = {
                  tokens,
                  numArgs
                };
                return expanded;
              }
              return expansion;
            };
            _proto.isDefined = function isDefined(name) {
              return this.macros.has(name) || src_functions.hasOwnProperty(name) || src_symbols.math.hasOwnProperty(name) || src_symbols.text.hasOwnProperty(name) || implicitCommands.hasOwnProperty(name);
            };
            _proto.isExpandable = function isExpandable(name) {
              var macro = this.macros.get(name);
              return macro != null ? typeof macro === "string" || typeof macro === "function" || !macro.unexpandable : src_functions.hasOwnProperty(name) && !src_functions[name].primitive;
            };
            return MacroExpander2;
          }();
          ;
          var unicodeAccents = {
            "\u0301": {
              "text": "\\'",
              "math": "\\acute"
            },
            "\u0300": {
              "text": "\\`",
              "math": "\\grave"
            },
            "\u0308": {
              "text": '\\"',
              "math": "\\ddot"
            },
            "\u0303": {
              "text": "\\~",
              "math": "\\tilde"
            },
            "\u0304": {
              "text": "\\=",
              "math": "\\bar"
            },
            "\u0306": {
              "text": "\\u",
              "math": "\\breve"
            },
            "\u030C": {
              "text": "\\v",
              "math": "\\check"
            },
            "\u0302": {
              "text": "\\^",
              "math": "\\hat"
            },
            "\u0307": {
              "text": "\\.",
              "math": "\\dot"
            },
            "\u030A": {
              "text": "\\r",
              "math": "\\mathring"
            },
            "\u030B": {
              "text": "\\H"
            },
            "\u0327": {
              "text": "\\c"
            }
          };
          var unicodeSymbols = {
            "\xE1": "a\u0301",
            "\xE0": "a\u0300",
            "\xE4": "a\u0308",
            "\u01DF": "a\u0308\u0304",
            "\xE3": "a\u0303",
            "\u0101": "a\u0304",
            "\u0103": "a\u0306",
            "\u1EAF": "a\u0306\u0301",
            "\u1EB1": "a\u0306\u0300",
            "\u1EB5": "a\u0306\u0303",
            "\u01CE": "a\u030C",
            "\xE2": "a\u0302",
            "\u1EA5": "a\u0302\u0301",
            "\u1EA7": "a\u0302\u0300",
            "\u1EAB": "a\u0302\u0303",
            "\u0227": "a\u0307",
            "\u01E1": "a\u0307\u0304",
            "\xE5": "a\u030A",
            "\u01FB": "a\u030A\u0301",
            "\u1E03": "b\u0307",
            "\u0107": "c\u0301",
            "\u1E09": "c\u0327\u0301",
            "\u010D": "c\u030C",
            "\u0109": "c\u0302",
            "\u010B": "c\u0307",
            "\xE7": "c\u0327",
            "\u010F": "d\u030C",
            "\u1E0B": "d\u0307",
            "\u1E11": "d\u0327",
            "\xE9": "e\u0301",
            "\xE8": "e\u0300",
            "\xEB": "e\u0308",
            "\u1EBD": "e\u0303",
            "\u0113": "e\u0304",
            "\u1E17": "e\u0304\u0301",
            "\u1E15": "e\u0304\u0300",
            "\u0115": "e\u0306",
            "\u1E1D": "e\u0327\u0306",
            "\u011B": "e\u030C",
            "\xEA": "e\u0302",
            "\u1EBF": "e\u0302\u0301",
            "\u1EC1": "e\u0302\u0300",
            "\u1EC5": "e\u0302\u0303",
            "\u0117": "e\u0307",
            "\u0229": "e\u0327",
            "\u1E1F": "f\u0307",
            "\u01F5": "g\u0301",
            "\u1E21": "g\u0304",
            "\u011F": "g\u0306",
            "\u01E7": "g\u030C",
            "\u011D": "g\u0302",
            "\u0121": "g\u0307",
            "\u0123": "g\u0327",
            "\u1E27": "h\u0308",
            "\u021F": "h\u030C",
            "\u0125": "h\u0302",
            "\u1E23": "h\u0307",
            "\u1E29": "h\u0327",
            "\xED": "i\u0301",
            "\xEC": "i\u0300",
            "\xEF": "i\u0308",
            "\u1E2F": "i\u0308\u0301",
            "\u0129": "i\u0303",
            "\u012B": "i\u0304",
            "\u012D": "i\u0306",
            "\u01D0": "i\u030C",
            "\xEE": "i\u0302",
            "\u01F0": "j\u030C",
            "\u0135": "j\u0302",
            "\u1E31": "k\u0301",
            "\u01E9": "k\u030C",
            "\u0137": "k\u0327",
            "\u013A": "l\u0301",
            "\u013E": "l\u030C",
            "\u013C": "l\u0327",
            "\u1E3F": "m\u0301",
            "\u1E41": "m\u0307",
            "\u0144": "n\u0301",
            "\u01F9": "n\u0300",
            "\xF1": "n\u0303",
            "\u0148": "n\u030C",
            "\u1E45": "n\u0307",
            "\u0146": "n\u0327",
            "\xF3": "o\u0301",
            "\xF2": "o\u0300",
            "\xF6": "o\u0308",
            "\u022B": "o\u0308\u0304",
            "\xF5": "o\u0303",
            "\u1E4D": "o\u0303\u0301",
            "\u1E4F": "o\u0303\u0308",
            "\u022D": "o\u0303\u0304",
            "\u014D": "o\u0304",
            "\u1E53": "o\u0304\u0301",
            "\u1E51": "o\u0304\u0300",
            "\u014F": "o\u0306",
            "\u01D2": "o\u030C",
            "\xF4": "o\u0302",
            "\u1ED1": "o\u0302\u0301",
            "\u1ED3": "o\u0302\u0300",
            "\u1ED7": "o\u0302\u0303",
            "\u022F": "o\u0307",
            "\u0231": "o\u0307\u0304",
            "\u0151": "o\u030B",
            "\u1E55": "p\u0301",
            "\u1E57": "p\u0307",
            "\u0155": "r\u0301",
            "\u0159": "r\u030C",
            "\u1E59": "r\u0307",
            "\u0157": "r\u0327",
            "\u015B": "s\u0301",
            "\u1E65": "s\u0301\u0307",
            "\u0161": "s\u030C",
            "\u1E67": "s\u030C\u0307",
            "\u015D": "s\u0302",
            "\u1E61": "s\u0307",
            "\u015F": "s\u0327",
            "\u1E97": "t\u0308",
            "\u0165": "t\u030C",
            "\u1E6B": "t\u0307",
            "\u0163": "t\u0327",
            "\xFA": "u\u0301",
            "\xF9": "u\u0300",
            "\xFC": "u\u0308",
            "\u01D8": "u\u0308\u0301",
            "\u01DC": "u\u0308\u0300",
            "\u01D6": "u\u0308\u0304",
            "\u01DA": "u\u0308\u030C",
            "\u0169": "u\u0303",
            "\u1E79": "u\u0303\u0301",
            "\u016B": "u\u0304",
            "\u1E7B": "u\u0304\u0308",
            "\u016D": "u\u0306",
            "\u01D4": "u\u030C",
            "\xFB": "u\u0302",
            "\u016F": "u\u030A",
            "\u0171": "u\u030B",
            "\u1E7D": "v\u0303",
            "\u1E83": "w\u0301",
            "\u1E81": "w\u0300",
            "\u1E85": "w\u0308",
            "\u0175": "w\u0302",
            "\u1E87": "w\u0307",
            "\u1E98": "w\u030A",
            "\u1E8D": "x\u0308",
            "\u1E8B": "x\u0307",
            "\xFD": "y\u0301",
            "\u1EF3": "y\u0300",
            "\xFF": "y\u0308",
            "\u1EF9": "y\u0303",
            "\u0233": "y\u0304",
            "\u0177": "y\u0302",
            "\u1E8F": "y\u0307",
            "\u1E99": "y\u030A",
            "\u017A": "z\u0301",
            "\u017E": "z\u030C",
            "\u1E91": "z\u0302",
            "\u017C": "z\u0307",
            "\xC1": "A\u0301",
            "\xC0": "A\u0300",
            "\xC4": "A\u0308",
            "\u01DE": "A\u0308\u0304",
            "\xC3": "A\u0303",
            "\u0100": "A\u0304",
            "\u0102": "A\u0306",
            "\u1EAE": "A\u0306\u0301",
            "\u1EB0": "A\u0306\u0300",
            "\u1EB4": "A\u0306\u0303",
            "\u01CD": "A\u030C",
            "\xC2": "A\u0302",
            "\u1EA4": "A\u0302\u0301",
            "\u1EA6": "A\u0302\u0300",
            "\u1EAA": "A\u0302\u0303",
            "\u0226": "A\u0307",
            "\u01E0": "A\u0307\u0304",
            "\xC5": "A\u030A",
            "\u01FA": "A\u030A\u0301",
            "\u1E02": "B\u0307",
            "\u0106": "C\u0301",
            "\u1E08": "C\u0327\u0301",
            "\u010C": "C\u030C",
            "\u0108": "C\u0302",
            "\u010A": "C\u0307",
            "\xC7": "C\u0327",
            "\u010E": "D\u030C",
            "\u1E0A": "D\u0307",
            "\u1E10": "D\u0327",
            "\xC9": "E\u0301",
            "\xC8": "E\u0300",
            "\xCB": "E\u0308",
            "\u1EBC": "E\u0303",
            "\u0112": "E\u0304",
            "\u1E16": "E\u0304\u0301",
            "\u1E14": "E\u0304\u0300",
            "\u0114": "E\u0306",
            "\u1E1C": "E\u0327\u0306",
            "\u011A": "E\u030C",
            "\xCA": "E\u0302",
            "\u1EBE": "E\u0302\u0301",
            "\u1EC0": "E\u0302\u0300",
            "\u1EC4": "E\u0302\u0303",
            "\u0116": "E\u0307",
            "\u0228": "E\u0327",
            "\u1E1E": "F\u0307",
            "\u01F4": "G\u0301",
            "\u1E20": "G\u0304",
            "\u011E": "G\u0306",
            "\u01E6": "G\u030C",
            "\u011C": "G\u0302",
            "\u0120": "G\u0307",
            "\u0122": "G\u0327",
            "\u1E26": "H\u0308",
            "\u021E": "H\u030C",
            "\u0124": "H\u0302",
            "\u1E22": "H\u0307",
            "\u1E28": "H\u0327",
            "\xCD": "I\u0301",
            "\xCC": "I\u0300",
            "\xCF": "I\u0308",
            "\u1E2E": "I\u0308\u0301",
            "\u0128": "I\u0303",
            "\u012A": "I\u0304",
            "\u012C": "I\u0306",
            "\u01CF": "I\u030C",
            "\xCE": "I\u0302",
            "\u0130": "I\u0307",
            "\u0134": "J\u0302",
            "\u1E30": "K\u0301",
            "\u01E8": "K\u030C",
            "\u0136": "K\u0327",
            "\u0139": "L\u0301",
            "\u013D": "L\u030C",
            "\u013B": "L\u0327",
            "\u1E3E": "M\u0301",
            "\u1E40": "M\u0307",
            "\u0143": "N\u0301",
            "\u01F8": "N\u0300",
            "\xD1": "N\u0303",
            "\u0147": "N\u030C",
            "\u1E44": "N\u0307",
            "\u0145": "N\u0327",
            "\xD3": "O\u0301",
            "\xD2": "O\u0300",
            "\xD6": "O\u0308",
            "\u022A": "O\u0308\u0304",
            "\xD5": "O\u0303",
            "\u1E4C": "O\u0303\u0301",
            "\u1E4E": "O\u0303\u0308",
            "\u022C": "O\u0303\u0304",
            "\u014C": "O\u0304",
            "\u1E52": "O\u0304\u0301",
            "\u1E50": "O\u0304\u0300",
            "\u014E": "O\u0306",
            "\u01D1": "O\u030C",
            "\xD4": "O\u0302",
            "\u1ED0": "O\u0302\u0301",
            "\u1ED2": "O\u0302\u0300",
            "\u1ED6": "O\u0302\u0303",
            "\u022E": "O\u0307",
            "\u0230": "O\u0307\u0304",
            "\u0150": "O\u030B",
            "\u1E54": "P\u0301",
            "\u1E56": "P\u0307",
            "\u0154": "R\u0301",
            "\u0158": "R\u030C",
            "\u1E58": "R\u0307",
            "\u0156": "R\u0327",
            "\u015A": "S\u0301",
            "\u1E64": "S\u0301\u0307",
            "\u0160": "S\u030C",
            "\u1E66": "S\u030C\u0307",
            "\u015C": "S\u0302",
            "\u1E60": "S\u0307",
            "\u015E": "S\u0327",
            "\u0164": "T\u030C",
            "\u1E6A": "T\u0307",
            "\u0162": "T\u0327",
            "\xDA": "U\u0301",
            "\xD9": "U\u0300",
            "\xDC": "U\u0308",
            "\u01D7": "U\u0308\u0301",
            "\u01DB": "U\u0308\u0300",
            "\u01D5": "U\u0308\u0304",
            "\u01D9": "U\u0308\u030C",
            "\u0168": "U\u0303",
            "\u1E78": "U\u0303\u0301",
            "\u016A": "U\u0304",
            "\u1E7A": "U\u0304\u0308",
            "\u016C": "U\u0306",
            "\u01D3": "U\u030C",
            "\xDB": "U\u0302",
            "\u016E": "U\u030A",
            "\u0170": "U\u030B",
            "\u1E7C": "V\u0303",
            "\u1E82": "W\u0301",
            "\u1E80": "W\u0300",
            "\u1E84": "W\u0308",
            "\u0174": "W\u0302",
            "\u1E86": "W\u0307",
            "\u1E8C": "X\u0308",
            "\u1E8A": "X\u0307",
            "\xDD": "Y\u0301",
            "\u1EF2": "Y\u0300",
            "\u0178": "Y\u0308",
            "\u1EF8": "Y\u0303",
            "\u0232": "Y\u0304",
            "\u0176": "Y\u0302",
            "\u1E8E": "Y\u0307",
            "\u0179": "Z\u0301",
            "\u017D": "Z\u030C",
            "\u1E90": "Z\u0302",
            "\u017B": "Z\u0307",
            "\u03AC": "\u03B1\u0301",
            "\u1F70": "\u03B1\u0300",
            "\u1FB1": "\u03B1\u0304",
            "\u1FB0": "\u03B1\u0306",
            "\u03AD": "\u03B5\u0301",
            "\u1F72": "\u03B5\u0300",
            "\u03AE": "\u03B7\u0301",
            "\u1F74": "\u03B7\u0300",
            "\u03AF": "\u03B9\u0301",
            "\u1F76": "\u03B9\u0300",
            "\u03CA": "\u03B9\u0308",
            "\u0390": "\u03B9\u0308\u0301",
            "\u1FD2": "\u03B9\u0308\u0300",
            "\u1FD1": "\u03B9\u0304",
            "\u1FD0": "\u03B9\u0306",
            "\u03CC": "\u03BF\u0301",
            "\u1F78": "\u03BF\u0300",
            "\u03CD": "\u03C5\u0301",
            "\u1F7A": "\u03C5\u0300",
            "\u03CB": "\u03C5\u0308",
            "\u03B0": "\u03C5\u0308\u0301",
            "\u1FE2": "\u03C5\u0308\u0300",
            "\u1FE1": "\u03C5\u0304",
            "\u1FE0": "\u03C5\u0306",
            "\u03CE": "\u03C9\u0301",
            "\u1F7C": "\u03C9\u0300",
            "\u038E": "\u03A5\u0301",
            "\u1FEA": "\u03A5\u0300",
            "\u03AB": "\u03A5\u0308",
            "\u1FE9": "\u03A5\u0304",
            "\u1FE8": "\u03A5\u0306",
            "\u038F": "\u03A9\u0301",
            "\u1FFA": "\u03A9\u0300"
          };
          var Parser = /* @__PURE__ */ function() {
            function Parser2(input, settings) {
              this.mode = void 0;
              this.gullet = void 0;
              this.settings = void 0;
              this.leftrightDepth = void 0;
              this.nextToken = void 0;
              this.mode = "math";
              this.gullet = new MacroExpander(input, settings, this.mode);
              this.settings = settings;
              this.leftrightDepth = 0;
            }
            var _proto = Parser2.prototype;
            _proto.expect = function expect(text, consume) {
              if (consume === void 0) {
                consume = true;
              }
              if (this.fetch().text !== text) {
                throw new src_ParseError("Expected '" + text + "', got '" + this.fetch().text + "'", this.fetch());
              }
              if (consume) {
                this.consume();
              }
            };
            _proto.consume = function consume() {
              this.nextToken = null;
            };
            _proto.fetch = function fetch() {
              if (this.nextToken == null) {
                this.nextToken = this.gullet.expandNextToken();
              }
              return this.nextToken;
            };
            _proto.switchMode = function switchMode(newMode) {
              this.mode = newMode;
              this.gullet.switchMode(newMode);
            };
            _proto.parse = function parse() {
              if (!this.settings.globalGroup) {
                this.gullet.beginGroup();
              }
              if (this.settings.colorIsTextColor) {
                this.gullet.macros.set("\\color", "\\textcolor");
              }
              try {
                var parse2 = this.parseExpression(false);
                this.expect("EOF");
                if (!this.settings.globalGroup) {
                  this.gullet.endGroup();
                }
                return parse2;
              } finally {
                this.gullet.endGroups();
              }
            };
            _proto.parseExpression = function parseExpression(breakOnInfix, breakOnTokenText) {
              var body = [];
              while (true) {
                if (this.mode === "math") {
                  this.consumeSpaces();
                }
                var lex = this.fetch();
                if (Parser2.endOfExpression.indexOf(lex.text) !== -1) {
                  break;
                }
                if (breakOnTokenText && lex.text === breakOnTokenText) {
                  break;
                }
                if (breakOnInfix && src_functions[lex.text] && src_functions[lex.text].infix) {
                  break;
                }
                var atom = this.parseAtom(breakOnTokenText);
                if (!atom) {
                  break;
                } else if (atom.type === "internal") {
                  continue;
                }
                body.push(atom);
              }
              if (this.mode === "text") {
                this.formLigatures(body);
              }
              return this.handleInfixNodes(body);
            };
            _proto.handleInfixNodes = function handleInfixNodes(body) {
              var overIndex = -1;
              var funcName;
              for (var i3 = 0; i3 < body.length; i3++) {
                if (body[i3].type === "infix") {
                  if (overIndex !== -1) {
                    throw new src_ParseError("only one infix operator per group", body[i3].token);
                  }
                  overIndex = i3;
                  funcName = body[i3].replaceWith;
                }
              }
              if (overIndex !== -1 && funcName) {
                var numerNode;
                var denomNode;
                var numerBody = body.slice(0, overIndex);
                var denomBody = body.slice(overIndex + 1);
                if (numerBody.length === 1 && numerBody[0].type === "ordgroup") {
                  numerNode = numerBody[0];
                } else {
                  numerNode = {
                    type: "ordgroup",
                    mode: this.mode,
                    body: numerBody
                  };
                }
                if (denomBody.length === 1 && denomBody[0].type === "ordgroup") {
                  denomNode = denomBody[0];
                } else {
                  denomNode = {
                    type: "ordgroup",
                    mode: this.mode,
                    body: denomBody
                  };
                }
                var node;
                if (funcName === "\\\\abovefrac") {
                  node = this.callFunction(funcName, [numerNode, body[overIndex], denomNode], []);
                } else {
                  node = this.callFunction(funcName, [numerNode, denomNode], []);
                }
                return [node];
              } else {
                return body;
              }
            };
            _proto.handleSupSubscript = function handleSupSubscript(name) {
              var symbolToken = this.fetch();
              var symbol = symbolToken.text;
              this.consume();
              this.consumeSpaces();
              var group = this.parseGroup(name);
              if (!group) {
                throw new src_ParseError("Expected group after '" + symbol + "'", symbolToken);
              }
              return group;
            };
            _proto.formatUnsupportedCmd = function formatUnsupportedCmd(text) {
              var textordArray = [];
              for (var i3 = 0; i3 < text.length; i3++) {
                textordArray.push({
                  type: "textord",
                  mode: "text",
                  text: text[i3]
                });
              }
              var textNode = {
                type: "text",
                mode: this.mode,
                body: textordArray
              };
              var colorNode = {
                type: "color",
                mode: this.mode,
                color: this.settings.errorColor,
                body: [textNode]
              };
              return colorNode;
            };
            _proto.parseAtom = function parseAtom(breakOnTokenText) {
              var base2 = this.parseGroup("atom", breakOnTokenText);
              if (this.mode === "text") {
                return base2;
              }
              var superscript;
              var subscript;
              while (true) {
                this.consumeSpaces();
                var lex = this.fetch();
                if (lex.text === "\\limits" || lex.text === "\\nolimits") {
                  if (base2 && base2.type === "op") {
                    var limits = lex.text === "\\limits";
                    base2.limits = limits;
                    base2.alwaysHandleSupSub = true;
                  } else if (base2 && base2.type === "operatorname") {
                    if (base2.alwaysHandleSupSub) {
                      base2.limits = lex.text === "\\limits";
                    }
                  } else {
                    throw new src_ParseError("Limit controls must follow a math operator", lex);
                  }
                  this.consume();
                } else if (lex.text === "^") {
                  if (superscript) {
                    throw new src_ParseError("Double superscript", lex);
                  }
                  superscript = this.handleSupSubscript("superscript");
                } else if (lex.text === "_") {
                  if (subscript) {
                    throw new src_ParseError("Double subscript", lex);
                  }
                  subscript = this.handleSupSubscript("subscript");
                } else if (lex.text === "'") {
                  if (superscript) {
                    throw new src_ParseError("Double superscript", lex);
                  }
                  var prime2 = {
                    type: "textord",
                    mode: this.mode,
                    text: "\\prime"
                  };
                  var primes3 = [prime2];
                  this.consume();
                  while (this.fetch().text === "'") {
                    primes3.push(prime2);
                    this.consume();
                  }
                  if (this.fetch().text === "^") {
                    primes3.push(this.handleSupSubscript("superscript"));
                  }
                  superscript = {
                    type: "ordgroup",
                    mode: this.mode,
                    body: primes3
                  };
                } else {
                  break;
                }
              }
              if (superscript || subscript) {
                return {
                  type: "supsub",
                  mode: this.mode,
                  base: base2,
                  sup: superscript,
                  sub: subscript
                };
              } else {
                return base2;
              }
            };
            _proto.parseFunction = function parseFunction(breakOnTokenText, name) {
              var token = this.fetch();
              var func = token.text;
              var funcData = src_functions[func];
              if (!funcData) {
                return null;
              }
              this.consume();
              if (name && name !== "atom" && !funcData.allowedInArgument) {
                throw new src_ParseError("Got function '" + func + "' with no arguments" + (name ? " as " + name : ""), token);
              } else if (this.mode === "text" && !funcData.allowedInText) {
                throw new src_ParseError("Can't use function '" + func + "' in text mode", token);
              } else if (this.mode === "math" && funcData.allowedInMath === false) {
                throw new src_ParseError("Can't use function '" + func + "' in math mode", token);
              }
              var _this$parseArguments = this.parseArguments(func, funcData), args = _this$parseArguments.args, optArgs = _this$parseArguments.optArgs;
              return this.callFunction(func, args, optArgs, token, breakOnTokenText);
            };
            _proto.callFunction = function callFunction(name, args, optArgs, token, breakOnTokenText) {
              var context2 = {
                funcName: name,
                parser: this,
                token,
                breakOnTokenText
              };
              var func = src_functions[name];
              if (func && func.handler) {
                return func.handler(context2, args, optArgs);
              } else {
                throw new src_ParseError("No function handler for " + name);
              }
            };
            _proto.parseArguments = function parseArguments(func, funcData) {
              var totalArgs = funcData.numArgs + funcData.numOptionalArgs;
              if (totalArgs === 0) {
                return {
                  args: [],
                  optArgs: []
                };
              }
              var args = [];
              var optArgs = [];
              for (var i3 = 0; i3 < totalArgs; i3++) {
                var argType = funcData.argTypes && funcData.argTypes[i3];
                var isOptional = i3 < funcData.numOptionalArgs;
                if (funcData.primitive && argType == null || funcData.type === "sqrt" && i3 === 1 && optArgs[0] == null) {
                  argType = "primitive";
                }
                var arg = this.parseGroupOfType("argument to '" + func + "'", argType, isOptional);
                if (isOptional) {
                  optArgs.push(arg);
                } else if (arg != null) {
                  args.push(arg);
                } else {
                  throw new src_ParseError("Null argument, please report this as a bug");
                }
              }
              return {
                args,
                optArgs
              };
            };
            _proto.parseGroupOfType = function parseGroupOfType(name, type, optional) {
              switch (type) {
                case "color":
                  return this.parseColorGroup(optional);
                case "size":
                  return this.parseSizeGroup(optional);
                case "url":
                  return this.parseUrlGroup(optional);
                case "math":
                case "text":
                  return this.parseArgumentGroup(optional, type);
                case "hbox": {
                  var group = this.parseArgumentGroup(optional, "text");
                  return group != null ? {
                    type: "styling",
                    mode: group.mode,
                    body: [group],
                    style: "text"
                  } : null;
                }
                case "raw": {
                  var token = this.parseStringGroup("raw", optional);
                  return token != null ? {
                    type: "raw",
                    mode: "text",
                    string: token.text
                  } : null;
                }
                case "primitive": {
                  if (optional) {
                    throw new src_ParseError("A primitive argument cannot be optional");
                  }
                  var _group = this.parseGroup(name);
                  if (_group == null) {
                    throw new src_ParseError("Expected group as " + name, this.fetch());
                  }
                  return _group;
                }
                case "original":
                case null:
                case void 0:
                  return this.parseArgumentGroup(optional);
                default:
                  throw new src_ParseError("Unknown group type as " + name, this.fetch());
              }
            };
            _proto.consumeSpaces = function consumeSpaces() {
              while (this.fetch().text === " ") {
                this.consume();
              }
            };
            _proto.parseStringGroup = function parseStringGroup(modeName, optional) {
              var argToken = this.gullet.scanArgument(optional);
              if (argToken == null) {
                return null;
              }
              var str3 = "";
              var nextToken;
              while ((nextToken = this.fetch()).text !== "EOF") {
                str3 += nextToken.text;
                this.consume();
              }
              this.consume();
              argToken.text = str3;
              return argToken;
            };
            _proto.parseRegexGroup = function parseRegexGroup(regex, modeName) {
              var firstToken = this.fetch();
              var lastToken = firstToken;
              var str3 = "";
              var nextToken;
              while ((nextToken = this.fetch()).text !== "EOF" && regex.test(str3 + nextToken.text)) {
                lastToken = nextToken;
                str3 += lastToken.text;
                this.consume();
              }
              if (str3 === "") {
                throw new src_ParseError("Invalid " + modeName + ": '" + firstToken.text + "'", firstToken);
              }
              return firstToken.range(lastToken, str3);
            };
            _proto.parseColorGroup = function parseColorGroup(optional) {
              var res = this.parseStringGroup("color", optional);
              if (res == null) {
                return null;
              }
              var match3 = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(res.text);
              if (!match3) {
                throw new src_ParseError("Invalid color: '" + res.text + "'", res);
              }
              var color = match3[0];
              if (/^[0-9a-f]{6}$/i.test(color)) {
                color = "#" + color;
              }
              return {
                type: "color-token",
                mode: this.mode,
                color
              };
            };
            _proto.parseSizeGroup = function parseSizeGroup(optional) {
              var res;
              var isBlank = false;
              this.gullet.consumeSpaces();
              if (!optional && this.gullet.future().text !== "{") {
                res = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size");
              } else {
                res = this.parseStringGroup("size", optional);
              }
              if (!res) {
                return null;
              }
              if (!optional && res.text.length === 0) {
                res.text = "0pt";
                isBlank = true;
              }
              var match3 = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(res.text);
              if (!match3) {
                throw new src_ParseError("Invalid size: '" + res.text + "'", res);
              }
              var data2 = {
                number: +(match3[1] + match3[2]),
                unit: match3[3]
              };
              if (!validUnit(data2)) {
                throw new src_ParseError("Invalid unit: '" + data2.unit + "'", res);
              }
              return {
                type: "size",
                mode: this.mode,
                value: data2,
                isBlank
              };
            };
            _proto.parseUrlGroup = function parseUrlGroup(optional) {
              this.gullet.lexer.setCatcode("%", 13);
              this.gullet.lexer.setCatcode("~", 12);
              var res = this.parseStringGroup("url", optional);
              this.gullet.lexer.setCatcode("%", 14);
              this.gullet.lexer.setCatcode("~", 13);
              if (res == null) {
                return null;
              }
              var url = res.text.replace(/\\([#$%&~_^{}])/g, "$1");
              return {
                type: "url",
                mode: this.mode,
                url
              };
            };
            _proto.parseArgumentGroup = function parseArgumentGroup(optional, mode) {
              var argToken = this.gullet.scanArgument(optional);
              if (argToken == null) {
                return null;
              }
              var outerMode = this.mode;
              if (mode) {
                this.switchMode(mode);
              }
              this.gullet.beginGroup();
              var expression = this.parseExpression(false, "EOF");
              this.expect("EOF");
              this.gullet.endGroup();
              var result2 = {
                type: "ordgroup",
                mode: this.mode,
                loc: argToken.loc,
                body: expression
              };
              if (mode) {
                this.switchMode(outerMode);
              }
              return result2;
            };
            _proto.parseGroup = function parseGroup(name, breakOnTokenText) {
              var firstToken = this.fetch();
              var text = firstToken.text;
              var result2;
              if (text === "{" || text === "\\begingroup") {
                this.consume();
                var groupEnd = text === "{" ? "}" : "\\endgroup";
                this.gullet.beginGroup();
                var expression = this.parseExpression(false, groupEnd);
                var lastToken = this.fetch();
                this.expect(groupEnd);
                this.gullet.endGroup();
                result2 = {
                  type: "ordgroup",
                  mode: this.mode,
                  loc: SourceLocation.range(firstToken, lastToken),
                  body: expression,
                  semisimple: text === "\\begingroup" || void 0
                };
              } else {
                result2 = this.parseFunction(breakOnTokenText, name) || this.parseSymbol();
                if (result2 == null && text[0] === "\\" && !implicitCommands.hasOwnProperty(text)) {
                  if (this.settings.throwOnError) {
                    throw new src_ParseError("Undefined control sequence: " + text, firstToken);
                  }
                  result2 = this.formatUnsupportedCmd(text);
                  this.consume();
                }
              }
              return result2;
            };
            _proto.formLigatures = function formLigatures(group) {
              var n2 = group.length - 1;
              for (var i3 = 0; i3 < n2; ++i3) {
                var a2 = group[i3];
                var v3 = a2.text;
                if (v3 === "-" && group[i3 + 1].text === "-") {
                  if (i3 + 1 < n2 && group[i3 + 2].text === "-") {
                    group.splice(i3, 3, {
                      type: "textord",
                      mode: "text",
                      loc: SourceLocation.range(a2, group[i3 + 2]),
                      text: "---"
                    });
                    n2 -= 2;
                  } else {
                    group.splice(i3, 2, {
                      type: "textord",
                      mode: "text",
                      loc: SourceLocation.range(a2, group[i3 + 1]),
                      text: "--"
                    });
                    n2 -= 1;
                  }
                }
                if ((v3 === "'" || v3 === "`") && group[i3 + 1].text === v3) {
                  group.splice(i3, 2, {
                    type: "textord",
                    mode: "text",
                    loc: SourceLocation.range(a2, group[i3 + 1]),
                    text: v3 + v3
                  });
                  n2 -= 1;
                }
              }
            };
            _proto.parseSymbol = function parseSymbol() {
              var nucleus = this.fetch();
              var text = nucleus.text;
              if (/^\\verb[^a-zA-Z]/.test(text)) {
                this.consume();
                var arg = text.slice(5);
                var star = arg.charAt(0) === "*";
                if (star) {
                  arg = arg.slice(1);
                }
                if (arg.length < 2 || arg.charAt(0) !== arg.slice(-1)) {
                  throw new src_ParseError("\\verb assertion failed --\n                    please report what input caused this bug");
                }
                arg = arg.slice(1, -1);
                return {
                  type: "verb",
                  mode: "text",
                  body: arg,
                  star
                };
              }
              if (unicodeSymbols.hasOwnProperty(text[0]) && !src_symbols[this.mode][text[0]]) {
                if (this.settings.strict && this.mode === "math") {
                  this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + text[0] + '" used in math mode', nucleus);
                }
                text = unicodeSymbols[text[0]] + text.substr(1);
              }
              var match3 = combiningDiacriticalMarksEndRegex.exec(text);
              if (match3) {
                text = text.substring(0, match3.index);
                if (text === "i") {
                  text = "\u0131";
                } else if (text === "j") {
                  text = "\u0237";
                }
              }
              var symbol;
              if (src_symbols[this.mode][text]) {
                if (this.settings.strict && this.mode === "math" && extraLatin.indexOf(text) >= 0) {
                  this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + text[0] + '" used in math mode', nucleus);
                }
                var group = src_symbols[this.mode][text].group;
                var loc = SourceLocation.range(nucleus);
                var s3;
                if (ATOMS.hasOwnProperty(group)) {
                  var family = group;
                  s3 = {
                    type: "atom",
                    mode: this.mode,
                    family,
                    loc,
                    text
                  };
                } else {
                  s3 = {
                    type: group,
                    mode: this.mode,
                    loc,
                    text
                  };
                }
                symbol = s3;
              } else if (text.charCodeAt(0) >= 128) {
                if (this.settings.strict) {
                  if (!supportedCodepoint(text.charCodeAt(0))) {
                    this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + text[0] + '"' + (" (" + text.charCodeAt(0) + ")"), nucleus);
                  } else if (this.mode === "math") {
                    this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + text[0] + '" used in math mode', nucleus);
                  }
                }
                symbol = {
                  type: "textord",
                  mode: "text",
                  loc: SourceLocation.range(nucleus),
                  text
                };
              } else {
                return null;
              }
              this.consume();
              if (match3) {
                for (var i3 = 0; i3 < match3[0].length; i3++) {
                  var accent2 = match3[0][i3];
                  if (!unicodeAccents[accent2]) {
                    throw new src_ParseError("Unknown accent ' " + accent2 + "'", nucleus);
                  }
                  var command = unicodeAccents[accent2][this.mode] || unicodeAccents[accent2].text;
                  if (!command) {
                    throw new src_ParseError("Accent " + accent2 + " unsupported in " + this.mode + " mode", nucleus);
                  }
                  symbol = {
                    type: "accent",
                    mode: this.mode,
                    loc: SourceLocation.range(nucleus),
                    label: command,
                    isStretchy: false,
                    isShifty: true,
                    base: symbol
                  };
                }
              }
              return symbol;
            };
            return Parser2;
          }();
          Parser.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
          ;
          var parseTree = function parseTree2(toParse, settings) {
            if (!(typeof toParse === "string" || toParse instanceof String)) {
              throw new TypeError("KaTeX can only parse string typed expression");
            }
            var parser = new Parser(toParse, settings);
            delete parser.gullet.macros.current["\\df@tag"];
            var tree = parser.parse();
            delete parser.gullet.macros.current["\\current@color"];
            delete parser.gullet.macros.current["\\color"];
            if (parser.gullet.macros.get("\\df@tag")) {
              if (!settings.displayMode) {
                throw new src_ParseError("\\tag works only in display equations");
              }
              parser.gullet.feed("\\df@tag");
              tree = [{
                type: "tag",
                mode: "text",
                body: tree,
                tag: parser.parse()
              }];
            }
            return tree;
          };
          var src_parseTree = parseTree;
          ;
          var render = function render2(expression, baseNode, options2) {
            baseNode.textContent = "";
            var node = renderToDomTree(expression, options2).toNode();
            baseNode.appendChild(node);
          };
          if (typeof document !== "undefined") {
            if (document.compatMode !== "CSS1Compat") {
              typeof console !== "undefined" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype.");
              render = function render2() {
                throw new src_ParseError("KaTeX doesn't work in quirks mode.");
              };
            }
          }
          var renderToString = function renderToString2(expression, options2) {
            var markup = renderToDomTree(expression, options2).toMarkup();
            return markup;
          };
          var generateParseTree = function generateParseTree2(expression, options2) {
            var settings = new Settings(options2);
            return src_parseTree(expression, settings);
          };
          var renderError = function renderError2(error4, expression, options2) {
            if (options2.throwOnError || !(error4 instanceof src_ParseError)) {
              throw error4;
            }
            var node = buildCommon.makeSpan(["katex-error"], [new SymbolNode(expression)]);
            node.setAttribute("title", error4.toString());
            node.setAttribute("style", "color:" + options2.errorColor);
            return node;
          };
          var renderToDomTree = function renderToDomTree2(expression, options2) {
            var settings = new Settings(options2);
            try {
              var tree = src_parseTree(expression, settings);
              return buildTree(tree, expression, settings);
            } catch (error4) {
              return renderError(error4, expression, settings);
            }
          };
          var renderToHTMLTree = function renderToHTMLTree2(expression, options2) {
            var settings = new Settings(options2);
            try {
              var tree = src_parseTree(expression, settings);
              return buildHTMLTree(tree, expression, settings);
            } catch (error4) {
              return renderError(error4, expression, settings);
            }
          };
          var katex2 = {
            version: "0.13.24",
            render,
            renderToString,
            ParseError: src_ParseError,
            __parse: generateParseTree,
            __renderToDomTree: renderToDomTree,
            __renderToHTMLTree: renderToHTMLTree,
            __setFontMetrics: setFontMetrics,
            __defineSymbol: defineSymbol,
            __defineMacro: defineMacro,
            __domTree: {
              Span,
              Anchor,
              SymbolNode,
              SvgNode,
              PathNode,
              LineNode
            }
          };
          ;
          var katex_webpack = katex2;
          __webpack_exports__ = __webpack_exports__["default"];
          return __webpack_exports__;
        }();
      });
    }
  });

  // node_modules/katex/dist/contrib/auto-render.js
  var require_auto_render = __commonJS({
    "node_modules/katex/dist/contrib/auto-render.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory(require_katex());
        else if (typeof define === "function" && define.amd)
          define(["katex"], factory);
        else if (typeof exports === "object")
          exports["renderMathInElement"] = factory(require_katex());
        else
          root["renderMathInElement"] = factory(root["katex"]);
      })(typeof self !== "undefined" ? self : exports, function(__WEBPACK_EXTERNAL_MODULE__771__) {
        return function() {
          "use strict";
          var __webpack_modules__ = {
            771: function(module2) {
              module2.exports = __WEBPACK_EXTERNAL_MODULE__771__;
            }
          };
          var __webpack_module_cache__ = {};
          function __webpack_require__(moduleId) {
            var cachedModule = __webpack_module_cache__[moduleId];
            if (cachedModule !== void 0) {
              return cachedModule.exports;
            }
            var module2 = __webpack_module_cache__[moduleId] = {
              exports: {}
            };
            __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
            return module2.exports;
          }
          !function() {
            __webpack_require__.n = function(module2) {
              var getter = module2 && module2.__esModule ? function() {
                return module2["default"];
              } : function() {
                return module2;
              };
              __webpack_require__.d(getter, { a: getter });
              return getter;
            };
          }();
          !function() {
            __webpack_require__.d = function(exports2, definition) {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          }();
          !function() {
            __webpack_require__.o = function(obj, prop) {
              return Object.prototype.hasOwnProperty.call(obj, prop);
            };
          }();
          var __webpack_exports__ = {};
          !function() {
            __webpack_require__.d(__webpack_exports__, {
              "default": function() {
                return auto_render;
              }
            });
            var external_katex_ = __webpack_require__(771);
            var external_katex_default = /* @__PURE__ */ __webpack_require__.n(external_katex_);
            ;
            var findEndOfMath = function findEndOfMath2(delimiter, text, startIndex) {
              var index = startIndex;
              var braceLevel = 0;
              var delimLength = delimiter.length;
              while (index < text.length) {
                var character = text[index];
                if (braceLevel <= 0 && text.slice(index, index + delimLength) === delimiter) {
                  return index;
                } else if (character === "\\") {
                  index++;
                } else if (character === "{") {
                  braceLevel++;
                } else if (character === "}") {
                  braceLevel--;
                }
                index++;
              }
              return -1;
            };
            var escapeRegex = function escapeRegex2(string) {
              return string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
            };
            var amsRegex = /^\\begin{/;
            var splitAtDelimiters = function splitAtDelimiters2(text, delimiters) {
              var index;
              var data2 = [];
              var regexLeft = new RegExp("(" + delimiters.map(function(x2) {
                return escapeRegex(x2.left);
              }).join("|") + ")");
              while (true) {
                index = text.search(regexLeft);
                if (index === -1) {
                  break;
                }
                if (index > 0) {
                  data2.push({
                    type: "text",
                    data: text.slice(0, index)
                  });
                  text = text.slice(index);
                }
                var i2 = delimiters.findIndex(function(delim) {
                  return text.startsWith(delim.left);
                });
                index = findEndOfMath(delimiters[i2].right, text, delimiters[i2].left.length);
                if (index === -1) {
                  break;
                }
                var rawData = text.slice(0, index + delimiters[i2].right.length);
                var math = amsRegex.test(rawData) ? rawData : text.slice(delimiters[i2].left.length, index);
                data2.push({
                  type: "math",
                  data: math,
                  rawData,
                  display: delimiters[i2].display
                });
                text = text.slice(index + delimiters[i2].right.length);
              }
              if (text !== "") {
                data2.push({
                  type: "text",
                  data: text
                });
              }
              return data2;
            };
            var auto_render_splitAtDelimiters = splitAtDelimiters;
            ;
            var renderMathInText = function renderMathInText2(text, optionsCopy) {
              var data2 = auto_render_splitAtDelimiters(text, optionsCopy.delimiters);
              if (data2.length === 1 && data2[0].type === "text") {
                return null;
              }
              var fragment = document.createDocumentFragment();
              for (var i2 = 0; i2 < data2.length; i2++) {
                if (data2[i2].type === "text") {
                  fragment.appendChild(document.createTextNode(data2[i2].data));
                } else {
                  var span = document.createElement("span");
                  var math = data2[i2].data;
                  optionsCopy.displayMode = data2[i2].display;
                  try {
                    if (optionsCopy.preProcess) {
                      math = optionsCopy.preProcess(math);
                    }
                    external_katex_default().render(math, span, optionsCopy);
                  } catch (e6) {
                    if (!(e6 instanceof external_katex_default().ParseError)) {
                      throw e6;
                    }
                    optionsCopy.errorCallback("KaTeX auto-render: Failed to parse `" + data2[i2].data + "` with ", e6);
                    fragment.appendChild(document.createTextNode(data2[i2].rawData));
                    continue;
                  }
                  fragment.appendChild(span);
                }
              }
              return fragment;
            };
            var renderElem = function renderElem2(elem, optionsCopy) {
              for (var i2 = 0; i2 < elem.childNodes.length; i2++) {
                var childNode = elem.childNodes[i2];
                if (childNode.nodeType === 3) {
                  var frag = renderMathInText(childNode.textContent, optionsCopy);
                  if (frag) {
                    i2 += frag.childNodes.length - 1;
                    elem.replaceChild(frag, childNode);
                  }
                } else if (childNode.nodeType === 1) {
                  (function() {
                    var className = " " + childNode.className + " ";
                    var shouldRender = optionsCopy.ignoredTags.indexOf(childNode.nodeName.toLowerCase()) === -1 && optionsCopy.ignoredClasses.every(function(x2) {
                      return className.indexOf(" " + x2 + " ") === -1;
                    });
                    if (shouldRender) {
                      renderElem2(childNode, optionsCopy);
                    }
                  })();
                }
              }
            };
            var renderMathInElement2 = function renderMathInElement3(elem, options2) {
              if (!elem) {
                throw new Error("No element provided to render");
              }
              var optionsCopy = {};
              for (var option in options2) {
                if (options2.hasOwnProperty(option)) {
                  optionsCopy[option] = options2[option];
                }
              }
              optionsCopy.delimiters = optionsCopy.delimiters || [
                {
                  left: "$$",
                  right: "$$",
                  display: true
                },
                {
                  left: "\\(",
                  right: "\\)",
                  display: false
                },
                {
                  left: "\\begin{equation}",
                  right: "\\end{equation}",
                  display: true
                },
                {
                  left: "\\begin{align}",
                  right: "\\end{align}",
                  display: true
                },
                {
                  left: "\\begin{alignat}",
                  right: "\\end{alignat}",
                  display: true
                },
                {
                  left: "\\begin{gather}",
                  right: "\\end{gather}",
                  display: true
                },
                {
                  left: "\\begin{CD}",
                  right: "\\end{CD}",
                  display: true
                },
                {
                  left: "\\[",
                  right: "\\]",
                  display: true
                }
              ];
              optionsCopy.ignoredTags = optionsCopy.ignoredTags || ["script", "noscript", "style", "textarea", "pre", "code", "option"];
              optionsCopy.ignoredClasses = optionsCopy.ignoredClasses || [];
              optionsCopy.errorCallback = optionsCopy.errorCallback || console.error;
              optionsCopy.macros = optionsCopy.macros || {};
              renderElem(elem, optionsCopy);
            };
            var auto_render = renderMathInElement2;
          }();
          __webpack_exports__ = __webpack_exports__["default"];
          return __webpack_exports__;
        }();
      });
    }
  });

  // ../packages/ruby/lib/src/array/list.js
  var List = class extends Array {
    static of(...items) {
      let ls = new List();
      ls.push(...items);
      return ls;
    }
    create(elements) {
      let ls = new this.constructor();
      ls.push(...elements);
      return ls;
    }
    clear() {
      this.splice(0, this.length);
    }
    set(elements) {
      this.clear();
      this.push(...elements);
    }
    clone() {
      return this.create([...this]);
    }
    indexValid(index) {
      if (this.length === 0)
        return false;
      return index >= 0 && index <= this.length - 1;
    }
    isEmpty() {
      return this.length === 0;
    }
    first() {
      return this[0];
    }
    last() {
      return this[this.length - 1];
    }
    cyclicAt(index) {
      let n2 = this.length;
      if (n2 === 0)
        return void 0;
      while (index < 0) {
        index += n2;
      }
      while (index > n2 - 1) {
        index -= n2;
      }
      return this[index];
    }
    pull(index) {
      let n2 = this.length;
      if (n2 === 0)
        return void 0;
      while (index < 0)
        return void 0;
      while (index > n2 - 1)
        return void 0;
      let element = this[index];
      this.splice(index, 1);
      return element;
    }
    head(n2) {
      if (n2 <= 0)
        return this.create([]);
      return this.slice(0, n2);
    }
    tail(n2) {
      if (n2 <= 0)
        return this.create([]);
      return this.slice(-n2);
    }
    before(index) {
      if (index <= 0)
        return this.create([]);
      if (index >= this.length)
        return this.clone();
      return this.slice(0, index);
    }
    till(index) {
      return this.before(index + 1);
    }
    after(index) {
      if (index < 0)
        return this.clone();
      if (index >= this.length - 1)
        return this.create([]);
      return this.slice(index + 1);
    }
    since(index) {
      return this.after(index - 1);
    }
    chunk(size) {
      if (size <= 0)
        return List.of();
      let ls = List.of();
      for (let i2 = 0; i2 < this.length; i2 += size) {
        ls.push(this.slice(i2, i2 + size));
      }
      return ls;
    }
    split(delimitElement) {
      let ls = List.of();
      let clone = this.clone();
      while (true) {
        let firstDelimIndex = clone.findIndex(($) => $ === delimitElement);
        if (firstDelimIndex === -1) {
          let head = clone.splice(0);
          ls.push(this.create(head));
          break;
        } else {
          let head = clone.splice(0, firstDelimIndex);
          ls.push(this.create(head));
          clone.shift();
          if (clone.length === 0) {
            ls.push(this.create([]));
            break;
          }
        }
      }
      return ls;
    }
    includesAll(elements) {
      return elements.every(($) => this.includes($));
    }
    includesAny(elements) {
      return elements.some(($) => this.includes($));
    }
    includesExact(elements) {
      let other = List.of(...elements);
      return this.includesAll(other) && this.belongs(other);
    }
    belongs(elements) {
      return this.every(($) => elements.includes($));
    }
    unique() {
      return this.create([...new Set(this)]);
    }
    uniqueBy(mapper) {
      let ls = this.create([]);
      let mapped = [];
      for (let ele of this) {
        let map = mapper(ele);
        let found = mapped.findIndex(($) => $ === map) !== -1;
        if (found)
          continue;
        ls.push(ele);
        mapped.push(map);
      }
      return ls;
    }
    uniqueDeep() {
      return this.uniqueBy(($) => JSON.stringify($));
    }
    freq(element) {
      return this.filter(($) => $ === element).length;
    }
    distincts() {
      return this.filter(($) => this.freq($) === 1);
    }
    duplicates() {
      let distincts = this.distincts();
      return this.except(distincts);
    }
    duplicated() {
      return this.duplicates().unique();
    }
    dupless() {
      return [...new Set(this)].length === this.length;
    }
    duplessDeep() {
      return this.uniqueDeep().length === this.length;
    }
    duppy() {
      return !this.dupless();
    }
    dedup() {
      this.set(this.unique());
    }
    violate(predicate) {
      return this.filter(($) => !predicate($));
    }
    inside(elements) {
      return this.filter(($) => elements.includes($));
    }
    except(elements) {
      return this.filter(($) => !elements.includes($));
    }
    filterIndex(predicate) {
      let ls = this.create([]);
      for (let i2 = 0; i2 < this.length; i2++) {
        if (predicate(i2))
          ls.push(this[i2]);
      }
      return ls;
    }
    countIf(predicate) {
      return this.filter(predicate).length;
    }
    sieve(predicate) {
      this.set(this.filter(predicate));
    }
    reject(predicate) {
      this.set(this.violate(predicate));
    }
    keep(elements) {
      this.set(this.inside(elements));
    }
    drop(elements) {
      this.set(this.except(elements));
    }
    reversed() {
      let ls = this.clone();
      ls.reverse();
      return ls;
    }
    ascending() {
      let ls = this.clone();
      ls.ascend();
      return ls;
    }
    descending() {
      let ls = this.clone();
      ls.descend();
      return ls;
    }
    sorted(...compareFns) {
      let ls = this.clone();
      ls.sorts(...compareFns);
      return ls;
    }
    sortedBy(...mappers) {
      let ls = this.clone();
      ls.sortBy(...mappers);
      return ls;
    }
    sortedByFreq() {
      return this.sortedBy(($) => -this.freq($));
    }
    ascend() {
      if (this.every(($) => typeof $ === "number")) {
        this.sortBy(($) => Number($));
      } else {
        this.sortBy(($) => String($));
      }
    }
    descend() {
      this.ascend();
      this.reverse();
    }
    arrange(newIndices) {
      let newArr = Array(this.length);
      for (let i2 = 0; i2 < this.length; i2++) {
        const newIndex = newIndices[i2];
        newArr[newIndex] = this[i2];
      }
      this.set(newArr);
    }
    permute(newOrder) {
      let newArr = Array(this.length);
      for (let i2 = 0; i2 < this.length; i2++) {
        const newIndex = newOrder[i2];
        newArr[i2] = this[newIndex];
      }
      this.set(newArr);
    }
    sorts(...compareFns) {
      function compare(a2, b2) {
        for (let fn of compareFns) {
          let v3 = fn(a2, b2);
          if (v3 > 0)
            return 1;
          if (v3 < 0)
            return -1;
        }
        return 0;
      }
      this.sort(compare);
    }
    sortBy(...mappers) {
      const compareFns = mappers.map((m3) => function(a2, b2) {
        const va = m3(a2);
        const vb = m3(b2);
        return va === vb ? 0 : va > vb ? 1 : -1;
      });
      this.sorts(...compareFns);
    }
    cycle(n2) {
      if (this.length === 0)
        return;
      if (n2 === 0)
        return;
      if (n2 > 0) {
        for (let i2 = 1; i2 <= n2; i2++) {
          this.push(this.shift());
        }
      }
      if (n2 < 0) {
        n2 = Math.abs(n2);
        for (let i2 = 1; i2 <= n2; i2++) {
          this.unshift(this.pop());
        }
      }
    }
    randomIndex() {
      if (this.length === 0)
        return void 0;
      function rndInt2(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      return rndInt2(0, this.length - 1);
    }
    draw() {
      if (this.length === 0)
        return void 0;
      return this[this.randomIndex()];
    }
    draws(n2) {
      if (this.length === 0)
        return void 0;
      let arr = this.create([]);
      for (let i2 = 0; i2 < n2; i2++) {
        arr.push(this.draw());
      }
      return arr;
    }
    sample(n2) {
      if (n2 > this.length)
        return void 0;
      let ls = this.shuffled();
      ls.length = n2;
      return ls;
    }
    shuffled() {
      let ls = this.clone();
      ls.shuffle();
      return ls;
    }
    deal() {
      if (this.length === 0)
        return void 0;
      return this.pull(this.randomIndex());
    }
    shuffle() {
      for (let i2 = this.length - 1; i2 > 0; i2--) {
        let j2 = Math.floor(Math.random() * (i2 + 1));
        [this[i2], this[j2]] = [this[j2], this[i2]];
      }
    }
    combinations(k2) {
      if (k2 > this.length || k2 <= 0)
        return List.of();
      if (k2 === this.length)
        return List.of(this);
      if (k2 === 1)
        return List.of(...this.map(($) => this.create([$])));
      const combs = List.of();
      let tail_combs = List.of();
      for (let i2 = 0; i2 <= this.length - k2 + 1; i2++) {
        let tail = this.after(i2);
        tail_combs = tail.combinations(k2 - 1);
        for (let j2 = 0; j2 < tail_combs.length; j2++) {
          combs.push(this.create([this[i2], ...tail_combs[j2]]));
        }
      }
      return combs;
    }
    pairs() {
      return this.combinations(2);
    }
    permutations() {
      if (this.length === 0)
        return List.of();
      if (this.length === 1)
        return List.of(this);
      if (this.length === 2) {
        let [a2, b2] = this;
        return List.of(this.create([a2, b2]), this.create([b2, a2]));
      }
      const perm = List.of();
      for (let i2 = 0; i2 < this.length; i2++) {
        let clone = this.clone();
        let pulled = clone.pull(i2);
        for (let p3 of clone.permutations()) {
          perm.push(this.create([pulled, ...p3]));
        }
      }
      return perm;
    }
    zip(array2, mapper) {
      let ls = new List();
      for (let i2 = 0; i2 < this.length; i2++) {
        ls.push(mapper(this[i2], array2[i2]));
      }
      return ls;
    }
    meanOf(metric) {
      let metrics = this.map(metric);
      let sum = metrics.reduce((a2, b2) => a2 + b2, 0);
      return sum / metrics.length;
    }
    maxOf(metric, rank = 1) {
      if (this.length === 0)
        return NaN;
      if (rank === 1) {
        return this.map(metric).descending().first();
      } else {
        let sortedMetrics = this.map(metric).unique().descending();
        return sortedMetrics[rank - 1] ?? NaN;
      }
    }
    minOf(metric, rank = 1) {
      if (this.length === 0)
        return NaN;
      if (rank === 1) {
        return this.map(metric).ascending().first();
      } else {
        let sortedMetrics = this.map(metric).unique().ascending();
        return sortedMetrics[rank - 1] ?? NaN;
      }
    }
    maxsBy(metric, rank = 1) {
      let max = this.maxOf(metric, rank);
      return this.filter(($) => metric($) === max);
    }
    minsBy(metric, rank = 1) {
      let min = this.minOf(metric, rank);
      return this.filter(($) => metric($) === min);
    }
    maxBy(metric, rank = 1) {
      if (this.length === 0)
        return void 0;
      return this.maxsBy(metric, rank).first();
    }
    minBy(metric, rank = 1) {
      if (this.length === 0)
        return void 0;
      return this.minsBy(metric, rank).first();
    }
    padTail(length) {
      if (length <= this.length)
        return this.clone();
      if (this.length === 0)
        return this.clone();
      let last = this.last();
      let clone = this.clone();
      for (let i2 = clone.length; i2 < length; i2++) {
        clone.push(last);
      }
      return clone;
    }
    padHead(length) {
      if (length <= this.length)
        return this.clone();
      if (this.length === 0)
        return this.clone();
      let first = this.first();
      let clone = this.create([]);
      for (let i2 = 0; i2 < length - this.length; i2++) {
        clone.push(first);
      }
      clone.push(...this);
      return clone;
    }
    padCyclic(length) {
      if (length <= this.length)
        return this.clone();
      if (this.length === 0)
        return this.clone();
      let clone = this.create([]);
      for (let i2 = 0; i2 < length; i2++) {
        clone.push(this.cyclicAt(i2));
      }
      return clone;
    }
  };
  function list2(...elements) {
    let ls = new List();
    ls.push(...elements);
    return ls;
  }
  function toList2(elements) {
    return list2(...elements);
  }

  // ../packages/ruby/lib/src/math/cal.js
  var cal_exports = {};
  __export(cal_exports, {
    blur: () => blur,
    correct: () => correct,
    crammer: () => crammer,
    dp: () => dp,
    e: () => e2,
    eq: () => eq,
    factorial: () => factorial,
    fix: () => fix,
    isPrime: () => isPrime,
    isRational: () => isRational,
    logCeil: () => logCeil,
    logFloor: () => logFloor,
    mantissa: () => mantissa,
    nCr: () => nCr,
    nPr: () => nPr,
    primeFactors: () => primeFactors,
    primes: () => primes,
    range: () => range,
    round: () => round,
    sigfig: () => sigfig,
    toFraction: () => toFraction,
    toSurd: () => toSurd,
    trace: () => trace,
    traceCircle: () => traceCircle
  });

  // ../packages/ruby/lib/src/math/frac.js
  function val(f3) {
    let [a2, b2] = f3;
    return a2 / b2;
  }
  function nextTerm(f22, f1, a2) {
    let [h1, k1] = f1;
    let [h2, k2] = f22;
    return [h2 + a2 * h1, k2 + a2 * k1];
  }
  function getCloser(x2, f1, f22) {
    let a2 = Math.abs(val(f1) - x2);
    let b2 = Math.abs(val(f22) - x2);
    return a2 > b2 ? f22 : f1;
  }
  function convergent(num2, maxD) {
    let sign = Math.sign(num2);
    num2 = Math.abs(num2);
    let x2 = num2;
    let a2;
    let f22 = [0, 1];
    let f1 = [1, 0];
    let f3;
    while (true) {
      a2 = Math.floor(x2);
      f3 = nextTerm(f22, f1, a2);
      if (f3[1] > maxD)
        break;
      x2 = 1 / (x2 - a2);
      x2 = Math.abs(x2);
      f22 = f1;
      f1 = f3;
    }
    let [p3, q2] = getCloser(num2, f1, f22);
    return [sign * p3, q2];
  }

  // ../packages/ruby/lib/src/math/round.js
  function shiftDec(num2, right) {
    let [mant, exp] = toSci(num2);
    return Number(mant + "e" + (exp + right));
  }
  function toSci(num2) {
    let [m3, e6] = num2.toExponential().split("e");
    return [Number(m3), Number(e6)];
  }
  function unshiftDec(num2, right) {
    return shiftDec(num2, -right);
  }
  function sf2dp(num2, sf) {
    let exp = Number(num2.toExponential().split("e")[1]);
    return sf - 1 - exp;
  }
  function adjustToDP(num2, dp2, method) {
    let sign = Math.sign(num2);
    num2 = Math.abs(num2);
    let shifted = shiftDec(num2, dp2);
    let adjusted = 0;
    if (method === "off")
      adjusted = Math.round(shifted);
    if (method === "up")
      adjusted = Math.ceil(shifted);
    if (method === "down")
      adjusted = Math.floor(shifted);
    let unshifted = unshiftDec(adjusted, dp2);
    return sign * unshifted;
  }
  function adjustToSF(num2, sf, method) {
    let dp2 = sf2dp(num2, sf);
    return adjustToDP(num2, dp2, method);
  }

  // ../packages/ruby/lib/src/math/cal.js
  var STANDARD_SIGFIG = 14;
  function blur(num2) {
    let n2 = parseFloat(num2.toPrecision(STANDARD_SIGFIG));
    return sigfig(n2) <= STANDARD_SIGFIG - 5 ? n2 : num2;
  }
  function correct(num2) {
    return parseFloat(num2.toPrecision(STANDARD_SIGFIG - 2));
  }
  function eq(a2, b2) {
    return correct(a2) === correct(b2);
  }
  function sigfig(num2) {
    let mant = Math.abs(num2).toExponential().split("e")[0];
    return mant.replace(".", "").length;
  }
  function dp(num2) {
    if (Number.isInteger(num2))
      return 0;
    let sf = sigfig(num2);
    let exp = e2(num2);
    return sf - 1 - exp;
  }
  function round(num2, sigfig2 = 3) {
    return {
      off: () => adjustToSF(num2, sigfig2, "off"),
      up: () => adjustToSF(num2, sigfig2, "up"),
      down: () => adjustToSF(num2, sigfig2, "down")
    };
  }
  function fix(num2, dp2 = 0) {
    return {
      off: () => adjustToDP(num2, dp2, "off"),
      up: () => adjustToDP(num2, dp2, "up"),
      down: () => adjustToDP(num2, dp2, "down")
    };
  }
  function e2(num2) {
    return Number(num2.toExponential().split("e")[1]);
  }
  function mantissa(num2) {
    return Number(num2.toExponential().split("e")[0]);
  }
  function logCeil(num2) {
    let exp = e2(num2) + 1;
    return Number("1e" + exp);
  }
  function logFloor(num2) {
    let exp = e2(num2);
    return Number("1e" + exp);
  }
  function toFraction(num2) {
    if (num2 === Infinity)
      return [1, 0];
    if (num2 === -Infinity)
      return [-1, 0];
    return convergent(num2, 1e5);
  }
  function isRational(num2) {
    if (num2 === Infinity)
      return false;
    if (num2 === -Infinity)
      return false;
    let rough = convergent(num2, 1e5);
    let accurate = convergent(num2, 1e7);
    return rough[0] === accurate[0] && rough[1] === accurate[1];
  }
  function toSurd(num2) {
    num2 = blur(num2);
    let s3 = Math.sign(num2);
    let a2 = Math.abs(num2);
    let square = blur(a2 ** 2);
    if (square === 0)
      return [0, 1];
    let factors = [1];
    let i2 = 2;
    while (i2 <= a2) {
      let s4 = i2 ** 2;
      if (square % s4 === 0) {
        square = square / s4;
        factors.push(i2);
      } else {
        i2++;
      }
    }
    let product = factors.reduce((a3, b2) => a3 * b2, 1);
    return [s3 * product, square];
  }
  function isPrime(num2) {
    if (!Number.isInteger(num2))
      return false;
    if (num2 <= 1)
      return false;
    if (num2 === 2)
      return true;
    if (num2 % 2 === 0)
      return false;
    for (let i2 = 3; i2 <= Math.sqrt(num2) + 1; i2 = i2 + 2) {
      if (num2 % i2 === 0)
        return false;
    }
    return true;
  }
  function primes(max) {
    let arr = [];
    for (let i2 = 2; i2 <= max; i2++) {
      if (isPrime(i2))
        arr.push(i2);
    }
    return arr;
  }
  function primeFactors(num2) {
    let arr = [];
    let i2 = 2;
    while (num2 > 1) {
      if (!isPrime(i2)) {
        i2++;
        continue;
      }
      if (num2 % i2 === 0) {
        arr.push(i2);
        num2 = num2 / i2;
      } else {
        i2++;
      }
    }
    return arr;
  }
  function factorial(n2) {
    if (n2 <= 1)
      return 1;
    return factorial(n2 - 1) * n2;
  }
  function nCr(n2, r3) {
    return factorial(n2) / factorial(r3) / factorial(n2 - r3);
  }
  function nPr(n2, r3) {
    return factorial(n2) / factorial(n2 - r3);
  }
  function range(min, max) {
    let arr = [];
    min = Math.ceil(min - Number.EPSILON);
    for (let i2 = min; i2 <= max; i2++) {
      arr.push(i2);
    }
    return arr;
  }
  function trace(func, range2, dots = 1e3) {
    function tracer(t3) {
      let result2;
      try {
        result2 = func(t3);
      } catch {
        return [NaN, NaN];
      }
      if (!Array.isArray(result2))
        result2 = [t3, result2];
      return result2;
    }
    ;
    let [t1, t2] = range2;
    const step = (t2 - t1) / (dots - 1);
    let points = [];
    for (let t3 = t1; t3 <= t2; t3 += step) {
      points.push(tracer(t3));
    }
    return points;
  }
  function traceCircle(center, radius, angleRange, dots = 100) {
    const [h2, k2] = center;
    function sin4(degree) {
      return Math.sin(degree / 180 * Math.PI);
    }
    function cos4(degree) {
      return Math.cos(degree / 180 * Math.PI);
    }
    return trace((t2) => [h2 + radius * cos4(t2), k2 + radius * sin4(t2)], angleRange, dots);
  }
  function crammer(a2, b2, c3, p3, q2, r3) {
    if (a2 / b2 === p3 / q2)
      return [NaN, NaN];
    const D2 = a2 * q2 - b2 * p3;
    const x2 = (c3 * q2 - b2 * r3) / D2;
    const y2 = (a2 * r3 - c3 * p3) / D2;
    return [blur(x2), blur(y2)];
  }

  // ../packages/ruby/lib/src/array/numbers.js
  var Numbers = class extends List {
    sum() {
      return this.reduce((a2, b2) => a2 + b2, 0);
    }
    product() {
      if (this.length === 0)
        return NaN;
      return this.reduce((a2, b2) => a2 * b2, 1);
    }
    mean() {
      if (this.length === 0)
        return NaN;
      return this.sum() / this.length;
    }
    max(rank = 1) {
      if (this.length === 0)
        return NaN;
      if (rank === 1) {
        return Math.max(...this);
      } else {
        let desc = this.unique().descending();
        return desc[rank - 1] ?? NaN;
      }
    }
    min(rank = 1) {
      if (this.length === 0)
        return NaN;
      if (rank === 1) {
        return Math.min(...this);
      } else {
        let asc = this.unique().ascending();
        return asc[rank - 1] ?? NaN;
      }
    }
    add(nums) {
      if (!Array.isArray(nums))
        nums = Array(this.length).fill(nums);
      let zipped = this.zip(nums, (a2, b2) => a2 + b2);
      return this.create(zipped);
    }
    minus(nums) {
      if (!Array.isArray(nums))
        nums = Array(this.length).fill(nums);
      let zipped = this.zip(nums, (a2, b2) => a2 - b2);
      return this.create(zipped);
    }
    times(nums) {
      if (!Array.isArray(nums))
        nums = Array(this.length).fill(nums);
      let zipped = this.zip(nums, (a2, b2) => a2 * b2);
      return this.create(zipped);
    }
    divide(nums) {
      if (!Array.isArray(nums))
        nums = Array(this.length).fill(nums);
      let zipped = this.zip(nums, (a2, b2) => a2 / b2);
      return this.create(zipped);
    }
    toPower(indices) {
      if (!Array.isArray(indices))
        indices = Array(this.length).fill(indices);
      let zipped = this.zip(indices, (a2, b2) => a2 ** b2);
      return this.create(zipped);
    }
    rootNth(nths) {
      if (!Array.isArray(nths))
        nths = Array(this.length).fill(nths);
      let zipped = this.zip(nths, (a2, b2) => a2 ** (1 / b2));
      return this.create(zipped);
    }
    square() {
      return this.toPower(2);
    }
    squareRoot() {
      return this.rootNth(2);
    }
    negate() {
      return this.times(-1);
    }
    abs() {
      const mapped = this.map(($) => Math.abs($));
      return this.create(mapped);
    }
    blur() {
      let blurred = this.map(($) => blur($));
      return this.create(blurred);
    }
    toFraction() {
      let fracs = this.map(($) => toFraction($));
      return list2(...fracs);
    }
    gaps() {
      const sorted = this.ascending();
      const gaps = this.create([]);
      for (let i2 = 0; i2 < this.length - 1; i2++) {
        let gap = sorted[i2 + 1] - sorted[i2];
        gaps.push(gap);
      }
      return gaps;
    }
    gapsMod(mod) {
      function reduce(x2) {
        while (x2 >= mod) {
          x2 = x2 - mod;
        }
        while (x2 < 0) {
          x2 = x2 + mod;
        }
        return x2;
      }
      const reduced = this.map(reduce);
      const sorted = reduced.ascending();
      const patched = this.create([...sorted, sorted[0] + mod]);
      return patched.gaps();
    }
    hcf() {
      if (this.some(($) => !Number.isInteger($)))
        return NaN;
      let arr = this.except([0]).abs().unique();
      if (arr.length === 0)
        return NaN;
      if (arr.length === 1)
        return arr[0];
      if (arr.length === 2) {
        let [a2, b2] = arr;
        while (true) {
          if (a2 === 0)
            return b2;
          if (b2 === 0)
            return a2;
          if (a2 >= b2) {
            a2 = a2 % b2;
          } else {
            b2 = b2 % a2;
          }
        }
        return a2;
      }
      return arr.reduce((last, now) => this.create([last, now]).hcf());
    }
    lcm() {
      if (this.some(($) => !Number.isInteger($)))
        return NaN;
      let arr = this.except([0]).abs().unique();
      if (arr.length === 0)
        return NaN;
      if (arr.length === 1)
        return arr[0];
      if (arr.length === 2) {
        let [a2, b2] = arr;
        let hcf = arr.hcf();
        return a2 * b2 / hcf;
      }
      return arr.reduce((last, now) => this.create([last, now]).lcm());
    }
    reduceRatio() {
      if (this.except([0]).length === 0)
        return this.clone();
      if (this.some(($) => !Number.isInteger($)))
        return this.clone();
      let HCF2 = this.hcf();
      return this.divide(HCF2).blur();
    }
    ratio() {
      if (this.except([0]).length === 0)
        return this.clone();
      if (this.some(($) => !isRational($)))
        return this.clone();
      let fracs = this.toFraction();
      let denos = this.create(fracs.map(($) => $[1]));
      return this.times(denos.lcm()).blur().reduceRatio();
    }
    ratioFactor() {
      if (this.except([0]).length === 0)
        return NaN;
      if (this.some(($) => !isRational($)))
        return NaN;
      let clone = this.except([0]);
      let ratioed = clone.ratio();
      return blur(ratioed[0] / clone[0]);
    }
  };
  function numbers2(...elements) {
    let nums = new Numbers();
    nums.push(...elements);
    return nums;
  }
  function toNumbers2(elements) {
    return numbers2(...elements);
  }

  // ../packages/ruby/lib/src/array/data.js
  var Data = class extends Numbers {
    median() {
      if (this.length === 0)
        return NaN;
      const sorted = this.ascending();
      if (sorted.length % 2 === 0) {
        let i2 = sorted.length / 2;
        let j2 = i2 + 1;
        return (sorted[i2 - 1] + sorted[j2 - 1]) / 2;
      } else {
        let i2 = sorted.length / 2;
        i2 = Math.ceil(i2);
        return sorted[i2 - 1];
      }
    }
    modes(Nth = 1) {
      if (this.length === 0)
        return this.create([]);
      return this.maxsBy(($) => this.freq($), Nth).unique();
    }
    mode(Nth = 1) {
      if (this.length === 0)
        return NaN;
      const modes = this.modes(Nth);
      if (modes.length > 1)
        return NaN;
      return modes.first();
    }
    isSingleMode(Nth = 1) {
      const modes = this.modes(Nth);
      return modes.length === 1;
    }
    lowerQuartile() {
      if (this.length === 0)
        return NaN;
      const sorted = this.ascending();
      let n2 = sorted.length;
      let m3 = n2 / 2;
      if (n2 % 2 !== 0)
        m3 = Math.floor(m3);
      return sorted.head(m3).median();
    }
    upperQuartile() {
      if (this.length === 0)
        return NaN;
      const sorted = this.ascending();
      let n2 = sorted.length;
      let m3 = n2 / 2;
      if (n2 % 2 !== 0)
        m3 = Math.floor(m3);
      return sorted.tail(m3).median();
    }
    stdDev() {
      if (this.length === 0)
        return NaN;
      let mean = this.mean();
      let deviations = this.minus(mean);
      let squaredDev = deviations.square();
      let meanSq = squaredDev.mean();
      return Math.sqrt(meanSq);
    }
    range() {
      if (this.length === 0)
        return NaN;
      return this.max() - this.min();
    }
    IQR() {
      if (this.length === 0)
        return NaN;
      return this.upperQuartile() - this.lowerQuartile();
    }
  };
  function data(...elements) {
    let dt = new Data();
    dt.push(...elements);
    return dt;
  }
  function toData2(elements) {
    return data(...elements);
  }

  // ../packages/ruby/lib/src/array/vector.js
  var Vector = class extends Numbers {
    magnitude() {
      let squares = this.square();
      let sum = squares.sum();
      return Math.sqrt(sum);
    }
    unit() {
      let mag = this.magnitude();
      return this.divide(mag);
    }
    scaledTo(magnitude2) {
      return this.unit().times(magnitude2);
    }
    dot(vec3) {
      let terms = this.zip(vec3, (a2, b2) => a2 * b2);
      return this.create(terms).sum();
    }
    angleWith(vec3) {
      let m1 = this.magnitude();
      let m22 = this.create(vec3).magnitude();
      let dot = this.dot(vec3);
      let cos4 = dot / m1 / m22;
      let angle2 = Math.acos(cos4) * 180 / Math.PI;
      return angle2;
    }
    projectOn(vec3) {
      let unit = this.create(vec3).unit();
      let dot = this.dot(unit);
      return unit.times(dot);
    }
    normalTo(vec3) {
      let parallel = this.projectOn(vec3);
      return this.minus(parallel);
    }
    distanceWith(vec3) {
      let d2 = this.minus(vec3);
      return d2.magnitude();
    }
    extrudeTo(vertex, scale) {
      let v3 = this.create(vertex);
      let d2 = this.minus(v3);
      d2 = d2.times(scale);
      return v3.add(d2);
    }
  };
  function vector(...elements) {
    let vec3 = new Vector();
    vec3.push(...elements);
    return vec3;
  }
  function toVector(elements) {
    return vector(...elements);
  }

  // ../packages/ruby/lib/src/array/shape.js
  var Shape = class extends List {
    distances() {
      let ds = this.pairs().map(([A2, B2]) => A2.distanceWith(B2));
      return numbers2(...ds);
    }
    distancesFrom(point) {
      let ds = this.map(($) => $.distanceWith(point));
      return numbers2(...ds);
    }
    mean() {
      let sum = this.reduce((A2, B2) => A2.add(B2));
      return sum.divide(this.length);
    }
    translate(vec3) {
      let translated = this.map(($) => $.add(vec3));
      return this.create(translated);
    }
    scale(scale) {
      let scaled = this.map(($) => $.times(scale));
      return this.create(scaled);
    }
    extrudeTo(vertex, scale) {
      let extruded = this.map(($) => $.extrudeTo(vertex, scale));
      return this.create(extruded);
    }
    extrudeToShape(shape2, scale) {
      let extruded = this.map((v3, i2) => v3.extrudeTo(shape2[i2], scale));
      return this.create(extruded);
    }
  };
  function shape(...elements) {
    let shp = new Shape();
    shp.push(...elements.map(($) => vector(...$)));
    return shp;
  }
  function toShape(elements) {
    return shape(...elements);
  }

  // ../packages/ruby/lib/src/array/vector2D.js
  var Vector2D = class extends Vector {
    toArray() {
      let [x2, y2] = this;
      return [x2, y2];
    }
    argument() {
      let [x2, y2] = this;
      if (x2 === 0 && y2 === 0)
        return 0;
      let angle2 = Math.atan2(y2, x2) * 180 / Math.PI;
      if (angle2 < 0)
        angle2 += 360;
      return angle2;
    }
    rotate(angle2) {
      let a2 = angle2 * Math.PI / 180;
      let s3 = Math.sin(a2);
      let c3 = Math.cos(a2);
      let [x2, y2] = this;
      let x1 = x2 * c3 - y2 * s3;
      let y1 = x2 * s3 + y2 * c3;
      return this.create([x1, y1]);
    }
    cross2D(vec3) {
      let [x1, y1] = this;
      let [x2, y2] = vec3;
      return x1 * y2 - y1 * x2;
    }
  };
  function vector2D(x2, y2) {
    let vec3 = new Vector2D();
    vec3.push(x2, y2);
    return vec3;
  }
  function vec2D2(p1, p22) {
    if (p22 === void 0) {
      let [x2, y2] = p1;
      return vector2D(x2, y2);
    } else {
      let [x1, y1] = p1;
      let [x2, y2] = p22;
      return vector2D(x2 - x1, y2 - y1);
    }
  }

  // ../packages/ruby/lib/src/array/vector3D.js
  var Vector3D = class extends Vector {
    toArray() {
      let [x2, y2, z2] = this;
      return [x2, y2, z2];
    }
    cross(vec3) {
      let [x1, y1, z1] = this;
      let [x2, y2, z2] = vec3;
      let x3 = y1 * z2 - z1 * y2;
      let y3 = z1 * x2 - x1 * z2;
      let z3 = x1 * y2 - y1 * x2;
      return this.create([x3, y3, z3]);
    }
    rotate(axis, angle2) {
      let a2 = angle2 * Math.PI / 180;
      let s3 = Math.sin(a2);
      let c3 = Math.cos(a2);
      let k2 = this.create(axis).unit();
      let term1 = this.times(c3);
      let term2 = k2.cross(this).times(s3);
      let term3 = k2.times(k2.dot(this)).times(1 - c3);
      return term1.add(term2).add(term3);
    }
    projectOnPlane(vec1, vec22) {
      let normal = this.normalToPlane(vec1, vec22);
      return this.minus(normal);
    }
    normalToPlane(vec1, vec22) {
      let v1 = this.create(vec1);
      let v22 = this.create(vec22);
      let normal = v1.cross(v22);
      return this.projectOn(normal);
    }
    projectTo2D(angle2 = 60, depth = 0.5) {
      let a2 = angle2 * Math.PI / 180;
      let s3 = Math.sin(a2);
      let c3 = Math.cos(a2);
      let [x2, y2, z2] = this;
      let x_new = x2 + depth * y2 * c3;
      let y_new = z2 + depth * y2 * s3;
      return vector2D(x_new, y_new);
    }
  };
  function vector3D(x2, y2, z2) {
    let vec3 = new Vector3D();
    vec3.push(x2, y2, z2);
    return vec3;
  }
  function vec3D2(p1, p22) {
    if (p22 === void 0) {
      let [x2, y2, z2] = p1;
      return vector3D(x2, y2, z2);
    } else {
      let [x1, y1, z1] = p1;
      let [x2, y2, z2] = p22;
      return vector3D(x2 - x1, y2 - y1, z2 - z1);
    }
  }

  // ../packages/ruby/lib/src/array/shape3D.js
  var Shape3D = class extends Shape {
    toArray() {
      return [...this.map(($) => $.toArray())];
    }
    projectTo2D(angle2 = 60, depth = 0.5) {
      let projected = this.map(($) => $.projectTo2D(angle2, depth));
      return shape2D2(...projected);
    }
  };
  function shape3D(...elements) {
    let shp = new Shape3D();
    shp.push(...elements.map(($) => vec3D2($)));
    return shp;
  }
  function toShape3D2(elements) {
    return shape3D(...elements);
  }

  // ../packages/ruby/lib/src/array/shape2D.js
  var Shape2D = class extends Shape {
    toArray() {
      return [...this.map(($) => $.toArray())];
    }
    sortAroundMean() {
      let mean = this.mean();
      this.sortBy(($) => $.minus(mean).argument());
    }
    isConvex() {
      if (this.length <= 3)
        return true;
      let clone = this.clone();
      clone.sortAroundMean();
      let cross = [];
      for (let i2 = 0; i2 < clone.length; i2++) {
        let p1 = clone.cyclicAt(i2 - 1);
        let p22 = clone.cyclicAt(i2);
        let p3 = clone.cyclicAt(i2 + 1);
        let u2 = vec2D2(p1, p22);
        let v3 = vec2D2(p22, p3);
        cross.push(u2.cross2D(v3));
      }
      cross.filter(($) => $ !== 0);
      return cross.every(($) => $ > 0) || cross.every(($) => $ < 0);
    }
    erect(vecX, vecY) {
      let vx = vec3D2(vecX);
      let vy = vec3D2(vecY);
      let erected = this.map(($) => {
        let [x2, y2] = $;
        let vx3D = vx.times(x2);
        let vy3D = vy.times(y2);
        return vx3D.add(vy3D);
      });
      return shape3D(...erected);
    }
  };
  function shape2D2(...elements) {
    let shp = new Shape2D();
    shp.push(...elements.map(($) => vec2D2($)));
    return shp;
  }
  function toShape2D2(elements) {
    return shape2D2(...elements);
  }

  // ../packages/ruby/lib/src/linear_program/inequal.js
  function toCode(ineq4) {
    if (ineq4 === "\\ge")
      return [true, true];
    if (ineq4 === "\\gt")
      return [true, false];
    if (ineq4 === "\\le")
      return [false, true];
    if (ineq4 === "\\lt")
      return [false, false];
    if (ineq4 === ">=")
      return [true, true];
    if (ineq4 === ">")
      return [true, false];
    if (ineq4 === "<=")
      return [false, true];
    if (ineq4 === "<")
      return [false, false];
    throw "cannot recognise ineq symbol!";
  }
  function toIneq(code2) {
    let [g2, e6] = code2;
    if (g2 && e6)
      return "\\ge";
    if (g2 && !e6)
      return "\\gt";
    if (!g2 && e6)
      return "\\le";
    if (!g2 && !e6)
      return "\\lt";
    throw "cannot recognise code!";
  }
  var InequalSign = class {
    constructor(sign) {
      this.code = [true, true];
      this.code = toCode(sign);
    }
    greaterThan() {
      return this.code[0];
    }
    lessThan() {
      return !this.code[0];
    }
    canEqual() {
      return this.code[1];
    }
    print() {
      return toIneq(this.code);
    }
    strict() {
      let [g2, e6] = this.code;
      return toIneq([g2, false]);
    }
    loose() {
      let [g2, e6] = this.code;
      return toIneq([g2, true]);
    }
    flip() {
      let [g2, e6] = this.code;
      return toIneq([!g2, e6]);
    }
    compare(a2, b2) {
      let [g2, e6] = this.code;
      if (g2 && e6)
        return a2 >= b2;
      if (g2 && !e6)
        return a2 > b2;
      if (!g2 && e6)
        return a2 <= b2;
      if (!g2 && !e6)
        return a2 < b2;
      throw "never, cannot recognise code!";
    }
  };
  function ineq2(sign) {
    return new InequalSign(sign);
  }

  // ../packages/ruby/lib/src/linear_program/rein.js
  var Rein = class {
    constructor(constraint2) {
      this.constraint = constraint2;
    }
    clone() {
      return new Rein(this.constraint);
    }
    contains(point) {
      let [a2, b2, i2, c3] = this.constraint;
      let [x2, y2] = point;
      return ineq2(i2).compare(a2 * x2 + b2 * y2, c3);
    }
    canEqual() {
      let [a2, b2, i2, c3] = this.constraint;
      return ineq2(i2).canEqual();
    }
    strict() {
      let [a2, b2, i2, c3] = this.constraint;
      let j2 = ineq2(i2).strict();
      return new Rein([a2, b2, j2, c3]);
    }
    loose() {
      let [a2, b2, i2, c3] = this.constraint;
      let j2 = ineq2(i2).loose();
      return new Rein([a2, b2, j2, c3]);
    }
    flip() {
      let [a2, b2, i2, c3] = this.constraint;
      let j2 = ineq2(i2).flip();
      return new Rein([a2, b2, j2, c3]);
    }
    intersectWith(another) {
      let [a1, b1, i1, c1] = this.constraint;
      let [a2, b2, i2, c22] = another.constraint;
      if (a1 / b1 === a2 / b2)
        return void 0;
      return crammer(a1, b1, c1, a2, b2, c22);
    }
    shake() {
      return Math.random() > 0.5 ? this.clone() : this.flip();
    }
    toLinear() {
      let [a2, b2, i2, c3] = this.constraint;
      return [a2, b2, -c3];
    }
    toStandard() {
      let [a2, b2, i2, c3] = this.constraint;
      return [a2, b2, c3];
    }
  };
  function rein2(constraint2) {
    return new Rein(constraint2);
  }

  // ../packages/ruby/lib/src/linear_program/reins.js
  var Reins = class extends List {
    constructor() {
      super(...arguments);
      this.EDGE = 100;
      this.EDGE_CONSTRAINTS = [
        new Rein([1, 0, "<=", this.EDGE]),
        new Rein([1, 0, ">=", -this.EDGE]),
        new Rein([0, 1, "<=", this.EDGE]),
        new Rein([0, 1, ">=", -this.EDGE])
      ];
    }
    fullConstraints() {
      let cons = this.clone();
      cons.push(...this.EDGE_CONSTRAINTS);
      return cons;
    }
    constraints() {
      return this.map(($) => $.constraint);
    }
    onEdge(point) {
      let [x2, y2] = point;
      return Math.abs(x2) + 1 >= this.EDGE || Math.abs(y2) + 1 >= this.EDGE;
    }
    contains(point) {
      return this.every(($) => $.contains(point));
    }
    looseContains(point) {
      return this.map(($) => $.loose()).every(($) => $.contains(point));
    }
    polygon() {
      let cons = this.fullConstraints();
      let vs = shape2D2();
      for (let i2 = 0; i2 < cons.length; i2++) {
        for (let j2 = i2 + 1; j2 < cons.length; j2++) {
          let p3 = cons[i2].intersectWith(cons[j2]);
          if (p3 === void 0)
            continue;
          let others = cons.clone();
          others.pull(j2);
          others.pull(i2);
          if (others.looseContains(p3))
            vs.push(vec2D2(p3));
        }
      }
      vs = vs.uniqueDeep();
      vs.sortAroundMean();
      return vs.toArray();
    }
    vertices() {
      return this.polygon().filter(($) => !this.onEdge($));
    }
    isBounded() {
      return this.polygon().every(($) => !this.onEdge($));
    }
    isConsistent() {
      return this.polygon().length > 2;
    }
    integrals() {
      let vs = toList2(this.polygon());
      let ymax = Math.ceil(vs.maxOf(([x2, y2]) => y2));
      let xmax = Math.ceil(vs.maxOf(([x2, y2]) => x2));
      let xmin = Math.floor(vs.minOf(([x2, y2]) => x2));
      let ymin = Math.floor(vs.minOf(([x2, y2]) => y2));
      let points = [];
      for (let i2 = xmin; i2 <= xmax; i2++) {
        for (let j2 = ymin; j2 <= ymax; j2++) {
          let p3 = [i2, j2];
          if (this.contains(p3))
            points.push(p3);
        }
      }
      return points;
    }
    shake() {
      let cons = this.map(($) => $.shake());
      return this.create(cons);
    }
  };
  function reins(...constraints2) {
    let cs = new Reins();
    cs.push(...constraints2.map(($) => new Rein($)));
    return cs;
  }
  function toReins2(constraints2) {
    return reins(...constraints2);
  }

  // ../packages/ruby/lib/src/linear_program/optimizer.js
  var Optimizer = class {
    constructor({ field: field2, feasiblePoints = [] }) {
      this.field = [0, 0, 0];
      this.feasiblePoints = list2();
      this.field = field2;
      this.feasiblePoints = toList2(feasiblePoints);
    }
    onEdge(point) {
      return new Reins().onEdge(point);
    }
    fieldAt(point) {
      const [a2, b2, c3] = this.field;
      const [x2, y2] = point;
      return a2 * x2 + b2 * y2 + c3;
    }
    maxPoints() {
      return this.feasiblePoints.maxsBy(($) => this.fieldAt($)).uniqueDeep().violate(($) => this.onEdge($));
    }
    minPoints() {
      return this.feasiblePoints.minsBy(($) => this.fieldAt($)).uniqueDeep().violate(($) => this.onEdge($));
    }
    optimalPoints(max) {
      return max ? this.maxPoints() : this.minPoints();
    }
    max() {
      let pts = this.maxPoints();
      if (pts.length === 0)
        return null;
      return this.fieldAt(pts[0]);
    }
    min() {
      let pts = this.minPoints();
      if (pts.length === 0)
        return null;
      return this.fieldAt(pts[0]);
    }
    optimal(max) {
      return max ? this.max() : this.min();
    }
  };
  function optimizer2({ field: field2, feasiblePoints = [] }) {
    return new Optimizer({ field: field2, feasiblePoints });
  }

  // ../packages/ruby/lib/src/math/linear.js
  function slope(A2, B2) {
    let [x1, y1] = A2;
    let [x2, y2] = B2;
    return (y2 - y1) / (x2 - x1);
  }
  function midpoint(A2, B2) {
    let [x1, y1] = A2;
    let [x2, y2] = B2;
    return [(x1 + x2) / 2, (y1 + y2) / 2];
  }
  var Linear = class {
    constructor() {
      this._linear = [NaN, NaN, NaN];
      this.defined = false;
    }
    byLinear(linear) {
      this._linear = linear;
      this.defined = true;
      return this;
    }
    byStandard(standard) {
      let [a2, b2, _c] = standard;
      this.byLinear([a2, b2, -_c]);
      return this;
    }
    byTwoPoints(p1, p22) {
      let [x1, y1] = p1;
      let [x2, y2] = p22;
      let dx = x1 - x2;
      let dy = y1 - y2;
      if (dx === 0 && dy === 0)
        return this;
      let [a2, b2, c3] = [dy, -dx, dx * y1 - dy * x1];
      let s3 = Math.sign(a2) || Math.sign(b2) || 1;
      [a2, b2, c3] = numbers2(a2, b2, c3).times(s3).ratio();
      this.byLinear([a2, b2, c3]);
      return this;
    }
    byPointSlope(p3, m3) {
      let p22 = [p3[0] + 1, p3[1] + m3];
      this.byTwoPoints(p3, p22);
      return this;
    }
    byIntercepts(x2, y2) {
      if (x2 === 0 || y2 === 0)
        return this;
      this.byTwoPoints([x2, 0], [0, y2]);
      return this;
    }
    byBisector(A2, B2) {
      let [x1, y1] = A2;
      let [x2, y2] = B2;
      if (x1 === x2 && y1 === y2)
        return this;
      if (x1 === x2) {
        this.byLinear([0, 1, -(y1 + y2) / 2]);
      } else if (y1 === y2) {
        this.byLinear([1, 0, -(x1 + x2) / 2]);
      } else {
        let m3 = -1 / slope(A2, B2);
        let M2 = midpoint(A2, B2);
        this.byPointSlope(M2, m3);
      }
      return this;
    }
    slope() {
      let [a2, b2, c3] = this._linear;
      return b2 === 0 ? NaN : -a2 / b2;
    }
    xInt() {
      let [a2, b2, c3] = this._linear;
      return a2 === 0 ? NaN : -c3 / a2;
    }
    yInt() {
      let [a2, b2, c3] = this._linear;
      return b2 === 0 ? NaN : -c3 / b2;
    }
    toLinear() {
      if (!this.defined)
        return [NaN, NaN, NaN];
      return this._linear;
    }
    toLine() {
      if (!this.defined)
        return [NaN, NaN];
      return [this.slope(), this.yInt()];
    }
    toStandard() {
      if (!this.defined)
        return [NaN, NaN, NaN];
      let [a2, b2, c3] = this._linear;
      return [a2, b2, -c3];
    }
    toConstraint(ineq4) {
      let [a2, b2, c3] = this.toStandard();
      return [a2, b2, ineq4, c3];
    }
  };
  function lin2() {
    return new Linear();
  }

  // ../packages/ruby/lib/src/math/calculus.js
  function intrapolateBetween([A2, B2], x2) {
    let [x1, y1] = A2;
    let [x22, y2] = B2;
    let r3 = (x2 - x1) / (x22 - x1);
    return y1 + (y2 - y1) * r3;
  }
  function intrapolate(sortedPts, x2) {
    let first = sortedPts[0];
    let last = sortedPts.at(-1);
    if (x2 < first[0])
      return first[1];
    if (x2 > last[0])
      return last[1];
    let j2 = sortedPts.findIndex(([X2, Y2]) => X2 > x2);
    let i2 = j2 - 1;
    return intrapolateBetween([sortedPts[i2], sortedPts[j2]], x2);
  }
  function functionize(sortedPts) {
    return function(x2) {
      return intrapolate(sortedPts, x2);
    };
  }
  function differentiate(fn) {
    return function(x2) {
      let dx = 1e-6;
      let dy = fn(x2 + dx) - fn(x2);
      return dy / dx;
    };
  }
  function integrate(fn, fixPoint = [0, 0]) {
    let cache = [...fixPoint];
    return function(x2) {
      let dx = 1e-3;
      let [x0, y0] = cache;
      if (x2 === x0)
        return y0;
      let D2 = Math.abs(x2 - x0);
      let N2 = Math.round(D2 / dx);
      N2 = Math.max(N2, 10);
      dx = (x2 - x0) / N2;
      for (let i2 = 0; i2 < N2; i2++) {
        let X2 = x0 + i2 * dx;
        y0 += 0.5 * (fn(X2) + fn(X2 + dx)) * dx;
      }
      cache = [x2, y0];
      return y0;
    };
  }

  // src/Core/Owl/index.ts
  var Owl_exports = {};
  __export(Owl_exports, {
    absBetween: () => absBetween,
    alphabet: () => alphabet,
    and: () => and,
    array: () => array,
    arrayOfLength: () => arrayOfLength,
    arrayWith: () => arrayWith,
    base: () => base,
    between: () => between,
    bool: () => bool,
    combo: () => combo,
    constraint: () => constraint,
    constraints: () => constraints,
    couple: () => couple,
    dec: () => dec,
    dfrac: () => dfrac,
    distinct: () => distinct,
    emptyObject: () => emptyObject,
    even: () => even,
    every: () => every,
    fail: () => fail,
    field: () => field,
    fraction: () => fraction,
    ineq: () => ineq3,
    int: () => int,
    interval: () => interval,
    irrational: () => irrational,
    labeledValue: () => labeledValue,
    labeledValue1: () => labeledValue1,
    labeledValue2: () => labeledValue2,
    monomial: () => monomial,
    negative: () => negative,
    negativeInt: () => negativeInt,
    nonNegative: () => nonNegative,
    nonNegativeInt: () => nonNegativeInt,
    nonPositive: () => nonPositive,
    nonPositiveInt: () => nonPositiveInt,
    nonZero: () => nonZero,
    nonZeroInt: () => nonZeroInt,
    ntuple: () => ntuple,
    num: () => num,
    object: () => object,
    odd: () => odd,
    or: () => or,
    pass: () => pass,
    point2D: () => point2D,
    point2Ds: () => point2Ds,
    point3D: () => point3D,
    point3Ds: () => point3Ds,
    polar: () => polar,
    polynomial: () => polynomial,
    positive: () => positive,
    positiveInt: () => positiveInt,
    prob: () => prob,
    properFraction: () => properFraction,
    quadrant: () => quadrant,
    quadrantCode: () => quadrantCode,
    quadrantName: () => quadrantName,
    quantity: () => quantity,
    rational: () => rational,
    roman: () => roman,
    sq: () => sq,
    str: () => str,
    terminating: () => terminating,
    triangleSides: () => triangleSides,
    trig: () => trig,
    trigExp: () => trigExp,
    trigValue: () => trigValue,
    triple: () => triple,
    vector: () => vector2,
    vector3D: () => vector3D2,
    whole: () => whole,
    zero: () => zero
  });
  var num = (_) => Number.isFinite(_);
  var whole = (_) => Number.isInteger(_);
  var int = (_) => num(_) && Number.isInteger(cal.blur(_));
  var dec = (_) => num(_) && !int(_);
  var terminating = (_) => num(_) && cal.sigfig(_) < 10;
  var rational = (_) => num(_) && cal.isRational(_);
  var irrational = (_) => num(_) && !cal.isRational(_);
  var odd = (_) => int(_) && Math.abs(cal.blur(_)) % 2 === 1;
  var even = (_) => int(_) && Math.abs(cal.blur(_)) % 2 === 0;
  var prob = (_) => num(_) && _ >= 0 && _ <= 1;
  var sq = (_) => int(_) && int(Math.sqrt(_));
  var positive = (_) => num(_) && _ > 0;
  var positiveInt = (_) => int(_) && _ > 0;
  var nonNegative = (_) => num(_) && _ >= 0;
  var nonNegativeInt = (_) => int(_) && _ >= 0;
  var negative = (_) => num(_) && _ < 0;
  var negativeInt = (_) => int(_) && _ < 0;
  var nonPositive = (_) => num(_) && _ <= 0;
  var nonPositiveInt = (_) => int(_) && _ <= 0;
  var zero = (_) => num(_) && Math.abs(_) < 1e-14;
  var nonZero = (_) => num(_) && !zero(_);
  var nonZeroInt = (_) => int(_) && !zero(_);
  var between = (min, max) => build(`between(${min},${max})`, (_) => num(_) && _ >= min && _ <= max);
  var absBetween = (min, max) => build(`absBetween(${min},${max})`, (_) => num(_) && Math.abs(_) >= min && Math.abs(_) <= max);
  var str = (_) => typeof _ === "string";
  var bool = (_) => typeof _ === "boolean";
  var object = (_) => typeof _ === "object" && _ !== null;
  var emptyObject = (_) => object(_) && !!_ && _.constructor === Object && Object.keys(_).length === 0;
  var array = (_) => Array.isArray(_);
  var arrayOfLength = (length) => build(`arrayOfLength(${length})`, (_) => array(_) && _.length === length);
  var arrayWith = (predicate) => build(`arrayWith(${predicate.name})`, (_) => array(_) && _.every(predicate));
  var couple = (_) => arrayOfLength(2)(_) && arrayWith(num)(_);
  var triple = (_) => arrayOfLength(3)(_) && arrayWith(num)(_);
  var combo = (_) => arrayOfLength(3)(_) && arrayWith(bool)(_);
  var ntuple = (_) => arrayWith(num)(_);
  var interval = (_) => couple(_) && _[0] <= _[1];
  var point2D = (_) => couple(_);
  var point2Ds = (_) => arrayWith(point2D)(_);
  var point3D = (_) => triple(_);
  var point3Ds = (_) => arrayWith(point3D)(_);
  var polar = (_) => couple(_) && _[0] >= 0;
  var fraction = (_) => couple(_);
  var properFraction = (_) => fraction(_) && _[1] !== 0;
  var vector2 = (_) => couple(_);
  var vector3D2 = (_) => triple(_);
  var triangleSides = (_) => {
    if (!triple(_))
      return false;
    let [a2, b2, c3] = _;
    return _.every(positive) && a2 + b2 > c3 && b2 + c3 > a2 && c3 + a2 > b2;
  };
  var monomial = (_) => object(_) && "coeff" in _ && "vars" in _;
  var polynomial = (_) => arrayWith(monomial)(_);
  var trigValue = (_) => arrayOfLength(2)(_) && trig(_[0]) && (num(_[1]) || str(_[1]));
  var trigExp = (_) => arrayOfLength(4)(_) && trig(_[0]) && num(_[1]) && num(_[2]) && str(_[3]);
  var labeledValue1 = (_) => arrayOfLength(2)(_) && num(_[0]) && str(_[1]);
  var labeledValue2 = (_) => arrayOfLength(3)(_) && num(_[0]) && str(_[1]) && str(_[2]);
  var labeledValue = (_) => labeledValue1(_) || labeledValue2(_);
  var quantity = (_) => object(_) && "val" in _ && "unit" in _;
  var pass = (_) => true;
  var fail = (_) => false;
  var distinct = (_) => toList(_).duplessDeep();
  var alphabet = (_) => str(_) && _.length === 1 && _.toLowerCase() !== _.toUpperCase();
  var ineq3 = (_) => str(_) && [">", "<", ">=", "<=", "\\gt", "\\lt", "\\ge", "\\le"].includes(_);
  var dfrac = (_) => {
    const f3 = String.raw`-?\\dfrac{(-?\d+\.?\d*)}{(-?\d+\.?\d*)}`;
    return str(_) && !!_.match(new RegExp(f3, "g"));
  };
  var constraint = (_) => arrayOfLength(4)(_) && num(_[0]) && num(_[1]) && ineq3(_[2]) && num(_[3]);
  var constraints = (_) => arrayWith(constraint)(_);
  var field = (_) => triple(_);
  var quadrantCode = (_) => int(_) && [1, 2, 3, 4].includes(_);
  var quadrantName = (_) => str(_) && ["I", "II", "III", "IV"].includes(_);
  var quadrant = (_) => quadrantCode(_) || quadrantName(_);
  var trig = (_) => str(_) && ["sin", "cos", "tan"].includes(_);
  var roman = (_) => str(_) && ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].includes(_);
  var base = (_) => str(_) && _.match(/[0-9A-Z]+\_\{[0-9]+\}/g) !== null;
  function build(funcName, func) {
    const holder = { [funcName](arg) {
      return func(arg);
    } };
    return holder[funcName];
  }
  function and(pds, name) {
    name ??= "(" + pds.map((f3) => f3.name).join(" && ") + ")";
    return build(name, (_) => pds.every((p3) => p3(_)));
  }
  function or(pds, name) {
    name ??= "(" + pds.map((f3) => f3.name).join(" || ") + ")";
    return build(name, (_) => pds.some((p3) => p3(_)));
  }
  function every(pd, name) {
    name ??= "(every." + pd.name + ")";
    return build(name, (_) => array(_) && _.every(pd));
  }

  // src/Core/Ink/index.ts
  var Ink_exports = {};
  __export(Ink_exports, {
    printCombo: () => printCombo,
    printConstraint: () => printConstraint,
    printConstraints: () => printConstraints,
    printDfrac: () => printDfrac,
    printLabeledValue: () => printLabeledValue,
    printOrTrigRoots: () => printOrTrigRoots,
    printPointPolar: () => printPointPolar,
    printSurd: () => printSurd,
    printTrigExp: () => printTrigExp,
    printTrigValue: () => printTrigValue
  });
  function printDfrac(numerator, denominator, upSign = false) {
    let p3 = numerator;
    let q2 = denominator;
    if (p3 === 0)
      return "0";
    [p3, q2] = cal.toFraction(p3 / q2);
    if (q2 === 1)
      return p3.toString();
    if (upSign) {
      return "\\dfrac{" + p3 + "}{" + q2 + "}";
    } else {
      return p3 > 0 ? "\\dfrac{" + p3 + "}{" + q2 + "}" : "-\\dfrac{" + Math.abs(p3) + "}{" + q2 + "}";
    }
  }
  function printCombo(combo2) {
    let [a2, b2, c3] = combo2;
    if (a2 && b2 && c3)
      return "I, II and III";
    if (a2 && b2 && !c3)
      return "I and II only";
    if (a2 && !b2 && c3)
      return "I and III only";
    if (a2 && !b2 && !c3)
      return "I only";
    if (!a2 && b2 && c3)
      return "II and III only";
    if (!a2 && b2 && !c3)
      return "II only";
    if (!a2 && !b2 && c3)
      return "III only";
    if (!a2 && !b2 && !c3)
      return "None of the above";
    throw "never";
  }
  function printTrigValue(T2) {
    if (typeof T2[1] === "number") {
      return "\\" + T2[0] + " " + T2[1] + "\xB0";
    } else {
      return "\\" + T2[0] + " " + T2[1];
    }
  }
  function printTrigExp(T2) {
    return "\\" + T2[0] + "(" + T2[1] + "\xB0" + (T2[2] > 0 ? "+" : "-") + T2[3] + ")";
  }
  function printOrTrigRoots(roots) {
    roots = roots.filter(owl.num);
    roots = roots.map((x2) => Round(x2, 5));
    let ss = roots.map((x2) => x2 + "\xB0");
    if (ss.length === 0)
      return "no solution";
    if (ss.length === 1)
      return ss[0];
    let last = ss.pop();
    return ss.join(",") + "~\\text{or}~" + last;
  }
  function printSurd(num2) {
    let [p3, q2] = cal.toSurd(num2);
    let T2;
    if (p3 === 1) {
      T2 = q2 === 1 ? "1" : "\\sqrt{" + q2 + "}";
    } else if (p3 === -1) {
      T2 = q2 === 1 ? "-1" : "-\\sqrt{" + q2 + "}";
    } else {
      T2 = q2 === 1 ? p3.toString() : p3 + "\\sqrt{" + q2 + "}";
    }
    return T2;
  }
  function printPointPolar(point) {
    let [r3, q2] = RectToPol(point);
    q2 = cal.blur(q2);
    return `(${printSurd(r3)},${q2}\xB0)`;
  }
  function printConstraint(con, align = false, replaceEqual = false) {
    let [a2, b2, i2, c3] = con;
    if (i2 === ">=")
      i2 = "\\ge";
    if (i2 === ">")
      i2 = "\\gt";
    if (i2 === "<=")
      i2 = "\\le";
    if (i2 === "<")
      i2 = "\\lt";
    let j2 = i2;
    if (replaceEqual)
      j2 = "=";
    if (align)
      j2 = " & " + j2;
    if (a2 === 0 && b2 === 0)
      return ` 0 ${j2} ${c3} `;
    if (a2 !== 0 && b2 === 0)
      return ` ${a2}x ${j2} ${c3} `;
    if (a2 === 0 && b2 !== 0)
      return ` ${b2}y ${j2} ${c3} `;
    return ` ${a2}x + ${b2}y ${j2} ${c3} `;
  }
  function printConstraints(cons) {
    let T2 = "";
    T2 += " \\left\\{ \\begin{aligned} ";
    for (let c3 of cons) {
      T2 += printConstraint(c3, true) + " \\\\ ";
    }
    T2 += " \\end{aligned} \\right. ";
    return T2;
  }
  function printLabeledValue(obj, order = 1, isAngle = false) {
    let value = obj[0];
    let label = obj[order];
    let T2 = label + " = " + value;
    if (isAngle)
      T2 += "\xB0";
    return T2;
  }

  // src/Core/index.ts
  globalThis.cal = cal_exports;
  globalThis.data = data;
  globalThis.list = list2;
  globalThis.numbers = numbers2;
  globalThis.shape = shape;
  globalThis.shape2D = shape2D2;
  globalThis.shape3D = shape3D;
  globalThis.vector = vector;
  globalThis.vector2D = vector2D;
  globalThis.vector3D = vector3D;
  globalThis.toData = toData2;
  globalThis.toList = toList2;
  globalThis.toNumbers = toNumbers2;
  globalThis.toShape = toShape;
  globalThis.toShape2D = toShape2D2;
  globalThis.toShape3D = toShape3D2;
  globalThis.toVector = toVector;
  globalThis.vec2D = vec2D2;
  globalThis.vec3D = vec3D2;
  globalThis.ineq = ineq2;
  globalThis.optimizer = optimizer2;
  globalThis.rein = rein2;
  globalThis.toReins = toReins2;
  globalThis.lin = lin2;
  globalThis.owl = Owl_exports;
  globalThis.ink = Ink_exports;

  // ../packages/contract/lib/src/util.js
  function error(msg) {
    const e6 = new Error(msg);
    e6.name = "ContractError";
    return e6;
  }
  function signature(f3) {
    const s3 = f3.toString();
    return s3.slice(s3.indexOf("(") + 1, s3.indexOf(")"));
  }
  function str2(obj) {
    return JSON.stringify(obj);
  }
  function join(arr) {
    return arr.map(str2).join(",");
  }
  function err(f3, ...msgs) {
    const h2 = `${f3.wax_name}(${f3.wax_signature})`;
    const ms = [h2, ...msgs];
    return error(ms.join("\n"));
  }
  function brand(f3) {
    if (!("wax_name" in f3))
      f3.wax_name = f3.name ?? f3.toString();
    if (!("wax_signature" in f3))
      f3.wax_signature = signature(f3);
  }
  function transferBrand(source, target) {
    target.wax_name = source.wax_name;
    target.wax_signature = source.wax_signature;
  }
  function makeStaticDecorator(transform) {
    return function(target, key, descriptor) {
      descriptor.value = transform(descriptor.value);
      return descriptor;
    };
  }
  function getClassStaticNames(constructor) {
    return Object.getOwnPropertyNames(constructor).filter(($) => $ !== "length" && $ !== "prototype" && $ !== "name");
  }

  // ../packages/contract/lib/src/functions/capture.js
  function catchString(f3, vals, e6) {
    return err(f3, "args = (" + join(vals) + ")", "throw: " + e6);
  }
  function catchErrObj(f3, vals, e6) {
    return err(f3, "args = (" + join(vals) + ")", "throw: " + e6.name, "message: " + e6.message);
  }
  function catchAny(f3, vals, e6) {
    return err(f3, "args = (" + join(vals) + ")", "throw: " + str2(e6));
  }
  function isError(e6) {
    return typeof e6 === "object" && e6 !== null && "name" in e6 && "message" in e6;
  }
  function isContractError(e6) {
    return isError(e6) && e6.name === "ContractError";
  }
  function catchErr(f3, vals, e6) {
    if (isContractError(e6))
      return e6;
    if (typeof e6 === "string")
      return catchString(f3, vals, e6);
    if (isError(e6))
      return catchErrObj(f3, vals, e6);
    return catchAny(f3, vals, e6);
  }
  function capture(f3) {
    brand(f3);
    const nf = (...args) => {
      try {
        return f3(...args);
      } catch (e6) {
        throw catchErr(f3, args, e6);
      }
    };
    transferBrand(f3, nf);
    return nf;
  }
  function captureAll() {
    return function(constructor) {
      for (let key of getClassStaticNames(constructor)) {
        let descriptor = Object.getOwnPropertyDescriptor(constructor, key);
        if (descriptor !== void 0) {
          descriptor.value = capture(descriptor.value);
          Object.defineProperty(constructor, key, descriptor);
        }
      }
    };
  }

  // ../packages/contract/lib/src/assertion/rule.js
  function nameOf(f3) {
    return f3.name ?? f3.toString();
  }
  function matchOne(val2, rule) {
    return rule(val2) ? true : nameOf(rule);
  }
  function matchAnd(val2, rule) {
    for (let p3 of rule)
      if (!p3(val2))
        return nameOf(p3);
    return true;
  }
  function matchObj(val2, rule) {
    for (let k2 in rule) {
      const has = k2 in val2;
      if (!has)
        return "should have property: " + k2;
      const p3 = rule[k2];
      const pass2 = p3(val2[k2]);
      if (!pass2)
        return k2 + " -> " + nameOf(p3);
    }
    return true;
  }
  function isOne(rule) {
    return typeof rule === "function";
  }
  function isAnd(rule) {
    return Array.isArray(rule);
  }
  function isObj(rule) {
    return typeof rule === "object" && !Array.isArray(rule) && rule !== null;
  }
  function matchRule(val2, rule) {
    if (isOne(rule))
      return matchOne(val2, rule);
    if (isAnd(rule))
      return matchAnd(val2, rule);
    if (isObj(rule))
      return matchObj(val2, rule);
    return "fail to recognize the rule";
  }

  // ../packages/contract/lib/src/assertion/treaty.js
  function nameOf2(f3) {
    return f3.name ?? f3.toString();
  }
  function matchOne2(vals, treaty) {
    return treaty(...vals) ? true : nameOf2(treaty);
  }
  function matchAnd2(vals, treaty) {
    for (let p3 of treaty)
      if (!p3(...vals))
        return nameOf2(p3);
    return true;
  }
  function isOne2(treaty) {
    return typeof treaty === "function";
  }
  function isAnd2(treaty) {
    return Array.isArray(treaty);
  }
  function matchTreaty(vals, treaty) {
    if (isOne2(treaty))
      return matchOne2(vals, treaty);
    if (isAnd2(treaty))
      return matchAnd2(vals, treaty);
    return "fail to recognize the rule";
  }

  // ../packages/contract/lib/src/functions/check.js
  function getToTail(arr, index) {
    const n2 = arr.length - 1;
    const i2 = Math.min(index, n2);
    return arr[i2];
  }
  function e3(f3, argIndex, argValue, msg) {
    return err(f3, "arg[" + argIndex + "] = " + str2(argValue), "violate: " + msg);
  }
  function match(f3, argIndex, argValue, rule) {
    const pass2 = matchRule(argValue, rule);
    if (pass2 !== true)
      throw e3(f3, argIndex, argValue, pass2);
  }
  function check(f3, rules) {
    brand(f3);
    const nf = (...args) => {
      args.forEach((v3, i2) => match(f3, i2, v3, getToTail(rules, i2)));
      return f3(...args);
    };
    transferBrand(f3, nf);
    return nf;
  }
  function checkIt(...rules) {
    return makeStaticDecorator(($) => check($, rules));
  }

  // ../packages/contract/lib/src/functions/inspect.js
  function e4(f3, vals, msg) {
    return err(f3, "args = (" + join(vals) + ")", "violate: " + msg);
  }
  function match2(f3, vals, treaty) {
    const pass2 = matchTreaty(vals, treaty);
    if (pass2 !== true)
      throw e4(f3, vals, pass2);
  }
  function inspect(f3, treaty) {
    brand(f3);
    const nf = (...args) => {
      match2(f3, args, treaty);
      return f3(...args);
    };
    transferBrand(f3, nf);
    return nf;
  }
  function inspectIt(treaty) {
    return makeStaticDecorator(($) => inspect($, treaty));
  }

  // ../packages/contract/lib/src/functions/expose.js
  function expose(name, f3) {
    globalThis[String(name)] = f3;
  }
  function exposeAll() {
    return function(constructor) {
      for (let key of getClassStaticNames(constructor)) {
        let descriptor = Object.getOwnPropertyDescriptor(constructor, key);
        if (descriptor !== void 0) {
          expose(key, descriptor.value);
        }
      }
    };
  }

  // src/Math/Code/Assertion.ts
  var Host = class {
    static IsNum(...items) {
      return items.every(owl.num);
    }
    static IsInteger(...items) {
      return items.every(owl.int);
    }
    static IsDecimal(...items) {
      return items.every(owl.dec);
    }
    static IsTerminating(...items) {
      return items.every(owl.terminating);
    }
    static IsRational(...items) {
      return items.every(owl.rational);
    }
    static IsOdd(...items) {
      return items.every(owl.odd);
    }
    static IsEven(...items) {
      return items.every(owl.even);
    }
    static IsProbability(...items) {
      return items.every(owl.prob);
    }
    static IsSquareNum(...items) {
      return items.every(owl.sq);
    }
    static IsPositive(...items) {
      return items.every(owl.positive);
    }
    static IsNonNegative(...items) {
      return items.every(owl.nonNegative);
    }
    static IsPositiveInteger(...items) {
      return items.every(owl.positiveInt);
    }
    static IsNonNegativeInteger(...items) {
      return items.every(owl.nonNegativeInt);
    }
    static IsNegative(...items) {
      return items.every(owl.negative);
    }
    static IsNonZero(...items) {
      return items.every(owl.nonZero);
    }
    static IsBetween(min, max) {
      return (...items) => items.every(owl.between(min, max));
    }
    static IsAbsBetween(min, max) {
      return (...items) => items.every(owl.absBetween(min, max));
    }
    static IsAroundPoint(anchor, range2) {
      return (...points) => points.every((p3) => ChessboardDistance(anchor, p3) <= range2);
    }
    static IsTriangle(...triangles) {
      return triangles.every(owl.triangleSides);
    }
  };
  __decorateClass([
    checkIt(owl.num),
    inspectIt(function is_range(min, max) {
      return min < max;
    })
  ], Host, "IsBetween", 1);
  __decorateClass([
    checkIt(owl.nonNegative),
    inspectIt(function is_range(min, max) {
      return min < max;
    })
  ], Host, "IsAbsBetween", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.positive)
  ], Host, "IsAroundPoint", 1);
  __decorateClass([
    checkIt(owl.triple)
  ], Host, "IsTriangle", 1);
  Host = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host);

  // src/Math/Code/Combinatorics.ts
  var Host2 = class {
    static Factorial(n2) {
      return cal.factorial(n2);
    }
    static nCr(n2, r3) {
      return cal.nCr(n2, r3);
    }
    static nPr(n2, r3) {
      return cal.nPr(n2, r3);
    }
  };
  __decorateClass([
    checkIt(owl.nonNegativeInt)
  ], Host2, "Factorial", 1);
  __decorateClass([
    checkIt(owl.nonNegativeInt),
    inspectIt(function r_less_than_n(n2, r3) {
      return n2 >= r3;
    })
  ], Host2, "nCr", 1);
  __decorateClass([
    checkIt(owl.nonNegativeInt),
    inspectIt(function r_less_than_n(n2, r3) {
      return n2 >= r3;
    })
  ], Host2, "nPr", 1);
  Host2 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host2);

  // src/Math/Code/Function.ts
  var Host3 = class {
    static log(b2, N2) {
      const v3 = Math.log(N2) / Math.log(b2);
      return cal.blur(v3);
    }
    static Power(a2, b2) {
      const v3 = Math.pow(a2, b2);
      return cal.blur(v3);
    }
    static Sqrt(x2) {
      const v3 = Math.sqrt(x2);
      return cal.blur(v3);
    }
    static Radian(degree) {
      const v3 = degree / 180 * Math.PI;
      return cal.blur(v3);
    }
    static Degree(radian) {
      const v3 = radian * 180 / Math.PI;
      return cal.blur(v3);
    }
    static sin(x2) {
      if (x2 % 180 === 0)
        return 0;
      let v3 = Math.sin(x2 / 180 * Math.PI);
      return cal.blur(v3);
    }
    static cos(x2) {
      if ((x2 - 90) % 180 === 0)
        return 0;
      let v3 = Math.cos(x2 / 180 * Math.PI);
      return cal.blur(v3);
    }
    static tan(x2) {
      if (x2 % 180 === 0)
        return 0;
      let v3 = Math.tan(x2 / 180 * Math.PI);
      return cal.blur(v3);
    }
    static arcsin(x2) {
      let v3 = Math.asin(x2) * 180 / Math.PI;
      return cal.blur(v3);
    }
    static arccos(x2) {
      let v3 = Math.acos(x2) * 180 / Math.PI;
      return cal.blur(v3);
    }
    static arctan(x2) {
      let v3 = Math.atan(x2) * 180 / Math.PI;
      return cal.blur(v3);
    }
  };
  __decorateClass([
    checkIt(owl.positive)
  ], Host3, "log", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host3, "Power", 1);
  __decorateClass([
    checkIt(owl.nonNegative)
  ], Host3, "Sqrt", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host3, "Radian", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host3, "Degree", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host3, "sin", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host3, "cos", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host3, "tan", 1);
  __decorateClass([
    checkIt(owl.between(-1, 1))
  ], Host3, "arcsin", 1);
  __decorateClass([
    checkIt(owl.between(-1, 1))
  ], Host3, "arccos", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host3, "arctan", 1);
  Host3 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host3);

  // src/Math/Code/Geometry.ts
  var Host4 = class {
    static Slope(A2, B2) {
      return (A2[1] - B2[1]) / (A2[0] - B2[0]);
    }
    static SlopePd(A2, B2) {
      return -1 / Slope(A2, B2);
    }
    static Distance(A2, B2) {
      return ((A2[0] - B2[0]) ** 2 + (A2[1] - B2[1]) ** 2) ** 0.5;
    }
    static ChessboardDistance(A2, B2) {
      let x2 = Abs(A2[0] - B2[0]);
      let y2 = Abs(A2[1] - B2[1]);
      return Max(x2, y2);
    }
    static Mid(...points) {
      return toShape2D(points).mean().toArray();
    }
    static Slide(A2, B2, ratio) {
      let r3 = ratio;
      let s3 = 1 - r3;
      return [A2[0] * s3 + B2[0] * r3, A2[1] * s3 + B2[1] * r3];
    }
    static Rotate(P2, q2, O2 = [0, 0]) {
      return vec2D(O2, P2).rotate(q2).add(O2).blur().toArray();
    }
    static Dir(A2, B2) {
      return vec2D(A2, B2).argument();
    }
    static PdFoot(A2, B2, P2) {
      return vec2D(A2, P2).projectOn(vec2D(A2, B2)).add(A2).toArray();
    }
    static Intersection(A2, B2, C2, D2) {
      return Crammer(B2[1] - A2[1], A2[0] - B2[0], A2[0] * B2[1] - B2[0] * A2[1], D2[1] - C2[1], C2[0] - D2[0], C2[0] * D2[1] - D2[0] * C2[1]);
    }
    static Move(P2, dir3, distance) {
      let q2 = 0;
      if (typeof dir3 === "number") {
        q2 = dir3;
      } else if (owl.point2D(dir3)) {
        q2 = Dir(P2, dir3);
      } else {
        q2 = Dir(dir3[0], dir3[1]);
      }
      let x2 = P2[0] + distance * cos(q2);
      let y2 = P2[1] + distance * sin(q2);
      return [x2, y2];
    }
    static MoveX(P2, distance) {
      let [x2, y2] = P2;
      return [x2 + distance, y2];
    }
    static MoveY(P2, distance) {
      let [x2, y2] = P2;
      return [x2, y2 + distance];
    }
    static Shift(P2, [A2, B2], scale = 1) {
      let [x2, y2] = P2;
      let [xA, yA] = A2;
      let [xB, yB] = B2;
      return [x2 + (xB - xA) * scale, y2 + (yB - yA) * scale];
    }
    static ReflectX(P2) {
      return [P2[0], -P2[1]];
    }
    static ReflectY(P2) {
      return [-P2[0], P2[1]];
    }
    static IntersectAngle(slope1, slope2) {
      let A1 = arctan(slope1);
      let A2 = arctan(slope2);
      let d2 = Abs(A1 - A2);
      if (d2 > 90)
        d2 = 180 - d2;
      return d2;
    }
    static Angle(A2, O2, B2) {
      let anglePolar = AnglePolar(A2, O2, B2);
      let a2 = IsReflex(A2, O2, B2) ? 360 - anglePolar : anglePolar;
      return cal.blur(a2);
    }
    static AnglePolar(A2, O2, B2) {
      let a2 = vec2D(O2, A2).argument();
      let b2 = vec2D(O2, B2).argument();
      return a2 <= b2 ? b2 - a2 : 360 + b2 - a2;
    }
    static IsReflex(A2, O2, B2) {
      let angle2 = AnglePolar(A2, O2, B2);
      return angle2 > 180;
    }
    static RegularPolygon(n2, center, radius, startAngle) {
      let a2 = 360 / n2;
      let arr = [];
      for (let i2 = 0; i2 < n2; i2++) {
        let p3 = PolToRect([radius, startAngle + i2 * a2]);
        p3[0] += center[0];
        p3[1] += center[1];
        p3[0] = cal.blur(p3[0]);
        p3[1] = cal.blur(p3[1]);
        arr.push(p3);
      }
      return arr;
    }
    static ArcLength(radius, theta) {
      return 2 * Math.PI * radius * theta / 360;
    }
    static SectorArea(radius, theta) {
      return Math.PI * radius * radius * theta / 360;
    }
    static IsConvexPolygon(...points) {
      Should(points.length >= 3, "must have at least 3 points to be a polygon");
      return toShape2D(points).isConvex();
    }
    static ArrangePoints(...points) {
      let ss = toShape2D(points);
      ss.sortAroundMean();
      return ss.toArray();
    }
    static OnCircle(angle2) {
      return PolToRect([1, angle2]);
    }
  };
  __decorateClass([
    checkIt(owl.point2D),
    inspectIt(function not_vertical(A2, B2) {
      return !cal.eq(A2[0], B2[0]);
    })
  ], Host4, "Slope", 1);
  __decorateClass([
    checkIt(owl.point2D),
    inspectIt(function not_horizontal(A2, B2) {
      return !cal.eq(A2[1], B2[1]);
    })
  ], Host4, "SlopePd", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host4, "Distance", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host4, "ChessboardDistance", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host4, "Mid", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.point2D, owl.num)
  ], Host4, "Slide", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.num, owl.point2D)
  ], Host4, "Rotate", 1);
  __decorateClass([
    checkIt(owl.point2D),
    inspectIt(function distinct_points(A2, B2) {
      return owl.distinct([A2, B2]);
    })
  ], Host4, "Dir", 1);
  __decorateClass([
    checkIt(owl.point2D),
    inspectIt(function distinct_points(A2, B2, P2) {
      return owl.distinct([A2, B2]);
    })
  ], Host4, "PdFoot", 1);
  __decorateClass([
    checkIt(owl.point2D),
    inspectIt(function distinct_points(A2, B2, C2, D2) {
      return owl.distinct([A2, B2]) && owl.distinct([C2, D2]);
    })
  ], Host4, "Intersection", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.or([owl.num, owl.point2D, owl.arrayWith(owl.point2D)]), owl.num)
  ], Host4, "Move", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.num)
  ], Host4, "MoveX", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.num)
  ], Host4, "MoveY", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.point2Ds, owl.num)
  ], Host4, "Shift", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host4, "ReflectX", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host4, "ReflectY", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host4, "IntersectAngle", 1);
  __decorateClass([
    checkIt(owl.point2D),
    inspectIt(function distinct_points(A2, O2, B2) {
      return owl.distinct([A2, O2]) && owl.distinct([B2, O2]);
    })
  ], Host4, "Angle", 1);
  __decorateClass([
    checkIt(owl.point2D),
    inspectIt(function distinct_points(A2, O2, B2) {
      return owl.distinct([A2, O2]) && owl.distinct([B2, O2]);
    })
  ], Host4, "AnglePolar", 1);
  __decorateClass([
    checkIt(owl.point2D),
    inspectIt(function distinct_points(A2, O2, B2) {
      return owl.distinct([A2, O2]) && owl.distinct([B2, O2]);
    })
  ], Host4, "IsReflex", 1);
  __decorateClass([
    checkIt(owl.num, owl.point2D, owl.num, owl.num)
  ], Host4, "RegularPolygon", 1);
  __decorateClass([
    checkIt(owl.nonNegative, owl.nonNegative)
  ], Host4, "ArcLength", 1);
  __decorateClass([
    checkIt(owl.nonNegative, owl.nonNegative)
  ], Host4, "SectorArea", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host4, "IsConvexPolygon", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host4, "ArrangePoints", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host4, "OnCircle", 1);
  Host4 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host4);

  // src/Math/Code/Latex.ts
  var Host5 = class {
    static StemAndLeaf({ data: data2, labels, stem = "(tens)", leaf = "(units)" }) {
      let T2 = "";
      T2 += "\\begin{array}{r|l}";
      T2 += `\\text{Stem} & \\text{Leaf} \\\\ `;
      T2 += `\\text{${stem}} & \\text{${leaf}} \\\\ \\hline `;
      function ten(num2) {
        return Math.floor(num2 / 10 + Number.EPSILON);
      }
      function unit(num2) {
        return num2 - ten(num2) * 10;
      }
      function parse(label) {
        if (typeof label === "number")
          return unit(label).toString();
        return label;
      }
      labels ??= [...data2];
      let parsedLabels = labels.map(parse);
      let initTen = ten(Math.min(...data2));
      let endTen = ten(Math.max(...data2));
      for (let t2 = initTen; t2 <= endTen; t2++) {
        T2 += t2 + " & { \\begin{array}{} ";
        let units = [];
        for (let i2 = 0; i2 < data2.length; i2++) {
          if (ten(data2[i2]) === t2)
            units.push(parsedLabels[i2]);
        }
        T2 += units.join(" & ");
        T2 += " \\end{array} } \\\\ ";
      }
      T2 += " \\end{array}";
      return T2;
    }
    static Table({ content, columns, rows, stretch }) {
      let nCol = Math.max(...content.map(($) => $.length));
      columns ??= Array(nCol + 1).fill("|").join("c");
      let nRow = content.length;
      rows ??= Array(nRow + 1).fill("|").join("r");
      let rowsArr = rows.split("r").map(($) => $.replace(/\|/g, " \\hline ").replace(/\:/g, " \\hdashline "));
      let T2 = "";
      if (stretch)
        T2 += "\\def \\arraystretch{1.5} ";
      T2 += `\\begin{array}{${columns}}`;
      function parseCell(cell) {
        if (typeof cell === "number")
          return String(cell);
        return cell.startsWith("$") ? cell.substring(1) : `\\text{${cell}}`;
      }
      let i2 = 0;
      for (let row of content) {
        T2 += rowsArr[i2] ?? "";
        T2 += row.map(parseCell).join(" & ") + " \\\\ ";
        i2++;
      }
      T2 += rowsArr[i2] ?? "";
      T2 += ` \\end{array}`;
      return T2;
    }
    static FreqTable({ data: data2, dataLabel, freqLabel }) {
      let values = ListIntegers(Math.min(...data2), Math.max(...data2));
      let freqs = Freqs(data2, values);
      return Table({
        content: [
          [dataLabel, ...values],
          [freqLabel, ...freqs]
        ]
      });
    }
    static PairTable({
      rowTitle,
      colTitle,
      rows,
      cols,
      cell
    }) {
      function parseCell(cell2) {
        if (typeof cell2 === "number")
          return String(cell2);
        return cell2.startsWith("$") ? cell2.substring(1) : `\\text{${cell2}}`;
      }
      colTitle = parseCell(colTitle);
      rowTitle = parseCell(rowTitle);
      function cellMap(r3, c3) {
        let val2 = cell(r3, c3);
        if (typeof val2 === "number")
          return String(val2);
        if (typeof val2 === "string")
          return val2;
        if (typeof val2 === "boolean")
          return val2 ? "\u2714" : "\u2718";
        return String(val2);
      }
      let T2 = "";
      T2 += "\\begin{matrix}";
      T2 += ` & ${colTitle} \\\\`;
      T2 += ` ${rowTitle} & {`;
      T2 += `\\begin{array}{c|ccc}`;
      T2 += ` & ` + cols.join(" & ") + " \\\\ \\hline ";
      for (let r3 of rows) {
        T2 += " " + String(r3) + " & ";
        T2 += cols.map((c3) => cellMap(r3, c3)).join(" & ");
        T2 += " \\\\";
      }
      T2 += " \\end{array}";
      T2 += ` } `;
      T2 += `\\end{matrix}`;
      return T2;
    }
    static CheckVertices({ constraints: constraints2, field: field2, label }) {
      let T2 = "";
      let vs = toReins(constraints2).vertices();
      for (let v3 of vs) {
        T2 += "\\text{At } " + Coord(v3) + ":~~~";
        T2 += label + " = " + optimizer({ field: field2 }).fieldAt(v3) + " \\\\ ";
      }
      return T2;
    }
  };
  Host5 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host5);

  // src/Math/Code/LinearProgram.ts
  var Host6 = class {
    static FieldAt(point, field2) {
      return optimizer({ field: field2 }).fieldAt(point);
    }
    static isConstrained(cons, point) {
      return toReins(cons).contains(point);
    }
    static isLooseConstrained(cons, point) {
      return toReins(cons).looseContains(point);
    }
    static FeasiblePolygon(...cons) {
      let vs = toReins(cons).polygon();
      Should(vs.length > 2, "No feasible region.");
      return vs;
    }
    static FeasibleVertices(...cons) {
      let vs = toReins(cons).vertices();
      Should(vs.length > 0, "no feasible vertex");
      return vs;
    }
    static FeasibleIsBounded(...cons) {
      return toReins(cons).isBounded();
    }
    static FeasibleIntegral(...cons) {
      return toReins(cons).integrals();
    }
    static MaximizePoint(points, field2) {
      Should(points.length > 0, "No feasible point");
      let pts = optimizer({
        field: field2,
        feasiblePoints: points
      }).maxPoints();
      Should(pts.length > 0, "No max point");
      Should(pts.length < 2, "Multiple max points");
      return pts[0];
    }
    static MinimizePoint(points, field2) {
      Should(points.length > 0, "No feasible point");
      let pts = optimizer({
        field: field2,
        feasiblePoints: points
      }).minPoints();
      Should(pts.length > 0, "No min point");
      Should(pts.length < 2, "Multiple min points");
      return pts[0];
    }
    static OptimizePoint(points, field2, max) {
      return max ? MaximizePoint(points, field2) : MinimizePoint(points, field2);
    }
    static MaximizeField(points, field2) {
      let op = optimizer({
        field: field2,
        feasiblePoints: points
      });
      let val2 = op.max();
      Should(val2 !== null, "No optimal value for this field!");
      return val2;
    }
    static MinimizeField(points, field2) {
      let op = optimizer({
        field: field2,
        feasiblePoints: points
      });
      let val2 = op.min();
      Should(val2 !== null, "No optimal value for this field!");
      return val2;
    }
    static OptimizeField(points, field2, max) {
      return max ? MaximizeField(points, field2) : MinimizeField(points, field2);
    }
    static ConstraintsFromPoints(...points) {
      Should(IsConvexPolygon(...points), "Not a convex region");
      let mean = toShape2D(points).mean().toArray();
      let pts = ArrangePoints(...points);
      pts = [...pts, pts[0]];
      let constraints2 = [];
      for (let i2 = 0; i2 < points.length; i2++) {
        let A2 = pts[i2];
        let B2 = pts[i2 + 1];
        let [a2, b2, c3] = LinearFromTwoPoints(A2, B2);
        let sign = FieldAt(mean, [a2, b2, c3]) > 0 ? "\\ge" : "\\le";
        constraints2.push([a2, b2, sign, -c3]);
      }
      return constraints2;
    }
  };
  __decorateClass([
    checkIt(owl.point2D, owl.field)
  ], Host6, "FieldAt", 1);
  __decorateClass([
    checkIt(owl.constraints, owl.point2D)
  ], Host6, "isConstrained", 1);
  __decorateClass([
    checkIt(owl.constraints, owl.point2D)
  ], Host6, "isLooseConstrained", 1);
  __decorateClass([
    checkIt(owl.constraint)
  ], Host6, "FeasiblePolygon", 1);
  __decorateClass([
    checkIt(owl.constraint)
  ], Host6, "FeasibleVertices", 1);
  __decorateClass([
    checkIt(owl.constraint)
  ], Host6, "FeasibleIsBounded", 1);
  __decorateClass([
    checkIt(owl.constraint)
  ], Host6, "FeasibleIntegral", 1);
  __decorateClass([
    checkIt(owl.point2Ds, owl.field)
  ], Host6, "MaximizePoint", 1);
  __decorateClass([
    checkIt(owl.point2Ds, owl.field)
  ], Host6, "MinimizePoint", 1);
  __decorateClass([
    checkIt(owl.point2Ds, owl.field, owl.bool)
  ], Host6, "OptimizePoint", 1);
  __decorateClass([
    checkIt(owl.point2Ds, owl.field)
  ], Host6, "MaximizeField", 1);
  __decorateClass([
    checkIt(owl.point2Ds, owl.field)
  ], Host6, "MinimizeField", 1);
  __decorateClass([
    checkIt(owl.point2Ds, owl.field, owl.bool)
  ], Host6, "OptimizeField", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host6, "ConstraintsFromPoints", 1);
  Host6 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host6);

  // src/Math/Code/Numeracy.ts
  var Host7 = class {
    static Divide(dividend, divisor) {
      return dividend / divisor;
    }
    static Abs(num2) {
      return Math.abs(num2);
    }
    static Sign(num2) {
      if (num2 > 0)
        return 1;
      if (num2 < 0)
        return -1;
      return 0;
    }
    static SigFig(num2) {
      return cal.sigfig(cal.blur(num2));
    }
    static Round(num2, sigfig2 = 3) {
      num2 = num2 * (1 + Number.EPSILON);
      return cal.round(num2, sigfig2).off();
    }
    static RoundUp(num2, sigfig2 = 3) {
      num2 = num2 * (1 - Number.EPSILON);
      return cal.round(num2, sigfig2).up();
    }
    static RoundDown(num2, sigfig2 = 3) {
      num2 = num2 * (1 + Number.EPSILON);
      return cal.round(num2, sigfig2).down();
    }
    static Fix(num2, dp2 = 0) {
      num2 = num2 * (1 + Number.EPSILON);
      return cal.fix(num2, dp2).off();
    }
    static FixUp(num2, dp2 = 0) {
      num2 = num2 * (1 - Number.EPSILON);
      return cal.fix(num2, dp2).up();
    }
    static FixDown(num2, dp2 = 0) {
      num2 = num2 * (1 + Number.EPSILON);
      return cal.fix(num2, dp2).down();
    }
    static Ceil(num2) {
      return Math.ceil(num2);
    }
    static Floor(num2) {
      return Math.floor(num2);
    }
    static Ratio(...nums) {
      return toNumbers(nums).ratio();
    }
    static HCF(...nums) {
      return toNumbers(nums).hcf();
    }
    static LCM(...nums) {
      return toNumbers(nums).lcm();
    }
    static ToFrac(num2) {
      return cal.toFraction(num2);
    }
  };
  __decorateClass([
    checkIt(owl.num, owl.nonZero)
  ], Host7, "Divide", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host7, "Abs", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host7, "Sign", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host7, "SigFig", 1);
  __decorateClass([
    checkIt(owl.num, owl.positiveInt)
  ], Host7, "Round", 1);
  __decorateClass([
    checkIt(owl.num, owl.positiveInt)
  ], Host7, "RoundUp", 1);
  __decorateClass([
    checkIt(owl.num, owl.positiveInt)
  ], Host7, "RoundDown", 1);
  __decorateClass([
    checkIt(owl.num, owl.int)
  ], Host7, "Fix", 1);
  __decorateClass([
    checkIt(owl.num, owl.int)
  ], Host7, "FixUp", 1);
  __decorateClass([
    checkIt(owl.num, owl.int)
  ], Host7, "FixDown", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host7, "Ceil", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host7, "Floor", 1);
  __decorateClass([
    checkIt(owl.rational)
  ], Host7, "Ratio", 1);
  __decorateClass([
    checkIt(owl.nonZeroInt)
  ], Host7, "HCF", 1);
  __decorateClass([
    checkIt(owl.nonZeroInt)
  ], Host7, "LCM", 1);
  __decorateClass([
    checkIt(owl.rational)
  ], Host7, "ToFrac", 1);
  Host7 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host7);

  // src/Math/Code/PhyConst.ts
  var PhyConstObj = {
    R: 8.31,
    N_A: 602e21,
    g: 9.81,
    G: 667e-13,
    c: 3e8,
    e: 16e-20,
    m_e: 911e-33,
    epsilon_0: 885e-14,
    mu_0: 4 * Math.PI * 1e-7,
    m_u: 1661e-30,
    au: 15e10,
    light_year: 946e13,
    parsec: 309e14,
    sigma: 567e-10,
    h: 663e-36
  };
  globalThis.PhyConst = PhyConstObj;

  // src/Math/Code/PhyEq.ts
  function makeFn(args, body) {
    const paras = args.join(",");
    return new Function("return (" + paras + ") => (" + body.toString() + ").apply(null,[" + args + "])")();
  }
  function makeLatex(args, template, units, brackets) {
    let T2 = template;
    for (let i2 = 0; i2 < args.length; i2++) {
      const [l3, r3] = brackets[i2] === "|" ? ["(", ")"] : ["", ""];
      const u2 = units[i2];
      T2 = T2.replace("@", u2 + l3 + args[i2] + r3);
    }
    return T2;
  }
  var PhyEqCls = class {
    Motion = {
      vuat(v3 = "v", u2 = "u", a2 = "a", t2 = "t", $ = "****") {
        let args = [v3, u2, a2, t2];
        return [
          makeFn(args, (v4, u3, a3, t3) => v4 - u3 - a3 * t3),
          makeLatex(args, "@=@+@@", $, "::||")
        ];
      },
      vu2as(v3 = "v", u2 = "u", a2 = "a", s3 = "s", $ = "****") {
        let args = [v3, u2, a2, s3];
        return [
          makeFn(args, (v4, u3, a3, s4) => v4 ** 2 - u3 ** 2 - 2 * a3 * s4),
          makeLatex(args, "@^2=@^2+2@@", $, "||||")
        ];
      },
      sutat2(s3 = "s", u2 = "u", t2 = "t", a2 = "a", $ = "****") {
        let args = [s3, u2, t2, a2];
        let [_s, _u, _t, _a] = $;
        return [
          makeFn(args, (s4, u3, t3, a3) => s4 - u3 * t3 - 0.5 * a3 * t3 * t3),
          makeLatex([s3, u2, t2, a2, t2], "@=@@+\\dfrac{1}{2}@@^2", [_s, _u, _t, _a, _t].join(""), ":||||")
        ];
      },
      suvt(s3 = "s", u2 = "u", v3 = "v", t2 = "t", $ = "****") {
        let args = [s3, u2, v3, t2];
        return [
          makeFn(args, (s4, u3, v4, t3) => s4 - 0.5 * (u3 + v4) * t3),
          makeLatex(args, "@=\\dfrac{1}{2}(@+@)@", $, ":::|")
        ];
      },
      sat2(s3 = "s", a2 = "a", t2 = "t", $ = "***") {
        let args = [s3, a2, t2];
        return [
          makeFn(args, (s4, a3, t3) => s4 - 0.5 * a3 * t3 * t3),
          makeLatex(args, "@=\\dfrac{1}{2}@@^2", $, ":||")
        ];
      },
      vat(v3 = "v", a2 = "a", t2 = "t", $ = "***") {
        let args = [v3, a2, t2];
        return [
          makeFn(args, (v4, a3, t3) => v4 - a3 * t3),
          makeLatex(args, "@=@@", $, ":||")
        ];
      },
      v2as(v3 = "v", a2 = "a", s3 = "s", $ = "***") {
        let args = [v3, a2, s3];
        return [
          makeFn(args, (v4, a3, s4) => v4 ** 2 - 2 * a3 * s4),
          makeLatex(args, "@^2=2@@", $, "|||")
        ];
      }
    };
    Force = {
      Fma(F2 = "F", m3 = "m", a2 = "a", $ = "***") {
        let args = [F2, m3, a2];
        return [
          makeFn(args, (F3, m4, a3) => F3 - m4 * a3),
          makeLatex(args, "@=@@", $, ":||")
        ];
      }
    };
    CircularMotion = {
      svt(s3 = "s", v3 = "v", t2 = "t", $ = "***") {
        let args = [s3, v3, t2];
        return [
          makeFn(args, (s4, v4, t3) => s4 - v4 * t3),
          makeLatex(args, "@=@@", $, ":||")
        ];
      },
      \u03B8\u03C9t(\u03B8 = "\u03B8", \u03C9 = "\u03C9", t2 = "t", $ = "$$$") {
        let args = [\u03B8, \u03C9, t2];
        return [
          makeFn(args, (\u03B82, \u03C92, t3) => \u03B82 - \u03C92 * t3),
          makeLatex(args, "@=@@", $, ":||")
        ];
      },
      \u03C9T(\u03C9 = "\u03C9", T2 = "T", $ = "$$") {
        let args = [\u03C9, T2];
        return [
          makeFn(args, (\u03C92, T3) => \u03C92 - 2 * Math.PI / T3),
          makeLatex(args, "@=\\dfrac{2\u03C0}{@}", $, "::")
        ];
      },
      sr\u03B8(s3 = "s", r3 = "r", \u03B8 = "\u03B8", $ = "**$") {
        let args = [s3, r3, \u03B8];
        return [
          makeFn(args, (s4, r4, \u03B82) => s4 - r4 * \u03B82),
          makeLatex(args, "@=@@", $, ":||")
        ];
      },
      vr\u03C9(v3 = "v", r3 = "r", \u03C9 = "\u03C9", $ = "***") {
        let args = [v3, r3, \u03C9];
        return [
          makeFn(args, (v4, r4, \u03C92) => v4 - r4 * \u03C92),
          makeLatex(args, "@=@@", $, ":||")
        ];
      },
      av\u03C9(a2 = "a", v3 = "v", \u03C9 = "\u03C9", $ = "***") {
        let args = [a2, v3, \u03C9];
        return [
          makeFn(args, (a3, v4, \u03C92) => a3 - v4 * \u03C92),
          makeLatex(args, "@=@@", $, ":||")
        ];
      },
      avr(a2 = "a", v3 = "v", r3 = "r", $ = "***") {
        let args = [a2, v3, r3];
        return [
          makeFn(args, (a3, v4, r4) => a3 - v4 * v4 / r4),
          makeLatex(args, "@=\\dfrac{@^2}{@}", $, ":|:")
        ];
      },
      ar\u03C9(a2 = "a", r3 = "r", \u03C9 = "\u03C9", $ = "***") {
        let args = [a2, r3, \u03C9];
        return [
          makeFn(args, (a3, r4, \u03C92) => a3 - r4 * \u03C92 * \u03C92),
          makeLatex(args, "@=@@^2", $, ":||")
        ];
      },
      Fmv\u03C9(F2 = "F", m3 = "m", v3 = "v", \u03C9 = "\u03C9", $ = "****") {
        let args = [F2, m3, v3, \u03C9];
        return [
          makeFn(args, (F3, m4, v4, \u03C92) => F3 - m4 * v4 * \u03C92),
          makeLatex(args, "@=@@@", $, ":|||")
        ];
      },
      Fmvr(F2 = "F", m3 = "m", v3 = "v", r3 = "r", $ = "****") {
        let args = [F2, m3, v3, r3];
        return [
          makeFn(args, (F3, m4, v4, r4) => F3 - m4 * v4 * v4 / r4),
          makeLatex(args, "@=\\dfrac{@@^2}{@}", $, ":||:")
        ];
      },
      Fmr\u03C9(F2 = "F", m3 = "m", r3 = "r", \u03C9 = "\u03C9", $ = "****") {
        let args = [F2, m3, r3, \u03C9];
        return [
          makeFn(args, (F3, m4, r4, \u03C92) => F3 - m4 * r4 * \u03C92 * \u03C92),
          makeLatex(args, "@=@@@^2", $, ":|||")
        ];
      }
    };
    Gravitation = {
      FGMmr2(F2 = "F", M2 = "M", m3 = "m", r3 = "r", $ = "****") {
        let args = [F2, M2, m3, r3];
        return [
          makeFn(args, (F3, M3, m4, r4) => F3 - PhyConst.G * M3 * m4 / r4 ** 2),
          makeLatex(args, "@=\\dfrac{G@@}{@^2}", $, ":|||")
        ];
      },
      FGMmRh2(F2 = "F", M2 = "M", m3 = "m", R2 = "R", h2 = "h", $ = "*****") {
        let args = [F2, M2, m3, R2, h2];
        return [
          makeFn(args, (F3, M3, m4, R3, h3) => F3 - PhyConst.G * M3 * m4 / (R3 + h3) ** 2),
          makeLatex(args, "@=\\dfrac{G@@}{(@+@)^2}", $, ":||::")
        ];
      },
      gGMr2(g2 = "g", M2 = "M", r3 = "r", $ = "***") {
        let args = [g2, M2, r3];
        return [
          makeFn(args, (g3, M3, r4) => g3 - PhyConst.G * M3 / r4 ** 2),
          makeLatex(args, "@=\\dfrac{G@}{@^2}", $, ":||")
        ];
      },
      gGMRh2(g2 = "g", M2 = "M", R2 = "R", h2 = "h", $ = "****") {
        let args = [g2, M2, R2, h2];
        return [
          makeFn(args, (g3, M3, R3, h3) => g3 - PhyConst.G * M3 / (R3 + h3) ** 2),
          makeLatex(args, "@=\\dfrac{G@}{(@+@)^2}", $, ":|::")
        ];
      },
      Fmg(F2 = "F", m3 = "m", g2 = "g", $ = "***") {
        let args = [F2, m3, g2];
        return [
          makeFn(args, (F3, m4, g3) => F3 - m4 * g3),
          makeLatex(args, "@=@@", $, ":||")
        ];
      },
      GMmr2v2r(M2 = "M", r3 = "r", v3 = "v", $ = "***") {
        let args = [M2, r3, v3];
        let [_M, _r, _v] = $;
        $ = [_M, _r, _v, _r].join("");
        return [
          makeFn(args, (M3, r4, v4) => PhyConst.G * M3 / r4 / r4 - v4 * v4 / r4),
          makeLatex([M2, r3, v3, r3], "\\dfrac{G@m}{@^2}=\\dfrac{m@^2}{@}", $, "|||:")
        ];
      },
      GMmr2r\u03C92(M2 = "M", r3 = "r", \u03C9 = "\u03C9", $ = "***") {
        let args = [M2, r3, \u03C9];
        let [_M, _r, _\u03C9] = $;
        $ = [_M, _r, _r, _\u03C9].join("");
        return [
          makeFn(args, (M3, r4, \u03C92) => PhyConst.G * M3 / r4 / r4 - r4 * \u03C92 * \u03C92),
          makeLatex([M2, r3, r3, \u03C9], "\\dfrac{G@m}{@^2}=m@@^2", $, "||||")
        ];
      }
    };
  };
  globalThis.PhyEq = new PhyEqCls();

  // ../packages/fate/lib/src/poker.js
  var poker_exports = {};
  __export(poker_exports, {
    bool: () => bool2,
    he: () => he,
    integer: () => integer,
    prime: () => prime,
    real: () => real,
    she: () => she
  });

  // ../packages/fate/lib/src/support.js
  function isPrime2(num2) {
    if (!Number.isInteger(num2))
      return false;
    if (num2 <= 1)
      return false;
    if (num2 === 2)
      return true;
    if (num2 % 2 === 0)
      return false;
    for (let i2 = 3; i2 <= Math.sqrt(num2) + 1; i2 = i2 + 2) {
      if (num2 % i2 === 0)
        return false;
    }
    return true;
  }
  function primes2(max) {
    let arr = [];
    for (let i2 = 2; i2 <= max; i2++) {
      if (isPrime2(i2))
        arr.push(i2);
    }
    return arr;
  }
  function rndInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function randomIndex(array2) {
    return rndInt(0, array2.length - 1);
  }
  function draw(array2) {
    let i2 = randomIndex(array2);
    return array2[i2];
  }

  // ../packages/fate/lib/src/poker.js
  function error2(msg) {
    const e6 = new Error(msg);
    e6.name = "PokerError";
    return e6;
  }
  function integer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min > max)
      throw error2("min must be less than max!");
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function real(min, max) {
    if (min > max)
      throw error2("min must be less than max!");
    return Math.random() * (max - min) + min;
  }
  function prime(min, max) {
    if (min > max)
      throw error2("min must be less than max!");
    let ps = primes2(max).filter(($) => $ >= min);
    return draw(ps);
  }
  function he() {
    return draw(["Aaron", "Adam", "Alan", "Alexander", "Andrew", "Ben", "Brian", "Cameron", "Charlie", "Colin", "Daniel", "David", "Derek", "Donald", "Edward", "Eric", "Ethan", "Frank", "Gary", "George", "Gordon", "Harris", "Harry", "Jack", "Jacob", "James", "Jamie", "Jason", "John", "Jordan", "Joseph", "Kevin", "Kyle", "Leo", "Lewis", "Lucas", "Martin", "Mason", "Matthew", "Michael", "Nathan", "Nicholas", "Noah", "Oliver", "Patrick", "Paul", "Peter", "Philip", "Riley", "Robert", "Rory", "Ryan", "Samuel", "Scott", "Stephen", "Steven", "Thomas", "Timothy", "William"]);
  }
  function she() {
    return draw(["Abbie", "Alice", "Alison", "Amanda", "Amelia", "Amy", "Angela", "Ann", "Anna", "Ashley", "Cara", "Carol", "Caroline", "Charlotte", "Cheryl", "Chloe", "Christine", "Claire", "Donna", "Elaine", "Ella", "Ellie", "Emily", "Emma", "Eva", "Fiona", "Gillian", "Grace", "Hazel", "Helen", "Holly", "Ivy", "Jacqueline", "Jade", "Janet", "Jennifer", "Jessica", "Julie", "Karen", "Kate", "Katie", "Kelly", "Kirsty", "Lily", "Linda", "Lisa", "Lorraine", "Louise", "Lucy", "Mandy", "Mary", "Michelle", "Natalie", "Nicole", "Olivia", "Pamela", "Pauline", "Rachel", "Rebecca", "Rosie", "Samantha", "Sarah", "Shannon", "Sharon", "Sophia", "Sophie", "Stephanie", "Susan", "Tracey", "Tracy", "Valerie", "Victoria", "Wendy", "Zoe"]);
  }
  function bool2(trueChance = 0.5) {
    return real(0, 1) < trueChance;
  }

  // ../packages/fate/lib/src/dice.js
  function error3(msg) {
    const e6 = new Error(msg);
    e6.name = "DiceError";
    return e6;
  }
  var Dice = class {
    constructor(func) {
      this.TRIAL = 1e4;
      this.shields = [];
      this.uniques = [];
      this.distincts = [];
      this.coherents = [];
      this.func = func;
    }
    shield(predicate) {
      this.shields.push(predicate);
      return this;
    }
    forbid(...items) {
      for (let item of items)
        this.shield(($) => JSON.stringify($) !== JSON.stringify(item));
      return this;
    }
    unique(mapper = ($) => $) {
      let map = ($) => JSON.stringify(mapper($));
      this.uniques.push(map);
      return this;
    }
    distinct(equality) {
      this.distincts.push(equality);
      return this;
    }
    coherent(predicate) {
      this.coherents.push(predicate);
      return this;
    }
    roll() {
      let counter = 0;
      while (true) {
        counter++;
        if (counter > this.TRIAL) {
          throw error3("No items can satisfy predicate after " + this.TRIAL + " trials!");
        }
        let item = this.func();
        if (this.shields.every(($) => $(item)))
          return item;
      }
    }
    rolls(count) {
      let counter = 0;
      const genRandomCohort = () => {
        let arr = [];
        let mappeds = [];
        for (let i2 = 0; i2 < this.uniques.length; i2++) {
          mappeds.push([]);
        }
        const pushMap = (itemMap) => {
          mappeds.forEach((mapped, i2) => mapped.push(itemMap[i2]));
        };
        const mapInclude = (itemMap) => {
          return mappeds.some((mapped, i2) => mapped.includes(itemMap[i2]));
        };
        const someEqual = (item) => {
          return this.distincts.some((equal2) => arr.some(($) => equal2($, item)));
        };
        while (arr.length < count) {
          counter++;
          if (counter > this.TRIAL) {
            throw error3("rolls count is likely too large for sample set");
          }
          let item = this.roll();
          let map = this.uniques.map(($) => $(item));
          if (mapInclude(map))
            continue;
          if (someEqual(item))
            continue;
          arr.push(item);
          pushMap(map);
        }
        return arr;
      };
      const isCoherent = (cohort) => {
        return this.coherents.every(($) => $(cohort));
      };
      while (true) {
        let cohort = genRandomCohort();
        if (isCoherent(cohort))
          return cohort;
      }
    }
  };
  function dice(func) {
    return new Dice(func);
  }

  // src/Math/Code/Random.ts
  var Host8 = class {
    static RndN(min, max) {
      return poker_exports.integer(min, max);
    }
    static RndNs(min, max, n2 = 10) {
      n2 = Math.min(Math.floor(max - min + 1), n2);
      return dice(() => RndN(min, max)).unique().rolls(n2);
    }
    static RndR(min, max) {
      return poker_exports.real(min, max);
    }
    static RndRs(min, max, n2 = 10) {
      return dice(() => RndR(min, max)).unique().rolls(n2);
    }
    static RndQ(largest = 9, range2) {
      let L2 = Math.abs(largest);
      let sign = largest > 0 ? 1 : RndU();
      let f3 = () => RndN(1, L2) / RndN(2, L2) * sign;
      let d2 = dice(f3).shield((_) => owl.dec(_));
      if (range2) {
        d2.shield((_) => _ >= range2[0]).shield((_) => _ <= range2[1]);
      }
      return d2.roll();
    }
    static RndQs(largest = 9, range2, n2 = 10) {
      n2 = Math.min(Math.abs(largest) + 1, n2);
      return dice(() => RndQ(largest, range2)).unique().rolls(n2);
    }
    static RndU() {
      return list(1, -1).draw();
    }
    static RndT() {
      return poker_exports.bool();
    }
    static RndZ(min, max) {
      return RndN(min, max) * RndU();
    }
    static RndZs(min, max, n2 = 10) {
      n2 = Math.min(Math.floor(max - min + 1), n2);
      return dice(() => RndN(min, max)).unique().rolls(n2).map((x2) => x2 * RndU());
    }
    static RndP(max) {
      return poker_exports.prime(2, max);
    }
    static RndOdd(min, max) {
      min = Math.ceil((min + 1) / 2);
      max = Math.floor((max + 1) / 2);
      return 2 * RndN(min, max) - 1;
    }
    static RndEven(min, max) {
      min = Math.ceil(min / 2);
      max = Math.floor(max / 2);
      return 2 * RndN(min, max);
    }
    static RndPoly(...coeff) {
      let arr = coeff.map((x2) => RndZ(1, x2));
      arr[0] = Math.abs(arr[0]);
      return arr;
    }
    static RndPyth(max = 100) {
      let arr = [];
      for (let m3 = 1; m3 < 10; m3++) {
        for (let n2 = 1; n2 < m3; n2++) {
          for (let k2 = 1; k2 < 10; k2++) {
            let a2 = m3 * m3 - n2 * n2;
            let b2 = 2 * m3 * n2;
            let c3 = m3 * m3 + n2 * n2;
            if (c3 <= max)
              arr.push([a2, b2, c3]);
          }
        }
      }
      return toList(arr).draw();
    }
    static RndPoint(xRange, yRange = xRange) {
      if (typeof xRange === "number")
        xRange = [-xRange, xRange];
      if (typeof yRange === "number")
        yRange = [-yRange, yRange];
      let [x1, x2] = xRange;
      let [y1, y2] = yRange;
      let f3 = () => [RndN(x1, x2), RndN(y1, y2)];
      return dice(f3).shield(([x3, y3]) => x3 !== 0).shield(([x3, y3]) => y3 !== 0).shield(([x3, y3]) => x3 !== y3).roll();
    }
    static RndPoints(xRange, yRange = xRange, n2 = 10) {
      return dice(() => RndPoint(xRange, yRange)).unique(([x2, y2]) => x2).unique(([x2, y2]) => y2).coherent(($) => toList($).combinations(3).every(([A2, B2, C2]) => Slope(A2, B2) !== Slope(B2, C2))).rolls(n2);
    }
    static RndAngles(n2, separation) {
      let angles = dice(() => RndN(0, 360)).coherent((angles2) => toNumbers(angles2).gapsMod(360).min() > separation).unique().rolls(n2);
      return [...toList(angles).ascending()];
    }
    static RndOnCircle(n2, separation) {
      let t2 = RndN(0, 360);
      return RndAngles(n2, separation).map(($) => OnCircle($ + t2));
    }
    static RndConvexPolygon(n2, center, radius, separation) {
      let [h2, k2] = center;
      let r3 = radius;
      let angles = RndAngles(n2, separation);
      let vertices = angles.map((a2) => [h2 + r3 * cos(a2), k2 + r3 * sin(a2)]);
      vertices = vertices.map(([x2, y2]) => [Fix(x2), Fix(y2)]);
      return vertices;
    }
    static RndData(min, max, n2) {
      let data2 = dice(() => RndN(min, max)).coherent((d2) => toData(d2).isSingleMode()).rolls(n2);
      return toList(data2).ascending();
    }
    static RndTriangle(xRange, yRange, {
      minAngle = 0,
      maxAngle = 180,
      minLength = 0,
      obtuse = false
    } = {}) {
      let [x1, x2] = xRange;
      let [y1, y2] = yRange;
      let arr = [];
      for (let i2 = x1; i2 <= x2; i2++) {
        for (let j2 = y1; j2 <= y2; j2++) {
          arr.push([i2, j2]);
        }
      }
      arr = RndShuffle(...arr);
      for (let i2 = 0; i2 < arr.length; i2++) {
        for (let j2 = i2 + 1; j2 < arr.length; j2++) {
          for (let k2 = j2 + 1; k2 < arr.length; k2++) {
            let A2 = arr[i2];
            let B2 = arr[j2];
            let C2 = arr[k2];
            if (A2[0] === B2[0])
              continue;
            if (B2[0] === C2[0])
              continue;
            if (C2[0] === A2[0])
              continue;
            if (A2[1] === B2[1])
              continue;
            if (B2[1] === C2[1])
              continue;
            if (C2[1] === A2[1])
              continue;
            if (Slope(A2, B2) === Slope(B2, C2))
              continue;
            let A_ = Angle(C2, A2, B2);
            let B_ = Angle(A2, B2, C2);
            let C_ = Angle(B2, C2, A2);
            let smallestAngle = Min(A_, B_, C_);
            let largestAngle = Max(A_, B_, C_);
            if (smallestAngle < minAngle)
              continue;
            if (largestAngle > maxAngle)
              continue;
            if (Distance(A2, B2) < minLength)
              continue;
            if (Distance(B2, C2) < minLength)
              continue;
            if (Distance(C2, A2) < minLength)
              continue;
            if (obtuse && largestAngle <= 90)
              continue;
            return [A2, B2, C2];
          }
        }
      }
      throw "RndTriangle fail to find a suitable triangle.";
    }
    static RndTrigValue(func, angle2) {
      let trig2 = (funcName, q2) => {
        if (funcName === "sin")
          return sin(q2);
        if (funcName === "cos")
          return cos(q2);
        if (funcName === "tan")
          return tan(q2);
        throw "never";
      };
      let atrig = (funcName, val2) => {
        if (funcName === "sin")
          return arcsin(val2);
        if (funcName === "cos")
          return arccos(val2);
        if (funcName === "tan")
          return arctan(val2);
        throw "never";
      };
      let v3 = trig2(func, angle2);
      angle2 = atrig(func, Abs(trig2(func, angle2)));
      angle2 = cal.blur(angle2);
      let arr = [];
      for (let f3 of ["sin", "cos", "tan"]) {
        for (let a2 of [0, 90, 180, 270, 360]) {
          for (let s3 of [angle2, -angle2]) {
            if (a2 === 360 && s3 > 0)
              continue;
            if (a2 === 0 && s3 < 0)
              continue;
            if (cal.eq(trig2(f3, a2 + s3), v3))
              arr.push([f3, a2 + s3]);
          }
        }
      }
      return RndPick(...arr);
    }
    static RndTrigEqv(result2, label) {
      let trig2 = (funcName, angle2) => {
        if (funcName === "sin")
          return sin(angle2);
        if (funcName === "cos")
          return cos(angle2);
        if (funcName === "tan")
          return tan(angle2);
        throw "never";
      };
      let v3 = 0;
      if (result2 === "sin")
        v3 = sin(1);
      if (result2 === "-sin")
        v3 = -sin(1);
      if (result2 === "cos")
        v3 = cos(1);
      if (result2 === "-cos")
        v3 = -cos(1);
      if (result2 === "tan")
        v3 = tan(1);
      if (result2 === "-tan")
        v3 = -tan(1);
      if (result2 === "1/tan")
        v3 = 1 / tan(1);
      if (result2 === "-1/tan")
        v3 = -1 / tan(1);
      let arr = [];
      for (let f3 of ["sin", "cos", "tan"]) {
        for (let a2 of [90, 180, 270, 360]) {
          for (let s3 of [1, -1]) {
            if (a2 === 360 && s3 > 0)
              continue;
            if (cal.eq(trig2(f3, a2 + s3), v3))
              arr.push([f3, a2, s3, label]);
          }
        }
      }
      return RndPick(...arr);
    }
    static RndPointPolar() {
      let angle2 = RndPick(30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330);
      let a2 = RndEven(2, 6);
      let b2 = RndPick(1, 2, 3);
      let r3 = a2 * Math.sqrt(b2);
      return PolToRect([r3, angle2]);
    }
    static RndRatio(min, max, n2 = 10) {
      let nums = RndNs(min, max, n2);
      return toNumbers(nums).ratio();
    }
  };
  __decorateClass([
    checkIt(owl.num)
  ], Host8, "RndN", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.positiveInt)
  ], Host8, "RndNs", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host8, "RndR", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.positiveInt)
  ], Host8, "RndRs", 1);
  __decorateClass([
    checkIt(owl.nonZeroInt, owl.interval)
  ], Host8, "RndQ", 1);
  __decorateClass([
    checkIt(owl.nonZeroInt, owl.interval, owl.positiveInt)
  ], Host8, "RndQs", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host8, "RndZ", 1);
  __decorateClass([
    checkIt(owl.nonNegative, owl.nonNegative, owl.positiveInt)
  ], Host8, "RndZs", 1);
  __decorateClass([
    checkIt(owl.positive)
  ], Host8, "RndP", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host8, "RndOdd", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host8, "RndEven", 1);
  __decorateClass([
    checkIt(owl.positive)
  ], Host8, "RndPoly", 1);
  __decorateClass([
    checkIt(owl.positive)
  ], Host8, "RndPyth", 1);
  __decorateClass([
    checkIt(owl.or([owl.num, owl.interval]))
  ], Host8, "RndPoint", 1);
  __decorateClass([
    checkIt(owl.or([owl.num, owl.interval]), owl.or([owl.num, owl.interval]), owl.num)
  ], Host8, "RndPoints", 1);
  __decorateClass([
    checkIt(owl.positiveInt, owl.positive)
  ], Host8, "RndAngles", 1);
  __decorateClass([
    checkIt(owl.positiveInt, owl.positive)
  ], Host8, "RndOnCircle", 1);
  __decorateClass([
    checkIt(owl.positiveInt, owl.point2D, owl.positive, owl.positive)
  ], Host8, "RndConvexPolygon", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.positiveInt)
  ], Host8, "RndData", 1);
  __decorateClass([
    checkIt(owl.interval, owl.interval, owl.object)
  ], Host8, "RndTriangle", 1);
  __decorateClass([
    checkIt(owl.trig, owl.num)
  ], Host8, "RndTrigValue", 1);
  __decorateClass([
    checkIt(owl.str, owl.str)
  ], Host8, "RndTrigEqv", 1);
  __decorateClass([
    checkIt(owl.positive, owl.positive, owl.positiveInt)
  ], Host8, "RndRatio", 1);
  Host8 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host8);

  // src/Math/Code/RandomShake.ts
  var Host9 = class {
    static RndShake(anchor) {
      if (typeof anchor === "string") {
        if (owl.dfrac(anchor)) {
          Should(false, "RndShakeDfrac is not supported anymore");
        }
        if (owl.ineq(anchor)) {
          return RndShakeIneq(anchor);
        }
        if (owl.trig(anchor)) {
          return RndShakeTrig(anchor);
        }
        if (Number(anchor)) {
          anchor = Number(anchor);
        }
      }
      if (owl.quantity(anchor)) {
        return RndShakeQuantity(anchor);
      }
      if (owl.point2D(anchor)) {
        return RndShakePoint(anchor);
      }
      if (owl.combo(anchor)) {
        return RndShakeCombo(anchor);
      }
      if (owl.trigValue(anchor)) {
        return RndShakeTrigValue(anchor);
      }
      if (owl.constraint(anchor)) {
        return RndShakeConstraint(anchor);
      }
      if (owl.constraints(anchor)) {
        return RndShakeConstraints(anchor);
      }
      if (typeof anchor === "number" && owl.num(anchor)) {
        anchor = cal.blur(anchor);
        if (owl.int(anchor)) {
          return RndShakeN(anchor);
        }
        if (owl.num(anchor)) {
          return RndShakeR(anchor);
        }
        if (isNaN(anchor)) {
          return [];
        }
      }
      if (anchor === void 0)
        return [];
      throw MathError("Fail to RndShake: " + anchor);
    }
    static RndShakeN(anchor) {
      anchor = cal.blur(anchor);
      let a2 = Abs(anchor);
      let s3 = Sign(anchor);
      let f3;
      if (anchor === 0) {
        f3 = () => RndN(1, 3);
      } else {
        let range2 = Max(3, a2 * 0.1);
        let max = Min(Floor(a2 + range2), cal.logCeil(a2) - 1);
        let min = Max(Ceil(a2 - range2), 1, cal.logFloor(a2));
        f3 = () => RndN(min, max) * s3;
      }
      return dice(f3).shield((x2) => x2 !== anchor).unique().rolls(3);
    }
    static RndShakeR(anchor) {
      let exp = cal.e(anchor);
      let m3 = cal.blur(cal.mantissa(anchor));
      if (IsInteger(m3))
        return RndShakeN(m3).map((x2) => Number(x2 + "e" + exp));
      let dp2 = cal.dp(m3);
      return dice(() => Fix(m3 * (1 + RndR(0, 0.5) * RndU()), dp2)).shield((x2) => x2 * m3 > 0).shield((x2) => cal.e(x2) === cal.e(m3)).shield((x2) => x2 !== m3).unique().rolls(3).map((x2) => Number(x2 + "e" + exp));
    }
    static RndShakeQ(anchor) {
      if (owl.int(anchor))
        return RndShakeN(anchor);
      let [p3, q2] = ToFrac(anchor);
      [p3, q2] = [p3, q2].map(cal.blur);
      Should(IsInteger(p3, q2), "input should be integral fraction");
      return dice(() => {
        const h2 = RndShakeN(p3)[0];
        const k2 = RndShakeN(q2)[0];
        let a2 = RndR(0, 1) < 1 / Math.abs(p3) ? p3 : h2;
        let b2 = RndR(0, 1) < 1 / Math.abs(q2) ? q2 : k2;
        if (a2 === p3 && b2 === q2)
          return [h2, k2];
        return [a2, b2];
      }).shield(([a2, b2]) => AreCoprime(a2, b2)).shield(([a2, b2]) => a2 !== 0).shield(([a2, b2]) => b2 !== 0).shield(([a2, b2]) => b2 !== 1).shield(([a2, b2]) => b2 !== 1).shield(([a2, b2]) => IsProbability(p3 / q2) ? IsProbability(a2 / b2) : true).unique(([p4, q3]) => p4 / q3).rolls(3).map(([p4, q3]) => p4 / q3);
    }
    static RndShakeIneq(anchor) {
      let i2 = ineq(anchor);
      let me = i2.print();
      let flip = i2.flip();
      return list(me, flip, flip).shuffled();
    }
    static RndShakePoint(anchor) {
      let [x2, y2] = anchor;
      let func = () => {
        const h2 = IsInteger(x2) ? RndShakeN(x2)[0] : RndShakeR(x2)[0];
        const k2 = IsInteger(y2) ? RndShakeN(y2)[0] : RndShakeR(y2)[0];
        return [h2, k2];
      };
      return dice(func).unique(([x3, y3]) => x3).unique(([x3, y3]) => y3).rolls(3);
    }
    static RndShakeCombo(anchor) {
      let [a2, b2, c3] = anchor;
      let func = () => {
        return [
          RndT() ? a2 : !a2,
          RndT() ? b2 : !b2,
          RndT() ? c3 : !c3
        ];
      };
      let diff = (bools) => {
        return bools.some(($) => $) && bools.some(($) => !$);
      };
      return dice(func).unique().coherent((all) => diff([a2, ...all.map(($) => $[0])])).coherent((all) => diff([b2, ...all.map(($) => $[1])])).coherent((all) => diff([c3, ...all.map(($) => $[2])])).rolls(3);
    }
    static RndShakeTrig(anchor) {
      return [...list("sin", "cos", "tan").draws(3)];
    }
    static RndShakeTrigValue(anchor) {
      return RndShakeTrig(anchor[0]).map((x2) => [x2, anchor[1]]);
    }
    static RndShakeRatio(anchor) {
      anchor = [...toNumbers(anchor).ratio()];
      let func = () => {
        return anchor.map((x2) => RndR(0, 1) < 1 / (Math.abs(x2) + 1) ? x2 : RndShakeN(x2)[0]);
      };
      return dice(func).shield((r3) => toNumbers(r3).hcf() === 1).shield((r3) => AreDifferent(anchor, r3)).unique().rolls(3);
    }
    static RndShakeBase(anchor) {
      let [num2, base2] = anchor.split("_");
      base2 = base2.replace("{", "").replace("}", "");
      let digits = "0123456789ABCDEF".substring(0, Number(base2)).split("");
      function shake(d2) {
        let x2 = digits.indexOf(d2) + RndU();
        if (x2 < 0)
          x2 = 0;
        if (x2 > digits.length - 1)
          x2 = digits.length - 1;
        return digits[x2];
      }
      function mutate(str3) {
        let s3 = [];
        let nonzero = str3.split("").filter((_) => _ !== "0").length;
        for (let d2 of str3.split("")) {
          if (d2 === "0") {
            let go = poker_exports.bool(0.1);
            s3.push(go ? toList(digits).draw() : "0");
          } else {
            let go = poker_exports.bool(1 / (nonzero + 2));
            s3.push(go ? shake(d2) : d2);
          }
        }
        let T2 = s3.join("");
        if (poker_exports.bool(0.2))
          T2 += "0";
        return T2;
      }
      function dress2(str3) {
        str3 = str3.replace(/^0+/, "");
        return str3 + "_{" + base2 + "}";
      }
      let f3 = () => {
        let middle = Math.ceil(num2.length / 2);
        let s1 = num2.slice(0, middle);
        let s22 = num2.slice(middle);
        let t1 = mutate(s1);
        let t2 = mutate(s22);
        let B1 = dress2(s1 + t2);
        let B2 = dress2(t1 + s22);
        let B3 = dress2(t1 + t2);
        return [B1, B2, B3];
      };
      return dice(f3).shield((_) => toList([num2, ..._]).dupless()).roll();
    }
    static RndShakePointPolar(anchor) {
      let [r1, q1] = RectToPol(anchor);
      let [a2, b2] = cal.toSurd(r1);
      let r22 = b2 === 1 ? a2 * Math.sqrt(RndPick(2, 3)) : a2;
      let angles = list(30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330);
      let q2 = angles.except([q1]).draw();
      return RndShuffle([r1, q2], [r22, q1], [r22, q2]).map(($) => PolToRect($));
    }
    static RndShakeConstraint(anchor) {
      let flip = rein(anchor).flip().constraint;
      return list(anchor, flip, flip).shuffled();
    }
    static RndShakeConstraints(anchor) {
      let func = () => [...toReins(anchor).shake().map(($) => $.constraint)];
      return dice(func).forbid(anchor).shield(($) => toReins($).isConsistent()).unique().rolls(3);
    }
    static RndShakeQuantity(anchor) {
      let { val: val2, unit } = anchor;
      let vals = RndShake(val2);
      return vals.map(($) => ({ val: $, unit }));
    }
  };
  __decorateClass([
    checkIt(owl.int)
  ], Host9, "RndShakeN", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host9, "RndShakeR", 1);
  __decorateClass([
    checkIt(owl.rational)
  ], Host9, "RndShakeQ", 1);
  __decorateClass([
    checkIt(owl.ineq)
  ], Host9, "RndShakeIneq", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host9, "RndShakePoint", 1);
  __decorateClass([
    checkIt(owl.combo)
  ], Host9, "RndShakeCombo", 1);
  __decorateClass([
    checkIt(owl.trig)
  ], Host9, "RndShakeTrig", 1);
  __decorateClass([
    checkIt(owl.trigValue)
  ], Host9, "RndShakeTrigValue", 1);
  __decorateClass([
    checkIt(owl.ntuple)
  ], Host9, "RndShakeRatio", 1);
  __decorateClass([
    checkIt(owl.base)
  ], Host9, "RndShakeBase", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host9, "RndShakePointPolar", 1);
  __decorateClass([
    checkIt(owl.constraint)
  ], Host9, "RndShakeConstraint", 1);
  __decorateClass([
    checkIt(owl.constraints)
  ], Host9, "RndShakeConstraints", 1);
  __decorateClass([
    checkIt(owl.quantity)
  ], Host9, "RndShakeQuantity", 1);
  Host9 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host9);

  // src/Math/Code/RandomUtil.ts
  var Host10 = class {
    static RndPick(...items) {
      return toList(items).draw();
    }
    static RndShuffle(...items) {
      return [...toList(items).shuffled()];
    }
    static RndPickN(items, n2) {
      return [...toList(items).sample(n2)];
    }
    static RndPickUnique(items, n2) {
      return [...toList(items).uniqueDeep().sample(n2)];
    }
    static RndHe() {
      return poker_exports.he();
    }
    static RndShe() {
      return poker_exports.she();
    }
    static RndLetters() {
      return RndPick(["a", "b", "c"], ["h", "k", "l"], ["m", "n", "l"], ["p", "q", "r"], ["r", "s", "t"], ["u", "v", "w"], ["x", "y", "z"]);
    }
    static RndCapitals() {
      return RndPick(["A", "B", "C"], ["H", "K", "L"], ["M", "N", "L"], ["P", "Q", "R"], ["R", "S", "T"], ["U", "V", "W"], ["X", "Y", "Z"]);
    }
  };
  __decorateClass([
    checkIt(owl.array, owl.positiveInt)
  ], Host10, "RndPickN", 1);
  __decorateClass([
    checkIt(owl.array, owl.positiveInt)
  ], Host10, "RndPickUnique", 1);
  Host10 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host10);

  // src/Math/Code/Relation.ts
  var Host11 = class {
    static AreDistinct(...nums) {
      nums = nums.map(cal.blur);
      return new Set(nums).size === nums.length;
    }
    static AreAbsDistinct(...nums) {
      return AreDistinct(...nums.map(Math.abs));
    }
    static AreSameSign(...nums) {
      return [...new Set(nums.map(Math.sign))].length === 1;
    }
    static AreCoprime(...nums) {
      nums = nums.map(cal.blur);
      if (!IsInteger(...nums))
        return true;
      if (!IsNonZero(...nums))
        return true;
      return toList(nums).pairs().every(([a2, b2]) => HCF(a2, b2) === 1);
    }
    static AreDistantPoint(distance) {
      let AreDistant = function(...points) {
        return toShape2D(points).distances().min() >= distance;
      };
      return check(AreDistant, [owl.point2D]);
    }
    static AreOblique(minAngle) {
      let areOblique = function(...slopes) {
        return toList(slopes).pairs().every(([a2, b2]) => IntersectAngle(a2, b2) >= minAngle);
      };
      return check(areOblique, [owl.num]);
    }
    static AreDifferent(...items) {
      return toList(items).duplessDeep();
    }
  };
  __decorateClass([
    checkIt(owl.num)
  ], Host11, "AreDistinct", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host11, "AreAbsDistinct", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host11, "AreSameSign", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host11, "AreCoprime", 1);
  __decorateClass([
    checkIt(owl.positive)
  ], Host11, "AreDistantPoint", 1);
  __decorateClass([
    checkIt(owl.positive)
  ], Host11, "AreOblique", 1);
  Host11 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host11);

  // src/Math/Code/Sequence.ts
  var Host12 = class {
    static ListIntegers(start, end) {
      return cal.range(start, end);
    }
    static ASterm(a2, d2, n2) {
      return a2 + (n2 - 1) * d2;
    }
    static ASsum(a2, d2, n2) {
      return 0.5 * n2 * (2 * a2 + (n2 - 1) * d2);
    }
    static ASequence(a2, d2, n2 = 10) {
      let arr = [];
      for (let i2 = 1; i2 <= n2; i2++) {
        arr.push(ASterm(a2, d2, i2));
      }
      return arr;
    }
    static GSterm(a2, r3, n2) {
      return a2 * r3 ** (n2 - 1);
    }
    static GSsum(a2, r3, n2 = -1) {
      return n2 > 0 ? a2 * (r3 ** n2 - 1) / (r3 - 1) : a2 / (1 - r3);
    }
    static GSequence(a2, r3, n2 = 10) {
      let arr = [];
      for (let i2 = 1; i2 <= n2; i2++) {
        arr.push(GSterm(a2, r3, i2));
      }
      return arr;
    }
    static QuadraticSequence(a2, p3, q2, n2) {
      let c3 = a2;
      for (let i2 = 2; i2 <= n2; i2++) {
        c3 += p3 * (i2 - 1) + q2;
      }
      return c3;
    }
    static LucasSequence(first, second, p3, q2, n2) {
      if (n2 === 1)
        return first;
      if (n2 === 2)
        return second;
      let S2 = [first, second];
      for (let i2 = 3; i2 <= n2; i2++) {
        S2.push(p3 * S2[i2 - 2] + q2 * S2[i2 - 3]);
      }
      return S2[n2 - 1];
    }
  };
  __decorateClass([
    checkIt(owl.num),
    inspectIt(function is_range(start, end) {
      return start < end;
    })
  ], Host12, "ListIntegers", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.positiveInt)
  ], Host12, "ASterm", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.positiveInt)
  ], Host12, "ASsum", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.positiveInt)
  ], Host12, "ASequence", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.positiveInt)
  ], Host12, "GSterm", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.int)
  ], Host12, "GSsum", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.positiveInt)
  ], Host12, "GSequence", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.num, owl.positiveInt)
  ], Host12, "QuadraticSequence", 1);
  __decorateClass([
    checkIt(owl.num, owl.num, owl.num, owl.num, owl.positiveInt)
  ], Host12, "LucasSequence", 1);
  Host12 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host12);

  // src/Math/Code/Stat.ts
  var Host13 = class {
    static Min(...nums) {
      return Math.min(...nums);
    }
    static Max(...nums) {
      return Math.max(...nums);
    }
    static Sort(...nums) {
      return [...nums].sort((a2, b2) => a2 - b2);
    }
    static SortBy(items, valueFunc) {
      return [...items].sort((a2, b2) => valueFunc(a2) - valueFunc(b2));
    }
    static Sum(...nums) {
      return toData(nums).sum();
    }
    static Mean(...nums) {
      return toData(nums).mean();
    }
    static Median(...nums) {
      return toData(nums).median();
    }
    static LowerQ(...nums) {
      return toData(nums).lowerQuartile();
    }
    static UpperQ(...nums) {
      return toData(nums).upperQuartile();
    }
    static StatRange(...nums) {
      return toData(nums).range();
    }
    static IQR(...nums) {
      return toData(nums).IQR();
    }
    static Freq(array2, item) {
      return toList(array2).freq(item);
    }
    static Mode(...nums) {
      return [...toData(nums).modes()];
    }
    static UniMode(...nums) {
      return toData(nums).mode();
    }
    static StdDev(...nums) {
      return toData(nums).stdDev();
    }
    static ZScore(num2, mean, SD) {
      return (num2 - mean) / SD;
    }
    static MedianAt(total) {
      return (total + 1) / 2;
    }
    static LowerQAt(total) {
      total = Math.floor(total / 2);
      return MedianAt(total);
    }
    static UpperQAt(total) {
      return total + 1 - LowerQAt(total);
    }
    static ListRange(...data2) {
      let min = Math.min(...data2);
      let max = Math.max(...data2);
      return cal.range(min, max);
    }
    static Freqs(data2, nums) {
      let ls = toList(data2);
      nums ??= ListRange(...data2);
      let arr = [];
      for (let v3 of nums) {
        arr.push(ls.freq(v3));
      }
      return arr;
    }
    static DataFromFreqs(values, frequencies) {
      Should(values.length === frequencies.length, "values and frequencies must be the same length");
      let data2 = [];
      for (let i2 = 0; i2 < values.length; i2++) {
        data2.push(...Array(frequencies[i2]).fill(values[i2]));
      }
      return data2;
    }
    static Summary(...data2) {
      let d2 = toData(data2);
      return [
        d2.min(),
        d2.lowerQuartile(),
        d2.median(),
        d2.upperQuartile(),
        d2.max()
      ];
    }
  };
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "Min", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "Max", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "Sort", 1);
  __decorateClass([
    checkIt(owl.array, owl.pass)
  ], Host13, "SortBy", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "Sum", 1);
  __decorateClass([
    checkIt(owl.num),
    inspectIt(function is_not_empty(...nums) {
      return nums.length > 0;
    })
  ], Host13, "Mean", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "Median", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "LowerQ", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "UpperQ", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "StatRange", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "IQR", 1);
  __decorateClass([
    checkIt(owl.array, owl.pass)
  ], Host13, "Freq", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "Mode", 1);
  __decorateClass([
    checkIt(owl.num),
    inspectIt(function has_single_mode(...nums) {
      return toData(nums).isSingleMode(1);
    })
  ], Host13, "UniMode", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "StdDev", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "ZScore", 1);
  __decorateClass([
    checkIt(owl.int)
  ], Host13, "MedianAt", 1);
  __decorateClass([
    checkIt(owl.int)
  ], Host13, "LowerQAt", 1);
  __decorateClass([
    checkIt(owl.int)
  ], Host13, "UpperQAt", 1);
  __decorateClass([
    checkIt(owl.int)
  ], Host13, "ListRange", 1);
  __decorateClass([
    checkIt(owl.ntuple, owl.ntuple)
  ], Host13, "Freqs", 1);
  __decorateClass([
    checkIt(owl.ntuple)
  ], Host13, "DataFromFreqs", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host13, "Summary", 1);
  Host13 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host13);

  // src/Math/Code/Text.ts
  var Host14 = class {
    static GrammarJoin(...items) {
      let L2 = items.length;
      if (L2 === 0)
        return "";
      if (L2 === 1)
        return String(items[0]);
      let arr = [];
      for (let i2 = 0; i2 < L2 - 1; i2++) {
        arr.push(items[i2]);
      }
      return arr.join(", ") + " and " + items[items.length - 1];
    }
    static IneqSign(greater, equal2 = false) {
      if (greater && equal2) {
        return ["\\ge", "\\le"];
      }
      if (greater && !equal2) {
        return ["\\gt", "\\lt"];
      }
      if (!greater && equal2) {
        return ["\\le", "\\ge"];
      }
      if (!greater && !equal2) {
        return ["\\lt", "\\gt"];
      }
      throw "never";
    }
    static Dfrac(numerator, denominator, upSign = false) {
      return ink.printDfrac(numerator, denominator, upSign);
    }
    static IndexToSurd(text) {
      return text.replace(/\{\(*([^\{\(\}\)]*)\)*\}\^\{0\.5\}/g, "\\sqrt{$1}");
    }
    static Coord(point, dp2 = 1) {
      let [a2, b2] = point.map((_) => cal.blur(_));
      a2 = Fix(a2, dp2);
      b2 = Fix(b2, dp2);
      return "(" + a2 + ", " + b2 + ")";
    }
    static Sci(num2) {
      if (num2 === 0)
        return "0";
      let m3 = cal.e(cal.blur(num2));
      if (m3 === 0)
        return num2.toString();
      num2 = num2 / 10 ** m3;
      num2 = cal.blur(num2);
      return num2.toString() + " \\times 10^{ " + m3 + "}";
    }
    static LongDivision(dividend, divisor) {
      dividend = dividend.reverse();
      divisor = divisor.reverse();
      function xTerm(power) {
        if (power === 0)
          return "";
        if (power === 1)
          return "x";
        return "x^" + power;
      }
      function printSolid(poly) {
        let arr = [];
        poly.forEach((v3, i2) => {
          if (v3 !== null)
            arr.push(v3 + xTerm(i2));
        });
        return arr.reverse().join("+");
      }
      function printUnderline(poly) {
        return "\\underline{" + printSolid(poly) + "}";
      }
      function printPhantom(poly) {
        let arr = [];
        poly.forEach((v3, i2) => {
          if (v3 === null)
            arr.push(dividend[i2] + xTerm(i2));
        });
        let T2 = arr.reverse().join("+");
        if (T2.length === 0)
          return "";
        return "\\phantom{+" + T2 + "}";
      }
      function writeSolid(poly) {
        return printSolid(poly) + printPhantom(poly);
      }
      function writeUnderline(poly) {
        return printUnderline(poly) + printPhantom(poly);
      }
      function pushDivide(dividend2, divisor2) {
        let t1 = dividend2[dividend2.length - 1];
        let t2 = divisor2[divisor2.length - 1];
        return t1 / t2;
      }
      function step(current, divisor2) {
        let q2 = pushDivide(current, divisor2);
        let under = divisor2.map((x2) => x2 * q2);
        for (let i2 = 1; i2 <= current.length - divisor2.length; i2++)
          under.unshift(null);
        let next = [];
        for (let i2 = 0; i2 < current.length - 1; i2++)
          next.push(current[i2] - Number(under[i2]));
        let nextPrint = [...next].reverse();
        for (let i2 = 0; i2 < nextPrint.length; i2++)
          if (i2 > divisor2.length - 1)
            nextPrint[i2] = null;
        nextPrint.reverse();
        return { next, nextPrint, under, q: q2 };
      }
      function compose(dividend2, divisor2) {
        let T2 = "\\begin{array}{r}";
        T2 += "QUOTIENT \\\\";
        T2 += writeSolid(divisor2);
        T2 += "{\\overline{\\smash{\\big)}";
        T2 += writeSolid(dividend2);
        T2 += "}}\\\\";
        let current = dividend2;
        let quotient = [];
        while (true) {
          let { next, nextPrint, under, q: q2 } = step(current, divisor2);
          T2 += writeUnderline(under) + "\\\\";
          T2 += writeSolid(nextPrint) + "\\\\";
          current = next;
          quotient.push(q2);
          if (current.length < divisor2.length)
            break;
        }
        T2 += "\\end{array}";
        quotient.reverse();
        T2 = T2.replace("QUOTIENT", writeSolid(quotient));
        return T2;
      }
      return compose(dividend, divisor);
    }
    static ToBase(num2, base2) {
      return num2.toString(base2).toUpperCase() + "_{" + base2 + "}";
    }
    static PrimeFactorize(val2, { hcf = false, lcm = false, multiply = false }) {
      let T2 = "\\begin{matrix} ";
      function add(variable, power) {
        let s3 = multiply ? "& \\times &" : "&";
        if (power > 1) {
          T2 += s3 + variable + "^{" + power + "}";
        } else if (power === 1) {
          T2 += s3 + variable;
        } else {
          T2 += multiply ? "& &" : " & ";
        }
      }
      let keys = Object.keys(val2);
      let n2 = val2[keys[0]].length;
      for (let i2 = 0; i2 < n2; i2++) {
        T2 += " & ";
        if (keys.includes("number"))
          T2 += " & " + val2.number[i2];
        for (let k2 of keys) {
          if (k2 === "number")
            continue;
          add(k2, val2[k2][i2]);
        }
        T2 += " \\\\ ";
      }
      T2 += "\\hline";
      if (hcf) {
        T2 += " \\text{HCF} & = ";
        if (keys.includes("number"))
          T2 += " & " + HCF(...val2.number);
        for (let k2 of keys) {
          if (k2 === "number")
            continue;
          add(k2, Min(...val2[k2]));
        }
        T2 += " \\\\ ";
      }
      if (lcm) {
        T2 += " \\text{LCM} & = ";
        if (keys.includes("number"))
          T2 += " & " + LCM(...val2.number);
        for (let k2 of keys) {
          if (k2 === "number")
            continue;
          add(k2, Max(...val2[k2]));
        }
        T2 += " \\\\ ";
      }
      T2 += "\\end{matrix}";
      return T2;
    }
    static ConstraintText(constraint2, sign = true, xReplace = "x", yReplace = "y") {
      if (sign === false)
        constraint2 = rein(constraint2).flip().constraint;
      let T2 = ink.printConstraint(constraint2, false, sign === null);
      T2 = T2.replace(/x/g, xReplace);
      T2 = T2.replace(/y/g, yReplace);
      return T2;
    }
  };
  __decorateClass([
    checkIt(owl.bool, owl.bool)
  ], Host14, "IneqSign", 1);
  __decorateClass([
    checkIt(owl.num, owl.nonZero, owl.bool)
  ], Host14, "Dfrac", 1);
  __decorateClass([
    checkIt(owl.str)
  ], Host14, "IndexToSurd", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host14, "Coord", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host14, "Sci", 1);
  __decorateClass([
    checkIt(owl.ntuple, owl.ntuple)
  ], Host14, "LongDivision", 1);
  __decorateClass([
    checkIt([owl.num, Number.isSafeInteger], owl.positiveInt)
  ], Host14, "ToBase", 1);
  __decorateClass([
    checkIt(owl.object, owl.object)
  ], Host14, "PrimeFactorize", 1);
  __decorateClass([
    checkIt(owl.constraint, owl.pass, owl.str, owl.str)
  ], Host14, "ConstraintText", 1);
  Host14 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host14);

  // src/Math/Code/Triangle.ts
  var angle = owl.between(0, 180);
  var side = owl.positive;
  function triangle_ineq(a2, b2, c3) {
    return owl.triangleSides([a2, b2, c3]);
  }
  var Host15 = class {
    static Pyth(a2, b2) {
      return (a2 ** 2 + b2 ** 2) ** 0.5;
    }
    static PythLeg(c3, a2) {
      return (c3 ** 2 - a2 ** 2) ** 0.5;
    }
    static CosineLawLength(a2, b2, C2) {
      return (a2 ** 2 + b2 ** 2 - 2 * a2 * b2 * cos(C2)) ** 0.5;
    }
    static CosineLawAngle(a2, b2, c3) {
      return arccos((c3 ** 2 - a2 ** 2 - b2 ** 2) / (-2 * a2 * b2));
    }
    static SineLawLength(A2, a2, B2) {
      return a2 / sin(A2) * sin(B2);
    }
    static SineLawAngle(a2, A2, b2) {
      return arcsin(sin(A2) / a2 * b2);
    }
    static Heron(a2, b2, c3) {
      let s3 = (a2 + b2 + c3) / 2;
      return (s3 * (s3 - a2) * (s3 - b2) * (s3 - c3)) ** 0.5;
    }
    static SolveSSS(a2, b2, c3) {
      let A2 = CosineLawAngle(b2, c3, a2);
      let B2 = CosineLawAngle(c3, a2, b2);
      let C2 = CosineLawAngle(a2, b2, c3);
      return [C2, A2, B2];
    }
    static SolveSAS(a2, C2, b2) {
      let c3 = CosineLawLength(a2, b2, C2);
      let [_, A2, B2] = SolveSSS(a2, b2, c3);
      return [A2, c3, B2];
    }
    static SolveAAS(A2, B2, a2) {
      let C2 = 180 - A2 - B2;
      let b2 = SineLawLength(A2, a2, B2);
      let c3 = CosineLawLength(a2, b2, C2);
      return [c3, C2, b2];
    }
    static SolveASA(A2, c3, B2) {
      let C2 = 180 - A2 - B2;
      let a2 = SineLawLength(C2, c3, A2);
      let b2 = SineLawLength(C2, c3, B2);
      return [a2, C2, b2];
    }
    static SolveSSA(a2, b2, A2) {
      let B2 = SineLawAngle(a2, A2, b2);
      let C2 = 180 - A2 - B2;
      let c3 = SineLawLength(A2, a2, C2);
      return [C2, c3, B2];
    }
    static HeightsBySSS(a2, b2, c3) {
      let area = Heron(a2, b2, c3);
      let Ha = 2 * area / a2;
      let Hb = 2 * area / b2;
      let Hc = 2 * area / c3;
      return [Ha, Hb, Hc];
    }
    static HeightBySSS(a2, b2, c3) {
      let area = Heron(a2, b2, c3);
      return 2 * area / a2;
    }
    static HeightsBySAS(a2, C2, b2) {
      let [A2, c3, B2] = SolveSAS(a2, C2, b2);
      return HeightsBySSS(a2, b2, c3);
    }
    static HeightBySAS(a2, C2, b2) {
      let [ha, hb, hc] = HeightsBySAS(a2, C2, b2);
      return hc;
    }
    static TriangleFromVertex(A2, B2, C2, fix2 = true) {
      let sideC = Distance(A2, B2);
      let sideA = Distance(B2, C2);
      let sideB = Distance(C2, A2);
      let angleC = CosineLawAngle(sideA, sideB, sideC);
      let angleA = CosineLawAngle(sideB, sideC, sideA);
      let angleB = CosineLawAngle(sideA, sideC, sideB);
      if (fix2) {
        sideC = Fix(sideC);
        sideA = Fix(sideA);
        sideB = Fix(sideB);
        angleC = Fix(angleC);
        angleA = Fix(angleA);
        angleB = Fix(angleB);
      }
      return { sideC, angleB, sideA, angleC, sideB, angleA };
    }
    static SolveTriangle({ sideA, sideB, sideC, angleA, angleB, angleC }) {
      let a2 = sideA;
      let b2 = sideB;
      let c3 = sideC;
      let A2 = angleA;
      let B2 = angleB;
      let C2 = angleC;
      if (a2 === null)
        throw "SolveTriangle not accept null now";
      if (b2 === null)
        throw "SolveTriangle not accept null now";
      if (c3 === null)
        throw "SolveTriangle not accept null now";
      if (A2 === null)
        throw "SolveTriangle not accept null now";
      if (B2 === null)
        throw "SolveTriangle not accept null now";
      if (C2 === null)
        throw "SolveTriangle not accept null now";
      function angleSum() {
        if (A2 === void 0 && B2 !== void 0 && C2 !== void 0)
          A2 = 180 - B2 - C2;
        if (B2 === void 0 && A2 !== void 0 && C2 !== void 0)
          B2 = 180 - A2 - C2;
        if (C2 === void 0 && B2 !== void 0 && A2 !== void 0)
          C2 = 180 - A2 - B2;
      }
      function SSS() {
        if (a2 !== void 0 && b2 !== void 0 && c3 !== void 0) {
          A2 = CosineLawAngle(b2, c3, a2);
          B2 = CosineLawAngle(c3, a2, b2);
          C2 = CosineLawAngle(a2, b2, c3);
        }
      }
      function SAS() {
        if (a2 !== void 0 && b2 !== void 0 && C2 !== void 0 && c3 === void 0)
          c3 = CosineLawLength(a2, b2, C2);
        if (b2 !== void 0 && c3 !== void 0 && A2 !== void 0 && a2 === void 0)
          a2 = CosineLawLength(b2, c3, A2);
        if (c3 !== void 0 && a2 !== void 0 && B2 !== void 0 && b2 === void 0)
          b2 = CosineLawLength(c3, a2, B2);
      }
      function AAS() {
        let r3 = void 0;
        if (A2 !== void 0 && a2 !== void 0 && r3 === void 0)
          r3 = sin(A2) / a2;
        if (B2 !== void 0 && b2 !== void 0 && r3 === void 0)
          r3 = sin(B2) / b2;
        if (C2 !== void 0 && c3 !== void 0 && r3 === void 0)
          r3 = sin(C2) / c3;
        if (r3 !== void 0 && A2 !== void 0 && a2 === void 0)
          a2 = sin(A2) / r3;
        if (r3 !== void 0 && B2 !== void 0 && b2 === void 0)
          b2 = sin(B2) / r3;
        if (r3 !== void 0 && C2 !== void 0 && c3 === void 0)
          c3 = sin(C2) / r3;
      }
      for (let i2 = 0; i2 < 10; i2++) {
        if (a2 !== void 0 && b2 !== void 0 && c3 !== void 0 && A2 !== void 0 && B2 !== void 0 && C2 !== void 0) {
          return { sideA: a2, sideB: b2, sideC: c3, angleA: A2, angleB: B2, angleC: C2 };
        }
        angleSum();
        SSS();
        SAS();
        AAS();
      }
      Should(false, "Solve Triangle Fail!");
      throw "never";
    }
    static Orthocentre(A2, B2, C2) {
      let H2 = PdFoot(A2, B2, C2);
      let G2 = PdFoot(B2, C2, A2);
      let [x2, y2] = Intersection(C2, H2, A2, G2);
      return [cal.blur(x2), cal.blur(y2)];
    }
    static Circumcentre(A2, B2, C2) {
      let [a1, b1, c1] = LinearFromBisector(A2, B2);
      let [a2, b2, c22] = LinearFromBisector(B2, C2);
      let [x2, y2] = Crammer(a1, b1, -c1, a2, b2, -c22);
      return [cal.blur(x2), cal.blur(y2)];
    }
    static Centroid(A2, B2, C2) {
      let [x2, y2] = [(A2[0] + B2[0] + C2[0]) / 3, (A2[1] + B2[1] + C2[1]) / 3];
      return [cal.blur(x2), cal.blur(y2)];
    }
    static Incentre(A2, B2, C2) {
      let a2 = Distance(B2, C2);
      let b2 = Distance(A2, C2);
      let c3 = Distance(A2, B2);
      let p3 = a2 + b2 + c3;
      let x2 = (a2 * A2[0] + b2 * B2[0] + c3 * C2[0]) / p3;
      let y2 = (a2 * A2[1] + b2 * B2[1] + c3 * C2[1]) / p3;
      return [cal.blur(x2), cal.blur(y2)];
    }
    static ScaleOrthocentreToInt(A2, B2, C2) {
      let [x2, y2] = Orthocentre(A2, B2, C2);
      let q2 = numbers(x2, y2, ...A2, ...B2, ...C2).ratioFactor();
      Should(owl.num(q2), "original orthocentre must be rational");
      return shape2D(A2, B2, C2).scale(q2).toArray();
    }
    static ScaleCircumcentreToInt(A2, B2, C2) {
      let [x2, y2] = Circumcentre(A2, B2, C2);
      let q2 = numbers(x2, y2, ...A2, ...B2, ...C2).ratioFactor();
      Should(owl.num(q2), "original circumcentre must be rational");
      return shape2D(A2, B2, C2).scale(q2).toArray();
    }
    static ScaleCentroidToInt(A2, B2, C2) {
      let [x2, y2] = Centroid(A2, B2, C2);
      let q2 = numbers(x2, y2, ...A2, ...B2, ...C2).ratioFactor();
      Should(owl.num(q2), "original centroid must be rational");
      return shape2D(A2, B2, C2).scale(q2).toArray();
    }
    static ScaleIncentreToInt(A2, B2, C2) {
      let [x2, y2] = Incentre(A2, B2, C2);
      let q2 = numbers(x2, y2, ...A2, ...B2, ...C2).ratioFactor();
      Should(owl.num(q2), "original incentre must be rational");
      return shape2D(A2, B2, C2).scale(q2).toArray();
    }
  };
  __decorateClass([
    checkIt(side)
  ], Host15, "Pyth", 1);
  __decorateClass([
    checkIt(side),
    inspectIt(function is_triangle(c3, a2) {
      return c3 >= a2;
    })
  ], Host15, "PythLeg", 1);
  __decorateClass([
    checkIt(side, side, angle)
  ], Host15, "CosineLawLength", 1);
  __decorateClass([
    checkIt(side),
    inspectIt(triangle_ineq)
  ], Host15, "CosineLawAngle", 1);
  __decorateClass([
    checkIt(angle, side, angle)
  ], Host15, "SineLawLength", 1);
  __decorateClass([
    checkIt(side, angle, side),
    inspectIt(function is_triangle(a2, A2, b2) {
      return sin(A2) / a2 * b2 >= 0 && sin(A2) / a2 * b2 <= 1;
    })
  ], Host15, "SineLawAngle", 1);
  __decorateClass([
    checkIt(side),
    inspectIt(triangle_ineq)
  ], Host15, "Heron", 1);
  __decorateClass([
    checkIt(side),
    inspectIt(triangle_ineq)
  ], Host15, "SolveSSS", 1);
  __decorateClass([
    checkIt(side, angle, side)
  ], Host15, "SolveSAS", 1);
  __decorateClass([
    checkIt(angle, angle, side)
  ], Host15, "SolveAAS", 1);
  __decorateClass([
    checkIt(angle, side, angle)
  ], Host15, "SolveASA", 1);
  __decorateClass([
    checkIt(side, side, angle)
  ], Host15, "SolveSSA", 1);
  __decorateClass([
    checkIt(side),
    inspectIt(triangle_ineq)
  ], Host15, "HeightsBySSS", 1);
  __decorateClass([
    checkIt(side),
    inspectIt(triangle_ineq)
  ], Host15, "HeightBySSS", 1);
  __decorateClass([
    checkIt(side, angle, side)
  ], Host15, "HeightsBySAS", 1);
  __decorateClass([
    checkIt(side, angle, side)
  ], Host15, "HeightBySAS", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.point2D, owl.point2D, owl.bool)
  ], Host15, "TriangleFromVertex", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host15, "Orthocentre", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host15, "Circumcentre", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host15, "Centroid", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host15, "Incentre", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host15, "ScaleOrthocentreToInt", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host15, "ScaleCircumcentreToInt", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host15, "ScaleCentroidToInt", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host15, "ScaleIncentreToInt", 1);
  Host15 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host15);

  // src/Math/Code/Trigonometry.ts
  var Host16 = class {
    static Quadrant(rect) {
      if (!Array.isArray(rect))
        rect = PolToRect([1, rect]);
      const q2 = RectToPol(rect)[1];
      if (q2 >= 0 && q2 < 90)
        return "I";
      if (q2 >= 90 && q2 < 180)
        return "II";
      if (q2 >= 180 && q2 < 270)
        return "III";
      if (q2 >= 270 && q2 < 360)
        return "IV";
      Should(false, "fail to parse quadrant!");
      throw "never";
    }
    static PolToRect([r3, q2]) {
      return [r3 * cos(q2), r3 * sin(q2)];
    }
    static RectToPol([x2, y2]) {
      const r3 = Math.sqrt(x2 * x2 + y2 * y2);
      let q2 = Math.atan2(y2, x2) * 180 / Math.PI;
      if (q2 < 0)
        q2 = q2 + 360;
      return [r3, q2];
    }
    static ASTC(quadrant2, func) {
      if (quadrant2 == "I")
        quadrant2 = 1;
      if (quadrant2 == "II")
        quadrant2 = 2;
      if (quadrant2 == "III")
        quadrant2 = 3;
      if (quadrant2 == "IV")
        quadrant2 = 4;
      if (quadrant2 == 1)
        return 1;
      if (quadrant2 == 2)
        return func === "sin" ? 1 : -1;
      if (quadrant2 == 3)
        return func === "tan" ? 1 : -1;
      if (quadrant2 == 4)
        return func === "cos" ? 1 : -1;
      return 0;
    }
    static TrigRoot(func, k2) {
      if (func == "sin") {
        if (k2 > 1 || k2 < -1)
          return [void 0, void 0, void 0];
        if (k2 == 0)
          return [0, 180, 360];
        if (k2 == 1)
          return [90, void 0, void 0];
        if (k2 == -1)
          return [270, void 0, void 0];
        if (k2 > 0) {
          let a2 = arcsin(k2);
          let b2 = 180 - a2;
          return [a2, b2, void 0];
        }
        if (k2 < 0) {
          let x2 = -arcsin(k2);
          let a2 = 180 + x2;
          let b2 = 360 - x2;
          return [a2, b2, void 0];
        }
      }
      if (func == "cos") {
        if (k2 > 1 || k2 < -1)
          return [void 0, void 0, void 0];
        if (k2 == 0)
          return [90, 270, void 0];
        if (k2 == 1)
          return [0, 360, void 0];
        if (k2 == -1)
          return [180, void 0, void 0];
        let a2 = arccos(k2);
        let b2 = 360 - a2;
        return [a2, b2, void 0];
      }
      if (func == "tan") {
        if (k2 == 0)
          return [0, 180, 360];
        if (k2 > 0) {
          let a2 = arctan(k2);
          let b2 = 180 + a2;
          return [a2, b2, void 0];
        }
        if (k2 < 0) {
          let x2 = -arctan(k2);
          let a2 = 180 - x2;
          let b2 = 360 - x2;
          return [a2, b2, void 0];
        }
      }
      return [void 0, void 0, void 0];
    }
    static TrigSolve(func, k2) {
      if (func == "sin") {
        if (k2 > 1 || k2 < -1)
          return [];
        if (k2 == 0)
          return [0, 180, 360];
        if (k2 == 1)
          return [90];
        if (k2 == -1)
          return [270];
        if (k2 > 0) {
          let a2 = arcsin(k2);
          let b2 = 180 - a2;
          return [a2, b2];
        }
        if (k2 < 0) {
          let x2 = -arcsin(k2);
          let a2 = 180 + x2;
          let b2 = 360 - x2;
          return [a2, b2];
        }
      }
      if (func == "cos") {
        if (k2 > 1 || k2 < -1)
          return [];
        if (k2 == 0)
          return [90, 270];
        if (k2 == 1)
          return [0, 360];
        if (k2 == -1)
          return [180];
        let a2 = arccos(k2);
        let b2 = 360 - a2;
        return [a2, b2];
      }
      if (func == "tan") {
        if (k2 == 0)
          return [0, 180, 360];
        if (k2 > 0) {
          let a2 = arctan(k2);
          let b2 = 180 + a2;
          return [a2, b2];
        }
        if (k2 < 0) {
          let x2 = -arctan(k2);
          let a2 = 180 - x2;
          let b2 = 360 - x2;
          return [a2, b2];
        }
      }
      return [];
    }
    static PolarReduce(q2) {
      q2 = q2 % 360;
      if (q2 < 0)
        q2 += 360;
      return q2;
    }
    static PolarDiff(angle1, angle2) {
      angle1 = PolarReduce(angle1);
      angle2 = PolarReduce(angle2);
      let d2 = Abs(angle1 - angle2);
      return Math.min(d2, 360 - d2);
    }
    static WholeBearing(polarAngle) {
      let q2 = polarAngle;
      q2 = PolarReduce(q2);
      q2 = cal.blur(q2);
      q2 = q2 <= 90 ? 90 - q2 : 450 - q2;
      q2 = cal.blur(q2);
      return q2.toString().padStart(3, "0") + "\xB0";
    }
    static CompassBearing(polarAngle) {
      let q2 = polarAngle;
      q2 = PolarReduce(q2);
      q2 = cal.blur(q2);
      if (q2 === 0)
        return "east";
      if (q2 === 270)
        return "south";
      if (q2 === 180)
        return "west";
      if (q2 === 90)
        return "north";
      if (0 < q2 && q2 < 90)
        return "N" + (90 - q2) + "\xB0E";
      if (90 < q2 && q2 < 180)
        return "N" + (q2 - 90) + "\xB0W";
      if (180 < q2 && q2 < 270)
        return "S" + (270 - q2) + "\xB0W";
      if (270 < q2 && q2 < 360)
        return "S" + (q2 - 270) + "\xB0E";
      throw "never";
    }
  };
  __decorateClass([
    checkIt(owl.or([owl.point2D, owl.num]))
  ], Host16, "Quadrant", 1);
  __decorateClass([
    checkIt(owl.polar)
  ], Host16, "PolToRect", 1);
  __decorateClass([
    checkIt(owl.point2D)
  ], Host16, "RectToPol", 1);
  __decorateClass([
    checkIt(owl.quadrant, owl.trig)
  ], Host16, "ASTC", 1);
  __decorateClass([
    checkIt(owl.trig, owl.num)
  ], Host16, "TrigRoot", 1);
  __decorateClass([
    checkIt(owl.trig, owl.num)
  ], Host16, "TrigSolve", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host16, "PolarReduce", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host16, "PolarDiff", 1);
  __decorateClass([
    checkIt(owl.int)
  ], Host16, "WholeBearing", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host16, "CompassBearing", 1);
  Host16 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host16);

  // src/Math/Code/Vector.ts
  var Host17 = class {
    static VecAdd(...vectors) {
      const x2 = Sum(...vectors.map((p3) => p3[0]));
      const y2 = Sum(...vectors.map((p3) => p3[1]));
      return [x2, y2];
    }
  };
  __decorateClass([
    checkIt(owl.vector)
  ], Host17, "VecAdd", 1);
  Host17 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host17);

  // src/Math/Code/Vector3D.ts
  var Host18 = class {
    static Mid3D(...vectors) {
      const x2 = Sum(...vectors.map((p3) => p3[0])) / vectors.length;
      const y2 = Sum(...vectors.map((p3) => p3[1])) / vectors.length;
      const z2 = Sum(...vectors.map((p3) => p3[2])) / vectors.length;
      return [x2, y2, z2];
    }
    static Slide3D(A2, B2, ratio) {
      let r3 = ratio;
      let s3 = 1 - r3;
      return [
        A2[0] * s3 + B2[0] * r3,
        A2[1] * s3 + B2[1] * r3,
        A2[2] * s3 + B2[2] * r3
      ];
    }
    static PdFoot3D(point, base2) {
      if (base2.length === 3) {
        let [A2, B2, C2] = base2;
        return vec3D(A2, point).projectOnPlane(vec3D(A2, B2), vec3D(B2, C2)).add(A2).toArray();
      } else if (base2.length === 2) {
        let [A2, B2] = base2;
        return vec3D(A2, point).projectOn(vec3D(A2, B2)).add(A2).toArray();
      }
      Should(false, "base must have 2 or 3 points");
      throw "never";
    }
    static Embed(plane2D, origin, xVec, yVec) {
      return toShape2D(plane2D).erect(xVec, yVec).translate(origin).toArray();
    }
    static EmbedX(plane2D, x2 = 0) {
      return Embed(plane2D, [x2, 0, 0], [0, 1, 0], [0, 0, 1]);
    }
    static EmbedY(plane2D, y2 = 0) {
      return Embed(plane2D, [0, y2, 0], [1, 0, 0], [0, 0, 1]);
    }
    static EmbedZ(plane2D, z2 = 0) {
      return Embed(plane2D, [0, 0, z2], [1, 0, 0], [0, 1, 0]);
    }
    static FlatZ(points, z2 = 0) {
      return points.map(([x2, y2, _]) => [x2, y2, z2]);
    }
    static Extrude(lowerBase, upperBase, scale) {
      let max = Math.max(lowerBase.length, upperBase.length);
      let LB = toShape3D(lowerBase).padTail(max);
      let UB = toShape3D(upperBase).padTail(max);
      return LB.extrudeToShape(UB, scale).toArray();
    }
    static Projector(angle2 = 60, depth = 0.5) {
      return function(x2, y2, z2) {
        let x_new = x2 + depth * y2 * cos(angle2);
        let y_new = z2 + depth * y2 * sin(angle2);
        return [x_new, y_new];
      };
    }
    static Projector3D(angle2 = 60, depth = 0.5) {
      let projector = function(point3D2) {
        let [x2, y2, z2] = point3D2;
        let x_new = x2 + depth * y2 * cos(angle2);
        let y_new = z2 + depth * y2 * sin(angle2);
        return [x_new, y_new];
      };
      return check(projector, [owl.point3D]);
    }
  };
  __decorateClass([
    checkIt(owl.vector3D)
  ], Host18, "Mid3D", 1);
  __decorateClass([
    checkIt(owl.point3D, owl.point3D, owl.num)
  ], Host18, "Slide3D", 1);
  __decorateClass([
    checkIt(owl.point3D, owl.point3Ds)
  ], Host18, "PdFoot3D", 1);
  __decorateClass([
    checkIt(owl.point2Ds, owl.point3D, owl.vector3D, owl.vector3D)
  ], Host18, "Embed", 1);
  __decorateClass([
    checkIt(owl.point2Ds, owl.num)
  ], Host18, "EmbedX", 1);
  __decorateClass([
    checkIt(owl.point2Ds, owl.num)
  ], Host18, "EmbedY", 1);
  __decorateClass([
    checkIt(owl.point2Ds, owl.num)
  ], Host18, "EmbedZ", 1);
  __decorateClass([
    checkIt(owl.point3Ds, owl.num)
  ], Host18, "FlatZ", 1);
  __decorateClass([
    checkIt(owl.point3Ds, owl.point3Ds, owl.num)
  ], Host18, "Extrude", 1);
  __decorateClass([
    checkIt(owl.num, owl.num)
  ], Host18, "Projector3D", 1);
  Host18 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host18);

  // src/Math/Algebra/Algebra.ts
  var Host19 = class {
    static Crammer(a2, b2, c3, p3, q2, r3) {
      const D2 = a2 * q2 - b2 * p3;
      const x2 = (c3 * q2 - b2 * r3) / D2;
      const y2 = (a2 * r3 - c3 * p3) / D2;
      return [x2, y2];
    }
    static xPolynomial(poly1, poly2) {
      const deg1 = poly1.length - 1;
      const deg22 = poly2.length - 1;
      const deg4 = deg1 + deg22;
      const result2 = Array(deg4 + 1).fill(0);
      for (let i2 = 0; i2 <= deg1; i2++) {
        for (let j2 = 0; j2 <= deg22; j2++) {
          result2[i2 + j2] += poly1[i2] * poly2[j2];
        }
      }
      return result2;
    }
  };
  __decorateClass([
    checkIt(owl.num),
    inspectIt(function has_unique_sol(a2, b2, c3, p3, q2, r3) {
      return a2 * q2 - b2 * p3 !== 0;
    })
  ], Host19, "Crammer", 1);
  __decorateClass([
    checkIt([owl.ntuple, function non_zero_leading_coeff(_) {
      return _[0] !== 0;
    }])
  ], Host19, "xPolynomial", 1);
  Host19 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host19);

  // src/Math/Algebra/Calculus.ts
  var Host20 = class {
    static differentiate(fn) {
      return differentiate(fn);
    }
    static integrate(fn, fixPoint = [0, 0]) {
      return integrate(fn, fixPoint);
    }
    static functionize(points) {
      return functionize(points);
    }
  };
  __decorateClass([
    checkIt(owl.point2Ds)
  ], Host20, "functionize", 1);
  Host20 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host20);

  // src/Math/Algebra/Circle.ts
  var Host21 = class {
    static CircleGeneral(centre, radius) {
      let [h2, k2] = centre;
      let r3 = radius;
      let D2 = -2 * h2;
      let E2 = -2 * k2;
      let F2 = h2 ** 2 + k2 ** 2 - r3 ** 2;
      return [D2, E2, F2];
    }
    static CircleFromGeneral(D2, E2, F2) {
      let [h2, k2] = [-D2 / 2, -E2 / 2];
      let R2 = (D2 / 2) ** 2 + (E2 / 2) ** 2 - F2;
      Should(R2 >= 0, "radius should be real");
      let r3 = R2 ** 0.5;
      return [[h2, k2], r3];
    }
    static CircleLinearIntersect(center, radius, linear) {
      let [a2, b2, c3] = linear;
      let [h2, k2] = center;
      let r3 = radius;
      if (b2 !== 0) {
        let m3 = -a2 / b2;
        let n2 = -c3 / b2 - k2;
        let A2 = 1 + m3 * m3;
        let B2 = -2 * h2 + 2 * m3 * n2;
        let C2 = h2 * h2 + n2 * n2 - r3 * r3;
        Should(Discriminant(A2, B2, C2) >= 0, "no intersection");
        let [x1, x2] = QuadraticRoot(A2, B2, C2);
        let y1 = (-a2 * x1 - c3) / b2;
        let y2 = (-a2 * x2 - c3) / b2;
        let P2 = [cal.blur(x1), cal.blur(y1)];
        let Q2 = [cal.blur(x2), cal.blur(y2)];
        return [P2, Q2];
      } else {
        let x2 = -c3 / a2;
        let D2 = r3 * r3 - (x2 - h2) ** 2;
        Should(D2 >= 0, "no intersection");
        let y1 = k2 - Math.sqrt(D2);
        let y2 = k2 + Math.sqrt(D2);
        let P2 = [cal.blur(x2), cal.blur(y1)];
        let Q2 = [cal.blur(x2), cal.blur(y2)];
        return [P2, Q2];
      }
    }
    static CircleLineIntersect(center, radius, [A2, B2]) {
      let lin3 = LinearFromTwoPoints(A2, B2);
      return CircleLinearIntersect(center, radius, lin3);
    }
  };
  __decorateClass([
    checkIt(owl.point2D, owl.positive)
  ], Host21, "CircleGeneral", 1);
  __decorateClass([
    checkIt(owl.num)
  ], Host21, "CircleFromGeneral", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.positive, owl.triple)
  ], Host21, "CircleLinearIntersect", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.positive, owl.point2Ds)
  ], Host21, "CircleLineIntersect", 1);
  Host21 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host21);

  // src/Math/Algebra/Quadratic.ts
  var Host22 = class {
    static Discriminant(a2, b2, c3) {
      return b2 * b2 - 4 * a2 * c3;
    }
    static QuadraticRoot(a2, b2, c3) {
      const d2 = Discriminant(a2, b2, c3);
      const s3 = Math.sqrt(d2);
      const r1 = Divide(-b2 - s3, 2 * a2);
      const r22 = Divide(-b2 + s3, 2 * a2);
      return [Min(r1, r22), Max(r1, r22)];
    }
    static QuadraticVertex(a2, b2, c3) {
      const h2 = Divide(-b2, 2 * a2);
      const k2 = a2 * h2 * h2 + b2 * h2 + c3;
      return [h2, k2];
    }
    static QuadraticFromRoot(a2, p3, q2) {
      return [a2, -a2 * (p3 + q2), a2 * p3 * q2];
    }
    static QuadraticFromVertex(a2, h2, k2) {
      const b2 = -2 * a2 * h2;
      const c3 = k2 - a2 * h2 * h2 - b2 * h2;
      return [a2, b2, c3];
    }
  };
  __decorateClass([
    checkIt(owl.nonZero, owl.num, owl.num)
  ], Host22, "Discriminant", 1);
  __decorateClass([
    checkIt(owl.nonZero, owl.num, owl.num),
    inspectIt(function has_real_root(a2, b2, c3) {
      return b2 ** 2 - 4 * a2 * c3 >= 0;
    })
  ], Host22, "QuadraticRoot", 1);
  __decorateClass([
    checkIt(owl.nonZero, owl.num, owl.num)
  ], Host22, "QuadraticVertex", 1);
  __decorateClass([
    checkIt(owl.nonZero, owl.num, owl.num)
  ], Host22, "QuadraticFromRoot", 1);
  __decorateClass([
    checkIt(owl.nonZero, owl.num, owl.num)
  ], Host22, "QuadraticFromVertex", 1);
  Host22 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host22);

  // src/Math/Algebra/Linear.ts
  var Host23 = class {
    static LineFeat(a2, b2, c3) {
      let x2 = -c3 / a2;
      let y2 = -c3 / b2;
      let m3 = -a2 / b2;
      return [m3, y2, x2];
    }
    static LinearFromIntercepts(xInt, yInt) {
      return lin().byIntercepts(xInt, yInt).toLinear();
    }
    static LinearFromTwoPoints(point1, point2) {
      return lin().byTwoPoints(point1, point2).toLinear();
    }
    static LinearFromPointSlope(point, slope2) {
      return lin().byPointSlope(point, slope2).toLinear();
    }
    static LinearFromBisector(A2, B2) {
      return lin().byBisector(A2, B2).toLinear();
    }
    static LineFromIntercepts(xInt, yInt) {
      return lin().byIntercepts(xInt, yInt).toLine();
    }
    static LineFromTwoPoints(point1, point2) {
      return lin().byTwoPoints(point1, point2).toLine();
    }
    static LineFromPointSlope(point, slope2) {
      return lin().byPointSlope(point, slope2).toLine();
    }
    static LineFromBisector(A2, B2) {
      return lin().byBisector(A2, B2).toLine();
    }
  };
  __decorateClass([
    checkIt(owl.nonZero, owl.nonZero, owl.num)
  ], Host23, "LineFeat", 1);
  __decorateClass([
    checkIt(owl.nonZero, owl.nonZero)
  ], Host23, "LinearFromIntercepts", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.point2D),
    inspectIt(function different_points(p1, p22) {
      return owl.distinct([p1, p22]);
    })
  ], Host23, "LinearFromTwoPoints", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.num)
  ], Host23, "LinearFromPointSlope", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.point2D),
    inspectIt(function different_points(p1, p22) {
      return owl.distinct([p1, p22]);
    })
  ], Host23, "LinearFromBisector", 1);
  __decorateClass([
    checkIt(owl.nonZero, owl.nonZero)
  ], Host23, "LineFromIntercepts", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.point2D),
    inspectIt(function different_points(p1, p22) {
      return owl.distinct([p1, p22]);
    }),
    inspectIt(function non_vertical(p1, p22) {
      return p1[0] !== p22[0];
    })
  ], Host23, "LineFromTwoPoints", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.num)
  ], Host23, "LineFromPointSlope", 1);
  __decorateClass([
    checkIt(owl.point2D, owl.point2D),
    inspectIt(function different_points(p1, p22) {
      return owl.distinct([p1, p22]);
    }),
    inspectIt(function non_horizontal(p1, p22) {
      return p1[1] !== p22[1];
    })
  ], Host23, "LineFromBisector", 1);
  Host23 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host23);

  // src/Math/Algebra/PolynomialClass.ts
  var MonomialCls = class {
    constructor(coeff = 0, vars = []) {
      this.coeff = coeff;
      this.vars = vars;
    }
    clone() {
      let coeff = this.coeff;
      let vars = JSON.parse(JSON.stringify(this.vars));
      return new MonomialCls(coeff, vars);
    }
    random(degree, variables, maxCoeff) {
      let f3 = () => {
        let M2 = new MonomialCls();
        M2.coeff = RndZ(1, maxCoeff);
        for (let v3 of variables) {
          if (variables.length === 1) {
            M2.vars.push({ variable: v3, power: degree });
          } else {
            M2.vars.push({ variable: v3, power: RndN(0, degree) });
          }
        }
        return M2;
      };
      let mon = dice(f3).shield((M2) => M2.degree() === degree).roll();
      this.coeff = mon.coeff;
      this.vars = mon.vars;
    }
    degree() {
      return Sum(...this.vars.map((_) => _.power));
    }
    sortedVars() {
      return SortBy([...this.vars], (_) => _.variable.charCodeAt(0));
    }
    size() {
      let s3 = this.degree();
      let order = 1;
      for (let { variable, power } of this.sortedVars()) {
        order = order / 10;
        s3 += order * power;
      }
      return s3;
    }
    signature() {
      return JSON.stringify(this.sortedVars());
    }
    sort() {
      this.vars = this.sortedVars();
    }
    print() {
      let term = String(this.coeff);
      if (this.coeff === 0)
        return term;
      for (let v3 of this.vars) {
        let l3 = v3.variable;
        let p3 = v3.power;
        if (p3 === 0) {
          continue;
        } else if (p3 === 1) {
          term += l3;
        } else {
          term += l3 + "^{" + p3 + "}";
        }
      }
      return term;
    }
    func() {
      return (input) => {
        let x2 = this.coeff;
        for (let { variable, power } of this.vars) {
          x2 = x2 * input[variable] ** power;
        }
        return x2;
      };
    }
  };

  // src/Math/Algebra/Polynomial.ts
  var Host24 = class {
    static Monomial(coeff, vars) {
      return new MonomialCls(coeff, vars);
    }
    static PolyClone(poly) {
      return poly.map((M2) => M2.clone());
    }
    static RndPolynomial(degree, vars = ["x"], terms = degree + 1, maxCoeff = 9) {
      let RndMono = () => {
        let M2 = new MonomialCls();
        M2.random(RndN(0, degree), vars, maxCoeff);
        return M2;
      };
      let f3 = () => dice(RndMono).unique((M2) => M2.size()).rolls(terms);
      return dice(f3).shield((P2) => Max(...P2.map((M2) => M2.degree())) === degree).roll();
    }
    static PolyPrint(poly) {
      return poly.map((M2) => M2.print()).filter((x2) => x2 !== "0").join("+");
    }
    static PolySort(poly, desc = true) {
      poly = PolyClone(poly);
      let arr = SortBy(poly, (M2) => desc ? -M2.size() : M2.size());
      return arr;
    }
    static PolyFunction(poly) {
      poly = PolyClone(poly);
      return (values) => {
        return Sum(...poly.map((M2) => M2.func()(values)));
      };
    }
    static PolyJoin(...polys) {
      polys = polys.map((p3) => PolyClone(p3));
      let arr = [];
      for (let p3 of polys)
        arr.push(...p3);
      return arr;
    }
    static PolySimplify(poly) {
      poly = PolyClone(poly);
      let arr = [];
      function findLikeTerm(M2) {
        return arr.find((m3) => m3.signature() === M2.signature());
      }
      for (let M2 of poly) {
        let like = findLikeTerm(M2);
        if (like) {
          like.coeff += M2.coeff;
        } else {
          arr.push(M2);
        }
      }
      return arr.filter((m3) => m3.coeff !== 0);
    }
    static PolyDegree(poly) {
      return Max(...poly.map((M2) => M2.degree()));
    }
  };
  __decorateClass([
    checkIt(owl.num, owl.array)
  ], Host24, "Monomial", 1);
  __decorateClass([
    checkIt(owl.polynomial)
  ], Host24, "PolyClone", 1);
  __decorateClass([
    checkIt(owl.positiveInt, owl.arrayWith(owl.str), owl.positiveInt, owl.num)
  ], Host24, "RndPolynomial", 1);
  __decorateClass([
    checkIt(owl.polynomial)
  ], Host24, "PolyPrint", 1);
  __decorateClass([
    checkIt(owl.polynomial, owl.bool)
  ], Host24, "PolySort", 1);
  __decorateClass([
    checkIt(owl.polynomial)
  ], Host24, "PolyFunction", 1);
  __decorateClass([
    checkIt(owl.polynomial)
  ], Host24, "PolyJoin", 1);
  __decorateClass([
    checkIt(owl.polynomial)
  ], Host24, "PolySimplify", 1);
  __decorateClass([
    checkIt(owl.polynomial)
  ], Host24, "PolyDegree", 1);
  Host24 = __decorateClass([
    exposeAll(),
    captureAll()
  ], Host24);

  // src/Math/should.ts
  var CustomErrorCls = class extends Error {
    constructor(name, message) {
      super(message);
      this.name = name;
    }
  };
  function CustomError2(name, message) {
    return new CustomErrorCls(name, message);
  }
  globalThis.CustomError = CustomError2;
  function toError2(e6) {
    if (e6 instanceof Error) {
      return e6;
    } else if (typeof e6 === "string") {
      return CustomError2("UnknownError", e6);
    } else {
      return CustomError2("UnknownError", JSON.stringify(e6));
    }
  }
  globalThis.toError = toError2;
  function MathError2(message) {
    return new CustomErrorCls("MathError", message);
  }
  globalThis.MathError = MathError2;
  function Should2(condition, msg = "Should condition failed!") {
    if (!condition) {
      let caller = new Error().stack.split("\n")[2].trim().split(" ")[1];
      caller = caller ?? "Anonymous ";
      throw MathError2(caller + ": " + msg);
    }
  }
  globalThis.Should = Should2;

  // src/Math/Builder/support/latex.ts
  function latexAligned(texts) {
    let T2 = "";
    T2 += "\\begin{aligned}";
    for (let t2 of texts)
      T2 += t2 + " \\\\ ";
    T2 += " \\end{aligned}";
    T2 = T2.replaceAll("=", "&=");
    T2 = T2.replaceAll("&&=", "&=");
    return T2;
  }
  function latexBraced(texts) {
    return "\\left\\{" + latexAligned(texts) + "\\right.";
  }

  // src/Math/Builder/support/equation.ts
  var Equation = class {
    constructor(zeroFunc, latex, dep) {
      this.zeroFunc = zeroFunc;
      this.latex = latex;
      this.dep = dep;
    }
    print(showVars = []) {
      return this.dep.write(this.latex, showVars);
    }
  };

  // src/Math/Builder/support/units.ts
  var DEFAULT_UNIT = {
    "illuminance": "lx",
    "luminous flux": "lm",
    "overall thermal transfer value": "W m-2",
    "thermal conductivity": "W m-1  K-1",
    "thermal Transmittance": "W m-2 K-1",
    "cooling capacity": "W",
    "rate of conduction": "W",
    "effciency": "\\%",
    "angular speed": "rad s-1",
    "angular displacement": "rad",
    "time": "s",
    "distance": "m",
    "displacement": "m",
    "separation": "m",
    "speed": "m s-1",
    "velocity": "m s-1",
    "acceleration": "m s-2",
    "deceleration": "m s-2",
    "area": "m2",
    "volume": "m3",
    "height": "m",
    "radius": "m",
    "diameter": "m",
    "length": "m",
    "width": "m",
    "wavelength": "m",
    "capacitiy": "m3",
    "angle": "\xB0",
    "energy": "J",
    "molar mass": "kg mol-1",
    "mass": "kg",
    "electromotive force": "V",
    "specific heat capacity": "J kg-1 \xB0C-1",
    "heat capacity": "J \xB0C-1",
    "temperature": "\xB0C",
    "latent heat": "J kg-1",
    "pressure": "Pa",
    "number of molecule": "",
    "number of mole": "mol",
    "force": "N",
    "weight": "N",
    "tension": "N",
    "normal reaction": "N",
    "friction": "N",
    "moment": "N m",
    "power": "W",
    "gravitational field strength": "N kg-1",
    "angular position": "\xB0",
    "period": "s",
    "frequency": "Hz",
    "amplitude": "m",
    "charge": "C",
    "current": "A",
    "voltage": "V",
    "resistance": "\u03A9",
    "electric field strength": "N C-1",
    "potential difference": "V",
    "resistivity": "\u03A9 m",
    "emf": "V",
    "e.m.f.": "V",
    "magnetic field": "B",
    "magnetic flux": "Wb",
    "activity": "Bq",
    "half-life": "s",
    "decay constant": "s-1",
    "density": "kg m-3",
    "KE": "J",
    "PE": "J"
  };
  var BASE_UNITS = [
    "rad",
    "mol",
    "Wb",
    "Bq",
    "eV",
    "\xB0C",
    "Pa",
    "s",
    "m",
    "g",
    "A",
    "K",
    "J",
    "N",
    "W",
    "C",
    "V",
    "T",
    "u",
    "\u03A9"
  ];
  var BASE_PREFIX = ["n", "u", "m", "c", "k", "M", "G", "T", ""];
  var BASE_INDEX = ["-4", "-3", "-2", "-1", "1", "2", "3", "4"];
  function findUnit(name) {
    for (let k2 in DEFAULT_UNIT) {
      if (name.includes(k2))
        return DEFAULT_UNIT[k2];
    }
    return void 0;
  }
  function parseUnit(raw) {
    let T2 = " " + raw + " ";
    for (let u2 of BASE_UNITS) {
      if (!T2.includes(u2))
        continue;
      for (let p3 of BASE_PREFIX) {
        T2 = T2.replaceAll(new RegExp("([^a-zA-z\xB0])" + p3 + u2 + "([^a-zA-z\xB0])", "g"), "$1~\\text{" + p3 + u2 + "}$2");
      }
    }
    for (let i2 of BASE_INDEX)
      T2 = T2.replaceAll(new RegExp("([^0123456789-])" + i2 + "([^0123456789-])", "g"), "$1^{" + i2 + "}$2");
    return T2;
  }

  // src/Math/Builder/support/variable.ts
  function parseRange(rng) {
    if (Array.isArray(rng)) {
      return rng.length === 2 ? rng : [rng[0], rng[0]];
    } else {
      return rng > 0 ? [rng / 10, rng * 10] : [rng * 10, rng / 10];
    }
  }
  var Variable = class {
    constructor(sym, name, range2, unit, display) {
      this.sym = sym;
      this.name = name;
      unit ??= findUnit(name);
      unit ??= "";
      this.unit = parseUnit(unit);
      this.range = parseRange(range2);
      let [min, max] = this.range;
      if (min > max)
        throw "[Variable] Range must have max > min";
      this.display = display ?? this.sym;
    }
    val = NaN;
    subscript = "";
    unit;
    range;
    display;
    set(val2) {
      this.val = val2;
    }
    round(sigfig2 = 2) {
      this.set(Round(this.val, sigfig2));
    }
    shake() {
      let ratio = RndT() ? 1.05 : 0.95;
      this.set(this.val * ratio);
    }
    clear() {
      this.set(NaN);
    }
    getVal() {
      return this.val;
    }
    widen(fraction2 = 0.1) {
      let [min, max] = this.range;
      this.range = [
        min - Math.abs(min * fraction2),
        max + Math.abs(max * fraction2)
      ];
    }
    label(subscript = "") {
      this.subscript = String(subscript);
    }
    symbol() {
      if (this.subscript.length > 0)
        return this.display + "_{" + this.subscript + "}";
      return this.display;
    }
    short() {
      let v3 = cal.blur(Round(this.val, 3));
      let abs = Math.abs(v3);
      return String(abs >= 1e4 || abs <= 0.01 ? Sci(v3) : v3);
    }
    long() {
      return this.short() + this.unit;
    }
    full() {
      return this.symbol() + " = " + this.long();
    }
    whole() {
      return "\\text{" + this.name + "} = " + this.long();
    }
    rich() {
      return "\\text{" + this.name + "}~" + this.symbol() + " = " + this.long();
    }
    writeSymbol(latex) {
      let T2 = latex;
      let sym = this.sym;
      let s3 = this.symbol();
      T2 = T2.replaceAll("*(" + sym + ")", s3);
      T2 = T2.replaceAll("*" + sym, s3);
      T2 = T2.replaceAll("$(" + sym + ")", s3);
      T2 = T2.replaceAll("$" + sym, s3);
      return T2;
    }
    writeValue(latex) {
      let T2 = latex;
      let sym = this.sym;
      let S2 = this.short();
      let L2 = this.long();
      T2 = T2.replaceAll("*(" + sym + ")", "(" + S2 + ")");
      T2 = T2.replaceAll("*" + sym, S2);
      T2 = T2.replaceAll("$(" + sym + ")", "(" + L2 + ")");
      T2 = T2.replaceAll("$" + sym, L2);
      return T2;
    }
  };
  var Variables = class extends Array {
    clear() {
      this.forEach(($) => $.clear());
    }
    widen() {
      this.forEach(($) => $.widen());
    }
    getVals() {
      return this.map(($) => $.getVal());
    }
    setVal(obj) {
      for (let k2 in obj) {
        let val2 = obj[k2];
        let variable = this.find(($) => $.sym === k2);
        variable.set(val2);
      }
    }
    write(latex, showVars) {
      let T2 = latex;
      let shows = [...showVars];
      shows.sort((a2, b2) => b2.sym.length - a2.sym.length);
      for (let v3 of this) {
        T2 = showVars.includes(v3) ? v3.writeValue(T2) : v3.writeSymbol(T2);
      }
      return T2;
    }
    compareWith(oldVals) {
      this.forEach((v3, i2) => {
        let b2 = v3.getVal();
        let a2 = oldVals[i2];
        let mid5 = (Math.abs(a2) + Math.abs(b2)) / 2;
        let percent = (b2 - a2) / mid5;
        let THRESHOLD = 1e-7;
        let sign = 0;
        if (percent > THRESHOLD)
          sign = 1;
        if (percent < -THRESHOLD)
          sign = -1;
        v3.set(sign);
      });
    }
    rangeObj() {
      let obj = {};
      for (let v3 of this) {
        obj[v3.sym] = v3.range;
      }
      return obj;
    }
    valObj() {
      let obj = {};
      for (let v3 of this) {
        obj[v3.sym] = v3.getVal();
      }
      return obj;
    }
  };

  // ../packages/gauss/lib/src/utils.js
  function getVars(func) {
    const fnStr = func.toString();
    return fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).replaceAll(" ", "").split(",");
  }
  function getAllVars(fs) {
    const vars = fs.map(($) => getVars($)).flat();
    return [...new Set(vars)];
  }
  function permute(arr) {
    let result2 = [];
    if (arr.length === 0)
      return [];
    if (arr.length === 1)
      return [arr];
    for (let i2 = 0; i2 < arr.length; i2++) {
      const current = arr[i2];
      const remaining = [...arr.slice(0, i2), ...arr.slice(i2 + 1)];
      const remainingPermuted = permute(remaining);
      for (let permuted of remainingPermuted) {
        result2.push([current, ...permuted]);
      }
    }
    return result2;
  }
  function combinations(arr, k2) {
    if (k2 > arr.length || k2 <= 0)
      return [];
    if (k2 === arr.length)
      return [[...arr]];
    if (k2 === 1)
      return arr.map(($) => [$]);
    const combs = [];
    let tail_combs = [];
    for (let i2 = 0; i2 <= arr.length - k2 + 1; i2++) {
      let tail = arr.slice(i2 + 1);
      tail_combs = combinations(tail, k2 - 1);
      for (let j2 = 0; j2 < tail_combs.length; j2++) {
        combs.push([arr[i2], ...tail_combs[j2]]);
      }
    }
    return combs;
  }

  // ../packages/gauss/lib/src/EquationFitter/Bisection/bisection.js
  function randomUniform(range2) {
    const [min, max] = range2;
    return Math.random() * (max - min) + min;
  }
  function randomLog(range2) {
    const [min, max] = range2;
    const logmin = Math.log10(min);
    const logmax = Math.log10(max);
    const e6 = randomUniform([logmin, logmax]);
    return 10 ** e6;
  }
  function randomLogNeg(range2) {
    const [minNeg, maxNeg] = range2;
    const min = -maxNeg;
    const max = -minNeg;
    return -randomLog([min, max]);
  }
  function randomValue(range2) {
    let [min, max] = range2;
    if (min > 0 && max > 0)
      return randomLog(range2);
    if (min < 0 && max < 0)
      return randomLogNeg(range2);
    return randomUniform(range2);
  }
  function mid(a2, b2) {
    return a2.map(($, i2) => ($ + b2[i2]) / 2);
  }
  function equal(a2, b2) {
    return a2.every(($, i2) => $ === b2[i2]) && a2.length === b2.length;
  }
  var Bisection = class {
    constructor(equation, ranges) {
      this.equation = equation;
      this.ranges = ranges;
      this.a = [];
      this.b = [];
      this.precision = 10;
    }
    randomPoint() {
      return this.ranges.map(randomValue);
    }
    randomSignedPoint(sign) {
      for (let i2 = 0; i2 < 100; i2++) {
        const point = this.randomPoint();
        const value = this.equation(...point);
        const sameSign = value * sign > 0;
        if (sameSign)
          return point;
      }
      console.error("[bisection] No signed point in ranges: " + JSON.stringify(this.ranges));
      throw "";
    }
    intialize() {
      this.a = this.randomSignedPoint(1);
      this.b = this.randomSignedPoint(-1);
    }
    iterate() {
      const m3 = mid(this.a, this.b);
      const M2 = this.equation(...m3);
      if (!Number.isFinite(M2)) {
        console.error("[bisection] The function value is not a finite number!");
        throw "";
      }
      if (M2 >= 0)
        this.a = m3;
      if (M2 <= 0)
        this.b = m3;
    }
    done() {
      const precision_a = this.a.map(($) => $.toPrecision(this.precision));
      const precision_b = this.b.map(($) => $.toPrecision(this.precision));
      return equal(precision_a, precision_b);
    }
    assertRange() {
      const pass2 = this.ranges.some(([min, max]) => max > min);
      if (!pass2) {
        console.error("[bisection] all variables are locked already");
        throw "";
      }
    }
    run() {
      this.assertRange();
      this.intialize();
      for (let i2 = 0; i2 < 100; i2++) {
        this.iterate();
        if (this.done())
          return [...this.a];
      }
      console.error("[bisection] fail to find tolarable solution after 100 iteration");
      throw "";
    }
    exec() {
      try {
        return this.run();
      } catch {
        throw "[bisection] An error occur during bisection.";
      }
    }
  };

  // ../packages/gauss/lib/src/EquationFitter/Bisection/index.js
  function toObject(keys, vals) {
    const obj = {};
    for (let i2 = 0; i2 < keys.length; i2++) {
      obj[keys[i2]] = vals[i2];
    }
    return obj;
  }
  function narrowRange(ranges, preset) {
    const rngs = { ...ranges };
    for (let k2 in preset) {
      const val2 = preset[k2];
      if (k2 in rngs && Number.isFinite(val2))
        rngs[k2] = [val2, val2];
    }
    return rngs;
  }
  function bisect(f3, ranges, preset) {
    const vars = getVars(f3);
    const narrowedRngs = narrowRange(ranges, preset);
    const bounds = vars.map(($) => narrowedRngs[$]);
    const bi = new Bisection(f3, bounds);
    const sol = bi.exec();
    return toObject(vars, sol);
  }

  // ../packages/gauss/lib/src/EquationFitter/searcher.js
  var Searcher = class {
    constructor(fs, givens = []) {
      this.fs = fs;
      this.givens = givens;
      this.founds = /* @__PURE__ */ new Set();
    }
    reset() {
      this.founds = new Set(this.givens);
    }
    isFull(f3) {
      return getVars(f3).every(($) => this.founds.has($));
    }
    fit(f3) {
      getVars(f3).forEach(($) => this.founds.add($));
    }
    isFittableOrder(fs) {
      this.reset();
      for (let f3 of fs) {
        if (this.isFull(f3))
          return false;
        this.fit(f3);
      }
      return true;
    }
    getFittableOrder() {
      for (let fs of permute(this.fs)) {
        if (this.isFittableOrder(fs))
          return fs;
      }
      return void 0;
    }
  };
  function getFittableOrder(fs, preset) {
    const givens = [];
    for (let k2 in preset) {
      let v3 = preset[k2];
      if (Number.isFinite(v3))
        givens.push(k2);
    }
    const sr = new Searcher(fs, givens);
    return sr.getFittableOrder();
  }

  // ../packages/gauss/lib/src/EquationFitter/fitter.js
  var Fitter = class {
    constructor(fs, ranges, preset) {
      this.fs = fs;
      this.ranges = ranges;
      this.preset = preset;
      this.vals = {};
      this.allVariables = getAllVars(fs);
      this.reset();
    }
    reset() {
      this.vals = {};
      this.allVariables.forEach(($) => this.vals[$] = NaN);
      this.setVals(this.preset);
    }
    setVals(vals) {
      this.vals = { ...this.vals, ...vals };
    }
    fitOne(f3) {
      const sol = bisect(f3, this.ranges, this.vals);
      this.setVals(sol);
    }
    fit() {
      const orderedFS = getFittableOrder(this.fs, this.preset);
      if (orderedFS === void 0)
        throw "There is no fittable order for this system.";
      for (let i2 = 0; i2 < 10; i2++) {
        try {
          this.reset();
          orderedFS.forEach(($) => this.fitOne($));
          return this.vals;
        } catch {
        }
      }
      throw "The system is not fittable in given range.";
    }
  };

  // ../packages/gauss/lib/src/EquationFitter/index.js
  function fit(fs, ranges, preset) {
    let fitter = new Fitter(fs, ranges, preset);
    return fitter.fit();
  }

  // ../packages/gauss/lib/src/EquationAnalyzer/analyze.js
  var Vabe = class {
    constructor(symbol) {
      this.symbol = symbol;
      this.order = NaN;
    }
    reset() {
      this.order = NaN;
    }
    setZero() {
      this.order = 0;
    }
    solve(order) {
      this.order = order;
    }
    solved() {
      return Number.isFinite(this.order);
    }
  };
  var Eqube = class {
    constructor(vabes) {
      this.vabes = vabes;
    }
    unsolvedVabes() {
      return this.vabes.filter(($) => !$.solved());
    }
    solved() {
      return this.unsolvedVabes().length === 0;
    }
    solvable() {
      return this.unsolvedVabes().length === 1;
    }
    orders() {
      return this.vabes.map(($) => $.order);
    }
    realOrders() {
      return this.orders().filter(($) => Number.isFinite($));
    }
    maxOrder() {
      const orders = this.realOrders();
      if (orders.length === 0)
        return -1;
      return Math.max(...orders);
    }
    nextOrder() {
      return this.maxOrder() + 1;
    }
    forceSolve() {
      let nextOrder = this.nextOrder();
      for (let v3 of this.unsolvedVabes()) {
        v3.solve(nextOrder);
      }
    }
    trySolve() {
      if (this.solvable()) {
        this.forceSolve();
        return true;
      } else {
        return false;
      }
    }
  };
  var PresetAnalyzer = class {
    constructor(vabes, equbes, preset) {
      this.vabes = vabes;
      this.equbes = equbes;
      this.preset = preset;
    }
    reset() {
      for (let v3 of this.vabes) {
        const isPreset = this.preset.includes(v3);
        isPreset ? v3.setZero() : v3.reset();
      }
    }
    trySolveNext() {
      for (let eq2 of this.equbes) {
        const t2 = eq2.trySolve();
        if (t2 === true)
          return true;
      }
      return false;
    }
    exportOrder() {
      const orders = {};
      for (let v3 of this.vabes) {
        orders[v3.symbol] = v3.order;
      }
      return orders;
    }
    getTree() {
      this.reset();
      for (let i2 = 0; i2 <= this.equbes.length; i2++) {
        const t2 = this.trySolveNext();
        if (!t2)
          break;
      }
      return this.exportOrder();
    }
  };
  var Analyzer = class {
    constructor(vabes, equbes) {
      this.vabes = vabes;
      this.equbes = equbes;
    }
    allVabeCombinations() {
      const n2 = this.vabes.length - this.equbes.length;
      return combinations(this.vabes, n2);
    }
    getTrees() {
      const combs = this.allVabeCombinations();
      const ts = [];
      for (let c3 of combs) {
        const ana = new PresetAnalyzer(this.vabes, this.equbes, c3);
        ts.push(ana.getTree());
      }
      return ts;
    }
    isHealthy(tree) {
      const orders = Object.values(tree);
      return orders.every(($) => Number.isFinite($));
    }
    getHealthyTrees() {
      return this.getTrees().filter(($) => this.isHealthy($));
    }
  };
  function analyze(fs) {
    const symbols = getAllVars(fs);
    const vabes = symbols.map(($) => new Vabe($));
    const equbes = [];
    for (let f3 of fs) {
      let syms = getVars(f3);
      const vs = syms.map(($) => vabes.find((_) => _.symbol === $));
      let eq2 = new Eqube(vs);
      equbes.push(eq2);
    }
    let analyzer = new Analyzer(vabes, equbes);
    return analyzer.getHealthyTrees();
  }

  // ../packages/gauss/lib/src/EquationAnalyzer/reader.js
  var TreeReader = class {
    constructor(tree) {
      this.tree = tree;
      this.symbols = Object.keys(tree);
      this.orders = Object.values(this.tree);
      this.realOrders = this.orders.filter(($) => Number.isFinite($));
      this.maxOrder = Math.max(...this.realOrders);
    }
    symbolsWithOrder(order) {
      return this.symbols.filter(($) => this.tree[$] === order);
    }
    givenSymbols() {
      return this.symbolsWithOrder(0);
    }
    topSymbols() {
      return this.symbolsWithOrder(this.maxOrder);
    }
    stepSymbols() {
      const arr = [];
      for (let i2 = 1; i2 < this.maxOrder; i2++) {
        arr.push(...this.symbolsWithOrder(i2));
      }
      return arr;
    }
    solvedSymbols() {
      return [...this.stepSymbols(), ...this.topSymbols()];
    }
  };
  var EquationReader = class {
    constructor(f3, tree) {
      this.f = f3;
      this.tree = tree;
      this.myTree = {};
      this.symbols = getVars(f3);
      for (let k2 in tree) {
        if (this.symbols.includes(k2))
          this.myTree[k2] = tree[k2];
      }
      this.reader = new TreeReader(this.myTree);
    }
    isActiveSolve() {
      const m3 = this.maxOrder();
      return m3 !== 0 && this.symbolsWithOrder(m3).length === 1;
    }
    maxOrder() {
      return this.reader.maxOrder;
    }
    symbolsWithOrder(order) {
      return this.symbols.filter(($) => this.tree[$] === order);
    }
    solvingSymbol() {
      if (!this.isActiveSolve())
        return void 0;
      return this.reader.topSymbols()[0];
    }
    givenSymbols() {
      return this.reader.givenSymbols();
    }
    stepSymbols() {
      return this.reader.stepSymbols();
    }
  };
  var Tracer = class {
    constructor(tree, eqReaders) {
      this.tree = tree;
      this.eqReaders = eqReaders;
      this.symbols = Object.keys(this.tree);
    }
    revealer(symbol) {
      for (let eq2 of this.eqReaders) {
        if (eq2.solvingSymbol() === symbol)
          return eq2;
      }
      return void 0;
    }
    prerequisites(symbol) {
      return this.revealer(symbol)?.stepSymbols() ?? [];
    }
    flowForOne(symbol) {
      const order = this.tree[symbol];
      if (order === 0)
        return [];
      if (order === 1)
        return [this.revealer(symbol)];
      let eqs = [];
      for (let s3 of this.prerequisites(symbol)) {
        eqs.push(...this.flowForOne(s3));
      }
      eqs.push(this.revealer(symbol));
      return [...new Set(eqs)];
    }
    flow(unknowns) {
      let eqs = [];
      for (let u2 of unknowns) {
        eqs.push(...this.flowForOne(u2));
      }
      return [...new Set(eqs)];
    }
  };
  function solutionFlow(fs, tree, unknownSymbols) {
    const eqReaders = fs.map(($) => new EquationReader($, tree));
    const tracer = new Tracer(tree, eqReaders);
    let flow = tracer.flow(unknownSymbols);
    return flow.map(($) => $.f);
  }
  function solvingSymbol(f3, tree) {
    const eqReader = new EquationReader(f3, tree);
    return eqReader.solvingSymbol();
  }
  function readTree(tree) {
    const reader = new TreeReader(tree);
    return {
      maxOrder: reader.maxOrder,
      givens: reader.givenSymbols(),
      tops: reader.topSymbols(),
      steps: reader.stepSymbols(),
      solved: reader.solvedSymbols()
    };
  }

  // src/Math/Builder/support/system.ts
  var EquSystem = class {
    constructor(variables, equations) {
      this.variables = variables;
      this.equations = equations;
      this.fs = equations.map(($) => $.zeroFunc);
    }
    fs;
    tree = {};
    fit() {
      let vals = fit(this.fs, this.variables.rangeObj(), this.variables.valObj());
      this.variables.setVal(vals);
    }
    fitAgain(vars) {
      vars.forEach(($) => $.clear());
      vars.forEach(($) => $.widen());
      this.fit();
    }
    getVariables(symbols) {
      const vars = symbols.map(($) => this.variables.find((_) => _.sym === $));
      return new Variables(...vars);
    }
    getFullTree(avoids = []) {
      let trees = RndShuffle(...analyze(this.fs));
      for (let tree of trees) {
        let info = readTree(tree);
        for (let top of RndShuffle(...info.tops)) {
          let flow = solutionFlow(this.fs, tree, [top]);
          if (flow.length === this.fs.length && this.checkAvoids(info.givens, top, avoids)) {
            this.tree = tree;
            return {
              tree,
              top: this.getVariables([top])[0],
              info
            };
          }
        }
      }
      throw "no sensible set of solvables found!";
    }
    checkAvoid(givens, unknown, avoid) {
      let allAreGivensOrUnknown = avoid.every(($) => givens.includes($) || unknown === $);
      let containUnknown = avoid.includes(unknown);
      let immediatelySolved = allAreGivensOrUnknown && containUnknown;
      return !immediatelySolved;
    }
    checkAvoids(givens, unknown, avoids) {
      return avoids.every(($) => this.checkAvoid(givens, unknown, $));
    }
    generateSolvables(avoids = []) {
      let { tree, top, info } = this.getFullTree(avoids);
      return [
        this.getVariables(info.givens),
        this.getVariables(info.solved),
        top
      ];
    }
    solInSteps(unknown) {
      let fs = solutionFlow(this.fs, this.tree, [unknown.sym]);
      let eqs = fs.map(($) => this.equations.find((_) => _.zeroFunc === $));
      let info = readTree(this.tree);
      let givens = info.givens.map(($) => this.variables.find((_) => _.sym === $));
      let T2 = "";
      for (let eq2 of eqs) {
        let solved = solvingSymbol(eq2.zeroFunc, this.tree);
        let solvedVar = this.variables.find(($) => $.sym === solved);
        T2 += latexAligned([eq2.print(), eq2.print(givens), solvedVar.full()]);
        T2 += " \\\\~\\\\ ";
        givens.push(solvedVar);
      }
      return T2;
    }
    generateTrend() {
      let { tree, top, info } = this.getFullTree();
      let [agent, ...constants] = RndShuffle(...this.getVariables(info.givens));
      let responses = [...this.getVariables(info.solved)];
      responses = RndShuffle(...responses);
      let target = top;
      this.variables.clear();
      this.fit();
      let oldVal = this.variables.getVals();
      agent.shake();
      this.fitAgain(responses);
      this.variables.compareWith(oldVal);
      return [constants, agent, responses, target];
    }
    print(givens = []) {
      let eqs = this.equations.map(($) => $.dep.write($.latex, givens));
      return eqs.length === 1 ? eqs[0] : latexBraced(eqs);
    }
  };

  // src/Math/Builder/support/support.ts
  function getSignature(func) {
    const fnStr = func.toString();
    return fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).replaceAll(" ", "").split(",");
  }
  function findVarBySym(sym, vars) {
    let v3 = vars.find((v4) => v4.sym === sym);
    if (v3 === void 0)
      throw "Fail to find variable: " + sym;
    return v3;
  }
  function getDeps(func, vars) {
    let dep = getSignature(func);
    let vs = dep.map(($) => findVarBySym($, vars));
    return new Variables(...vs);
  }
  function toVariable(variable) {
    let [sym, name, range2, unit, display] = variable;
    return new Variable(sym, name, range2, unit, display);
  }
  function toVariables(vars) {
    let vs = vars.map(($) => toVariable($));
    return new Variables(...vs);
  }
  function toEquation(eq2, vars) {
    let [func, latex] = eq2;
    return new Equation(func, latex, getDeps(func, vars));
  }
  function toEquations(eqs, vars) {
    return eqs.map(($) => toEquation($, vars));
  }
  function toEquSystem(variables, equations) {
    let vars = toVariables(variables);
    let eqs = toEquations(equations, vars);
    return new EquSystem(vars, eqs);
  }

  // src/Math/Builder/build_solve.ts
  function BuildSolve(variables, equations, {
    listSym = false,
    avoids = [],
    sigfig: sigfig2 = {},
    solFormat = "series"
  } = {}) {
    for (let i2 = 0; i2 <= 10; i2++) {
      try {
        return BuildSolveOnce(variables, equations, { listSym, avoids, sigfig: sigfig2, solFormat });
      } catch (e6) {
        if (i2 === 10) {
          throw e6;
        } else {
          continue;
        }
      }
    }
    throw "never";
  }
  function BuildSolveOnce(variables, equations, {
    listSym = false,
    avoids = [],
    sigfig: sigfig2 = {},
    solFormat = "series"
  } = {}) {
    let system = toEquSystem(variables, equations);
    system.fit();
    let [givens, hiddens, unknown] = system.generateSolvables(avoids);
    givens.forEach(($) => $.round(sigfig2[$.sym]));
    system.fitAgain(hiddens);
    function sol() {
      if (equations.length === 1) {
        let eq2 = system.equations[0];
        return latexAligned([
          eq2.print(),
          eq2.print(givens),
          unknown.full()
        ]);
      } else {
        if (solFormat === "series") {
          return system.solInSteps(unknown);
        } else {
          let T2 = "";
          T2 += system.print() + " \\\\~\\\\ ";
          T2 += system.print(givens) + " \\\\~\\\\ ";
          T2 += latexBraced(hiddens.map(($) => $.full()));
          return T2;
        }
      }
    }
    return {
      list: givens.map(($) => listSym ? $.rich() : $.whole()).join("\\\\"),
      sol: sol(),
      vars: system.variables.map((v3) => givens.includes(v3) ? v3.long() : v3.symbol()),
      vals: system.variables.map(($) => $.getVal()),
      unknown: [
        unknown.symbol(),
        unknown.name,
        unknown.getVal(),
        unknown.unit
      ],
      ans: { val: unknown.getVal(), unit: unknown.unit }
    };
  }

  // src/Math/Builder/build_trend.ts
  function BuildTrend(variables, equations, settings = {}) {
    let system = toEquSystem(variables, equations);
    let [constants, agent, responses, target] = system.generateTrend();
    function toWord(change) {
      let trendWords = settings.trends ?? ["increases", "decreases", "is unchanged"];
      if (change > 0)
        return trendWords[0];
      if (change === 0)
        return trendWords[2];
      if (change < 0)
        return trendWords[1];
      return "[error]";
    }
    function toCode2(change) {
      if (change > 0)
        return 0;
      if (change === 0)
        return 2;
      if (change < 0)
        return 1;
      return 3;
    }
    return {
      consts: [
        constants.map((v3) => v3.symbol()),
        constants.map((v3) => v3.name)
      ],
      agent: [
        agent.symbol(),
        agent.name,
        toWord(agent.getVal()),
        toCode2(agent.getVal())
      ],
      responses: responses.map((v3) => [
        v3.symbol(),
        v3.name,
        toWord(v3.getVal()),
        toCode2(v3.getVal())
      ]),
      target: [
        target.symbol(),
        target.name,
        toWord(target.getVal()),
        toCode2(target.getVal())
      ],
      sol: system.print()
    };
  }

  // src/Math/Builder/build_ratio.ts
  function BuildRatio(variables, func, latex, {
    cases = ["Before", "After"],
    subscript = [1, 2],
    sigfig: sigfig2 = {}
  } = {}) {
    let system = toEquSystem(variables, [[func, latex]]);
    let vars = system.variables;
    let [given, unknown, ...constants] = RndShuffle(...vars);
    let g2 = [];
    let u2 = [];
    system.fit();
    given.round(sigfig2[given.sym]);
    unknown.round(sigfig2[unknown.sym]);
    g2.push(given.getVal());
    u2.push(unknown.getVal());
    system.fitAgain(constants);
    for (let i2 = 0; i2 < 10; i2++) {
      system.fitAgain([given, unknown]);
      given.round(sigfig2[given.sym]);
      if (given.getVal() !== g2[0])
        break;
    }
    system.fitAgain([unknown]);
    g2.push(given.getVal());
    u2.push(unknown.getVal());
    function setSubscript(order) {
      if (order === 0) {
        given.label();
        unknown.label();
      }
      let subs = subscript;
      given.label(subs[order - 1]);
      unknown.label(subs[order - 1]);
    }
    function setVal(order) {
      if (order === 0)
        return;
      given.set(g2[order - 1]);
      unknown.set(u2[order - 1]);
    }
    function setCase(order) {
      setSubscript(order);
      setVal(order);
    }
    function printRatioFraction(case1Show = [], case2Show = []) {
      setCase(2);
      let [lhs2, rhs2] = system.print(case2Show).split("=");
      setCase(1);
      let [lhs1, rhs1] = system.print(case1Show).split("=");
      return `\\dfrac{${lhs1}}{${lhs2}}=\\dfrac{${rhs1}}{${rhs2}}`;
    }
    function printAns() {
      setCase(2);
      return unknown.full();
    }
    function sol() {
      return latexAligned([
        printRatioFraction(),
        printRatioFraction([given, unknown], [given]),
        printAns()
      ]);
    }
    function table() {
      setCase(1);
      let G1 = "$" + given.long();
      let U1 = "$" + unknown.long();
      setCase(2);
      let G2 = "$" + given.long();
      let U2 = "$" + unknown.symbol();
      let [case1, case2] = cases;
      setCase(0);
      return Table({
        content: [
          ["", "$" + given.symbol(), "$" + unknown.symbol()],
          [case1, G1, U1],
          [case2, G2, U2]
        ],
        columns: "c|c:c",
        rows: "r|r:r"
      });
    }
    function getUnknown() {
      setCase(2);
      return [unknown.symbol(), unknown.name, unknown.getVal(), unknown.unit];
    }
    function getAns() {
      setCase(2);
      return { val: unknown.getVal(), unit: unknown.unit };
    }
    return {
      table: table(),
      sol: sol(),
      consts: [
        constants.map((v3) => v3.symbol()),
        constants.map((v3) => v3.name)
      ],
      given: [
        given.symbol(),
        given.name
      ],
      unknown: getUnknown(),
      ans: getAns()
    };
  }

  // src/Math/Builder/build_solve2.ts
  function BuildSolve2(variables, equations, {
    listSym = false,
    avoids = [],
    sigfig: sigfig2 = {}
  } = {}) {
    for (let i2 = 0; i2 <= 10; i2++) {
      try {
        return BuildSolveOnce2(variables, equations, { listSym, avoids, sigfig: sigfig2 });
      } catch (e6) {
        if (i2 === 10) {
          throw e6;
        } else {
          continue;
        }
      }
    }
    throw "never";
  }
  function BuildSolveOnce2(variables, equations, {
    listSym = false,
    avoids = [],
    sigfig: sigfig2 = {}
  } = {}) {
    let system = toEquSystem(variables, equations);
    system.fit();
    let [givens, hiddens, unknown] = system.generateSolvables(avoids);
    givens.forEach(($) => $.round(sigfig2[$.sym]));
    system.fitAgain(hiddens);
    function sol() {
      if (equations.length === 1) {
        let eq2 = system.equations[0];
        return latexAligned([
          eq2.print(),
          eq2.print(givens),
          unknown.full()
        ]);
      } else {
        return system.solInSteps(unknown);
      }
    }
    return {
      list: givens.map(($) => listSym ? $.rich() : $.whole()).join("\\\\"),
      sol: sol(),
      vars: system.variables.map((v3) => givens.includes(v3) ? v3.long() : v3.symbol()),
      vals: system.variables.map(($) => $.getVal()),
      unknown: [
        unknown.symbol(),
        unknown.name,
        unknown.getVal(),
        unknown.unit
      ],
      ans: { val: unknown.getVal(), unit: unknown.unit }
    };
  }

  // src/Math/Builder/index.ts
  globalThis.BuildSolve = BuildSolve;
  globalThis.BuildTrend = BuildTrend;
  globalThis.BuildRatio = BuildRatio;
  globalThis.BuildSolve2 = BuildSolve2;

  // ../packages/paint/lib/support/trim.js
  function getAlpha(img, x2, y2) {
    let i2 = 0;
    i2 += y2 * img.width;
    i2 += x2;
    return img.data[4 * i2 + 3];
  }
  function isPainted(img, x2, y2) {
    return getAlpha(img, x2, y2) !== 0;
  }
  function rowBlank(img, y2) {
    for (let x2 = 0; x2 < img.width; x2++) {
      if (isPainted(img, x2, y2))
        return false;
    }
    return true;
  }
  function colBlank(img, x2) {
    for (let y2 = 0; y2 < img.height; y2++) {
      if (isPainted(img, x2, y2))
        return false;
    }
    return true;
  }
  function trimCanvasX(canvas) {
    let ctx = canvas.getContext("2d");
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let top = 0;
    let bottom = img.height - 1;
    while (top < bottom && rowBlank(img, top))
      top++;
    while (bottom > top && rowBlank(img, bottom))
      bottom--;
    let trimmed = ctx.getImageData(0, top, img.width, bottom - top + 1);
    canvas.width = trimmed.width;
    canvas.height = trimmed.height;
    ctx.putImageData(trimmed, 0, 0);
  }
  function trimCanvasY(canvas) {
    let ctx = canvas.getContext("2d");
    let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let left2 = 0;
    let right = img.width - 1;
    while (left2 < right && colBlank(img, left2))
      left2++;
    while (right > left2 && colBlank(img, right))
      right--;
    let trimmed = ctx.getImageData(left2, 0, right - left2 + 1, img.height);
    canvas.width = trimmed.width;
    canvas.height = trimmed.height;
    ctx.putImageData(trimmed, 0, 0);
  }
  function trimCanvas(canvas) {
    trimCanvasX(canvas);
    trimCanvasY(canvas);
  }

  // ../packages/paint/lib/canvas/canvas00.js
  var QUALITY = 3;
  var INCH_SCALE = 10;
  var REM_PIXEL = parseFloat(getComputedStyle(document.documentElement).fontSize);
  function inchToPx(inch) {
    return inch * INCH_SCALE * REM_PIXEL;
  }
  function pxToInch(px) {
    return px / INCH_SCALE / REM_PIXEL;
  }
  var Canvas00 = class {
    constructor() {
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.imgStore = null;
      this.backgroundURL = "";
    }
    reset() {
      this.ctx.scale(QUALITY, QUALITY);
      this.ctx.font = "normal 10px Times New Roman";
    }
    get width() {
      return this.canvas.width / QUALITY;
    }
    set width(value) {
      this.canvas.width = value * QUALITY;
      this.reset();
    }
    get height() {
      return this.canvas.height / QUALITY;
    }
    set height(value) {
      this.canvas.height = value * QUALITY;
      this.reset();
    }
    get widthInch() {
      return pxToInch(this.width);
    }
    set widthInch(value) {
      this.width = inchToPx(value);
    }
    get heightInch() {
      return pxToInch(this.height);
    }
    set heightInch(value) {
      this.height = inchToPx(value);
    }
    saveImg() {
      const w2 = this.canvas.width;
      const h2 = this.canvas.height;
      this.imgStore = this.ctx.getImageData(0, 0, w2, h2);
    }
    restoreImg() {
      if (this.imgStore !== null)
        this.ctx.putImageData(this.imgStore, 0, 0);
    }
    clearImg() {
      const w2 = this.canvas.width;
      const h2 = this.canvas.height;
      this.ctx.clearRect(0, 0, w2, h2);
    }
    export(html, placeholder, trim) {
      let cv = cloneCanvas(this.canvas);
      if (trim)
        trimCanvas(cv);
      const displayWidth = Math.floor(cv.width / QUALITY);
      const displayHeight = Math.floor(cv.height / QUALITY);
      const src = `src="${cv.toDataURL()}"`;
      const width = ` width="${displayWidth}"`;
      const height = ` height="${displayHeight}"`;
      const bg = this.backgroundURL.length === 0 ? "" : ` style="background-image:url('${this.backgroundURL}');background-size:100% 100%;" `;
      return html.replace('src="' + placeholder + '"', src + width + height + bg);
    }
  };
  function cloneCanvas(canvas) {
    let oldCanvas = canvas;
    let newCanvas = document.createElement("canvas");
    let context2 = newCanvas.getContext("2d");
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    context2.drawImage(oldCanvas, 0, 0);
    return newCanvas;
  }

  // ../packages/paint/lib/canvas/canvas01.js
  function toPixelX(xmin, xmax, width, xCoord) {
    return (xCoord - xmin) / (xmax - xmin) * width;
  }
  function toPixelY(ymin, ymax, height, yCoord) {
    return height - (yCoord - ymin) / (ymax - ymin) * height;
  }
  function sin2(degree) {
    return Math.sin(degree / 180 * Math.PI);
  }
  function cos2(degree) {
    return Math.cos(degree / 180 * Math.PI);
  }
  function tan2(degree) {
    return Math.tan(degree / 180 * Math.PI);
  }
  var Canvas01 = class extends Canvas00 {
    constructor() {
      super(...arguments);
      this.xmin = 0;
      this.xmax = 0;
      this.ymin = 0;
      this.ymax = 0;
    }
    dx() {
      return this.xmax - this.xmin;
    }
    dy() {
      return this.ymax - this.ymin;
    }
    yxRatio() {
      return this.dy() / this.dx();
    }
    center() {
      let x2 = (this.xmin + this.xmax) / 2;
      let y2 = (this.ymin + this.ymax) / 2;
      return [x2, y2];
    }
    edgeTop(x2 = 0) {
      return [x2, this.ymax];
    }
    edgeBottom(x2 = 0) {
      return [x2, this.ymin];
    }
    edgeLeft(y2 = 0) {
      return [this.xmin, y2];
    }
    edgeRight(y2 = 0) {
      return [this.xmax, y2];
    }
    origin() {
      return [0, 0];
    }
    isXVisible([x2, y2], buffer = 0) {
      let X2 = this.dx() * buffer;
      return this.xmin - X2 <= x2 && x2 <= this.xmax + X2;
    }
    isYVisible([x2, y2], buffer = 0) {
      let Y2 = this.dy() * buffer;
      return this.ymin - Y2 <= y2 && y2 <= this.ymax + Y2;
    }
    isVisible(point, buffer = 0) {
      return this.isXVisible(point, buffer) && this.isYVisible(point, buffer);
    }
    toTopEdge([x2, y2], dir3) {
      let Dy = this.ymax - y2;
      let Dx = Dy / tan2(dir3);
      return [x2 + Dx, this.ymax];
    }
    toBottomEdge([x2, y2], dir3) {
      let Dy = this.ymin - y2;
      let Dx = Dy / tan2(dir3);
      return [x2 + Dx, this.ymin];
    }
    toRightEdge([x2, y2], dir3) {
      let Dx = this.xmax - x2;
      let Dy = Dx * tan2(dir3);
      return [this.xmax, y2 + Dy];
    }
    toLeftEdge([x2, y2], dir3) {
      let Dx = this.xmin - x2;
      let Dy = Dx * tan2(dir3);
      return [this.xmin, y2 + Dy];
    }
    edgePoint(anchor, dir3) {
      if (!this.isVisible(anchor))
        return anchor;
      let [x2, y2] = anchor;
      let arr = [
        this.toTopEdge(anchor, dir3),
        this.toBottomEdge(anchor, dir3),
        this.toRightEdge(anchor, dir3),
        this.toLeftEdge(anchor, dir3)
      ];
      arr = arr.filter(($) => this.isVisible($)).filter(([X2, Y2]) => (X2 - x2) * cos2(dir3) >= 0).filter(([X2, Y2]) => (Y2 - y2) * sin2(dir3) >= 0);
      if (arr.length !== 1)
        console.error("edgePoint not unique! from:" + anchor + " to:" + arr);
      return arr[0];
    }
    capturePoints2D(pts) {
      if (pts.length === 0)
        return;
      let [first, ...rest] = pts;
      let xmin = first[0];
      let xmax = first[0];
      let ymin = first[1];
      let ymax = first[1];
      for (let [x2, y2] of rest) {
        if (x2 < xmin)
          xmin = x2;
        if (x2 > xmax)
          xmax = x2;
        if (y2 < ymin)
          ymin = y2;
        if (y2 > ymax)
          ymax = y2;
      }
      this.xmin = xmin;
      this.xmax = xmax;
      this.ymin = ymin;
      this.ymax = ymax;
    }
    fixCollapsedRange() {
      let { xmin, xmax, ymin, ymax } = this;
      let xSize = xmax - xmin;
      let ySize = ymax - ymin;
      if (xSize === 0 && ySize === 0) {
        xmax++;
        xmin--;
        ymax++;
        ymin--;
      }
      if (xSize === 0 && ySize !== 0) {
        xmax += ySize / 2;
        xmin -= ySize / 2;
      }
      if (xSize !== 0 && ySize === 0) {
        ymax += xSize / 2;
        ymin -= xSize / 2;
      }
      this.xmin = xmin;
      this.xmax = xmax;
      this.ymin = ymin;
      this.ymax = ymax;
    }
    addBorder(borderInch) {
      let borderXUnit = this.dx() / this.widthInch * borderInch;
      let borderYUnit = this.dy() / this.heightInch * borderInch;
      this.xmin -= borderXUnit;
      this.xmax += borderXUnit;
      this.ymin -= borderYUnit;
      this.ymax += borderYUnit;
      this.widthInch += 2 * borderInch;
      this.heightInch += 2 * borderInch;
    }
    point2DtoPx(point) {
      let [xCoord, yCoord] = point;
      let x2 = toPixelX(this.xmin, this.xmax, this.width, xCoord);
      let y2 = toPixelY(this.ymin, this.ymax, this.height, yCoord);
      return [x2, y2];
    }
  };

  // ../packages/paint/lib/support/capture.js
  function getCircleCorners(center, radius) {
    let [h2, k2] = center;
    let r3 = radius;
    return [
      [h2 + r3, k2 + r3],
      [h2 + r3, k2 - r3],
      [h2 - r3, k2 + r3],
      [h2 - r3, k2 - r3]
    ];
  }
  function getSphereCorners(center, radius) {
    let [a2, b2, c3] = center;
    let r3 = radius;
    return [
      [a2 + r3, b2 + r3, c3 + r3],
      [a2 + r3, b2 + r3, c3 - r3],
      [a2 + r3, b2 - r3, c3 + r3],
      [a2 + r3, b2 - r3, c3 - r3],
      [a2 - r3, b2 + r3, c3 + r3],
      [a2 - r3, b2 + r3, c3 - r3],
      [a2 - r3, b2 - r3, c3 + r3],
      [a2 - r3, b2 - r3, c3 - r3]
    ];
  }
  function isPoint2D(thing) {
    return Array.isArray(thing) && thing.length === 2 && typeof thing[0] === "number" && typeof thing[1] === "number";
  }
  function isPoint3D(thing) {
    return Array.isArray(thing) && thing.length === 3 && typeof thing[0] === "number" && typeof thing[1] === "number" && typeof thing[2] === "number";
  }
  function isCircle(thing) {
    return thing.length === 2 && isPoint2D(thing[0]) && typeof thing[1] === "number";
  }
  function isSphere(thing) {
    return thing.length === 2 && isPoint3D(thing[0]) && typeof thing[1] === "number";
  }
  function thingsToPoints(things) {
    let pts = [];
    for (let th of things) {
      if (isPoint2D(th)) {
        pts.push(th);
        continue;
      }
      if (isPoint3D(th)) {
        pts.push(th);
        continue;
      }
      if (isCircle(th)) {
        pts.push(...getCircleCorners(...th));
        continue;
      }
      if (isSphere(th)) {
        pts.push(...getSphereCorners(...th));
        continue;
      }
    }
    return pts;
  }

  // ../packages/paint/lib/canvas/canvas02.js
  function proj(point3D2, angle2, depth) {
    let a2 = angle2 * Math.PI / 180;
    let s3 = Math.sin(a2);
    let c3 = Math.cos(a2);
    let [x2, y2, z2] = point3D2;
    let x_new = x2 + depth * y2 * c3;
    let y_new = z2 + depth * y2 * s3;
    return [x_new, y_new];
  }
  function forceProj(point, angle2, depth) {
    return point.length === 3 ? proj(point, angle2, depth) : point;
  }
  var Canvas02 = class extends Canvas01 {
    constructor() {
      super(...arguments);
      this.Proj_3D_Angle = 60;
      this.Proj_3D_Depth = 0.5;
    }
    pj(point) {
      return forceProj(point, this.Proj_3D_Angle, this.Proj_3D_Depth);
    }
    pjs(points) {
      return points.map(($) => this.pj($));
    }
    toPx(point) {
      let pt = this.pj(point);
      return this.point2DtoPx(pt);
    }
    capture(things) {
      let pts = thingsToPoints(things);
      let pt2Ds = this.pjs(pts);
      this.capturePoints2D(pt2Ds);
    }
  };

  // ../packages/paint/lib/canvas/canvas03.js
  function segmentArray(seg) {
    if (Array.isArray(seg))
      return seg;
    if (typeof seg === "number")
      return [seg, seg];
    if (typeof seg === "boolean")
      return seg ? [5, 5] : [];
    return [];
  }
  var REM_PIXEL2 = parseFloat(getComputedStyle(document.documentElement).fontSize);
  var Canvas03 = class extends Canvas02 {
    constructor() {
      super(...arguments);
      this.AUTO_BORDER = false;
      this.RANGE_DONE = false;
      this.SIZE_DONE = false;
      this.$TEXT_DIR = 0;
      this.$TEXT_LATEX = false;
      this.$ANGLE_MODE = "normal";
      this.$LENGTH_UNIT = "";
      this.$BORDER = 0.2;
      this.$LINE_LABEL = "auto";
      this.$HALF_AXIS_X = false;
      this.$HALF_AXIS_Y = false;
      this._$LABEL_CENTER = this.center();
      this.states = [];
    }
    get $WEIGHT() {
      return this.ctx.lineWidth;
    }
    set $WEIGHT(value) {
      this.ctx.lineWidth = value;
    }
    get $COLOR() {
      let c3 = this.ctx.fillStyle;
      return typeof c3 === "string" ? c3 : "";
    }
    set $COLOR(value) {
      this.ctx.strokeStyle = value;
      this.ctx.fillStyle = value;
    }
    get $ALPHA() {
      return this.ctx.globalAlpha;
    }
    set $ALPHA(value) {
      this.ctx.globalAlpha = value;
    }
    get $DASH() {
      return this.ctx.getLineDash();
    }
    set $DASH(value) {
      let seg = segmentArray(value);
      this.ctx.setLineDash(seg);
    }
    get $TEXT_ALIGN() {
      return this.ctx.textAlign;
    }
    set $TEXT_ALIGN(value) {
      this.ctx.textAlign = value;
    }
    get $TEXT_BASELINE() {
      return this.ctx.textBaseline;
    }
    set $TEXT_BASELINE(value) {
      this.ctx.textBaseline = value;
    }
    get $TEXT_PIXEL() {
      let match3 = this.ctx.font.match(/(\d+)px/);
      if (match3 === null)
        return NaN;
      return Number.parseInt(match3[1]);
    }
    set $TEXT_PIXEL(value) {
      value = Math.round(value);
      this.ctx.font = this.ctx.font.replace(/\d+px/g, value + "px");
    }
    get $TEXT_SIZE() {
      return this.$TEXT_PIXEL / REM_PIXEL2;
    }
    set $TEXT_SIZE(value) {
      this.$TEXT_PIXEL = value * REM_PIXEL2;
    }
    get $TEXT_ITALIC() {
      return this.ctx.font.includes("italic");
    }
    set $TEXT_ITALIC(value) {
      this.ctx.font = this.ctx.font.replace("italic ", "");
      if (value)
        this.ctx.font = "italic " + this.ctx.font;
    }
    get $3D_ANGLE() {
      return this.Proj_3D_Angle;
    }
    set $3D_ANGLE(value) {
      this.Proj_3D_Angle = value;
    }
    get $3D_DEPTH() {
      return this.Proj_3D_Depth;
    }
    set $3D_DEPTH(value) {
      this.Proj_3D_Depth = value;
    }
    set $LABEL_CENTER(centers) {
      let empty = centers.length === 0;
      this._$LABEL_CENTER = empty ? this.center() : mid2(this.pjs(centers));
    }
    get $LABEL_CENTER() {
      return [this._$LABEL_CENTER];
    }
    save() {
      this.ctx.save();
      this.states.push({
        $3D_ANGLE: this.$3D_ANGLE,
        $3D_DEPTH: this.$3D_DEPTH,
        $TEXT_DIR: this.$TEXT_DIR,
        $TEXT_LATEX: this.$TEXT_LATEX,
        $LABEL_CENTER: this.$LABEL_CENTER,
        $ANGLE_MODE: this.$ANGLE_MODE,
        $LENGTH_UNIT: this.$LENGTH_UNIT,
        $BORDER: this.$BORDER,
        $LINE_LABEL: this.$LINE_LABEL,
        $HALF_AXIS_X: this.$HALF_AXIS_X,
        $HALF_AXIS_Y: this.$HALF_AXIS_Y
      });
    }
    restore() {
      this.ctx.restore();
      let state = this.states.pop();
      if (state === void 0)
        return;
      this.$3D_ANGLE = state.$3D_ANGLE;
      this.$3D_DEPTH = state.$3D_DEPTH;
      this.$TEXT_DIR = state.$TEXT_DIR;
      this.$TEXT_LATEX = state.$TEXT_LATEX;
      this.$LABEL_CENTER = state.$LABEL_CENTER;
      this.$ANGLE_MODE = state.$ANGLE_MODE;
      this.$LENGTH_UNIT = state.$LENGTH_UNIT;
      this.$BORDER = state.$BORDER;
      this.$LINE_LABEL = state.$LINE_LABEL;
      this.$HALF_AXIS_X = state.$HALF_AXIS_X;
      this.$HALF_AXIS_Y = state.$HALF_AXIS_Y;
    }
  };
  function mid2(Points) {
    if (Points.length === 0)
      return [0, 0];
    let X2 = 0;
    let Y2 = 0;
    for (let p3 of Points) {
      X2 += p3[0];
      Y2 += p3[1];
    }
    let n2 = Points.length;
    return [X2 / n2, Y2 / n2];
  }

  // ../packages/paint/lib/canvas/canvas04.js
  function rad(degree) {
    return degree * Math.PI / 180;
  }
  function deg(radian) {
    return radian / Math.PI * 180;
  }
  function dotVec([x1, y1], [x2, y2]) {
    return [x2 - x1, y2 - y1];
  }
  function dir(A2, B2) {
    let [dx, dy] = dotVec(A2, B2);
    let rad2 = -Math.atan2(dy, dx);
    return deg(rad2);
  }
  function scaleDot([x2, y2], ratio) {
    return [x2 * ratio, y2 * ratio];
  }
  function dist(A2, B2) {
    let [dx, dy] = dotVec(A2, B2);
    return (dx * dx + dy * dy) ** 0.5;
  }
  function addDot([x1, y1], [x2, y2]) {
    return [x1 + x2, y1 + y2];
  }
  function scaleDotTo(A2, length) {
    let oldLength = dist([0, 0], A2);
    let ratio = length / oldLength;
    return scaleDot(A2, ratio);
  }
  function moveDot(A2, B2, dist2) {
    let AB = dotVec(A2, B2);
    let d2 = scaleDotTo(AB, dist2);
    return addDot(A2, d2);
  }
  var Canvas04 = class extends Canvas03 {
    translateTo(pt) {
      let [x2, y2] = this.toPx(pt);
      this.ctx.translate(x2, y2);
    }
    rotate(degreePolar) {
      this.ctx.rotate(-rad(degreePolar));
    }
    rotateTo(start, end) {
      let [x1, y1] = this.toPx(start);
      let [x2, y2] = this.toPx(end);
      let dx = x2 - x1;
      let dy = y2 - y1;
      let q2 = Math.atan2(dy, dx);
      this.ctx.rotate(q2);
    }
    alignTo(start, end) {
      this.translateTo(end);
      this.rotateTo(start, end);
    }
    moveToPx([x2, y2]) {
      this.ctx.moveTo(x2, y2);
    }
    lineToPx([x2, y2]) {
      this.ctx.lineTo(x2, y2);
    }
    createPathPx(dots) {
      this.ctx.beginPath();
      if (dots.length === 0)
        return;
      let [first, ...rest] = dots;
      this.moveToPx(first);
      for (let d2 of rest) {
        this.lineToPx(d2);
      }
    }
    createShapePx(dots) {
      this.createPathPx(dots);
      this.ctx.closePath();
    }
    moveTo(pt) {
      let [x2, y2] = this.toPx(pt);
      this.ctx.moveTo(x2, y2);
    }
    lineTo(pt) {
      let [x2, y2] = this.toPx(pt);
      this.ctx.lineTo(x2, y2);
    }
    createPath(pts) {
      this.ctx.beginPath();
      if (pts.length === 0)
        return;
      let [first, ...rest] = pts;
      this.moveTo(first);
      for (let p3 of rest) {
        this.lineTo(p3);
      }
    }
    createShape(pts) {
      this.createPath(pts);
      this.ctx.closePath();
    }
    createArc(center, radius, angle2) {
      let [x2, y2] = this.toPx(center);
      let [q1, q2] = angle2;
      q1 = -rad(q1);
      q2 = -rad(q2);
      this.ctx.beginPath();
      this.ctx.arc(x2, y2, radius, q1, q2, true);
    }
    createArcByPoints(P2, O2, Q2, radius) {
      let p3 = this.toPx(P2);
      let o2 = this.toPx(O2);
      let q2 = this.toPx(Q2);
      let q1 = dir(o2, p3);
      let q22 = dir(o2, q2);
      this.createArc(O2, radius, [q1, q22]);
    }
    createRightAnglePath(P2, O2, Q2, size) {
      let p3 = this.toPx(P2);
      let o2 = this.toPx(O2);
      let q2 = this.toPx(Q2);
      let a2 = moveDot(o2, p3, size);
      let b2 = moveDot(o2, q2, size);
      let c3 = addDot(b2, dotVec(o2, a2));
      this.createPathPx([a2, c3, b2]);
    }
    doStroke() {
      this.ctx.stroke();
    }
    doSolid() {
      let dash = this.$DASH;
      this.$DASH = false;
      this.ctx.stroke();
      this.$DASH = dash;
    }
    doDash() {
      let dash = this.$DASH;
      this.$DASH = true;
      this.ctx.stroke();
      this.$DASH = dash;
    }
    doFill() {
      this.ctx.fill();
    }
    doShade() {
      const DEFAULT_SHADE_ALPHA = 0.1;
      let alpha = this.$ALPHA;
      this.$ALPHA = DEFAULT_SHADE_ALPHA;
      this.ctx.fill();
      this.$ALPHA = alpha;
    }
  };

  // ../packages/paint/lib/canvas/canvas05.js
  function sin3(degree) {
    return Math.sin(degree / 180 * Math.PI);
  }
  function cos3(degree) {
    return Math.cos(degree / 180 * Math.PI);
  }
  function LatexWidget(text, color, size) {
    text = `\\color{${color}} ` + text;
    const widget = new CanvasLatex.default(text, {
      displayMode: true,
      debugBounds: false,
      baseSize: size
    });
    return widget;
  }
  function latexTuneX(x2, width, textAlign) {
    if (textAlign === "left")
      return -x2;
    if (textAlign === "right")
      return -x2 - width;
    if (textAlign === "center")
      return -x2 - width / 2;
    return -x2 - width / 2;
  }
  function latexTuneY(y2, height, textBaseline) {
    if (textBaseline === "top")
      return -y2;
    if (textBaseline === "bottom")
      return -y2 - height;
    if (textBaseline === "middle")
      return -y2 - height / 2;
    return -y2 / 2;
  }
  function isAlphabet(_) {
    return _.length === 1 && _.toLowerCase() !== _.toUpperCase();
  }
  var Canvas05 = class extends Canvas04 {
    plainPx(text, dot) {
      text = String(text);
      if (text === "")
        return;
      this.save();
      this.ctx.translate(...dot);
      this.rotate(this.$TEXT_DIR);
      this.ctx.fillText(text, 0, 0);
      this.restore();
    }
    latexPx(text, dot) {
      text = String(text);
      if (text === "")
        return;
      const widget = LatexWidget(text, this.$COLOR, this.$TEXT_PIXEL);
      const bounds = widget.getBounds();
      if (bounds === null) {
        console.error("[CanvasLatex] bounds === null! This is an unexpected error.");
        return;
      }
      this.save();
      this.ctx.translate(...dot);
      this.rotate(this.$TEXT_DIR);
      let xTune = latexTuneX(bounds.x, bounds.width, this.ctx.textAlign);
      let yTune = latexTuneY(bounds.y, bounds.height, this.ctx.textBaseline);
      this.ctx.translate(xTune, yTune);
      widget.draw(this.ctx);
      this.restore();
    }
    textPx(text, dot) {
      if (this.$TEXT_LATEX) {
        this.latexPx(text, dot);
      } else {
        this.plainPx(text, dot);
      }
    }
    text(text, point, offset) {
      let [x2, y2] = this.toPx(point);
      x2 += offset[0];
      y2 -= offset[1];
      this.textPx(text, [x2, y2]);
    }
    write(text, point) {
      this.text(text, point, [0, 0]);
    }
    labelOffset(text, radius, dir3) {
      let textWidth = this.textSemi(text);
      let extraX = this.$TEXT_ALIGN === "center" ? textWidth - 4 : 0;
      let x2 = (radius + extraX) * cos3(dir3);
      let y2 = radius * sin3(dir3);
      return [x2, y2];
    }
    label(text, point, radius, dir3) {
      let italic = this.$TEXT_ITALIC;
      if (isAlphabet(text))
        this.$TEXT_ITALIC = true;
      let offset = this.labelOffset(text, radius, dir3);
      this.text(text, point, offset);
      this.$TEXT_ITALIC = italic;
    }
    plainSemi(text) {
      return this.ctx.measureText(text).width / 2;
    }
    latexSemi(text) {
      const widget = LatexWidget(text, this.$COLOR, this.$TEXT_PIXEL);
      const bounds = widget.getBounds();
      return bounds === null ? 0 : bounds.width / 2;
    }
    textSemi(text) {
      return this.$TEXT_LATEX ? this.latexSemi(text) : this.plainSemi(text);
    }
  };

  // ../packages/paint/lib/canvas/canvas06.js
  function deg2(radian) {
    return radian / Math.PI * 180;
  }
  function dotVec2([x1, y1], [x2, y2]) {
    return [x2 - x1, y2 - y1];
  }
  function dir2(A2, B2) {
    let [dx, dy] = dotVec2(A2, B2);
    let rad2 = -Math.atan2(dy, dx);
    return deg2(rad2);
  }
  function vec(p1, p22) {
    let [x1, y1] = p1;
    let [x2, y2] = p22;
    return [x2 - x1, y2 - y1];
  }
  function cross2D(vec1, vec22) {
    let [x1, y1] = vec1;
    let [x2, y2] = vec22;
    return x1 * y2 - y1 * x2;
  }
  function IsReflex2(A2, O2, B2) {
    let OA = vec(O2, A2);
    let OB = vec(O2, B2);
    return cross2D(OA, OB) < 0;
  }
  function polarFlip(A2, O2, B2, mode) {
    let isReflex = IsReflex2(A2, O2, B2);
    if (mode === "normal" && isReflex)
      return true;
    if (mode === "reflex" && !isReflex)
      return true;
    return false;
  }
  var Canvas06 = class extends Canvas05 {
    getDir(start, end) {
      let A2 = this.toPx(start);
      let B2 = this.toPx(end);
      return dir2(A2, B2);
    }
    getCenterDir(point) {
      let C2 = this.$LABEL_CENTER[0];
      return this.getDir(C2, point);
    }
    getDirAngle(A2, O2, B2) {
      let flip = this.polarFlip(A2, O2, B2);
      let [P2, Q2] = flip ? [B2, A2] : [A2, B2];
      let a2 = this.getDir(O2, P2);
      let b2 = this.getDir(O2, Q2);
      return a2 <= b2 ? b2 - a2 : 360 + b2 - a2;
    }
    getMidDir(A2, O2, B2) {
      let flip = this.polarFlip(A2, O2, B2);
      let [P2, Q2] = flip ? [B2, A2] : [A2, B2];
      let a1 = this.getDir(O2, P2);
      let a2 = this.getDir(O2, Q2);
      if (a2 < a1)
        a2 += 360;
      return (a1 + a2) / 2;
    }
    getLineDir(A2, B2) {
      let q2 = this.getDir(A2, B2);
      let mode = this.$LINE_LABEL;
      if (mode === "left")
        return q2 + 90;
      if (mode === "right")
        return q2 - 90;
      let [a2, b2, c3] = this.pjs([A2, B2, this.$LABEL_CENTER[0]]);
      let right = IsReflex2(a2, b2, c3);
      return right ? q2 - 90 : q2 + 90;
    }
    polarFlip(A2, O2, B2) {
      let [a2, o2, b2] = this.pjs([A2, O2, B2]);
      return polarFlip(a2, o2, b2, this.$ANGLE_MODE);
    }
    unitize(text) {
      if (typeof text === "number") {
        text = String(text);
        let unit = this.$LENGTH_UNIT;
        if (unit === "")
          return text;
        return this.$TEXT_LATEX ? text + `~\\text{${unit}}` : text + " " + unit;
      } else {
        return text;
      }
    }
    getAngleAllowance(A2, O2, B2, threshold, pixelPerDeg) {
      let angle2 = this.getDirAngle(A2, O2, B2);
      let angleUnderThreshold = Math.max(threshold - angle2, 0);
      return angleUnderThreshold * pixelPerDeg;
    }
  };

  // ../packages/paint/lib/canvas/canvas07.js
  function isOdd(n2) {
    return n2 % 2 !== 0;
  }
  function floorHalf(n2) {
    if (isOdd(n2))
      n2 = n2 - 1;
    return n2 / 2;
  }
  function steps(n2) {
    let N2 = floorHalf(n2);
    let arr = [];
    if (isOdd(n2)) {
      arr.push(0);
      for (let i2 = 1; i2 <= N2; i2++) {
        arr.push(i2);
        arr.push(-i2);
      }
    } else {
      for (let i2 = 1; i2 <= N2; i2++) {
        let s3 = i2 - 0.5;
        arr.push(s3);
        arr.push(-s3);
      }
    }
    return arr;
  }
  function mid3(A2, B2) {
    if (A2.length === 3 && B2.length === 3) {
      let [x2, y2, z2] = A2;
      let [X2, Y2, Z2] = B2;
      return [(x2 + X2) / 2, (y2 + Y2) / 2, (z2 + Z2) / 2];
    } else {
      let [x2, y2] = A2;
      let [X2, Y2] = B2;
      return [(x2 + X2) / 2, (y2 + Y2) / 2];
    }
  }
  var Canvas07 = class extends Canvas06 {
    linePx(dots) {
      this.createPathPx(dots);
      this.doStroke();
    }
    solidPx(dots) {
      this.createPathPx(dots);
      this.doSolid();
    }
    line(pts) {
      this.createPath(pts);
      this.doStroke();
    }
    lineVert(x2) {
      let A2 = this.edgeBottom(x2);
      let B2 = this.edgeTop(x2);
      this.line([A2, B2]);
    }
    lineHori(y2) {
      let A2 = this.edgeLeft(y2);
      let B2 = this.edgeRight(y2);
      this.line([A2, B2]);
    }
    rod(anchor, dir3) {
      let edge = this.edgePoint(anchor, dir3);
      this.line([anchor, edge]);
    }
    solid(pts) {
      this.createPath(pts);
      this.doSolid();
    }
    dash(pts) {
      this.createPath(pts);
      this.doDash();
    }
    shape(pts) {
      this.createShape(pts);
      this.doStroke();
    }
    fill(pts) {
      this.createShape(pts);
      this.doFill();
    }
    shade(pts) {
      this.createShape(pts);
      this.doShade();
    }
    arc(P2, O2, Q2, radius) {
      this.createArcByPoints(P2, O2, Q2, radius);
      this.doStroke();
    }
    solidArc(P2, O2, Q2, radius) {
      this.createArcByPoints(P2, O2, Q2, radius);
      this.doSolid();
    }
    circle(center, radius) {
      this.createArc(center, radius, [0, 360]);
      this.doStroke();
    }
    disc(center, radius) {
      this.createArc(center, radius, [0, 360]);
      this.doFill();
    }
    halo(center, radius) {
      this.createArc(center, radius, [0, 360]);
      this.doShade();
    }
    arrowHead(start, end, size, offset) {
      this.save();
      this.translateTo(end);
      this.rotateTo(start, end);
      let A2 = [offset - 2 * size, -size];
      let O2 = [offset, 0];
      let B2 = [offset - 2 * size, +size];
      this.solidPx([A2, O2, B2]);
      this.restore();
    }
    arrow(start, end, size) {
      this.line([start, end]);
      this.arrowHead(start, end, size, 0);
    }
    anglePolar(A2, O2, B2, radius, count, space) {
      for (let s3 of steps(count)) {
        let r3 = radius + s3 * space;
        this.solidArc(A2, O2, B2, r3);
      }
    }
    angle(A2, O2, B2, radius, count, space) {
      let flip = this.polarFlip(A2, O2, B2);
      let [P2, Q2] = flip ? [B2, A2] : [A2, B2];
      this.anglePolar(P2, O2, Q2, radius, count, space);
    }
    rightAngle(A2, O2, B2, size) {
      this.createRightAnglePath(A2, O2, B2, size);
      this.doSolid();
    }
    parallel(start, end, size, count, space) {
      let M2 = mid3(start, end);
      for (let i2 = 0; i2 < count; i2++) {
        this.arrowHead(start, M2, size, i2 * space);
      }
    }
    midArrowHead(start, end, size) {
      this.parallel(start, end, size, 1, 0);
    }
    tick(start, end, length, offset) {
      this.save();
      this.translateTo(end);
      this.rotateTo(start, end);
      let A2 = [offset, -length];
      let B2 = [offset, +length];
      this.solidPx([A2, B2]);
      this.restore();
    }
    tickVert(pt, length) {
      let [x2, y2] = pt;
      this.tick([x2 - 1, y2], pt, length, 0);
    }
    tickHori(pt, length) {
      let [x2, y2] = pt;
      this.tick([x2, y2 - 1], pt, length, 0);
    }
    equalSide(start, end, length, count, space) {
      let M2 = mid3(start, end);
      for (let s3 of steps(count)) {
        this.tick(start, M2, length, s3 * space);
      }
    }
    compass(center, xSize, ySize, arrowSize) {
      this.save();
      this.translateTo(center);
      let E2 = [xSize, 0];
      let W2 = [-xSize, 0];
      let S2 = [0, ySize];
      let N2 = [0, -ySize];
      let A2 = [-arrowSize, -ySize + arrowSize * 2];
      let B2 = [+arrowSize, -ySize + arrowSize * 2];
      this.solidPx([E2, W2]);
      this.solidPx([N2, S2]);
      this.solidPx([A2, N2, B2]);
      this.restore();
    }
  };

  // ../packages/paint/lib/canvas/canvas08.js
  var LABEL_OFFSET_PX = 20;
  var X_MARK_OFFSET_PX = 15;
  var Y_MARK_OFFSET_PX = 10;
  var TICK_LENGTH_PX = 5;
  function getTicks(min, max, interval2) {
    const start = Math.floor(min / interval2) * interval2;
    const arr = [];
    for (let i2 = start; i2 <= max; i2 += interval2) {
      i2 = parseFloat(i2.toPrecision(3));
      if (i2 === min)
        continue;
      if (i2 === max)
        continue;
      if (i2 === 0)
        continue;
      arr.push(i2);
    }
    return arr;
  }
  var Canvas08 = class extends Canvas07 {
    bottomEnd(x2) {
      return this.$HALF_AXIS_Y ? [x2, 0] : this.edgeBottom(x2);
    }
    leftEnd(y2) {
      return this.$HALF_AXIS_X ? [0, y2] : this.edgeLeft(y2);
    }
    xAxis() {
      let A2 = this.leftEnd(0);
      let B2 = this.edgeRight(0);
      this.arrow(A2, B2, 5);
    }
    yAxis() {
      let A2 = this.bottomEnd(0);
      let B2 = this.edgeTop(0);
      this.arrow(A2, B2, 5);
    }
    xAxisLabel(text) {
      this.save();
      this.$TEXT_ALIGN = "right";
      this.$TEXT_BASELINE = "middle";
      this.label(text, this.edgeRight(0), LABEL_OFFSET_PX, 120);
      this.restore();
    }
    yAxisLabel(text) {
      this.save();
      this.$TEXT_ALIGN = "left";
      this.$TEXT_BASELINE = "top";
      this.label(text, this.edgeTop(0), LABEL_OFFSET_PX, -30);
      this.restore();
    }
    xTicks(interval2) {
      let min = this.$HALF_AXIS_X ? Math.max(0, this.xmin) : this.xmin;
      return getTicks(min, this.xmax, interval2);
    }
    yTicks(interval2) {
      let min = this.$HALF_AXIS_Y ? Math.max(0, this.ymin) : this.ymin;
      return getTicks(min, this.ymax, interval2);
    }
    xAxisTick(interval2) {
      for (let x2 of this.xTicks(interval2)) {
        this.tickVert([x2, 0], TICK_LENGTH_PX);
      }
    }
    yAxisTick(interval2) {
      for (let y2 of this.yTicks(interval2)) {
        this.tickHori([0, y2], TICK_LENGTH_PX);
      }
    }
    xAxisTickMark(interval2) {
      this.save();
      this.$TEXT_ITALIC = false;
      this.$TEXT_ALIGN = "center";
      this.$TEXT_BASELINE = "middle";
      for (let x2 of this.xTicks(interval2)) {
        this.label(String(x2), [x2, 0], X_MARK_OFFSET_PX, 270);
      }
      this.restore();
    }
    yAxisTickMark(interval2) {
      this.save();
      this.$TEXT_ITALIC = false;
      this.$TEXT_ALIGN = "right";
      this.$TEXT_BASELINE = "middle";
      for (let y2 of this.yTicks(interval2)) {
        this.label(String(y2), [0, y2], Y_MARK_OFFSET_PX, 180);
      }
      this.restore();
    }
    gridLineVert(x2) {
      let A2 = this.bottomEnd(x2);
      let B2 = this.edgeTop(x2);
      this.line([A2, B2]);
    }
    gridLineHori(y2) {
      let A2 = this.leftEnd(y2);
      let B2 = this.edgeRight(y2);
      this.line([A2, B2]);
    }
    xAxisGrid(interval2) {
      this.save();
      this.$COLOR = "#d3d5db";
      this.gridLineVert(0);
      for (let x2 of this.xTicks(interval2)) {
        this.gridLineVert(x2);
      }
      this.restore();
    }
    yAxisGrid(interval2) {
      this.save();
      this.$COLOR = "#d3d5db";
      this.gridLineHori(0);
      for (let y2 of this.yTicks(interval2)) {
        this.gridLineHori(y2);
      }
      this.restore();
    }
  };

  // ../packages/paint/lib/support/trace.js
  function trace2(func, range2, dots = 1e3) {
    function tracer(t3) {
      let result2;
      try {
        result2 = func(t3);
      } catch {
        return [NaN, NaN];
      }
      if (!Array.isArray(result2))
        result2 = [t3, result2];
      return result2;
    }
    ;
    let [t1, t2] = range2;
    const step = (t2 - t1) / (dots - 1);
    let points = [];
    for (let t3 = t1; t3 <= t2; t3 += step) {
      points.push(tracer(t3));
    }
    return points;
  }
  function traceCircle2(center, radius, angleRange, dots = 100) {
    const [h2, k2] = center;
    function sin4(degree) {
      return Math.sin(degree / 180 * Math.PI);
    }
    function cos4(degree) {
      return Math.cos(degree / 180 * Math.PI);
    }
    return trace2((t2) => [h2 + radius * cos4(t2), k2 + radius * sin4(t2)], angleRange, dots);
  }
  function splitNull(arr) {
    let ls = [];
    let clone = [...arr];
    while (true) {
      let index = clone.findIndex(($) => $ === null);
      if (index === -1) {
        let head = clone.splice(0);
        ls.push(head);
        break;
      } else {
        let head = clone.splice(0, index);
        ls.push(head);
        clone.shift();
        if (clone.length === 0)
          break;
      }
    }
    ls = ls.filter(($) => $.length > 0);
    return ls;
  }

  // ../packages/paint/lib/support/sectoroid.js
  function vec2(p1, p22) {
    let [x1, y1] = p1;
    let [x2, y2] = p22;
    return [x2 - x1, y2 - y1];
  }
  function deg3(radian) {
    return radian / Math.PI * 180;
  }
  function magnitude([x2, y2]) {
    return (x2 * x2 + y2 * y2) ** 0.5;
  }
  function argument([x2, y2]) {
    let rad2 = Math.atan2(y2, x2);
    let angle2 = deg3(rad2);
    if (angle2 < 0)
      angle2 += 360;
    return angle2;
  }
  function sectoroid(O2, A2, B2, vertices) {
    let v1 = vec2(O2, A2);
    let v22 = vec2(O2, B2);
    let r3 = magnitude(v1);
    let q1 = argument(v1);
    let q2 = argument(v22);
    if (q2 < q1)
      q2 += 360;
    let points = traceCircle2(O2, r3, [q1, q2]);
    return [A2, ...points, B2, ...vertices];
  }

  // ../packages/paint/lib/canvas/canvas09.js
  var Canvas09 = class extends Canvas08 {
    plot(func, tStart = this.xmin, tEnd = this.xmax, dots = 1e3) {
      let points = trace2(func, [tStart, tEnd], dots);
      let isIll = (p3) => {
        let [x2, y2] = p3;
        return !Number.isFinite(x2) || !Number.isFinite(y2) || !this.isVisible(p3, 1);
      };
      let filteredPoints = points.map((p3) => isIll(p3) ? null : p3);
      let segments = splitNull(filteredPoints);
      for (let seg of segments)
        this.line(seg);
    }
    sectoroidLine(O2, A2, B2, vertices) {
      let pts = sectoroid(O2, A2, B2, vertices);
      this.line(pts);
    }
    sectoroidFill(O2, A2, B2, vertices) {
      let pts = sectoroid(O2, A2, B2, vertices);
      this.fill(pts);
    }
    sectoroidShade(O2, A2, B2, vertices) {
      let pts = sectoroid(O2, A2, B2, vertices);
      this.shade(pts);
    }
  };

  // ../packages/paint/lib/canvas/canvas10.js
  function degrize(text) {
    return typeof text === "number" ? text + "\xB0" : text;
  }
  function mid4(A2, B2) {
    if (A2.length === 3 && B2.length === 3) {
      let [x2, y2, z2] = A2;
      let [X2, Y2, Z2] = B2;
      return [(x2 + X2) / 2, (y2 + Y2) / 2, (z2 + Z2) / 2];
    } else {
      let [x2, y2] = A2;
      let [X2, Y2] = B2;
      return [(x2 + X2) / 2, (y2 + Y2) / 2];
    }
  }
  var Canvas10 = class extends Canvas09 {
    labelPoint(text, point, dir3, radius) {
      this.label(text, point, radius, dir3);
    }
    labelPointAuto(text, point, radius) {
      let dir3 = this.getCenterDir(point);
      this.label(text, point, radius, dir3);
    }
    labelAngle(text, [A2, O2, B2], dir3, radius) {
      let T2 = degrize(text);
      let mid5 = this.getMidDir(A2, O2, B2);
      this.label(T2, O2, radius, mid5 + dir3);
    }
    labelLine(text, [A2, B2], dir3, radius) {
      text = this.unitize(text);
      let M2 = mid4(A2, B2);
      let normal = this.getLineDir(A2, B2);
      this.label(text, M2, radius, normal + dir3);
    }
  };

  // src/Pen/modules/range.ts
  var PenRange = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    set([xmin, xmax], [ymin, ymax] = [xmin, xmax]) {
      this.cv.xmin = xmin;
      this.cv.xmax = xmax;
      this.cv.ymin = ymin;
      this.cv.ymax = ymax;
      this.cv.RANGE_DONE = true;
    }
    square(size, [x2, y2] = [0, 0]) {
      this.set([x2 - size, x2 + size], [y2 - size, y2 + size]);
    }
    capture(...things) {
      this.cv.capture(things);
      this.cv.AUTO_BORDER = true;
    }
    extend(...things) {
      this.capture([0, 0], ...things);
    }
  };

  // src/Pen/modules/size.ts
  var PenSize = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    initSize(widthInch, heightInch) {
      if (!this.cv.RANGE_DONE)
        throw "[Pencil] Range must be set before Size";
      this.cv.widthInch = widthInch;
      this.cv.heightInch = heightInch;
      this.cv.SIZE_DONE = true;
    }
    initOuterBorder() {
      if (!this.cv.RANGE_DONE)
        throw "[Pencil] Range must be set before setting border";
      if (!this.cv.SIZE_DONE)
        throw "[Pencil] Size must be set before setting border";
      this.cv.addBorder(this.cv.$BORDER);
    }
    set(widthInch = 1, heightInch = widthInch) {
      this.initSize(widthInch, heightInch);
      if (this.cv.AUTO_BORDER)
        this.initOuterBorder();
      this.pen.set.reset();
    }
    resolution(xIPU = 0.1, yIPU = xIPU) {
      let xScale = this.cv.dx() * xIPU;
      let yScale = this.cv.dy() * yIPU;
      this.set(xScale, yScale);
    }
    lock(maxWidthInch = 1, maxHeightInch = maxWidthInch) {
      let ratio = this.cv.yxRatio();
      if (maxWidthInch * ratio < maxHeightInch) {
        this.set(maxWidthInch, maxWidthInch * ratio);
      } else {
        this.set(maxHeightInch / ratio, maxHeightInch);
      }
    }
  };

  // src/Pen/modules/settings.ts
  var PenSettings = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    weight(weight = 1) {
      this.cv.$WEIGHT = weight;
    }
    color(color = "black") {
      this.cv.$COLOR = color;
    }
    alpha(value = 1) {
      this.cv.$ALPHA = value;
    }
    dash(segments = []) {
      this.cv.$DASH = segments;
    }
    textAlign(align = "center") {
      this.cv.$TEXT_ALIGN = align;
    }
    textBaseline(baseline = "middle") {
      this.cv.$TEXT_BASELINE = baseline;
    }
    textSize(size = 1) {
      this.cv.$TEXT_SIZE = size;
    }
    textItalic(italic = false) {
      this.cv.$TEXT_ITALIC = italic;
    }
    textDir(angle2 = 0) {
      this.cv.$TEXT_DIR = angle2;
    }
    textLatex(on = false) {
      this.cv.$TEXT_LATEX = on;
    }
    labelCenter(...centers) {
      this.cv.$LABEL_CENTER = centers;
    }
    lengthUnit(text = "") {
      this.cv.$LENGTH_UNIT = text;
    }
    angle(mode = "normal") {
      this.cv.$ANGLE_MODE = mode;
    }
    projector3D(angle2 = 60, depth = 0.5) {
      this.cv.$3D_ANGLE = angle2;
      this.cv.$3D_DEPTH = depth;
    }
    border(border = 0.2) {
      this.cv.$BORDER = border;
    }
    lineLabel(setting = "auto") {
      this.cv.$LINE_LABEL = setting;
    }
    halfAxisX(half = false) {
      this.cv.$HALF_AXIS_X = half;
    }
    halfAxisY(half = false) {
      this.cv.$HALF_AXIS_Y = half;
    }
    reset() {
      this.weight();
      this.color();
      this.alpha();
      this.dash();
      this.textAlign();
      this.textBaseline();
      this.textSize();
      this.textItalic();
      this.textDir();
      this.textLatex();
      this.labelCenter();
      this.lengthUnit();
      this.angle();
      this.lineLabel();
      this.halfAxisX();
      this.halfAxisY();
    }
    resetAll() {
      this.reset();
      this.border();
      this.projector3D();
    }
  };

  // src/Pen/modules/d3.ts
  var PenD3 = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    axis3D(length = 999) {
      this.pen.line([-length, 0, 0], [length, 0, 0]);
      this.pen.line([0, -length, 0], [0, length, 0]);
      this.pen.dash([0, 0, -length], [0, 0, length]);
    }
    circle(center, radius, xVec, yVec, {
      line = true,
      dash = false,
      shade = false,
      fill = false,
      arc = [0, 360]
    } = {}) {
      let ps = cal.traceCircle([0, 0], radius, arc);
      let ps3D = Embed(ps, center, xVec, yVec);
      if (line) {
        this.cv.save();
        if (dash)
          this.pen.set.dash(true);
        if (arc[1] - arc[0] >= 360) {
          this.pen.polygon(...ps3D);
        } else {
          this.pen.polyline(...ps3D);
        }
        this.cv.restore();
      }
      if (shade)
        this.pen.polyshade(...ps3D);
      if (fill)
        this.pen.polyfill(...ps3D);
    }
    circleXZ(center, radius, {
      line = true,
      dash = false,
      shade = false,
      fill = false,
      arc = [0, 360]
    } = {}) {
      this.circle(center, radius, [1, 0, 0], [0, 0, 1], {
        line,
        dash,
        shade,
        fill,
        arc
      });
    }
    circleYZ(center, radius, {
      line = true,
      dash = false,
      shade = false,
      fill = false,
      arc = [0, 360]
    } = {}) {
      this.circle(center, radius, [0, 1, 0], [0, 0, 1], {
        line,
        dash,
        shade,
        fill,
        arc
      });
    }
    circleXY(center, radius, {
      line = true,
      dash = false,
      shade = false,
      fill = false,
      arc = [0, 360]
    } = {}) {
      this.circle(center, radius, [1, 0, 0], [0, 1, 0], {
        line,
        dash,
        shade,
        fill,
        arc
      });
    }
    sphere(center, radius, {
      baseDash = false,
      baseShade = false,
      radiusLine = false,
      radiusDash = false,
      radiusLabel = "",
      lowerOnly = false,
      upperOnly = false
    } = {}) {
      if (upperOnly)
        this.circleXZ(center, radius, { arc: [0, 180] });
      if (lowerOnly)
        this.circleXZ(center, radius, { arc: [180, 360] });
      if (!upperOnly && !lowerOnly)
        this.circleXZ(center, radius, { arc: [0, 360] });
      this.circleXY(center, radius, { line: true, dash: baseDash, shade: baseShade });
      let leftEnd = vec3D(center).add([radius, 0, 0]).toArray();
      if (radiusLine)
        this.pen.line(center, leftEnd);
      if (radiusDash)
        this.pen.dash(center, leftEnd);
      if (radiusLabel.length > 0)
        this.pen.label.line([leftEnd, center], radiusLabel);
    }
    envelope(lowerBase, upperBase) {
      const LB = toList(lowerBase);
      const UB = toList(upperBase);
      let isPolar = (A2, O2, B2) => AnglePolar(this.cv.pj(A2), this.cv.pj(O2), this.cv.pj(B2)) < 180 ? 1 : -1;
      let lastPolarwise = isPolar(LB.cyclicAt(-1), UB.cyclicAt(-1), LB.cyclicAt(0));
      let arr = [];
      for (let i2 = 0; i2 < LB.length; i2++) {
        let polarwise = isPolar(LB.cyclicAt(i2), UB.cyclicAt(i2), LB.cyclicAt(i2 + 1));
        if (lastPolarwise * polarwise === -1)
          arr.push([LB.cyclicAt(i2), UB.cyclicAt(i2)]);
        lastPolarwise = polarwise;
      }
      return arr;
    }
    frustum(lowerBase, upperBase, {
      base: base2 = true,
      height = false,
      shadeLower = false,
      shadeUpper = false,
      envelope = false
    } = {}) {
      if (owl.point3D(upperBase)) {
        upperBase = Array(lowerBase.length).fill(upperBase);
      }
      if (base2) {
        this.pen.polygon(...lowerBase);
        this.pen.polygon(...upperBase);
      }
      if (envelope) {
        let env = this.envelope(lowerBase, upperBase);
        for (let e6 of env) {
          this.pen.line(e6[0], e6[1]);
        }
      } else {
        for (let i2 = 0; i2 < lowerBase.length; i2++) {
          this.pen.line(lowerBase[i2], upperBase[i2]);
        }
      }
      if (height) {
        let V2 = toShape3D(upperBase).mean().toArray();
        let [A2, B2, C2] = lowerBase;
        let O2 = PdFoot3D(V2, [A2, B2, C2]);
        this.pen.dash(O2, V2);
      }
      if (shadeLower)
        this.pen.polyshade(...lowerBase);
      if (shadeUpper)
        this.pen.polyshade(...upperBase);
    }
    prismZ(lowerBase, lowerZ, upperZ, {
      base: base2 = true,
      height = false,
      shadeLower = false,
      shadeUpper = false,
      envelope = false
    } = {}) {
      let lower = EmbedZ(lowerBase, lowerZ);
      let upper = EmbedZ(lowerBase, upperZ);
      this.frustum(lower, upper, {
        base: base2,
        height,
        shadeLower,
        shadeUpper,
        envelope
      });
    }
    cylinderZ(center, radius, lowerZ, upperZ, {
      base: base2 = true,
      height = false,
      shadeLower = false,
      shadeUpper = false,
      envelope = true
    } = {}) {
      let ps = cal.traceCircle(center, radius, [0, 360]);
      this.prismZ(ps, lowerZ, upperZ, {
        base: base2,
        height,
        shadeLower,
        shadeUpper,
        envelope
      });
    }
    pyramidZ(lowerBase, lowerZ, vertex, {
      base: base2 = true,
      height = false,
      shadeLower = false,
      envelope = false
    } = {}) {
      let lower = EmbedZ(lowerBase, lowerZ);
      this.frustum(lower, vertex, {
        base: base2,
        height,
        shadeLower,
        envelope
      });
    }
    coneZ(center, radius, lowerZ, vertex, {
      base: base2 = true,
      height = false,
      shadeLower = false,
      envelope = true
    } = {}) {
      let ps = cal.traceCircle(center, radius, [0, 360]);
      this.pyramidZ(ps, lowerZ, vertex, {
        base: base2,
        height,
        shadeLower,
        envelope
      });
    }
    frustumZ(lowerBase, lowerZ, vertex, scale, {
      base: base2 = true,
      height = false,
      shadeLower = false,
      shadeUpper = false,
      envelope = false
    } = {}) {
      let lower = EmbedZ(lowerBase, lowerZ);
      let upper = Extrude(lower, [vertex], scale);
      this.frustum(lower, upper, {
        base: base2,
        height,
        shadeLower,
        shadeUpper,
        envelope
      });
    }
    conicalFrustumZ(center, radius, lowerZ, vertex, scale, {
      base: base2 = true,
      height = false,
      shadeLower = false,
      shadeUpper = false,
      envelope = true
    } = {}) {
      let ps = cal.traceCircle(center, radius, [0, 360]);
      this.frustumZ(ps, lowerZ, vertex, scale, {
        base: base2,
        height,
        shadeLower,
        shadeUpper,
        envelope
      });
    }
    angleBet(angle2, line, label) {
      let [P2, O2, Q2] = angle2;
      let [A2, B2] = line;
      this.pen.line(P2, O2);
      this.pen.line(Q2, O2);
      this.pen.angle(P2, O2, Q2);
      if (label !== void 0)
        this.pen.label.angle([P2, O2, Q2], label);
      if (A2 !== void 0)
        this.pen.rightAngle(P2, O2, A2);
      if (B2 !== void 0)
        this.pen.rightAngle(Q2, O2, B2);
    }
    height(vertex, foot, leg, label) {
      this.pen.dash(vertex, foot);
      this.pen.rightAngle(vertex, foot, leg);
      this.pen.line(foot, leg);
      if (label !== void 0)
        this.pen.label.line([vertex, foot], label);
    }
    altitude(vertex, foot, leg, label) {
      this.pen.line(vertex, foot);
      this.pen.rightAngle(vertex, foot, leg);
      this.pen.line(foot, leg);
      if (label !== void 0)
        this.pen.label.line([vertex, foot], label);
    }
  };

  // src/Pen/modules/graph.ts
  var PenGraph = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    circle(center, radius) {
      const [h2, k2] = center;
      this.pen.plot((t2) => [h2 + radius * cos(t2), k2 + radius * sin(t2)], 0, 365);
    }
    arc(O2, A2, B2) {
      this.cv.sectoroidLine(O2, A2, B2, []);
    }
    sector(O2, A2, B2) {
      this.cv.sectoroidLine(O2, A2, B2, [O2, A2]);
    }
    segment(O2, A2, B2) {
      this.cv.sectoroidLine(O2, A2, B2, [A2]);
    }
    quadratic(a2, b2, c3) {
      this.pen.plot((x2) => a2 * x2 * x2 + b2 * x2 + c3);
    }
    line(m3, c3) {
      const { xmin, xmax } = this.cv;
      const y2 = (x2) => m3 * x2 + c3;
      this.pen.line([xmin, y2(xmin)], [xmax, y2(xmax)]);
    }
    horizontal(y2) {
      this.cv.lineHori(y2);
    }
    vertical(x2) {
      this.cv.lineVert(x2);
    }
    linear(a2, b2, c3) {
      if (a2 === 0 && b2 !== 0)
        this.horizontal(-c3 / b2);
      if (b2 == 0 && a2 !== 0)
        this.vertical(-c3 / a2);
      if (a2 !== 0 && b2 !== 0)
        this.line(-a2 / b2, -c3 / b2);
    }
    through(A2, B2) {
      let ptA = this.cv.pj(A2);
      let ptB = this.cv.pj(B2);
      let [a2, b2, c3] = lin().byTwoPoints(ptA, ptB).toLinear();
      this.linear(a2, b2, c3);
    }
    perpBisector(A2, B2) {
      let [a2, b2, c3] = lin().byBisector(A2, B2).toLinear();
      this.linear(a2, b2, c3);
    }
  };

  // src/Pen/modules/fill.ts
  var PenFill = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    circle(center, radius) {
      let points = cal.traceCircle(center, radius, [0, 360]);
      this.pen.polyfill(...points);
    }
    sector(O2, A2, B2) {
      this.cv.sectoroidFill(O2, A2, B2, [O2]);
    }
    segment(O2, A2, B2) {
      this.cv.sectoroidFill(O2, A2, B2, []);
    }
    sectoroid(O2, A2, B2, vertices) {
      this.cv.sectoroidFill(O2, A2, B2, vertices);
    }
    rect(A2, C2) {
      let [a2, b2] = A2;
      let [c3, d2] = C2;
      this.pen.polyfill([a2, b2], [c3, b2], [c3, d2], [a2, d2]);
    }
  };

  // src/Pen/modules/shade.ts
  var PenShade = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    circle(center, radius) {
      let points = cal.traceCircle(center, radius, [0, 360]);
      this.pen.polyshade(...points);
    }
    sector(O2, A2, B2) {
      this.cv.sectoroidShade(O2, A2, B2, [O2]);
    }
    segment(O2, A2, B2) {
      this.cv.sectoroidShade(O2, A2, B2, []);
    }
    sectoroid(O2, A2, B2, vertices) {
      this.cv.sectoroidShade(O2, A2, B2, vertices);
    }
    rect(A2, C2) {
      let [a2, b2] = A2;
      let [c3, d2] = C2;
      this.pen.polyshade([a2, b2], [c3, b2], [c3, d2], [a2, d2]);
    }
  };

  // src/Pen/modules/label.ts
  var PenLabel = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    point(point, text = "", dir3, radius = 15) {
      if (dir3 !== void 0) {
        this.cv.labelPoint(text, point, dir3, radius);
      } else {
        this.cv.labelPointAuto(text, point, radius);
      }
    }
    points(points) {
      for (let k2 in points) {
        this.point(points[k2], k2);
      }
    }
    vertices(points) {
      this.cv.save();
      this.pen.set.labelCenter(...Object.values(points));
      this.points(points);
      this.cv.restore();
    }
    angle([A2, O2, B2], text, dir3 = 0, radius = -1) {
      if (radius < 0) {
        radius = 28 + this.cv.getAngleAllowance(A2, O2, B2, 40, 1.5);
      }
      this.cv.labelAngle(text, [A2, O2, B2], dir3, radius);
    }
    line([A2, B2], text, dir3 = 0, radius = 15) {
      this.cv.labelLine(text, [A2, B2], dir3, radius);
    }
    polygon(points, text) {
      let pts = this.cv.pjs(points);
      this.cv.labelPoint(String(text), Mid(...pts), 0, 0);
    }
    coordinates(point, dir3, radius = 15) {
      let [x2, y2] = point;
      x2 = Fix(x2, 1);
      y2 = Fix(y2, 1);
      let text = `(${x2}, ${y2})`;
      this.point(point, text, dir3, radius);
    }
  };

  // src/Pen/modules/axis.ts
  var PenAxis = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    x(label = "x") {
      this.cv.xAxis();
      this.cv.xAxisLabel(label);
    }
    y(label = "y") {
      this.cv.yAxis();
      this.cv.yAxisLabel(label);
    }
    xy(xlabel = "x", ylabel = "y") {
      this.x(xlabel);
      this.y(ylabel);
    }
  };

  // src/Pen/modules/tick.ts
  var PenTick = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    x(interval2 = 1, mark = true) {
      this.cv.xAxisTick(interval2);
      if (mark)
        this.cv.xAxisTickMark(interval2);
    }
    y(interval2 = 1, mark = true) {
      this.cv.yAxisTick(interval2);
      if (mark)
        this.cv.yAxisTickMark(interval2);
    }
    xy(interval2 = 1, mark = true) {
      this.x(interval2, mark);
      this.y(interval2, mark);
    }
  };

  // src/Pen/modules/grid.ts
  var PenGrid = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    x(interval2 = 1) {
      this.cv.xAxisGrid(interval2);
    }
    y(interval2 = 1) {
      this.cv.yAxisGrid(interval2);
    }
    xy(interval2 = 1) {
      this.x(interval2);
      this.y(interval2);
    }
  };

  // src/Pen/modules/linProg.ts
  var PenLinProg = class {
    constructor(pen, cv) {
      this.pen = pen;
      this.cv = cv;
    }
    drawConstraints(...constraints2) {
      for (let c3 of toReins(constraints2)) {
        if (c3.canEqual()) {
          this.pen.graph.linear(...c3.toLinear());
        } else {
          this.pen.set.dash(true);
          this.pen.graph.linear(...c3.toLinear());
          this.pen.set.dash();
        }
      }
    }
    shadeConstraints(constraints2) {
      let poly = toReins(constraints2).polygon();
      this.pen.polyshade(...poly);
    }
    verticesCoord(constraints2) {
      let vs = toReins(constraints2).vertices();
      for (let v3 of vs) {
        this.pen.label.coordinates(v3);
      }
    }
  };

  // src/Pen/Pen.ts
  var DEFAULT_POINT_RADIUS_PIXEL = 2;
  var DEFAULT_CUTTER_LENGTH_PIXEL = 5;
  var PenCls = class {
    cv = new Canvas10();
    constructor() {
      this.range.set([-5, 5], [-5, 5]);
      this.size.set(1);
      this.set.reset();
    }
    range = new PenRange(this, this.cv);
    size = new PenSize(this, this.cv);
    set = new PenSettings(this, this.cv);
    plot(func, tStart, tEnd) {
      this.cv.plot(func, tStart, tEnd, 1e3);
    }
    plotDash(func, tStart, tEnd) {
      this.cv.save();
      this.set.dash(true);
      this.cv.plot(func, tStart, tEnd, 1e3);
      this.cv.restore();
    }
    graph = new PenGraph(this, this.cv);
    point(position, label) {
      this.cv.disc(position, DEFAULT_POINT_RADIUS_PIXEL);
      if (label !== void 0)
        this.label.point(position, label);
    }
    points(positions) {
      for (let k2 in positions) {
        this.point(positions[k2], k2);
      }
    }
    cutX(position, label) {
      if (typeof position === "number")
        position = [position, 0];
      this.cv.tickVert(position, DEFAULT_CUTTER_LENGTH_PIXEL);
      if (label !== void 0)
        this.label.point(position, label, 270);
    }
    cutY(position, label) {
      if (typeof position === "number")
        position = [0, position];
      this.cv.tickHori(position, DEFAULT_CUTTER_LENGTH_PIXEL);
      if (label !== void 0)
        this.label.point(position, label, 180);
    }
    guideX(point, label) {
      let [x2, y2] = point;
      this.dash([x2, 0], point);
      if (label !== void 0) {
        this.cutX(x2);
        this.label.point([x2, 0], label, y2 >= 0 ? 270 : 90);
      }
    }
    guideY(point, label) {
      let [x2, y2] = point;
      this.dash([0, y2], point);
      if (label !== void 0) {
        this.cutY(y2);
        this.label.point([0, y2], label, x2 >= 0 ? 180 : 0);
      }
    }
    circle(center, radius) {
      this.cv.circle(center, radius);
    }
    disc(center, radius) {
      this.cv.disc(center, radius);
    }
    halo(center, radius) {
      this.cv.halo(center, radius);
    }
    dot(point) {
      this.disc(point, 4);
    }
    hole(point) {
      this.cv.save();
      this.set.color("white");
      this.disc(point, 4);
      this.cv.restore();
      this.circle(point, 4);
    }
    line(A2, B2, label) {
      this.cv.line([A2, B2]);
      if (label !== void 0)
        this.label.line([A2, B2], label);
    }
    dash(A2, B2, label) {
      this.cv.dash([A2, B2]);
      if (label !== void 0)
        this.label.line([A2, B2], label);
    }
    arrow(A2, B2, label) {
      this.cv.arrow(A2, B2, 5);
      if (label !== void 0)
        this.label.line([A2, B2], label);
    }
    arrowCompo(O2, P2, dir3, arrowLabel, angleLabel) {
      let X2 = Move(O2, dir3, 1);
      let Q2 = PdFoot(O2, X2, P2);
      this.cv.save();
      this.set.labelCenter(O2, P2);
      this.arrow(O2, Q2, arrowLabel);
      this.cv.restore();
      if (angleLabel !== void 0)
        this.angle(Q2, O2, P2, angleLabel);
    }
    arrowResolve(O2, P2, dir3, arrowLabels = [], angleLabel) {
      let [l1, l22] = arrowLabels;
      this.arrowCompo(O2, P2, dir3, l1, angleLabel);
      this.arrowCompo(O2, P2, dir3 + 90, l22);
    }
    length(A2, B2, label) {
      this.cv.line([A2, B2]);
      this.cv.tick(A2, B2, 5, 0);
      this.cv.tick(B2, A2, 5, 0);
      if (label !== void 0)
        this.label.line([A2, B2], label);
    }
    height(V2, [A2, B2], label) {
      let F2 = PdFoot(A2, B2, V2);
      this.dash(V2, F2);
      this.rightAngle(A2, F2, V2);
      if (label !== void 0) {
        const c3 = vec2D(V2, A2).cross2D(vec2D(V2, B2));
        if (c3 > 0) {
          this.label.line([V2, F2], label);
        } else {
          this.label.line([F2, V2], label);
        }
      }
    }
    ray(A2, B2) {
      this.cv.line([A2, B2]);
      this.cv.midArrowHead(A2, B2, 5);
    }
    rayTo(A2, dir3) {
      let edgePoint = this.cv.edgePoint(A2, dir3);
      this.cv.line([A2, edgePoint]);
      this.cv.midArrowHead(A2, edgePoint, 5);
    }
    polyline(...points) {
      this.cv.line(points);
    }
    polygon(...points) {
      this.cv.shape(points);
    }
    polyfill(...points) {
      this.cv.fill(points);
    }
    polyshade(...points) {
      this.cv.shade(points);
    }
    polyshape(...points) {
      this.polygon(...points);
      this.polyshade(...points);
    }
    fill = new PenFill(this, this.cv);
    shade = new PenShade(this, this.cv);
    linProg = new PenLinProg(this, this.cv);
    angle(A2, O2, B2, label, arc = 1, radius = -1) {
      if (radius < 0)
        radius = 15 + this.cv.getAngleAllowance(A2, O2, B2, 40, 1.5);
      let space = 3;
      this.cv.angle(A2, O2, B2, radius, arc, space);
      if (label !== void 0 && label !== "")
        this.label.angle([A2, O2, B2], label, void 0, radius < 0 ? radius : radius + 13);
    }
    equalSide(A2, B2, tick = 1) {
      this.cv.equalSide(A2, B2, 5, tick, 3);
    }
    bisectSide(A2, B2, tick = 1) {
      [A2, B2] = this.cv.pjs([A2, B2]);
      let M2 = Mid(A2, B2);
      this.equalSide(A2, M2, tick);
      this.equalSide(B2, M2, tick);
    }
    parallel(A2, B2, tick = 1) {
      this.cv.parallel(A2, B2, 5, tick, 6);
    }
    rightAngle(A2, O2, B2, size = 12) {
      A2 = this.cv.pj(A2);
      O2 = this.cv.pj(O2);
      B2 ??= Rotate(A2, 90, O2);
      B2 = this.cv.pj(B2);
      this.cv.rightAngle(A2, O2, B2, size);
    }
    compass(point) {
      this.cv.compass(point, 17, 20, 3.5);
    }
    write(point, text) {
      this.cv.write(text, point);
    }
    label = new PenLabel(this, this.cv);
    axis = new PenAxis(this, this.cv);
    tick = new PenTick(this, this.cv);
    grid = new PenGrid(this, this.cv);
    d3 = new PenD3(this, this.cv);
    background(url) {
      this.cv.backgroundURL = url;
    }
    export(html, placeholder) {
      return this.cv.export(html, placeholder, false);
    }
    exportTrim(html, placeholder) {
      return this.cv.export(html, placeholder, true);
    }
    clear() {
      this.cv.clearImg();
    }
    saveImg() {
      this.cv.saveImg();
    }
    restoreImg() {
      this.cv.restoreImg();
    }
  };

  // src/Pen/AutoPen.ts
  var AutoPenCls = class {
    pen;
    constructor() {
      this.pen = new Pen();
    }
    export(html, placeholder) {
      return this.pen.exportTrim(html, placeholder);
    }
    PrimeFactorization({ numbers: numbers3 }) {
      function lowestFactor(arr) {
        const primes3 = [2, 3, 5, 7, 11, 13, 17, 19];
        for (let p3 of primes3) {
          if (HCF(...arr) % p3 === 0)
            return p3;
        }
        return 1;
      }
      const pen = new Pen();
      pen.range.set([-10, 10], [-15, 5]);
      pen.size.set(4);
      const w2 = 1;
      const h2 = 1;
      function drawRow(arr, pivot2) {
        for (let i2 = 0; i2 < arr.length; i2++) {
          pen.write([pivot2[0] + i2 * w2, pivot2[1]], arr[i2].toString());
        }
      }
      function drawVert(pivot2) {
        pen.line([pivot2[0] - 0.5 * w2, pivot2[1] - h2 / 2], [pivot2[0] - 0.5 * w2, pivot2[1] + h2 / 2]);
      }
      function drawUnderline(arr, pivot2) {
        for (let i2 = 0; i2 < arr.length; i2++) {
          pen.line([pivot2[0] + i2 * w2 - 0.5 * w2, pivot2[1] - h2 / 2], [pivot2[0] + i2 * w2 + 0.5 * w2, pivot2[1] - h2 / 2]);
        }
      }
      function drawDivisor(pivot2, divisor) {
        pen.write([pivot2[0] - w2, pivot2[1]], divisor.toString());
      }
      function drawDiv(arr, pivot2) {
        const d2 = lowestFactor(arr);
        drawVert(pivot2);
        drawUnderline(arr, pivot2);
        drawDivisor(pivot2, d2);
        arr = arr.map((x2) => x2 / d2);
        pivot2 = [pivot2[0], pivot2[1] - h2];
        drawRow(arr, pivot2);
        return [arr, pivot2];
      }
      let pivot = [1, 0];
      drawRow(numbers3, pivot);
      while (HCF(...numbers3) > 1) {
        [numbers3, pivot] = drawDiv(numbers3, pivot);
      }
      this.pen = pen;
    }
    Inequalities({
      items = [],
      ticks = [],
      scale = 1.6,
      ratio = 0.5
    }) {
      const width = 5;
      const height = 2;
      let ineqs = items.map((x2, i2) => ({ base: -i2 * (height + 2), ...x2 }));
      const pen = new Pen();
      pen.range.set([-width - 2, width + 2], [-ineqs.length * (height + 2) + 2, height + 1]);
      pen.size.set(scale, scale * ratio);
      pen.set.textLatex(true);
      function inequality({ position, sign, num: num2, base: base2, vertical }) {
        let greater = sign.includes(">") || sign.includes("g");
        let solid = sign.includes("=") || sign.includes("e");
        let align = -width + 2 * width * position;
        let B2 = [align, base2];
        let T2 = [align, base2 + height];
        let E2 = [greater ? align + 0.4 * width : align - 0.4 * width, base2 + height];
        let E1 = [greater ? width : -width, base2 + height];
        let E22 = [greater ? width : -width, base2];
        if (vertical) {
          pen.set.color("grey");
          pen.set.dash(10);
          pen.graph.vertical(align);
          pen.set.color();
          pen.set.dash();
        }
        pen.polyshade(B2, T2, E1, E22);
        pen.arrow([-width, base2], [width, base2]);
        pen.line(B2, T2);
        pen.arrow(T2, E2);
        solid ? pen.dot(T2) : pen.hole(T2);
        pen.label.point(B2, num2.toString(), 270);
      }
      function tick(position, correct2) {
        let align = -width + 2 * width * position;
        let y2 = -(ineqs.length - 1) * (height + 2) - height / 2;
        pen.write([align, y2], correct2 ? "\u2714" : "\u2718");
      }
      ineqs.forEach((x2) => inequality(x2));
      let cutting = ineqs.map((x2) => x2.position);
      cutting = [0, ...cutting, 1];
      for (let i2 = 0; i2 < ticks.length; i2++) {
        let p3 = (cutting[i2] + cutting[i2 + 1]) / 2;
        tick(p3, ticks[i2]);
      }
      this.pen = pen;
    }
    TrigSolution({
      trig: trig2 = "sin",
      k: k2 = 0,
      scale = 1.4,
      ratio = 0.7
    }) {
      if (trig2 === "sin" || trig2 === "cos") {
        if (k2 > 2)
          k2 = 2;
        if (0.9 < k2 && k2 < 1)
          k2 = 0.9;
        if (0 < k2 && k2 < 0.3)
          k2 = 0.3;
        if (-1 < k2 && k2 < -0.9)
          k2 = -0.9;
        if (-0.3 < k2 && k2 < 0)
          k2 = -0.3;
        if (k2 < -2)
          k2 = -2;
      }
      if (trig2 === "tan") {
        if (k2 > 4)
          k2 = 4;
        if (k2 < -4)
          k2 = -4;
        if (0 < k2 && k2 < 0.9)
          k2 = 0.9;
        if (0 > k2 && k2 > -0.9)
          k2 = -0.9;
      }
      let [a2, b2, c3] = TrigRoot(trig2, k2);
      const pen = new Pen();
      let limit = Max(1, Abs(k2)) + 0.2;
      if (trig2 === "sin")
        pen.range.set([-40, 390], [-limit, limit]);
      if (trig2 === "cos")
        pen.range.set([-40, 390], [-limit, limit]);
      if (trig2 === "tan")
        pen.range.set([-40, 390], [-5, 5]);
      pen.size.set(scale, scale * ratio);
      pen.axis.x();
      pen.axis.y();
      if (trig2 === "sin" || trig2 === "cos") {
        pen.tick.x(360);
      }
      if (trig2 === "tan") {
        pen.tick.x(180);
      }
      if (trig2 === "sin" || trig2 === "cos") {
        pen.cutY([0, 1]);
        pen.cutY([0, -1]);
        pen.label.point([0, 1], "1", 180);
        pen.label.point([0, -1], "-1", 180);
      }
      pen.set.weight(1.5);
      if (trig2 === "sin")
        pen.plot((x2) => sin(x2), 0, 360);
      if (trig2 === "cos")
        pen.plot((x2) => cos(x2), 0, 360);
      if (trig2 === "tan") {
        pen.plot((x2) => tan(x2), 0, 360);
        pen.set.color("grey");
        pen.set.dash([5, 10]);
        pen.set.weight(0.7);
        pen.graph.vertical(90);
        pen.graph.vertical(270);
        pen.set.color();
        pen.set.dash();
        pen.set.weight(1);
      }
      pen.set.weight(1);
      function arrow(x2, y2, func, label = "") {
        if (x2 === void 0)
          return;
        let anchor = 0;
        let skipAnchor = false;
        if (func === "sin") {
          if ([0, 90, 180, 270, 360].includes(x2))
            skipAnchor = true;
          if (x2 > 0 && x2 < 90)
            anchor = 0;
          if (x2 > 90 && x2 < 270)
            anchor = 180;
          if (x2 > 270 && x2 < 360)
            anchor = 360;
        }
        if (func === "cos") {
          if ([0, 90, 180, 270, 360].includes(x2))
            skipAnchor = true;
          if (x2 > 0 && x2 < 180 && x2 !== 90)
            anchor = 0;
          if (x2 > 180 && x2 < 360 && x2 !== 270)
            anchor = 360;
        }
        if (func === "tan") {
          if ([0, 90, 180, 270, 360].includes(x2))
            skipAnchor = true;
          if (x2 > 0 && x2 < 180)
            anchor = 0;
          if (x2 > 180 && x2 < 360)
            anchor = 180;
        }
        let P2 = [x2, y2];
        let Q2 = [x2, 0];
        let R2 = [anchor, 0];
        pen.set.color();
        pen.point(P2);
        pen.set.color("red");
        if (y2 !== 0) {
          pen.arrow(P2, Q2);
        }
        if (y2 >= 0) {
          pen.label.point(Q2, label, 270);
        }
        if (y2 < 0) {
          pen.label.point(Q2, label, 90);
        }
        if (skipAnchor)
          return;
        pen.set.weight(3);
        pen.set.color("blue");
        pen.line(R2, Q2);
        pen.set.weight(1);
        pen.set.color("red");
      }
      pen.set.color("red");
      pen.set.dash([5, 5]);
      pen.graph.horizontal(k2);
      pen.set.dash();
      if (trig2 === "sin") {
        if (k2 === 0) {
          arrow(a2, k2, "sin", "0");
          arrow(b2, k2, "sin", "180");
          arrow(c3, k2, "sin", "360");
        }
        if (k2 === 1) {
          arrow(a2, k2, "sin", "90");
        }
        if (k2 === -1) {
          arrow(a2, k2, "sin", "270");
        }
        if (k2 > -1 && k2 < 1 && k2 !== 0) {
          arrow(a2, k2, "sin", "\u03B1");
          arrow(b2, k2, "sin", "\u03B2");
        }
      }
      if (trig2 === "cos") {
        if (k2 === 0) {
          arrow(a2, k2, "cos", "90");
          arrow(b2, k2, "cos", "270");
        }
        if (k2 === 1) {
          arrow(a2, k2, "cos", "0");
          arrow(b2, k2, "cos", "360");
        }
        if (k2 === -1) {
          arrow(a2, k2, "cos", "180");
        }
        if (k2 > -1 && k2 < 1 && k2 !== 0) {
          arrow(a2, k2, "cos", "\u03B1");
          arrow(b2, k2, "cos", "\u03B2");
        }
      }
      if (trig2 === "tan") {
        if (k2 === 0) {
          arrow(a2, k2, "tan", "0");
          arrow(b2, k2, "tan", "180");
          arrow(c3, k2, "tan", "360");
        }
        if (k2 !== 0) {
          arrow(a2, k2, "tan", "\u03B1");
          arrow(b2, k2, "tan", "\u03B2");
        }
      }
      this.pen = pen;
    }
    QuadraticInequality({
      quadratic,
      sign,
      scale = 1,
      ratio = 0.8
    }) {
      let a2 = quadratic[0];
      let b2 = quadratic[1];
      let c3 = quadratic[2];
      let greater = sign.includes(">") || sign.includes("g");
      let equal2 = sign.includes("=") || sign.includes("e");
      let p3;
      let q2;
      try {
        [p3, q2] = QuadraticRoot(a2, b2, c3);
      } catch {
        [p3, q2] = [void 0, void 0];
      }
      if (p3 !== void 0 && q2 !== void 0) {
        [p3, q2] = [Max(p3, q2), Min(p3, q2)];
        p3 = Fix(p3, 2);
        q2 = Fix(q2, 2);
      }
      const pen = new Pen();
      pen.range.set([-5, 5], [-5, 5]);
      pen.size.set(scale, scale * ratio);
      pen.set.textLatex(true);
      pen.axis.x("");
      if (p3 !== void 0 && q2 !== void 0 && p3 !== q2) {
        pen.plot((x2) => Sign(a2) * (x2 ** 2 - 4));
        let P2 = [2, 0];
        let Q2 = [-2, 0];
        pen.cutX(P2);
        pen.cutX(Q2);
        pen.set.weight(3);
        pen.set.color("red");
        if (a2 > 0) {
          if (greater) {
            pen.plot((x2) => Sign(a2) * (x2 ** 2 - 4), -5, -2);
            pen.plot((x2) => Sign(a2) * (x2 ** 2 - 4), 2, 5);
          } else {
            pen.plot((x2) => Sign(a2) * (x2 ** 2 - 4), -2, 2);
          }
        }
        if (a2 < 0) {
          if (greater) {
            pen.plot((x2) => Sign(a2) * (x2 ** 2 - 4), -2, 2);
          } else {
            pen.plot((x2) => Sign(a2) * (x2 ** 2 - 4), -5, -2);
            pen.plot((x2) => Sign(a2) * (x2 ** 2 - 4), 2, 5);
          }
        }
        pen.set.weight();
        pen.set.color();
        pen.label.point(P2, p3.toString(), a2 > 0 ? 315 : 45);
        pen.label.point(Q2, q2.toString(), a2 > 0 ? 225 : 135);
      }
      if (p3 === void 0 && q2 === void 0) {
        if (a2 > 0 && greater || a2 < 0 && !greater) {
          pen.set.weight(3);
          pen.set.color("red");
        }
        if (a2 > 0)
          pen.plot((x2) => x2 ** 2 + 2);
        if (a2 < 0)
          pen.plot((x2) => -(x2 ** 2) - 2);
      }
      if (p3 !== void 0 && q2 !== void 0 && p3 === q2) {
        let func = a2 > 0 ? (x2) => x2 ** 2 : (x2) => -(x2 ** 2);
        pen.plot(func);
        pen.label.point([0, 0], p3.toString(), a2 > 0 ? 270 : 90);
        if (a2 > 0) {
          pen.set.weight(3);
          pen.set.color("red");
          if (greater && equal2)
            pen.plot(func);
          if (greater && !equal2) {
            pen.plot(func);
            pen.set.color();
            pen.hole([0, 0]);
          }
          if (!greater && equal2) {
            pen.set.color("red");
            pen.dot([0, 0]);
          }
          if (!greater && !equal2) {
          }
        }
        if (a2 < 0) {
          pen.set.weight(3);
          pen.set.color("red");
          if (!greater && equal2)
            pen.plot(func);
          if (!greater && !equal2) {
            pen.plot(func);
            pen.set.color();
            pen.hole([0, 0]);
          }
          if (greater && equal2) {
            pen.set.color("red");
            pen.dot([0, 0]);
          }
          if (greater && !equal2) {
          }
        }
      }
      this.pen = pen;
    }
    Triangle({
      vertices,
      triangle = {},
      labels = ["", "", ""],
      heights = [false, false, false],
      scale = 1.6
    }) {
      let A2 = vertices[0];
      let B2 = vertices[1];
      let C2 = vertices[2];
      let xmax = Math.max(A2[0], B2[0], C2[0]);
      let xmin = Math.min(A2[0], B2[0], C2[0]);
      let xmid = (xmax + xmin) / 2;
      let ymax = Math.max(A2[1], B2[1], C2[1]);
      let ymin = Math.min(A2[1], B2[1], C2[1]);
      let ymid = (ymax + ymin) / 2;
      let dx = xmax - xmin;
      let dy = ymax - ymin;
      let dmax = Math.max(dx, dy) * 0.8;
      let G2 = Mid(A2, B2, C2);
      let T2 = triangle;
      let sideA = T2.sideA;
      let sideB = T2.sideB;
      let sideC = T2.sideC;
      let angleA = T2.angleA;
      let angleB = T2.angleB;
      let angleC = T2.angleC;
      let labelA = labels[0];
      let labelB = labels[1];
      let labelC = labels[2];
      const pen = new Pen();
      pen.range.set([xmid - dmax, xmid + dmax], [ymid - dmax, ymid + dmax]);
      pen.size.set(scale);
      function drawHeight(vertex, base2) {
        let F2 = PdFoot(base2[0], base2[1], vertex);
        pen.set.dash([5, 5]);
        pen.set.color("grey");
        pen.line(vertex, F2);
        if (F2[0] === base2[0][0] && F2[1] === base2[0][1]) {
          pen.line(F2, base2[1]);
        } else {
          pen.line(F2, base2[0]);
        }
        pen.set.dash();
        if (F2[0] === base2[0][0] && F2[1] === base2[0][1]) {
          pen.rightAngle(vertex, F2, base2[1]);
        } else {
          pen.rightAngle(vertex, F2, base2[0]);
        }
        pen.set.color();
      }
      if (heights[0])
        drawHeight(A2, [B2, C2]);
      if (heights[1])
        drawHeight(B2, [C2, A2]);
      if (heights[2])
        drawHeight(C2, [A2, B2]);
      pen.polygon(A2, B2, C2);
      pen.set.textItalic(true);
      if (labelA)
        pen.label.point(A2, labelA.toString(), Dir(G2, A2));
      if (labelB)
        pen.label.point(B2, labelB.toString(), Dir(G2, B2));
      if (labelC)
        pen.label.point(C2, labelC.toString(), Dir(G2, C2));
      pen.set.textItalic();
      let AB = [B2[0] - A2[0], B2[1] - A2[1]];
      let BC = [C2[0] - B2[0], C2[1] - B2[1]];
      let anticlockwise = AB[0] * BC[1] - AB[1] * BC[0] > 0;
      function writeSide(side2, start, end) {
        if (side2) {
          if (typeof side2 === "string" && !/\d/.test(side2))
            pen.set.textItalic(true);
          if (anticlockwise) {
            pen.label.line([start, end], side2.toString());
          } else {
            pen.label.line([end, start], side2.toString());
          }
          pen.set.textItalic();
        }
      }
      writeSide(sideC, A2, B2);
      writeSide(sideA, B2, C2);
      writeSide(sideB, C2, A2);
      function writeAngle(angle2, P2, O2, Q2) {
        if (angle2) {
          if (typeof angle2 === "string")
            pen.set.textItalic(true);
          if (typeof angle2 === "number")
            angle2 = angle2 + "\xB0";
          pen.angle(P2, O2, Q2, angle2);
          pen.set.textItalic();
        }
      }
      writeAngle(angleA, B2, A2, C2);
      writeAngle(angleB, C2, B2, A2);
      writeAngle(angleC, A2, C2, B2);
      this.pen = pen;
    }
    LinearProgram({
      constraints: constraints2 = [],
      field: field2 = [0, 0, 0],
      contours = [],
      labelConstraints = [],
      highlights = [],
      ranges = [[-10, 10], [-10, 10]],
      resolution = 0.2,
      grid = 0,
      subGrid = 0,
      tick = 0,
      showLine = true,
      showShade = true,
      showVertex = false,
      showVertexCoordinates = false,
      showVertexLabel = false,
      showVertexMax = false,
      showVertexMin = false,
      showIntegral = false,
      showIntegralLabel = false,
      showIntegralMax = false,
      showIntegralMin = false,
      contourColor = "grey",
      constraintColors = []
    }) {
      function fieldAt(p3) {
        const [a2, b2, c3] = field2;
        const [x2, y2] = p3;
        return Fix(a2 * x2 + b2 * y2 + c3, 1);
      }
      let vertices = FeasiblePolygon(...constraints2);
      let integrals = [];
      if (showIntegral || showIntegralMax || showIntegralMin) {
        integrals = FeasibleIntegral(...constraints2);
      }
      const pen = new Pen();
      let [[xmin, xmax], [ymin, ymax]] = ranges;
      let bound = 0.7;
      xmin -= bound;
      xmax += bound;
      ymin -= bound;
      ymax += bound;
      pen.range.set([xmin, xmax], [ymin, ymax]);
      pen.size.resolution(resolution);
      pen.axis.x("");
      pen.axis.y("");
      if (grid > 0) {
        pen.set.alpha(0.6);
        pen.grid.x(grid);
        pen.grid.y(grid);
        pen.set.alpha();
      }
      if (subGrid > 0) {
        pen.set.alpha(0.4);
        pen.grid.x(grid);
        pen.grid.y(grid);
        pen.set.alpha();
      }
      if (tick > 0) {
        pen.set.color("grey");
        pen.set.textSize(0.8);
        pen.tick.x(tick);
        pen.tick.y(tick);
        pen.set.color();
        pen.set.textSize();
      }
      function drawLines() {
        for (let i2 = 0; i2 < constraints2.length; i2++) {
          let [a2, b2, s3, c3] = constraints2[i2];
          if (!ineq(s3).canEqual())
            pen.set.dash([5, 5]);
          pen.set.color(constraintColors[i2] ?? "black");
          pen.graph.linear(a2, b2, -c3);
          pen.set.color();
          pen.set.dash();
        }
      }
      labelConstraints.push((x2, y2) => x2 > xmin);
      labelConstraints.push((x2, y2) => x2 < xmax);
      labelConstraints.push((x2, y2) => y2 > ymin);
      labelConstraints.push((x2, y2) => y2 < ymax);
      function labelField(p3) {
        pen.set.textAlign("left");
        pen.label.point(p3, fieldAt(p3).toString(), 60, 10);
        pen.set.textAlign();
      }
      function drawIntegral(label = false) {
        integrals.forEach((p3) => {
          pen.point(p3);
          if (label && labelConstraints.every((f3) => f3(...p3)))
            labelField(p3);
        });
      }
      function drawVertex(coordinates = false, label = false) {
        vertices.forEach((p3) => {
          pen.point(p3);
          if (coordinates)
            pen.label.coordinates(p3, 270);
          if (label && labelConstraints.every((f3) => f3(...p3)))
            labelField(p3);
        });
      }
      function drawShade() {
        pen.polyshade(...vertices);
      }
      function drawContour(value) {
        pen.graph.linear(field2[0], field2[1], field2[2] - value);
      }
      function drawContours(color = contourColor) {
        pen.set.color(color);
        contours.forEach(drawContour);
        pen.set.color();
      }
      function drawHighlight({
        point = [0, 0],
        color = "red",
        circle = true,
        contour = true,
        coordinates = true,
        label = true
      }) {
        pen.set.color(color);
        pen.point(point);
        if (circle)
          pen.circle(point, 5);
        if (contour)
          drawContour(fieldAt(point));
        if (coordinates)
          pen.label.coordinates(point, 270);
        if (label)
          labelField(point);
        pen.set.color();
      }
      function drawHighlights() {
        highlights.forEach((h2) => drawHighlight(h2));
      }
      if (showLine)
        drawLines();
      if (showIntegral)
        drawIntegral(showIntegralLabel);
      if (showShade)
        drawShade();
      if (showVertex)
        drawVertex(showVertexCoordinates, showVertexLabel);
      drawHighlights();
      drawContours();
      if (showVertexMax)
        drawHighlight({
          point: MaximizePoint(vertices, field2),
          color: "red"
        });
      if (showVertexMin)
        drawHighlight({
          point: MinimizePoint(vertices, field2),
          color: "blue"
        });
      if (showIntegralMax)
        drawHighlight({
          point: MaximizePoint(integrals, field2),
          color: "red"
        });
      if (showIntegralMin)
        drawHighlight({
          point: MinimizePoint(integrals, field2),
          color: "blue"
        });
      this.pen = pen;
    }
    DotPattern({ a: a2, p: p3, q: q2, n: n2, offset }) {
      const pen = new Pen();
      pen.range.set([-2, 30], [-4, 10]);
      pen.size.resolution(0.08);
      function drawRow(n3, j2, offset2 = 0) {
        for (let i2 = 1 + offset2; i2 <= n3 + offset2; i2++) {
          pen.point([i2, j2]);
        }
      }
      drawRow(a2 + (n2 - 1) * p3, 1);
      for (let j2 = 2; j2 <= n2; j2++) {
        drawRow(q2 + (n2 - j2) * p3, j2, (j2 - 1) * offset);
      }
      let m3 = "";
      if (n2 === 1)
        m3 = "1st";
      if (n2 === 2)
        m3 = "2nd";
      if (n2 === 3)
        m3 = "3rd";
      if (n2 >= 3)
        m3 = n2 + "th";
      pen.write([(1 + a2 + (n2 - 1) * p3) / 2, -1], m3 + " pattern");
      this.pen = pen;
    }
    PieChart({ categories, labels, angles, angleLabels, size = 2 }) {
      const pen = new Pen();
      pen.range.set([-1.2, 1.2], [-1.2, 1.2]);
      pen.size.set(size);
      pen.graph.circle([0, 0], 1);
      pen.set.angle("polar");
      let O2 = [0, 0];
      pen.line(O2, [1, 0]);
      let current = 0;
      for (let i2 = 0; i2 < angles.length; i2++) {
        let a2 = angles[i2];
        let next = current + a2;
        let mid5 = current + a2 / 2;
        pen.line(O2, PolToRect([1, next]));
        if (categories[i2] === "") {
          pen.write(PolToRect([0.7, mid5]), labels[i2]);
        } else if (labels[i2] === "") {
          pen.write(PolToRect([0.7, mid5]), categories[i2]);
        } else {
          pen.label.point(PolToRect([0.7, mid5]), categories[i2], 90, 10);
          pen.label.point(PolToRect([0.7, mid5]), labels[i2], 270, 10);
        }
        if (angleLabels[i2] !== void 0) {
          pen.angle(PolToRect([1, current]), O2, PolToRect([1, next]), angleLabels[i2] ?? angles[i2] + "\xB0");
        }
        current += a2;
      }
      this.pen = pen;
    }
    HeightChart({
      categories,
      data: data2,
      xLabel = "",
      yLabel = "",
      interval: interval2 = 5,
      subInterval = 1,
      barWidth = 1,
      barGap = 1,
      showBar = false,
      showLine = false
    }) {
      const pen = new Pen();
      let endGap = barWidth + barGap / 2;
      let width = endGap + categories.length * (barWidth + barGap) + endGap;
      let max = Max(...data2);
      let maxUnit = Ceil(max / interval2);
      let maxSubUnit = maxUnit * (interval2 / subInterval);
      let height = maxUnit * interval2 * 1.1;
      pen.range.set([-width * 0.5, width], [-height, height]);
      pen.size.resolution(0.2, 1.4 / height);
      pen.line([0, 0], [width, 0]);
      pen.arrow([0, 0], [0, height]);
      pen.set.textDir(90);
      pen.write([-1.5, height / 2], yLabel);
      pen.set.textDir();
      pen.label.point([width / 2, 0], xLabel, 270, 40);
      function grid(y2) {
        pen.line([0, y2], [width, y2]);
      }
      for (let y2 = 1; y2 <= maxUnit; y2++) {
        let h2 = y2 * interval2;
        pen.set.alpha(0.2);
        grid(h2);
        pen.cutY([0, h2]);
        pen.set.alpha();
        pen.label.point([0, h2], h2.toString(), 180);
      }
      for (let y2 = 1; y2 <= maxSubUnit; y2++) {
        pen.set.alpha(0.1);
        grid(y2 * subInterval);
        pen.set.alpha();
      }
      function bar(x2, w2, h2) {
        pen.set.color("grey");
        pen.polyfill([x2, 0], [x2, h2], [x2 + w2, h2], [x2 + w2, 0]);
        pen.set.color();
        pen.polygon([x2, 0], [x2, h2], [x2 + w2, h2], [x2 + w2, 0]);
      }
      function writeCat(x2, w2, text) {
        pen.label.point([x2 + w2 / 2, 0], text, 270, 15);
      }
      if (showBar) {
        for (let i2 = 0; i2 < categories.length; i2++) {
          let x2 = endGap + i2 * (barWidth + barGap) + barGap / 2;
          bar(x2, barWidth, data2[i2]);
          writeCat(x2, barWidth, categories[i2]);
        }
      }
      if (showLine) {
        let points = [];
        for (let i2 = 0; i2 < categories.length; i2++) {
          let x2 = endGap + i2 * (barWidth + barGap) + barGap / 2;
          let p3 = [x2 + barWidth / 2, data2[i2]];
          pen.point(p3);
          points.push(p3);
          writeCat(x2, barWidth, categories[i2]);
        }
        pen.set.weight(2);
        pen.polyline(...points);
        pen.set.weight();
      }
      this.pen = pen;
    }
    Boxplot({
      summary = [0, 0, 0, 0, 0],
      labels = [null, null, null, null, null],
      size = 2,
      tick = 1,
      start,
      end,
      showDash = false,
      showValue = false,
      showTick = false
    }) {
      const pen = new Pen();
      let [Q0, Q1, Q2, Q3, Q4] = summary;
      let height = showDash ? 1 : 0.5;
      let thickness = 1;
      let b2 = height;
      let t2 = b2 + thickness;
      let m3 = (b2 + t2) / 2;
      let L2 = [Q0, m3];
      let R2 = [Q4, m3];
      let A1 = [Q1, t2];
      let A2 = [Q1, b2];
      let Am = [Q1, m3];
      let B1 = [Q2, t2];
      let B2 = [Q2, b2];
      let C1 = [Q3, t2];
      let C2 = [Q3, b2];
      let Cm = [Q3, m3];
      let L_ = [Q0, 0];
      let R_ = [Q4, 0];
      let A_ = [Q1, 0];
      let B_ = [Q2, 0];
      let C_ = [Q3, 0];
      start ??= Q0 - (Q4 - Q0) * 0.2;
      end ??= Q4 + (Q4 - Q0) * 0.2;
      pen.range.set([start, end], [-(t2 + 1), t2 + 1]);
      pen.size.set(size, 1);
      if (showTick) {
        pen.tick.x(tick);
      }
      pen.axis.x("");
      pen.polygon(A1, A2, C2, C1);
      pen.line(B1, B2);
      pen.line(L2, Am);
      pen.line(R2, Cm);
      if (showDash) {
        pen.dash(L2, L_);
        pen.dash(A2, A_);
        pen.dash(B2, B_);
        pen.dash(C2, C_);
        pen.dash(R2, R_);
      }
      if (showValue) {
        pen.cutX(L_);
        pen.label.point(L_, labels[0] ?? String(Q0), 270);
        pen.cutX(A_);
        pen.label.point(A_, labels[1] ?? String(Q1), 270);
        pen.cutX(B_);
        pen.label.point(B_, labels[2] ?? String(Q2), 270);
        pen.cutX(C_);
        pen.label.point(C_, labels[3] ?? String(Q3), 270);
        pen.cutX(R_);
        pen.label.point(R_, labels[4] ?? String(Q4), 270);
      }
      this.pen = pen;
    }
    RegularPolygon({
      side: side2,
      diagonal = false,
      reflectional = false,
      rotational = false
    }) {
      const pen = new Pen();
      pen.range.square(1.3);
      pen.size.set(1.5);
      let gon = RegularPolygon(side2, [0, 0], 1, 0);
      pen.polygon(...gon);
      if (diagonal) {
        pen.set.alpha(0.3);
        for (let i2 = 0; i2 < side2; i2++) {
          for (let j2 = i2 + 1; j2 < side2; j2++) {
            pen.line(gon[i2], gon[j2]);
          }
        }
        pen.set.alpha();
      }
      if (reflectional) {
        pen.set.alpha(0.5);
        pen.set.dash(true);
        if (side2 % 2 === 0) {
          pen.set.color("red");
          for (let n2 = 0; n2 < side2; n2 += 2) {
            pen.graph.through([0, 0], PolToRect([1, n2 * 180 / side2]));
          }
          pen.set.color("blue");
          for (let n2 = 1; n2 < side2; n2 += 2) {
            pen.graph.through([0, 0], PolToRect([1, n2 * 180 / side2]));
          }
        } else {
          for (let n2 = 0; n2 < side2; n2++) {
            pen.graph.through([0, 0], PolToRect([1, n2 * 180 / side2]));
          }
        }
        pen.set.alpha();
        pen.set.dash();
      }
      if (rotational) {
        for (let i2 = 0; i2 < side2; i2++) {
          pen.line(gon[i2], [0, 0]);
        }
      }
      this.pen = pen;
    }
    TreeDiagram({
      titles,
      probabilities,
      events,
      select,
      circleSize
    }) {
      const pen = new Pen();
      pen.range.set([-5, 15], [-12, 12]);
      pen.size.resolution(0.12);
      function path(P2, Q2, prob2, event, selected, circle) {
        let T2 = MoveX(Q2, 2);
        pen.write(T2, event);
        pen.line(P2, Q2, prob2);
        if (selected) {
          pen.set.weight(3);
          pen.line(P2, Q2, prob2);
          if (circle)
            pen.halo(T2, circleSize ?? 30);
          pen.set.weight();
        }
      }
      function branch(C2, w2, h1, h2, prob2, [eventA, eventB], [selectedA, selectedB], circle, [title, titleHeight] = ["", 0]) {
        let D2 = MoveX(C2, w2);
        let probA;
        let probB;
        if (typeof prob2 === "number") {
          probA = String(Round(prob2, 5));
          probB = String(Round(1 - prob2, 5));
        } else {
          probA = prob2[0];
          probB = prob2[1];
        }
        let A1 = MoveY(C2, h1);
        let A2 = MoveY(D2, h2);
        path(A1, A2, probA, eventA, selectedA, circle);
        let B1 = MoveY(C2, -h1);
        let B2 = MoveY(D2, -h2);
        path(B1, B2, probB, eventB, selectedB, circle);
        if (title && titleHeight) {
          let M2 = Mid(C2, D2);
          let T2 = MoveY(M2, titleHeight);
          pen.write(T2, title);
        }
      }
      let s1 = select.includes(1);
      let s22 = select.includes(2);
      let s3 = select.includes(3);
      let s4 = select.includes(4);
      let [t1, t2] = titles;
      let [[p00], [p10, p11]] = probabilities;
      let [[e00], [e10, e11]] = events;
      branch([0, 0], 2, 2, 4, p00, e00, [s1 || s22, s3 || s4], false, [t1, 8]);
      branch([6, 4], 3, 1, 2, p10, e10, [s1, s22], true, [t2, 5]);
      branch([6, -4], 3, 1, 2, p11, e11, [s3, s4], true);
      this.pen = pen;
    }
  };

  // src/Pen/PhyPen.ts
  var PhyPenCls = class {
    pen;
    constructor() {
      this.pen = new Pen();
    }
    export(html, placeholder) {
      return this.pen.exportTrim(html, placeholder);
    }
    InclinedPlane({
      boxMid = 10,
      boxWidth = 3,
      boxHeight = 2,
      angle: angle2 = 25,
      angleLabel = "\u03B8",
      weight = 4,
      weightLabel = "mg",
      weightXLabel = "mg\\sin\u03B8",
      weightYLabel = "mg\\cos\u03B8",
      weightAngleLabel = true,
      normal = 3,
      normalLabel = "R",
      friction = 0,
      frictionLabel = "f",
      showForces = false,
      showWeightCompo = showForces
    }) {
      let O2 = [0, 0];
      let l3 = boxMid - boxWidth / 2;
      let r3 = boxMid + boxWidth / 2;
      let P2 = [l3, 0];
      let Q2 = MoveY(P2, boxHeight);
      let R2 = [r3, 0];
      let S2 = MoveY(R2, boxHeight);
      [P2, Q2, R2, S2] = [P2, Q2, R2, S2].map(($) => Rotate($, angle2, O2));
      let Z2 = [2 * r3, 0];
      let Y2 = Rotate(Z2, angle2, O2);
      let G2 = Mid(P2, Q2, R2, S2);
      let W2 = MoveY(G2, -weight);
      let N2 = Move(G2, 90 + angle2, normal);
      let g2 = friction > 0 ? P2 : Q2;
      let f3 = Move(g2, friction > 0 ? 180 + angle2 : angle2, Math.abs(friction));
      let pen = new Pen();
      pen.range.capture(O2, P2, Q2, R2, S2, N2, f3);
      pen.size.lock(1.3);
      pen.set.labelCenter(G2);
      pen.set.textLatex(true);
      pen.polygon(P2, Q2, S2, R2);
      pen.line(O2, Z2);
      pen.line(O2, Y2);
      pen.angle(Y2, O2, Z2, angleLabel);
      pen.set.weight(4);
      if (showForces) {
        pen.set.weight(3);
        pen.set.color("red");
        pen.arrow(G2, W2);
        pen.label.point(W2, weightLabel);
        pen.set.weight(3);
        pen.set.color("purple");
        pen.arrow(G2, N2);
        pen.label.point(N2, normalLabel);
        if (showWeightCompo) {
          pen.set.weight(2);
          pen.arrowCompo(G2, W2, angle2, weightXLabel);
          let a2;
          if (weightAngleLabel === true)
            a2 = angleLabel;
          if (weightAngleLabel === false)
            a2 = void 0;
          if (typeof weightAngleLabel === "string")
            a2 = weightAngleLabel;
          pen.arrowCompo(G2, W2, angle2 + 90, weightYLabel, a2);
        }
        if (friction !== 0) {
          pen.set.weight(3);
          pen.set.color("blue");
          pen.arrow(g2, f3);
          pen.label.point(f3, frictionLabel);
        }
      }
      this.pen = pen;
    }
    Projectile({
      speed,
      angle: angle2 = 0,
      time,
      arrowScale = 0.5,
      ground = false
    }) {
      let pen = new Pen();
      let ux = speed * cos(angle2);
      let uy = speed * sin(angle2);
      time ??= 2 * uy / 9.81;
      let x2 = (t2) => ux * t2;
      let y2 = (t2) => uy * t2 - 0.5 * 9.81 * t2 * t2;
      let O2 = [0, 0];
      let U2 = [ux * arrowScale, uy * arrowScale];
      let P2 = [x2(time), y2(time)];
      pen.range.capture(O2, U2, P2);
      pen.size.lock(1.5);
      pen.disc(O2, 5);
      pen.arrow(O2, U2);
      pen.set.color("grey");
      pen.plotDash((t2) => [x2(t2), y2(t2)], 0, time);
      pen.circle(P2, 5);
      if (ground) {
        pen.graph.horizontal(0);
      }
      this.pen = pen;
    }
    CarOnBankedRoad({
      carMid = 10,
      carWidth = 3,
      wheelHeight = 1,
      carHeight = 2,
      angle: angle2 = 25,
      angleLabel = "\u03B8",
      weight = 4,
      weightLabel = "mg",
      normal = 5,
      normalLabel = "R",
      friction = 0,
      frictionLabel = "f",
      showAllForces = false
    }) {
      let O2 = [0, 0];
      let l3 = carMid - carWidth / 2;
      let r3 = carMid + carWidth / 2;
      let A2 = [l3, 0];
      let B2 = [r3, 0];
      let P2 = MoveY(A2, wheelHeight);
      let Q2 = MoveY(P2, carHeight);
      let R2 = MoveY(B2, wheelHeight);
      let S2 = MoveY(R2, carHeight);
      [A2, B2, P2, Q2, R2, S2] = [A2, B2, P2, Q2, R2, S2].map(($) => Rotate($, angle2, O2));
      let Z2 = [2 * r3, 0];
      let Y2 = Rotate(Z2, angle2, O2);
      let G2 = Mid(P2, Q2, R2, S2);
      let W2 = MoveY(G2, -weight);
      let N2 = Move(G2, 90 + angle2, normal);
      let g2 = friction > 0 ? A2 : B2;
      let f3 = Move(g2, friction > 0 ? 180 + angle2 : angle2, Math.abs(friction));
      let pen = new Pen();
      pen.range.capture(O2, A2, B2, P2, Q2, R2, S2, N2, f3);
      pen.size.lock(1.3);
      pen.set.labelCenter(G2);
      pen.set.textLatex(true);
      pen.polygon(P2, Q2, S2, R2);
      pen.line(O2, Z2);
      pen.line(O2, Y2);
      pen.angle(Y2, O2, Z2, angleLabel);
      pen.set.weight(4);
      pen.line(A2, P2);
      pen.line(B2, R2);
      if (showAllForces) {
        pen.set.weight(3);
        pen.set.color("red");
        pen.set.lineLabel("left");
        pen.arrow(G2, W2, weightLabel);
        pen.set.lineLabel();
        pen.set.weight(3);
        pen.set.color("purple");
        pen.arrow(G2, N2);
        pen.label.point(N2, normalLabel);
        pen.set.weight(2);
        pen.arrowResolve(G2, N2, 90, [], angleLabel);
        if (friction !== 0) {
          pen.set.weight(3);
          pen.set.color("blue");
          pen.arrow(g2, f3);
          pen.label.point(f3, frictionLabel);
          pen.set.weight(2);
          pen.arrowResolve(g2, f3, 0, [], angleLabel);
        }
      }
      this.pen = pen;
    }
    AirplaneTurning({
      wingWidth = 7,
      planeRadius = 1,
      angle: angle2 = 35,
      angleLabel = "\u03B8",
      weight = 4,
      weightLabel = "mg",
      lift = 5,
      liftLabel = "L",
      showAllForces = false
    }) {
      let O2 = [0, 0];
      let P2 = [-wingWidth, 0];
      let Q2 = [+wingWidth, 0];
      [P2, Q2] = [P2, Q2].map(($) => Rotate($, angle2, O2));
      let W2 = MoveY(O2, -weight);
      let N2 = Move(O2, 90 + angle2, lift);
      let pen = new Pen();
      pen.range.capture(P2, Q2, W2, N2);
      pen.size.lock(1.3);
      pen.set.labelCenter(O2);
      pen.set.textLatex(true);
      pen.graph.circle(O2, planeRadius);
      pen.shade.circle(O2, planeRadius);
      pen.set.weight(3);
      pen.line(P2, Q2);
      pen.set.weight();
      pen.set.dash(true);
      pen.graph.horizontal(0);
      pen.set.dash();
      pen.angle(Q2, O2, [1, 0], angleLabel);
      if (showAllForces) {
        pen.set.weight(3);
        pen.set.color("red");
        pen.set.lineLabel("left");
        pen.arrow(O2, W2, weightLabel);
        pen.set.lineLabel();
        pen.set.weight(3);
        pen.set.color("purple");
        pen.arrow(O2, N2);
        pen.label.point(N2, liftLabel);
        pen.set.weight(2);
        pen.arrowResolve(O2, N2, 90, [], angleLabel);
      }
      this.pen = pen;
    }
    ConicalPendulum({
      bobRadius = 1,
      length = 15,
      angle: angle2 = 50,
      angleLabel = "\u03B8",
      weight = 7,
      weightLabel = "mg",
      tension = 10,
      tensionLabel = "T",
      showAllForces = false
    }) {
      let O2 = [0, 0];
      let P2 = Rotate([0, -length], angle2, O2);
      let V2 = [0, P2[1]];
      let W2 = MoveY(P2, -weight);
      let T2 = Move(P2, 90 + angle2, tension);
      let pen = new Pen();
      pen.set.border(0.3);
      pen.range.capture(O2, P2, V2, ReflectY(P2), W2);
      pen.size.lock(1.3);
      pen.set.textLatex(true);
      pen.set.color("grey");
      pen.plotDash((t2) => [P2[0] * cos(t2) + V2[0], 1 * sin(t2) + V2[1]], 0, 360);
      pen.set.color();
      pen.dash(O2, V2);
      pen.line(O2, P2);
      pen.fill.circle(P2, bobRadius);
      pen.angle(P2, O2, V2, angleLabel);
      if (showAllForces) {
        pen.set.color("red");
        pen.set.weight(3);
        pen.arrow(P2, W2, weightLabel);
        pen.set.color("blue");
        pen.arrow(P2, T2);
        pen.set.weight(2);
        pen.arrowResolve(P2, T2, 90, [], angleLabel);
        pen.set.weight();
        pen.label.point(T2, tensionLabel);
      }
      this.pen = pen;
    }
    SatelliteOrbit({
      planetRadius = 1.3,
      orbitRadius = 2,
      angle: angle2 = 30,
      showHeight = false
    }) {
      let pen = new Pen();
      let O2 = [0, 0];
      let P2 = PolToRect([orbitRadius, angle2]);
      let Q2 = PolToRect([orbitRadius, -angle2]);
      let A2 = [-planetRadius, 0];
      let B2 = PolToRect([planetRadius, angle2]);
      let C2 = [0, -planetRadius];
      pen.range.capture([O2, orbitRadius]);
      pen.size.set(1.2);
      pen.shade.circle(O2, planetRadius);
      pen.graph.circle(O2, planetRadius);
      pen.label.point(C2, "M", 270);
      pen.point(P2, "m");
      pen.point(O2);
      if (showHeight) {
        pen.set.color("red");
        pen.line(B2, P2, "h");
      }
      pen.set.color("blue");
      pen.line(O2, Q2, "r");
      pen.set.color("grey");
      pen.line(O2, A2, "R");
      pen.set.color();
      pen.set.dash(true);
      pen.graph.circle(O2, orbitRadius);
      this.pen = pen;
    }
  };

  // src/Pen/index.ts
  globalThis.Pen = PenCls;
  globalThis.AutoPen = AutoPenCls;
  globalThis.PhyPen = PhyPenCls;

  // src/Soil/tool/html.ts
  var QuestionHTML = class {
    body;
    constructor(html = "") {
      this.body = new DOMParser().parseFromString(html, "text/html").getElementsByTagName("body")[0];
    }
    export() {
      return this.body.innerHTML;
    }
    get li() {
      return [...this.body.getElementsByTagName("li")];
    }
    get ul() {
      return this.body.getElementsByTagName("ul")[0];
    }
    cloneLi(sourceIndex, repeat = 1) {
      for (let i2 = 1; i2 <= repeat; i2++) {
        this.ul.appendChild(this.li[sourceIndex].cloneNode(true));
      }
    }
    printInWhole(symbol, value) {
      this.body.innerHTML = PrintVariable(this.body.innerHTML, symbol, value);
    }
    printInLi(index, symbol, value) {
      let li = this.li[index];
      li.innerHTML = PrintVariable(li.innerHTML, symbol, value);
    }
    isLiDuplicated() {
      let htmls = this.li.map((x2) => x2.innerHTML.replace(/\s+/g, ""));
      return new Set(htmls).size !== htmls.length;
    }
    shuffleLi(shuffle2 = true) {
      let oldHTMLs = this.li.map((x2) => x2.innerHTML);
      let newHTMLs;
      if (shuffle2) {
        newHTMLs = RndShuffle(...oldHTMLs);
      } else {
        newHTMLs = [...oldHTMLs];
      }
      for (let i2 = 0; i2 < newHTMLs.length; i2++) {
        this.li[i2].innerHTML = newHTMLs[i2];
      }
      return oldHTMLs.map((x2) => newHTMLs.indexOf(x2));
    }
  };
  function PrintVariable(html, symbol, value) {
    let print = (signal, prefix, suffix = "") => {
      html = html.replace(new RegExp(prefix + symbol + suffix, "g"), () => ParseForPrint(value, signal));
    };
    print("*", "\\*\\*");
    print("/", "\\*\\/");
    print("//", "\\*\\/\\/");
    print("/()", "\\*\\/\\(", "\\)");
    print("()", "\\*\\(", "\\)");
    print("!", "\\*\\!");
    print("||", "\\*\\|", "\\|");
    print("+", "\\*\\^\\+\\_");
    print("-", "\\*\\^\\-\\_");
    print(">", "\\*\\^\\\\gt\\_");
    print("<", "\\*\\^\\\\lt\\_");
    print(">=", "\\*\\^\\\\ge\\_");
    print("<=", "\\*\\^\\\\le\\_");
    print("%", "\\*\\%");
    print("\\%", "\\*\\\\\\%");
    print(":", "\\*\\:");
    print("", "\\*");
    print("|.", "\\*\\|\\.");
    print(".", "\\*\\.");
    print("=", "\\*\\=");
    print("==", "\\*\\=\\=");
    print("=.", "\\*\\=\\.");
    print("==.", "\\*\\=\\=\\.");
    return html;
  }
  function numberDefault(num2) {
    let v3 = num2;
    if (owl.zero(v3))
      return 0;
    if (IsInteger(v3)) {
      v3 = Fix(v3, 0);
    } else {
      v3 = Math.abs(v3) > 100 ? Fix(v3, 2) : Round(v3, 5);
    }
    return v3;
  }
  function ParseForPrint(value, signal = "") {
    let T2 = typeof value;
    if (signal === "") {
      if (T2 === "number") {
        return String(numberDefault(value));
      }
      if (T2 === "boolean") {
        return value ? "\u2714" : "\u2718";
      }
      if (owl.quantity(value)) {
        let { val: val2, unit } = value;
        return String(numberDefault(val2)) + unit;
      }
      if (owl.point2D(value)) {
        return Coord(value);
      }
      if (owl.combo(value)) {
        return ink.printCombo(value);
      }
      if (owl.polynomial(value)) {
        return PolyPrint(value);
      }
      if (owl.trigValue(value)) {
        return ink.printTrigValue(value);
      }
      if (owl.trigExp(value)) {
        return ink.printTrigExp(value);
      }
      if (owl.constraint(value)) {
        return ink.printConstraint(value);
      }
      if (owl.constraints(value)) {
        return ink.printConstraints(value);
      }
    }
    if (signal === "*") {
      if (T2 === "number") {
        let v3 = cal.blur(Round(value, 3));
        let abs = Math.abs(v3);
        return String(abs >= 1e4 || abs <= 0.01 ? Sci(v3) : v3);
      }
      if (owl.quantity(value)) {
        let { val: val2, unit } = value;
        let v3 = cal.blur(Round(val2, 3));
        let abs = Math.abs(v3);
        return String(abs >= 1e4 || abs <= 0.01 ? Sci(v3) : v3) + unit;
      }
    }
    if (signal === "/") {
      if (T2 === "number") {
        let [p3, q2] = ToFrac(value);
        return Dfrac(p3, q2);
      }
    }
    if (signal === "/()") {
      if (T2 === "number") {
        let [p3, q2] = ToFrac(value);
        if (q2 === 1 && p3 >= 0)
          return Dfrac(p3, q2);
        if (q2 === 1 && p3 < 0)
          return "(" + Dfrac(p3, q2) + ")";
        return "\\left ( " + Dfrac(p3, q2) + " \\right )";
      }
    }
    if (signal === "//") {
      if (T2 === "number") {
        let [p3, q2] = ToFrac(value);
        return Dfrac(p3, q2).replace(/dfrac/g, "frac");
      }
    }
    if (signal === "()") {
      if (T2 === "number") {
        let v3 = numberDefault(value);
        return String(v3 >= 0 ? v3 : "(" + v3 + ")");
      }
    }
    if (signal === "!") {
      if (T2 === "number") {
        return ink.printSurd(value);
      }
      if (owl.point2D(value)) {
        let [a2, b2] = value;
        return "(" + ink.printSurd(a2) + "," + ink.printSurd(b2) + ")";
      }
    }
    if (signal === "+") {
      if (T2 === "number")
        return value >= 0 ? "+" : "-";
    }
    if (signal === "-") {
      if (T2 === "number")
        return value >= 0 ? "-" : "+";
    }
    if (signal === "||") {
      if (T2 === "number") {
        return String(numberDefault(Math.abs(value)));
      }
    }
    if (signal === ">") {
      if (T2 === "boolean")
        return value ? "\\gt" : "\\lt";
      if (T2 === "number")
        return value > 0 ? "\\gt" : value < 0 ? "\\lt" : "=";
    }
    if (signal === "<") {
      if (T2 === "boolean")
        return value ? "\\lt" : "\\gt";
      if (T2 === "number")
        return value > 0 ? "\\lt" : value < 0 ? "\\gt" : "=";
    }
    if (signal === ">=") {
      if (T2 === "boolean")
        return value ? "\\ge" : "\\le";
      if (T2 === "number")
        return value > 0 ? "\\ge" : value < 0 ? "\\le" : "=";
    }
    if (signal === "<=") {
      if (T2 === "boolean")
        return value ? "\\le" : "\\ge";
      if (T2 === "number")
        return value > 0 ? "\\le" : value < 0 ? "\\ge" : "=";
    }
    if (signal === "%") {
      if (T2 === "number") {
        return numberDefault(value * 100) + "%";
      }
    }
    if (signal === "\\%") {
      if (T2 === "number") {
        return numberDefault(value * 100) + "\\%";
      }
    }
    if (signal === ":") {
      if (owl.ntuple(value)) {
        return toNumbers(value).ratio().join(":");
      }
      if (T2 === "number") {
        let [p3, q2] = cal.toFraction(value);
        return p3 + ":" + q2;
      }
    }
    if (signal === "|.") {
      if (owl.array(value)) {
        return ink.printOrTrigRoots(value);
      }
    }
    if (signal === ".") {
      if (owl.point2D(value)) {
        return ink.printPointPolar(value);
      }
    }
    if (signal === "=") {
      if (owl.labeledValue(value)) {
        let v3 = [...value];
        v3[0] = numberDefault(v3[0]);
        return ink.printLabeledValue(v3, 1, false);
      }
    }
    if (signal === "==") {
      if (owl.labeledValue2(value)) {
        let v3 = [...value];
        v3[0] = numberDefault(v3[0]);
        return ink.printLabeledValue(v3, 2, false);
      }
    }
    if (signal === "=.") {
      if (owl.labeledValue(value)) {
        let v3 = [...value];
        v3[0] = numberDefault(v3[0]);
        return ink.printLabeledValue(v3, 1, true);
      }
    }
    if (signal === "==.") {
      if (owl.labeledValue2(value)) {
        let v3 = [...value];
        v3[0] = numberDefault(v3[0]);
        return ink.printLabeledValue(v3, 2, true);
      }
    }
    return String(value);
  }

  // src/Soil/tool/eval.ts
  function detectVarErr(e6) {
    if (e6 instanceof Error) {
      let isVarErr = e6.message === "Cannot convert a Symbol value to a number";
      if (isVarErr) {
        return CustomError("VariableError", "A variable is used before a value is defined.");
      } else {
        return e6;
      }
    }
    return e6;
  }
  function evaluate(code, context) {
    let {
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u,
      v,
      w,
      x,
      y,
      z,
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L,
      M,
      N,
      O,
      P,
      Q,
      R,
      S,
      T,
      U,
      V,
      W,
      X,
      Y,
      Z
    } = context.dict;
    let sections = context.sections;
    let answer = context.answer;
    let options = context.options;
    let shuffle = context.shuffle;
    let question = context.qn;
    let solution = context.sol;
    let result;
    try {
      result = eval(code);
    } catch (e6) {
      throw detectVarErr(e6);
    }
    if (typeof answer === "number")
      answer = ["A", "B", "C", "D"][answer];
    context.dict.update({
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u,
      v,
      w,
      x,
      y,
      z,
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L,
      M,
      N,
      O,
      P,
      Q,
      R,
      S,
      T,
      U,
      V,
      W,
      X,
      Y,
      Z
    });
    let newContext = {
      dict: context.dict,
      sections,
      answer,
      options,
      shuffle,
      qn: question,
      sol: solution
    };
    return { result, context: newContext };
  }
  function htmlDecode(str3) {
    return str3.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, (tag) => ({
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&#39;": "'",
      "&quot;": '"'
    })[tag] || tag);
  }
  function evalInline(code, dict) {
    code = htmlDecode(code);
    let {
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u,
      v,
      w,
      x,
      y,
      z,
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L,
      M,
      N,
      O,
      P,
      Q,
      R,
      S,
      T,
      U,
      V,
      W,
      X,
      Y,
      Z
    } = dict;
    try {
      return eval(code);
    } catch (e6) {
      throw detectVarErr(e6);
    }
  }
  function intrapolate2(html, dict2) {
    function intra(signal, prefix) {
      html = html.replace(new RegExp(String.raw`\*${prefix}\\\{([^\{\}]*)\\\}`, "g"), (match3, code2) => {
        let result2 = evalInline(code2, dict2);
        return ParseForPrint(result2, signal);
      });
      html = html.replace(new RegExp(String.raw`\*${prefix}\{([^\{\}]*)\}`, "g"), (match3, code2) => {
        let result2 = evalInline(code2, dict2);
        return ParseForPrint(result2, signal);
      });
    }
    intra("", "");
    intra("/", "\\/");
    intra("*", "\\*");
    return html;
  }

  // src/Soil/tool/section.ts
  function DropVersion(html, section, version) {
    let id = section + "." + version;
    return html.replace(new RegExp("<p>##" + id + "<\\/p>((\\s|\\S)(?!##))*<p>##<\\/p>", "g"), "");
  }
  function DropTags(html) {
    html = html.replace(new RegExp("<[^#<]*##[^#>]*>", "g"), "");
    return html;
  }
  function KeepVersion(html, section, version) {
    for (let i2 = 0; i2 < 10; i2++) {
      if (i2 === version)
        continue;
      html = DropVersion(html, section, i2);
    }
    return html;
  }
  function ExecSection(html, sections2, dict2) {
    for (let i2 = 0; i2 < sections2.length; i2++) {
      let [section, version] = sections2[i2];
      html = KeepVersion(html, section.toString(), version);
    }
    html = DropCondition(html, dict2);
    html = DropTags(html);
    return html;
  }
  function DropCondition(html, dict2) {
    return html.replace(new RegExp("<p>##{([^{}]*)}<\\/p>((\\s|\\S)(?!##))*<p>##<\\/p>", "g"), (match3, p1) => evalInline(p1, dict2) ? match3 : "");
  }

  // src/Soil/tool/dress.ts
  function or2(...reg) {
    return "(" + reg.join("|") + ")";
  }
  var s2 = String.raw`(?:\s|&nbsp;)*`;
  var p2 = String.raw`\+`;
  var m2 = String.raw`\-`;
  var e5 = String.raw`(?:\=|\>|\<|&lt;|&gt;|\\ge|\\le|\\gt|\\lt)`;
  var l2 = String.raw`[\(\[\{]`;
  var r2 = String.raw`[\)\]\}]`;
  var pl = String.raw`[\(\[]`;
  var pr = String.raw`[\)\]]`;
  var c2 = String.raw`\,`;
  var v2 = String.raw`(?:[A-Za-z]|\\alpha|\\beta|\\theta|\\phi|\\pi|\\sigma|\\mu|α|β|θ|φ|μ|π|σ)`;
  var f2 = String.raw`(?:\\sin|\\cos|\\tan|\\log|\\ln)`;
  var sl = String.raw`\\`;
  var left = String.raw`\\left`;
  var sq2 = String.raw`\\sqrt`;
  var endtag = String.raw`(?=[^<>]*</span>)`;
  function regReplace(input, reg, replace) {
    return input.replace(new RegExp(reg, "g"), replace);
  }
  function handleSigns(input) {
    input = regReplace(input, p2 + s2 + m2, "-");
    input = regReplace(input, m2 + s2 + p2, "-");
    input = regReplace(input, or2(l2, e5, c2) + s2 + m2 + s2 + m2, "$1");
    input = regReplace(input, "(,)" + s2 + m2 + s2 + m2, "$1");
    input = regReplace(input, m2 + s2 + m2, "+");
    input = regReplace(input, m2 + s2 + m2, "+");
    return input;
  }
  function handlePower(input) {
    input = regReplace(input, String.raw`\^\{1\}`, "");
    return input;
  }
  function handleSqrt(input) {
    input = regReplace(input, String.raw`\\sqrt\[2\]`, "\\sqrt");
    return input;
  }
  function handleCoeff(input) {
    input = regReplace(input, or2(p2, m2, e5, l2, sl, r2, c2) + s2 + 1 + s2 + or2(v2, f2, pl, left, sq2) + endtag, "$1 $2");
    return input;
  }
  function handlePrime(input) {
    input = regReplace(input, "(" + v2 + ")'" + endtag, "$1 \\prime ");
    return input;
  }
  function dress(html) {
    html = handleSigns(html);
    html = handlePower(html);
    html = handleSqrt(html);
    html = handleCoeff(html);
    html = handlePrime(html);
    return html;
  }

  // src/Soil/tool/shuffle.ts
  var OptionShuffler = class {
    constructor(qn, sol, ans, shuffle2) {
      this.qn = qn;
      this.sol = sol;
      this.ans = ans;
      this.shuffle = shuffle2;
      this.Qn = new QuestionHTML(qn);
      if (!this.Qn.ul)
        return;
      if (this.Qn.li.length === 0)
        return;
      this.valid = true;
    }
    perm = [];
    valid = false;
    Qn;
    AreOptionsDuplicated() {
      return this.Qn.isLiDuplicated();
    }
    genQn() {
      if (!this.valid)
        return this.qn;
      this.perm = this.Qn.shuffleLi(this.shuffle);
      return this.Qn.export();
    }
    mapLetter(oldLetter) {
      let oldIndex = ["A", "B", "C", "D", "E", "F"].indexOf(oldLetter);
      let newIndex = this.perm[oldIndex];
      return ["A", "B", "C", "D", "E", "F"][newIndex];
    }
    genAns() {
      if (!this.valid)
        return "X";
      return this.mapLetter(this.ans);
    }
    genSol() {
      if (!this.valid)
        return this.sol;
      let newSol = "<p>Answer: " + this.genAns() + "</p><p><b>Solution:</b></p>" + this.sol;
      let ansList = ["A", "B", "C", "D", "E", "F"];
      ansList.length = this.perm.length;
      for (let x2 of ansList) {
        newSol = newSol.replace(new RegExp("{#" + x2 + "}", "g"), this.mapLetter(x2));
      }
      return newSol;
    }
  };

  // src/Soil/tool/option.ts
  function Produce(source, assigned) {
    return Array.isArray(assigned) && assigned !== source ? RndShuffle(...assigned) : RndShake(source);
  }
  function ExecInstructions(instructions, source) {
    let products = {};
    let k2;
    for (k2 in instructions) {
      products[k2] = Produce(source[k2], instructions[k2]);
    }
    return products;
  }
  function AutoOptions(instructions, question2, source) {
    if (owl.emptyObject(instructions))
      return question2;
    let Qn = new QuestionHTML(question2);
    let products = ExecInstructions(instructions, source);
    if (Qn.li.length === 1) {
      Qn.cloneLi(0, 3);
      for (let k2 in products) {
        Qn.printInLi(1, k2, products[k2][0]);
        Qn.printInLi(2, k2, products[k2][1]);
        Qn.printInLi(3, k2, products[k2][2]);
      }
      return Qn.export();
    }
    if (Qn.li.length === 2) {
      Qn.cloneLi(0);
      Qn.cloneLi(1);
      for (let k2 in products) {
        Qn.printInLi(2, k2, products[k2][0]);
        Qn.printInLi(3, k2, products[k2][0]);
      }
      return Qn.export();
    }
    return question2;
  }

  // src/Soil/cls.ts
  var Config = class {
    constructor(sections2 = [], answer2 = "A", options2 = {}, shuffle2 = true) {
      this.sections = sections2;
      this.answer = answer2;
      this.options = options2;
      this.shuffle = shuffle2;
    }
  };
  var Dict = class {
    constructor(a2 = Symbol(), b2 = Symbol(), c3 = Symbol(), d2 = Symbol(), e6 = Symbol(), f3 = Symbol(), g2 = Symbol(), h2 = Symbol(), i2 = Symbol(), j2 = Symbol(), k2 = Symbol(), l3 = Symbol(), m3 = Symbol(), n2 = Symbol(), o2 = Symbol(), p3 = Symbol(), q2 = Symbol(), r3 = Symbol(), s3 = Symbol(), t2 = Symbol(), u2 = Symbol(), v3 = Symbol(), w2 = Symbol(), x2 = Symbol(), y2 = Symbol(), z2 = Symbol(), A2 = Symbol(), B2 = Symbol(), C2 = Symbol(), D2 = Symbol(), E2 = Symbol(), F2 = Symbol(), G2 = Symbol(), H2 = Symbol(), I2 = Symbol(), J2 = Symbol(), K2 = Symbol(), L2 = Symbol(), M2 = Symbol(), N2 = Symbol(), O2 = Symbol(), P2 = Symbol(), Q2 = Symbol(), R2 = Symbol(), S2 = Symbol(), T2 = Symbol(), U2 = Symbol(), V2 = Symbol(), W2 = Symbol(), X2 = Symbol(), Y2 = Symbol(), Z2 = Symbol()) {
      this.a = a2;
      this.b = b2;
      this.c = c3;
      this.d = d2;
      this.e = e6;
      this.f = f3;
      this.g = g2;
      this.h = h2;
      this.i = i2;
      this.j = j2;
      this.k = k2;
      this.l = l3;
      this.m = m3;
      this.n = n2;
      this.o = o2;
      this.p = p3;
      this.q = q2;
      this.r = r3;
      this.s = s3;
      this.t = t2;
      this.u = u2;
      this.v = v3;
      this.w = w2;
      this.x = x2;
      this.y = y2;
      this.z = z2;
      this.A = A2;
      this.B = B2;
      this.C = C2;
      this.D = D2;
      this.E = E2;
      this.F = F2;
      this.G = G2;
      this.H = H2;
      this.I = I2;
      this.J = J2;
      this.K = K2;
      this.L = L2;
      this.M = M2;
      this.N = N2;
      this.O = O2;
      this.P = P2;
      this.Q = Q2;
      this.R = R2;
      this.S = S2;
      this.T = T2;
      this.U = U2;
      this.V = V2;
      this.W = W2;
      this.X = X2;
      this.Y = Y2;
      this.Z = Z2;
    }
    variables = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ];
    update(other) {
      for (let key of this.variables) {
        if (key in other)
          this[key] = other[key];
      }
    }
    checked() {
      for (let key of this.variables) {
        let v3 = this[key];
        if (v3 === void 0 || typeof v3 === "number" && !Number.isFinite(v3))
          return false;
      }
      return true;
    }
    substitute(text) {
      for (let key of this.variables) {
        let num2 = this[key];
        if (typeof num2 === "symbol")
          continue;
        text = PrintVariable(text, key, num2);
      }
      return text;
    }
  };

  // src/Soil/soil.ts
  var import_auto_render = __toESM(require_auto_render());
  function katex(html) {
    let ele = document.createElement("div");
    ele.innerHTML = html;
    (0, import_auto_render.default)(ele);
    let T2 = ele.innerHTML;
    ele.remove();
    return T2;
  }
  var Timer = class {
    constructor(limit) {
      this.limit = limit;
    }
    start = Date.now();
    elapsed() {
      return (Date.now() - this.start) / 1e3;
    }
    over() {
      return this.elapsed() > this.limit;
    }
    check() {
      if (this.over())
        throw CustomError("TimeoutError", "running too long: > " + this.limit + "s");
    }
  };
  var ErrorLogger = class {
    pile = [];
    add(e6) {
      let err2 = toError(e6);
      this.pile.push("[" + err2.name + "] " + err2.message);
    }
    readHtml(delimiter) {
      return this.pile.map(($) => $.replaceAll("\n", "<br/>")).join(delimiter);
    }
    logs() {
      return [...this.pile];
    }
    html() {
      let text = this.readHtml("<br/><br/>");
      let len = text.length;
      if (len > 1e3)
        text = text.substring(0, 1e3) + ` ... (${len} chars)`;
      return text;
    }
    lastLogHtml() {
      return this.pile[this.pile.length - 1].replaceAll("\n", "<br/>");
    }
  };
  var Soil = class {
    constructor(gene) {
      this.gene = gene;
      this.reset();
    }
    qn = "";
    sol = "";
    dict = new Dict();
    config = new Config();
    counter = 0;
    timer = new Timer(10);
    logger = new ErrorLogger();
    reset() {
      this.qn = this.gene.qn;
      this.sol = this.gene.sol;
      this.dict = new Dict();
      this.config = new Config();
    }
    evalCode(code2) {
      let { result: result2, context: context2 } = evaluate(code2, {
        dict: this.dict,
        sections: this.config.sections,
        answer: this.config.answer,
        options: this.config.options,
        shuffle: this.config.shuffle,
        qn: this.qn,
        sol: this.sol
      });
      this.dict = context2.dict;
      this.config = {
        sections: context2.sections,
        answer: context2.answer,
        options: context2.options,
        shuffle: context2.shuffle
      };
      this.qn = context2.qn;
      this.sol = context2.sol;
      return result2;
    }
    pushDict() {
      this.counter++;
      this.evalCode(this.gene.populate);
    }
    isValidated() {
      let v3 = this.gene.validate;
      if (v3 === "")
        return true;
      v3 = v3.replace("\n", " ");
      return this.evalCode(v3) === true;
    }
    runPopulate() {
      while (this.counter <= 1e3) {
        this.timer.check();
        try {
          this.pushDict();
          if (!this.dict.checked())
            throw CustomError("PopulationError", "Dict Check Failed.");
          if (!this.isValidated())
            throw CustomError("PopulationError", "Cannot pass validate.");
          return true;
        } catch (e6) {
          if (e6 instanceof Error) {
            switch (e6.name) {
              case "ContractError":
                this.logger.add(e6);
                break;
              case "MathError":
                this.logger.add(e6);
                break;
              case "PopulationError":
                this.logger.add(e6);
                break;
              default:
                throw e6;
            }
          } else {
            throw e6;
          }
        }
      }
      ;
      throw CustomError("PopulationError", "No population found after 1000 trials!");
    }
    runSection() {
      this.qn = ExecSection(this.qn, this.config.sections, this.dict);
      this.sol = ExecSection(this.sol, this.config.sections, this.dict);
      return true;
    }
    runPreprocess() {
      this.evalCode(this.gene.preprocess);
      return true;
    }
    runOption() {
      let nTrial = 0;
      while (nTrial <= 100) {
        nTrial++;
        try {
          this.qn = AutoOptions(this.config.options, this.qn, this.dict);
          return true;
        } catch (e6) {
          this.logger.add(e6);
          continue;
        }
      }
      ;
      throw CustomError("OptionError", "No valid option generated after 100 trials");
    }
    runIntrapolate() {
      this.qn = intrapolate2(this.qn, this.dict);
      this.sol = intrapolate2(this.sol, this.dict);
      return true;
    }
    runSubstitute() {
      this.qn = this.dict.substitute(this.qn);
      this.sol = this.dict.substitute(this.sol);
      this.qn = dress(this.qn);
      this.sol = dress(this.sol);
      return true;
    }
    runPostprocess() {
      this.evalCode(this.gene.postprocess);
      return true;
    }
    runShuffle() {
      let shuffler = new OptionShuffler(this.qn, this.sol, this.config.answer, this.config.shuffle);
      if (shuffler.AreOptionsDuplicated()) {
        this.logger.add(CustomError("ShuffleError", "Duplicated options found!"));
        return false;
      }
      this.qn = shuffler.genQn();
      this.sol = shuffler.genSol();
      this.config.answer = shuffler.genAns();
      return true;
    }
    runKatex() {
      this.qn = katex(this.qn);
      this.sol = katex(this.sol);
      return true;
    }
    successFruit() {
      return {
        qn: this.qn,
        sol: this.sol,
        ans: this.config.answer,
        counter: this.counter,
        success: true,
        logs: this.logger.logs(),
        time: this.timer.elapsed()
      };
    }
    errorFruit() {
      return {
        qn: "Error!<br/>" + this.logger.lastLogHtml(),
        sol: this.logger.html(),
        ans: "X",
        counter: this.counter,
        success: false,
        logs: this.logger.logs(),
        time: this.timer.elapsed()
      };
    }
    nurture() {
      try {
        do {
          this.reset();
          this.runPopulate();
          this.runSection();
          this.runPreprocess();
          this.runOption();
          this.runIntrapolate();
          this.runSubstitute();
          this.runPostprocess();
          if (!this.runShuffle())
            continue;
          this.runKatex();
          break;
        } while (true);
        return this.successFruit();
      } catch (e6) {
        this.logger.add(e6);
        return this.errorFruit();
      }
    }
  };

  // src/Soil/index.ts
  var MathSoilCls = class {
    reap(seed) {
      let soil = new Soil(seed.gene);
      return soil.nurture();
    }
    grow(seed) {
      seed.fruit = this.reap(seed);
    }
    growAll(seeds) {
      seeds.forEach((x2) => this.grow(x2));
    }
    test(seed, repeat = 100) {
      let counters = [];
      for (let i2 = 1; i2 <= repeat; i2++) {
        this.grow(seed);
        if (!seed.fruit.success)
          return;
        counters.push(seed.fruit.counter);
      }
      seed.fruit.counter = Mean(...counters);
    }
  };
  var MathSoil = new MathSoilCls();
  globalThis.MathSoil = MathSoil;
  var MathSoil2Cls = class {
    reap(gene) {
      let soil = new Soil(gene);
      return soil.nurture();
    }
    inspect(gene, repeat) {
      let counters = [];
      let times = [];
      for (let i2 = 1; i2 <= repeat; i2++) {
        let fruit = this.reap(gene);
        if (!fruit.success)
          return {
            counter: 0,
            success: false,
            logs: fruit.logs,
            time: 0
          };
        counters.push(fruit.counter);
        times.push(fruit.time);
      }
      return {
        counter: Mean(...counters),
        success: true,
        logs: [],
        time: Mean(...times)
      };
    }
  };
  var MathSoil2 = new MathSoil2Cls();
  globalThis.MathSoil2 = MathSoil2;

  // src/index.ts
  function at(n2) {
    n2 = Math.trunc(n2) || 0;
    if (n2 < 0)
      n2 += this.length;
    if (n2 < 0 || n2 >= this.length)
      return void 0;
    return this[n2];
  }
  var TypedArray = Reflect.getPrototypeOf(Int8Array);
  for (const C2 of [Array, String, TypedArray]) {
    Object.defineProperty(C2.prototype, "at", {
      value: at,
      writable: true,
      enumerable: false,
      configurable: true
    });
  }
})();
