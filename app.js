const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 5001;

const app = express();

app.use("/", express.static(path.join(__dirname, "assets")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get("/test", (req, res) => {
  if (req.query['fail']) {
    throw new Error('server failure');
  } else {
    res.send("OK");
  }
});

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`)
});
