<script>
  import Header from "./components/Header.svelte";
  import Toolbox from "./components/Toolbox.svelte";
  import Brand from "./components/Brand.svelte";
  import ProfileImg from "./components/ProfileImg.svelte";
  // import KnowledgeTree from "./components/KnowledgeTree.svelte";
  import Projects from "./components/Projects.svelte";
  import Footer from "./components/Footer.svelte";

  import { onMount } from "svelte";
  let hasLoaded = true;

  onMount(() => {
    hasLoaded = true;
  });

  console.log(hasLoaded);
</script>

<div class={hasLoaded ? 'container grid' : 'hidden'}>
  <ProfileImg />
  <Brand />
  <Toolbox />
  <!-- <KnowledgeTree /> -->
  <Projects />
  <Footer />
</div>
