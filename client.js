module.exports = {
  name: "client",
  ns: "chix",
  title: "FBP Protocol Websocket Client",
  description: "CSS",
  phrases: {
    active: "Creating FBP Websocket Client"
  },
  dependencies: {
    npm: {
      "chix-runtime/lib/runtime": "##chix-runtime/lib/runtime##",
      "chix-runtime/lib/transport/websocketBrowser": "##chix-runtime/lib/transport/websocketBrowser##"
    }
  },
  ports: {
    input: {
      options: {
        title: "Options",
        type: "object",
        properties: {
          protocol: {
            type: "string",
            "default": "noflo-runtime"
          },
          host: {
            type: "string",
            "default": "localhost"
          },
          port: {
            type: "number",
            "default": 9000
          }
        }
      }
    },
    output: {
      out: {
        title: "out",
        type: "string"
      }
    }
  },
  fn: function client(input, output, state, done, cb, on, runtime, websocket_browser) {
    var r = function() {
      var transport = new websocketbrowser(input.options);
      transport.on('send', function(payload) {
        output({
          out: payload
        });
      });
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}