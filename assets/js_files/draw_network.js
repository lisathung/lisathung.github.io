
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
var width = 500, height = 500

var JSONpromise = d3.json(json_url)
JSONpromise.then(updateNetwork).catch(function(error){console.log(error)});
    
function updateNetwork(data){    
    console.log(index);
    console.log(data);
    
    var nodes = data['vol'+vol_num].nodes;
    var links = data['vol'+vol_num].links;

    console.log(nodes);
    console.log(links);

    var svg = d3.select('#network')
        .append('svg')
        .attr('width',width)
        .attr('height',height);

    // overall layout
    var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-80))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('link',d3.forceLink().links(links).distance(200))
    .on('tick', ticked);

    function updateLinks(){
        // select the links
        var v = svg.selectAll('line')
            .data(links)
        
        // apply the css styling to every link
        v.enter()
        .append('line')
        .merge(v)
        .attr('x1',function(d){return d.source.x})
        .attr('y1',function(d){return d.source.y})
        .attr('x2',function(d){return d.target.x})
        .attr('y2',function(d){return d.target.y})

        v.exit().remove()
    }

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

    function updateImages(){
        // select the nodes
        var u = svg.selectAll('.nodeImage')
            .data(nodes)
        // apply the css styling to every node
        u.enter()
        .append('image')
        // .text(function(d){return d.name})
        .merge(u)
        .attr('class','nodeImage')
        .attr('id',function(d){return d.id})
        .attr('href',function(d){return d.link;})
        .attr('x', function(d) {return d.x - 20})
        .attr('y', function(d) {return d.y - 20})

        u.exit().remove()
    }
    // run this function at every tick of the simulation
    function ticked() {
        updateLinks();
        updateImages();
        // updateNodes();
    }

}