let { input } = require("./input.js");
let { sampler, totaller } = require("../utils/utils");
input = input.split("\n");
input = input.map(numString => Number(numString));

// DAY 1 PART 1

/* 
At the first Go / No Go poll, every Elf is Go until the Fuel Counter-Upper. They haven't determined the amount of fuel required yet.
Fuel required to launch a given module is based on its mass. Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.

For example:
For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
For a mass of 1969, the fuel required is 654.
For a mass of 100756, the fuel required is 33583. 
*/
let testArr = [12, 14, 1969, 100756];

const convert = (num, div = 3, sub = 2, cutoff = 6) => {
  if (num > cutoff) {
    num = Math.floor(num / div) - sub;
  }
  return num;
};

const massConverter = massArr => {
  let fuelArr = [];
  for (let mass of massArr) {
    fuelArr.push(convert(mass));
  }
  return fuelArr;
};
const fuelArr = massConverter(input);
// console.log("fuelArr", fuelArr);
const total = totaller(fuelArr);
console.log("total", total);    // ANSWER = 3416712


// DAY 1 PART 2
/* 
A module of mass 14 requires 2 fuel. This fuel requires no further fuel (2 divided by 3 and rounded down is 0, which would call for a negative fuel), so the total fuel required is still just 2.
At first, a module of mass 1969 requires 654 fuel. Then, this fuel requires 216 more fuel (654 / 3 - 2). 216 then requires 70 more fuel, which requires 21 fuel, which requires 5 fuel, which requires no further fuel. So, the total fuel required for a module of mass 1969 is 654 + 216 + 70 + 21 + 5 = 966.
The fuel required by a module of mass 100756 and its fuel is: 33583 + 11192 + 3728 + 1240 + 411 + 135 + 43 + 12 + 2 = 50346.
*/
const testMass1 = 1969
const testMass2 = 100756

const recursiveFueller = (fueledArr, divider = 3, subtractor = 2) => {
  const fullFuelArr = [];
  const cutOff = subtractor * divider;

  for (let fuelNum of fueledArr) {
    while (fuelNum > cutOff) {
      fullFuelArr.push(fuelNum);
      fuelNum = convert(fuelNum, divider, subtractor, cutOff);
    }
    fullFuelArr.push(fuelNum);
  }
  return fullFuelArr;
};
const fullFuelArr = recursiveFueller(fuelArr);
// console.log("fullFuelArr", fullFuelArr);
const recursiveTotal = totaller(fullFuelArr);
console.log("recursiveTotal", recursiveTotal);
// ANSWER = 5122170
