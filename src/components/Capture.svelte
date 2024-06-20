<script lang="ts">
    import { onMount } from "svelte";

    const width = 720;

    let video: HTMLVideoElement,
        canvas: HTMLCanvasElement,
        photo: HTMLImageElement;

    onMount(() => {
        if (window.self !== window.top) {
            console.error("Not top window");
            return;
        }

        navigator.mediaDevices
            .getUserMedia({
                video: { facingMode: "environment" },
                audio: false,
            })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`);
            });
    });

    function takePicture() {
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = width;
        canvas.height = video.videoHeight / (video.videoWidth / width);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        photo.src = canvas.toDataURL("image/png");
    }
</script>

<section>
    <canvas style="display: none;" bind:this={canvas} />
    <video {width} bind:this={video}>
        Video stream not available.
        <track kind="captions" />
    </video>
    <img alt="The screen capture will appear in this box." bind:this={photo} />

    <div>
        <button on:click={takePicture}>Take photo</button>
        <button on:click={() => (photo.src = "")}>Clear</button>
    </div>
</section>
