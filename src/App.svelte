<script>
  import Header from "./components/Header.svelte";
  import Toolbox from "./components/Toolbox.svelte";
  // import Brand from "./components/Brand.svelte";
  import ProfileImg from "./components/ProfileImg.svelte";
  // import KnowledgeTree from "./components/KnowledgeTree.svelte";
  import Projects from "./components/Projects.svelte";
  import Footer from "./components/Footer.svelte";
  import Copyright from "./components/Copyright.svelte";

  import { onMount } from "svelte";
  let hasLoaded = true;

  onMount(() => {
    hasLoaded = true;
  });

  let step = 0;
  const toggleDiv = () => {
    step = (step + 1) % 2;
  };

  console.log(hasLoaded);
</script>

<div class={hasLoaded ? 'container grid' : 'hidden'}>
  <Header {toggleDiv} />
  <ProfileImg {step} {toggleDiv} />
  <!-- <Brand /> -->
  <Toolbox />
  <!-- <KnowledgeTree /> -->
  <Projects />
  <Footer />
  <Copyright />
</div>
