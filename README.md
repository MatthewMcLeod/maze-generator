# maze-generator
Easy to use Maze Generator in javascript/node that has zero dependencies

Generates maze using recusive backtracking(https://en.wikipedia.org/wiki/Backtracking) to ensure there is a single solution to the maze.

To use, simply require the file
```javascript
 mazeGenerator = require("maze-gen")
```
 and then simply call it and it will return a generated maze
 ```javascript
 var maze = mazeGenerator(numOfRows, numOfCols);
```
 
where numOfRows and numOfCols are optional parameter that detail the number of rows and columns you want the maze to have.

The output will be a 2 dimensional array where each cell will be described by a json object with the format
```javascript
{
				top: true, // top wall is present
				right: true, // right wall is present
				bottom: true, // bottom wall is present
				left: true, // left wall is present
}
```
Accessing a specific cell is by specifying row, then col.
```javascript
maze[row][col]
```

