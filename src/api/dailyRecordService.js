import axios from "axios";
import { BACKEND_URL } from "./constants";

const BASE_URL = BACKEND_URL + "/api/v1";

// Get single daily record
export const retrieveDailyRecord = async (dailyRecord_id) => {
  try {
    const dailyRecord = await axios.get(
      `${BASE_URL}/dailyRecord/id/${dailyRecord_id}`
    );
    return dailyRecord.data;
  } catch (error) {
    throw error;
  }
};

// Retrieve all past daily records for a specific user
export const retrievePastRecords = async (userInfoObj) => {
  const pastRecords = userInfoObj.past_records;
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
export const updateDailyRecord = async (existingRecord_id, newActivityData) => {
  try {
    const dailyRecord = await axios.put(
      `${BASE_URL}/dailyRecord/${existingRecord_id}`,
      newActivityData
    );
    return dailyRecord.data;
  } catch (error) {
    console.log('Error in updateDailyRecord');
    throw error;
  }
};

// Create new daily record
export const createDailyRecord = async (activityData) => {
  try {
    const newDailyRecord = await axios.post(`${BASE_URL}/dailyRecord`, activityData);
    return newDailyRecord.data;
  } catch (error) {
    throw error;
  }
};
