module.exports = {
  name: "actor",
  ns: "chix",
  title: "Actor",
  description: "Chix Actor",
  phrases: {
    active: "Starting Actor"
  },
  ports: {
    input: {
      actor: {
        title: "Actor",
        type: "Actor",
        "default": null
      },
      loader: {
        title: "Loader",
        type: "Loader",
        "default": null
      },
      io: {
        title: "IO Handler",
        type: "IOMapHandler",
        "default": null
      },
      pm: {
        title: "Process Manager",
        type: "ProcessManager",
        "default": null
      },
      flow: {
        title: "Flow JSON",
        type: "object"
      },
      defs: {
        title: "Node Definitions",
        type: "any"
      },
      iips: {
        title: "IIPs",
        type: "object",
        "default": null
      }
    },
    output: {
      actor: {
        title: "Actor",
        type: "Actor"
      },
      addNode: {
        title: "Node added",
        type: "xNode"
      },
      removeNode: {
        title: "Node removed",
        type: "xNode"
      },
      addLink: {
        title: "Link added",
        type: "xLink"
      },
      removeLink: {
        title: "Link removed",
        type: "xLink"
      },
      error: {
        title: "Error",
        type: "object"
      }
    }
  },
  dependencies: {
    npm: {
      "chix-flow": require('chix-flow')
    }
  },
  fn: function actor(input, $, output, state, done, cb, on, chix_flow) {
    var r = function() {
      var actor = $.actor || new chix_flow.Actor();

      if ($.loader) {
        actor.addLoader($.loader);
      }

      if ($.pm) {
        actor.addProcessManager($.pm);
      }

      if ($.io) {
        actor.addIoHandler($.io);
      }

      actor.on('inputRequired', function(val) {
        output({
          error: $.create(val)
        });
      });

      actor.on('error', function(val) {
        output({
          error: $.create(val)
        });
      });

      actor.on('addNode', function(event) {
        output({
          addNode: $.create(event.node)
        });
      });

      actor.on('removeNode', function(event) {
        output({
          removeNode: $.create(event.node)
        });
      });

      actor.on('addLink', function(link) {
        output({
          addLink: $.create(link)
        });
      });

      actor.on('removeLink', function(link) {
        output({
          removeLink: $.create(link)
        });
      });

      actor.ioHandler.on('connect', function(link) {
        output({
          connectLink: $.create(link)
        });
      });

      actor.ioHandler.on('disconnect', function(link) {
        output({
          disconnectLink: $.create(link)
        });
      });

      // not really useful I guess
      /*
      actor.ioHandler.on('data', function (link) {
        output({
          disconnectLink: $.create(link)
        });
      });
      */

      actor.addMap($.flow);

      // is done by loader now.
      // actor.addNodeDefinitions($.defs);
      actor.run();

      if ($.iips) {
        actor.sendIIPs($.iips);
        actor.push();
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