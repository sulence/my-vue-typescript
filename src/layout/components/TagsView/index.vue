<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
      >
        {{ tag.meta.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <!-- <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">
        关闭其他
      </li>
      <li @click="closeAllTags(selectedTag)">
        关闭全部
      </li>
    </ul> -->
  </div>
</template>

<script lang="ts">
import path from "path";
import { Component, Vue, Watch } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import { PermissionModule } from "@/store/modules/permission";
import { TagsViewModule, ITagView } from "@/store/modules/tags-view";
import ScrollPane from "./ScrollPane.vue";

@Component({
  name: "TagsView",
  components: {
    ScrollPane
  }
})
export default class TagsView extends Vue {
  private visible = false;
  private top = 0;
  private left = 0;
  private selectedTag: ITagView = {};
  private affixTags: ITagView[] = [];

  get visitedViews() {
    return TagsViewModule.visitedViews;
  }

  get routes() {
    return PermissionModule.routes;
  }

  @Watch("$route")
  private onRouteChange() {
    this.addTags();
    // this.moveToCurrentTag();
  }
  mounted() {
    this.initTags();
    this.addTags();
  }

  private isActive(route: ITagView) {
    return route.path === this.$route.path;
  }

  private isAffix(tag: ITagView) {
    return tag.meta && tag.meta.affix;
  }

  private filterAffixTags(routes: RouteConfig[], basePath = "/") {
    let tags: ITagView[] = [];
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        });
      }
      if (route.children) {
        const childTags = this.filterAffixTags(route.children, route.path);
        if (childTags.length >= 1) {
          tags = [...tags, ...childTags];
        }
      }
    });
    return tags;
  }

  private initTags() {
    this.affixTags = this.filterAffixTags(this.routes);
    for (const tag of this.affixTags) {
      if (tag.name) {
        TagsViewModule.addVisitedView(tag);
      }
    }
  }

  private addTags() {
    const { name } = this.$route;
    if (name) {
      TagsViewModule.addView(this.$route);
    }
    return false;
  }

  private closeSelectedTag(view: ITagView) {
    TagsViewModule.delView(view);
    if (this.isActive(view)) {
      this.toLastView(TagsViewModule.visitedViews, view);
    }
  }

  private toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView = visitedViews.slice(-1)[0];

    const latestViewPathObj = {
      path: ""
    };
    latestViewPathObj.path = latestView.path ? latestView.path : "";
    const latestViewPath = latestViewPathObj.path;
    if (latestView) {
      this.$router.push(latestViewPath);
      // this.$router.push(latestView);
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === "Dashboard") {
        // to reload home page
        this.$router.replace({ path: "/redirect" + view.fullPath });
      } else {
        this.$router.push("/");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
