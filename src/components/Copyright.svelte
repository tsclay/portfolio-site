<script>
  const year = new Date().getFullYear()
</script>

<style type="text/scss">
  #copyright-notices {
    color: var(--dark);
    background-color: black;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    font-size: 0.75em;
    align-items: center;
    height: 25vh;
  }

  .socials {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-flow: row nowrap;
    width: 50%;

    a {
      border-radius: 50px;
      width: 50px;
      height: 50px;
      font-size: 2rem;
    }
  }

  span {
    display: block;
    text-transform: uppercase;
    margin: 0 auto;
    font-weight: 200;
    text-align: center;
    background: rgb(196, 196, 196);
    padding: 8px;
  }
</style>

<div id="copyright-notices" class="flex flex-row flex-align-center">
  <div class="socials">
    <a
      class="btn-primary"
      target="_blank"
      href="https://drive.google.com/file/d/1r5sSCFaSTBwFfqNDh0mh__xHUkVceMjb/view?usp=sharing">
      <i class="fas fa-info-circle" />
    </a>
    <a
      class="btn-primary"
      target="_blank"
      href="https://www.linkedin.com/in/timothy-clay-software-developer/">
      <i class="fab fa-linkedin" />
    </a>
    <a class="btn-primary" target="_blank" href="https://github.com/tsclay">
      <i class="fab fa-github" />
    </a>
  </div>
  <span> Copyright © {year} Tim Clay All Rights Reserved. </span>
</div>
