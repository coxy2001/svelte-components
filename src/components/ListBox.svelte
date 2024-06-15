<script lang="ts">
    export let top = false;
</script>

<div
    class="combobox__listbox"
    class:combobox__listbox--top={top}
    role="listbox"
    {...$$restProps}
>
    <slot />
</div>
