<script lang="ts">
    import Modal from "../components/Modal.svelte";

    export let close: VoidFunction;
</script>

<Modal title="Modal Title" {close}>
    <p>Hello world</p>
    <p>Hello world</p>
    <p>Hello world</p>
    <p>Hello world</p>
    <p>Hello world</p>
    <p>Hello world</p>
    <p>Hello world</p>

    <div slot="footer">
        <button class="btn btn-primary" on:click={close}>Submit</button>
        <button class="btn btn-secondary" on:click={close}>Close</button>
    </div>
</Modal>
