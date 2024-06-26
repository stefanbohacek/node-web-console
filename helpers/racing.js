/* The race is on! */
const allRacers = [
  "🚗",
  "🚙",
  "🚚",
  "🚜",
  "🚑",
  "🚌",
  "🚒",
  "🚁",
  "🚓",
  "🚲",
  "🚕",
  "🏍",
  "🚛",
  "🚐",
  "🚋",
  "🚎",
  "🏃‍♀️",
  "🛴",
  "🛵",
  "🛷",
];

const helpers = require.main.require("./helpers/helpers.js");

const delay = async (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, milliseconds);
  });
};

const getRacers = (options) => {
  const count = options.count || helpers.getRandomInt(3, 5);
  let racers = helpers.getRandomFromArray(allRacers, count);

  racers = racers.map((racer) => {
    return {
      vehicle: racer,
      speed: helpers.getRandomInt(1, 4),
      acceleration: helpers.getRandomRange(-0.2, 0.4, 1),
    };
  });

  return racers;
};

const findWinner = (racers, fullObject) => {
  let maxSpeed = 0,
    fastestRacer;
  racers.forEach((racer) => {
    if (racer.speed > maxSpeed) {
      maxSpeed = racer.speed;
      if (fullObject) {
        fastestRacer = racer;
      } else {
        fastestRacer = racer.vehicle;
      }
    }
  });

  return fastestRacer;
};

const findLastRacer = (racers) => {
  let minSpeed = 0,
    lastRacer;
  racers.forEach((racer) => {
    if (minSpeed === 0 || racer.speed > minSpeed) {
      minSpeed = racer.speed;
      lastRacer = racer;
    }
  });
  return lastRacer;
};

module.exports = {
  race: async (stream, options) => {
    const gridSize = options.gridSize || 50;

    let raceOptions = {};

    if (options && options.cars) {
      raceOptions.count = options.cars;
      if (raceOptions.count > allRacers.length) {
        raceOptions.count = allRacers.length;
      }
    }

    const racers = getRacers(raceOptions);
    const winner = findWinner(racers);
    const lastRacer = findLastRacer(racers);
    const lastRacerIndex = gridSize / lastRacer.speed;

    for (let i = 0; i < gridSize + 5; i += 1) {
      try {
        let racingGrid = `${helpers.symbols.PAGE_BREAK}\n`;

        racers.forEach((racer) => {
          let repeatCount = gridSize - i * racer.speed;
          if (repeatCount < 0) {
            repeatCount = 0;
          }
          racingGrid += `${" ".repeat(repeatCount)} ${racer.vehicle}\n`;
        });

        if (i >= lastRacerIndex || i >= gridSize) {
          racingGrid += `\n${winner}  won the race 🏁\n\n`;
        }
        if (!stream.destroyed) {
          stream.push(racingGrid);
        }
      } catch (err) {
        console.log(err);
        stream.push(null);
      }
      await delay(450);
    }
    stream.push(null);
  },
};
