import { getInput } from "./utils";

function gcd(a: number, b: number) {
  for (let temp = b; b !== 0; ) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
}

function lcmFunction(a: number, b: number) {
  const gcdValue = gcd(a, b);
  return (a * b) / gcdValue;
}

const lcmMultiple = (list: number[]) => {
  return list.reduce((acc, curr) => lcmFunction(acc, curr), 1);
};

const COORD_MAP: Record<string, { L: string; R: string }> = {};

const getSteps = (ins: string, startPos: string) => {};

(async () => {
  const rawInput = await getInput(8);

  const [ins, coords] = rawInput.split("\n\n");

  coords.split("\n").forEach((coord) => {
    const [pos, rest] = coord.split(" = ");
    const [left, right] = rest.split(",");

    COORD_MAP[pos] = {
      L: left.substring(1),
      R: right.substring(1, right.length - 1),
    };
  });

  // Part 1

  // let currPos = "AAA";

  // let steps = 0;
  // while (currPos !== "ZZZ") {
  //   const direction = ins[steps % ins.length] as "L" | "R";

  //   currPos = COORD_MAP[currPos][direction];
  //   steps++;
  // }
  // console.log(steps);

  // Part 2
  const aPos = Object.keys(COORD_MAP).filter((cood) => cood.endsWith("A"));

  const periods: number[] = [];
  aPos.forEach((pos, index) => {
    let steps = 0;
    let currPos = pos;
    while (!currPos.endsWith("Z")) {
      const direction = ins[steps % ins.length] as "L" | "R";
      currPos = COORD_MAP[currPos][direction];
      steps++;
    }
    periods[index] = steps;
  });

  // ans is lcm of periods
  console.log(lcmMultiple(periods));
})();
