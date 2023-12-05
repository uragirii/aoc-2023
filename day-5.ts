import { getInput, lineInput } from "./utils";

type Mapping = {
  sourceStart: number;
  sourceEnd: number;
  destStart: number;
  destEnd: number;
};

const parseMap = (mapStr: string): Mapping[] => {
  const [_, ...lines] = mapStr.split("\n");
  return lines.map((line) => {
    const [dest, source, len] = line
      .trim()
      .split(" ")
      .map((val) => parseInt(val));

    return {
      sourceStart: source,
      sourceEnd: source + len - 1,
      destStart: dest,
      destEnd: dest + len - 1,
    };
  });
};

const nextCategoryFromMap = (seed: number, mapping: Mapping) => {
  const diff = seed - mapping.sourceStart;
  return mapping.destStart + diff;
};

const getNextCategoryFromMap = (seeds: number[], mappings: Mapping[]) => {
  // const mappings = parseMap(mapStr);

  return seeds.map((seed) => {
    for (let index = 0; index < mappings.length; index++) {
      const { sourceStart, sourceEnd } = mappings[index];
      if (seed >= sourceStart && seed <= sourceEnd) {
        return nextCategoryFromMap(seed, mappings[index]);
      }
    }
    return seed;
  });
};

const CHUNK_SIZE = 10000;

const getMinLocation = (seeds: number[], mapping: Mapping[][]) => {
  // Chunk it
  let minLocation = Infinity;
  for (let i = 0; i < seeds.length; i += CHUNK_SIZE) {
    // console.log(
    //   `\t From ${i} to ${i + CHUNK_SIZE} (total : ${(
    //     (i * 100) /
    //     seeds.length
    //   ).toFixed(2)})`
    // );
    const seedsChunk = seeds.slice(i, i + CHUNK_SIZE);

    minLocation = Math.min(
      minLocation,
      ...mapping.reduce(
        (prev, curr) => getNextCategoryFromMap(prev, curr),
        seedsChunk
      )
    );
  }

  return minLocation;
};

(async () => {
  const rawInput = await getInput(5);
  const [seedsStr, ...mapsStr] = rawInput.split("\n\n");

  const seeds =
    seedsStr
      .split(":")
      .pop()
      ?.trim()
      .split(" ")
      .map((val) => parseInt(val, 10)) ?? [];

  const mappings = mapsStr.map(parseMap);

  // const part1 = getMinLocation(seeds,mappings);

  // Part 2
  // too lazy to optimize
  console.log("Solving for seeds", seeds);
  let minLocation: number = Infinity;
  for (let index = 0; index < seeds.length - 1; index += 2) {
    const [start, len] = [seeds[index], seeds[index + 1]];

    console.log(
      `Preparing ${index / 2} for len ${len} (${(
        (start + len) /
        2 ** 32
      ).toFixed(4)}) Min Location : ${minLocation}`
    );
    const seedStart = performance.now();

    const SEED_CHUNK = CHUNK_SIZE * 100;
    const chunkPercent = (SEED_CHUNK / len) * 100;
    for (let chunkIdx = 0; chunkIdx < len; chunkIdx += SEED_CHUNK) {
      const newSeeds = new Array(SEED_CHUNK)
        .fill(() => 1)
        .map((_, index) => start + chunkIdx + index + SEED_CHUNK);

      const startTime = performance.now();
      minLocation = Math.min(minLocation, getMinLocation(newSeeds, mappings));
      const endTime = performance.now();
      const time = endTime - startTime;
      const percent = (chunkIdx / len) * 100;
      const remaining = (100 - percent) / chunkPercent;

      const remainingTime = (remaining * time) / 1000;

      console.log(
        `\tSeed chunk for ${index} ${percent.toFixed(2)}% in ${time.toFixed(
          3
        )}ms estimated completion in ${remainingTime.toFixed(1)}s`
      );
    }

    const seedEnd = performance.now();
    const seedTime = (seedEnd - seedStart) / 1000 / 60;

    console.log(`${index / 2} done in ${seedTime.toFixed(2)}min`);
  }
  console.log(minLocation);
})();
