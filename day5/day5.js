let { input } = require("./input");
let { sampler} = require("../utils/utils");

input = input.split(",");
input = input.map(numString => Number(numString));

const onlyInput = 1;
const egArr = [3, 0, 4, 0, 99];
// commands [[3, 0], [4,0], [99]]
// (3, 0) => "3" takes onlyInput "1" & saves it to position 0 => egArr becomes [0, 0, 4, 0, 99]
// (4, 0) => "4" outputs value at position 0 (now 0)
// (99) => exits program (output was 0)

const testArr = [1002, 4, 3, 4, 33];
const negArr = [1101, 100, -1, 4, 0];
const sample = sampler(input, 20)
// commands [[1002, 4, 3, 4], [33]]
// first command updates second arr [[1002, 4, 3, 4], [99]]
// program finishes on 2nd instruct


let pointer = 0;

const opCodeParserV2 = numArr => {
  let copyArr = [...numArr];
  console.log("startArr", numArr);

  let opCodesAndParamsArr = [];
  let commandArr = [];
  let arrLimit = numArr.length - 1;

  while (pointer <= arrLimit) {
    
    let opCode = copyArr[pointer];

    // check (first) value has not been updated in original array
    if (opCode != numArr[pointer]) {
      opCode == numArr[pointer];
    }

    let instructNum_lastDigit = opCode.toString()[
      Number(opCode.toString().length) - 1
    ];
    instructNum_lastDigit = Number(instructNum_lastDigit);
    console.log("\nfull opCode", opCode, "lastDigit", instructNum_lastDigit);

    // HANDLE 3 or 4 - input / output (two nos / one param)
    if (instructNum_lastDigit === 3 || instructNum_lastDigit === 4) {
      console.log("capturing opcode + 1 param (pointer + 2)");

      if (instructNum_lastDigit === 3) {
        const inputSavePosition = numArr[pointer + 1]
        console.log(`Saving INPUT at position ${inputSavePosition}`)
        numArr[inputSavePosition] = onlyInput
      }
      if (instructNum_lastDigit === 4) {
        const outputValuePosition = numArr[pointer + 1]
        const outputValue = numArr[outputValuePosition] 
        console.log(`OUTPUTTING value at position ${outputValuePosition}:-  ${outputValue}`);
      }
      commandArr.push(instructNum_lastDigit, numArr[pointer + 1]);
      opCodesAndParamsArr.push(commandArr);
      commandArr = [];
      pointer = pointer + 2;

      console.log("array after input/ output", numArr)

      // HANDLE 1 or 2 - input / output (two nos / one param)
    } else if (instructNum_lastDigit === 1 || instructNum_lastDigit === 2) {
      console.log("capturing opcode + 3 params (pointer + 4)");
      commandArr.push(opCode);

      let paramInstructionNums = opCode.toString().slice(0, -2);
      let hundreds = Number(paramInstructionNums.slice(-1));
      let thousands = Number(paramInstructionNums.slice(-2, -1)) || 0;
      let tenThousands = Number(paramInstructionNums.slice(-3, -2)) || 0;

      console.log("hundreds", hundreds);
      console.log("thousands", thousands);
      console.log("tenThousands", tenThousands);

      let hundredsVal;
      if (hundreds == 0) {
        let lookUp = numArr[pointer + 1];
        hundredsVal = numArr[lookUp];
        commandArr.push(lookUp);
      } else if (hundreds == 1) {
        hundredsVal = numArr[pointer + 1];
        commandArr.push(numArr[pointer + 1]);
      }
      console.log("\nhundreds value", hundredsVal);

      let thousandsVal;
      if (thousands == 0) {
        let lookUp = numArr[pointer + 2];
        thousandsVal = numArr[lookUp];
        commandArr.push(lookUp);
      } else if (thousands == 1) {
        thousandsVal = numArr[pointer + 2];
        commandArr.push(numArr[pointer + 2]);
      }
      console.log("thousands value", thousandsVal);


      if (tenThousands == 0 || tenThousands == 1) {
        let lookUp = numArr[pointer + 3];
        console.log("tenThousands lookup", lookUp);

        if (instructNum_lastDigit === 2) {
          let multiValue = hundredsVal * thousandsVal;
          console.log("multiValue:", multiValue);
          numArr[lookUp] = multiValue;
          console.log("newly written", numArr);
        } else if (instructNum_lastDigit === 1) {
          let addValue = hundredsVal + thousandsVal;
          numArr[lookUp] = addValue;
        }

        commandArr.push(lookUp);
      }
     
      opCodesAndParamsArr.push(commandArr);
      commandArr = [];
      pointer = pointer + 4;

      // opCode = numArr[pointer];
      copyArr = [...numArr];
    } else if (instructNum_lastDigit === 9) {
      console.log("value 99 - finishing");
      opCodesAndParamsArr.push([99]);
      
      // pointer = pointer + 1;
      // (Update with high value to force-finish while loop...)
      pointer = pointer + 1000;

    }
    console.log("pointer value", pointer);
    console.log("opCode & params Arr", opCodesAndParamsArr);

  }
  // opCodesAndParamsArr.push(commandArr)
  console.log(opCodesAndParamsArr);
};
opCodeParserV2(input);

// Pt. 1 answer - Final output value (at position 223) : 4601506



