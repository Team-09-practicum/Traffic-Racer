export const GameConfig = {
  general: {
    width: 800,
    background: 'green',
  },
  level: {
    initialSpeed: 3,
    amountIncrease: 1,
  },
  roadside: {
    trees: 10,
    treeDistance: 60,
    width: 170,
  },
  collision: {
    nearDistanceX: 20,
    nearDistanceY: 100,
    minCloseDistance: 40,
  },
  scenario: {
    numberOfLanes: 4,
    lanesSize: 120,
  },
  traffic: {
    minCarSpeed: 0.3,
    maxCarSpeed: 0.8,
    cars: 5,
    carHeight: 100,
    carWidth: 100,
  },
  player: {
    carType: 0,
  },
  obstacle: {
    pointsLossOnPuddle: 1000,
    puddle: 1,
    oil: 2,
  },
};
