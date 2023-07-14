import { c as create_ssr_component, e as escape } from "../ssr.js";
import "@inertiajs/core";
import "lodash.isequal";
import "@inertiajs/core/server";
const Counter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { count } = $$props;
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  return `<h1 class="bg-gradient-to-r from-slate-50 to-black bg-clip-text text-5xl font-medium text-transparent" data-svelte-h="svelte-1dkcbdw">rjrgjjfjfjfjfjfjfjfjfj</h1> <button class="bg-cyan-300 p-3 m-4 text-center rounded-full">${escape(count)}</button> <a href="/" data-svelte-h="svelte-1qolegq">go to /</a> <h1 class="text-8xl bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500 font-extrabold text-transparent" data-svelte-h="svelte-1w69x3s">Tailwind CSS</h1>`;
});
export {
  Counter as default
};
