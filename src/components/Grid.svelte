<script lang="ts">
    import GridItem from "./GridItem.svelte";

    const startPage = 1,
        pageLength = 10;

    let jsonData = [],
        loading = true,
        mode = 1;

    getData(startPage);

    function getData(page) {
        setTimeout(() => {
            let newData = jsonData;
            for (let i = 0; i < pageLength; i++) {
                newData.push({
                    id: i + page,
                    a: "One",
                    b: "Two",
                    c: "Three",
                });
            }
            jsonData = newData;
            if (page < startPage + pageLength * 2) getData(page + pageLength);
            else loading = false;
        }, Math.random() * 1000 + 1000);
    }
</script>

<div class="grid">
    <div class="grid__options">
        <button class="btn btn-secondary" on:click={() => (mode = 1)}>
            List
        </button>
        <button class="btn btn-secondary" on:click={() => (mode = 2)}>
            Grid
        </button>
    </div>
    {#if mode == 1}
        <div class="grid__header">
            <div class="grid__header-item">ID</div>
            <div class="grid__header-item">A</div>
            <div class="grid__header-item">B</div>
            <div class="grid__header-item">C</div>
        </div>
    {/if}
    <div class="grid__container">
        {#if jsonData}
            {#each jsonData as data}
                <GridItem id={data.id} {mode} {data} />
            {/each}
        {/if}
        {#if loading}
            <h2>Loading</h2>
        {/if}
    </div>
</div>

<style lang="scss">
    .grid {
        &__header {
            display: flex;
            justify-content: space-between;

            &-item {
                padding: 0.5rem;
            }
        }
    }
</style>
