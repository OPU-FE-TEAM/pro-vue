const Timestamp = new Date().getTime();
const vueConfig = {
  publicPath: "/",
  //静态资源打包到该文件夹
  assetsDir: "static",

  configureWebpack: {
    plugins: [],
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `static/js/[name].${Timestamp}.js`,
      chunkFilename: `static/js/[name].${Timestamp}.js`
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "@backgroundColor": "#ff4444"
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    port: 9996
  }
};

module.exports = vueConfig;
