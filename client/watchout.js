var w = 900;
var h = 500;
var score = 0;
var collisions = 0;
var highScore = 0;

var enemyData = d3.range(5).map(function() { 
  return [Math.random()*w, Math.random()*h];
});

var gameBoard = d3.select('body')
  .append('svg:svg')
  .attr('width', w) 
  .attr('height', h);

var drag = d3.behavior.drag()
  .on('drag', function(){
    player.attr('cx', d3.event.x)
        .attr('cy', d3.event.y);
  });

var player = gameBoard.selectAll('.player')
  .data([[w/2, h/2]])
  .enter()
  .append('circle')
  .attr('cx', w/2)
  .attr('cy', h/2)
  .attr('r', 20)
  // .attr('height', 20)
  .attr('class', 'player')
  .call(drag);


var enemies = gameBoard.selectAll('circle')
  .data(enemyData)
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d[0]; })
  .attr('cy', function(d) { return d[1]; })
  .attr('r', 5)
  .attr('class', 'enemy');  

// var checkCollissions = function(){
//   enemies.

// };

var shuffleEnemies = function(enemies){
  setInterval(function(){
    enemies
      .transition().duration(2000)
      .attr('cx', function(d) {return Math.floor(Math.random()*w);})
      .attr('cy', function(d) {return Math.floor(Math.random()*h);});
  }, 2000);
};

shuffleEnemies(enemies);


var collisionDetection = function() {
  setInterval(function() {
    enemies[0].forEach(function(enemy) {
      setBoundaries();
      incrementScore();
      if(enemy !== null && checkCollisions(enemy)) {
        updateHighScore();
        resetCurrentScore();
        collisionCounterUpdate();      
      }
    });
  }, 50);
};


var checkCollisions = function(enemy) {
  var x1 = enemy.cx.animVal.value;
  var y1 = enemy.cy.animVal.value;
  var x2 = player[0][0].cx.animVal.value;
  var y2 = player[0][0].cy.animVal.value;
  var distance = function() {
    return Math.sqrt(Math.pow(x1-x2, 2)+Math.pow(y1 - y2, 2));
  };
  return (distance() < 25);
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

var collisionCounterUpdate = function(){
  collisions++;
  d3.select('body')
    .selectAll('.collisions span')
    .text(collisions);
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









