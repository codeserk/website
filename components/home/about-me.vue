<template>
  <div class="block small with-padding with-shadow-left skew container mx-auto content">
    <p data-aos="appear">
      Hello!
      <img
        v-lazy="{ src: images.avatar.image.src, loading: images.avatar.placeholder.src }"
        data-aos="appear"
        class="image me lazy"
      />
    </p>
    <p data-aos="appear">
      Welcome to my personal <em>portfolio</em>!. This website is meant to showcase all the
      <router-link to="/project">projects</router-link> I work on, and the new
      <router-link to="/technology">technologies</router-link> or
      <router-link to="/language">languages</router-link> that I use.
    </p>
    <p data-aos="appear">
      I'm <strong>José Cámara</strong> and I'm passionate about innovative technologies and computer programming.
      Although the main focus of my career is <router-link to="/development/web">Web development</router-link>, I have
      acquired skills in other <router-link to="/development">areas of development</router-link>, such as:
      <router-link to="/development/game">Games</router-link>,
      <router-link to="/development/game">Android</router-link> and
      <router-link to="/development/game">iOS</router-link>.
    </p>

    <p data-aos="appear">I love animals, and especially cats since we share many <em>personality perks</em> (:</p>
    <p data-aos="appear">These are my cats <strong>Ryuk</strong> and <strong>Mia</strong>:</p>

    <a class="cat-images" href="https://www.instagram.com/ticytaccats/" target="__blank">
      <img
        v-lazy="{ src: images.ryuk.image.src, loading: images.ryuk.placeholder.src }"
        data-aos="appear"
        class="image lazy bordered"
      />
      <img
        v-lazy="{ src: images.mia.image.src, loading: images.mia.placeholder.src }"
        data-aos="appear"
        class="image lazy bordered"
      />
    </a>

    <p data-aos>^ Yes, Ryuk is a bit <em>derpy</em></p>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  vertical-align: baseline;
  font-size: 3rem;
  letter-spacing: 10px;
}

img {
  width: 200px;
  margin: 0 1em;
}

img.me {
  display: inline;
  float: right;
}

.cat-images {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: theme('screens.sm')) {
  img.me {
    float: none;
    width: 100%;
    margin: auto;
    margin-bottom: 2em;
  }

  .cat-images {
    flex-wrap: wrap;

    img {
      width: auto;
    }
  }
}
</style>
