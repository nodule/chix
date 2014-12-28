// protocol is emitted on receive
// connected, disconnected is emitted.
output = function() {
  var transport = new websocketbrowser(input.options);
  transport.on('send', function(payload) {
    output({out: payload});
  });
};
