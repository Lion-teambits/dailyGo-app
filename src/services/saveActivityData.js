import { fetchActivityData } from "../api/healthInfoAPI";
import { retrieveUserInfo, updateUserInfo } from "../api/userService";
import {
  createDailyRecord,
  retrieveDailyRecord,
  updateDailyRecord,
} from "../api/dailyRecordService";
import {
  calculateStreakDaysAndReward,
  resetStreakOrUseHeart,
} from "./checkChallengeProgress";
import { retrieveChallengeProgresses } from "../api/challengeProgressService";

// Fetch activity data & update database
async function saveActivityData(user_id) {
  try {
    // Fetch activity data
    const activityData = await fetchActivityData();

    // Retrieve user data from database
    const userInfo = await retrieveUserInfo(user_id);
    const todayRecord = await retrieveDailyRecord(userInfo.today_record);

    // Check if there is daily record which has the same date
    const isExistingRecord = todayRecord.date === activityData.date;
    console.log("isExistingRecord: ",isExistingRecord);
    // if today_record contains the same day daily_record id, update the data in DB, else create new record & update today_record and past_records in user info
    if (isExistingRecord) {
      // Calculated the difference of steps here
      // and apply it to event & coop challenge
      const differenceOfSteps = activityData.steps - todayRecord.steps;
      const differenceOfDistance = activityData.distance - todayRecord.distance;
      const differenceOfCalories = activityData.calories - todayRecord.calories;

      // Update Event and Group Challenge
      const responseUpdatedChallengeProgresses =
        await updateEventAndGroupChallengeProgresses(
          user_id,
          differenceOfSteps,
          differenceOfDistance,
          differenceOfCalories
        );

      // Update daily record
      await updateDailyRecord(todayRecord._id, activityData);
    } else {
      // Check to see if user have received the previous day's rewards
      // if they didn't received them, add them to DB
      if (userInfo.daily_goal_status === "ready") {
        const rewardObj = await calculateStreakDaysAndReward(user_id);
        await updateUserInfo(userInfo.uid, {
          fireflies: userInfo.fireflies + rewardObj.firefliesToday,
          hearts: userInfo.hearts + rewardObj.heartToday,
          streak_days: userInfo.streak_days + 1,
        });
      } else if (userInfo.daily_goal_status === "ongoing") {
        // Previous day, daily challenge was not achieved, update streak/heart, finish_daily_goal
        await resetStreakOrUseHeart(user_id, todayRecord);
      }

      // Create new record
      await createDailyRecordAndUpdateFields(user_id, activityData);

      // Update All Challenge progress
      const responseUpdatedChallengeProgresses =
        await updateEventAndGroupChallengeProgresses(
          user_id,
          activityData.steps,
          activityData.distance,
          activityData.calories
        );
    }
    return;
  } catch (error) {
    console.error(
      "An error occurred while saving activity data in database: ",
      error
    );
  }
}

export default saveActivityData;

// Create a new daily record and update user info in DB
export const createDailyRecordAndUpdateFields = async (
  user_id,
  activityData
) => {
  try {
    // Create a new daily_record
    const newDailyRecord = await createDailyRecord(activityData, user_id);
    // Dummy to stop creating new daily_record (for testing)
    // const newDailyRecord = {
    //   _id: "649e5581d0f20a8448e3095a",
    //   uid: "sushilove",
    //   date: "2023-06-29T07:00:00.000Z",
    //   steps: 4856,
    //   distance: 3271.07,
    //   calories: 124.04,
    //   streak_status: "continued",
    // };

    // Update today_record id in userInfo
    const userInfo = await retrieveUserInfo(user_id);
    const updatedTodayRecordId = newDailyRecord._id;
    // Update user info
    const updatedUserInfo = {
      ...userInfo,
      today_record: updatedTodayRecordId,
    };
    const result = await updateUserInfo(userInfo.uid, updatedUserInfo);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateEventAndGroupChallengeProgresses = async (
  user_id,
  differenceOfSteps,
  differenceOfDistance,
  differenceOfCalories
) => {
  // Retrieve ongoing event and coop challenges

  const ChallengeProgresses = await retrieveChallengeProgresses(user_id);

  // Add activity data
  const asyncAddActivityData = async (
    challenge,
    differenceOfSteps,
    differenceOfDistance,
    differenceOfCalories
  ) => {
    let challengeObj = {
      current_steps: challenge.current_steps + differenceOfSteps,
      current_calories: challenge.current_calories + differenceOfCalories,
      current_distance: challenge.current_distance + differenceOfDistance,
    };

    return challengeObj;
  };

  // Add steps to Event Challenge progress
  const updateChallengeProgress = async (challengeArray) => {
    const updatedChallengeProgress = await Promise.all(
      challengeArray.map(async (challenge) => {
        return await asyncAddActivityData(
          challenge,
          differenceOfSteps,
          differenceOfDistance,
          differenceOfCalories
        );
      })
    );
    return updatedChallengeProgress;
  };
  const updatedEventChallengeProgress = await updateChallengeProgress(
    ChallengeProgresses.eventChallenges
  );
  const updatedCoopChallengeProgress = await updateChallengeProgress(
    ChallengeProgresses.coopChallenges
  );

  return {
    eventChallenges: updatedEventChallengeProgress,
    coopChallenges: updatedCoopChallengeProgress,
  };
};
