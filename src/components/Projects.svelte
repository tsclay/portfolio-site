<script>
  import { onMount } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  import { linear, cubicOut } from 'svelte/easing'
  import {
    SkipForwardIcon,
    SkipBackIcon,
    PlayIcon,
    PauseIcon
  } from 'svelte-feather-icons'

  export let assets, width

  let duration = 8000
  let timer = null
  let isPlaying = false
  let step = 0
  let len = 0
  let hide = true
  let flowDir = 500
  let inverseFlowDir = flowDir * -1
  $: inverseFlowDir = flowDir * -1
  $: len = assets.length

  onMount(() => {
    console.log('here are the assets in projects ', assets)
    play()
    console.log('the projects mount assets ', assets)
  })

  const next = () => {
    console.log('next')
    if (isPlaying) stop()
    flowDir = 500
    step = (step + 1) % len
    console.log('next:', step)
    return flowDir
  }

  const prev = () => {
    console.log('prev')
    if (isPlaying) stop()
    flowDir = -500
    step = (step - 1 + len) % len
    console.log('prev:', step)
    return flowDir
  }

  // Start carousel reel
  const play = () => {
    if (isPlaying) return
    isPlaying = true
    flowDir = 200
    timer = setInterval(() => {
      step = (step + 1) % len
    }, duration)
    console.log('playing!')
  }

  const stop = () => {
    isPlaying = false
    console.log('stop!')
    return clearTimeout(timer)
  }

  const goOut = (
    node,
    { duration, opacity = 0, y = 0, easing: easing$1 = cubicOut }
  ) => {
    const x = inverseFlowDir
    const style = getComputedStyle(node)
    const target_opacity = +style.opacity
    const transform = style.transform === 'none' ? '' : style.transform
    const od = target_opacity * (1 - opacity)
    return {
      duration,
      easing: easing$1,
      x,
      css: (t, u) => {
        return `transform: ${transform} translate(${(1 - t) * x}px, ${
          (1 - t) * y
        }px);
        opacity: ${target_opacity - od * u}`
      }
    }
  }

  const goIn = (
    node,
    { duration, opacity = 0, y = 0, easing: easing$1 = cubicOut }
  ) => {
    const x = flowDir
    const style = getComputedStyle(node)
    const target_opacity = +style.opacity
    const transform = style.transform === 'none' ? '' : style.transform
    const od = target_opacity * (1 - opacity)
    return {
      duration,
      easing: easing$1,
      x,
      css: (t, u) => {
        return `transform: ${transform} translate(${(1 - t) * x}px, ${
          (1 - t) * y
        }px);
        opacity: ${target_opacity - od * u}`
      }
    }
  }

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

<style type="text/scss">
  #project-carousel {
    background: #b7ddff;
    display: flex;
    padding: 2rem;
    box-sizing: border-box;
    align-items: center;

    position: relative;
    // min-height: 665px;
    height: 100%;
    overflow: hidden;
  }
  p {
    margin: 0 0 0.5em 0;
    padding: 0;
    line-height: 1.5em;
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

    // > div {
    //   background: whitesmoke;
    // }
  }

  div.link-image {
    height: 35%;
    border-bottom: 0.25px solid black;
  }

  div.project-card-display {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    height: 100%;
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
  }

  #backward {
    position: absolute;
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

<div id="project-carousel" class="h-100">
  <div class="project-card-display">
    {#if width > 600}
      {#each assets as asset, i}
        <div class="child" id="project-{i}">
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
      {/each}
    {:else}
      {#each assets as asset, i}
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
