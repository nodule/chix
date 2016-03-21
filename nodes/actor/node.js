output = function (cb) {

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

  actor.on('inputRequired', function (val) {
    cb({
      error: $.create(val)
    });
  });

  actor.on('error', function (val) {
    cb({
      error: $.create(val)
    });
  });

  actor.on('addNode', function (event) {
    cb({
      addNode: $.create(event.node)
    });
  });

  actor.on('removeNode', function (event) {
    cb({
      removeNode: $.create(event.node)
    });
  });

  actor.on('addLink', function (link) {
    cb({
      addLink: $.create(link)
    });
  });

  actor.on('removeLink', function (link) {
    cb({
      removeLink: $.create(link)
    });
  });

  actor.ioHandler.on('connect', function (link) {
    cb({
      connectLink: $.create(link)
    });
  });

  actor.ioHandler.on('disconnect', function (link) {
    cb({
      disconnectLink: $.create(link)
    });
  });

  // not really useful I guess
  /*
  actor.ioHandler.on('data', function (link) {
    cb({
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

};
