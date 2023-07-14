<script>
    import { inertia } from "@inertiajs/svelte";
    export let count;
</script>

<h1
    class="bg-gradient-to-r from-slate-50 to-black bg-clip-text text-5xl font-medium text-transparent"
>
    rjrgjjfjfjfjfjfjfjfjfj
</h1>
<button
    class="bg-cyan-300 p-3 m-4 text-center rounded-full"
    on:click={() => (count = count + 1)}>{count}</button
>
<a href="/" use:inertia>go to /</a>

<h1
    class="text-8xl bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500 font-extrabold text-transparent"
>
    Tailwind CSS
</h1>
