export function autoSelect(node: HTMLInputElement | HTMLTextAreaElement) {
    function onFocus() {
        node.select();
    }

    node.addEventListener("focus", onFocus);

    return {
        destroy() {
            node.removeEventListener("focus", onFocus);
        },
    };
}

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
