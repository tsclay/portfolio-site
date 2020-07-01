<script>
  import Welcome from "./components/welcome.svelte";
  export let name;
</script>

<style>
  section {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: rgb(48, 48, 48);
  }

  p {
    background: rgb(48, 48, 48);
    font-style: italic;
    color: white;
    padding: 20px;
    line-height: 2em;
    width: 75%;
    -webkit-box-shadow: 0px 2px 28px 12px rgba(163, 163, 163, 1);
    -moz-box-shadow: 0px 2px 28px 12px rgba(163, 163, 163, 1);
    box-shadow: 0px 2px 28px 12px rgba(163, 163, 163, 1);
  }
</style>

<main>
  <Welcome {name} />
  <section id="brand">

    <p>
      <span>
        Composing a 15-minute musical work for orchestra taught me two important
        lessons: music is a rocky marriage of logic and beauty; and planning is
        their favorite marriage counselor.
      </span>
      <br />
      <span>
        As a software developer, I strive for a similar balance: developing
        logical code bases and crafting modern client-end designs that pleases
        programmers and clients alike.
      </span>
    </p>

  </section>
</main>
