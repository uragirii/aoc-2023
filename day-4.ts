import { lineInput } from "./utils";

(async () => {
  const rawInput = await lineInput(4);
  const input = rawInput
    .map((line) => line.split(":").pop()?.trim())
    .map((line) => line?.split("|"));

  const points = input.map((line) => {
    const [winningStr, myNumsStr] = line ?? [];
    const winingNums = winningStr
      .trim()
      .split(" ")
      .filter((val) => !!val)
      .map((val) => parseInt(val, 10));
    const myNums = myNumsStr
      .trim()
      .split(" ")
      .filter((val) => !!val)
      .map((val) => parseInt(val.trim(), 10));

    const earnedPts = winingNums.filter((num) => myNums.includes(num));

    // part 1
    // const pts = 2 ** (earnedPts.length - 1);

    // return pts === 0.5 ? 0 : pts;
    return earnedPts.length;
  });

  const cardCount = new Array(points.length).fill(1);

  points.forEach((val, index) => {
    const count = cardCount[index];
    for (let i = index; i <= index + val; ++i) {
      if (cardCount) {
        cardCount[i] += count;
      }
    }
  });

  console.log(
    cardCount.map((val) => val / 2).reduce((prev, curr) => prev + curr)
  );

  // console.log(points.reduce((prev, curr) => prev + curr));
})();
