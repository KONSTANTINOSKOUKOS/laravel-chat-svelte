<script>
    import { user } from "@/lib/user";
    import { useForm } from "@inertiajs/svelte";
    import UserItem from "@/Components/UserItem.svelte";

    let form = useForm({
        content: "",
        user_id: $user.id,
    });

    function scrollBottom() {
        setTimeout(() => {
            window.scroll(0, 1000000);
        }, 50);
    }

    async function send() {
        $form.post("/messages", {
            onFinish: () => {
                $form.reset();
                scrollBottom();
            },
            only: ["messages"],
        });
    }
</script>

<UserItem />
<div class="max-h-fit fixed bottom-0 flex justify-center w-screen">
    <form
        on:submit|preventDefault={send}
        class="join w-full md:w-5/12 mx-auto my-4"
    >
        <input
            required
            bind:value={$form.content}
            type="text"
            placeholder="say something..."
            class="placeholder:opacity-80 input w-full focus:outline-0 join-item border-slate-300 z-10 border"
        />
        <button type="submit" class="btn btn-primary h-max join-item">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path
                    d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
                />
            </svg>
        </button>
    </form>
</div>
