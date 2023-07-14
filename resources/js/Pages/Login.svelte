<script>
    import { useForm, inertia } from "@inertiajs/svelte";

    let form = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function submit() {
        $form.post("/login");
    }
</script>

<svelte:head>
    <title>Log into the Chat</title>
    <meta name="description" content="Page where you can login into the chat" />
</svelte:head>
<div class="flex min-h-screen">
    <form
        method="post"
        class="card card-bordered gap-7 py-7 bg-base-200 max-w-fit m-auto"
        on:submit|preventDefault={submit}
    >
        <div class="card-body gap-3 py-0">
            <label class="label gap-5">
                Email: <input
                    required
                    placeholder="saul@gmail.com"
                    autocomplete="email"
                    class="placeholder:opacity-80 input active:outline join-item w-full max-w-xs"
                    type="email"
                    bind:value={$form.email}
                /></label
            >
            {#if $form.errors.email}
                <span class="text-error text-md">{$form.errors.email}</span>
            {/if}
            <label class="label gap-5">
                Password: <input
                    required
                    placeholder="sup3rs3cr3t"
                    class="placeholder:opacity-80 input active:outline join-item w-full max-w-xs"
                    type="password"
                    bind:value={$form.password}
                /></label
            >
            {#if $form.errors.password}
                <span class="text-error text-md">{$form.errors.password}</span>
            {/if}
            <label class="label justify-start gap-3">
                Remember Me: <input
                    class="toggle"
                    type="checkbox"
                    bind:checked={$form.remember}
                /></label
            >
        </div>
        <span class="mx-5"
            >Don't have an account? <a
                class="link link-info"
                href="/register"
                use:inertia>Register.</a
            ></span
        >

        <div class="card-actions items-center justify-center gap-3 mb-2">
            <button
                class="btn btn-primary {$form.processing ? 'btn-disabled' : ''}"
                type="submit">Login</button
            >
            <span>or</span>
            <a
                href="/redirect"
                type="button"
                class="cursor-pointer btn btn-info btn-outline {$form.processing
                    ? 'btn-disabled'
                    : ''}"
            >
                Login with Google
            </a>
        </div>
    </form>
</div>
