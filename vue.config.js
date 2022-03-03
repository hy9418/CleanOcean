
module.exports = {
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  },
  devServer: {
    port: 8081,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./src/mock/mock-server.js')
  },
};
