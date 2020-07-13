<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { linear, cubicOut } from "svelte/easing";
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
  let flowDir = 200;
  let inverseFlowDir = flowDir * -1;
  $: inverseFlowDir = flowDir * -1;

  const forwardMoton = ``;

  onMount(() => {
    play();
  });

  // const fixDivOnPage = () => {
  //   const el = document.getElementById(`project-${step}`)

  // }

  const next = () => {
    console.log("next");
    if (isPlaying) stop();
    flowDir = 200;
    step = (step + 1) % len;
    console.log("next:", step);
  };

  const prev = () => {
    console.log("prev");
    if (isPlaying) stop();
    flowDir = -200;
    // console.log("inversed", inverseFlowDir);
    step = (step - 1 + len) % len;
    console.log("prev:", step);
  };

  // Start carousel reel
  const play = () => {
    if (isPlaying) return;
    isPlaying = true;
    flowDir = 200;
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

  const goOut = (
    node,
    { duration, opacity = 0, y = 0, easing: easing$1 = cubicOut }
  ) => {
    const x = inverseFlowDir;
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === "none" ? "" : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
      duration,
      easing: easing$1,
      x,
      css: (t, u) => {
        return `transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) *
          y}px);
        opacity: ${target_opacity - od * u}`;
      }
    };
  };

  const goIn = (
    node,
    { duration, opacity = 0, y = 0, easing: easing$1 = cubicOut }
  ) => {
    const x = flowDir;
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === "none" ? "" : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
      duration,
      easing: easing$1,
      x,
      css: (t, u) => {
        return `transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) *
          y}px);
        opacity: ${target_opacity - od * u}`;
      }
    };
  };

  //   function fly(node, { delay = 0, duration = 400, easing: easing$1 = easing.cubicOut, x = 0, y = 0, opacity = 0 }) {
  //     const style = getComputedStyle(node);
  //     const target_opacity = +style.opacity;
  //     const transform = style.transform === 'none' ? '' : style.transform;
  //     const od = target_opacity * (1 - opacity);
  //     return {
  //         delay,
  //         duration,
  //         easing: easing$1,
  //         css: (t, u) => `
  // 			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
  // 			opacity: ${target_opacity - (od * u)}`
  //     };
  // }
</script>

<style>
  .child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  .pos-relative {
    overflow: hidden;
  }
</style>

<div id="project-carousel">
  <div class="pos-relative h-100">
    {#each links as link, i}
      {#if step === i}
        <div
          class="child w-100"
          in:goIn={{ duration: 400 }}
          out:goOut={{ duration: 400 }}
          id="project-{i}">
          <img class="img-fill" src={link} alt="" />
        </div>
      {/if}
    {/each}
    <div
      id="controls"
      class="pos-absolute w-100 flex-row flex-align-center flex-justify-center">
      <button on:click={prev} type="button">
        <SkipBackIcon size="1.0x" />
      </button>
      <button on:click={next} type="button">
        <SkipForwardIcon size="1.0x" />
      </button>
      <button on:click={stop} type="button">
        <PauseIcon size="1.0x" />
      </button>
      <button on:click={play} type="button">
        <PlayIcon size="1.0x" />
      </button>
    </div>
  </div>
</div>
