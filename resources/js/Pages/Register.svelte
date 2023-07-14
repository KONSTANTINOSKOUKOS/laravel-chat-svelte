<script>
    import { inertia, useForm } from "@inertiajs/svelte";

    let form = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function submit() {
        $form.post("/register");
    }
</script>

<svelte:head>
    <title>Register to the Chat</title>
    <meta
        name="description"
        content="Page where you can make an account for the Chat"
    />
</svelte:head>
<div class="flex min-h-screen">
    <form
        method="post"
        class="card card-bordered gap-7 py-7 bg-base-200 max-w-fit m-auto"
        on:submit|preventDefault={submit}
    >
        <div class="card-body gap-3 py-0">
            <label class="label">
                Name:
                <input
                    required
                    placeholder="kostas"
                    class="placeholder:opacity-80 input active:outline outline-black join-item w-full max-w-xs"
                    type="text"
                    bind:value={$form.name}
                /></label
            >
            {#if $form.errors.name}
                <span class="text-error text-md">{$form.errors.name}</span>
            {/if}
            <label class="label">
                Email: <input
                    required
                    placeholder="saul@gmail.com"
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
            <label class="label">
                Confirm your password: <input
                    required
                    placeholder="sup3rs3cr3t"
                    class="placeholder:opacity-80 input active:outline join-item w-full max-w-xs"
                    type="password"
                    bind:value={$form.password_confirmation}
                /></label
            >
        </div>
        {#if $form.errors.password_confirmation}
            <span class="text-error text-md"
                >{$form.errors.password_confirmation}</span
            >
        {/if}
        <span class="mx-5"
            >Already have an account? <a
                class="link link-info"
                href="/login"
                use:inertia>Login.</a
            ></span
        >

        <div class="card-actions items-center justify-center gap-3 mb-2">
            <button
                class="btn btn-primary {$form.processing ? 'btn-disabled' : ''}"
                type="submit">Register</button
            >
            <span>or</span>
            <a
                href="/redirect"
                class="cursor-pointer btn btn-info btn-outline {$form.processing
                    ? 'btn-disabled'
                    : ''}"
            >
                Login with Google
            </a>
        </div>
    </form>
</div>
