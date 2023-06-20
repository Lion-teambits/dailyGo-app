import axios from 'axios';
import { BACKEND_URL } from './constants';

const BASE_URL = BACKEND_URL + '/api/v1';

// Get single daily record
export const retrieveDailyRecord = async (dailyRecord_id) => {
  try {
    const dailyRecord = await axios.get(
      BASE_URL + '/dailyRecord/' + dailyRecord_id
    );
    return dailyRecord.data;
  } catch (error) {
    throw error;
  }
};

// Retrieve all past daily records for a specific user
export const retrievePastRecords = async (userData) => {
  const pastRecords = userData.past_records;
  const results = [];

  for (const dailyRecord_id of pastRecords) {
    const recordData = await retrieveDailyRecord(dailyRecord_id);
    if (recordData) {
      results.push(recordData);
    }
  }

  return results;
};

// Update daily record
export const updateDailyRecord = async (existingRecordDate, activityData) => {
  try {
    const dailyRecord = await axios.put(
      BASE_URL + '/dailyRecord/' + existingRecordDate,
      {
        steps: activityData.steps,
        distance: activityData.distance,
        calories: activityData.calories,
      }
    );
    return dailyRecord.data;
  } catch (error) {
    throw error;
  }
};

// Create new daily record
export const createDailyRecord = async (user_id, activityData) => {
  try {
    // [TODO]
    // Update today_record in userInfo
    // Push old today_record into past_records array
    // Add a new record id?date? below into today_record

    const dailyRecord = await axios.put(BASE_URL + '/dailyRecord/', {
      date: activityData.date,
      steps: activityData.steps,
      distance: activityData.distance,
      calories: activityData.calories,
    });
    return dailyRecord.data;
  } catch (error) {
    throw error;
  }
};
