import { updateChallenge } from "../api/challengeService";
import { fetchActivityData } from "../api/healthInfoAPI.ios";
import { retrieveUserInfo, updateUserInfo } from "../api/userService";

export const addStepsAndCheckProgress = async (
  challengeArray,
  step_difference
) => {
  // console.log("challengeArray", challengeArray);
  // console.log("step_difference", step_difference);
  // Retroeve ongoing event and coop challenges
  // Add steps to them
  let updatedAndCheckedChallenges = challengeArray.map((challenge) => {
    // Add steps to them
    challenge.current_steps += step_difference;
    // Check each challenge progress
    if (challenge.target_steps < challenge.current_steps) {
      // set true and display button to get rewards
      challenge.finish_challenge = true;
    }
    return challenge;
  });

  async function updateChallengeAsync(challenge) {
    updateChallenge(challenge._id, challenge);
  }

  async function updateChallengesAsync(array) {
    const updatePromises = array.map((object) => {
      return updateChallengeAsync(object);
    });

    await Promise.all(updatePromises);

    return;
  }

  const result = await updateChallengesAsync(updatedAndCheckedChallenges);

  // return current status of all challenges (evnet & coop challenge)
  return result;
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
  // console.log("calculateStreakDaysAndReward: ", returnObj);
  return returnObj;
};
