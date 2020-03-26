<template>
  <div class="components-container">
    <div class="editor-container">
      <markdown-editor
        ref="markdownEditor"
        :language="language"
        v-model="content"
        height="300px"
      />
    </div>

    <el-button
      style="margin-top:80px;"
      type="primary"
      icon="el-icon-document"
      @click="getHtml"
    >
      Get HTML
    </el-button>

    <div v-html="html" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app";
import MarkdownEditor from "@/components/MarkdownEditor/index.vue";

const content = `
**This is test**

* vue
* element
* webpack
`;

@Component({
  name: "Markdown",
  components: {
    MarkdownEditor
  }
})
export default class Markdown extends Vue {
  private content = content;
  private html = "";

  // Mapping for local lang to tuiEditor lang
  // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
  private languageTypeList: { [key: string]: string } = {
    en: "en_US",
    zh: "zh_CN",
    es: "es_ES",
    ja: "ja_JP"
  };

  mounted() {
    // FIXES weird focus issue caused by MarkdownEditor
    window.scrollTo(0, 0);
  }

  get language() {
    return this.languageTypeList[AppModule.language];
  }

  private getHtml() {
    this.html = (this.$refs.markdownEditor as MarkdownEditor).getHtml();
  }
}
</script>

<style lang="scss" scope></style>
