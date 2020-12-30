<script>
  import {
    sineOut,
    sineIn,
    linear,
    cubicIn,
    elasticIn,
    sineInOut,
    cubicInOut
  } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { onMount } from 'svelte'

  export let laptopShouldEnter, observer

  export let width
  export let height

  let laptopAnimateDone = false

  onMount(() => {
    observer.observe(document.querySelector('#profile'))
  })

  // The div is in ON position when its rotateY deg is 0
  // The div is in OFF position when rotateY is 180 or -180
  // When div is OFF, its backside is exposed
  // Since backside is hidden, nothing is seen if no other div follows
  const flip = (node, { duration }) => {
    return {
      duration,
      css: (t) => {
        const eased = cubicInOut(t)
        const test = (eased - 1) * 180

        return `transform: rotateY(${(eased - 1) * 180}deg);
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;`
      }
    }
  }

  const halo = tweened(0, {
    duration: 1000,
    easing: cubicInOut
  })

  const animateLaptop = (node, { duration }) => {
    const style = getComputedStyle(node)
    const transform = style.transform === 'none' ? '' : style.transform
    return {
      duration,
      css: (t, u) => {
        const eased = cubicInOut(u)
        return `transform: ${transform} translate3d(0, -${
          u * 60
        }%, 0) rotateX(${u * -90}deg);`
      },
      tick: (t, u) => {
        if (u < 0.25 && !laptopAnimateDone) {
          laptopAnimateDone = true
        }
        if (u === 0) {
          halo.set(45)
        }
      }
    }
  }

  let onDesktop
  $: onDesktop = width > 615 && height > 415
</script>

