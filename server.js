const express = require("express");
const path = require("path");
const proxy = require("http-proxy-middleware");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.use(
  "/graphql",
  proxy({
    target: process.env.API_URI,
    changeOrigin: true
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
