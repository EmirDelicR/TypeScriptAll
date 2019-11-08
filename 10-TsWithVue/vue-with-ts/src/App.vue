<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const NavBar = () => import("@/components/NavBar.vue");
const AppFooter = () => import("@/components/Footer.vue");

@Component({
  components: {
    NavBar,
    AppFooter
  }
})
export default class App extends Vue {}
</script>

<style lang="scss" src="@/assets/main.scss">
</style>
