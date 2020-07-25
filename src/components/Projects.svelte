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
  // let links = ['/img/tim.jpg', '/img/drawing.svg', '/favicon.png']
  let links = [
    {
      title: "Berg",
      image: "/img/berg.png",
      url: "http://berg-musicapp.herokuapp.com/login",
      description:
        "Berg is an app that allows musicians interested in atonal set theory to easily see the transformations of the sets they input. This app utilizes PHP Laravel to serve the views, which are scaffolded by React.js UI components, and to act as the backend connecting to a PostgreSQL database."
    },
    {
      title: "Songster",
      image: "/img/songster.png",
      url: "https://tsclay.github.io/songster.github.io/",
      description:
        "Songster is an SPA that utilizes the jQuery library to make AJAX requests to the Genius Music API. Once a user selects a song, jQuery scrapes its lyrics from the HTML and formats it for the user's reading/singing pleasure."
    },
    {
      title: "Lisa Hospitality Solutions",
      image: "/img/lisa.png",
      url: "https://lisahospitalitysolutions.herokuapp.com/",
      description:
        "Lisa is a full CRUD app that implements user authentication and authorization. Users create forum entries relating to a guest's experience at their resort. Users can comment and can update or delete their comments. The app is server-rendered using Express.js, the Node.js runtime, and the EJS view engine."
    }
  ];

  // https://snipsnapapp.herokuapp.com/
  let duration = 8000;
  let timer = null;
  let isPlaying = false;
  let step = 0;
  const len = links.length;
  let hide = true;
  let flowDir = 200;
  let inverseFlowDir = flowDir * -1;
  $: inverseFlowDir = flowDir * -1;

  onMount(() => {
    play();
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
  h1,
  p {
    margin: 0;
    padding: 0;
    line-height: 1.75em;
  }
  .child {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }

  .pos-relative {
    overflow: hidden;
  }

  #link-details {
    background: whitesmoke;
    /* height: 231.533px; */
    padding: 8px;
    height: 35%;
  }

  #link-image {
    /* height: 400px; */
    margin-bottom: 0.25em;
    height: 65%;
  }

  img {
    height: 100%;
    width: 100%;
  }
</style>

<!-- style="height: 400px;" -->
<div
  id="project-carousel"
  class="h-100"
  on:mouseenter={showControls}
  on:mouseleave={hideControls}>
  <div id="project-card-display" class="pos-relative h-100">
    {#each links as link, i}
      {#if step === i}
        <div
          class="child w-100 h-100"
          in:goIn={{ duration: 400 }}
          out:goOut={{ duration: 400 }}
          id="project-{i}">
          <div id="link-image">
            <img src={link.image} alt={link.title} />
          </div>
          <div id="link-details">
            <h1>{link.title}</h1>
            <p>{link.description}</p>
            <form action={link.url} target="_blank">
              <button type="submit">Check it out!</button>
            </form>
          </div>
        </div>
      {/if}
    {/each}
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
