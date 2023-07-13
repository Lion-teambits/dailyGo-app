import { fetchActivityData } from "../api/healthInfoAPI";
import { retrieveUserInfo, updateUserInfo } from "../api/userService";
import {
  createDailyRecord,
  retrieveDailyRecord,
  updateDailyRecord,
} from "../api/dailyRecordService";
import {
  resetStreakOrUseHeart,
} from "./checkChallengeProgress";
import {
  retrieveChallengeProgressInfo,
  updateChallengeProgress,
} from "../api/challengeProgressService";
import receiveReward from "./receiveReward";

// Fetch activity data & update database
async function saveActivityData(user_id) {
  try {
    // Fetch activity data
    const activityData = await fetchActivityData();

    const isActivityDataSame =
      previousActivityData && previousActivityData.steps === activityData.steps;

    if (isActivityDataSame) {
      console.log(
        "Activity data is the same as the previous one. Skipping processing...",
        activityData
      );
      return;
    }

    // Retrieve user data from database
    const userInfo = await retrieveUserInfo(user_id);
    const todayRecord = await retrieveDailyRecord(userInfo.today_record);

    // Check if there is daily record which has the same date
    const isExistingRecord = todayRecord.date === activityData.date;
    console.log("isExistingRecord: ", isExistingRecord);
    // if today_record contains the same day daily_record id, update the data in DB, else create new record & update today_record and past_records in user info
    if (isExistingRecord) {
      // Calculated the difference of steps here
      // and apply it to event & team challenge
      const differenceOfSteps =
        activityData.steps - todayRecord.steps > 0
          ? activityData.steps - todayRecord.steps
          : 0;
      const differenceOfDistance =
        activityData.distance - todayRecord.distance > 0
          ? activityData.distance - todayRecord.distance
          : 0;
      const differenceOfCalories =
        activityData.calories - todayRecord.calories > 0
          ? activityData.calories - todayRecord.calories
          : 0;

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
      if (userInfo.daily_goal_status === 2) {
        await receiveReward(user_id);
      } else if (userInfo.daily_goal_status === 1) {
        // Previous day, daily challenge was not achieved, update streak/heart, daily_goal_status
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

    previousActivityData = activityData;
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
    const newDailyRecord = await createDailyRecord(user_id, activityData);

    // Update today_record id in userInfo
    const userInfo = await retrieveUserInfo(user_id);
    const updatedTodayRecordId = newDailyRecord._id;
    // Update user info
    const updatedUserInfo = {
      ...userInfo,
      today_record: updatedTodayRecordId,
      daily_goal_status: 1,
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
  try {
    // Retrieve user info and event / team challenge progress ids array
    const userInfo = await retrieveUserInfo(user_id);
    const eventChallengeProgressIDs = userInfo.event_challenge_progress;
    const groupChallengeProgressIDs = userInfo.group_challenge_progress;

    const updateChallengeProgressArray = async (progressIDs) => {
      await Promise.all(
        progressIDs.map(async (challengeProgress_id) => {
          const challengeProgressData = await retrieveChallengeProgressInfo(
            challengeProgress_id
          );

          // Add activity data
          const newChallengeProgressData = {
            current_steps:
              challengeProgressData.current_steps + differenceOfSteps,
            current_calories:
              challengeProgressData.current_calories + differenceOfCalories,
            current_distance:
              challengeProgressData.current_distance + differenceOfDistance,
          };

          await updateChallengeProgress(
            challengeProgress_id,
            newChallengeProgressData
          );
        })
      );
    };

    await Promise.all([
      updateChallengeProgressArray(eventChallengeProgressIDs),
      updateChallengeProgressArray(groupChallengeProgressIDs),
    ]);

    console.log("Challenge progress values updated successfully");
  } catch (error) {
    console.log("Error in updateChallengeProgressValues:", error);
    throw error;
  }
};