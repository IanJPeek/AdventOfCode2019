// PROTOTYPE GRID UTILS

const make2dGrid = size => {
  let gridSpace = ".";
  let grid = [];

  for (let i = 0; i < size; i++) {
    let xRow = gridSpace.repeat(size);
    grid.push(xRow);
  }
  return grid;
};
const grid = make2dGrid(5);
// console.log("gridArr", grid);

const make2dGridObj = size => {
  const gridObj = {};
  const gridArr = make2dGrid(size);
  for (let i = 0; i < size; i++) {
    gridObj[i] = gridArr[i];
  }
  return gridObj;
};
const gridObj = make2dGridObj(10);
// console.log("gridObj", gridObj);

const displayGrid = gridArr => {
  for (let row of gridArr) {
    console.log(row);
  }
};
// console.log("\n" + "gridDisplay (from gridArr):");
// displayGrid(grid);

const displayGridObj = gridObj => {
  for (let row in gridObj) {
    console.log(gridObj[row]);
  }
};
// console.log("\n" + "gridObjDisplay:");
// displayGridObj(gridObj);
