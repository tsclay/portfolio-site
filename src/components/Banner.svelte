<script>
  export let toggleDiv;

  // const preload = (src) => {
  //   return new Promise((resolve) => {
  //     let img = new Image();
  //     img.onload = resolve;
  //     img.src = src;
  //   });
  // };
</script>

<style type="text/scss">
  div.banner {
    overflow: hidden;
    width: 100%;
    height: 100vh;
    min-height: 665px;
    min-width: 375px;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  div.name-title {
    position: absolute;
    width: 75%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-flow: column nowrap;
    align-items: baseline;
    span {
      display: inline-block;
      padding: 0.5rem;
      text-transform: uppercase;
      background: var(--dark);
      color: var(--light);
      font-size: clamp(1.5rem, 3vw, 4rem);
    }
    span:first-of-type {
      margin-bottom: 8px;
    }
  }

  @media only screen and (min-width: 1100px) {
    div.banner {
      min-height: 800px;
      img {
        width: 100%;
      }
    }
  }
  @media only screen and (min-width: 930px) and (max-width: 1099px) {
    div.banner {
      img {
        width: 120%;
        left: 0;
      }
    }
  }

  @media only screen and (min-width: 580px) and (max-width: 929px) {
    div.banner {
      img {
        left: -15rem;
        width: 170%;
      }
    }
  }

  // iPhone 7/8/10 - portrait orientation
  // 776
  @media only screen and (min-width: 414px) and (max-width: 578px) {
    div.banner {
      img {
        left: -25rem;
        width: auto;
      }
    }
  }

  // iPhone 7/8/10 - landscape mode
  @media only screen and (width: 667px) and (min-height: 300px) {
    div.banner {
      img {
        left: -5rem;
        width: auto;
      }
    }
  }

  // iPhone 7/8/10 - portrait orientation
  @media only screen and (width: 375px) {
    div.banner {
      img {
        left: -17rem;
        width: auto;
      }
    }
  }
</style>

<div id="header" class="banner">
  <!-- {#await preload('/img/tclay3.jpg')}
    <div
      style="width: 50%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50%, 50%);">
      <svg
        class="loading-spinner"
        xmlns="http://www.w3.org/2000/svg"
        width="500"
        height="500"
        viewBox="0 0 132.29166 132.29167">
        <g>
          <path
            d="m 66.573613,126.66219 9.9e-4,-8e-5 c 33.183731,-6e-5 60.084447,-27.034831 60.084487,-60.38394 l 7e-5,-0.0029"
            style="fill:none;fill-rule:evenodd;stroke:#00ffff;stroke-width:10.7299;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        </g>
      </svg>
    </div>
  {:then} -->
  <img src="/img/tclay3-min.png" alt="Tim Clay" />
  <div class="name-title">
    <span>Tim Clay</span>
    <span>Software Developer</span>
  </div>
  <!-- {/await} -->
  <!-- <div class="w-100 h-90">
    <div class="pos-relative ml-2">
      <p class="pos-relative" id="title">Tim Clay</p>
      <p class="pos-absolute" id="subtitle">Software Developer</p>
    </div>
  </div> -->

  <!-- <div id="personal-links" class="w-10 mr-1">
    <ul
      class="w-30 flex-column flex-justify-between flex-align-center
      ul-list-none mx-auto">
      <li>
        <a
          target="_blank"
          href="https://drive.google.com/file/d/1r5sSCFaSTBwFfqNDh0mh__xHUkVceMjb/view?usp=sharing">
          <i class="fas fa-info-circle" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/timothy-clay-software-developer/">
          <i class="fab fa-linkedin" />
        </a>
      </li>
      <li class="mb-1">
        <i class="fas fa-envelope" />
      </li> 
      <li>
        <a target="_blank" href="https://github.com/tsclay">
          <i class="fab fa-github" />
        </a>

      </li>
    </ul>
  </div> -->
</div>
