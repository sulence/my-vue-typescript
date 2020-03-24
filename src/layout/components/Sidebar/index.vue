<template>
  <div class="">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :unique-opened="true"
        :show-timeout="200"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PermissionModule } from "@/store/modules/permission";
import { AppModule } from "@/store/modules/app";

import SidebarItem from "./SidebarItem.vue";

import variables from "@/styles/variables.scss";

@Component({
  name: "SideBar",
  components: {
    SidebarItem
    // SidebarLogo
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }
  get isCollapse() {
    return !this.sidebar.opened;
  }

  get routes() {
    return PermissionModule.routes;
  }

  get menuActiveTextColor() {
    return variables.menuActiveText;
  }

  get variables() {
    return variables;
  }

  get activeMenu() {
    const route = this.$route;
    const { meta, path } = route;
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  }

  mounted() {
    // PermissionModule.GenerateRoutes(["132"]);
  }
}
</script>
<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
