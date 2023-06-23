import { fetchActivityData } from "../api/healthInfoAPI.ios";
import { retrieveUserInfo, updateUserInfo } from "../api/userService";

async function checkEventAndCoopChallengeAchievement(user_id, step_difference) {
  // Retroeve ongoing event and coop challenges
  // Add steps to them
  // Check each challenge progress

  // If steps achieves target_steps
  // set true and display button to get rewards

  // return current status of all challenges (evnet & coop challenge)
  return;
}

// Not achieved daily challenge
export const resetStreakOrUseHeart = async (user_id) => {
  const userInfo = await retrieveUserInfo(user_id);

  let totalStreakDays = userInfo.streak_days;
  let totalHearts = userInfo.hearts;

  // If user has hearts, keep streak days. Otherwise, reset streak days.
  if (totalHearts > 0) {
    totalHearts--;
    // checking to desiners if streak days stays or increase instead of the consumed heart
  } else {
    totalStreakDays = 0;
  }

  const updatedUserInfo = {
    ...userInfo,
    streak_days: totalStreakDays,
    hearts: totalHearts,
    finish_daily_goal: false,
  };

  try {
    const result = await updateUserInfo(userInfo, updatedUserInfo);
    return result.data;
  } catch (error) {
    console.log("Error in resetStreakOrUseHeart");
    throw error;
  }
};

export const calculateStreakDaysAndReward = async (user_id) => {
  let returnObj = {
    achieved: true,
    streakDays: 0,
    firefliesToday: 0,
    firefliesTmr: 0,
    heartToday: 0,
    heartTmr: 0,
  };

  const userInfo = await retrieveUserInfo(user_id);

  let totalStreakDays = userInfo.streak_days;
  let totalFireFlies = userInfo.fireflies;

  // Increase streak_days
  totalStreakDays++;
  returnObj.streakDays = totalStreakDays;

  // Add fireflies depends on streak days
  if (totalStreakDays <= 3) {
    totalFireFlies++;
    returnObj.firefliesToday = 1;
    returnObj.firefliesTmr = 1;
  } else if (totalStreakDays <= 6) {
    totalFireFlies = totalFireFlies + 2;
    returnObj.firefliesToday = 2;
  } else {
    totalFireFlies = totalFireFlies + 3;
    returnObj.firefliesToday = 3;
  }

  // Increase Hearts if necessary
  let totalHearts = userInfo.hearts;
  if (totalHearts < 3 && totalStreakDays > 7) {
    totalHearts++;
    returnObj.heartToday = 1;
    returnObj.heartTmr = 1;
    if (totalHearts == 3) {
      returnObj.heartTmr = 0;
    }
  }
  console.log("calculateStreakDaysAndReward: ", returnObj);
  return returnObj;
};
