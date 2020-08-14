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
  import axios from 'axios'

  let step = 0
  export let secret
  let formData = { name: '', email: '', subject: '', message: '', test: '' }
  $: statusMsg = ''
  $: isLoading = false

  const toggleDiv = (e) => {
    if (e.target.id !== 'contact-form' && step === 1) return
    step = (step + 1) % 2
  }

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

  const handleForm = async (e) => {
    e.preventDefault()
    isLoading = true
    // console.log(formData);
    formData.secret = secret
    try {
      const response = await axios.post(
        'https://timclaydev-assets.herokuapp.com/assets',
        formData
      )
      console.log(response.data)
      const { code } = response.data
      secret = response.data.secret
      if (code === 200) {
        statusMsg = 'Message sent!'
      }
    } catch (error) {
      const { message, code } = error.response.data
      secret = error.response.data.secret
      statusMsg = message
    } finally {
      isLoading = false
      setTimeout(() => {
        statusMsg = ''
      }, 4000)
      // clearTimeout(timer)
    }
  }
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

  p {
    margin: 0 0 0.5em 0;
    padding: 0.4em;
    color: rgb(48, 48, 48);
    background: rgb(255, 221, 31);
    text-transform: uppercase;
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

  #contact-form {
    margin-top: 1.25em;
  }

  input[name='validator'] {
    width: 48%;
  }

  input[name='validator'] {
    width: 48%;
  }

  input[name='name'],
  input[name='email'] {
    width: 46%;
  }

  #validation > p,
  #validation > input {
    width: 46%;
  }

  #validation > p :nth-child(2) {
    font-weight: bold;
  }

  #connect {
    position: absolute;
    top: 15%;
    left: 0;
  }

  #connect > .flavor-text {
    font-size: 1.5em;
    padding: 0 4px 0 4px;
    font-family: 'Anonymous Pro', monospace;
    color: rgb(48, 48, 48);
    background-color: rgb(196, 196, 196);
    text-transform: uppercase;
    box-shadow: 0px 0px 20px 10px rgb(48, 48, 48);
  }

  #flip-trigger {
    color: rgb(48, 48, 48);
    background-color: rgb(196, 196, 196);
    padding: 8px;
    text-transform: uppercase;
    font-family: 'Anonymous Pro', monospace;
    font-size: 4em;
    box-shadow: 0px 0px 20px 10px rgb(48, 48, 48);
    cursor: pointer;
    transition: color 0.2s linear;
    transition: background-color 0.2s linear;
  }

  #flip-trigger:hover {
    text-decoration: underline;
    background-color: rgb(48, 48, 48);
    color: rgb(196, 196, 196);
  }

  #msg-success,
  #msg-fail {
    color: rgb(196, 196, 196);
    height: 2em;
  }

  #msg-success {
    background-color: rgba(0, 128, 0, 0.75);
  }

  #msg-fail {
    background-color: rgba(255, 0, 0, 0.75);
  }

  .loading-spinner {
    width: 20px;
    height: 20px;
  }
</style>

<div id="footer" class="h-100">

  <div class="card-inner">
    {#if step === 0}
      <div transition:flip={{ duration: 800 }} class="card-front">
        <img class="img-fill" src="/img/connect.jpeg" alt="" />
        <div
          id="connect"
          class="w-100 h-60 flex flex-column flex-justify-between
          flex-align-center">
          <span class="flavor-text">Have a project idea in mind?</span>
          <span class="flavor-text">Want to collaborate?</span>
          <span on:click={toggleDiv} id="flip-trigger">Let's connect.</span>
        </div>
      </div>
    {:else}
      <div
        on:click={toggleDiv}
        class="card-back"
        transition:flip={{ duration: 800 }}>
        <div
          id="contact-form"
          class="w-100 h-100 flex flex-row flex-justify-center">
          <form on:submit={handleForm} id="direct-form" class="w-80 h-80">
            <div class="flex flex-row flex-justify-between w-100">
              <input
                on:input={(e) => {
                  formData.name = e.target.value
                }}
                required
                type="text"
                name="name"
                placeholder="Name (required)" />
              <input
                on:input={(e) => {
                  formData.email = e.target.value
                }}
                required
                name="email"
                type="email"
                placeholder="Email (required)" />
            </div>
            <div class="w-100">
              <input
                on:input={(e) => {
                  formData.subject = e.target.value
                }}
                class="w-100"
                type="text"
                name="subject"
                placeholder="Subject" />
              <textarea
                on:input={(e) => {
                  formData.message = e.target.value
                }}
                required
                class="textarea-fixed w-100 mb-1"
                name="message"
                id="message"
                cols="50"
                rows="7"
                placeholder="Message (required)" />
            </div>
            <div
              class="flex flex-column flex-justify-between flex-align-center">
              <div
                id="validation"
                class="flex flex-row flex-justify-between flex-align-center
                w-100 mb-1">
                <p
                  id="validation-text"
                  class="flex flex-row flex-justify-between">
                  <span class="text-align-center">Code</span>
                  <span>{secret}</span>
                </p>
                <input
                  on:input={(e) => {
                    formData.test = e.target.value
                  }}
                  class="ml-1"
                  required
                  type="text"
                  name="validator"
                  id="validator"
                  placeholder="Code (required)" />
              </div>
              <button
                class="btn-blue w-100 mb-1"
                type="submit"
                style={isLoading === true ? 'background-color: rgb(196, 196, 196);' : null}>
                {#if isLoading === false}
                  SEND
                {:else}
                  <img
                    class="loading-spinner"
                    src="../../img/bitmap.png"
                    alt="Sending..." />
                {/if}
              </button>

              {#if statusMsg !== ''}
                <div
                  class="w-100 mb-1 flex flex-row flex-align-center"
                  id={statusMsg === 'Message sent!' ? 'msg-success' : 'msg-fail'}>
                  <span class="ml-2">{statusMsg}</span>
                </div>
              {/if}
            </div>
          </form>

        </div>
      </div>
    {/if}
  </div>

</div>
