module.exports = {
  name: "toDot",
  ns: "chix",
  title: "Convert JSON Flow to Dot",
  description: "Converts a JSON Flow to Dot format",
  phrases: {
    active: "Converting to dot"
  },
  ports: {
    input: {
      "in": {
        title: "Flow JSON",
        type: "object",
        fn: function __IN__(data, source, state, input, $, output, chix_flow_todot) {
          var r = function() {
            output({
              out: $.write('in', chix_flow_todot($.in))
            });
          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      }
    },
    output: {
      out: {
        title: "Dot Output",
        type: "object"
      }
    }
  },
  dependencies: {
    npm: {
      "chix-flow-todot": require('chix-flow-todot')
    }
  },
  state: {}
}