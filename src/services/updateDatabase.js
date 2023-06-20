import { fetchActivityData } from '../api/healthInfoAPI';
import {
  retrieveUserInfo,
  updateDailyChallengeStatus,
} from '../api/userService';
import {
  createDailyRecord,
  retrieveDailyRecord,
  retrievePastRecords,
  updateDailyRecord,
} from '../api/dailyRecordService';

// Fetch activity data & update database
async function updateDatabase(user_id) {
  try {
    // Fetch activity data
    const activityData = await fetchActivityData();

    // Retrieve user data from database
    const userInfo = await retrieveUserInfo(user_id);

    const todayRecord = await retrieveDailyRecord(userInfo.today_record);

    const pastRecords = await retrievePastRecords(userInfo);

    // Check if there is daily record which has the same date
    const isExistingRecord = todayRecord.date === activityData.date;

    console.log('existingRecordDate', isExistingRecord);

    // [TODO]
    // if today_record contains the same day data, update the data in DB, else create new record & update firlds in today_record and past_records
    // if (isExistingRecord) {
    //   // Update daily record
    //   // await updateDailyRecord(existingRecordDate, activityData); // need to be decided how to find a specific daily record. id? date?
    // } else {
    //   // Create new record
    //   // await createDailyRecord(user_id, activityData);
    //   // Change daily challenge status to false
    //   await updateDailyChallengeStatus(user_id, false);
    // }

    console.log('Finish updating database');
    return userInfo;
  } catch (error) {
    console.error('An error occurred while updating database: ', error);
  }
}

export default updateDatabase;
