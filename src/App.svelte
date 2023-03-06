<script lang="ts">
    import Grid from "./components/Grid.svelte";
    import CustomModal from "./examples/ModalExample.svelte";

    let showModal = false;

    function openModal() {
        showModal = true;
    }
    function closeModal() {
        showModal = false;
    }
</script>

<main>
    <button class="btn btn-secondary" on:click={openModal}>Open Modal</button>
    <hr />
    <Grid />
</main>

{#if showModal}
    <CustomModal close={closeModal} />
{/if}
