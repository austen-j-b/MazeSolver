var myCanvas  = {
  //canvas: document.createElement('canvas'),
  initCanvas: function(){
    this.canvas = document.getElementById('mainCanvas'),
    // initiate a basic canvas with exact necessary width and height
    this.canvas.width = (NODE_GAP + (COLUMNS*(NODE_WIDTH + NODE_GAP)));
    this.canvas.height = (NODE_GAP + (ROWS*(NODE_HEIGHT + NODE_GAP)));
    // get canvas context to draw to
    this.context = this.canvas.getContext('2d');
    // add the canvas to our main body
    //document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    // add event listeners for click/unclick
    window.addEventListener('mousedown', this.mouseDown);
    window.addEventListener('mouseup', this.mouseUp);
  },
  /* clear canvas to be redrawn */
  clearCanvas: function(){
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
  },
  /* the mouse events are called from the window.*/
  mouseDown: function(e){
    myCanvas.canvas.onmousemove = myCanvas.dragMouse;
    var mouseX = e.pageX - myCanvas.canvas.offsetLeft;
    var mouseY = e.pageY - myCanvas.canvas.offsetTop;
    for(col = 0; col < maze.columns; col++){
      for(row = 0; row < maze.rows; row++){
        if(!(col == maze.lockedNode[0] && row == maze.lockedNode[1])){
          if(mouseX > maze.nodes[col][row].topLeft[0] &&
            mouseX <= maze.nodes[col][row].bottomRight[0] &&
            mouseY > maze.nodes[col][row].topLeft[1] &&
            mouseY <= maze.nodes[col][row].bottomRight[1]){
              maze.nodes[col][row].clicked();
              maze.lockedNode = [col, row];
            }
        }
      }
    }
  },
  mouseUp: function(e){
    myCanvas.canvas.onmousemove = null;
    maze.lockedNode = [null, null];
  },
  dragMouse: function(e){
    var mouseX = e.pageX - myCanvas.canvas.offsetLeft;
    var mouseY = e.pageY - myCanvas.canvas.offsetTop;
    for(col = 0; col < maze.columns; col++){
      for(row = 0; row < maze.rows; row++){
        if(!(col == maze.lockedNode[0] && row == maze.lockedNode[1])){
          if(mouseX > maze.nodes[col][row].topLeft[0] &&
            mouseX <= maze.nodes[col][row].bottomRight[0] &&
            mouseY > maze.nodes[col][row].topLeft[1] &&
            mouseY <= maze.nodes[col][row].bottomRight[1]){
              maze.nodes[col][row].clicked();
              maze.lockedNode = [col, row];
            }
        }
      }
    }
  }
}
