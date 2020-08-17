///*

//Initialize RNG
var myrng = new Math.seedrandom(42+'lary');

function setup() {
  
  createCanvas(windowWidth, windowHeight);
    
  let depthMax = 9;
  //Recursive contruction
  //Breadth-first construction (complete by level)
  let b0 = createVector(0.5, 0.1);
  let b1 = createVector(0.5, 0.36  );
  let branches = [ [ [b0, b1] ] ];
  let currentDepthBranches = [ [b0, b1] ];
  draw_branch( 0, currentDepthBranches[0] );
  for (let d = 1; d < depthMax; d++) {
    let nextBranches = [];
    for(let b = 0; b < currentDepthBranches.length; b++) {
      //Branches rising from current node
      print("currentDepthBranches");
      print(currentDepthBranches);
      let currentNextBranches = next_branches( d, currentDepthBranches );
      //Add to set of next branches
      nextBranches.push( currentNextBranches );
      print("currentNextBranches");
      print(currentNextBranches);
      //Drawing next branches (between a current node and a next branch)
      for (let bn = 0; bn < currentNextBranches.length; bn++ ) {
        let nextBranch = currentNextBranches[bn];
        draw_branch( d, nextBranch );
      }
    }
    if ( Array.isArray(nextBranches) && nextBranches.length ) {
      branches.push( nextBranches[0] );
      currentDepthBranches = [...nextBranches[0]];
    }
    else {
      currentDepthBranches = [];
    }
  }
  print("branches");
  print(branches);

}

function rrect(x0,y0,x,y) {
  let wx = windowWidth;
  let wy = windowHeight;
  print(floor(x0*wx),floor(y0*wy),floor(x*wx),floor(y*wy));
  rect(floor(x0*wx),floor(y0*wy),floor(x*wx),floor(y*wy));
}

function rline(x0,y0,x1,y1) {
  let wx = windowWidth;
  let wy = windowHeight;
  line(floor(x0*wx),floor((1-y0)*wy),floor(x1*wx),floor((1-y1)*wy));
}

function draw_branch( d, branch) {
  
  if ( !Array.isArray(branch) ) {
    return;
  }
  
  let v0 = createVector(branch[0].x,branch[0].y);
  let v1 = createVector(branch[1].x,branch[1].y);
  
  let branchColor = color(129,118,99);
  
  let branchWidth = 0.01;
  
  let diff = createVector(branch[1].x,branch[1].y);
  diff.sub(v0);
  let angle = diff.heading()-PI/2;
  print("angle");
  print(angle);
  let branchLength = p5.Vector.mag(diff);
  
  //rotate(angle);
  stroke(120+(myrng()-0.5)*50,48+(myrng()-0.5)*12,40+(myrng()-0.5)*5);
  strokeWeight((16+myrng()*4)/Math.pow(d+1,0.84));
  
  rline(v0.x,v0.y,v1.x,v1.y);
  //rrect(v0.x,v0.y,branchWidth,branchLength);
  //rotate(-angle);
  
  return;  
}

/*

let branch = class {
  constructor(begin,end) {
    this.begin = begin;
    this.end = end;
  }
};

let Tree = class {
  constructor(root) {
    this.root = root;
    this.branches = [];
  }
};

*/


function next_branches(d,currentDepthBranches) {
  let bt = [...currentDepthBranches];
  // Next branches
  let bn = [];
  let bLength0 = 0.32/(Math.pow(d,1.6)) * (1+(myrng()-0.5)/1.2);
  
  for (let ibt = 0; ibt < bt.length; ibt++) {
    //let currentNode = currentBranches[ibt][1];
    let branchFactor = floor( 0.3 + 3.6*Math.pow(myrng(),1/4)/Math.pow(d+1,0.24));
    for(let ibn = 0; ibn < branchFactor; ibn++) {
      let currentNode = createVector(0, 0);
      currentNode.add(bt[ibt][1]);
      let w = 36;
      let angle = 90 + (1+(myrng()-0.5)/3) * w * ( ibn - branchFactor/2 + 1/2)/branchFactor * Math.pow(d,0.6) + (myrng()-0.5)*18  * Math.pow(d,0.54);
      let bLength = bLength0 * (myrng()+0.42);
      let disp = createVector( bLength * Math.cos(angle * PI/180), bLength * Math.sin(angle * PI/180) );
      let nextNode = createVector(0,0);
      nextNode.add(currentNode);
      nextNode.add(disp);
      bn.push( [ currentNode , nextNode ] );  
    }
  }
  return bn;
}
//*/


function draw() {
  
}
