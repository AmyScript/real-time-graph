const http = require("http");
const io = require("socket.io")(http);
const PubNub = require("pubnub");

io.on("connection", function(socket) {
  let strData = "";
  const pubnub = new PubNub({
    subscribeKey: "sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe"
  });
  pubnub.addListener({
    message: function(message) {
      if (message.message.symbol === "Google") {
        const x = new Date(message.message.timestamp);
        const formatted =
          x.getHours() +
          ":" +
          x.getMinutes() +
          ":" +
          x.getSeconds() +
          ":" +
          x.getMilliseconds();
        strData = { label: formatted, value: message.message.bid_price };
        socket.emit("fakeFinancialData", strData);
      }
    }
  });
  console.log("Subscribing...");
  pubnub.subscribe({
    channels: ["pubnub-market-orders"]
  });
});

io.listen(3001, function() {
  console.log("listening on *:3001");
});
