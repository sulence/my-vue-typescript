// const path = require("path");

const devServerPort = 9527;

module.exports = {
  // 基本路径
  publicPath: "/",
  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: "dist",
  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: "static",
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: process.env.NODE_ENV === "development",
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  // 文件名Hash
  filenameHashing: true,
  // 配置多页
  // pages:{},
  // 是否使用带有浏览器内编译器的完整构建版本
  runtimeCompiler: false,
  // 配置 webpack-dev-server 行为。
  devServer: {
    port: devServerPort,
    open: true,
    https: false,
    // hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${devServerPort}/mock`,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/variables.scss";`
      }
    }
  }
};
