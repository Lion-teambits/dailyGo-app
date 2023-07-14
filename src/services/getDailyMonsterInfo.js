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
          monsterImage: require("../../assets/images/animatedMonsters/LagHappy.gif"),
        };
      }
      return {
        monsterName: "Lag",
        monsterImage: require("../../assets/images/animatedMonsters/LagSad.gif"),
      };
    case 1:
      if (finishChallenge) {
        return {
          monsterName: "Lava",
          monsterImage: require("../../assets/images/animatedMonsters/LavaHappy.gif"),
        };
      }
      return {
        monsterName: "Lava",
        monsterImage: require("../../assets/images/animatedMonsters/LavaSad.gif"),
      };

    case 2:
      if (finishChallenge) {
        return {
          monsterName: "Lazzzy",
          monsterImage: require("../../assets/images/animatedMonsters/LazzzyHappy.gif"),
        };
      }
      return {
        monsterName: "Lazzzy",
        monsterImage: require("../../assets/images/animatedMonsters/LazzzySad.gif"),
      };
    default:
      return null;
  }
};
