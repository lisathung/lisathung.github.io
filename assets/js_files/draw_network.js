
// read volume list and create option menu
var csv_url = '/assets/data/volume_list.csv';
d3.csv(csv_url).then(function(data){
    data.forEach(function(d){
        // add an option for each data item
        menu = d3.select('#menuOptions')
        menu.append('option')
        .attr('value',d.volume)
        .text(d.volume+ ':' +d.name);
    })
});

// add function on option change
var vol_num = 1;
var index = 'vol'+vol_num;
d3.select('#menuOptions').attr('onChange','updateOptions()');

// define function
function updateOptions(){
    vol_num = document.getElementById('menuOptions').value;
    d3.select('svg').remove();
    index = 'vol'+vol_num;
    console.log(index);
    JSONpromise.then(updateNetwork).catch(function(error){console.log(error)});    
}

// read data and simulate network
var json_url = '/assets/data/data.json';

// promise object allows us to update the graph
var JSONpromise = d3.json(json_url);
JSONpromise.then(updateNetwork).catch(function(error){console.log(error)});
    
// function for updating graph
function updateNetwork(data){    
    console.log(index);
    console.log(data);
    
    var nodes = data['vol'+vol_num].nodes;
    var links = data['vol'+vol_num].links;

    console.log(nodes);
    console.log(links);

    // getting dimesnions
    var width = d3.select('html').style('width'), height = d3.select('html').style('height')
    width = width.substring(0,width.length-2), height = height.substring(0,height.length-2)

    // we need our graphics div to take up only 40% of the screen

    console.log(width)
    console.log(height)

    width = width/4
    height = height/3

    console.log(width)
    console.log(height)

    var svg = d3.select('#graphics')
        .append('svg')
        .attr('width',width)
        .attr('height',height)
        .attr('overflow','"scroll"');

    // overall layout
    var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-50))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('link',d3.forceLink().links(links).distance(150))
    .on('tick', ticked);

    // select the links
    var edges = svg.selectAll('line')
        .data(links)
        .enter()
        .append('line')

    // select the nodes
    var imageNodes= svg.selectAll('.nodeImage')
        .data(nodes)
        // apply the css styling to every node
        .enter()
        .append('image')
        .attr('class','nodeImage')
        .attr('id',function(d){return d.id;})
        .attr('href',function(d){return d.link;})
    
    // edge text
    var edgeText = svg.selectAll('.edgeText')
        .data(links)
        .enter()
        .append('text')
        .attr('class','edgeText')
        .attr("text-anchor", "middle")
        .text(function(d){return d.relation})
        // .attr('x',function(d){return (d.source.x+d.target.x)/2})
        // .attr('y',function(d){return (d.target.x+d.target.y)/2})
        
    
    // function updateNodes(){
    //     // select the nodes
    //     var u = svg.selectAll('.node')
    //         .data(nodes)
    //     // enter any new nodes 
    //     u.enter()
    //     .append('circle')
    //     .merge(u)
    //     .attr('r', 50)
    //     .attr('class','node')
    //     .attr('cx', function(d) {return d.x})
    //     .attr('cy', function(d) {return d.y})
    //     .attr('fill',function(d){return 'url(#' + d.id + ')';})
    //     u.exit().remove()
    // }

    // run this function at every tick of the simulation
    function ticked() {

        edges
        .attr('x1',function(d){return d.source.x})
        .attr('y1',function(d){return d.source.y})
        .attr('x2',function(d){return d.target.x})
        .attr('y2',function(d){return d.target.y});

        imageNodes
        .attr('x', function(d) {return d.x - 25})
        .attr('y', function(d) {return d.y -25});

        edgeText
        .attr('x',function(d){return (d.source.x+d.target.x)/2})
        .attr('y',function(d){return (d.source.y+d.target.y)/2})
        .attr('transform' ,function(d,i){
            // rotate edge text
            var dx = Math.abs(d.source.x - d.target.x)
            var dy = Math.abs(d.source.y - d.target.y)
            var angle = Math.atan(dy/dx) * (180/Math.PI)
            return 'rotate(' + Math.abs(angle-360) + ')';
        });
    }
}

var ratio = 0.6887493055474856
console.log('ratio = '+ratio)
console.log('radian = '+Math.atan(ratio))
console.log('degree = '+(Math.atan(ratio) * 180/Math.PI))