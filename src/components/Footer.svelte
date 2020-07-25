<script>
  import ProfileImg from "./ProfileImg.svelte";
  export let toggleDiv;

  console.log(toggleDiv);
</script>

<style>
  #footer {
    /* background-color: #333; */
    background-color: #00ccff;
    color: rgb(48, 48, 48);
    /* color: white; */
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 1.5em;
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
</style>

<div id="footer" class="h-100">
  <ul class="w-100 flex-row flex-justify-evenly flex-align-center ul-list-none">
    <li on:click={toggleDiv}>
      About
      <i class="fas fa-info-circle" />
    </li>
    <li>
      <a href="mailto:tsclay9@gmail.com">
        Contact
        <i class="fas fa-envelope" />
      </a>
    </li>
    <li>
      <a href="https://github.com/tsclay">
        GitHub
        <i class="fab fa-github" />
      </a>
    </li>
  </ul>
</div>
