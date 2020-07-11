<script>
  import { onMount } from "svelte";
  let links = ["/img/tim.jpg", "/img/drawing.svg", "/favicon.png"];
  let duration = 750;
  let timer = null;
  let isPlaying = false;

  onMount(() => {
    play();
  });

  const next = () => {
    console.log("next");
    if (isPlaying) stop();
    const lastLink = links.shift();
    links = [...links, lastLink];
  };

  const prev = () => {
    console.log("prev");
    if (isPlaying) stop();
    const nextLink = links.pop();
    links = [nextLink, ...links];
  };

  // Start carousel reel
  const play = () => {
    if (isPlaying) return;
    isPlaying = true;
    timer = setInterval(() => {
      const lastLink = links.shift();
      links = [...links, lastLink];
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
    /* overflow: hidden; */
    position: relative;
  }
</style>

<div id="project-carousel">
  <div class="flex-row nowrap">
    {#each links as link}
      <div id="project-{link}">
        <img src={link} alt="" />
      </div>
    {/each}
  </div>

  <button on:click={next} type="button">Forward</button>
  <button on:click={prev} type="button">Back</button>
  <button on:click={stop} type="button">STOP</button>
  <button on:click={play} type="button">Play</button>
</div>
