<script>
  import Brand from "./Brand.svelte";
  import {
    sineOut,
    sineIn,
    linear,
    cubicIn,
    elasticIn,
    sineInOut,
    cubicInOut
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
      css: t => {
        const eased = cubicInOut(t);
        const test = (eased - 1) * 180;
        // 				if (step > 0) console.log('green', test)
        // 				if (step === 0) console.log('red', test)

        return `transform: rotateY(${(eased - 1) * 180}deg);
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;`;
      }
    };
  };
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
  }

  .card-back {
    background-color: #333;
    color: white;
  }
</style>

<div id="profile">
  <div on:click={toggleDiv} class="card-inner">
    {#if step === 0}
      <div transition:flip={{ duration: 800 }} class="card-front">
        <img class="img-fill" src="/img/code.jpg" alt="Tim" />
        <Brand />
      </div>
    {:else}
      <div transition:flip={{ duration: 800 }} class="card-back">
        <img class="img-fill" src="/img/code.jpg" alt="name" />
        <div
          id="bio-bits"
          class="flex-column flex-justify-center flex-align-center w-90 h-90
          pos-absolute">
          <p>A musician turned software developer.</p>
          <p>A husband, a father, and life-long learner.</p>
          <p>Debugging code in order to debug life.</p>
        </div>
      </div>
    {/if}
  </div>
  <div />
</div>
