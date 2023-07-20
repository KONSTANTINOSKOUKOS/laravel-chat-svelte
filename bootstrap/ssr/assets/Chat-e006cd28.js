import { w as writable, c as create_ssr_component, s as subscribe, p as page, e as escape, a as add_attribute, v as validate_component, b as set_store_value, d as each } from "../ssr.js";
import "@inertiajs/core";
import "lodash.isequal";
import { u as useForm } from "./useForm-b0b71230.js";
import "@ably/laravel-echo";
import "ably";
import "@inertiajs/core/server";
const user = writable({ name: "", avatar_url: "", id: "" });
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $user, $$unsubscribe_user;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let { msg } = $$props;
  function ismine() {
    return msg.author_id == $user.id;
  }
  if ($$props.msg === void 0 && $$bindings.msg && msg !== void 0)
    $$bindings.msg(msg);
  $$unsubscribe_page();
  $$unsubscribe_user();
  return `<li class="${"mb-2 chat " + escape(ismine() ? "chat-end" : "chat-start", true)}"><div class="chat-image avatar"><figure class="w-10"><img class="rounded-full" alt="${escape(msg.author_name, true) + "'s avatar"}"${add_attribute("src", msg.author_avatar_url ?? "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png", 0)}></figure></div> <span class="chat-header mx-2">${escape(msg.author_name)}</span> <div class="${"chat-bubble break-all " + escape(ismine() ? "chat-bubble-success" : "chat-bubble-error", true)}">${escape(msg.content)}</div> <button class="chat-footer btn btn-circle btn-primary text-xl">${escape("🤍")}</button></li>`;
});
const UserItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_user();
  return `<div class="fixed top-0 z-20 flex gap-3 m-2"><div class="bg-slate-200 dark:bg-slate-800 flex items-center gap-3 px-3 rounded-lg"><figure class="w-10"><img class="rounded-full" alt="${escape($user.name, true) + "'s avatar"}"${add_attribute("src", $user.avatar_url ?? "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png", 0)}></figure> <h1 class="first-letter:uppercase text-slate-800 dark:text-slate-100 text-lg font-medium">${escape($user.name)}</h1> <button class="btn-link dark:text-cyan-600 case px-0" type="button" data-svelte-h="svelte-ubb7bz">Logout</button></div></div>`;
});
const ChatForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let form = useForm({ content: "", user_id: $user.id });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_form();
  $$unsubscribe_user();
  return `${validate_component(UserItem, "UserItem").$$render($$result, {}, {}, {})} <div class="max-h-fit fixed bottom-0 z-50 flex flex-col w-screen"><button class="btn btn-circle btn-accent mx-auto" data-svelte-h="svelte-1s43353"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"></path></svg></button> <form class="join md:w-5/12 w-full mx-auto my-4"><input required type="text" placeholder="say something..." class="placeholder:opacity-80 input focus:outline-0 join-item border-slate-300 z-10 w-full border"${add_attribute("value", $form.content, 0)}> <button type="submit" ${$form.processing ? "disabled" : ""} class="${"btn btn-primary h-max join-item " + escape(
    $form.processing ? "btn-disabled cursor-not-allowed" : "",
    true
  )}"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path></svg></button></form></div>`;
});
const msgs = writable([]);
const Chat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $msgs, $$unsubscribe_msgs;
  let $user, $$unsubscribe_user;
  $$unsubscribe_msgs = subscribe(msgs, (value) => $msgs = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let { _user } = $$props;
  let { messages } = $$props;
  let { newMsg } = $$props;
  set_store_value(user, $user = _user, $user);
  if (newMsg) {
    set_store_value(msgs, $msgs = [...$msgs, newMsg], $msgs);
  } else {
    set_store_value(msgs, $msgs = messages, $msgs);
  }
  if ($$props._user === void 0 && $$bindings._user && _user !== void 0)
    $$bindings._user(_user);
  if ($$props.messages === void 0 && $$bindings.messages && messages !== void 0)
    $$bindings.messages(messages);
  if ($$props.newMsg === void 0 && $$bindings.newMsg && newMsg !== void 0)
    $$bindings.newMsg(newMsg);
  $$unsubscribe_msgs();
  $$unsubscribe_user();
  return `${$$result.head += `<!-- HEAD_svelte-79hzol_START -->${$$result.title = `<title>Chat Home Page</title>`, ""}<meta name="description" content="Page where you can see the app's super-chat"><!-- HEAD_svelte-79hzol_END -->`, ""} <a href="/a" data-svelte-h="svelte-9iieyo">go to /a</a> <ul class="my-28">${each($msgs, (msg) => {
    return `${validate_component(Message, "Message").$$render(
      $$result,
      {
        msg: {
          content: msg.content,
          id: msg.id,
          author_name: msg.author_name,
          author_id: msg.author_id,
          author_avatar_url: msg.author_avatar_url
        }
      },
      {},
      {}
    )}`;
  })}</ul> ${validate_component(ChatForm, "ChatForm").$$render($$result, {}, {}, {})}`;
});
export {
  Chat as default
};
