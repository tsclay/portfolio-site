<script>
  export let name;
</script>

<style>
  section {
    background: #00ccff;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  p {
    color: #1a333a;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }
</style>

<section id="welcome">
  <p>{name}, welcome to your website.</p>
</section>
