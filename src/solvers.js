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
  var available = new Array(n);

  findRow(0);

  function findRow (row) {
    for (var i = 0; i < n; i++) {
      if (available[i]) {
        continue;
      }
      b.togglePiece(row, i);
      available[i] = !available[i];
      if (b.hasAnyQueenConflictsOn(row, i)) {
        b.togglePiece(row, i);
        available[i] = !available[i];
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
          available[i] = !available[i];
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

  var availCol = [];
  var availLD = [];
  var availRD = [];

  findRow(0);

  function findRow (row) {
    for (var i = 0; i < n; i++) {
      if (!(availCol[i] || availLD[i + row] || availRD[i - row])) {
       availCol[i] = availLD[i + row] = availRD[i - row] = true;

       if (row < n - 1) {
         findRow(row + 1);
       } else {
         // deepest level of subtree is true
         solutionCount++;
       }
       availCol[i] = availLD[i + row] = availRD[i - row] = false;
      }
    }
  }

  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.countNQueensBitwise = function (n) {
  if (n === 0){
    return 1;
  }
  var solutionCount = 0, availCol, availLD, availRD;
  var b = new Array(n);

  findRow(0);

  function findRow (row) {
    var max = 1 << n, LD, RD, skip;
    b[row] = 1;

    while(b[row] < max) {
      skip = false;
      LD = b[row];
      RD = b[row];
      for (var j = row - 1; j >= 0; j--) {
        LD = LD >>> 1;
        RD = RD << 1;
        if (b[j] === b[row] || b[j] === LD || b[j] === RD) {
          skip = true;
          break;
        }
      }
      if (skip === false) {
        if (row < n - 1) {
          findRow(row + 1);
        } else {
          solutionCount++;
        }
      }
      b[row] = b[row] << 1;
    }
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.countNQueensBitwisePaper = function (n) {
  if(n === 0) {
    return 1;
  }
  var all = (1 << n) - 1;
  var solutionCount = 0;

  i(0,0,0);

  function i (ld, cols, rd) {
    if (cols === all) {
      solutionCount++;
    } else {
     var poss = ~(ld | cols | rd) & all;
     while (poss) {
       var bit = poss & -poss;
       i( (ld|bit) << 1, (cols|bit) , (rd|bit) >> 1);
       poss -= bit;
     }
    }
  }
  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
