<script>
  import Banner from "./components/Banner.svelte";
  import Brand from "./components/Brand.svelte";
  import Projects from "./components/Projects.svelte";
  import Contact from "./components/Contact.svelte";
  import Copyright from "./components/Copyright.svelte";
  import { onMount } from "svelte";
  import { windowWidth, windowHeight } from "./stores.js";

  let width;
  let height;

  const unsubscribeWidth = windowWidth.subscribe((value) => (width = value));
  const unsubscribeHeight = windowHeight.subscribe((value) => (height = value));

  let hasLoaded = false;
  $: assets = [];
  let preloadedImgs = [];
  let laptopShouldEnter = false;
  let playCardsAnimation = false;

  const preload = (src) => {
    console.log("inside preload ", src);
    return new Promise((resolve) => {
      let img = new Image();
      img.onload = resolve;
      img.src = src;
      return img;
    });
  };

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.25, 0.5, 0.75, 1.0],
  };

  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.5 && entry.target.id == "profile") {
        laptopShouldEnter = true;
        observer.unobserve(entry.target);
        assets.forEach(async (a) => {
          let img = await preload(a.image);
          img = await img.target;
          img.alt = a.title;
          img.style.cssText = `
            height: 100%; 
            width: 100%; 
            display: block;
          `;
          a.image = img.outerHTML;
          console.log(assets);
          assets = assets;
        });
      } else if (
        entry.intersectionRatio >= 0.5 &&
        entry.target.id == "project-carousel"
      ) {
        playCardsAnimation = true;
        observer.unobserve(entry.target);
      }
    });
  };

  let observer = new IntersectionObserver(callback, options);

  onMount(async () => {
    // https://timclaydev-assets.herokuapp.com/assets
    try {
      assets = await fetch(
        "https://timclaydev-assets.herokuapp.com/assets"
      ).then((r) => r.json());
      assets = assets.filter((a) => a.status == "active");
      await preload("/img/tclay3-min.png");
      hasLoaded = true;
    } catch (error) {
      console.log("this is the error", error);
    }
  });

  // const fetchResources = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://timclaydev-assets.herokuapp.com/assets"
  //     ).then((r) => r.json());
  //     [assets, secret] = response;
  //     hasLoaded = true;
  //     console.log("inside promise!");
  //   } catch (error) {
  //     console.log("this is the error", error);
  //   }
  // };

  // let promise = fetchResources();

  // const gatherResourceFiles = async (fileNames) => {
  //   for (let i = 0; i < fileNames.length; i++) {
  //     await preload(fileNames[i])
  //   }
  // }

  // let step = 0;
  // const toggleDiv = () => {
  //   step = (step + 1) % 2;
  // };

  // observer.observe(document.querySelector('#profile'))
  // observer.observe(document.querySelector('#project-carousel'))

  console.log(hasLoaded);
</script>

<svelte:window
  on:resize={() => {
    windowWidth.set(window.innerWidth);
    windowHeight.set(window.innerHeight);
  }}
/>

<div id="root" class="container grid">
  {#if !hasLoaded}
    <!-- {#await (() => {
    console.log(document.querySelector('svg'));
    assets.forEach((a) => preload(a.image));
    preload('/img/tclay3.jpg');
  })(assets)} -->
    <div
      style="width: 50%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(50%, 50%);"
    >
      <svg
        class="loading-spinner"
        xmlns="http://www.w3.org/2000/svg"
        width="500"
        height="500"
        viewBox="0 0 132.29166 132.29167"
      >
        <g>
          <path
            d="m 66.573613,126.66219 9.9e-4,-8e-5 c 33.183731,-6e-5 60.084447,-27.034831 60.084487,-60.38394 l 7e-5,-0.0029"
            style="fill:none;fill-rule:evenodd;stroke:#00ffff;stroke-width:10.7299;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
          />
        </g>
      </svg>
    </div>
    <!-- {:then} -->
  {:else}
    <Banner />
    <Brand {observer} {laptopShouldEnter} {width} {height} />
    <Projects
      {observer}
      {playCardsAnimation}
      {assets}
      {width}
      {height}
      {preloadedImgs}
    />
    <Contact {width} {height} />
    <Copyright />
    <!-- {/await} -->
  {/if}
</div>
