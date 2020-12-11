<script>
  import Banner from "./components/Banner.svelte";
  import Toolbox from "./components/Toolbox.svelte";
  import Brand from "./components/Brand.svelte";
  import Projects from "./components/Projects.svelte";
  import Contact from "./components/Contact.svelte";
  import Copyright from "./components/Copyright.svelte";
  // import Logo from "./components/Logo.svelte";
  import axios from "axios";

  import { onMount } from "svelte";
  let hasLoaded = false;
  $: assets = [];
  let secret = "";

  onMount(async () => {
    try {
      const response = await axios.get(
        "https://timclaydev-assets.herokuapp.com/assets"
      );
      // console.log(response);
      assets = response.data[0];
      console.log("main on mount ", assets);
      secret = response.data[1];
      hasLoaded = true;
      console.log("App has mounted: ", hasLoaded);
    } catch (error) {
      console.log("this is the error", error);
    }
  });

  let step = 0;
  const toggleDiv = () => {
    step = (step + 1) % 2;
  };

  console.log(hasLoaded);
</script>

<div class={hasLoaded ? 'container grid' : 'hidden'}>
  <Banner {toggleDiv} />
  <Brand {step} {toggleDiv} />
  <!--<Toolbox />
  <Logo /> -->
  <Projects {assets} />
  <!--<Contact {secret} />
  <Copyright /> -->
</div>
