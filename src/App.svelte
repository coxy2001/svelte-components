<script lang="ts">
    import CustomModal from "./examples/CustomModal.svelte";

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
</main>

{#if showModal}
    <CustomModal close={closeModal} />
{/if}
