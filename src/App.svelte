<script lang="ts">
    import "./scss/app.scss";
    import Select from "./components/Select.svelte";
    import MultiSelect from "./components/MultiSelect.svelte";

    let value: any,
        selectedItems: any[] = [],
        items: any[] = [
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
    <p>Selected Item: {value}</p>

    <p></p>

    <label for="select">Select a thing</label>
    <Select name="select" {items} bind:value />

    <p></p>

    <p>Selected Items:</p>

    <ul>
        {#each selectedItems as item}
            <li>{item.label}: {item.value}</li>
        {/each}
    </ul>

    <p></p>

    <div style="font-size: 1.5rem;">
        <label for="select_2">Select a thing</label>
        <MultiSelect name="select_2" {items} bind:selectedItems />
    </div>
</main>

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
