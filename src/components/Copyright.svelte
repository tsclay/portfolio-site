<script>
  const year = new Date().getFullYear()
</script>

<style>
  #copyright-notices {
    color: rgb(48, 48, 48);
    background-color: rgb(48, 48, 48);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    font-size: 0.75em;
    align-content: center;
    height: 25vh;
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
  <span>
    Copyright ©
    {year}
    Tim Clay All Rights Reserved. Made with ❤️ using Svelte.
  </span>
</div>
