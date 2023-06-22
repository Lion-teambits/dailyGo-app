import { fetchActivityData } from "../api/healthInfoAPI";
import {
  retrieveUserInfo,
  updateDailyChallengeStatus,
  updateUserInfo,
} from "../api/userService";
import {
  createDailyRecord,
  retrieveDailyRecord,
  updateDailyRecord,
} from "../api/dailyRecordService";

// Fetch activity data & update database
async function updateDatabase(user_id) {
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
      // Update daily record
      await updateDailyRecord(todayRecord._id, activityData);
    } else {
      // Create new record
      const newDailyRecord = await createDailyRecordAndUpdateFields(
        userInfo,
        activityData
      );
      // Update today_record value to new daily_record id in local (reduce accessing to DB)
      userInfo.today_record = newDailyRecord._id;
      // Change daily challenge status to false
      await updateDailyChallengeStatus(userInfo._id, false);
    }

    console.log("Finish updating database");
    return await retrieveUserInfo(user_id);
  } catch (error) {
    console.error("An error occurred while updating database: ", error);
  }
}

export default updateDatabase;

// Create a new daily record and update user info in DB
export const createDailyRecordAndUpdateFields = async (
  userInfoObj,
  activityData
) => {
  try {
    // Create a new daily_record
    const newDailyRecord = await createDailyRecord(activityData);

    // Push old today_record into past_records array
    // Retrieve userInfo (Testing, if the speed of rendering is not slow, comment in)
    // const userReseponse = retrieveUserInfo(user_id);
    // const userInfo = userReseponse.data;
    // Updated past_records array
    const updatedPastRecordArray = [
      ...userInfoObj.past_records,
      userInfoObj.today_record,
    ];
    // Update today_record id in userInfo (Clear an old value and Add a new value)
    const updatedTodayRecordId = newDailyRecord._id;
    // Update user info
    const updatedUserInfo = {
      ...userInfoObj,
      today_record: updatedTodayRecordId,
      past_records: updatedPastRecordArray,
    };
    const result = await updateUserInfo(userInfoObj, updatedUserInfo);

    // Return a new daily record
    return newDailyRecord;
  } catch (error) {
    throw error;
  }
};
