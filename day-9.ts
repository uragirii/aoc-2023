import { lineInput } from "./utils";

const getExpolatedValue = (history: number[], extrapolateStart = false) => {
  const histories: number[][] = [history];
  while (
    histories.at(-1)?.filter((val) => val === 0).length !==
    histories.at(-1)?.length
  ) {
    const newHistory: number[] = [];
    const lastHistory = histories.at(-1);
    if (!lastHistory) {
      throw "no-history";
    }
    for (let index = 0; index < lastHistory?.length - 1; index++) {
      const curr = lastHistory[index];
      const next = lastHistory[index + 1];
      newHistory.push(next - curr);
    }
    histories.push(newHistory);
  }
  if (!extrapolateStart) {
    return histories.reverse().reduce((acc, curr) => {
      return acc + (curr.at(-1) ?? 0);
    }, 0);
  } else {
    return histories.reverse().reduce((acc, curr) => {
      return curr[0] - acc;
    }, 0);
  }
};

(async () => {
  const rawInput = await lineInput(9);
  const input = rawInput.map((line) =>
    line.split(" ").map((val) => parseInt(val, 10))
  );
  // Part 1
  // console.log(
  //   input
  //     .map((line) => getExpolatedValue(line, false))
  //     .reduce((acc, curr) => acc + curr)
  // );
  // Part 2
  console.log(
    input
      .map((line) => getExpolatedValue(line, true))
      .reduce((acc, curr) => acc + curr)
  );
})();
