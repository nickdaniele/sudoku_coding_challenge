# Sudoku Sprint

You've been recruited into an Agile team. This sprint, the team is working on a Sudoku game web app. You've been given two stories. See the details of the stories below. Please complete work for both stories and submit your work for QA.

## Project Details

As part of this challenge you will need to run tests and start the included node.js server. To get started, install the dependencies. This challenge was created using node v5.10.1 and NPM v3.8.6.

```
npm install
```

### Running Tests

In order to run the unit tests, type the following:

```
npm test
```

Initially, all of the tests will fail. The first story you've been assigned involves fixing specs.

### Sudoku Game Data Structure

In this challenge, sudoku games are represented by JSON objects. Below is an sample of what the JSON structure of a sudoku game looks like.

```
{
  "problem": [
    // ...
  ],
  "solution": [
    // ...
  ],
}
```

As you can see, the object has two properties, `"problem"` and `"solution"`. Each property is an array. Each array will have 81 elements. The elements of the array represent the 81 cells in a sudoku board. The first element represents the top left cell. The second element represents the cell to the right of the first element. The 10th element represents the cell below the 1st element. In other words, the numbers in the array represent the cell in the grid in left-to-right, top-to-bottom order. Therefore, the last element will represent the bottom-right cell.

Each array element will either be a number (1 through 9), or `null`. `null` elements represent an unfilled cell in the sudoku board. The numbers 1 through 9 represent the numbers 1 through 9.

Each element in the `"problem"` array represents a cell's value in the original sudoku problem. Each element in the `"solution"` array represents a cell's value in the current game state. The elements in the `"problem"` and `"solution"` arrays correspond to each other.

Number elements in the problem array represent provided values and will have the same value in the `"solution"` array. In other words, if the element at index `0` in the `"problem`" array was `1`, then that number was provided for the top left cell by the original sudoku problem. Therefore, the element at index `0` in the `"solution"` array will as be `1` as well. This is because provided numbers cannot be changed in sudoku.

`null` elements in the problem array may be `null` in the solution array. This would indicate that in the current game state, the user has not filled in this cell. Elements that are `null` in the problem array may be set to a number in the solution array. This would represent a cell which was blank in the original problem, but that has since been filled in by the user.

## Story 1: As a user, I should see when my sudoku solution is invalid.

Your team would like you to implement a function that verifies if a sudoku solution is correct. The function will take sudoku problem data and sudoku solution data. The function should determine if the solution is complete, incomplete, or invalid. If the solution is invalid, the function should identify which cells are invalid.

There are already unit tests written for this function. Please implement the logic under `./src/sudoku_verifier.js`. The unit tests are found in `./src/sudoku_verifier.spec.js`.

### Return Value of `sudokuVerifier`

The structure of the return value is as follows:

```js
{
  status: 'valid', // could also be 'invalid', or 'incomplete'
  invalidIndexes: [ ], // an array containing only indexes of user entered values that break the rules of sudoku. Indexes of numbers found in the original problem are not included.
}
```

If the solution data is correct and complete, the status should be `'valid'`. If the solution data is incomplete but has no errors, the status should be `'incomplete'`. Otherwise, the status should be `'invalid'`.

If there are any user entered numbers which violate a rule of sudoku, then include the index of those solution numbers in the `'invalidIndexes'` array. For example, if the top left square was a user provided value of `1`, and the square to the right of it was a problem provided value of `1`, then `invalidIndexes` should be `[ 0 ]` because the user entered value of `1` in index `0` was incorrect. Numbers provided as part of the problem cannot be considered errors.

### User Acceptance Criteria:

Below is the user acceptance criteria for the story. The acceptance criteria is worded from the perspective of a user. Please try to fulfill all acceptance criteria before submitting your solution. 

* When validating a sudoku solution that has no invalid cells, but which has empty cells, the function should return:
```js
{
  status: 'incomplete',
  invalidIndexes: [ ],
}
```
* When validating a sudoku solution that has no missing cells, and which has no invalid cells, the function should return:
```js
{
  status: 'complete',
  invalidIndexes: [ ],
}
```
* When validating a sudoku solution that has a user-entered 9 in the top left cell and another user-entered 9 to the right of it, both cells should be considered invalid. This is because two 9's cannot appear in the same row, and both cells are user-entered. In this case, the return value of the function should be:
```js
{
  status: 'invalid',
  invalidIndexes: [ 0, 1 ],
}
```
* When validating a sudoku solution that has a user-entered 9 in the top left cell and a problem-provided 9 in the cell to the right of the top left cell, only the first 9 should be considered invalid. This is because only user-entered cells can be considered invalid. In this case, the return value of the function should be:
```js
{
  status: 'invalid',
  invalidIndexes: [ 0 ],
}
```

## Story 2: As a user, I should be able to see a visualization of a sudoku game.

Your next task is to create a Web app that fetches a sudoku problem and solution and visualizes it. This project includes a development server that exposes an HTTP API endpoint at `/sudoku`. The development server is also configured to serve an HTML index page and load JavaScript from `./src/index.js`. The development server is using Babel with Stage-0 preset and Webpack. This means that you may write ES6 as well as most ES7-proposal features. You are free to structure your code in modules, and use `import` or use Webpack's `require` function. If you prefer not to use Webpack and Babel, then please include whatever assets you require. There are no technology limitations as part of this challenge. Please write code that represents your skill and style :)

In order to start the web server, run `npm install && npm start`. This will make the `/sudoku` API available and serve the HTML and JS from `./src`. 

When your Web page loads, it should immediately fetch sudoku data and visualize it. There is a single button which reads 'LOAD NEW'. When the user clicks this button, fetch additional data from `/sudoku` and visualize it. Each time you do a GET request to `/sudoku`, different sudoku data will be sent.

Your app should match the included visual design. The visual design can be found in `sudoku.png` or `sudoku.psd`. The visual design shows the problem-provided cells, user-entered cells, and invalid user-entered cells. Data about what cells are invalid is not included in the JSON response from `/sudoku`. You will need to use the code from Story 1 to determine which cells are invalid.

### HTTP Response Structure

The response of the HTTP GET request to `/sudoku` is a sudoku JSON object.

### User Acceptance Criteria:

Below is the user acceptance criteria for the story. The acceptance criteria is worded from the perspective of a user. Please try to fulfill all acceptance criteria before submitting your solution. 

1. I am able to see a visualization of a sudoku problem and solution.
1. I can tell which cells are empty.
1. I can tell which cells have numbers provided by the problem.
1. I can tell which cells have numbers that are part of the solution.
1. I can tell which cells are invalid based on the rules of sudoku.
1. I can click 'LOAD NEW' and see a visualization of another sudoku problem.
1. The Web app looks similar to the provided visual design.

## Submitting Your Work

Please send us an archive file of your entire challenge directory. In order to evaluate your challenge, we will run `npm test` and verify that all tests pass. Next we will run `npm start`, navigate to `http://localhost:3000` and verify that the Web page looks correct and functions properly.
