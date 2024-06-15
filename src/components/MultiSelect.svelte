<script lang="ts">
    import "../scss/combobox.scss";
    import ChevronDown from "../icons/ChevronDown.svelte";
    import Cross from "../icons/Cross.svelte";
    import Tick from "../icons/Tick.svelte";
    import { tick } from "svelte";
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
        selectedItems: IdItem[] = [],
        items: Item[] | undefined = undefined,
        idItems: IdItem[] | undefined = undefined;

    $: listItems =
        idItems ?? items?.map((item, i) => ({ id: i, ...item })) ?? [];
    $: filteredItems = changed
        ? listItems.filter((item) =>
              item.label.toLowerCase().includes(search.toLowerCase())
          )
        : listItems;

    $: selectedItemIds = selectedItems.map((item) => item.id);

    let input: HTMLInputElement | undefined,
        open = false,
        top = false,
        changed = false,
        highlightedIndex = -1;

    $: if (!search) {
        highlightedIndex = -1;
    }

    $: if (highlightedIndex > -1) {
        tick().then(() => {
            document
                .querySelector(
                    ".combobox__listbox-item--highlighted:not(:hover)"
                )
                ?.scrollIntoView({ block: "nearest" });
        });
    }

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
            const selectedItem = filteredItems[index];
            if (selectedItemIds.includes(selectedItem.id)) {
                selectedItems.splice(selectedItems.indexOf(selectedItem), 1);
            } else {
                selectedItems.push(selectedItem);
            }
            selectedItems = selectedItems;
        }
    }

    function expand() {
        if (!open) {
            open = true;
            const inputHeight = input?.getBoundingClientRect().top ?? 0;
            top = inputHeight / window.innerHeight > 0.5;
        } else if (!changed) {
            changed = true;
        }
    }

    function collapse() {
        if (open) {
            open = false;
            changed = false;
            search = "";
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
        {#if selectedItems.length}
            <button
                class="combobox__input-selected"
                tabindex="-1"
                on:click={(event) => {
                    event.stopPropagation();
                    search = "";
                    selectedItems = [];
                    collapse();
                }}
            >
                {selectedItems.length}
                <Cross />
            </button>
        {/if}
        <input
            type="text"
            id={name}
            name="{name}_input"
            class="combobox__input"
            class:combobox__input--empty={!search}
            class:combobox__input--selected={selectedItems.length}
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
        <ChevronDown class="combobox__input-chevron" />
        {#if search}
            <button
                class="combobox__input-clear"
                tabindex="-1"
                on:click={(event) => {
                    event.preventDefault();
                    search = "";
                    input?.focus();
                }}
            >
                <Cross />
            </button>
        {/if}
    </button>

    {#if open}
        <div
            id="{name}_listbox"
            class="combobox__listbox"
            class:combobox__listbox--top={top}
            role="listbox"
        >
            {#each filteredItems as item, i (item.id)}
                {@const selected = selectedItemIds.includes(item.id)}
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
                        <Tick class="combobox__listbox-item-check" />
                    {/if}
                    {item.label}
                </div>
            {/each}
        </div>
    {/if}
</div>
