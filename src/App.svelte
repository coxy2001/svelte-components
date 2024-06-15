<script lang="ts">
    import "./scss/app.scss";
    import type { IdItem, Item } from "./components/ListBoxItem.svelte";
    import ComboBox from "./components/ComboBox.svelte";
    import ComboBoxMulti from "./components/ComboBoxMulti.svelte";
    import ModalExample from "./examples/ModalExample.svelte";

    let modalOpen = false;

    let value: any,
        selectedItems: IdItem[] = [],
        items: Item[] = [
            { label: "Hello", value: 0 },
            { label: "Hello World", value: 2 },
            { label: "World", value: 5 },
            { label: "World Hello", value: 2 },
            { label: "Hello", value: 0 },
            { label: "Hello World", value: 2 },
            { label: "World", value: 5 },
            { label: "World Hello", value: 2 },
            { label: "Hello", value: 0 },
            { label: "Hello World", value: 2 },
            { label: "World", value: 5 },
            { label: "World Hello", value: 2 },
            { label: "Hello", value: 0 },
            { label: "Hello World", value: 2 },
            { label: "World", value: 5 },
            { label: "World Hello", value: 2 },
            { label: "Hello", value: 0 },
            { label: "Hello World", value: 2 },
            { label: "World", value: 5 },
            { label: "World Hello", value: 2 },
            { label: "Hello", value: 0 },
            { label: "Hello World", value: 2 },
            { label: "World", value: 5 },
            { label: "World Hello", value: 2 },
        ];
</script>

<main>
    <button on:click={() => (modalOpen = !modalOpen)}>Open Modal</button>

    <p>Selected Item: {value}</p>

    <p></p>

    <label for="select">Select a thing</label>
    <ComboBox name="select" {items} bind:value />

    <p></p>

    <label for="select_real">Select a thing</label>
    <select name="select_real" bind:value>
        {#each items as item}
            <option value={item.value}>{item.label}</option>
        {/each}
    </select>

    <p></p>

    <!-- <p>Selected Items:</p>

    <ul>
        {#each selectedItems as item}
            <li>{item.label}: {item.value}</li>
        {/each}
    </ul>

    <p></p> -->

    <label for="select_2">Select a thing</label>
    <ComboBoxMulti name="select_2" {items} bind:selectedItems />
</main>

{#if modalOpen}
    <ModalExample close={() => (modalOpen = false)} />
{/if}

<style>
    label {
        display: block;
        padding: 0.25em 0;
    }
    select {
        font: inherit;
        display: block;
        padding: 0.25em 0.75em;
        width: 100%;
        border: 1px solid #fff;
        border-radius: 0.25rem;
    }
</style>
