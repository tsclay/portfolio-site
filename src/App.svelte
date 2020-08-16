<script>
  import Header from "./components/Header.svelte";
  import Toolbox from "./components/Toolbox.svelte";
  import Brand from "./components/Brand.svelte";
  import Projects from "./components/Projects.svelte";
  import Contact from "./components/Contact.svelte";
  import Copyright from "./components/Copyright.svelte";
  // import Logo from "./components/Logo.svelte";
  import axios from "axios";

  import { onMount } from "svelte";
  let hasLoaded = false;
  let assets = [];
  let secret = "";

  onMount(async () => {
    console.log("App has mounted: ", hasLoaded);
    try {
      const response = await axios.get(
        "https://timclaydev-assets.herokuapp.com/assets"
      );
      // console.log(response);
      assets = response.data[0];
      secret = response.data[1];
      hasLoaded = true;
    } catch (error) {
      console.log(error);
    }
  });

  let step = 0;
  const toggleDiv = () => {
    step = (step + 1) % 2;
  };

  console.log(hasLoaded);
</script>

<div class={hasLoaded ? 'container grid' : 'hidden'}>
  <Header {toggleDiv} />
  <Brand {step} {toggleDiv} />
  <Toolbox />
  <!-- <Logo /> -->
  <Projects {assets} />
  <Contact {secret} />
  <Copyright />
</div>
