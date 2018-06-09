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
    var nodeQueue = [this.nodes[this.startPos[0]][this.startPos[1]]];
    var pathFound = false;
    var currNode;
    var xLoc;
    var yLoc

    while(nodeQueue.length > 0 && !pathFound){
      currNode = nodeQueue.shift();
      xLoc = currNode.column;
      yLoc = currNode.row;

      if(xLoc > 0){ // making sure we dont index OOB left
        if(this.nodes[xLoc-1][yLoc].state == 'finish'){ // checking left node
          pathFound = true;
          this.nodes[xLoc-1][yLoc].parent = currNode;
        }
      }
      if(xLoc < this.columns - 1){ // making sure we dont OOB right
        if(this.nodes[xLoc+1][yLoc].state == 'finish'){ // checking right node
          pathFound = true;
          this.nodes[xLoc+1][yLoc].parent = currNode;
        }
      }
      if(yLoc > 0){ // making sure we dont index OOB up
        if(this.nodes[xLoc][yLoc-1].state == 'finish'){ // checking up node
          pathFound = true;
          this.nodes[xLoc][yLoc-1].parent = currNode;
        }
      }
      if(yLoc < this.rows - 1){ // making sure we dont index OOB up
        if(this.nodes[xLoc][yLoc+1].state == 'finish'){ // checking down node
          pathFound = true;
          this.nodes[xLoc][yLoc+1].parent = currNode;
        }
      }

      if(xLoc > 0){ // making sure we dont index OOB left
        if(this.nodes[xLoc-1][yLoc].state == 'empty'){ // checking left node
          nodeQueue.push(this.nodes[xLoc-1][yLoc]);
          this.nodes[xLoc-1][yLoc].parent = currNode;
          this.nodes[xLoc-1][yLoc].state = 'explored';
        }
      }
      if(xLoc < this.columns - 1){ // making sure we dont OOB right
        if(this.nodes[xLoc+1][yLoc].state == 'empty'){ // checking right node
          nodeQueue.push(this.nodes[xLoc+1][yLoc]);
          this.nodes[xLoc+1][yLoc].parent = currNode;
          this.nodes[xLoc+1][yLoc].state = 'explored';
        }
      }
      if(yLoc > 0){ // making sure we dont index OOB up
        if(this.nodes[xLoc][yLoc-1].state == 'empty'){ // checking up node
          nodeQueue.push(this.nodes[xLoc][yLoc-1]);
          this.nodes[xLoc][yLoc-1].parent = currNode;
          this.nodes[xLoc][yLoc-1].state = 'explored';
        }
      }
      if(yLoc < this.rows - 1){ // making sure we dont index OOB up
        if(this.nodes[xLoc][yLoc+1].state == 'empty'){ // checking down node
          nodeQueue.push(this.nodes[xLoc][yLoc+1]);
          this.nodes[xLoc][yLoc+1].parent = currNode;
          this.nodes[xLoc][yLoc+1].state = 'explored';
        }
      }
    }

    if(!pathFound){
      console.log('error no solution');
    }
    else{
      console.log('maze solved');
      currNode = this.nodes[this.finPos[0]][this.finPos[1]];

      //loop through all parent nodes from the finish until we reach start
      while(currNode.parent != null){
        currNode = currNode.parent;
        if(currNode.state != 'start'){
          this.nodes[currNode.column][currNode.row].state = 'solution';
        }
      }
    }
  }
}
