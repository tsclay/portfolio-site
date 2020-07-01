<script>
  import Header from "./Header.svelte";
  import Welcome from "./components/welcome.svelte";
  import Main from "./Main.svelte";
  import Footer from "./Footer.svelte";
  let name = "Tim";
</script>

<Header {name} />
<Main {name} />
<Footer {name} />
