// start slingin' some d3 here.

// set up game board parameters
var w = 1000;
var h = 800;
var nEnemies = 30;

// Create Gameboard
var gameBoard = d3.select('body').append('svg')
  .attr('width', w)
  .attr('height', h);

// // Update Score
// var updateScore = d3.select('.current')
//       .text(gameStats.score.toString());

// updateBestScore = ->
//   gameStats.bestScore =
//     _.max [gameStats.bestScore, gameStats.score]

// var updateBestScore = d3.select('.highscore')
//   .text(gameStats.bestScore.toString());

// Make enemies array... possible issue when calling
var enemies = _range(0, nEnemies).map(function(item) { 
  return {
    id: item,
    x: Math.random()*100,
    y: Math.random()*100
  };
});


// var circles = svg.selectAll('circle')
//   .data(dataSet)
//   .enter()
//   .append('circle')
//   .attr('cx', function(d){
//     return d[0];
//   })
//   .attr('cy', function(d){
//     return d[1];
//   })
//   .attr('r', 5);

circles.enter.append('circle')
  .attr('cx', w/2)
  .attr('cy', h/2)
  .attr('r', 20)
  .attr('class', 'hero');




  // create enemey
  // create player class  

  // set timeout will generate random coordinates for every enemy and transition the enemies to the new coordinates

  // 