<style type="text/scss">
  #profile {
    position: relative;
    height: 100vh;
    min-height: 800px;
    overflow: hidden;
  }

  #bio-bits {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: clamp(360px, 50%, 535px);
    display: flex;
    flex-flow: column;
    align-items: center;
    color: var(--light);
    font-size: clamp(0.9rem, 2vw, 1.2rem);

    p {
      font-family: 'Anonymous Pro', monospace;
      width: 75%;
      text-align: center;
      margin: 0.8rem 0;
      span.text-emphasis {
        color: yellow;
      }

      span.tech-stack {
        color: #00ccff;
      }
    }
  }

  * {
    box-sizing: border-box;
  }
  main {
    width: 100%;
    height: 100%;
    overflow: visible;

    section {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
    }

    section.flex-column {
      flex-direction: column;
      align-items: initial;
    }
    section.display-block {
      display: block;
    }
  }

  .transition-all {
    transition: all 1.5s cubic-bezier(0.29, 1.08, 1, 1);
  }
  #default-example {
    position: relative;
  }
  #laptop-lid {
    width: 500px;
    height: 400px;
    transform-style: preserve-3d;
    transform-origin: bottom;
  }
  .face {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    font-size: 60px;
    color: #fff;
  }
  .lid-front {
    background: rgb(209, 209, 209);
    transform: translateZ(2px);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
  }
  .lid-screen {
    width: 95%;
    height: 95%;
    border-radius: 2px;
    background: black;
  }
  .lid-back {
    background: rgb(163, 163, 163);
    transform: rotateY(180deg) translateZ(2px);
    border-radius: 4px;
    backface-visibility: visible;
  }
  .lid-top {
    background: rgb(163, 163, 163);
    transform: rotateX(-90deg) translateZ(2px);
    height: 4px;
    border-radius: 4px;
  }
  .lid-bottom {
    background: rgb(209, 209, 209);
    transform: rotateX(90deg) translateZ(2px);
    height: 4px;
    border-radius: 4px;
  }
  .lid-left {
    background: rgb(163, 163, 163);
    transform: rotateY(-90deg) translateZ(2px);
    width: 4px;
    left: 0;
    border-radius: 4px;
  }
  .lid-right {
    background: rgb(163, 163, 163);
    transform: rotateY(90deg) translateZ(2px);
    right: 0px;
    width: 4px;
    border-radius: 4px;
  }

  .toggle-rotate {
    transform: rotate3d(1, 0, 0, 45deg);
  }

  #laptop-base {
    width: 400px;
    height: 12px;
    transform-style: preserve-3d;
    transform-origin: center;
  }

  .base-front {
    background: rgb(209, 209, 209);
    transform: translateZ(150px);
    border-radius: 1px 1px 4px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .base-screen {
    width: 95%;
    height: 95%;
    border-radius: 2px;
    background: black;
  }
  .base-back {
    background: rgb(163, 163, 163);
    transform: rotateY(180deg) translateZ(150px);
    border-radius: 4px;
  }
  .base-top {
    background: rgb(163, 163, 163);
    transform: rotateX(-90deg) translateZ(150px);
    height: 4px;
    border-radius: 4px;
  }
  .base-bottom {
    background: rgb(209, 209, 209);
    transform: rotateX(90deg) translateZ(150px);
    height: 4px;
    border-radius: 4px;
  }
  .base-left {
    background: rgb(163, 163, 163);
    transform: rotateY(-90deg) translateZ(150px);
    width: 4px;
    left: 0;
    border-radius: 4px;
  }
  .base-right {
    background: rgb(163, 163, 163);
    transform: rotateY(90deg) translateZ(150px);
    right: 0px;
    width: 4px;
    border-radius: 4px;
  }

  .laptop {
    perspective: 2000px;
    transform-style: preserve-3d;
    position: absolute;
    top: 50%;
    transform: translate3d(0, -25%, 0);
  }

  .notch {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #333;
    width: 30px;
    height: 4px;
    border-radius: 2px 2px 4px 4px;
  }
</style>

<div
  id="profile"
  style={`background: radial-gradient(
  circle,
  rgba(255, 255, 255, 1) 0%,
  rgba(0, 0, 0, 1) ${$halo}%
);`}>
  <!-- <button
    style="position: absolute; top: 0; left: 0; z-index: 99;"
    type="click"
    on:click={() => {
      laptopShouldEnter = !laptopShouldEnter;
      laptopAnimateDone = false;
    }}>Toggle</button> -->
  <main>
    <section id="default-example" class="default-example">
      {#if laptopShouldEnter}
        <div in:animateLaptop={{ duration: 1000 }} class="laptop move-laptop">
          <div
            id="laptop-lid"
            class="transition-all"
            style={`${laptopAnimateDone ? 'transform: rotate3d(1,0,0,0deg)' : 'transform: rotate3d(1,0,0,-90deg)'}; width: ${onDesktop ? 500 : 325}px; height: ${onDesktop ? 400 : 225}px`}>
            <div class="face lid-front">
              <div class="lid-screen">
                <div
                  id="bio-bits"
                  style={`font-size: ${onDesktop ? 1.2 : 0.8}rem`}
                  class="brand-statement">
                  <p>
                    A musician turned
                    <span class="text-emphasis">full-stack software developer</span>.
                  </p>
                  <p>
                    Creating expressive, meaningful user experiences using
                    <span class="tech-stack">Javascript</span>,
                    <span class="tech-stack">Node</span>,
                    <span class="tech-stack">React</span>,
                    <span class="tech-stack">Svelte</span>,
                    <span class="tech-stack">PHP</span>, and
                    <span class="tech-stack">Python</span>.
                  </p>
                  <p>
                    A
                    <span class="text-emphasis">conductor</span>
                    for software
                    <span class="text-emphasis">solutions</span>.
                  </p>
                  <p>
                    Debugging
                    <span class="text-emphasis">code</span>
                    in order to debug
                    <span class="text-emphasis">life</span>.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="face lid-back"
              style="transform: rotateY(180deg) translateZ(4px);">
              🍎
            </div>
            <div class="face lid-top" />
            <div class="face lid-bottom" />
            <div class="face lid-right" />
            <div class="face lid-left" />
          </div>
          <div
            id="laptop-lid"
            class="transition-all"
            style={`transform: rotate3d(1, 0, 0, 90deg); transform-origin: top; width: ${onDesktop ? 500 : 325}px; height: ${onDesktop ? 400 : 225}px;`}>
            <div
              class="face lid-front"
              style="transform: translateZ(2px); flex-flow: column;
            justify-content: space-around;">
              <div
                style="width: 95%;
              height: 50%;
              background: gray;
              border-radius: 2px;" />
              <div
                style="width: 30%;
              height: 100px;
              background: gray;
              border-radius: 2px;" />
            </div>
            <div
              class="face lid-back"
              style="transform: rotateY(180deg) translateZ(4px);" />
            <div class="face lid-top" style="height: 8px;" />
            <div
              class="face lid-bottom"
              style="height: 8px; bottom: 0; backface-visibility: visible;" />
            <div class="face lid-right" style="width: 8px;" />
            <div class="face lid-left" style="width: 8px;" />
          </div>
        </div>
      {/if}
    </section>
  </main>
</div>
