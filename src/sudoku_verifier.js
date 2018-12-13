function determineStatus (invalidIndexes, solution) {
	let status = 'valid';
	const containsNull = solution.includes(null);

	if (invalidIndexes.length > 0) {
		status = 'invalid';
	} else if (invalidIndexes.length === 0 && containsNull) {
		status = 'incomplete';
	}

	return status;
}

function removeDuplicates(rowsInvalid, columnsInvalid) {
	let invalidIndexes = rowsInvalid.concat(columnsInvalid);
	
	invalidIndexes = invalidIndexes.filter((item, index) => {
		return invalidIndexes.indexOf(item) >= index;
	});

	return invalidIndexes
}

function validate (problemSet, solutionSet, type) {
	let invalidIndexes = [];

	for (let row = 0; row < 9; row++) {
		for (let column = 0; column < 9; column++) {
			let current = solutionSet[row][column];
			
			if ( current !== null) {
				let duplicateIndex = solutionSet[row].indexOf(current, column + 1);

				if (duplicateIndex > -1) {
					if (problemSet[row][column] === null) {
						let currentIndexMap = null;

						if (type === 'row') {
							currentIndexMap = column + row * 9;
						} else {
							currentIndexMap = row + column * 9;
						}

						invalidIndexes.push(currentIndexMap);
					}

					if (problemSet[row][duplicateIndex] === null) {
						let duplicateIndexMap = null;

						if (type === 'row') {
							duplicateIndexMap = duplicateIndex + row * 9;
						} else {
							duplicateIndexMap = row + duplicateIndex * 9;
						}

						invalidIndexes.push(duplicateIndexMap);
					}
				}
			}
		}
	}

	return invalidIndexes;
};

function createColumns(board) {
  if (board.length > 0) {
    let columns = [];
  
    for (let row = 0; row < 9; row++) {
      let dataSet = [];
  
      for (let column = 0; column < 9; column++) {
        dataSet.push(board[column][row]);
      }
  
      columns.push(dataSet);
    }
  
    return columns;
  } else {
    return board;
  }
}

function createGrid(solution) {
	solution = solution.slice();
  let grid = [];

	while (solution.length > 0) {
		const row = solution.splice(0, 9);

		grid.push(row);
	}

	return grid;
}

export function sudokuVerifier(sets) {
  let problem = sets.problem;
  let solution = sets.solution;

  let result = { status: 'valid', invalidIndexes: [ ] };

	let problemBoard = createGrid(problem);
	let solutionBoard = createGrid(solution);

	let problemRows = problemBoard;
	let problemColumns = createColumns(problemBoard);

	let solutionRows = solutionBoard; 
	let solutionColumns = createColumns(solutionBoard);

	let rowsInvalid = validate(problemRows, solutionRows, 'row');
  let columnsInvalid = validate(problemColumns, solutionColumns, 'column');
  
  let invalidIndexes = removeDuplicates(rowsInvalid, columnsInvalid);
  let status = determineStatus(invalidIndexes, solution);

	result.invalidIndexes = invalidIndexes;
	result.status = status;

  return result;
}
