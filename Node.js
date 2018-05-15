function node(state, column, row){
  this.state = state;
  this.column = column;
  this.row = row;
  this.width = NODE_WIDTH;
  this.height = NODE_HEIGHT;
  this.parent = null;
  /* easy acces to the top left/bottom right of the node (starting at 0,0 of the
  canvas it is placed on) */
  this.topLeft = [(NODE_GAP + (this.column*(this.width + NODE_GAP))),
                  (NODE_GAP + (this.row*(this.height + NODE_GAP)))];
  this.bottomRight = [this.topLeft[0] + this.width,
                      this.topLeft[1] + this.height];

  /* redraw the node */
  this.update = function(){
    myCanvas.context.fillStyle=this.getColour();
    myCanvas.context.fillRect(this.topLeft[0],
      this.topLeft[1],this.width,this.height);
  }
  /* matches a state with a colour */
  this.getColour = function(){
    switch(this.state){
      case 'empty':
        return '#999999'; // light grey
        break;
      case 'wall':
        return '#168ff9'; // blue
        break;
      case 'start':
        return '#00FF00'; // green
        break;
      case 'finish':
        return '#FF0000'; // red
        break;
      case 'explored':
        return '#ffb347'; // yellow
        break;
      case 'solution':
        return '#000000'; // black
        break;
      default:
        return '#FF00FF'; // purple
        break;
    }
  }
  /* change the state of node when clicked */
  this.clicked = function(){
    if(this.state == 'wall'){
      this.state = 'empty';
    } else if (this.state == 'empty'){
      this.state = 'wall'
    }
  }
}
