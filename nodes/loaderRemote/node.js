output = function() {
  var lr = new remote();
  lr.load($.flow, function(err, results) {
    if(err) {
      output({error: $.create(err)});
    } else {
      output({out: $.create(results)});
    }
    done();
  });
};
