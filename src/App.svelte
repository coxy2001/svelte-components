<script lang="ts">
    import "./scss/app.scss";
    import Select from "./components/Select.svelte";

    let value: number | undefined,
        search = "",
        selectedItem: any,
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
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>

    <p>Value: {value}</p>

    <label for="select">Select a thing</label>
    <Select name="select" {items} bind:search bind:selectedItem bind:value />

    <p></p>

    <label for="select_real">Select a thing</label>
    <select id="select_real" {value}>
        <option value></option>
        {#each items as item}
            <option value={item.value}>{item.label}</option>
        {/each}
    </select>

    <p></p>

    <div style="font-size: 1.5rem;">
        <label for="select_2">Select a thing</label>
        <Select
            name="select_2"
            {items}
            bind:search
            bind:selectedItem
            bind:value
        />

        <p></p>

        <label for="select_real_2">Select a thing</label>
        <select id="select_real_2" {value}>
            <option value></option>
            {#each items as item}
                <option value={item.value}>{item.label}</option>
            {/each}
        </select>
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
