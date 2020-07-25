<script>
  export let toggleDiv;
</script>

<style>
  p {
    color: #1a333a;
    margin-top: 0;
    margin-bottom: 0.5em;
    text-transform: uppercase;
    font-weight: 100;
  }

  #header {
    background: burlywood;
  }

  #title {
    font-size: 4em;
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
</style>

<div id="header" class="flex-row nowrap flex-justify-between flex-align-center">
  <div class="w-100 h-100">
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
        <a href="#" on:click={toggleDiv}>
          <i class="fas fa-info-circle" />
        </a>

      </li>
      <li>
        <a href="https://www.linkedin.com/in/timothy-clay-software-developer/">
          <i class="fab fa-linkedin" />
        </a>
      </li>
      <!-- <li class="mb-1">
        <i class="fas fa-envelope" />
      </li> -->
      <li>
        <a href="https://github.com/tsclay">
          <i class="fab fa-github" />
        </a>

      </li>
    </ul>
  </div>
</div>
