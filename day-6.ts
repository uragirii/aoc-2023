// i really wanted to solve this using quad equation
// but the input is very small imo
// maybe part 2 will convice me

// const time = [47, 98, 66, 98];
// const distance = [400, 1213, 1011, 1540];

const time = [47986698];
const distance = [400121310111540];

const getWayToWin = (time: number, distance: number) => {
  const ways: number[] = [];
  for (let t = 1; t < time; t++) {
    const travelledD = t * (time - t);
    if (travelledD > distance) {
      ways.push(t);
    }
  }
  return ways;
};

const beatenNo = time.map((t, i) => getWayToWin(t, distance[i]).length);

console.log(beatenNo.reduce((acc, curr) => acc * curr));
