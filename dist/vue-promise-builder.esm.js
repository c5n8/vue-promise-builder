var script = {
  name: 'PromiseBuilder',
  props: {
    promise: {
      type: Promise,
      default: null
    }
  },

  data() {
    return {
      error: undefined,
      result: undefined,
      status: 'standby'
    };
  },

  computed: {
    isStandby() {
      return this.status === 'standby';
    },

    isPending() {
      return this.status === 'pending';
    },

    isSettled() {
      return this.status === 'fulfilled' || this.status === 'rejected';
    },

    isFulfilled() {
      return this.isSettled ? this.status === 'fulfilled' : undefined;
    },

    isRejected() {
      return this.isSettled ? this.status === 'rejected' : undefined;
    },

    hasResult() {
      return this.isSettled ? this.result != null : undefined;
    },

    hasError() {
      return this.isSettled ? this.error != null : undefined;
    }

  },
  watch: {
    promise: {
      immediate: true,

      async handler(promise) {
        this.error = undefined;
        this.result = undefined;

        if (promise == null) {
          this.status = 'standby';
          return;
        }

        this.status = 'pending';
        let result;

        try {
          result = await promise;
        } catch (error) {
          this.error = error;
          this.status = 'rejected';
          return;
        }

        this.error = null;
        this.result = result;
        this.status = 'fulfilled';
      }

    }
  },

  render() {
    return this.$scopedSlots.default({
      error: this.error,
      result: this.result,
      status: this.status,
      isStandby: this.isStandby,
      isPending: this.isPending,
      isFulfilled: this.isFulfilled,
      isRejected: this.isRejected,
      isSettled: this.isSettled,
      hasResult: this.hasResult,
      hasError: this.hasError
    });
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = undefined;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  PromiseBuilder: __vue_component__
});

// Import vue components

const install = function installVuePromiseBuilder(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as PromiseBuilder };
