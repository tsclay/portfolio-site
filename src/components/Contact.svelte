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

  // let step = 0
  export let width, height
  let timer
  let clientWantsForm = false
  let secret, src
  let formData = { name: '', email: '', subject: '', message: '', test: '' }
  $: statusMsg = ''
  $: isLoading = false

  // const toggleDiv = (e) => {
  //   if (
  //     e.target.id !== 'contact-form' &&
  //     e.target.classList[0] !== 'card-back' &&
  //     step === 1
  //   ) {
  //     return
  //   }
  //   step = (step + 1) % 2
  // }

  // const flip = (node, { duration }) => {
  //   return {
  //     duration,
  //     css: (t) => {
  //       const eased = cubicInOut(t)
  //       const test = (eased - 1) * 180

  //       return `transform: rotateY(${(eased - 1) * 180}deg);`
  //     }
  //   }
  // }

  const fallDown = (node, { duration }) => {
    return {
      duration,
      css: (t) => {
        const eased = cubicInOut(t)
        return `max-height: ${eased * 100}%;`
      }
    }
  }

  const makeFormSecure = async (e, response = null) => {
    const r = response ? response : await fetch('http://localhost:8888/guard')
    secret = await r.headers.get('X-Email-Code')
    src = await r.blob().then((b) => URL.createObjectURL(b))
    console.log(response)
    if (!response) {
      clientWantsForm = true
    }
  }

  const handleForm = async (e) => {
    //  'https://timclaydev-assets.herokuapp.com/assets'
    if (timer) clearTimeout(timer)
    e.preventDefault()
    isLoading = true
    formData.secret = secret
    try {
      const response = await fetch('http://localhost:8888/assets', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      if (response.status === 200) {
        statusMsg = 'Message sent!'
      } else {
        throw new Error(response.headers.get('X-Message'))
      }
    } catch (error) {
      makeFormSecure()
      statusMsg = error
    } finally {
      isLoading = false
      timer = setTimeout(() => {
        statusMsg = ''
      }, 4000)
    }
  }
</script>

<style type="text/scss">
  #footer {
    color: rgb(48, 48, 48);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 1em;
    // background: var(--visitedBlue);
    background: white;
    position: relative;
  }

  p {
    color: rgb(48, 48, 48);
    background: rgb(255, 221, 31);
    text-transform: uppercase;
  }

  .card-front {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    flex-flow: column;
    // background-image: url("../logo-spread.svg");

    svg {
      height: 100%;
      width: 100%;
    }
    .lg-svg-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .card-back {
    overflow: hidden;
    background: rgba(0, 0, 0, 0.75);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #contact-form {
    width: clamp(355px, 85%, 580px);
  }

  form {
    box-sizing: border-box;
    border-radius: 4px;
    border: 2px solid var(--light);
    padding: 2rem;
    background: var(--dark);

    input[name='subject'],
    input[name='name'],
    input[name='email'] {
      width: 100%;
    }

    input[name='validator'] {
      width: 48%;
    }

    textarea {
      resize: none;
      width: 100%;
    }

    #validation {
      display: flex;
      position: relative;

      p {
        position: absolute;
        top: 1px;
        left: 0;
        width: 150px;
        padding: 0.4em;
        margin: 0 0 0.5em 0;
        box-sizing: border-box;
        border: 1px solid #ffdd1f;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          height: 1em;
          font-size: 18px;
        }

        :nth-child(2) {
          font-weight: bold;
        }
      }

      input {
        width: 100%;
        padding-left: 155px;
      }
    }

    #name-email-fields,
    #message,
    #validation {
      margin-bottom: 1.75em;
    }

    #msg-success,
    #msg-fail {
      height: 2em;
      border-radius: 0.25rem;
    }

    #msg-success {
      color: #155724;
      background-color: #d4edda;
      border-color: #c3e6cb;
    }

    #msg-fail {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
    }

    #message-text {
      margin-left: 0.5em;
    }

    .btn-primary[type='submit']:disabled {
      background-color: var(--light);
    }

    .btn-primary {
      width: 100%;
    }
  }

  #connect {
    // width: 100%;
    // height: 50%;
    // display: flex;
    // flex-flow: column nowrap;
    // justify-content: space-between;
    // align-items: center;
    // position: relative;

    width: 50%;
    height: 50%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 2%;
    transform: translate(0, -50%);

    > .flavor-text {
      font-size: 1.5em;
      padding: 4px;
      font-family: 'Anonymous Pro', monospace;
      // color: var(--dark);
      // background-color: var(--light);
      background: black;
      color: white;
      text-transform: uppercase;
      // box-shadow: 0px 0px 20px 10px var(--dark);
    }
  }

  #flip-trigger {
    border-radius: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    font-size: 2rem;
    padding: 8px;
    text-transform: uppercase;
    font-family: 'Anonymous Pro', monospace;
    // box-shadow: 0px 0px 20px 10px var(--dark);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  #flip-trigger:hover {
    box-shadow: 0px 0px 20px 10px var(--dark);
  }

  @media only screen and (min-width: 375px) and (max-width: 665px) {
    #connect {
      width: 100%;
      font-size: 0.7rem;
      transform: translate(-50%, -85%);
      justify-content: space-around;
      left: 50%;
    }
    .card-front {
      .lg-svg-wrapper {
        top: auto;
        width: 100%;
        height: auto;
        bottom: 0;
        left: 0;
        transform: translate(0, -15%);
      }
    }
  }

  @media only screen and (max-width: 900px) {
    #name-email-fields,
    #message,
    #validation {
      margin-bottom: 0.5em;
    }
  }
