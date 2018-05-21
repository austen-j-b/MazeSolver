/* self explanatory constants */
const COLUMNS = 10;
const ROWS = 10;
const NODE_WIDTH = 20;
const NODE_HEIGHT = 20;
const NODE_GAP = 3;

function initAll(){
  frameRate = setInterval(refresh, 80); // refreshing the screen every 80ms
  myCanvas.initCanvas(); // create canvas.
  maze.initMaze(); // create starting maze
  maze.nodes[maze.startPos[0]][maze.startPos[1]].state = 'start';
  maze.nodes[maze.finPos[0]][maze.finPos[1]].state = 'finish';
}
function refresh(){
  myCanvas.clearCanvas(); // clear canvas to be redrawn
  maze.updateMaze(); // redraw maze with updates
}
