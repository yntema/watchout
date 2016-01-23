var w = 900;
var h = 500;

var enemyData = [
                  [ 5,     20 ],
                  [ 480,   90 ],
                  [ 250,   50 ],
                  [ 100,   33 ],
                  [ 330,   95 ],
                  [ 410,   12 ],
                  [ 475,   44 ],
                  [ 25,    67 ],
                  [ 85,    21 ],
                  [ 220,   88 ]
              ];

var gameBoard = d3.select('body')
  .append('svg')
  .attr('width', w) 
  .attr('height', h);

var drag = d3.behavior.drag()
  .on('drag', function(){
    player.attr('x', d3.event.x)
        .attr('y', d3.event.y);
  });

var player = gameBoard.selectAll('svg')
  .data([[w/2, h/2]])
  .enter()
  .append('rect')
  .attr('x', w/2)
  .attr('y', h/2)
  .attr('width', 20)
  .attr('height', 20)
  .attr('class', 'player')
  .call(drag);


var enemies = gameBoard.selectAll('circle')
  .data(enemyData)
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d[0]*2; })
  .attr('cy', function(d) { return d[1]*2; })
  .attr('r', 5)
  .attr('class', 'enemy');  

var checkCollissions = function(){
  enemies.

};

var shuffleEnemies = function(enemies){
  setInterval(function(){
    enemies
      .transition().duration(1000)
      .attr('cx', function(d) {return Math.floor(Math.random()*w)})
      .attr('cy', function(d) {return Math.floor(Math.random()*h)});
  }, 1500);
};

shuffleEnemies(enemies);