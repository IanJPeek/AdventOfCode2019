let { input } = require("./input");
input = input.split("\n");

let test = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;
test = test.split("\n")

let sanTest = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;
sanTest = sanTest.split("\n");


const planetInOrbitAroundLookup = (inputArr) => {
  const inOrbitAroundObj = {}

  for (let orbitPair of inputArr) {
    [orbitPlanet, orbiter] = orbitPair.split(")")

    if (!inOrbitAroundObj[orbiter]) {
      inOrbitAroundObj[orbiter] = [orbitPlanet];
    } else {
      inOrbitAroundObj[orbiter].push(orbitPlanet);
    }

  }
  return inOrbitAroundObj
}
const inOrbitAroundObj = planetInOrbitAroundLookup(input)
console.log("planets orbit lookup:", inOrbitAroundObj)

const orbitChainMaker = (inOrbitAroundObj) => {
  const orbitChainObj = {}

  for (let planet in inOrbitAroundObj){
    let orbitsArr = []
    let orbitee = inOrbitAroundObj[planet] 
    
    while (inOrbitAroundObj[orbitee]){
      orbitsArr.push(orbitee)
      orbitee = inOrbitAroundObj[orbitee]; 
    }
    orbitsArr.push(["COM"])
    orbitsArr.push(orbitsArr.length)
    orbitChainObj[planet] = orbitsArr
    orbitsArr = []
  }
  return orbitChainObj
}
const orbitChainObj = orbitChainMaker(inOrbitAroundObj)
// console.log("orbitChainObj", orbitChainObj)

const orbitTotaller = (orbitChainObj) => {
  let orbitTotal = 0

  for (let orbitPlanet in orbitChainObj){
    const lookupChainArr = orbitChainObj[orbitPlanet]
    const orbitCount = lookupChainArr.pop()
    orbitTotal = orbitTotal + orbitCount
  }

  return orbitTotal
}
const orbitTotal = orbitTotaller(orbitChainObj)
console.log("orbitTotal", orbitTotal)    // PT. 1 ANSWER = 117672

// PT. 2
const youChain = orbitChainObj["YOU"];
const sanChain = orbitChainObj["SAN"];
console.log("YOU:", youChain);
console.log("SAN:", sanChain);

const transferArr = []

for (let planet of youChain) {
  if (!sanChain.includes(planet)){
    transferArr.push(planet)
  }
}

for (let planet of sanChain) {
  if (!youChain.includes(planet)){
    transferArr.push(planet)
  }
}
console.log("transfers", transferArr, transferArr.length)
// PT. 2 Answer 283 - 6 (6 from - chainNumber, "COM", sharedplanet = 3 duplicates x 2) = 277 - CORRECT!!

