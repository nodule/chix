output = function() {
  var p = new chix();

  cb({
    out: p.parse(input.in)
  });

  var iips = p.getIIPs();

  if(iips) {
    cb({iips: iips});
  }
};
