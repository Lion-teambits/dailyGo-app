import { fetchActivityData } from "../api/healthInfoAPI.ios";
import { retrieveUserInfo, updateUserInfo } from "../api/userService";

async function checkEventAndCoopChallengeAchievement(user_id, step_difference) {
  // Fetch current activity data
  const activityData = await fetchActivityData();

  // Retrieve daily challenge goal (could be Recoil)
  const userInfo = await retrieveUserInfo();

  // Event challenge
  // Coop challenge
  // Retrieve ongoing event challenge
  // Check challenge achievement

  // return current status of all challenges (daily challenge, evnet challenge, coop challenge)
  return;
}

// Handle daily challenge achievement
// Achieved daily challenge
export const increaseStreakDays = async (user_id) => {
  const userInfo = await retrieveUserInfo(user_id);

  let totalStreakDays = userInfo.streak_days;
  let totalFireFlies = userInfo.fireflies;

  // Increase streak_days
  totalStreakDays++;

  // Add fireflies depends on streak days
  if (totalStreakDays <= 3) {
    totalFireFlies++;
  } else if (totalStreakDays <= 6) {
    totalFireFlies = totalFireFlies + 2;
  } else {
    totalFireFlies = totalFireFlies + 3;
  }

  // Increase Hearts if necessary
  let totalHearts = userInfo.hearts;
  if (totalHearts < 3 && totalStreakDays > 7) {
    totalHearts++;
  }

  const updatedUserInfo = {
    ...userInfo,
    streak_days: totalStreakDays,
    fireflies: totalFireFlies,
    hearts: totalHearts,
    finish_daily_goal: true,
  };

  try {
    const result = await updateUserInfo(userInfo, updatedUserInfo);
    return result.data;
  } catch (error) {
    console.log("Error in increaseStreakDays");
    throw error;
  }
};

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
