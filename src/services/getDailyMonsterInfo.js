export const getDailyMonsterInfo = (finishChallenge) => {
  let monsterStatus = "sad";
  const date = new Date().getDate();
  const lastDigit = date % 10;

  if (finishChallenge) {
    monsterStatus = "happy";
  }

  switch (lastDigit) {
    case 1:
    case 4:
    case 7:
      if (finishChallenge) {
        return {
          monsterName: "Lag",
          monsterImage: require("../../assets/images/dailyMonsters/Lag-happy.png"),
        };
      }
      return {
        monsterName: "Lag",
        monsterImage: require("../../assets/images/dailyMonsters/Lag-sad.png"),
      };
    case 2:
    case 5:
    case 8:
      if (finishChallenge) {
        return {
          monsterName: "Lava",
          monsterImage: require("../../assets/images/dailyMonsters/Lava-happy.png"),
        };
      }
      return {
        monsterName: "Lava",
        monsterImage: require("../../assets/images/dailyMonsters/Lava-sad.png"),
      };

    case 3:
    case 6:
    case 9:
    case 0:
      if (finishChallenge) {
        return {
          monsterName: "Lazzzy",
          monsterImage: require("../../assets/images/dailyMonsters/Lazzzy-happy.png"),
        };
      }
      return {
        monsterName: "Lazzzy",
        monsterImage: require("../../assets/images/dailyMonsters/Lazzzy-sad.png"),
      };

    default:
      return null;
  }
};
