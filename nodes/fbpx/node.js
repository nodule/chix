output = function() {
  var p = new chix();

  cb({
    out: p.parse($.in)
  });

  var iips = p.getIIPs();

  if(iips) {
    cb({iips: iips});
  }
};
