output = function() {
  var p = new chix();

  output({
    out: p.parse(input.in)
  });

  var iips = p.getIIPs();

  if(iips) {
    output({iips: iips});
  }
};
