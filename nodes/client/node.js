var transport = new websocketbrowser(input.options);

// protocol is emitted on receive
// connected, disconnected is emitted.
output = function() {
  transport.on('send', function(payload) {
    output({out: payload});
  });
};
