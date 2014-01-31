output = function (cb) {

  var actor = chix_flow.Actor;

  actor.on('inputRequired', function (data) {
    cb({
      error: data
    });
  });

  actor.on('error', function (data) {
    cb({
      error: data
    });
  });

  actor.addMap(input.flow);
  actor.addNodeDefinitions(input.nodeDefinitions);
  actor.createNodes();
  actor.run();

  if (input.iips) {
    actor.sendIIPs(input.iips);
  }

};
