// DAY 4 PART 1 - check a range of numbers => how many options ( 1) have adjacent nums & 2) never descend)

const input = "197487-673251";
const range = input.split("-");
let [lowerLimit, upperLimit] = range;
const passesBothConditionsArr = [];


// PT.1 solution func
// const checkForAdjacentsInNum = numberString => {
//   if (
//     numberString[0] == numberString[1] ||
//     numberString[1] == numberString[2] ||
//     numberString[2] == numberString[3] ||
//     numberString[3] == numberString[4] ||
//     numberString[4] == numberString[5]
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// };

// PT 2 - v2 checks number after (or before) a pair does not also match with the pair
const checkForAdjacentsInNumv2 = numberString => {
  if (
    (numberString[0] == numberString[1] &&
      numberString[1] != numberString[2]) ||
    (numberString[1] == numberString[2] &&
      numberString[2] != numberString[3] &&
      numberString[0] != numberString[1]) ||
    (numberString[2] == numberString[3] &&
      numberString[3] != numberString[4] &&
      numberString[1] != numberString[2]) ||
    (numberString[3] == numberString[4] &&
      numberString[4] != numberString[5] &&
      numberString[2] != numberString[3]) ||
    (numberString[4] == numberString[5] && numberString[4] != numberString[3])
  ) {
    return true;
  } else {
    return false;
  }
};
// 3 test checks & 4th edge case 
// console.log(checkForAdjacentsInNumv2("112233"));
// console.log(checkForAdjacentsInNumv2("123444"));
// console.log(checkForAdjacentsInNumv2("111122"))
// console.log(checkForAdjacentsInNumv2("111234"));

const checkNeverDescending = numberString => {
  if (
    numberString[0] <= numberString[1] &&
    numberString[1] <= numberString[2] &&
    numberString[2] <= numberString[3] &&
    numberString[3] <= numberString[4] &&
    numberString[4] <= numberString[5]
  ) {
    return true;
  } else {
    return false;
  }
};

const passesConditions = numberString => {
  return (
    checkForAdjacentsInNumv2(numberString) && checkNeverDescending(numberString)
  );
};

const checkRangeAgainstCriteria = (lowBoundString, highBoundString) => {
  for (let i = Number(lowBoundString); i < Number(highBoundString); i++) {
    passesConditions(i.toString()) ? passesBothConditionsArr.push(i) : null;
  }
};
checkRangeAgainstCriteria(lowerLimit, upperLimit);

console.log(
  "Numbers in range satisfying both conditions:",
  passesBothConditionsArr.length
);
// Ans : 1640    

// DAY 4 PART 2 - extra condition - adjacent numbers must not be in a group larger than two

// 1491 - too high
// ...check num before, as well as aft? 
// Answer is 1126 