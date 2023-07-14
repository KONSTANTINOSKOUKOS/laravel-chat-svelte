<script>
    import { inertia } from "@inertiajs/svelte";
    import Message from "@/Components/Message.svelte";
    import ChatForm from "@/Components/ChatForm.svelte";
    import { msgs } from "@/lib/msgs";
    import { user } from "@/lib/user";

    import Echo from "@ably/laravel-echo";
    import * as Ably from "ably";
    import { onMount } from "svelte";

    /**
     * @type {{name:string, id:string}}
     */
    export let _user;
    $: $user = _user;

    /**
     * @type {{content: string, user_id: string}[]}
     */
    export let messages;
    $: $msgs = messages;

    function scrollBottom() {
        setTimeout(() => {
            window.scroll(0, 1000000);
        }, 50);
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
            const msg = message[0];
            console.log("wow something:");
            console.log(msg);
            $msgs = [...$msgs, msg];
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
<ul class="my-16">
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
