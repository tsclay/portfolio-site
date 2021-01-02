<script>
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { SkipForwardIcon, SkipBackIcon } from "svelte-feather-icons";

  export let assets, width, playCardsAnimation, observer, preloadedImgs;

  let duration = 8000;
  let timer = null;
  let isPlaying = false;
  let step = 0;
  let len = 0;
  let hide = true;
  let flowDir = 500;
  let inverseFlowDir = flowDir * -1;
  $: inverseFlowDir = flowDir * -1;
  $: len = assets.length;

  onMount(() => {
    observer.observe(document.querySelector("#project-carousel"));
    play();
  });

  const next = () => {
    console.log("next");
    if (isPlaying) stop();
    flowDir = 500;
    step = (step + 1) % len;
    console.log("next:", step);
    return flowDir;
  };

  const prev = () => {
    console.log("prev");
    if (isPlaying) stop();
    flowDir = -500;
    step = (step - 1 + len) % len;
    console.log("prev:", step);
    return flowDir;
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
        return `transform: ${transform} translate(${(1 - t) * x}px, ${
          (1 - t) * y
        }px);
        opacity: ${target_opacity - od * u}`;
      },
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
        return `transform: ${transform} translate(${(1 - t) * x}px, ${
          (1 - t) * y
        }px);
        opacity: ${target_opacity - od * u}`;
      },
    };
  };

  const unfoldCards = (node, { duration }) => {
    const style = getComputedStyle(node);
    const cardRect = node.getBoundingClientRect();
    const transform = style.transform === "none" ? "" : style.transform;
    const parentRect = node.parentElement.getBoundingClientRect();
    const x = parentRect.left - cardRect.left;
    const y = cardRect.top;

    return {
      duration,
      easing: cubicOut,
      x,
      y,
      css: (t, u) => {
        return `
        transform: ${transform} translate(${u * x}px, -${u * y}px);
        `;
      },
    };
  };

  const preload = (src) => {
    return new Promise((resolve) => {
      let img = new Image();
      img.onload = resolve;
      img.src = src;
    });
  };
</script>

<style type="text/scss">
  #project-carousel {
    background: black;
    // background: #b7ddff;
    padding: 2rem;
    box-sizing: border-box;
    position: relative;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  p {
    margin: 0 0 0.5em 0;
    padding: 0;
    line-height: 1.5em;
  }

  h1.section-header {
    font-size: clamp(50px, 4vw, 100px);
    top: 0;
    left: 0;
    transform: translate(1rem, 1rem);
    // background: var(--light);
    // font-family: Anonymous Pro;
    // text-transform: uppercase;
    // font-size: 1.5em;
    padding: 4px;
    font-family: "Anonymous Pro", monospace;
    color: black;
    background: white;
    text-transform: uppercase;
    display: block;
    width: auto;
    border-radius: 0;
  }

  h1 {
    display: flex;
    margin: 0;
    padding: 0.25rem;
    box-sizing: border-box;
    background: var(--blue);
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    width: 50%;
    justify-content: center;
    color: var(--dark);
    font-size: 1.25rem;
  }

  #link-details {
    color: var(--dark);
    padding: 8px;
    box-sizing: border-box;
    height: 55%;
    background: whitesmoke;
    position: relative;
    border-top: 0.25px solid black;
  }

  div.link-image {
    height: 35%;
    border-bottom: 0.25px solid black;
  }

  div.project-card-display {
    width: 100%;
    // overflow: hidden;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    position: relative;
    margin: 50px auto 0 auto;
    > div {
      border-radius: 8px;
      height: 575px;
    }
    div.child {
      overflow: hidden;
      // box-shadow: 0px 0px 10px 3px #303030;
      // width: clamp(365px, 100%, 375px);
      height: 400px;
      width: 250px;
      margin: 1rem 0;
    }
    div.child.single-view {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  div.project-card-actions {
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    justify-content: center;
    height: 10%;
    font-size: 0.85rem;
  }
  img {
    height: 100%;
    width: 100%;
    display: block;
  }

  // #title-and-tags {
  //   display: flex;
  //   flex-flow: column nowrap;
  //   justify-content: start;
  // }

  div.tags-and-description {
    margin-top: 2rem;
    font-size: 0.85rem;
  }
  #tags {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: start;
  }
  #tags > span {
    background: rgb(196, 196, 196);
    color: rgb(48, 48, 48);
    text-transform: uppercase;
    font-size: 0.75em;
    padding: 4px;
  }

  a.card-link {
    display: flex;
    flex-grow: 1;
    border-radius: 0;
  }

  a.card-link:hover {
    text-decoration: none;
  }

  .btn-play {
    cursor: pointer;
    padding: 0.5em;
    background-color: rgb(196, 196, 196);
    transition: background-color 0.3s linear;
  }

  .btn-play:hover {
    background-color: #00ccff;
    transition: background-color 0.3s linear;
  }

  #forward {
    position: absolute;
    right: 1%;
    top: 45%;
    transform: translate(50%, 0);
  }

  #backward {
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, 0);
  }
