<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import {
    SkipForwardIcon,
    SkipBackIcon,
    PlayIcon,
    PauseIcon
  } from "svelte-feather-icons";
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
  .child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  #controls {
    left: 35%;
  }
  .pos-relative {
    overflow: hidden;
  }

  @media only screen and (max-width: 720px) {
    #controls {
      left: 30%;
    }
  }
</style>

<div id="project-carousel">
  <div class="pos-relative h-100">
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
    <div id="controls" class="pos-absolute">
      <button on:click={prev} type="button">
        <SkipBackIcon size="1.5x" />
      </button>
      <button on:click={next} type="button">
        <SkipForwardIcon size="1.5x" />
      </button>
      <button on:click={stop} type="button">
        <PauseIcon size="1.5x" />
      </button>
      <button on:click={play} type="button">
        <PlayIcon size="1.5x" />
      </button>
    </div>
  </div>

</div>
