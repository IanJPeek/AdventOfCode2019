let { input } = require("./input");
input = input.split(",");
input = input.map(numString => Number(numString));
// before running the program, replace position 1 with the value 12 and replace position 2 with the value 2. What value is left at position 0 after the program halts?
let copyArr = [...input];

let replacer1 = 12;
let replacer2 = 2;
input[1] = replacer1;
input[2] = replacer2;
// console.log("modified original", input)
// console.log("copy", copyArr);
// console.log("input", input);

// DAY 5 PART 1
const testArr = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]; //
const test2 = [1, 0, 0, 0, 99]; // becomes 2,0,0,0,99 (1 + 1 = 2).
const test3 = [2, 3, 0, 3, 99]; // becomes 2,3,0,6,99 (3 * 2 = 6).
const test4 = [2, 4, 4, 5, 99, 0]; // becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
const test5 = [1, 1, 1, 4, 99, 5, 6, 0, 99]; // becomes 30,1,1,4,2,5,6,0,99.
// console.log("testArr", input);

const opCodeParser = numArr => {
  let opCodesArr = [];
  let opArr = [];

  for (let num in numArr) {
    opArr.push(numArr[num]);
    if (num % 4 === 3) {
      opCodesArr.push(opArr);
      opArr = [];
    }
  }

  // push final "remainder" array (if exists)
  if (opArr.length > 0) {
    opCodesArr.push(opArr);
  }

  return opCodesArr;
};
const opCodesArr = opCodeParser(input);
// console.log("opCodesArr", opCodesArr, "\n");

const opCodeRunner = (opCodesArr, srcArr) => {
  let opCodeIndex = 0;

  for (let opCodeArr of opCodesArr) {
    let [program, input1, input2, writeIndex] = opCodeArr;
    input1 = srcArr[input1];
    input2 = srcArr[input2];

    // (BUG-FIX) check parsed version of program has not been replaced in srcArr, overwrite if so
    let programCheck = srcArr[opCodeIndex * 4];
    // console.log("program", program, "programCheck", programCheck)
    if (program !== programCheck) {
      program = programCheck;
    }

    if (program === 1) {
      newResult = input1 + input2;
      srcArr[writeIndex] = newResult;
      opCodeIndex++;
    } else if (program === 2) {
      newResult = input1 * input2;
      srcArr[writeIndex] = newResult;
      opCodeIndex++;
    } else if (program === 99) {
      // console.log("finishing with:", srcArr)
      return srcArr;
    }
  }
};
const adjustedArr = opCodeRunner(opCodesArr, input);
let output = adjustedArr[0];
console.log(`\n Position 0 (ANSWER) = ${output}`);

// DAY 2 PART 2

const target = 19690720;
replacer1 = 0;
replacer2 = 0;

while (output !== target) {
  let tryArr = [...copyArr];
  if (replacer1 < 100) {
    tryArr[1] = replacer1;
    tryArr[2] = replacer2;
    const tryCodesArr = opCodeParser(tryArr);
    const adjustedArr = opCodeRunner(tryCodesArr, tryArr);
    output = adjustedArr[0];
    // console.log("output", output);
    replacer1++;
  } else {
    replacer1 = 0;
    replacer2++;
  }
}
console.log(`Input pair are ${replacer1 - 1} and ${replacer2}`); // ANS 41 and 12
// 4112 = correct ANS
