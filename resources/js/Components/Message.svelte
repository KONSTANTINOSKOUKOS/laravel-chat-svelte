<script>
    import { user } from "@/lib/user";
    /**
     * @type {{content: string, id: string, author_name: string, author_id: string, author_avatar_url?: string}}
     */
    export let msg;

    function ismine() {
        return msg.author_id == $user.id;
    }
</script>

<li class="mb-2 chat {ismine() ? 'chat-end' : 'chat-start'}">
    <div class="chat-image avatar">
        <figure class="w-10">
            <img
                class="rounded-full"
                alt="{msg.author_name}'s avatar"
                src={msg.author_avatar_url ??
                    "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"}
            />
        </figure>
    </div>
    <span class="chat-header mx-2">{msg.author_name}</span>
    <div
        class="chat-bubble break-all {ismine()
            ? 'chat-bubble-success'
            : 'chat-bubble-error'}"
    >
        {msg.content}
    </div>
</li>
