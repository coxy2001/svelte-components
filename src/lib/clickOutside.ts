export function clickOutside(node: HTMLElement, callback: Function) {
    function handleClick(event: MouseEvent) {
        if (!event.composedPath().includes(node)) {
            callback();
        }
    }

    document.addEventListener("click", handleClick);

    return {
        destroy() {
            document.removeEventListener("click", handleClick);
        },
    };
}
