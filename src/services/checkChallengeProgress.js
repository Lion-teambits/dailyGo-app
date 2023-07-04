import {
  retrieveChallengeProgresses,
  updateChallengeProgress,
} from "../api/challengeProgressService";
import {
  retrieveDailyRecord,
  updateDailyRecord,
} from "../api/dailyRecordService";
import { retrieveGroupChallengeInfo } from "../api/groupChallengeService";
import { retrieveUserInfo, updateUserInfo } from "../api/userService";
import { challenges } from "../data/challengeData";
import { calculateTimeLeft } from "./calculateLeftTime";

export const checkDailyChallengeProgress = async (user_id) => {
  const userInfo = await retrieveUserInfo(user_id);
  const dailyRecord = await retrieveDailyRecord(userInfo.today_record);

  // Calculate time left
  const endTime = new Date();
  endTime.setHours(23, 59, 0, 0);
  const timeLeft = calculateTimeLeft(endTime);

  // check challenge status
  // if (userInfo.daily_goal_status === "ongoing") {
  if (userInfo.daily_goal_status === 3) {
    return { activityData: dailyRecord, reward: null, timeLeft: timeLeft };
  } else if (userInfo.daily_goal_status === 2) {
    const rewardObj = await calculateStreakDaysAndReward(user_id);

    return {
      activityData: dailyRecord,
      reward: rewardObj,
      timeLeft: timeLeft,
    };
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
      return {
        activityData: updatedDailyRecord,
        reward: rewardObj,
        timeLeft: timeLeft,
      };
    }
    return {
      activityData: dailyRecord,
      reward: null,
      timeLeft: timeLeft,
    };
  }
};

export const checkEventChallengeProgress = async (user_id) => {
  // Retrieve challenge progress objects
  const eventChallengeProgressObjArr = await retrieveChallengeProgresses(
    user_id,
    "event"
  );
  // Remove achieved challenge progress
  const filteredEventChallengeProgress = eventChallengeProgressObjArr.filter(
    (challengeProgress) => {
      return challengeProgress.finish_challenge === false;
    }
  );

  // Compare target_steps and current_steps, and add challenge info to each challengeObj
  const updatedProgressArray = await Promise.all(
    filteredEventChallengeProgress.map(async (challengeProgress) => {
      const challengeInfo = challenges.find(
        (challenge) => challenge._id == challengeProgress.event_challenge_info
      );
      // Achieved challenge, change finish_challenge to true
      if (challengeInfo.target_steps < challengeProgress.current_steps) {
        await updateChallengeProgress(challengeProgress._id, {
          finish_challenge: true,
        });
      }
      return { ...challengeProgress, challengeInfo: challengeInfo };
    })
  );

  return updatedProgressArray;
};

export const checkGroupChallengeProgress = async (user_id) => {
  const groupChallengeProgressObjArr = await retrieveChallengeProgresses(
    user_id,
    "group"
  );

  // Remove achieved challenge progress
  const filteredEventChallengeProgress = groupChallengeProgressObjArr.filter(
    (challengeProgress) => {
      return challengeProgress.finish_challenge === false;
    }
  );

  // Compare target_steps and current_steps, and add challenge info to each challengeObj
  Promise.all(
    filteredEventChallengeProgress.map(async (challengeProgress) => {
      const groupChallengeInfo = await retrieveGroupChallengeInfo(
        challengeProgress.group_challenge_info
      );

      // Achieved challenge, change finish_challenge to true
      if (
        groupChallengeInfo.target_steps < groupChallengeInfo.group_current_steps
      ) {
        await updateChallengeProgress(challengeProgress._id, {
          finish_challenge: true,
        });
      }
      return { ...challengeProgress, challengeInfo: groupChallengeInfo };
    })
  ).then((updatedProgressArray) => {
    return updatedProgressArray;
  });
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
    daily_goal_status: 1,
    // daily_goal_status: "ongoing", // need to check with Jay
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
