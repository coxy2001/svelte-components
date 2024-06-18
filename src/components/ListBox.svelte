<script lang="ts">
    export let top = false,
        right = false;
</script>

<div
    class="combobox__listbox"
    class:combobox__listbox--top={top}
    class:combobox__listbox--right={right}
    role="listbox"
    {...$$restProps}
>
    <slot />
</div>
