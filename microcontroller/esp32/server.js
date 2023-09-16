ESP32.enableBLE(false);

var ssid = "XXXXXX";
var password = "XXXXXXXX";
var port = 6336;
var wifi = require("Wifi");
var http = require("http");

function sendResponse(res, json) {
  res.writeHead(200);
  res.end(JSON.stringify(json));
}

function handleLed(led, pin) {
  pin.write(Number(led.state));
  return { led };
}

function orchestrateLeds(queryParams) {
  if (queryParams.name === "red") return handleLed(queryParams, D5);
  if (queryParams.name === "green") return handleLed(queryParams, D19);
  if (queryParams.name === "yellow") return handleLed(queryParams, D18);
}

function onPageRequest(req, res) {
  var urlReceived = url.parse(req.url, true);

  if (urlReceived.pathname === "/healthcheck") {
    sendResponse(res, { status: "alive" });
    return;
  }

  if (urlReceived.pathname === "/led") {
    var ledResponse = orchestrateLeds(urlReceived.query);
    sendResponse(res, ledResponse);
    return;
  }

  sendResponse(res, { memory: process.memory() });
  return;
}

wifi.connect(ssid, { password }, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  var ip = wifi.getIP().ip;
  console.log("Connected to Wifi !");

  http.createServer(onPageRequest).listen(port);
  console.log(`Web server running at http://${ip}:${port}`);
});
