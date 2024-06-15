<script lang="ts">
    import "../scss/combobox.scss";
    import { clickOutside } from "../lib/clickOutside";

    type Item = {
        label: string;
        value: any;
    };
    type IdItem = Item & {
        id: any;
    };

    export let name: string,
        search = "",
        value: any = undefined,
        selectedItem: IdItem | undefined = undefined,
        items: Item[] | undefined = undefined,
        idItems: IdItem[] | undefined = undefined;

    $: listItems =
        idItems ?? items?.map((item, i) => ({ id: i, ...item })) ?? [];
    $: filteredItems = changed
        ? listItems.filter((item) =>
              item.label.toLowerCase().includes(search.toLowerCase())
          )
        : listItems;

    let input: HTMLInputElement | undefined,
        open = false,
        changed = false,
        highlightedIndex = -1;

    $: if (!search) {
        selectedItem = undefined;
        highlightedIndex = -1;
    }

    $: value = selectedItem?.value;

    function next() {
        if (
            highlightedIndex > -1 &&
            highlightedIndex < filteredItems.length - 1
        ) {
            highlightedIndex++;
        } else {
            highlightedIndex = 0;
        }
    }

    function prev() {
        if (highlightedIndex > 0) {
            highlightedIndex--;
        } else {
            highlightedIndex = filteredItems.length - 1;
        }
    }

    function select(index: number) {
        if (index >= 0 && index < filteredItems.length) {
            selectedItem = filteredItems[index];
            collapse();
        }
    }

    function expand() {
        if (!open) {
            open = true;
            highlightedIndex = filteredItems.findIndex(
                (item) => item.id === selectedItem?.id
            );
        } else if (!changed) {
            changed = true;
        }
    }

    function collapse() {
        if (open) {
            open = false;
            changed = false;
            search = selectedItem?.label ?? "";
            highlightedIndex = -1;
        }
    }
</script>

<div class="combobox" use:clickOutside={collapse}>
    <button
        class="combobox__button"
        tabindex="-1"
        on:click={() => (open ? collapse() : expand())}
        on:keyup={(event) => {
            if (event.key === " ") event.preventDefault();
        }}
    >
        <input
            type="text"
            id={name}
            name="{name}_input"
            class="combobox__input"
            class:combobox__input--empty={!search}
            role="combobox"
            aria-autocomplete="list"
            aria-controls="{name}_listbox"
            aria-expanded={open}
            bind:this={input}
            bind:value={search}
            on:input={expand}
            on:keydown={(event) => {
                const key = event.key;

                if (key === "Enter") {
                    if (!open) {
                        expand();
                    } else if (highlightedIndex >= 0) {
                        select(highlightedIndex);
                    } else if (search) {
                        select(0);
                    }
                } else if (event.altKey && key === "ArrowDown") {
                    expand();
                } else if (event.altKey && key === "ArrowUp") {
                    collapse();
                } else if (key === "ArrowDown") {
                    next();
                } else if (key === "ArrowUp") {
                    prev();
                } else if (key === "Escape" || key === "Tab") {
                    collapse();
                }
            }}
            on:focusin={(event) => event.currentTarget.select()}
        />
        <svg
            class="combobox__input-chevron"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
        {#if search}
            <button
                class="combobox__input-clear"
                on:click={(event) => {
                    event.preventDefault();
                    search = "";
                    input?.focus();
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
            </button>
        {/if}
    </button>

    {#if open}
        <div id="{name}_listbox" class="combobox__listbox" role="listbox">
            {#each filteredItems as item, i (item.id)}
                {@const selected = item.id === selectedItem?.id}
                {@const highlighted = i === highlightedIndex}
                <div
                    class="combobox__listbox-item"
                    class:combobox__listbox-item--selected={selected}
                    class:combobox__listbox-item--highlighted={highlighted}
                    role="option"
                    tabindex="-1"
                    aria-selected={selected}
                    on:click={() => {
                        select(i);
                    }}
                    on:keydown
                    on:focus={() => (highlightedIndex = i)}
                    on:mouseover={() => (highlightedIndex = i)}
                    on:mouseleave={() => (highlightedIndex = -1)}
                >
                    {#if selected}
                        <svg
                            class="combobox__listbox-item-check"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    {/if}
                    {item.label}
                </div>
            {/each}
        </div>
    {/if}
</div>
