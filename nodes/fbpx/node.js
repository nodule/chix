var p = new fbpx();
var renderer = new chix();
p.addRenderer(renderer);

output.out = p.parse(input.in);

var iips = renderer.getIIPs();

if(iips) {
  output.iips = iips;
}
