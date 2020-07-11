<script>
  import { fade, fly } from "svelte/transition";
  let visible = true;

  setInterval(() => {
    visible = !visible;
  }, 5000);
</script>

<style>
  .parent {
    position: relative;
  }

  .child {
    position: absolute;
    top: 0;
  }

  .child-1 {
    left: 0;
  }
  .child-2 {
    left: 0;
  }
</style>

<label>
  <input type="checkbox" bind:checked={visible} />
  visible
</label>

<div class="parent">
  {#if visible}
    <div
      class="child child-1"
      in:fly={{ x: 200, duration: 2100 }}
      out:fly={{ x: -200, duration: 2000 }}>
      Flies in, fades out
    </div>
  {:else}
    <div
      class="child child-2"
      in:fly={{ x: 200, duration: 2100 }}
      out:fly={{ x: -200, duration: 2000 }}>
      What up
    </div>
  {/if}
</div>
