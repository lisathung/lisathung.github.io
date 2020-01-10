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
  addNumber();
  addNumber();
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

function spotExists(){
  // checks if board has space for another number
  for(var i=0;i<no_of_cells;i++){
    for(var j=0;j<no_of_cells;j++){
      if(grid[i][j]==0)
        return true;
      }
    }
  return false;  
}

function addNumber(){
  // add number at valid location
  if(spotExists()){
    while(true){
      // generate random index
      i = Math.floor(Math.random() * no_of_cells);
      j = Math.floor(Math.random() * no_of_cells);
      // check if valid
      if(grid[i][j] == 0){
        grid[i][j] = 2;
      }
      else
        continue;
    }
  }
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
