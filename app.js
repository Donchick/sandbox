const express = require("express");
const path = require("path");

const app = express();

app.use("/", express.static(path.join(__dirname, "assets")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(5001, function () {
  console.log("Express server listening on port 5001")
});
