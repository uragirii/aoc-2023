import { lineInput } from "./utils";

type HandType = "five" | "four" | "full" | "three" | "two" | "one" | "high";

const CARD_TO_VALUE = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
].reduce((acc, curr, index) => {
  acc[curr] = index;
  return acc;
}, {} as Record<string, number>);

const HAND_ORDER: HandType[] = [
  "five",
  "four",
  "full",
  "three",
  "two",
  "one",
  "high",
];

const getHandType = (hand: string): HandType => {
  const map: Record<string, number> = {};
  hand.split("").forEach((h) => {
    if (map[h]) {
      map[h]++;
    } else {
      map[h] = 1;
    }
  });

  let maxHand: string | null = null;
  Object.keys(map).forEach((key) => {
    if (key === "J") {
      return;
    }
    if (!maxHand) {
      maxHand = key;
    }
    if (map[key] > map[maxHand]) {
      maxHand = key;
    } else if (
      map[maxHand] == map[key] &&
      CARD_TO_VALUE[key] > CARD_TO_VALUE[maxHand]
    ) {
      maxHand = key;
    }
  });

  if (maxHand) map[maxHand] += map["J"];

  delete map["J"];

  const keys = Object.keys(map);
  if (keys.length === 1) {
    return "five";
  }
  if (keys.length === 2) {
    // can be four
    const [key1] = keys;
    if (map[key1] === 1 || map[key1] === 4) {
      return "four";
    }
    return "full";
  }

  if (keys.length === 3) {
    const [key1, key2, key3] = keys;
    if (map[key1] === 3 || map[key2] === 3 || map[key3] === 3) {
      return "three";
    }
    return "two";
  }

  if (keys.length === 4) {
    return "one";
  }

  if (keys.length === 5) {
    return "high";
  }
};

(async () => {
  const rawInput = await lineInput(7);
  const input = rawInput
    .map((line) => line.trim())
    .map((line) => {
      const [hand, bid] = line.split(" ");
      return {
        hand,
        bid: parseInt(bid, 10),
      };
    });
  const total = input.length;

  const handsGrouped = input.reduce((acc, curr) => {
    const type = getHandType(curr.hand);
    if (acc[type]) {
      acc[type].push(curr);
    } else {
      acc[type] = [curr];
    }

    return acc;
  }, {} as Record<HandType, { hand: string; bid: number }[]>);
  Object.keys(handsGrouped).forEach((key) => {
    handsGrouped[key as HandType].sort((a, b) => {
      for (let index = 0; index < a.hand.length; index++) {
        const aCard = a.hand[index];
        const bCard = b.hand[index];
        const aValue = CARD_TO_VALUE[aCard];
        const bValue = CARD_TO_VALUE[bCard];
        if (aValue !== bValue) {
          return bValue - aValue;
        }
      }
      return 1;
    });
  });

  const ordered = HAND_ORDER.reduce(
    (acc, curr) => (handsGrouped[curr] ? acc.concat(handsGrouped[curr]) : acc),
    [] as { hand: string; bid: number }[]
  );

  console.log(
    ordered
      .map(({ bid }, index) => bid * (total - index))
      .reduce((acc, curr) => acc + curr)
  );
})();
