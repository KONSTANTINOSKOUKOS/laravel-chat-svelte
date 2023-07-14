import { c as create_ssr_component, s as subscribe, a as add_attribute, e as escape } from "../ssr.js";
import "@inertiajs/core";
import { u as useForm } from "./useForm-b0b71230.js";
import "lodash.isequal";
import "@inertiajs/core/server";
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let form = useForm({ email: "", password: "", remember: false });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_form();
  return `${$$result.head += `<!-- HEAD_svelte-rn96kv_START -->${$$result.title = `<title>Log into the Chat</title>`, ""}<meta name="description" content="Page where you can login into the chat"><!-- HEAD_svelte-rn96kv_END -->`, ""} <div class="flex min-h-screen"><form method="post" class="card card-bordered gap-7 py-7 bg-base-200 max-w-fit m-auto"><div class="card-body gap-3 py-0"><label class="label gap-5">Email: <input required placeholder="saul@gmail.com" autocomplete="email" class="placeholder:opacity-80 input active:outline join-item w-full max-w-xs" type="email"${add_attribute("value", $form.email, 0)}></label> ${$form.errors.email ? `<span class="text-error text-md">${escape($form.errors.email)}</span>` : ``} <label class="label gap-5">Password: <input required placeholder="sup3rs3cr3t" class="placeholder:opacity-80 input active:outline join-item w-full max-w-xs" type="password"${add_attribute("value", $form.password, 0)}></label> ${$form.errors.password ? `<span class="text-error text-md">${escape($form.errors.password)}</span>` : ``} <label class="label justify-start gap-3">Remember Me: <input class="toggle" type="checkbox"${add_attribute("checked", $form.remember, 1)}></label></div> <span class="mx-5">Don&#39;t have an account? <a class="link link-info" href="/register" data-svelte-h="svelte-1ae4vvk">Register.</a></span> <div class="card-actions items-center justify-center gap-3 mb-2"><button class="${"btn btn-primary " + escape($form.processing ? "btn-disabled" : "", true)}" type="submit">Login</button> <span data-svelte-h="svelte-17wkmf7">or</span> <a href="/redirect" type="button" class="${"cursor-pointer btn btn-info btn-outline " + escape($form.processing ? "btn-disabled" : "", true)}">Login with Google</a></div></form></div>`;
});
export {
  Login as default
};
