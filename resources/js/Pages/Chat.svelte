<script>
    import { inertia } from "@inertiajs/svelte";
    import Message from "@/Components/Message.svelte";
    import ChatForm from "@/Components/ChatForm.svelte";
    import { msgs } from "@/lib/msgs";
    import { user } from "@/lib/user";
    import { scrollBottom } from "@/lib/scroll";

    import Echo from "@ably/laravel-echo";
    import * as Ably from "ably";
    import { onMount } from "svelte";

    export let _user;
    export let messages;
    export let newMsg;

    $user = _user;
    if (newMsg) {
        $msgs = [...$msgs, newMsg];
    } else {
        $msgs = messages;
    }

    onMount(() => {
        scrollBottom();

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

        echo.channel("messages").listen("MessageSent", ({ message }) => {
            console.log("realtime message:", message);
            $msgs = [...$msgs, message];
            scrollBottom();
        });
    });
</script>

<svelte:head>
    <title>Chat Home Page</title>
    <meta
        name="description"
        content="Page where you can see the app's super-chat"
    />
</svelte:head>
<a href="/a" use:inertia>go to /a</a>
<ul class="my-28">
    {#each $msgs as msg}
        <li>
            <Message
                msg={{
                    content: msg.content,
                    id: msg.id,
                    author_name: msg.author_name,
                    author_id: msg.author_id,
                    author_avatar_url: msg.author_avatar_url,
                }}
            />
        </li>
    {/each}
</ul>
<ChatForm />
