<script>

</script>

<style>
  img {
    width: 100%;
    height: 100%;
  }

  .card-inner:hover {
    transform: rotateY(180deg);
    transition: transform 0.8s;
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .card-back {
    background-color: #333;
    color: white;
    /* padding: 20px; */
    transform: rotateY(180deg);
  }
</style>

<div id="profile">
  <div class="card-inner">
    <div class="card-front">
      <img src="/img/tim.jpg" alt="Tim" />
    </div>
    <div class="card-back">
      <img src="/img/drawing.svg" alt="name" />
    </div>
  </div>
  <div />
</div>
