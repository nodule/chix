var p = new chix();
output.out = p.parse(input.in);

var iips = p.renderer.getIIPs();

if(iips) {
  output.iips = iips;
}
