<template>
<div id="app">
  <router-view name="header"></router-view>
  <router-view name="login"></router-view>

  <router-view>
    
  </router-view>
</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",

  methods: {
    ...mapActions(["setToken", "setUser"])
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      console.log('hey')
      this.setToken(token);
    } else {
      console.log('ho')
      this.$router.push("/");
    }
  },
  mounted() {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   // this.setToken(token);
    //   // this.setUser(decode(token));
    // } else {
    //   this.$router.push("/");
    // }
  }
};
</script>
