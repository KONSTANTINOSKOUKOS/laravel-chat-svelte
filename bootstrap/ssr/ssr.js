import { router, setupProgress } from "@inertiajs/core";
import "lodash.isequal";
import createServer from "@inertiajs/core/server";
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store2, ...callbacks) {
  if (store2 == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store2.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_store_value(store2, ret, value) {
  store2.set(value);
  return ret;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css) => css.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store2, i) => subscribe(
        store2,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
const store = writable({
  component: null,
  layout: [],
  page: {},
  key: null
});
const h = (component, props, children) => {
  return {
    component,
    ...props ? { props } : {},
    ...children ? { children } : {}
  };
};
const Render = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  let { component } = $$props;
  let { props = {} } = $$props;
  let { children = [] } = $$props;
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  $$unsubscribe_store();
  return `${$store.component ? `${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({}, props), {}, {
    default: () => {
      return `${each(children, (child, index) => {
        return `${validate_component(Render, "svelte:self").$$render($$result, Object.assign({}, child), {}, {})}`;
      })}`;
    }
  })}` : ``}`;
});
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let child;
  let layout;
  let components;
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  child = $store.component && h($store.component.default, $store.page.props);
  layout = $store.component && $store.component.layout;
  components = layout ? Array.isArray(layout) ? layout.concat(child).reverse().reduce((child2, layout2) => h(layout2, $store.page.props, [child2])) : h(layout, $store.page.props, [child]) : child;
  $$unsubscribe_store();
  return `${validate_component(Render, "Render").$$render($$result, Object.assign({}, components), {}, {})}`;
});
const SSR = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id, initialPage } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.initialPage === void 0 && $$bindings.initialPage && initialPage !== void 0)
    $$bindings.initialPage(initialPage);
  return `<div data-server-rendered="true"${add_attribute("id", id, 0)}${add_attribute("data-page", JSON.stringify(initialPage), 0)}>${validate_component(App, "App").$$render($$result, {}, {}, {})}</div>`;
});
async function createInertiaApp({ id = "app", resolve, setup, progress = {}, page: page2 }) {
  const isServer = typeof window === "undefined";
  const el = isServer ? null : document.getElementById(id);
  const initialPage = page2 || JSON.parse(el.dataset.page);
  const resolveComponent = (name) => Promise.resolve(resolve(name));
  await resolveComponent(initialPage.component).then((initialComponent) => {
    store.set({
      component: initialComponent,
      page: initialPage
    });
  });
  if (!isServer) {
    router.init({
      initialPage,
      resolveComponent,
      swapComponent: async ({ component, page: page3, preserveState }) => {
        store.update((current) => ({
          component,
          page: page3,
          key: preserveState ? current.key : Date.now()
        }));
      }
    });
    if (progress) {
      setupProgress(progress);
    }
    return setup({
      el,
      App,
      props: {
        initialPage,
        resolveComponent
      }
    });
  }
  if (isServer) {
    const { html, head } = SSR.render({ id, initialPage });
    return {
      body: html,
      head: [head]
    };
  }
}
const page = derived(store, ($store) => $store.page);
createServer(
  (page2) => createInertiaApp({
    page: page2,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Chat.svelte": () => import("./assets/Chat-e006cd28.js"), "./Pages/Counter.svelte": () => import("./assets/Counter-f4f25748.js"), "./Pages/Login.svelte": () => import("./assets/Login-402bbe55.js"), "./Pages/Register.svelte": () => import("./assets/Register-d54206d0.js") });
      return pages[`./Pages/${name}.svelte`]();
    }
  })
);
export {
  add_attribute as a,
  set_store_value as b,
  create_ssr_component as c,
  each as d,
  escape as e,
  page as p,
  subscribe as s,
  validate_component as v,
  writable as w
};
