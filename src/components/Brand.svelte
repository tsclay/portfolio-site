<script>
  import {
    sineOut,
    sineIn,
    linear,
    cubicIn,
    elasticIn,
    sineInOut,
    cubicInOut,
  } from "svelte/easing";

  export let step;
  export let toggleDiv;

  let onLaptop = false;
  let laptopAnimateDone = false;

  // The div is in ON position when its rotateY deg is 0
  // The div is in OFF position when rotateY is 180 or -180
  // When div is OFF, its backside is exposed
  // Since backside is hidden, nothing is seen if no other div follows
  const flip = (node, { duration }) => {
    return {
      duration,
      css: (t) => {
        const eased = cubicInOut(t);
        const test = (eased - 1) * 180;
        // 				if (step > 0) console.log('green', test)
        // 				if (step === 0) console.log('red', test)

        return `transform: rotateY(${(eased - 1) * 180}deg);
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;`;
      },
    };
  };

  const animateLaptop = (node, { duration }) => {
    return {
      duration,
      css: (t, u) => {
        const eased = cubicInOut(u);
        return `transform: rotateX(-${u * 90}deg) rotateY(${u * 180}deg);`;
      },
      tick: (t, u) => {
        if (u < 0.25) {
          laptopAnimateDone = true;
        }
      },
    };
  };
</script>

<style type="text/scss">
  #profile {
    position: relative;
    min-height: 775px;
    background: var(--dark);
    overflow: hidden;

    svg {
      position: absolute;
      width: clamp(80px, 50%, 320px);
      height: auto;
    }
    svg.front-end-graphic {
      top: 1rem;
      left: 1rem;
    }
    svg.backend-graphic {
      top: 52%;
      left: 50%;
      transform: translate(-50%, 0%);
    }
    svg.db-graphic {
      top: 4rem;
      right: 1rem;
    }
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
    // background: rgba(0, 0, 0, 0.5);
    color: var(--light);

    p {
      font-size: 1.2em;
      font-family: "Anonymous Pro", monospace;
      width: 75%;
      text-align: center;
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
  body {
    color: #333;
    margin: 0;
    padding: 0;
    height: 100%;
  }
  main {
    width: 100%;
    margin-top: 1rem;
    height: 100vh;
    overflow: visible;
    position: relative;
    // background-color: #fff;
    width: 100%;
    // box-shadow: 2px 2px 5px -2px rgba(0, 0, 0, 0.2);
    padding: 1em;
  }
  main section {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  }
  main section.flex-column {
    flex-direction: column;
    align-items: initial;
  }
  main section.display-block {
    display: block;
  }
  .transition-all {
    transition: all 1.5s cubic-bezier(0.29, 1.08, 1, 1);
  }
  #default-example {
    position: relative;
  }
  #laptop-lid {
    /* for mobile */
    /* width: 365px;
  height: 265px; */
    width: 400px;
    height: 300px;
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
  .laptop-bottom {
    /* only works in firefox and chrome */
    /* background: rgb(163, 163, 163);
  height: 12px;
  border-radius: 1px 1px 4px 4px;
  position: absolute;
  bottom: 0;
  transform: translate(-50%, 0%) translateZ(50px);
  left: 50%;
  width: 538px; */

    /* works on safari and firefox */
    background: rgb(163, 163, 163);
    height: 12px;
    border-radius: 1px 1px 4px 4px;
    position: absolute;
    bottom: 0;
    transform: translate(-50%, -277%) translateZ(281px);
    left: 50%;
    width: 410px;
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
    // animation: forwards 2s linear move3d;
    transform-style: preserve-3d;
    margin-top: 14rem;
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

  #bio-bits {
    display: flex;
    flex-flow: column;
    align-items: center;
    color: var(--light);
    width: 100%;
    height: auto;
    font-size: 0.9rem;
  }

  #bio-bits p {
    font-family: "Anonymous Pro", monospace;
    width: 75%;
    text-align: center;
    margin: 0.8rem 0;
  }

  #bio-bits span.text-emphasis {
    color: yellow;
  }

  #bio-bits span.tech-stack {
    color: #00ccff;
  }

  @keyframes move3d {
    0% {
      transform: rotateX(-90deg) rotateY(180deg);
    }
    100% {
      transform: rotateX(0deg) rotateY(0deg);
    }
  }
</style>

<div id="profile">
  <button
    style="position: absolute; top: 0; left: 0; z-index: 99;"
    type="click"
    on:click={() => {
      onLaptop = !onLaptop;
      laptopAnimateDone = false;
    }}>Toggle</button>
  <main>
    <section id="default-example" class="default-example">
      {#if onLaptop}
        <div in:animateLaptop={{ duration: 2000 }} class="laptop move-laptop">
          <div
            id="laptop-lid"
            class="transition-all"
            style={laptopAnimateDone ? 'transform: rotate3d(1,0,0,0deg)' : 'transform: rotate3d(1,0,0,-90deg)'}>
            <div class="face lid-front">
              <div class="lid-screen">
                <div id="bio-bits" class="brand-statement">
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
            style="transform: rotate3d(1, 0, 0, 90deg); transform-origin: top;">
            <div class="face lid-front" style="transform: translateZ(2px);">
              <div class="lid-screen">
                <div id="bio-bits" class="brand-statement">
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
              Base-bottom
            </div>
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
