const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

/*
Indexing of elements occurs like maze[y][x] since ifirst entry is row, and second is column
xi1j1 x1j2 x1j3 ....
xi2j1           ....
xi3j1
*/

var generateMaze = function (MAZE_SIZE_ROWS, MAZE_SIZE_COLS) {
	if (MAZE_SIZE_ROWS < 1 || MAZE_SIZE_COLS < 1) {
		return {err: "Size of maze, Rows:" + MAZE_SIZE_ROWS + " and Columns: " + MAZE_SIZE_COLS + " is invalid. Pleae use positive numbers"}
	}
	MAZE_SIZE_ROWS = MAZE_SIZE_ROWS ? MAZE_SIZE_ROWS : 25
	MAZE_SIZE_COLS = MAZE_SIZE_COLS ? MAZE_SIZE_COLS : 25

	var maze = [];
	for (var i = 0; i < MAZE_SIZE_ROWS; i++) {
		maze.push([])
		for (var j = 0; j < MAZE_SIZE_COLS; j++) {
			maze[i][j] = {
				top: true, // top wall is present
				right: true, // right wall is present
				bottom: true, // bottom wall is present
				left: true, // left wall is present
				isVisited: false // internal value to determine if maze cell has already been visited.
			};
		}
	}
	// seed location to begin recusive backtracing to create path
	var seed = [Math.floor(MAZE_SIZE_ROWS * Math.random()), Math.floor(MAZE_SIZE_COLS * Math.random())]
	generatePath(maze, seed[0], seed[1])
	removeInternalInfo(maze, ["isVisited"]);
	return maze;
}

var generatePath = function (maze, row, col) {
	var possibleDirections = [TOP, RIGHT, BOTTOM, LEFT];

	maze[row][col].isVisited = true;
	removeMazeEdges(possibleDirections, row, col, maze);

	while (possibleDirections.length) {
		var direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)] // randomly possible direction
		var moveTo = moveToCoordinates(row, col, direction); // get coordinates you are moving to

		if (maze[moveTo.row][moveTo.col].isVisited) {
			removeDirection(possibleDirections, direction); // has already been visited

		} else {
			maze[row][col][convertIntegerToString(direction)] = false;
			maze[moveTo.row][moveTo.col][convertIntegerToString(findOpposite(direction))] = false;
			generatePath(maze, moveTo.row, moveTo.col)
		}
	}

	return maze;
}
var findOpposite = function (direction) {
	return (direction + 2) % 4;
}
var convertIntegerToString = function (direction) {
	var stringDirection = ""
	switch (direction) {
		case 0:
			stringDirection = "top";
			break;
		case 1:
			stringDirection = "right";
			break;
		case 2:
			stringDirection = "bottom";
			break;
		case 3:
			stringDirection = "left";
			break;
	}
	return stringDirection;
}

var moveToCoordinates = function (row, col, direction) {
	var moveTo = {row:row, col:col};
	if (direction == TOP) {
		moveTo.row --;
	} else if (direction == RIGHT) {
		moveTo.col ++;
	} else if (direction == BOTTOM) {
		moveTo.row ++;
	} else if (direction == LEFT) {
		moveTo.col --;
	}
	return moveTo;
}
var removeMazeEdges = function (possibleDirections, row, col, maze) {
	if (col == 0) {
		removeDirection(possibleDirections, LEFT)
	} else if (col == (maze[0].length - 1)) {
		removeDirection(possibleDirections, RIGHT)
	}
	if (row == 0) {
		removeDirection(possibleDirections, TOP)
	} else if (row == (maze.length - 1)) {
		removeDirection(possibleDirections, BOTTOM)
	}
}

var removeDirection = function (possibleDirections, toRemove) {
	var index = possibleDirections.indexOf(toRemove)
	index != -1 ? possibleDirections.splice(index, 1) : null;
}

var removeInternalInfo = function (maze, infoToRemove) {
	for (var i = 0; i < maze.length; i++) {
		for (var j = 0; j < maze[0].length; j++) {
			for (var k = 0; k < infoToRemove.length; k++) {
				delete maze[i][j][infoToRemove]
			}
		}
	}
}

module.exports = generateMaze
