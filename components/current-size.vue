<template>
  <div class="current-size">
    <span class="sm:hidden">XS</span>
    <span class="hidden sm:block md:hidden">SM</span>
    <span class="hidden md:block lg:hidden">MD</span>
    <span class="hidden lg:block xl:hidden">LG</span>
    <span class="hidden xl:block">XL</span>
  </div>
</template>

<style lang="scss" scoped>
.current-size {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10000;
  background: black;
  color: white;
  font-size: 5rem;
}
</style>
