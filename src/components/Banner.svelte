<script>
  export let toggleDiv
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

  @media only screen and (min-width: 960px) {
    div.banner {
      img {
        width: 100%;
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
  <img src="/img/tclay3.jpg" alt="Tim Clay" />
  <div class="name-title">
    <span>Tim Clay</span>
    <span>Software Developer</span>
  </div>
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
