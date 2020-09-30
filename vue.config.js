const Timestamp = new Date().getTime();
const vueConfig = {
  publicPath: "/",
  assetsDir: "static",
  configureWebpack: {
    output: {
      filename: `static/js/[name].${Timestamp}.js`,
      chunkFilename: `static/js/[name].${Timestamp}.js`
    }
  },
  devServer: {
    port: 9999
  }
};

module.exports = vueConfig;
