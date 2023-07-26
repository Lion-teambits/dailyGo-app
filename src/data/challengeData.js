import {
  IMAGE_MONSTER_FROGGY,
  IMAGE_MONSTER_MARATHON,
  IMAGE_MONSTER_PINATA,
  IMAGE_MONSTER_TAKOYAKI,
} from "../constants/imagePaths";

export const challenges = [
  {
    _id: 1,
    start_date: "2023-06-01",
    expired_date: "2023-08-31",
    title: "Summer Jam",
    monster_name: "Summer Jam",
    monster_desc: "Warm, sun and monsters.",
    monster_image: require("../../assets/images/monsters/SummerJam.png"),
    target_steps: 30000,
    badge_info: "7",
  },
  {
    _id: 2,
    start_date: "2023-06-01",
    expired_date: "2023-08-31",
    title: "Water, Melon, Sugar",
    monster_name: "Water melone",
    monster_desc: "That's right - high!",
    monster_image: require("../../assets/images/monsters/WaterMelone.png"),
    target_steps: 30000,
    badge_info: "7",
  },
  {
    _id: 3,
    start_date: "2023-09-01",
    expired_date: "2023-09-30",
    title: "Wizards United",
    monster_name: "Trickster",
    monster_desc: "You're wizard, monster!",
    monster_image: require("../../assets/images/monsters/Trickster.png"),
    target_steps: 30000,
    badge_info: "7",
  },
  // Add more challenges...
];

export const groupChallengeMosters = [
  {
    title: "Froggy",
    source: IMAGE_MONSTER_FROGGY,
    steps: 5000,
  },
  {
    title: "Takoyaki",
    source: IMAGE_MONSTER_TAKOYAKI,
    steps: 15000,
  },
  {
    title: "Piñata",
    source: IMAGE_MONSTER_PINATA,
    steps: 25000,
  },
  {
    title: "Marathon",
    source: IMAGE_MONSTER_MARATHON,
    steps: 35000,
  },
];

export const GROUP_CHALLENGE_BADGE_INFO = "6";
