import { fetchActivityData } from "../api/healthInfoAPI";
import { retrieveUserInfo, updateUserInfo } from "../api/userService";
import {
  createDailyRecord,
  retrieveDailyRecord,
  updateDailyRecord,
} from "../api/dailyRecordService";
import {
  increaseStreakDays,
  resetStreakOrUseHeart,
} from "./checkChallengeAchievement";

// Fetch activity data & update database
async function saveActivityDataToDatabase(user_id) {
  try {
    // Fetch activity data
    const activityData = await fetchActivityData();

    // Retrieve user data from database
    const userInfo = await retrieveUserInfo(user_id);
    const todayRecord = await retrieveDailyRecord(userInfo.today_record);

    // Check if there is daily record which has the same date
    const isExistingRecord = todayRecord.date === activityData.date;
    // if today_record contains the same day daily_record id, update the data in DB, else create new record & update today_record and past_records in user info
    if (isExistingRecord) {
      //
      // Can be calculated the difference of steps here
      // and apply it to event & coop challenge
      // addStepsToChallenges(challengeArr, today_record.steps - activityData.steps)
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
    if (
      !userInfo.finish_daily_goal &&
      userInfo.daily_mode < activityData.steps
    ) {
      // handle fireflies, streak days, hearts, finish_daily_goal
      console.log("Woo hoo!!! Daily Challenge achieved!!!!!");
      await increaseStreakDays(user_id);
      //
      // [Todo: Rena] Trigger Success Modal
      //
    }

    console.log("Finish updating database");
    return await retrieveUserInfo(user_id);
  } catch (error) {
    console.error(
      "An error occurred while saving activity data in database: ",
      error
    );
  }
}

export default saveActivityDataToDatabase;

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
