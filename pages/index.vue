<template>
  <div>
    <div id="header">
      <h1>José Cámara</h1>
      <h2>@codeserk</h2>
    </div>

    <div class="page-wrapper"></div>

    <div class="page-wrapper color">
      <div class="container mx-auto">Hello world</div>
    </div>

    <div class="page-wrapper"></div>
  </div>
</template>

<script>
import { lightenDarkenColor } from '../utils/color'

export default {
  data: () => ({
    lighten: 0,
    mainColor: '#575fa2'
  }),

  computed: {
    color () {
      return lightenDarkenColor(this.mainColor, 0)
    }
  }
}
</script>

<style lang="scss">

@keyframes textAppear {
  0% { content: '████████████████████' }
  25% { content: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓' }
  50% { content: '▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒' }
  75% { content: '░░░░░░░░░░░░░░░░░░░░' }
  100% { content: ' ' }
}

.container {
  z-index: 2;
}

#header {
  position: absolute;

  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 10vw;
  text-align: center;
  z-index: 5;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  letter-spacing: 0.2em;
  line-height: 1em;
  // filter: drop-shadow(0 0 1px #656565) drop-shadow(0 0 1px #656565);

  h1 {
    font-size: 1.2em;
    position: relative;
    overflow: hidden;

    &::after {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      animation: textAppear 0.5s ease-in-out;
    }
  }
  h2 {
    font-size: 1.1em;
  }
  p {
    letter-spacing: 0;
    margin-top: 10vh;
    font-size: 0.6em;
  }
}

.page-wrapper {
  display: block;
  color: white;;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 100vh;

  &.color {
    background: black;
  }
}

</style>
