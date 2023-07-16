export function scrollBottom() {
    console.log('scrolling...');
    setTimeout(() => {
        window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
    }, 100);
}