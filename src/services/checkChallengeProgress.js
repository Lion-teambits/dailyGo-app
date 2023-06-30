import {
  retrieveChallengeInfo,
  retrieveChallengeProgresses,
  retrieveChallenges,
  updateChallenge,
} from "../api/challengeProgressService";
import {
  retrieveDailyRecord,
  updateDailyRecord,
} from "../api/dailyRecordService";
import { retrieveUserInfo, updateUserInfo } from "../api/userService";

export const checkDailyChallengeProgress = async (user_id) => {
  const userInfo = await retrieveUserInfo(user_id);
  const dailyRecord = await retrieveDailyRecord(userInfo.today_record);

  // check challenge status
  // if (userInfo.daily_goal_status === "ongoing") {
  if (userInfo.daily_goal_status === 3) {
    return { dailyRecord: dailyRecord, reward: null };
  } else if (userInfo.daily_goal_status === 2) {
    const rewardObj = await calculateStreakDaysAndReward(user_id);

    return { dailyRecord: dailyRecord, reward: rewardObj };
  } else {
    let challengeStatus = dailyRecord.steps > userInfo.preferred_daily_mode;
    if (challengeStatus) {
      const rewardObj = await calculateStreakDaysAndReward(user_id);
      const updatedUserInfo = await updateUserInfo(user_id, {
        daily_goal_status: 2,
      });
      const updatedDailyRecord = await updateDailyRecord(dailyRecord._id, {
        streak_status: "continue",
      });
      return { dailyRecord: updatedDailyRecord, reward: rewardObj };
    }
  }
};

export const checkEventAndCoopChallengeProgress = async (user_id) => {
  const challengeProgressObj = await retrieveChallengeProgresses(user_id);

  // challengeObj contains {
  //   eventChallenges: eventChallengeArray,
  //   coopChallenges: groupChallengeArray,
  // };

  // [TODO: Retrieve Challenge info (for target_steps)]

  // check challenge status
  // [TODO: Compare target_steps and current_steps
};

// Not achieved daily challenge
export const resetStreakOrUseHeart = async (user_id, todayRecord) => {
  const userInfo = await retrieveUserInfo(user_id);

  let totalStreakDays = userInfo.streak_days;
  let totalHearts = userInfo.hearts;
  let streakStatus = todayRecord.streak_status;

  // If user has hearts, keep streak days. Otherwise, reset streak days.
  if (totalHearts > 0) {
    totalHearts--;
    streakStatus = "skip";
    // checking to desiners if streak days stays or increase instead of the consumed heart
  } else {
    totalStreakDays = 0;
    streakStatus = "stop";
  }

  const updatedUserInfo = {
    ...userInfo,
    streak_days: totalStreakDays,
    hearts: totalHearts,
    finish_daily_goal: 1,
    // finish_daily_goal: "ongoing", // need to check with Jay
  };

  try {
    const resUpdatedUserInfo = await updateUserInfo(
      userInfo.uid,
      updatedUserInfo
    );
    // Update daily record
    const resDailyRecord = await updateDailyRecord(todayRecord._id, {
      streak_status: streakStatus,
    });
  } catch (error) {
    console.log("Error in resetStreakOrUseHeart");
    throw error;
  }
};

export const calculateStreakDaysAndReward = async (user_id) => {
  let returnObj = {
    dailyGoalStatus: 2,
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
  returnObj.streakDays = ++totalStreakDays;

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
  return returnObj;
};
