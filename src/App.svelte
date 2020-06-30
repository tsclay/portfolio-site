<script>
  import Header from "./Header.svelte";
  import Main from "./Main.svelte";
  export let name;
</script>

<Header {name} />
<Main {name} />
