var pointsData = firebase.database().ref();

var pointsData = firebase.database().ref();
var points = [];

function setup() {
  var canvas = createCanvas(1500, 1500);
  background(255);
  fill(0);

  pointsData.on("child_added", function (point) {
    points.push(point.val());
  });
  pointsData.on("child_removed", function () {
    points = [];
  });

  canvas.mousePressed(drawPoint);
  canvas.mouseMoved(drawPointIfMousePressed);
}

var previousPoint = {
  x: 0,
  y: 0
}
previousPoint.x = 0
previousPoint.y = 0

function draw() {
  background(255);

  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    ellipse(point.x, point.y, 10, 10);
  }
}

function drawPoint() {
  pointsData.push({x: mouseX, y: mouseY});

  var averagePoint = previousPoint
  averagePoint.x = (mouseX + previousPoint.x)*0.5
  averagePoint.y = (mouseY + previousPoint.y)*0.5


  console.log('Current Point:')
  console.log(mouseX + ", " + mouseY)
  console.log('Average Point:')
  console.log(averagePoint)

  pointsData.push({x: averagePoint.x, y: averagePoint.y});
  previousPoint = {
    x: mouseX,
    y: mouseY
  } 
}

function drawPointIfMousePressed() {
  if (mouseIsPressed) {
    drawPoint();
  }
}

$("#saveDrawing").on("click", saveDrawing);

function saveDrawing() {
  saveCanvas();
}

$("#clearDrawing").on("click", clearDrawing);

function clearDrawing() {
  pointsData.remove();
  points = [];
}
