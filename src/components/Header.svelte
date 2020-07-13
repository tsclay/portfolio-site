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
  p {
    color: #1a333a;
    margin-top: 0;
    margin-bottom: 0.5em;
    text-transform: uppercase;
    font-weight: 100;
  }

  #title {
    font-size: 4em;
  }
  #subtitle {
    left: 15%;
    font-size: 2em;
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

  .card-front {
    background: burlywood;
  }

  .card-back {
    background-color: #333;
    color: white;
  }
</style>

<div id="header" class="flex-row nowrap flex-justify-between flex-align-center">
  <div on:click={toggleDiv} class="card-inner w-100 h-100">
    {#if step === 0}
      <div transition:flip={{ duration: 800 }} class="card-front">
        <div class="pos-relative ml-2">
          <p class="pos-relative" id="title">Tim Clay</p>
          <p class="pos-absolute" id="subtitle">Software Developer</p>
        </div>
      </div>
    {:else}
      <div transition:flip={{ duration: 800 }} class="card-back flex-row">
        <ul
          class="w-100 flex-row flex-justify-evenly flex-align-center
          ul-list-none">
          <li>
            About
            <i class="fas fa-info-circle" />
          </li>
          <li>
            Contact
            <i class="fas fa-envelope" />
          </li>
          <li>
            GitHub
            <i class="fab fa-github" />
          </li>
        </ul>
      </div>
    {/if}
  </div>
</div>
