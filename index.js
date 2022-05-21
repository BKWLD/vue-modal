module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("body-scroll-lock");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_stylus_loader_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=6de5ab34&lang=pug&
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "modal",
      staticClass: "bvm-modal",
      attrs: {
        tabindex: "-1",
        role: "dialog",
        id: "modal",
        "aria-modal": "true",
      },
    },
    [
      _c("transition", { attrs: { name: _vm.bkgTransition, appear: "" } }, [
        _vm.isOpen ? _c("div", { staticClass: "bvm-background" }) : _vm._e(),
      ]),
      _vm.isOpen && _vm.closeable
        ? _c("div", {
            staticClass: "bvm-background-hitbox",
            on: { click: _vm.close },
          })
        : _vm._e(),
      _c(
        "transition",
        {
          attrs: { name: _vm.transition, appear: "" },
          on: { "after-leave": _vm.remove },
        },
        [
          _vm.isOpen
            ? _c(
                "div",
                { staticClass: "bvm-slot", class: "type-" + _vm.type },
                [
                  _vm.closeable
                    ? _c(
                        "button",
                        {
                          staticClass: "bvm-close",
                          attrs: { "aria-label": "Close", role: "button" },
                          on: { click: _vm.close },
                        },
                        [
                          _vm._t("close-button", function () {
                            return [
                              _c("div", {
                                staticClass: "icon-close",
                                attrs: { "aria-hidden": "true" },
                              }),
                            ]
                          }),
                        ],
                        2
                      )
                    : _vm._e(),
                  _c(
                    "div",
                    { ref: "scrollable", staticClass: "bvm-contents" },
                    [
                      _vm._t("default", null, {
                        open: _vm.open,
                        close: _vm.close,
                      }),
                    ],
                    2
                  ),
                ]
              )
            : _vm._e(),
        ]
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./index.vue?vue&type=template&id=6de5ab34&lang=pug&

// EXTERNAL MODULE: external "body-scroll-lock"
var external_body_scroll_lock_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/coffee-loader!./node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=coffee&

/* harmony default export */ var lib_vue_loader_options_indexvue_type_script_lang_coffee_ = ({
  name: 'VueModal',
  props: {
    // Add .type-* class for styling
    type: {
      type: String,
      default: 'compact'
    },
    // Click outside the modal to close it
    closeable: {
      type: Boolean,
      default: true
    },
    // Destroy this component when the modal closes
    removeOnClose: {
      type: Boolean,
      default: true
    },
    // Whether the modal is open by default
    openOnMount: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: 'slide-up'
    },
    bkgTransition: {
      type: String,
      default: 'fade'
    }
  },
  data: function () {
    return {
      isOpen: this.openOnMount,
      focusableElements: null,
      focusableContent: null,
      lastFocusableElement: null
    };
  },
  mounted: function () {
    if (this.openOnMount) {
      return this.open();
    }
  },
  methods: {
    // Open the modal, setup listeners
    open: function () {
      var nuxt; // NUXT SPECIFIC: Add aria-hidden to the nuxt element.
      // This is a sibling of the mounted component.
      // Adding aria-hidden whilst the modal is open allows
      // ios voiceover to only read the contents of the modal.
      // When the modal is closed, we'll remove this hidden attr.
      // https://stackoverflow.com/questions/53561764/trap-focus-with-in-popup-modal-only-ios-voiceover

      nuxt = document.querySelector('#__nuxt');
      nuxt.setAttribute('aria-hidden', 'true'); // Tell others about its opening

      this.$emit('open');
      this.isOpen = true; // Wait a tick before doing things that require refs

      return setTimeout(() => {
        // Disable body scroll
        Object(external_body_scroll_lock_["disableBodyScroll"])(this.$refs.scrollable); // Establish a trap focus within the modal

        return this.setupTrapFocus;
      }, 0);
    },
    // Close the modal, clean up listeners
    close: function () {
      var nuxt; // remove the key press listener

      document.removeEventListener('keydown', this.onKeyDown); // remove the scroll locks

      Object(external_body_scroll_lock_["clearAllBodyScrollLocks"])(); // NUXT SPECIFIC: Remove aria-hidden attribute

      nuxt = document.querySelector('#__nuxt');
      nuxt.removeAttribute('aria-hidden', 'false'); // Tell others about its closing

      this.$emit('close'); // set isOpen to false

      return this.isOpen = false;
    },
    // Remove the modal after the transition ends
    remove: function () {
      if (!this.removeOnClose) {
        return;
      }

      this.$el.remove();
      return this.$destroy();
    },
    setupTrapFocus: function () {
      this.modal = this.$refs.modal;
      this.focusableElements = 'button, [href], input, [tabindex]:not([tabindex="-1"])';
      this.firstFocusableElement = this.modal.querySelectorAll(this.focusableElements)[0];
      this.focusableContent = this.modal.querySelectorAll(this.focusableElements);
      this.lastFocusableElement = this.focusableContent[this.focusableContent.length - 1]; // if focus elements found, then add listener
      // and focus the first one

      if (this.focusableContent.length) {
        document.addEventListener('keydown', this.onKeyDown);
        return this.firstFocusableElement.focus();
      }
    },
    onKeyDown: function (e) {
      var isTabPressed;
      isTabPressed = e.key === 'Tab' || e.keyCode === 9;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === this.firstFocusableElement) {
          this.lastFocusableElement.focus();
          return e.preventDefault();
        }
      } else {
        if (document.activeElement === this.lastFocusableElement) {
          this.firstFocusableElement.focus();
          return e.preventDefault();
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./index.vue?vue&type=script&lang=coffee&
 /* harmony default export */ var indexvue_type_script_lang_coffee_ = (lib_vue_loader_options_indexvue_type_script_lang_coffee_); 
// EXTERNAL MODULE: ./index.vue?vue&type=style&index=0&lang=stylus&
var indexvue_type_style_index_0_lang_stylus_ = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./index.vue






/* normalize component */

var component = normalizeComponent(
  indexvue_type_script_lang_coffee_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "index.vue"
/* harmony default export */ var index = __webpack_exports__["default"] = (component.exports);

/***/ })
/******/ ]);