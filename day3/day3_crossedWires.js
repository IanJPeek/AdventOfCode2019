let { input, test1, test2, test3 } = require("./input");

test1 = test1.split("\n"); // 3,3 => 6  // pt2 30 steps
test2 = test2.split("\n"); // 159  // pt2 610 steps
test3 = test3.split("\n"); // 135  // pt2 410 steps
input = input.split("\n");

// DAY 3 PART 1 - Manhattan Distance of two crossed wires

const centralCoord = [0, 0];
const wire1Coords = [];
const wire2Coords = []
wire1Coords.push(centralCoord);
wire2Coords.push(centralCoord);
let startCoord = [...centralCoord];
const crossedWires = []
let runningTotal = 0

const parseInstruct = (wireInstructString, wirepathArr) => {
  const direction = wireInstructString[0];
  const distance = Number(wireInstructString.slice(1));
  let counter = 0

  switch (direction) {
    case "R":
      while (counter < distance) {
      counter++
      runningTotal = runningTotal + 1;
      startCoord[0] = startCoord[0] + 1 ;
      wirepathArr.push([...startCoord].concat([runningTotal]));
      // console.log("R to ", startCoord);
      }
      break;
    case "L":
      while (counter < distance) {
      counter++
      runningTotal = runningTotal + 1;
      startCoord[0] = startCoord[0] - 1 ;
      wirepathArr.push([...startCoord].concat([runningTotal]));
      // console.log("L to ", startCoord);
      }
      break;
    case "U":
      while (counter < distance) {
      counter++
      runningTotal = runningTotal + 1;
      startCoord[1] = startCoord[1] + 1;
      wirepathArr.push([...startCoord].concat([runningTotal]));
      // console.log("U to ", startCoord);
      }
      break;
    case "D":
      while (counter < distance) {
        counter++;
        runningTotal = runningTotal + 1;
        startCoord[1] = startCoord[1] - 1;
        wirepathArr.push([...startCoord].concat([runningTotal]));
        // console.log("D to ", startCoord);
      }
      break;
    default:
      console.log("Default switch case triggered");
  }
};

const plotWires = wireInstructArr => {
  let [wirepath1, wirepath2] = wireInstructArr;
  wirepath1 = wirepath1.split(",");
  wirepath2 = wirepath2.split(",");

  wirepath1.map(instruction => parseInstruct(instruction, wire1Coords));
  startCoord = [...centralCoord]
  runningTotal = 0
  wirepath2.map(instruction => parseInstruct(instruction, wire2Coords));
};
plotWires(input);
// console.log("\n", "wire1: ", wire1Coords);
// console.log("\n", "wire2: ", wire2Coords);

const checkCrossedWires = (wire1path, wire2path) => {

  for (let coord of wire2path){
    let crossArray = wire1path.filter(wire1Coord => wire1Coord[0] == coord[0] && wire1Coord[1] == coord[1]).flat()
    if (crossArray.length>0){crossedWires.push(crossArray.concat([coord[2]]))}
  }
  return crossedWires
}
checkCrossedWires(wire1Coords, wire2Coords)
console.log("Crossed wires", crossedWires)

const getManhattanDistance = coordArr => {
  totals = []
  for (let coord of coordArr) {
    const total = Math.abs(coord[0]) + Math.abs(coord[1]);
    if (total != 0){totals.push(total)}
  }
  console.log("Manhattan Distances", totals)
  return Math.min(...totals)
}
const manDis = getManhattanDistance(crossedWires)
console.log ("Shortest Manhattan Dist:", manDis) // Ans = 221 (takes a few mins to run...)

// DAY 3 PART 2 - Find wire distances to intersections, use shortest
// Added runningTotal value into wirepathArr

const getShortestWireCross = coordArr => {
  totals = []
  for (let coord of coordArr) {
    const total = coord[2] + coord[3]
    // console.log(total)
    if (total > 0 ) {totals.push(total)}
  }
  console.log("Wire lengths", totals);
  return Math.min(...totals)
}
const shortWire = getShortestWireCross(crossedWires)
console.log("Shortest wire:", shortWire);  // answer 18542