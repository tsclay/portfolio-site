<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { linear, cubicOut } from "svelte/easing";
  import {
    SkipForwardIcon,
    SkipBackIcon,
    PlayIcon,
    PauseIcon
  } from "svelte-feather-icons";

  export let assets;

  let duration = 8000;
  let timer = null;
  let isPlaying = false;
  let step = 0;
  let len = 0;
  let hide = true;
  let flowDir = 200;
  let inverseFlowDir = flowDir * -1;
  $: inverseFlowDir = flowDir * -1;
  $: len = assets.length;

  onMount(() => {
    console.log("here are the assets in projects ", assets);
    play();
    console.log("the projects mount assets ", assets);
  });

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

  const showControls = () => {
    hide = false;
  };

  const hideControls = () => {
    hide = true;
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
  #project-carousel {
    background: #193238;
  }
  p {
    margin: 0 0 0.5em 0;
    padding: 0;
    line-height: 1.5em;
  }

  h1 {
    display: inline;
    margin: 0;
    padding: 0;
  }
  .child {
    position: absolute;
    top: 5%;
    left: 10%;
    overflow: hidden;
    box-shadow: 0px 0px 10px 3px rgb(48, 48, 48);
  }

  .pos-relative {
    overflow: hidden;
  }

  #link-details {
    background: whitesmoke;
    /* height: 231.533px; */
    padding: 8px;
    height: 38%;
  }

  #link-image {
    /* height: 400px; */
    margin-bottom: 0.25em;
    height: 60%;
  }

  #project-card-display > div {
    border-radius: 8px;
  }
  img {
    height: 100%;
    width: 100%;
  }

  #tags > span {
    background: rgb(196, 196, 196);
    color: rgb(48, 48, 48);
    text-transform: uppercase;
    font-size: 0.75em;
    padding: 4px;
  }

  .btn-blue {
    padding: 0.5em;
  }

  #forward {
    right: 1%;
    top: 45%;
  }

  #backward {
    left: 1%;
    top: 45%;
  }

  @media only screen and (max-width: 400px) {
    #forward {
      right: 0;
      top: 45%;
    }

    #backward {
      left: 0;
      top: 45%;
    }
  }
</style>

<!-- style="height: 400px;" -->
<div
  id="project-carousel"
  class="h-100"
  on:mouseenter={showControls}
  on:mouseleave={hideControls}>
  <div id="project-card-display" class="pos-relative h-100">
    {#each assets as asset, i}
      {#if step === i}
        <!-- {#if assets.length > 0} -->
        <div
          class="child w-80 h-90"
          in:goIn={{ duration: 400 }}
          out:goOut={{ duration: 400 }}
          id="project-{i}">
          <div id="link-image">
            <img src={asset['image']} alt={asset['title']} />
          </div>
          <div class="flex flex-column flex-justify-between" id="link-details">
            <div class="h-40">
              <div
                id="title-and-tags"
                class="flex flex-column flex-justify-start mb-1">
                <h1>{asset.title}</h1>
                <div
                  id="tags"
                  class="flex flex-row flex-wrap flex-align-center
                  flex-justify-start">
                  {#each asset.tags as tag, j}
                    <span style="margin: 0 0 2px 2px;">{tag}</span>
                  {/each}
                </div>
              </div>

              <p>{asset.description}</p>
            </div>
            <div
              class="h-30 flex flex-row flex-justify-evenly flex-align-center">
              <form action={asset.url} target="_blank">
                <button class="btn-blue" type="submit">
                  <i class="far fa-eye" />
                  Site
                </button>
              </form>
              <form action={asset.github} target="_blank">
                <button class="btn-blue" type="submit">
                  <i class="fas fa-code" />
                  Code
                </button>
              </form>
              <form action={asset.demo} target="_blank">
                <button class="btn-blue" type="submit">
                  <i class="fas fa-video" />
                  Demo
                </button>
              </form>
            </div>
          </div>
        </div>
        <!-- {/if} -->
      {/if}
    {/each}
    <button
      id="backward"
      class="btn-blue pos-absolute"
      on:click={prev}
      type="button">
      <SkipBackIcon size="1.0x" />
    </button>
    <button
      id="forward"
      class="btn-blue pos-absolute"
      on:click={next}
      type="button">
      <SkipForwardIcon size="1.0x" />
    </button>
    {#if !hide}
      <div
        id="controls"
        transition:fade={{ duration: 300 }}
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
    {/if}
  </div>
</div>
