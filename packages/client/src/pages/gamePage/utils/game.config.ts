export const GameConfig = {
  general: {
    width: 1600,
    background: 'green',
  },
  level: {
    initialSpeed: 3,
    amountIncrease: 1,
  },
  roadside: {
    trees: 16,
    treeDistance: 90,
    width: 570,
    buildings: 10,
    buildingsDistance: 60,
    lights: 8,
    lightDistance: 190,
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
    pointsLossOnPuddle: 100,
    oil: 'oil',
    puddle: 'puddle',
  },
};
