import axios from "axios";
import { BACKEND_URL } from "./constants";

const BASE_URL = BACKEND_URL + "/api/v1";

// Get single daily record
export const retrieveDailyRecord = async (dailyRecord_id) => {
  try {
    const dailyRecord = await axios.get(
      `${BASE_URL}/dailyRecord/${dailyRecord_id}`
    );
    // console.log("retrieveDailyRecord: ", dailyRecord.data);
    return dailyRecord.data;
  } catch (error) {
    console.log("retrieveDailyRecord Error: ", error.message);
    throw error;
  }
};

// Update daily record
export const updateDailyRecord = async (record_id, newActivityData) => {
  try {
    const dailyRecord = await retrieveDailyRecord(record_id);
    const updatedDailyRecord = { ...dailyRecord, ...newActivityData };
    const resUpdatedDailyRecord = await axios.put(
      `${BASE_URL}/dailyRecord/${record_id}`,
      { updatedDailyRecord }
    );
    return resUpdatedDailyRecord.data;
  } catch (error) {
    console.log("Error in updateDailyRecord");
    throw error;
  }
};

// Create new daily record
export const createDailyRecord = async (activityData, user_id) => {
  try {
    const newDailyRecord = await axios.post(`${BASE_URL}/dailyRecord`, {
      ...activityData,
      uid: user_id,
      streak_status: "continued", // default
    });
    return newDailyRecord.data;
  } catch (error) {
    throw error;
  }
};
