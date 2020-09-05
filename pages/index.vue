<template>
  <div id="scene">
    <div id="header">José Cámara    @codeserk</div>
    <div
      id="background"
        :style="{
          'background-image': `url(${require('~/assets/img/background.png')})`,
          '-webkit-mask-image': `url(${require('~/assets/img/background.png')})`,

        }"
      class="layer layyer-bottom"
    />
    <div
      id="moon"
        :style="{
          'background-image': `url(${require('~/assets/img/moon.png')})`,
          '-webkit-mask-image': `url(${require('~/assets/img/moon.png')})`,
        }"
      class="layer layer-top"
    />
    <div
      id="clouds-far"
        :style="{
          'background-image': `url(${require('~/assets/img/clouds-far.png')})`,
          '-webkit-mask-image': `url(${require('~/assets/img/clouds-far.png')})`,
        }"
      class="layer layer-top"
    />

    <div
      id="mountain-far-cover"
        :style="{
          'background-image': `url(${require('~/assets/img/mountain-far-cover.png')})`,
          '-webkit-mask-image': `url(${require('~/assets/img/mountain-far-cover.png')})`,
        }"
      class="layer layer-bottom"
    />
    <div
      id="mountain-far"
        :style="{
          'background-image': `url(${require('~/assets/img/mountain-far.png')})`,
          '-webkit-mask-image': `url(${require('~/assets/img/mountain-far.png')})`,
        }"
      class="layer layer-bottom"
    />

    <div
      id="clouds-near"
        :style="{
          'background-image': `url(${require('~/assets/img/clouds-near.png')})`,
          '-webkit-mask-image': `url(${require('~/assets/img/clouds-near.png')})`,
        }"
      class="layer layer-bottom"
    />

    <div
      id="mountains-near"
        :style="{
          'background-image': `url(${require('~/assets/img/mountains-near.png')})`,
          '-webkit-mask-image': `url(${require('~/assets/img/mountains-near.png')})`,
        }"
      class="layer layer-bottom"
    />
    <div
      id="trees-far"
        :style="{
          'background-image': `url(${require('~/assets/img/trees-far.png')})`,
          '-webkit-mask-image': `url(${require('~/assets/img/trees-far.png')})`,
        }"
      class="layer layer-bottom"
    />
    <div
      id="trees-near"
        :style="{
          'background-image': `url(${require('~/assets/img/trees-near.png')})`,
          '-webkit-mask-image': `url(${require('~/assets/img/trees-near.png')})`,
        }"
      class="layer layer-bottom"
    />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
$background: #D34E45;
$high-fps: 2;
$low-fps: 1;

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  background: $background;
  overflow: hidden;
}

#scene {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1;
  user-select: none;
  background: lighten($background, 20%);
  z-index: 1;
  transition: background 0.4s steps(4);
  &:hover {
      &, .layer {
        // background-color: #263238;
      }
  }
}

@keyframes moveLeft {
  0% {
    transform: translate3d(400vw, 0, 0);
  }
  100% {
    transform: translate3d(0vw, 0, 0);
  }
}
@keyframes moveRight {
  0% {
    transform: translate3d(-400vw, 0, 0);
  }
  100% {
    transform: translate3d(0vw, 0, 0);
  }
}

.layer {
    image-rendering: pixelated;
    background-repeat: repeat-x;
    mask-repeat: repeat-x;
    background-size: contain;
    mask-size: contain;
    background-color: lighten($background, 10%);
    // transition: background-color 0.4s ease-in-out;
    // background-blend-mode: multiply;
    background-blend-mode: multiply;
    position: absolute;
    left: 0;
    right: 0;

    &.layer-top {
        background-position: top;
        mask-position: top;
    }
    &.layer-bottom {
        background-position: bottom;
        mask-position: bottom;
    }
}

#header {
  font-size: 150px;
  position: fixed;
  text-align: center;
  z-index: 5;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  right: 0;
  color: white;
}

#background {
    bottom: 10vh;
    height: 70vh;
    max-height: 60vw;
}

#moon {
    top: 5vw;
    right: 5vw;
    height: 20vh;
    background-repeat: no-repeat;
    mask-repeat: no-repeat;
    background-position: top right;
    mask-position: top right;
    background-color: lighten($background, 40%);;
}

#clouds-far {
    height: 20vh;
    top: 0vh;
    animation: moveRight 3000s infinite steps($low-fps * 3000);
    background-size: contain;
    mask-size: contain;
    left: 0;
    right: -400vw;
}
#clouds-near {
    height: 20vh;
    bottom: 20vh;
    animation: moveRight 1000s infinite steps($low-fps * 1000);
    background-size: contain;
    mask-size: contain;
    left: 0vw;
    right: -400vw;
}

#mountain-far {
    height: 60vh;
    bottom: 14vh;
    background-position: bottom right;
    mask-position: bottom right;
    background-size: contain;
    mask-size: contain;
    right: 0;
    left: 0;
}
#mountain-far-cover {
    background-repeat: repeat;
    mask-repeat: repeat;
    height: 15vh;
    bottom: 0;
}

@media (max-width: theme('screens.sm')) {
    #background {
        bottom: 0vh;
    }
    #mountain-far {
        bottom: 10vh;
    }
    #mountain-far-cover {
        height: 11vh;
    }
    #clouds-near {
        height: 10vh;
        bottom: 12vh;
    }
}

#mountains-near {
    height:40vh;
    bottom: 0;
    // animation: moveLeft 2000s infinite steps($low-fps * 2000);
    background-position: bottom right;
    mask-position: bottom right;
    background-size: contain;
    mask-size: contain;
    right: 0;
    left: 0;
}

#trees-far {
    height: 30vh;
    bottom: 0;
    // animation: moveLeft 400s infinite steps($high-fps * 400);
    background-position: bottom right;
    mask-position: bottom right;
    background-size: contain;
    mask-size: contain;
    right: 0;
    left: 0;
}

#trees-near {
    height: 30vh;
    bottom: 0;
    // animation: moveLeft 200s infinite steps($high-fps * 200);
    background-position: bottom right;
    mask-position: bottom right;
    background-size: contain;
    mask-size: contain;
    right: 0;
    left: 0;
}

// .layer {
//     user-select: none;
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     image-rendering: pixelated;

//   width: 120vw;
//   &.layer1 {
//     width: 150vw;
//   }

//   &.layer2 {
//     margin-top: 20px;
//   }

//   &.layer3 {
//     margin-top: -10px;
//   }

//   &.layer4 {
//     margin-top: -80px;
//   }

//   &.layer5 {
//     margin-top: -10px;
//   }

//   &.layer6 {
//   }

//   &.layer7 {
//     //the sun
//     top: 0;
//   }
// }

</style>
