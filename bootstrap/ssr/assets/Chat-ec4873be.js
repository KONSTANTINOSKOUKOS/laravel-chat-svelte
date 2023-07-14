import { w as writable, c as create_ssr_component, s as subscribe, e as escape, v as validate_component, a as add_attribute, b as set_store_value, d as each } from "../ssr.js";
import "@inertiajs/core";
import "lodash.isequal";
import { u as useForm } from "./useForm-b0b71230.js";
import "@inertiajs/core/server";
const user = writable({ name: "", avatar_url: "", id: "" });
const Message = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let { content = "" } = $$props;
  let { author } = $$props;
  function ismine() {
    return author.id == $user.id;
  }
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.author === void 0 && $$bindings.author && author !== void 0)
    $$bindings.author(author);
  $$unsubscribe_user();
  return `<div class="${"mb-2 chat " + escape(ismine() ? "chat-end" : "chat-start", true)}"><div class="chat-image avatar"><figure class="w-10"><img class="rounded-full" alt="${escape(author.name, true) + "'s avatar"}" src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"></figure></div> <span class="chat-header mx-2">${escape(author.name)}</span> <div class="${"chat-bubble break-all " + escape(ismine() ? "chat-bubble-success" : "chat-bubble-error", true)}">${escape(content)}</div></div>`;
});
const UserItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_user();
  return `<div class="fixed top-0 z-20 flex gap-3 m-2"><div class="badge badge-error ring-black dark:ring-white ring-2 w-12 h-12 cursor-pointer"></div> <div class="bg-slate-200 dark:bg-slate-800 flex items-center gap-3 px-3 rounded-lg"><h1 class="first-letter:uppercase text-slate-800 dark:text-slate-100 text-lg font-medium">${escape($user.name)}</h1> <button class="btn-link dark:text-cyan-600 case px-0" type="button" data-svelte-h="svelte-ubb7bz">Logout</button></div></div>`;
});
const ChatForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let form = useForm({ content: "", user_id: $user.id });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_form();
  $$unsubscribe_user();
  return `${validate_component(UserItem, "UserItem").$$render($$result, {}, {}, {})} <div class="max-h-fit fixed bottom-0 flex justify-center w-screen"><form class="join w-full md:w-5/12 mx-auto my-4"><input required type="text" placeholder="say something..." class="placeholder:opacity-80 input w-full focus:outline-0 join-item border-slate-300 z-10 border"${add_attribute("value", $form.content, 0)}> <button type="submit" class="btn btn-primary h-max join-item" data-svelte-h="svelte-1heshjw"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path></svg></button></form></div>`;
});
const msgs = writable([]);
const Chat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $msgs, $$unsubscribe_msgs;
  let $user, $$unsubscribe_user;
  $$unsubscribe_msgs = subscribe(msgs, (value) => $msgs = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let { _user } = $$props;
  let { messages } = $$props;
  if ($$props._user === void 0 && $$bindings._user && _user !== void 0)
    $$bindings._user(_user);
  if ($$props.messages === void 0 && $$bindings.messages && messages !== void 0)
    $$bindings.messages(messages);
  set_store_value(user, $user = _user, $user);
  set_store_value(msgs, $msgs = messages, $msgs);
  $$unsubscribe_msgs();
  $$unsubscribe_user();
  return ` ${$$result.head += `<!-- HEAD_svelte-79hzol_START -->${$$result.title = `<title>Chat Home Page</title>`, ""}<meta name="description" content="Page where you can see the app's super-chat"><!-- HEAD_svelte-79hzol_END -->`, ""} <a href="/a" data-svelte-h="svelte-9iieyo">go to /a</a> <ul class="my-16">${each($msgs, (msg) => {
    return `<li>${validate_component(Message, "Message").$$render(
      $$result,
      {
        content: msg.content,
        author: {
          id: msg.author_id,
          name: msg.author_name,
          avatar_url: msg.author_avatar_url
        }
      },
      {},
      {}
    )} </li>`;
  })}</ul> ${validate_component(ChatForm, "ChatForm").$$render($$result, {}, {}, {})}`;
});
export {
  Chat as default
};
