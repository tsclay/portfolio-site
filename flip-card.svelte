<script>
  import {
    sineOut,
    sineIn,
    linear,
    cubicIn,
    elasticIn,
    sineInOut,
    cubicInOut
  } from "svelte/easing";

  let step = 0;

  const toggleDiv = () => {
    step = (step + 1) % 2;
  };

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
  .wrapper {
    width: 50%;
    height: 400px;
  }

  #card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }

  #card-front,
  #card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  #card-front {
    background: red;
  }

  #card-back {
    background: green;
  }
</style>

<div class="wrapper">

  <div on:click={toggleDiv} id="card-inner">
    {#if step === 0}
      <div transition:flip={{ duration: 800 }} id="card-front">number 1</div>
    {:else}
      <div id="card-back" transition:flip={{ duration: 800 }}>number 2</div>
    {/if}
  </div>

</div>
