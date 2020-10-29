const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

const PORT = process.env.PORT || 5001;

const app = express();
const pubsub = new PubSub({projectId: "white-inscriber-293222"});
const defaultTopic = pubsub.topic("projects/white-inscriber-293222/topics/signup-notificator");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/", express.static(path.join(__dirname, "assets")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname+'/signup.html'));
});

app.post("/signup", async (req, res) => {
  await defaultTopic.publish(Buffer.from(JSON.stringify(req.body)));
  res.send("OK");
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
