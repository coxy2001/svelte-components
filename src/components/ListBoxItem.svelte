<script lang="ts" context="module">
    export type Item = {
        label: string;
        value: any;
    };
    export type IdItem = Item & {
        id: any;
    };
</script>

<script lang="ts">
    import "../scss/combobox.scss";
    import Tick from "../icons/Tick.svelte";

    export let item: IdItem,
        ref: HTMLElement | undefined = undefined,
        selected = false,
        highlighted = false,
        tabindex = -1;

    $: if (highlighted && ref && !ref.matches(":hover")) {
        ref.scrollIntoView({ block: "nearest" });
    }
</script>

<div
    class="combobox__listbox-item"
    class:combobox__listbox-item--selected={selected}
    class:combobox__listbox-item--highlighted={highlighted}
    role="option"
    {tabindex}
    aria-selected={selected}
    bind:this={ref}
    on:click
    on:keydown
    on:focus
    on:mouseover
    on:mouseleave
    {...$$restProps}
>
    {#if selected}
        <Tick class="combobox__listbox-item-check" />
    {/if}
    {item.label}
</div>