</style>

<div id="footer" class="h-100">
  <div class="card-front">
    <div class="lg-svg-wrapper">
      <svg
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 657.47"
        class="svelte-k0umk8"><defs>
          <style>
            .cls-1 {
              fill: #fff;
            }
            .cls-2 {
              fill: #414042;
            }
            .cls-3 {
              fill: #231f20;
            }
          </style>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <rect class="cls-1" width="1000" height="657.47" />
            <rect
              class="cls-2"
              x="0.63"
              y="327.02"
              width="998.73"
              height="3"
              rx="1.5"
              transform="translate(1000 657.04) rotate(180)" />
            <rect
              class="cls-2"
              x="0.63"
              y="495.39"
              width="998.73"
              height="3"
              rx="1.5"
              transform="translate(1000 993.78) rotate(-180)" />
            <rect
              class="cls-2"
              x="0.63"
              y="158.65"
              width="998.73"
              height="3"
              rx="1.5"
              transform="translate(1000 320.3) rotate(180)" />
            <rect
              x="500"
              y="70.44"
              width="482.65"
              height="22.97"
              transform="translate(1482.65 163.84) rotate(180)"
              class="cls-3 T-shape" />
            <rect
              x="500"
              y="106.05"
              width="482.65"
              height="6.26"
              transform="translate(1482.65 218.36) rotate(180)"
              class="cls-3 T-shape" />
            <rect
              x="496.89"
              y="336.01"
              width="488.86"
              height="47.18"
              transform="translate(381.73 1100.92) rotate(-90)"
              class="cls-1 T-shape" />
            <rect
              x="507.54"
              y="346.66"
              width="488.86"
              height="25.87"
              transform="translate(392.38 1111.57) rotate(-90)"
              class="cls-3 T-shape" />
            <rect
              x="476.84"
              y="356.07"
              width="488.86"
              height="7.06"
              transform="translate(361.67 1080.86) rotate(-90)"
              class="cls-3 T-shape" />
            <rect
              class="cls-2"
              x="1.27"
              y="3.7"
              width="998.73"
              height="3"
              rx="1.5"
              transform="translate(1001.27 10.41) rotate(180)" />
            <rect
              class="cls-2"
              x="0.63"
              y="650.33"
              width="998.73"
              height="3"
              rx="1.5"
              transform="translate(1000 1303.67) rotate(-180)" />
          </g>
        </g></svg>
    </div>
    <div
      id="connect"
      class="w-100 h-60 flex flex-column flex-justify-between
          flex-align-center">
      <span class="flavor-text">Have a project idea in mind?</span>
      <span class="flavor-text">Want to collaborate?</span>
      <button
        id="flip-trigger"
        class="btn-primary"
        type="click"
        on:click={makeFormSecure}>Let's connect.</button>
    </div>
  </div>
  {#if clientWantsForm}
    <div
      on:click={(e) => {
        if (e.target.closest('#direct-form')) return
        clientWantsForm = false
      }}
      class="card-back"
      transition:fallDown={{ duration: 800 }}>
      <div id="contact-form" class="w-100 flex flex-row flex-justify-center">
        <form on:submit={handleForm} id="direct-form" class="w-80 h-80">
          <div
            id="name-email-fields"
            class="flex flex-row flex-justify-between w-100 ">
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
          <div>
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
              class="textarea-fixed w-100 "
              name="message"
              id="message"
              cols="50"
              rows="10"
              placeholder="Message (required)" />
          </div>
          <div class="flex flex-column flex-justify-between flex-align-center">
            <div
              id="validation"
              class="flex flex-row flex-justify-between flex-align-center
                w-100 ">
              <p
                id="validation-text"
                class="flex flex-row flex-justify-between">
                <span class="text-align-center">Code</span>
                <span><img {src} /></span>
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
              class="btn-primary w-100 mb-1"
              type="submit"
              disabled={isLoading === true ? true : false}>
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
                <span id="message-text">{statusMsg}</span>
              </div>
            {/if}
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>

<!-- <div id="footer" class="h-100">
  <div class="card-inner">
    {#if step === 0}
      <div transition:flip={{ duration: 800 }} class="card-front">
        <div
          id="connect"
          class="w-100 h-60 flex flex-column flex-justify-between
          flex-align-center">
          <span class="flavor-text">Have a project idea in mind?</span>
          <span class="flavor-text">Want to collaborate?</span>
          <button
            id="flip-trigger"
            class="btn-primary"
            type="click"
            on:click={toggleDiv}>Let's connect.</button>
        </div>
      </div>
    {:else}
      <div
        on:click={toggleDiv}
        class="card-back"
        transition:flip={{ duration: 800 }}>
        <div id="contact-form" class="w-100 flex flex-row flex-justify-center">
          <form on:submit={handleForm} id="direct-form" class="w-80 h-80">
            <div
              id="name-email-fields"
              class="flex flex-row flex-justify-between w-100 ">
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
                class="textarea-fixed w-100 "
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
                w-100 ">
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
                class="btn-primary w-100 mb-1"
                type="submit"
                disabled={isLoading === true ? true : false}>
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
                  <span id="message-text">{statusMsg}</span>
                </div>
              {/if}
            </div>
          </form>
        </div>
      </div>
    {/if}
  </div>
</div> -->

<!-- 
<svg
preserveAspectRatio="none"
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 1000 657.47"
class="svelte-k0umk8"><defs><style>
    .cls-1 {
      fill: #fff;
    }
    .cls-2 {
      fill: #414042;
    }
    .cls-3 {
      fill: #231f20;
    }
  </style></defs>
<g id="Layer_2" data-name="Layer 2">
  <g id="Layer_1-2" data-name="Layer 1">
    <rect class="cls-1" width="1000" height="657.47" />
    <rect
      class="cls-2"
      x="0.63"
      y="327.02"
      width="998.73"
      height="3"
      rx="1.5"
      transform="translate(1000 657.04) rotate(180)" />
    <rect
      class="cls-2"
      x="0.63"
      y="495.39"
      width="998.73"
      height="3"
      rx="1.5"
      transform="translate(1000 993.78) rotate(-180)" />
    <rect
      class="cls-2"
      x="0.63"
      y="158.65"
      width="998.73"
      height="3"
      rx="1.5"
      transform="translate(1000 320.3) rotate(180)" />
    <rect
      x={width > 665 ? '500' : `${500 + 80}`}
      y={width > 665 ? '70.44' : `${70.44 - 115}`}
      width={width > 665 ? '482.65' : `250`}
      height="22.97"
      transform="translate(1482.65 163.84) rotate(180)"
      class="cls-3 T-shape" />
    <rect
      x={width > 665 ? '500' : `${500 + 80}`}
      y={width > 665 ? '106.05' : `${106.05 - 115}`}
      width={width > 665 ? '482.65' : `250`}
      height="6.26"
      transform="translate(1482.65 218.36) rotate(180)"
      class="cls-3 T-shape" />
    <rect
      x={width > 665 ? '496.89' : `${496.89 + 200}`}
      y={width > 665 ? '336.01' : `${336.01 + 40}`}
      width={width > 665 ? '488.86' : `175`}
      height="47.18"
      transform="translate(381.73 1100.92) rotate(-90)"
      class="cls-1 T-shape" />
    <rect
      x={width > 665 ? '507.54' : `${507.54 + 200}`}
      y={width > 665 ? '346.66' : `${346.66 + 40}`}
      width={width > 665 ? '488.86' : `175`}
      height="25.87"
      transform="translate(392.38 1111.57) rotate(-90)"
      class="cls-3 T-shape" />
    <rect
      x={width > 665 ? '476.84' : `${476.84 + 200}`}
      y={width > 665 ? '356.07' : `${356.07 + 40}`}
      width={width > 665 ? '488.86' : `175`}
      height="7.06"
      transform="translate(361.67 1080.86) rotate(-90)"
      class="cls-3 T-shape" />
    <rect
      class="cls-2"
      x="1.27"
      y="3.7"
      width="998.73"
      height="3"
      rx="1.5"
      transform="translate(1001.27 10.41) rotate(180)" />
    <rect
      class="cls-2"
      x="0.63"
      y="650.33"
      width="998.73"
      height="3"
      rx="1.5"
      transform="translate(1000 1303.67) rotate(-180)" />
  </g>
</g></svg> -->
