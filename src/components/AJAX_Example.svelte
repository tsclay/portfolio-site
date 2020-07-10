<script>
  import { onMount } from "svelte";
  let nums = [1, 2, 3, 4];
  export let randomDogs = [];

  onMount(async () => {
    const res = await fetch("https://dog.ceo/api/breeds/image/random/4");
    randomDogs = await res.json();
    randomDogs = randomDogs.message;
  });
</script>

<style>

</style>

<div id="project-carousel">
  {#each randomDogs as dog}
    <img src={dog} />
  {:else}
    <p>loading...</p>
  {/each}
</div>
