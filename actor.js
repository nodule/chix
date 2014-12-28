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
  fn: function actor(input, output, state, done, cb, on, chix_flow) {
    var r = function() {
      var actor = input.actor || new chix_flow.Actor();

      if (input.loader) {
        actor.addLoader(input.loader);
      }

      if (input.pm) {
        actor.addProcessManager(input.pm);
      }

      if (input.io) {
        actor.addIoHandler(input.io);
      }

      actor.on('inputRequired', function(data) {
        output({
          error: data
        });
      });

      actor.on('error', function(data) {
        output({
          error: data
        });
      });

      actor.on('addNode', function(event) {
        output({
          addNode: event.node
        });
      });

      actor.on('removeNode', function(event) {
        output({
          removeNode: event.node
        });
      });

      actor.on('addLink', function(link) {
        output({
          addLink: link
        });
      });

      actor.on('removeLink', function(link) {
        output({
          removeLink: link
        });
      });

      actor.ioHandler.on('connect', function(link) {
        output({
          connectLink: link
        });
      });

      actor.ioHandler.on('disconnect', function(link) {
        output({
          disconnectLink: link
        });
      });

      // not really useful I guess
      /*
      actor.ioHandler.on('data', function (link) {
        output({
          disconnectLink: link
        });
      });
      */

      actor.addMap(input.flow);

      // is done by loader now.
      // actor.addNodeDefinitions(input.defs);
      actor.run();

      if (input.iips) {
        actor.sendIIPs(input.iips);
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