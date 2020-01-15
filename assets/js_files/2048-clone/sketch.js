var grid;
var cell_size;
var no_of_cells;
var board_size;

function setup() {
  // initialize variables
  no_of_cells = 4;
  board_size = 500;

  // initialize canvas area
  var canvas = createCanvas(board_size, board_size);

  // link canvas to div element
  canvas.parent('main-board')

  // define size of cells
  cell_size =  parseInt((board_size/no_of_cells),10);

  // get game board
  grid = make2DArray(no_of_cells);
  
  // place 2 numbers randomly on board
  console.table(grid);
  addNumber(grid);
  addNumber(grid);
  console.table(grid);
}

function make2DArray(size) {
  // returns an array of size (size x size)
  var arr = new Array(size);
  for (var i=0;i<size;i++) {
      arr[i] = new Array(size);
      arr[i].fill(0);
  }
  return arr; 
}

function spotExists(grid){
  // checks if board has space for another number
  for(var i=0;i<no_of_cells;i++){
    for(var j=0;j<no_of_cells;j++){
      if(grid[i][j]==0)
        return true;
      }
    }
  return false;  
}

function addNumber(grid){
  // add number at valid location
  if(spotExists(grid)){
    while(true){
      // generate random index
      i = Math.floor(Math.random() * no_of_cells);
      j = Math.floor(Math.random() * no_of_cells);
      // check if valid
      if(grid[i][j] == 0){
        grid[i][j] = 2;
        return grid;
      }
      else
        continue;
    }
  }
}

function extract_numbers(row){
  // input : 1D row of values
  // function for extracting all non zero elements from row
  var ans = new Array(0);
  for (var i=0;i<row.length;i++){
    if (row[i] != 0)
      ans.push(row[i]);
  }
  return ans;
}

function slide(grid){
  // input : 3D grid of values
  // function for moving numbers north(up)
  // rows are extracted column-wise
  var empty_cells;
  var filled_cells;
  for (var i=0;i<grid.length;i++){
    filled_cells = extract_numbers(grid[i]);
    empty_cells = Array(grid.length - filled_cells.length).fill(0);
    grid[i] = filled_cells.concat(empty_cells);
  }
  return grid;
}

function combine(grid){
  // adds similar numbers
  for (var i=0;i<grid.length;i++){
    console.log('working on=',grid[i]);
    console.log('i=',i);
    for (var j=0;j+1<grid[i].length;j++){
      if (grid[i][j] == grid[i][j+1]){
        grid[i][j] += grid[i][j+1];
        grid[i][j+1] = 0;
      }
    }
  }
  return grid
}
function keyPressed(){
  if (key == ' '){
    slide(grid);
    combine(grid);
    slide(grid);
  }
  // add new number
  if (spotExists(grid))
    addNumber(grid);
  else
    console.log('No MORE SPACE');
}

function drawGrid(){
  for(var i=0;i<no_of_cells;i++){
    for(var j=0;j<no_of_cells;j++){
      // cell
      var x = i * cell_size
      var y = j * cell_size
      noFill();
      stroke(0);
      strokeWeight(5);
      rect(x,y,cell_size,cell_size);
      // text
      if (grid[i][j] != 0){
        textAlign(CENTER);
        textSize(64);
        fill(0);
        noStroke();
        // text(i+','+j,x+cell_size/2,y+cell_size/1.5);
        text(grid[i][j],x+cell_size/2,y+cell_size/1.5);
      }
    }
  }
}

function draw(){
  background(255);
  drawGrid();
  
}
