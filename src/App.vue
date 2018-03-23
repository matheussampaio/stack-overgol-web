<template>
  <div id="app">
    <UserTable/>
  </div>
</template>

<script>
import UserTable from './components/UserTable'

export default {
  name: 'App',
  components: {
    UserTable
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
