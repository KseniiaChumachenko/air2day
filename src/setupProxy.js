const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api/graphql", {
      target: "http://william.multimediatech.cz:8081/air2day-test/api/graphql"
    })
  );
};
