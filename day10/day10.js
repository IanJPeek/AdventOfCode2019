const {test1, larger1, larger2, larger3, xLarge, input} = require("./input")

const mapSplitter = mapString => {
  const coordinateLookup = {};
  const xLines = mapString.split("\n");

  for (let i = 0; i < xLines.length; i++) {
    coordinateLookup[`${i}`] = xLines[i];
  }

  return coordinateLookup;
};
const coordinateLookup = mapSplitter(input);


const asteroidLocator = lookup => {
  const xyLookup = {};
  const roidArray = [];

  for (let line in lookup) {
    const xLine = lookup[line];
  
    for (let space in xLine) {
      const char = xLine[space];
      xyCoord = `(${space}, ${line})`;
      xyLookup[xyCoord] = char;
      if (char === "#") {
        roidArray.push([space, line]);
      }
    }
  }
  return roidArray;
};
const roidArray = asteroidLocator(coordinateLookup);
// console.log("asteroid positions:" , roidArray);


const roidDistanceCalculator = (roidArray) => {
  let maxRoidsNumViewable = 0
  
  for (let roid in roidArray){
    const currentRoid = roidArray[roid]
    const [currentX, currentY] = currentRoid
    const directionCheckLookUp = {
      NW: [],
      NE: [],
      SE: [],
      SW: []
    };
    // for pt.2
    const directionCheckLookUpWithCoords = {
      NW: [],
      NE: [],
      SE: [],
      SW: []
    };
    
    // get all other asteroids
    const otherRoids = roidArray.filter(asteroid => asteroid !== currentRoid)
    
    // establish relative position to currentRoid (find relative position, then direction + line gradient)
    const otherGrads = []
    const gradsAndCoordsLookup = {}

    for (let roid in otherRoids){
      const currentOtherRoid = otherRoids[roid]
      const [xPos, yPos] = currentOtherRoid
      const xDif = xPos - currentX // - xPos  // DETERMINE xDir from +/ -
      const yDif = yPos - currentY // - yPos  // DETERMINE yDir from +/ -
      // const xyDif = [xDif, yDif]

      // establish relative DIRECTION to currentRoid (REMEMBER S/ N reversed as 0 in Top-left corner of grid...)
      let xDirection, yDirection
      xDif < 0 ? xDirection = "W" : xDirection = "E"
      yDif < 0 ? yDirection = "N" : yDirection = "S";
      const direction = `${yDirection}${xDirection}`
      // console.log(`diff from ${currentRoid} for ${currentOtherRoid} = ${xyDif}`)
      
      // find line gradients associated with relative roid positions! 
      // ... be careful not to exclude non-duplicate "mirror" gradients... eg (1/ -2) vs (-1/ 2) - add directions to solve
      const otherGrad = yDif / xDif

      // check against other grads in same direction...
      if (!directionCheckLookUp[direction].includes(otherGrad)) {
        directionCheckLookUp[direction].push(otherGrad); 
        directionCheckLookUpWithCoords[direction].push(`${otherGrad}__${xPos},${yPos}`); 
        otherGrads.push(otherGrad);
        gradsAndCoordsLookup[`${direction}${otherGrad}`] = {x: xPos, y: yPos}
      }
    }

    // PT 1 ANSWER - output asteroid with most other roids viewable
    const otherRoidsViewable = otherGrads.length
    if (otherRoidsViewable > maxRoidsNumViewable) {
      // console.log(`new max roids viewable is ${otherRoidsViewable} for: ${currentRoid}`)
      maxRoidsNumViewable = otherRoidsViewable
    }

    // PT. 2 - logic to laser asteroids from optimum viewing roid (37, 25) - from pt.1
    // Total length of NE, SE, SW, NW arrays to determine where asteroid 200 is (of 319 viewable)
    if (currentRoid == "37,25"){
  // console.log(
  //   "NE numbers:",
  //   directionCheckLookUp.NE.length,
  //   directionCheckLookUpWithCoords.NE
  //   directionCheckLookUp.NE.sort(),
  //   directionCheckLookUpWithCoords.NE.sort()
  //     );
  // console.log(
  //   "SE numbers:",
  //   directionCheckLookUp.SE.length,
  //   // directionCheckLookUpWithCoords.SE,
  //   directionCheckLookUp.SE.sort()
  // );
  // console.log(
  //   "SW numbers:",
  //   directionCheckLookUp.SW.length,
  //   // directionCheckLookUp.SW,
  //   directionCheckLookUp.SW.sort()
  // );
  console.log(
    "NW numbers:",
    directionCheckLookUp.NW.length,
    // directionCheckLookUp.NW,
    // directionCheckLookUp.NW.sort()
    )
  console.log("32", directionCheckLookUp.NW[32])
  console.log(
    "0.2727272727272727 - 32",
    gradsAndCoordsLookup["NW0.2727272727272727"]
  );
  // (4, 16) // RIGHT ANSWER
    }
  }
}
roidDistanceCalculator(roidArray) // pt.1 309 for (37, 25) is correct

// Pt 2 - 416 for (4, 16) - 200th asteroid (32nd in NW)

