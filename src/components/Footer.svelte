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
  import axios from "axios";

  let step = 0;
  export let secret;

  const toggleDiv = e => {
    if (e.target.id !== "contact-form" && step === 1) return;
    step = (step + 1) % 2;
  };

  const flip = (node, { duration }) => {
    return {
      duration,
      css: t => {
        const eased = cubicInOut(t);
        const test = (eased - 1) * 180;

        return `transform: rotateY(${(eased - 1) * 180}deg);
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;`;
      }
    };
  };

  let formData = { name: "", email: "", message: "", test: "" };

  const handleForm = async e => {
    e.preventDefault();
    // console.log(formData);
    formData.secret = secret;
    try {
      const response = await axios.post(
        "http://localhost:8888/assets",
        formData
      );
      console.log(response);
      secret = response.data.secret;
    } catch (error) {
      secret = error.response.data.secret;
    }
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

  p {
    margin: 0 0 0.5em 0;
    padding: 0.4em;
    color: rgb(48, 48, 48);
    background: rgb(255, 221, 31);
    text-transform: uppercase;
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

  button {
    display: block;
    background: #00ccff;
    color: rgb(48, 48, 48);
    border-radius: 4px;
  }

  input {
    width: 48%;
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
          class="w-100 h-100 flex flex-row flex-justify-center mt-1">
          <form on:submit={handleForm} id="direct-form" class="w-80 h-80">
            <div class="flex flex-row flex-justify-between w-100">
              <input
                bind:value={formData.name}
                required
                type="text"
                placeholder="Name" />
              <input
                bind:value={formData.email}
                required
                class="ml-1"
                type="email"
                placeholder="Email" />
            </div>
            <div class="w-100">
              <textarea
                bind:value={formData.message}
                required
                class="textarea-fixed w-100 mb-1"
                name="message"
                id="message"
                cols="50"
                rows="6" />
            </div>
            <div
              class="flex flex-column flex-justify-between flex-align-center">
              <div
                class="flex flex-row flex-justify-between flex-align-center
                w-100 mb-1">
                <p>Type the following code: {secret}</p>
                <input
                  bind:value={formData.test}
                  class="ml-1"
                  required
                  type="text"
                  name="validator"
                  id="validator"
                  placeholder="Your answer here" />
              </div>
              <button class="w-100" type="submit">Send</button>
            </div>
          </form>

        </div>
      </div>
    {/if}
  </div>

</div>
