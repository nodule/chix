output = function (cb) {

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

  actor.on('inputRequired', function (val) {
    cb({
      error: val
    });
  });

  actor.on('error', function (val) {
    cb({
      error: val
    });
  });

  actor.on('addNode', function (event) {
    cb({
      addNode: event.node
    });
  });

  actor.on('removeNode', function (event) {
    cb({
      removeNode: event.node
    });
  });

  actor.on('addLink', function (link) {
    cb({
      addLink: link
    });
  });

  actor.on('removeLink', function (link) {
    cb({
      removeLink: link
    });
  });

  actor.ioHandler.on('connect', function (link) {
    cb({
      connectLink: link
    });
  });

  actor.ioHandler.on('disconnect', function (link) {
    cb({
      disconnectLink: link
    });
  });

  // not really useful I guess
  /*
  actor.ioHandler.on('data', function (link) {
    cb({
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

};
