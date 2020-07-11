<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  let links = ["/img/tim.jpg", "/img/drawing.svg", "/favicon.png"];
  let duration = 5000;
  let timer = null;
  let isPlaying = false;
  let step = 0;
  const len = links.length;

  onMount(() => {
    play();
  });

  const next = () => {
    console.log("next");
    if (isPlaying) stop();
    step = (step + 1) % len;
    console.log("next:", step);
  };

  const prev = () => {
    console.log("prev");
    if (isPlaying) stop();
    step = (step - 1 + len) % len;
    console.log("prev:", step);
  };

  // Start carousel reel
  const play = () => {
    if (isPlaying) return;
    isPlaying = true;
    timer = setInterval(() => {
      step = (step + 1) % len;
    }, duration);
    console.log("playing!");
  };

  const stop = () => {
    isPlaying = false;
    console.log("stop!");
    return clearTimeout(timer);
  };
</script>

<style>
  #project-carousel {
    overflow: hidden;
    position: relative;
  }

  .child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
</style>

<div id="project-carousel">
  {#each links as link, i}
    {#if step === i}
      <div
        class="child"
        in:fly={{ x: 200, duration: 1000 }}
        out:fly={{ x: -200, duration: 1000 }}
        id="project-{i}">
        <img class="img-fill" src={link} alt="" />
      </div>
    {/if}
  {/each}
  <div class="pos-fixed">
    <button on:click={next} type="button">Forward</button>
    <button on:click={prev} type="button">Back</button>
    <button on:click={stop} type="button">STOP</button>
    <button on:click={play} type="button">Play</button>
  </div>
</div>
