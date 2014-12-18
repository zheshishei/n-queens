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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var b = new Board({'n' : n});

  findRow(0);

  function findRow (row) {
    for (var i = 0; i < n; i++) {
      b.togglePiece(row, i);
      if (b.hasAnyQueenConflictsOn(row, i)) {
        b.togglePiece(row, i);
        continue;
      } else {
        if (row < n - 1) {
          var ret = findRow(row + 1);
          // if at least one subtree decision is true
          if (ret) {
            return true;
          }
          // when all subtree decisions are false
          b.togglePiece(row, i);
        } else {
          // deepest level of subtree is true
          return true;
        }
      }
    }
    return false;
  }

  var solution = b.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if(n === 0) {
    return 1;
  }
  var solutionCount = 0; //fixme
  var b = new Board({'n' : n});

  findRow(0);

  function findRow (row) {
    for (var i = 0; i < n; i++) {
      b.togglePiece(row, i);
      if (!b.hasAnyQueenConflictsOn(row, i)) {
        if (row < n - 1) {
          findRow(row + 1);
        } else {
          // deepest level of subtree is true
          solutionCount++;
        }
      }
      b.togglePiece(row, i);
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
