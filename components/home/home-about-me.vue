<template>
  <div class="page-wrapper color">
    <div class="container skew mx-auto content">
      <h2 class="text-appear">About me 🐱🎶</h2>
      <p class="text-appear">
        I am passionate about innovative technologies and computer programming. Although the main focus of my career is Web development, I have acquired skills in many other areas of computer programming, such as:
      </p>

      <p>This is dummy content for now, this is probably outdated 👀... </p>

      <p>
        <dl>
          <dt>Game Development</dt><dd>I have created many games using totally different technologies (C++, implementing the whole engine; Java, HTML5, Unity). I have one game published in Google Play (https://play.google.com/store/apps/details?id=es.org.nope.callet&hl=en)</dd>
          <dt>Mobile development</dt><dd>I was capable of creating an Android application with Realtime communications and Google Maps integration</dd>
        </dl>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-wrapper .container {
  // transform: skewY(-2deg);
  padding: 48px;
  position: relative;
  max-width: 600px;

  &:before {
    content: '';
    // transform: skewY(2deg);
    position: absolute;
    left: 1px;
    top: 1px;
    bottom: 1px;
    right: 1px;
    margin-right: 1ch;
    border: 0.5ch solid white;
    z-index: -1;
    -webkit-box-shadow: 1ch 1rem 0 white;
    box-shadow: 1ch 1rem 0 white;
    background-color: #0F090C;
  }
}

h1 {
  font-size: 3rem;
  vertical-align: baseline;
  letter-spacing: 10px;;
}

img {
  width: 200px;
  image-rendering: pixelated;
}

.text-appear {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // animation: textAppear 1s linear infinite;
  }

}

dt {
  float: left;
  clear: left;
  width: 200px;
  text-align: left;
  font-weight: bold;
  color: green;
}
dt::after {
  content: ":";
}
dd {
  margin: 0 0 0 210px;
  padding: 0 0 0.5em 0;
}
</style>
