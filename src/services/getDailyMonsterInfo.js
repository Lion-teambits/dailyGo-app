export const getDailyMonsterInfo = (finishChallenge) => {
  let monsterStatus = "sad";
  const date = new Date().getDate();
  const lastDigit = date % 10;

  if (finishChallenge) {
    monsterStatus = "happy";
  }

  switch (lastDigit % 3) {
    case 0:
      if (finishChallenge) {
        return {
          monsterName: "Lag",
          monsterImage: require("../../assets/images/dailyMonsters/Lag-happy.png"),
        };
      }
      return {
        monsterName: "Lag",
        // monsterImage: require("../../assets/images/dailyMonsters/Lag-sad.png"),
        monsterImage: require("../../assets/images/dailyMonsters/Lazzzy-happy.gif"),
      };
    case 1:
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

    case 2:
      if (finishChallenge) {
        return {
          monsterName: "Lazzzy",
          monsterImage: require("../../assets/images/dailyMonsters/Lazzzy-happy.gif"),
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
