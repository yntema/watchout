var w = 900;
var h = 500;
var score = 0;
var collisions = 0;
var highScore = 0;

var enemyData = d3.range(10).map(function() {
  return [Math.random()*w, Math.random()*h];
});

var colorScale = d3.scale.linear()
  .domain([0, w])
  .range(['yellow', 'blue']);

var bgColorScale = d3.scale.linear()
  .domain([0, 10])
  .range(['white', '#dddddd']);


var gameBoard = d3.select('.board')
  .append('svg')
  .attr('width', w) 
  .attr('height', h)
  .style('background-color', 'white');

var drag = d3.behavior.drag()
  .on('drag', function(){
    player.attr('cx', d3.event.x)
      .attr('cy', d3.event.y)
      .attr('fill', function(d) { return colorScale(this.cx.animVal.value)});
  });

var player = gameBoard.selectAll('.player')
  .data([[w/2, h/2]])
  .enter()
  .append('circle')
  .attr('cx', w/2)
  .attr('cy', h/2)
  .attr('r', 20)
  .attr('fill', 'red')
  .attr('class', 'player')
  .call(drag);

var enemyPath = "M41.594,16.129H30.725c-0.552,0-0.984,0.458-1.148,0.986c-0.42,1.35-1.68,2.329-3.166,2.329" + 
    "c-1.832,0-3.315-1.484-3.315-3.315c0-1.019,0.46-1.931,1.185-2.539c0.422-0.355,0.713-0.945,0.541-1.47L21.344,1.418" + 
    "c-0.171-0.525-0.447-0.525-0.618,0l-3.445,10.603c-0.171,0.525,0.089,1.179,0.454,1.593c0.512,0.58,0.824,1.34,0.824,2.175" + 
    "c0,1.831-1.484,3.315-3.315,3.315c-1.367,0-2.529-0.83-3.033-2.012c-0.216-0.508-0.696-0.964-1.249-0.964H0.478" + 
    "c-0.553,0.001-0.638,0.264-0.191,0.589l9.294,6.752c0.447,0.324,1.134,0.267,1.632,0.027c0.429-0.207,0.909-0.324,1.418-0.324" + 
    "c1.831,0,3.315,1.484,3.315,3.314c0,1.831-1.484,3.315-3.315,3.315c-0.185,0-0.366-0.019-0.541-0.052" + 
    "c-0.295-0.055-0.663,0.287-0.833,0.812l-3.235,9.956c-0.171,0.525,0.053,0.688,0.5,0.363l8.909-6.473" + 
    "c0.447-0.324,0.569-0.94,0.423-1.435c-0.086-0.292-0.133-0.601-0.133-0.92c0-1.831,1.484-3.315,3.315-3.315" + 
    "s3.315,1.484,3.315,3.315c0,0.319-0.047,0.628-0.133,0.92c-0.146,0.494-0.024,1.11,0.423,1.435l8.909,6.473" + 
    "c0.446,0.324,0.671,0.162,0.5-0.363l-3.209-9.875c-0.171-0.525-0.485-0.902-0.709-0.871c-0.132,0.02-0.267,0.03-0.405,0.03" + 
    "c-1.831,0-3.314-1.484-3.314-3.315c0-1.83,1.483-3.314,3.314-3.314c0.447,0,0.87,0.092,1.258,0.256" + 
    "c0.508,0.215,1.211,0.256,1.658-0.069l9.143-6.642C42.233,16.392,42.146,16.129,41.594,16.129z M21.034,25.204" + 
    "c-1.598,0-2.893-1.295-2.893-2.894c0-1.598,1.295-2.893,2.893-2.893s2.893,1.295,2.893,2.893" + 
    "C23.927,23.909,22.632,25.204,21.034,25.204z";


gameBoard
  .append('defs')
  .append('g')
  .attr('id', 'ninja')
  .append('path')
  .attr('d', enemyPath);

var enemies = gameBoard.selectAll('use')
  .data(enemyData)
  .enter()
  .append('use')
  .attr({
    'x': function(d) { return d[0]; },
    'y': function(d) { return d[1]; },
    'xlink:href': '#ninja',
    'class' : 'enemy'
  });


var shuffleEnemies = function(enemies){
  setInterval(function(){
    enemies
      .transition().duration(1000)
      .attr('x', function(d) { return Math.random() * w; })
      .attr('y', function(d) { return Math.random() * h; })
      .attr('fill', function(d) { return colorScale(this.x.baseVal.value);});
    gameBoard.transition().duration(2000)
      .style('background-color', bgColorScale(Math.random()*10));
  }, 2000);
};

shuffleEnemies(enemies);

var collisionCounterUpdate = function(){
  collisions++;
  d3.select('body')
    .selectAll('.collisions span')
    .text(collisions);
};

var collisionDetection = function() {
  var throttled = _.throttle(collisionCounterUpdate, 1900);
  setInterval(function() {
    enemies[0].forEach(function(enemy) {
      incrementScore();
      setBoundaries();
      if(enemy !== null && checkCollisions(enemy)) {
        if(score > highScore) {
          updateHighScore();
        }
        resetCurrentScore();
        throttled();      
      }
    });
  }, 50);
};


var checkCollisions = function(enemy) {
  var x1 = enemy.x.animVal.value + 21;
  var y1 = enemy.y.animVal.value + 20;
  var x2 = player[0][0].cx.animVal.value;
  var y2 = player[0][0].cy.animVal.value;
  var distance = function() {
    return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1 - y2, 2));
  };
  return (distance() < 41);
};

collisionDetection();

var resetCurrentScore = function() {
  score = 0;
  d3.select('body')
  .selectAll('.current span')
  .text(score);
};

var incrementScore = function() {
  score++;
  d3.select('body')
    .selectAll('.current span')
    .text(score);
};


var updateHighScore = function(){
  highScore = score;
  d3.select('body')
    .selectAll('.highscore span')
    .text(highScore);
};

var minX = 20;
var minY = 20;
var maxX = w - 20;
var maxY = h - 20;


var setBoundaries = function() {
  if(player[0][0].cx.animVal.value < minX) {
    player.transition().duration(100)
    .attr('cx', minX);
  }
  if(player[0][0].cy.animVal.value < minY) {
    player.transition().duration(100)
    .attr('cy', minY);
  }
  if(player[0][0].cx.animVal.value > maxX) {
    player.transition().duration(100)
    .attr('cx', maxX);
  }
  if(player[0][0].cy.animVal.value > maxY) {
    player.transition().duration(100)
    .attr('cy', maxY);
  }
};









