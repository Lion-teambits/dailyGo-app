export const getDailyMonsterInfo = (finishChallenge) => {
  const date = new Date().getDate();
  const lastDigit = date % 10;

  switch (lastDigit % 3) {
    case 0:
      if (finishChallenge) {
        return {
          monsterName: "Lag",
          monsterImage: require("../../assets/images/animatedMonsters/Lag-happy.json"),
        };
      }
      return {
        monsterName: "Lag",
        monsterImage: require("../../assets/images/animatedMonsters/Lag-sad.json"),
      };
    case 1:
      if (finishChallenge) {
        return {
          monsterName: "Lava",
          monsterImage: require("../../assets/images/animatedMonsters/Lava-happy.json"),
        };
      }
      return {
        monsterName: "Lava",
        monsterImage: require("../../assets/images/animatedMonsters/Lava-sad.json"),
      };

    case 2:
      if (finishChallenge) {
        return {
          monsterName: "Lazzzy",
          monsterImage: require("../../assets/images/animatedMonsters/Lazzzy-happy.json"),
        };
      }
      return {
        monsterName: "Lazzzy",
        monsterImage: require("../../assets/images/animatedMonsters/Lazzzy-sad.json"),
      };
    default:
      return null;
  }
};

export const getMonsterImg = (monster_name) => {
  switch (monster_name) {
    case "Froggy":
      return {
        monsterImage: require("../../assets/images/animatedMonsters/Froggy.json"),
      };
    case "Marathon":
      return {
        monsterImage: require("../../assets/images/animatedMonsters/Marathon.json"),
      };
    case "Piñata":
      return {
        monsterImage: require("../../assets/images/animatedMonsters/Piñata.json"),
      };
    case "SummerJam":
      return {
        monsterImage: require("../../assets/images/animatedMonsters/SummerJam.json"),
      };
    case "Takoyaki":
      return {
        monsterImage: require("../../assets/images/animatedMonsters/Takoyaki.json"),
      };
    case "Trickster":
      return {
        monsterImage: require("../../assets/images/animatedMonsters/Trickster.json"),
      };
    case "Water melone":
      return {
        monsterImage: require("../../assets/images/animatedMonsters/Watermelone.json"),
      };
    default:
      return {
        monsterImage: require("../../assets/images/animatedMonsters/Watermelone.json"),
      };
  }
};
