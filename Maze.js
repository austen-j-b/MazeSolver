var maze = {
  columns: COLUMNS,
  rows: ROWS,
  startPos: [0,0], // position of starting node
  finPos: [COLUMNS -1, ROWS -1], // position of finish node
  containsStart: false, // so the maze cannot have multiple starts
  containsFinish: false, // same for finishes
  lockedNode: [null,null], /* Lock a node that has just been clicked
                              so that it is not clicked every frame */
  nodes: [], // will be filled with a 2d array of nodes

  /* fill the nodes array with node elements and set them all to empty nodes */
  initMaze: function(){
    this.nodes = []
    for(col = 0; col < this.columns; col++){
      this.nodes[col] = [];
      for(row = 0; row < this.rows; row++){
        this.nodes[col][row] = new node('empty', col, row);
      }
    }
  },

  /* update and redraw each node */
  updateMaze: function(){
    for(col = 0; col < this.columns; col++){
      for(row = 0; row < this.rows; row++){
        this.nodes[col][row].update();
      }
    }
  },

  /* search for a path through the maze (basic dfs currently) */
  solveMaze: function(){

  }
}
