import { lineInput } from "./utils";

const isNumeric = (str: string) => !isNaN(parseFloat(str));

const getFirstAndLastNum = (str: string) => {
  // solving using two pointers
  const len = str.length;
  let start: number | null = null;
  let end: number | null = null;
  for (let i = 0; i < len; ++i) {
    const startIdx = i;
    const endIdx = len - i - 1;
    if (start === null && isNumeric(str[startIdx])) {
      start = parseInt(str[startIdx], 10);
    }
    if (end === null && isNumeric(str[endIdx])) {
      end = parseInt(str[endIdx], 10);
    }
    if (start !== null && end !== null) {
      break;
    }
  }
  if (start === null || end === null) {
    throw new Error(`No ans: "${str}", start=${start};end=${end}`);
  }
  return start * 10 + end;
};

const NUM_TO_DIGIT = {
  one: "o1ne",
  two: "t2wo",
  three: "t3hree",
  four: "f4our",
  five: "f5ive",
  six: "s6ix",
  seven: "s7even",
  eight: "e8ight",
  nine: "n9ine",
};

const VALID_NUMS: (keyof typeof NUM_TO_DIGIT)[] = [
  "eight",
  "two",
  "one",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "nine",
];

const replaceWithDigits = (str: string) => {
  let replacedStr = str;
  VALID_NUMS.forEach((num) => {
    replacedStr = replacedStr.replaceAll(num, `${NUM_TO_DIGIT[num]}`);
  });

  return replacedStr;
};

(async () => {
  const input = await lineInput(1);
  console.log(`Loaded input lines ${input.length}`);
  const numbers = input.map(replaceWithDigits).map(getFirstAndLastNum);
  console.log(numbers.reduce((prev, curr) => prev + curr));
})();
