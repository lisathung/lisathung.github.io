var grid;
var cell_size;
var no_of_cells;
var board_size;
var score;

function setup() {
  // initialize variables
  no_of_cells = 4;
  board_size = 500;
  score = 0;

  noLoop();
  // initialize canvas area
  var canvas = createCanvas(board_size, board_size);

  // link canvas to div element
  canvas.parent('main-board')

  // define size of cells
  cell_size =  parseInt((board_size/no_of_cells),10);

  // get game board
  grid = make2DArray(no_of_cells);
  
  // place 2 numbers randomly on board
  // console.table(grid);
  addNumber(grid);
  addNumber(grid);
  // console.table(grid);
  updateCanvas();
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
  return grid;
}

function isNonZero(value){
  // function for checking if value is non zero
  return value > 0;
}

function extractRow(grid,row_num){
  // function for extracting row
  var row =[];
  for(var i=0;i<grid.length;i++){
    row.push(grid[i][row_num]);
    grid[i][row_num] = 0;
  }
  return row;
}

function updateRow(grid,row_num,new_row){
  for(var i=0;i<grid.length;i++){
    grid[i][row_num] = new_row[i];
  }
  return grid;
}

function slideV(grid,direction){
  // input : 3D grid of values
  // function for moving numbers north(up) and south(down)
  // rows are extracted column-wise
  var empty_cells;
  var filled_cells;
  for (var i=0;i<grid.length;i++){
    filled_cells = grid[i].filter(isNonZero);
    empty_cells = Array(grid.length - filled_cells.length).fill(0);

    if (direction=='up'){
      grid[i] = filled_cells.concat(empty_cells);
    }else if(direction == 'down'){
      grid[i] = empty_cells.concat(filled_cells);
    }else{
      console.log('Innapropriate Input Direction');
    }
  }
  return grid;
}

function slideH(grid,direction){
  // input : 3D grid of values
  // function for moving numbers east(right) and west(left)
  // rows are extracted column-wise
  var empty_cells;
  var filled_cells;
  var new_row;
  for (var i=0;i<grid.length;i++){
    row = extractRow(grid,i);
    filled_cells = row.filter(isNonZero);
    empty_cells = Array(grid.length - filled_cells.length).fill(0);

    if (direction == 'left'){
      new_row = filled_cells.concat(empty_cells);
      updateRow(grid,i,new_row);
    }else if(direction =='right'){
      new_row = empty_cells.concat(filled_cells);
      updateRow(grid,i,new_row);
    }else{
      console.log('Innapropriate Input Direction');
    }
  }
  return grid;
}

function combineV(grid){
  // adds same numbers together
  for (var i=0;i<grid.length;i++){
    for (var j=0;j+1<grid[i].length;j++){
      if (grid[i][j] == grid[i][j+1] ){
        grid[i][j] += grid[i][j+1];
        grid[i][j+1] = 0;
        score += grid[i][j];
      }
    }
  }
  return grid
}

function combineH(grid){
  // adds same numbers together
  for (var i=0;i+1<grid.length;i++){
    for (var j=0;j<grid[i].length;j++){
      if (grid[i][j] == grid[i+1][j] ){
        grid[i][j] += grid[i+1][j];
        grid[i+1][j] = 0;
        score += grid[i][j];
      }
    }
  }
  return grid
}

function move(grid,direction){
    if (direction == 'up' || direction == 'down'){
      slideV(grid,direction);
      combineV(grid);
      // slideV(grid,direction);  
    }else if (direction == 'left' || direction == 'right'){
       slideH(grid,direction);
       combineH(grid);
      // slideH(grid,direction);  
    }
    addNumber(grid);
    return grid;
}

function keyPressed(){
  if (keyCode === UP_ARROW){
    move(grid,'up');
    updateCanvas();
  }else if(keyCode === DOWN_ARROW){
    move(grid,'down');
    updateCanvas();
  }else if(keyCode === LEFT_ARROW){
    move(grid,'left');
    updateCanvas();
  }else if(keyCode === RIGHT_ARROW){
    move(grid,'right');
    updateCanvas();
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
        text(grid[i][j],x+cell_size/2,y+cell_size/1.5);
      }
    }
  }
}

function updateCanvas(){
  background(255);
  drawGrid();
  select('#score').html(score);
}
