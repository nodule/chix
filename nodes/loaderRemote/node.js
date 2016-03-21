output = function() {
  var lr = new remote();
  lr.load($.flow, function(err, results) {
    if(err) {
      output({error: err});
    } else {
      output({out: results});
    }
    done();
  });
};
