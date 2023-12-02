import { lineInput } from "./utils";

const processInput = (line: string) => {
  const games = line.split(":").pop()?.trim();
  return games?.split(";").map((game) =>
    game.split(",").reduce((prev, curr) => {
      const trimmed = curr.trim();
      const [num, color] = trimmed.split(" ");
      prev[color.trim()] = parseInt(num, 10);
      return prev;
    }, {} as Record<string, number>)
  );
};

const getMaxCubes = (games: Record<string, number>[]) => {
  const maxCubes: Record<string, number> = {};
  for (const game of games) {
    Object.keys(game).forEach((color) => {
      const gameCube = game[color];

      if (!maxCubes[color]) {
        maxCubes[color] = gameCube;
      }
      const maxCube = maxCubes[color];
      if (maxCube < gameCube) {
        maxCubes[color] = gameCube;
      }
    });
  }
  return maxCubes;
};

const red = 12;
const green = 13;
const blue = 14;

(async () => {
  const rawInput = await lineInput(2);

  // assume game no is i+1

  const input = rawInput.map(processInput) as Record<string, number>[][];
  const maxCubes = input.map(getMaxCubes);
  // Part One
  const validGames = maxCubes.map((cubes, index) => {
    if (
      cubes["red"] <= red &&
      cubes["green"] <= green &&
      cubes["blue"] <= blue
    ) {
      return index + 1;
    } else {
      return 0;
    }
  });
  console.log(
    "Part1",
    validGames.reduce((prev, curr) => prev + curr)
  );
  // Part 2
  const powers = maxCubes.map((maxCube) => {
    return Object.values(maxCube).reduce((prev, curr) => prev * curr);
  });

  console.log(
    "Part2",
    powers.reduce((prev, curr) => prev + curr)
  );
})();
