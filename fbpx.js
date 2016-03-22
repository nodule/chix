module.exports = {
  name: "fbpx",
  ns: "chix",
  title: "FBPx",
  description: "FBP Parser",
  phrases: {
    active: "Parsing .fbp"
  },
  ports: {
    input: {
      "in": {
        title: "FBP Content",
        type: "string"
      }
    },
    output: {
      out: {
        title: "Flow JSON",
        type: "object"
      },
      iips: {
        title: "IIPs",
        type: "any"
      }
    }
  },
  dependencies: {
    npm: {
      "fbpx/chix": "##fbpx/chix##"
    }
  },
  fn: function fbpx(input, $, output, state, done, cb, on, chix) {
    var r = function() {
      var p = new chix();

      output({
        out: p.parse($.in)
      });

      var iips = p.getIIPs();

      if (iips) {
        output({
          iips: $.create(iips)
        });
      }
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}