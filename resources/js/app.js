import "../css/app.css";
import { createInertiaApp } from '@inertiajs/svelte';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.svelte');
        return pages[`./Pages/${name}.svelte`]();
    },
    setup({ el, App, props }) {
        new App({ target: el, props, hydrate: true });
    },
})