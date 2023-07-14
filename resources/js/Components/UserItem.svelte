<script>
    import { user } from "@/lib/user";
    import { inertia } from "@inertiajs/svelte";
</script>

<div class="fixed top-0 z-20 flex gap-3 m-2">
    <div
        class="bg-slate-200 dark:bg-slate-800 flex items-center gap-3 px-3 rounded-lg"
    >
        <figure class="w-10">
            <img
                class="rounded-full"
                alt="{$user.name}'s avatar"
                src={$user.avatar_url ??
                    "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"}
            />
        </figure>
        <h1
            class="first-letter:uppercase text-slate-800 dark:text-slate-100 text-lg font-medium"
        >
            {$user.name}
        </h1>
        <button
            class="btn-link dark:text-cyan-600 case px-0"
            use:inertia={{ href: "/logout", method: "post" }}
            type="button">Logout</button
        >
    </div>
</div>
