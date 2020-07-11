<script>
  import { onMount } from "svelte";
  let links = [
    "/img/tim.jpg",
    "/img/drawing.svg",
    "/img/tim.jpg",
    "/favicon.png"
  ];
  let duration = 750;
  let timer = null;

  const next = () => {
    const lastLink = links.shift();
    links = [...links, lastLink];
  };

  const prev = () => {
    const nextLink = links.pop();
    links = [nextLink, ...links];
  };

  // Start carousel reel
  const play = () => {
    timer = setInterval(next, duration);
    console.log("timer started");
  };

  const stop = () => {
    console.log("stop!");
    return clearTimeout(timer);
  };

  play();
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
