<template>
  <div id="app">
    <Header/>
    <MainContent/>
  </div>
</template>

<script>
import Header from "./layout/Header.vue"
import MainContent from "./layout/MainContent.vue"
export default {
  name: 'App',
  components: {
    Header,
    MainContent
  }
}
</script>

<style>
@import url('./assets/css/Main.css');
  #app{
    margin: 0px;
    padding: 0px;
  }
</style>
