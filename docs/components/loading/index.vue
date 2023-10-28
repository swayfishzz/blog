<template>
  <div class="container">
    <div><Loading1 /></div>
    <div><Loading2 /></div>
    <div><Loading3 /></div>
    <div><Loading4 /></div>
    <div><Loading5 /></div>
    <div><Loading6 /></div>
    <div><Loading7 /></div>
    <div><Loading8 /></div>
    <div><Loading9 /></div>
    <div><Loading10 /></div>
  </div>
</template>

<script setup>
import Loading1 from './component/loading1.vue'
import Loading2 from './component/loading2.vue'
import Loading3 from './component/loading3.vue'
import Loading4 from './component/loading4.vue'
import Loading5 from './component/loading5.vue'
import Loading6 from './component/loading6.vue'
import Loading7 from './component/loading7.vue'
import Loading8 from './component/loading8.vue'
import Loading9 from './component/loading9.vue'
import Loading10 from './component/loading10.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.container > div {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px auto;
  border-radius: 4px;
  border: 1px solid var(--sway-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
