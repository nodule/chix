output = function() {
  var p = new chix()

  cb({out: $.write('in', p.parse($.in))})

  var iips = p.getIIPs()

  if(iips) cb({iips: $.create(iips)})
}
