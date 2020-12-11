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
</script>

<style type="text/scss">
  #profile {
    position: relative;
    min-height: 665px;
  }
  #bio-bits {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 75%;
    display: flex;
    flex-flow: column;
    align-items: center;

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
</style>

<div id="profile">
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
  <!-- <div class="card-inner"> -->

  <!-- {#if step === 0} -->
  <!-- <div transition:flip={{ duration: 800 }} class="card-front">
        <img class="img-fill" src="/img/code.jpg" alt="Tim" />
        <div
          id="bio-bits"
          class="flex-column flex-justify-center flex-align-center w-90 h-90
          pos-absolute">
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
            <span class="tech-stack">PHP</span>, 
            and <span class="tech-stack">Python</span>.
          </p>
          <p>
            A <span class="text-emphasis">conductor</span> for software <span class="text-emphasis">solutions</span>.
          </p>
          <p>Debugging 
            <span class="text-emphasis">code</span> 
            in order to debug 
            <span class="text-emphasis">life</span>.
          </p>
        </div>
      </div> -->
  <!-- {:else}
      <div transition:flip={{ duration: 800 }} class="card-back">
        <img class="img-fill" src="/img/code.jpg" alt="name" />
        <Brand />
      </div>
    {/if} -->
  <!-- </div> -->
</div>
