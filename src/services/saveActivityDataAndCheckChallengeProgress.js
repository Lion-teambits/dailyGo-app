import { fetchActivityData } from "../api/healthInfoAPI";
import { retrieveUserInfo, updateUserInfo } from "../api/userService";
import {
  createDailyRecord,
  retrieveDailyRecord,
  updateDailyRecord,
} from "../api/dailyRecordService";
import {
  addStepsAndCheckProgress,
  calculateStreakDaysAndReward,
  increaseStreakDays,
  resetStreakOrUseHeart,
} from "./checkChallengeAchievement";
import { retrieveChallenges } from "../api/challengeService";

// Fetch activity data & update database
async function saveActivityDataAndCheckChallengeProgress(user_id) {
  let dailyChallenge = {
    achieved: false,
    daily_goal: 0,
    streakDays: 0,
    firefliesToday: 0,
    heartToday: 0,
    firefliesTmr: 0,
    heartTmr: 0,
    activityData: {},
    type: 0,
  };

  try {
    // Fetch activity data
    const activityData = await fetchActivityData();

    // Retrieve user data from database
    const userInfo = await retrieveUserInfo(user_id);
    const todayRecord = await retrieveDailyRecord(userInfo.today_record);

    const challngesArray = await retrieveChallenges(userInfo);

    // Check if there is daily record which has the same date
    const isExistingRecord = todayRecord.date === activityData.date;
    // if today_record contains the same day daily_record id, update the data in DB, else create new record & update today_record and past_records in user info
    if (isExistingRecord) {
      //
      // Can be calculated the difference of steps here
      // and apply it to event & coop challenge
      const differenceOfSteps = activityData.steps - todayRecord.steps;
      const responseChallenges = await addStepsAndCheckProgress(
        challngesArray,
        differenceOfSteps
      );
      //

      // Update daily record
      await updateDailyRecord(todayRecord._id, activityData);
    } else {
      // Create new record
      await createDailyRecordAndUpdateFields(user_id, activityData);

      //
      // Can be calculated the difference of steps here
      // and apply it to event & coop challenge
      // addStepsToChallenges(challengeArr, activityData.steps)
      //

      // Previous day, daily challenge was not achieved, update streak/heart, finish_daily_goal
      await resetStreakOrUseHeart(user_id);
    }

    // If daily challenge achieved
    if (userInfo.daily_mode < activityData.steps) {
      console.log(
        "Woo hoo!!! Daily Challenge achieved!!! It's time to receive rewards!!"
      );

      if (!userInfo.finish_daily_goal) {
        const streakDaysAndReward = await calculateStreakDaysAndReward(user_id);
        dailyChallenge = {
          ...dailyChallenge,
          ...streakDaysAndReward,
          activityData: activityData,
          daily_goal: userInfo.daily_mode,
        };
        // console.log("achieved & updated dailyChallenge: ", dailyChallenge);
        return {
          dailyChallenge: dailyChallenge,
          eventAndCoopChallenge: challngesArray,
        };
      }
    }

    // Return activity data and progress of daily challenge
    dailyChallenge = { ...dailyChallenge, activityData: activityData };
    // console.log("updated dailyChallenge: ", dailyChallenge);
    console.log("Finish updating daily record");
    return {
      dailyChallenge: dailyChallenge,
      eventAndCoopChallenge: challngesArray,
    };
  } catch (error) {
    console.error(
      "An error occurred while saving activity data in database: ",
      error
    );
  }
}

export default saveActivityDataAndCheckChallengeProgress;

// Create a new daily record and update user info in DB
export const createDailyRecordAndUpdateFields = async (
  user_id,
  activityData
) => {
  try {
    // Create a new daily_record
    const newDailyRecord = await createDailyRecord(activityData);
    // Dummy to stop creating new daily_record (for testing)
    // const newDailyRecord = {
    //   _id: "6494b7ada5266d995f0b4688",
    //   date: "2023-06-22T07:00:00.000+00:00",
    //   steps: 3039,
    //   distance: 2274.92,
    //   calories: 87.93,
    // };

    // Push old today_record into past_records array
    // Retrieve userInfo
    const userReseponse = await retrieveUserInfo(user_id);
    // Updated past_records array
    const updatedPastRecordArray = [
      ...userReseponse.past_records,
      userReseponse.today_record,
    ];
    // Update today_record id in userInfo (Clear an old value and Add a new value)
    const updatedTodayRecordId = newDailyRecord._id;
    // Update user info
    const updatedUserInfo = {
      ...userReseponse,
      today_record: updatedTodayRecordId,
      past_records: updatedPastRecordArray,
    };
    const result = await updateUserInfo(userReseponse, updatedUserInfo);
    // Return user new daily record (temporay)
    return newDailyRecord;
  } catch (error) {
    throw error;
  }
};
