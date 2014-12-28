module.exports = {
  name: "loaderRemote",
  ns: "chix",
  title: "Remote Loader",
  description: "A remote Node Definition loader for the Actor",
  phrases: {
    active: "Loading Remote Definitions"
  },
  ports: {
    input: {
      flow: {
        title: "Flow JSON",
        type: "object"
      }
    },
    output: {
      error: {
        title: "Error",
        type: "object"
      },
      out: {
        title: "Results",
        type: "object",
        properties: {
          requires: {
            type: "object",
            title: "Requires",
            description: "The requires needed for this flow and it's subflows"
          },
          nodeDefinitions: {
            type: "object",
            title: "Node Definitions",
            description: "The Node Definitions in use by this flow and it's subflows"
          }
        }
      }
    }
  },
  dependencies: {
    npm: {
      "chix-loader/remote": "##chix-loader/remote##"
    }
  },
  fn: function loaderRemote(input, output, state, done, cb, on, remote) {
    var r = function() {
      var lr = new remote();
      lr.load(input.flow, function(err, results) {
        if (err) {
          output({
            error: err
          });
        } else {
          output({
            out: results
          });
        }
        done();
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