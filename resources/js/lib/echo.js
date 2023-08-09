import Echo from "@ably/laravel-echo";
import * as Ably from "ably";

import { msgs } from "@/lib/msgs";
import { scrollBottom } from "@/lib/scroll";

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

export function listenMsg() {
    channel.listen(".MessageCreated", ({ model }) => {
        console.log("realtime message:", model);
        msgs.update(ms => [...ms, model]);
        scrollBottom();
    });
}