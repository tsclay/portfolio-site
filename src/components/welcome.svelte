<script>
  export let name;
</script>

<style>
  section {
    background: #00ccff;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
  }
  p {
    color: #1a333a;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  /* .row div {
    width: 40%;
  } */
</style>

<section id="welcome">
  <div class="row">
    <p>{name}, welcome to your website.</p>
  </div>

  <div class="row flex-row flex-justify-around">
    <div>
      <ul>
        <li>
          <a href="">JavaScript</a>
        </li>
        <li>
          <a href="">Python</a>
        </li>
        <li>
          <a href="">PHP</a>
        </li>
      </ul>
    </div>
    <div>
      <ul>
        <li>
          <a href="">React</a>
        </li>
        <li>
          <a href="">Svelte</a>
        </li>
        <li>
          <a href="">PHP</a>
        </li>
        <li>
          <a href="">Django</a>
        </li>
      </ul>
    </div>
    <div>
      <ul>
        <li>
          <a href="">MongoDB</a>
        </li>
        <li>
          <a href="">PostgreSQL</a>
        </li>
        <li>
          <a href="">MySQL</a>
        </li>
      </ul>
    </div>
  </div>

</section>
