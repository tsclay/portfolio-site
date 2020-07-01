<script>
  export let name;
</script>

<style>
  footer {
    background: burlywood;
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

<footer>
  <p>{name}, this is the footer.</p>
</footer>
