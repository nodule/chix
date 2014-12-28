output = function() {
  var lr = new remote();
  lr.load(input.flow, function(err, results) {
    if(err) {
      output({error: err});
    } else {
      output({out: results});
    }
    done();
  });
};
