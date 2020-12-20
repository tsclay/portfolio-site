<script>
  import Banner from './components/Banner.svelte'
  import Toolbox from './components/Toolbox.svelte'
  import Brand from './components/Brand.svelte'
  import Projects from './components/Projects.svelte'
  import Contact from './components/Contact.svelte'
  import Copyright from './components/Copyright.svelte'
  import { onMount } from 'svelte'
  import { windowWidth, windowHeight } from './stores.js'

  let width
  let height

  const unsubscribeWidth = windowWidth.subscribe((value) => (width = value))
  const unsubscribeHeight = windowHeight.subscribe((value) => (height = value))

  let hasLoaded = false
  $: assets = []
  let secret = ''
  let laptopShouldEnter = false
  let target

  let options = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
  }

  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.5) {
        laptopShouldEnter = true
        observer.unobserve(target)
      }
    })
  }

  let observer = new IntersectionObserver(callback, options)

  onMount(async () => {
    try {
      const response = await fetch(
        'https://timclaydev-assets.herokuapp.com/assets'
      ).then((r) => r.json())
      ;[assets, secret] = response
      hasLoaded = true
    } catch (error) {
      console.log('this is the error', error)
    }

    target = document.querySelector('#profile')
    observer.observe(target)
  })

  // let step = 0;
  // const toggleDiv = () => {
  //   step = (step + 1) % 2;
  // };

  console.log(hasLoaded)
</script>

<svelte:window
  on:resize={() => {
    windowWidth.set(window.innerWidth)
    windowHeight.set(window.innerHeight)
  }} />

<div id="root" class={hasLoaded ? 'container grid' : 'hidden'}>
  <Banner />
  <Brand {laptopShouldEnter} {width} {height} />
  <Projects {assets} {width} {height} />
  <Contact {secret} />
  <Copyright />
</div>
