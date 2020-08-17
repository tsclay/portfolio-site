<script>
  export let toggleDiv;
</script>

<style>
  p {
    color: #1a333a;
    margin: 0;
    text-transform: uppercase;
    font-weight: 100;
  }

  #header {
    background: rgb(252, 120, 68);
  }

  #title {
    font-size: 4em;
    margin-bottom: 0.2em;
  }

  #subtitle {
    left: 15%;
    font-size: 2em;
  }

  li {
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  .fa-github {
    color: black;
  }

  .fa-linkedin {
    color: #2867b2;
  }

  @media only screen and (max-width: 950px) {
    #subtitle {
      font-size: 1.5em;
    }
  }

  @media only screen and (max-width: 790px) {
    #subtitle {
      font-size: 2em;
    }
  }

  @media only screen and (max-width: 510px) {
    #subtitle {
      left: 0;
    }
  }
</style>

<div id="header" class="flex-row nowrap flex-justify-between">
  <div class="w-100 h-90">
    <div class="pos-relative ml-2">
      <p class="pos-relative" id="title">Tim Clay</p>
      <p class="pos-absolute" id="subtitle">Software Developer</p>
    </div>
  </div>

  <div id="personal-links" class="w-10 mr-1">
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
      <!-- <li class="mb-1">
        <i class="fas fa-envelope" />
      </li> -->
      <li>
        <a target="_blank" href="https://github.com/tsclay">
          <i class="fab fa-github" />
        </a>

      </li>
    </ul>
  </div>
</div>
