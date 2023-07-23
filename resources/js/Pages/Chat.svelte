<script>
    import { inertia } from "@inertiajs/svelte";
    import { onMount } from "svelte";

    import Message from "@/Components/Message.svelte";
    import ChatForm from "@/Components/ChatForm.svelte";

    import { msgs } from "@/lib/msgs";
    import { user } from "@/lib/user";
    import { scrollBottom } from "@/lib/scroll";
    import { listenMsg } from "@/lib/echo";

    export let _user;
    export let messages;
    export let newMsg;

    $user = _user;
    $msgs = newMsg ? [...$msgs, newMsg] : messages;

    onMount(() => {
        scrollBottom();
        listenMsg();
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
        <Message
            msg={{
                content: msg.content,
                id: msg.id,
                author_name: msg.author_name,
                author_id: msg.author_id,
                author_avatar_url: msg.author_avatar_url,
            }}
        />
    {/each}
</ul>
<ChatForm />
