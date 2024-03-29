import { retrieveUserInfo, updateUserInfo } from "../api/userService";
import { calculateStreakDaysAndReward } from "./checkChallengeProgress";

const receiveReward = async (user_id) => {
  const userInfo = await retrieveUserInfo(user_id);
  const rewardObj = await calculateStreakDaysAndReward(user_id);
  await updateUserInfo(userInfo.uid, {
    fireflies: userInfo.fireflies + rewardObj.firefliesToday,
    hearts: userInfo.hearts + rewardObj.heartToday,
    streak_days: userInfo.streak_days + 1,
    daily_goal_status: 3
  });
  console.log("Reward received into user collection");

  const updatedUserInfo = await retrieveUserInfo(user_id);
  return updatedUserInfo;
};

export default receiveReward;
