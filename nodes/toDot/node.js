function writeLine(link, graph, map, titles) {

  var source_name = link.source,
    target_name = link.target;

  graph.push([
    '  ',
    source_name,
    ' -> ',
    target_name,
    ' [label="out:',
    link.out,
    '|in:',
    link.in,
    '"];'
  ].join(''));

  titles[source_name] = [
    '  ',
    source_name,
    ' ',
    '[label="',
    source_name.replace('_', ':'),
    '"];'
  ].join('');

  titles[target_name] = [
    '  ',
    target_name,
    ' ',
    '[label="',
    target_name.replace('_', ':'),
    '"];'
  ].join('');

}

function toDot(map) {

  var graph = [], key, titles = {}, i;

  graph.push('digraph {');
  graph.push('  label="' + map.description + '";');
  for(i = 0; i < map.links.length; i++) {
    writeLine(
      map.links[i],
      graph,
      map,
      titles
    );
  }

  for (key in titles) {
    if(titles.hasOwnProperty(key)) {
      graph.push(titles[key]);
    }
  }

  graph.push('}');

  return graph.join('\n');
}

output.out = toDot(input.flow)
