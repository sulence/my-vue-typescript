<template>
  <div class="about">
    <h1>This is an about page</h1>
    <svg-icon name="dashboard" width="200" height="200" />
    <el-button type="primary" @click="handleClick()">默认按钮</el-button>
    <el-button type="primary">{{ $t("index.index") }}</el-button>
    <div class="ddd-ddd">{{ $t("index.index") }}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "About"
})
export default class HelloWorld extends Vue {
  handleClick(): void {
    console.log(1);
    this.$https.post("/").then((res: object) => {
      console.log(res);
    });
  }
}
</script>
<style lang="scss" scoped>
.about {
  color: $menuActiveText;
}
</style>
