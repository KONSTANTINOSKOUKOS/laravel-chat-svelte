import Echo from "@ably/laravel-echo";
import * as Ably from "ably";
import { get } from "svelte/store";

import { msgs } from "@/lib/msgs";
import { scrollBottom } from "@/lib/scroll";
import { user } from "@/lib/user";

window.Ably = Ably;
const echo = new Echo({
    broadcaster: "ably",
});

echo.connector.ably.connection.on((stateChange) => {
    console.log(stateChange.current);
    if (stateChange.current === "connected") {
        console.log("connected to ably server");
    }
});

const channel = echo.join('messages');
const _user = get(user);

export function listenMsg() {
    channel.listen(".MessageCreated", ({ model }) => {
        console.log("realtime message:", model);
        msgs.update(ms => [...ms, model]);
        scrollBottom();
    });
}

export function listenTyping() {
    channel.listenForWhisper('typing', ({ name, avatar_url }) => {
        console.log(`user ${name}, ${avatar_url} is typing`);
        scrollBottom();
    });
}

export function whisperTyping() {
    channel.whisper('messages', {
        name: _user.name,
        avatar_url: _user.avatar_url
    });
}