<template>
  <div id="app" class="container">
    <div class="columns">
      <div class="col-xs-11 col-sm-10 col-xl-9 col-7 col-mx-auto">
        <h1 class="title">Stack Overgol Web</h1>

        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.title {
  padding-top: 30px;
  text-align: center;
}
</style>
