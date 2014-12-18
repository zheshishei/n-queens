/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  var b = new Board({'n': n}); //fixme
  var row;
  for (var i = 0; i < n; i++) {
    row = b.get(i);
    row[i] = 1;
    solution.push(row);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 1;

  for (var i = n; i > 0; i--) {
    solutionCount *= i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var b = new Board({'n':n});
  var decisions = [];
  var row;
  // var available = new Array(n);
  var lastDecision;
  var maxIteration = 10000000, iter = 0;

  while (solution.length < n && iter < maxIteration) {
    iter++;

    lastDecision = decisions[decisions.length - 1];

    if (lastDecision === undefined) {
      decisions.push([0,0]);
      b.togglePiece(0,0);
      continue;
    }


    // for (var i = 0; i < n; i++) {
    //   if (!b.hasAnyQueenConflictsOn(lastDecision[0] + 1, i)) {

    //   }
    // }







    b.togglePiece(lastDecision[0], lastDecision[1]);

    }

    // solution.push(b.get(i));

  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
