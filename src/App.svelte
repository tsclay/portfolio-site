<script>
  import Header from './components/Header.svelte'
  import Toolbox from './components/Toolbox.svelte'
  // import Brand from "./components/Brand.svelte";
  import ProfileImg from './components/ProfileImg.svelte'
  // import KnowledgeTree from "./components/KnowledgeTree.svelte";
  import Projects from './components/Projects.svelte'
  import Contact from './components/Contact.svelte'
  import Copyright from './components/Copyright.svelte'
  import axios from 'axios'

  import { onMount } from 'svelte'
  let hasLoaded = true
  let assets = []
  let secret = ''

  onMount(async () => {
    hasLoaded = await true
    try {
      const response = await axios.get(
        'https://timclaydev-assets.herokuapp.com/assets'
      )
      // console.log(response);
      assets = response.data[0]
      secret = response.data[1]
    } catch (error) {
      console.log(error)
    }
  })

  let step = 0
  const toggleDiv = () => {
    step = (step + 1) % 2
  }

  console.log(hasLoaded)
</script>

<div class={hasLoaded ? 'container grid' : 'hidden'}>
  <Header {toggleDiv} />
  <ProfileImg {step} {toggleDiv} />
  <!-- <Brand /> -->
  <Toolbox />
  <!-- <KnowledgeTree /> -->
  <Projects {assets} />
  <Contact {secret} />
  <Copyright />
</div>
