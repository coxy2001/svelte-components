<script lang="ts">
    import "../scss/combobox.scss";
    import type { IdItem, Item } from "./ListBoxItem.svelte";
    import ChevronDown from "../icons/ChevronDown.svelte";
    import Cross from "../icons/Cross.svelte";
    import ListBox from "./ListBox.svelte";
    import ListBoxItem from "./ListBoxItem.svelte";
    import { autoSelect, clickOutside } from "../lib/actions";

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
        top = false,
        changed = false,
        highlightedIndex = -1;

    $: if (!search) {
        selectedItem = undefined;
        highlightedIndex = -1;
    }

    $: value = selectedItem?.value;

    function keyPress(event: KeyboardEvent) {
        const key = event.key;

        input?.focus();

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
            use:autoSelect
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
        <ListBox id="{name}_listbox" {top}>
            {#each filteredItems as item, i (item.id)}
                <ListBoxItem
                    {item}
                    selected={item.id === selectedItem?.id}
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