</style>

<div id="project-carousel" style={width > 600 ? 'min-height: 100vh;' : ''}>
  <!-- <button
    style="position: absolute; top: 0; left:0;"
    on:click={() => (playAnimations = !playAnimations)}>Toggle</button> -->
  <h1 class="section-header">View My Work</h1>
  <div class="project-card-display">
    {#if width > 600}
      {#if playCardsAnimation}
        {#each assets as asset, i}
          <!-- {#await preload(asset['image']) then _} -->
          <div
            in:unfoldCards={{ duration: 1000 }}
            class="child"
            id="project-{i}">
            <div class="link-image">
              {@html preloadedImgs[i]}
              <!-- <img src={asset['image']} alt={asset['title']} /> -->
            </div>
            <div id="link-details">
              <h1>{asset.title}</h1>
              <div class="tags-and-description">
                <div id="tags">
                  {#each asset.tags as tag, j}
                    <span style="margin: 0 0 2px 2px;">{tag}</span>
                  {/each}
                </div>
                <p>{asset.description}</p>
              </div>
            </div>
            <div class="project-card-actions">
              <a href={asset.url} target="_blank" class="btn-primary card-link">
                <i class="far fa-eye" />
                Site
              </a>
              <a
                href={asset.github}
                target="_blank"
                class="btn-primary card-link">
                <i class="fas fa-code" />
                Code
              </a>
              <a
                href={asset.demo}
                target="_blank"
                class="btn-primary card-link">
                <i class="fas fa-video" />
                Demo
              </a>
            </div>
          </div>
          <!-- {/await} -->
        {/each}
      {/if}
    {:else}
      {#each assets as asset, i}
        <!-- {#await preload(asset['image']) then _} -->
        {#if step === i}
          <div
            class="child single-view"
            in:goIn={{ duration: 400 }}
            out:goOut={{ duration: 400 }}
            id="project-{i}">
            <div class="link-image">
              <img src={asset['image']} alt={asset['title']} />
            </div>
            <div id="link-details">
              <h1>{asset.title}</h1>
              <div class="tags-and-description">
                <div id="tags">
                  {#each asset.tags as tag, j}
                    <span style="margin: 0 0 2px 2px;">{tag}</span>
                  {/each}
                </div>
                <p>{asset.description}</p>
              </div>
            </div>
            <div class="project-card-actions">
              <a href={asset.url} target="_blank" class="btn-primary card-link">
                <i class="far fa-eye" />
                Site
              </a>
              <a
                href={asset.github}
                target="_blank"
                class="btn-primary card-link">
                <i class="fas fa-code" />
                Code
              </a>
              <a
                href={asset.demo}
                target="_blank"
                class="btn-primary card-link">
                <i class="fas fa-video" />
                Demo
              </a>
            </div>
          </div>
        {/if}
        <!-- {/await} -->
      {/each}
      <button
        id="backward"
        class="btn-play pos-absolute"
        on:click={prev}
        type="button">
        <SkipBackIcon size="1.0x" />
      </button>
      <button
        id="forward"
        class="btn-play pos-absolute"
        on:click={next}
        type="button">
        <SkipForwardIcon size="1.0x" />
      </button>
    {/if}
  </div>
</div>

<!-- <div id="project-carousel" class="h-100">
  <div class="project-card-display">
    {#each assets as asset, i}
      {#if step === i}
        <div
          class="child"
          in:goIn={{ duration: 400 }}
          out:goOut={{ duration: 400 }}
          id="project-{i}">
          <div class="link-image">
            <img src={asset['image']} alt={asset['title']} />
          </div>
          <div id="link-details">
            <h1>{asset.title}</h1>
            <div class="tags-and-description">
              <div id="tags">
                {#each asset.tags as tag, j}
                  <span style="margin: 0 0 2px 2px;">{tag}</span>
                {/each}
              </div>
              <p>{asset.description}</p>
            </div>
          </div>
          <div class="project-card-actions">
            <a href={asset.url} target="_blank" class="btn-primary card-link">
              <i class="far fa-eye" />
              Site
            </a>
            <a
              href={asset.github}
              target="_blank"
              class="btn-primary card-link">
              <i class="fas fa-code" />
              Code
            </a>
            <a href={asset.demo} target="_blank" class="btn-primary card-link">
              <i class="fas fa-video" />
              Demo
            </a>
          </div>
        </div>
      {/if}
    {/each}
    <button
      id="backward"
      class="btn-play pos-absolute"
      on:click={prev}
      type="button">
      <SkipBackIcon size="1.0x" />
    </button>
    <button
      id="forward"
      class="btn-play pos-absolute"
      on:click={next}
      type="button">
      <SkipForwardIcon size="1.0x" />
    </button>
  </div>
</div> -->
