<template>
  <div class="home" id="home">
    <HelloWorld msg="Welcome to Enigma Algorithm" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/EnigmaCrypto.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>

<style>
.home {
  width: fit-content;
  margin: auto;
}
</style>
