<script lang="ts">
    import "../scss/combobox.scss";
    import type { IdItem, Item } from "./ListBoxItem.svelte";
    import ChevronDown from "../icons/ChevronDown.svelte";
    import Cross from "../icons/Cross.svelte";
    import ListBox from "./ListBox.svelte";
    import ListBoxItem from "./ListBoxItem.svelte";
    import { clickOutside } from "../lib/actions";

    export let id: string,
        search = "",
        selectedItems: IdItem[] = [],
        items: Item[] | undefined = undefined,
        idItems: IdItem[] | undefined = undefined;

    $: listItems =
        idItems ?? items?.map((item, i) => ({ id: i, ...item })) ?? [];
    $: filteredItems = listItems.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    $: selectedItemIds = selectedItems.map((item) => item.id);

    let input: HTMLInputElement | undefined,
        open = false,
        top = false,
        right = false,
        highlightedIndex = -1;

    $: if (!search) {
        highlightedIndex = -1;
    }

    function keyPress(event: KeyboardEvent) {
        const key = event.key;

        input?.focus();

        if (key === "Enter") {
            event.preventDefault();
            if (!open) {
                expand();
            } else if (
                highlightedIndex > -1 &&
                highlightedIndex < filteredItems.length - 1
            ) {
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
        if (highlightedIndex > 0 && highlightedIndex < filteredItems.length) {
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
            const inputRect = input?.getBoundingClientRect();
            top = (inputRect?.top ?? 0) / window.innerHeight > 0.5;
            right = (inputRect?.left ?? 0) / window.innerWidth > 0.5;
        }
    }

    function collapse() {
        if (open) {
            open = false;
            search = "";
            highlightedIndex = -1;
        }
    }
</script>

<div class="combobox" use:clickOutside={collapse}>
    <button
        class="combobox__button"
        tabindex="-1"
        on:click={(event) => {
            event.preventDefault();
            open ? collapse() : expand();
        }}
        on:keyup={(event) => {
            if (event.key === " ") event.preventDefault();
        }}
    >
        {#if selectedItems.length}
            <button
                class="combobox__input-selected"
                tabindex="-1"
                on:click={(event) => {
                    event.preventDefault();
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
            {id}
            class="combobox__input"
            class:combobox__input--empty={!search}
            class:combobox__input--selected={selectedItems.length}
            role="combobox"
            aria-autocomplete="list"
            aria-controls="{id}_listbox"
            aria-expanded={open}
            bind:this={input}
            bind:value={search}
            on:input={expand}
            on:keydown={keyPress}
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
        <ListBox id="{id}_listbox" {top} {right}>
            {#each filteredItems as item, i (item.id)}
                <ListBoxItem
                    {item}
                    selected={selectedItemIds.includes(item.id)}
                    highlighted={i === highlightedIndex}
                    on:click={() => select(i)}
                    on:keydown={keyPress}
                    on:mouseover={() => (highlightedIndex = i)}
                    on:mouseleave={() => (highlightedIndex = -1)}
                />
            {/each}
        </ListBox>
    {/if}
</div>
