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

  const toggleDiv = e => {
    console.log(
      "this is e.target: ",
      e.target,
      "this is e.currentTarget: ",
      e.currentTarget
    );
    if (e.target.tagName !== "DIV" && step === 1) return;
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
  #footer {
    /* background-color: #333; */
    /* background-color: rgb(48, 48, 48); */
    color: rgb(48, 48, 48);
    /* color: white; */
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 1em;
  }

  a,
  li:first-child {
    border: 0px;
    text-decoration: none;
    color: rgb(48, 48, 48);
    background: rgb(196, 196, 196);
    text-transform: uppercase;
    font-size: 0.75em;
    padding: 4px;
  }

  li:first-child {
    cursor: pointer;
  }

  li:hover,
  a:hover {
    color: #00ccff;
  }

  textarea {
    display: block;
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

  .card-back {
    background-color: rgb(48, 48, 48);
  }
</style>

<div id="footer" class="h-100">

  <div on:click={toggleDiv} class="card-inner">
    {#if step === 0}
      <div transition:flip={{ duration: 800 }} class="card-front">
        <img class="img-fill" src="/img/code.jpg" alt="Tim" />
      </div>
    {:else}
      <div class="card-back" transition:flip={{ duration: 800 }}>
        <div
          id="contact-form"
          class="w-100 h-100 flex flex-row flex-justify-center flex-align-center">
          <form class="w-80 h-80" action="mailto:tsclay9@gmail.com">
            <div class="flex flex-row flex-justify-between w-100">
              <input class="w-50" type="text" placeholder="Name" />
              <input class="w-50 ml-1" type="email" placeholder="Email" />
            </div>
            <div class="w-100">
              <textarea
                class="textarea-fixed w-100"
                name="message"
                id="message"
                cols="50"
                rows="8" />
            </div>

            <button class="btn-blue" type="submit">Send</button>
          </form>
        </div>
      </div>
    {/if}
  </div>

</div>
