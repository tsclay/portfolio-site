<script>
  import Brand from './Brand.svelte'
  import {
    sineOut,
    sineIn,
    linear,
    cubicIn,
    elasticIn,
    sineInOut,
    cubicInOut
  } from 'svelte/easing'

  export let step
  export let toggleDiv

  // The div is in ON position when its rotateY deg is 0
  // The div is in OFF position when rotateY is 180 or -180
  // When div is OFF, its backside is exposed
  // Since backside is hidden, nothing is seen if no other div follows
  const flip = (node, { duration }) => {
    return {
      duration,
      css: t => {
        const eased = cubicInOut(t)
        const test = (eased - 1) * 180
        // 				if (step > 0) console.log('green', test)
        // 				if (step === 0) console.log('red', test)

        return `transform: rotateY(${(eased - 1) * 180}deg);
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;`
      }
    }
  }
</script>

<style>
  #bio-bits {
    top: 5%;
    left: 5%;
    background: rgba(48, 48, 48, 0.9);
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    box-shadow: 0px 0px 10px 3px rgb(48, 48, 48);
  }

  .card-front {
    background-color: #333;
    color: white;
  }

  p {
    font-size: 1.2em;
    font-family: 'Anonymous Pro', monospace;
    width: 75%;
    text-align: center;
  }

.text-emphasis {
  color: yellow;
}

.tech-stack {
  color: #00ccff;
}
  
</style>

<div id="profile">
  <div class="card-inner">
    <!-- {#if step === 0} -->
      <div transition:flip={{ duration: 800 }} class="card-front">
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
            <span class="tech-stack">Node</span>, 
            <span class="tech-stack">React</span>, 
            <span class="tech-stack">Svelte</span>, 
            <span class="tech-stack">PHP</span>, 
            and <span class="tech-stack">Python</span>.
          </p>
          <p>
            A husband, a father, and life-long learner.
          </p>
          <p>Debugging 
            <span class="text-emphasis">code</span> 
            in order to debug 
            <span class="text-emphasis">life</span>.
          </p>
        </div>
      </div>
    <!-- {:else}
      <div transition:flip={{ duration: 800 }} class="card-back">
        <img class="img-fill" src="/img/code.jpg" alt="name" />
        <Brand />
      </div>
    {/if} -->
  </div>
  <div />
</div>
