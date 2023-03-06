<script lang="ts">
    export let id,
        mode,
        data = null;

    if (data == null) apiCall();

    function apiCall() {
        data = null;
        setTimeout(() => {
            data = {
                a: "One",
                b: "Two",
                c: "Three",
            };
        }, Math.random() * 500 + id * 100 + 500);
    }
</script>

<div
    class="grid-item"
    class:grid-item--2={mode == 2}
    on:click={apiCall}
    on:keypress={apiCall}
>
    {#if data}
        {#if mode == 1}
            <div class="grid-item__cell">{id}</div>
            <div class="grid-item__cell">{data.a}</div>
            <div class="grid-item__cell">{data.b}</div>
            <div class="grid-item__cell">{data.c}</div>
        {:else}
            <div class="grid-item__cell">ID: {id}</div>
            <div class="grid-item__cell">A: {data.a}</div>
            <div class="grid-item__cell">B: {data.b}</div>
            <div class="grid-item__cell">C: {data.c}</div>
        {/if}
    {:else}
        <div class="grid-item__cell">Loading</div>
    {/if}
</div>

<style lang="scss">
    .grid-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        &__cell {
            padding: 0.5rem;
            transition: all 1000ms linear;

            .grid-item--2 & {
                width: 50%;
            }
        }
    }
</style>
