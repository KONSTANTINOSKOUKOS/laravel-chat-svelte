<script>
    import { user } from "@/lib/user";
    import { scrollBottom } from "@/lib/scroll";
    import { useForm } from "@inertiajs/svelte";
    import UserItem from "@/Components/UserItem.svelte";

    let form = useForm({
        content: "",
        user_id: $user.id,
    });

    async function send() {
        $form.post("/", {
            onFinish: () => {
                $form.reset();
                scrollBottom();
            },
            only: ["newMsg"],
            preserveScroll: true,
        });
    }
</script>

<UserItem />
<div class="max-h-fit fixed bottom-0 z-50 flex flex-col w-screen">
    <button on:click={scrollBottom} class="btn btn-circle btn-accent mx-auto">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="white"
            viewBox="0 0 16 16"
        >
            <path
                fill-rule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
            />
        </svg>
    </button>
    <form
        on:submit|preventDefault={send}
        class="join md:w-5/12 w-full mx-auto my-4"
    >
        <input
            required
            bind:value={$form.content}
            type="text"
            placeholder="say something..."
            class="placeholder:opacity-80 input focus:outline-0 join-item border-slate-300 z-10 w-full border"
        />
        <button
            type="submit"
            disabled={$form.processing}
            class="btn btn-primary h-max join-item {$form.processing
                ? 'btn-disabled cursor-not-allowed'
                : ''}"
        >
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
