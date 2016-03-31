let DDPClient = require("ddp-client");
let _ = require("underscore");

let ddpClient = new DDPClient({
  // All properties optional, defaults shown
  host : "localhost",
  // host: "192.168.1.3",
  port : 3000,
  ssl  : false,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1',  // ['1', 'pre2', 'pre1'] available
  // Use a full url instead of a set of `host`, `port` and `ssl`
  // url: 'wss://example.com/websocket'
  // socketConstructor: WebSocket // Another constructor to create new WebSockets
});

let ddp = {};
ddp.connection = ddpClient;

ddp.initialize = () => {
  return new Promise(function(resolve, reject) {
    ddpClient.connect(function(error, wasReconnect) {
      // If autoReconnect is true, this back will be invoked each time
      // a server connection is re-established
      if (error) {
        console.log(`DDP connection error! Attempted to connect to ${ddpClient.host}:${ddpClient.port}`);
        reject(error);
      }

      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }

      console.log('connected!');
      resolve(true);
    });
  });
};

ddp.close = function() {
  return ddpClient.close();
};

ddp.subscribe = function(pubName, params) {
  params = params || undefined;
  if (params && !_.isArray(params)) {
    console.warn('Params must be passed as an array to ddp.subscribe');
  }
  return new Promise(function(resolve, reject) {
    ddpClient.subscribe(pubName, params, function () {
      resolve(true);
    });
  });
};

ddp.call = function(methodName, params) {
  params = params || undefined;
  if (params && !_.isArray(params)) {
    console.warn('Params must be passed as an array to ddp.call');
  }

  return new Promise(function(resolve, reject) {
    ddpClient.call(methodName, params,
      function (err, result) {   // callback which returns the method call results
        // console.log('called function, result: ' + result);
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
      function () {              // callback which fires when server has finished
        // console.log('updated');  // sending any updated documents as a result of
        // console.log(ddpclient.collections.posts);  // calling this method
      }
    );
  });
};

module.exports = ddp;
