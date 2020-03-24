import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import SvgIcon from "vue-svgicon";

import ElementUI from "element-ui";

import "@/styles/element-variables.scss"; // element css
import "@/styles/index.scss"; // 全局 scss

import "@/icons/components"; // svg图标
import service from "@/utils/request"; // axios 请求
import i18n from "@/lang"; // 国际化

Vue.use(ElementUI, {
  size: "medium", // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
});

Vue.use(SvgIcon, {
  tagName: "svg-icon",
  defaultWidth: "1em",
  defaultHeight: "1em"
});

Vue.config.productionTip = false;
Vue.prototype.$https = service;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
