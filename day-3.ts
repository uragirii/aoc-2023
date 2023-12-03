import { lineInput } from "./utils";

const isNumeric = (str: string) => !isNaN(parseFloat(str));

const isSymbol = (str: string) => str !== "." && !isNumeric(str);

const getNumberAroundX = (x: number, line: string) => {
  let startPos = x;
  let endPos = x;
  while (isNumeric(line[startPos])) {
    startPos--;
  }
  while (isNumeric(line[endPos])) {
    endPos++;
  }
  return {
    num: parseInt(line.substring(startPos + 1, endPos)),
    startX: startPos + 1,
    endPos: endPos - 1,
  };
};

(async () => {
  const input = await lineInput(3);
  // part 1
  // const symbolLocations = input.map((line) => {
  //   const locations: number[] = [];
  //   for (let i = 0; i < line.length; i++) {
  //     const char = line[i];
  //     if (isSymbol(char)) {
  //       locations.push(i);
  //     }
  //   }
  //   return locations;
  // });

  // const validNums = input.map((line, index) => {
  //   let num = "";
  //   const valid: number[] = [];
  //   for (let i = 0; i < line.length; i++) {
  //     const char = line[i];
  //     if (isNumeric(char)) {
  //       num += char;
  //     } else if (num) {
  //       // complete the number;
  //       const startPos = i - num.length - 1;
  //       const endPos = i;
  //       for (let j = startPos; j <= endPos; ++j) {
  //         if (
  //           symbolLocations[index - 1]?.includes(j) ||
  //           symbolLocations[index].includes(j) ||
  //           symbolLocations[index + 1]?.includes(j)
  //         ) {
  //           valid.push(parseInt(num, 10));
  //         }
  //       }
  //       num = "";
  //     }

  //     if (i === line.length - 1 && num) {
  //       const startPos = i - num.length - 1;
  //       const endPos = i;
  //       for (let j = startPos; j <= endPos; ++j) {
  //         if (
  //           symbolLocations[index - 1]?.includes(j) ||
  //           symbolLocations[index].includes(j) ||
  //           symbolLocations[index + 1]?.includes(j)
  //         ) {
  //           valid.push(parseInt(num, 10));
  //         }
  //       }
  //     }
  //   }
  //   return valid;
  // });
  // console.log(validNums.flat().reduce((prev, curr) => prev + curr));

  // part 2
  const gears = input.map((line, y) => {
    const ratios: number[] = [];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "*") {
        // check if only two nos are adjanct
        const adjacentChars = [
          { char: input[y - 1][x - 1], y: y - 1, x: x - 1 },
          { char: input[y - 1][x], y: y - 1, x: x },
          { char: input[y - 1][x + 1], y: y - 1, x: x + 1 },
          { char: input[y][x - 1], y: y, x: x - 1 },
          { char: input[y][x + 1], y: y, x: x + 1 },
          { char: input[y + 1][x - 1], y: y + 1, x: x - 1 },
          { char: input[y + 1][x], y: y + 1, x: x },
          { char: input[y + 1][x + 1], y: y + 1, x: x + 1 },
        ];
        const adjancentDigits = adjacentChars.filter(({ char }) =>
          isNumeric(char)
        );

        // gears
        const nums = adjancentDigits.map(({ x, y }) =>
          getNumberAroundX(x, input[y])
        );
        const map: Record<string, boolean> = {};
        const uniqueDigits = nums.filter(({ num, startX, endPos }) => {
          if (map[`${num}_${startX}_${endPos}`]) {
            return false;
          } else {
            map[`${num}_${startX}_${endPos}`] = true;
            return true;
          }
        });
        if (uniqueDigits.length === 2) {
          ratios.push(uniqueDigits[0].num * uniqueDigits[1].num);
        }

        // ratios.push(nums[0].num * nums[1].num);
      }
    }
    return ratios;
  });
  console.log(gears.flat().reduce((prev, curr) => prev + curr, 0));
})();
