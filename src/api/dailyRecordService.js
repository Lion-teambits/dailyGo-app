import axios from "axios";
import { BACKEND_URL } from "./constants";
import { makeAuthHeaders } from "./apiUtils";

const BASE_URL = BACKEND_URL + "/api/v1";

// Get single daily record
export const retrieveDailyRecord = async (dailyRecord_id) => {
  try {
    const headers = await makeAuthHeaders();
    const dailyRecord = await axios.get(
      `${BASE_URL}/dailyRecord/${dailyRecord_id}`,
      { headers }
    );
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
    const headers = await makeAuthHeaders();
    const resUpdatedDailyRecord = await axios.put(
      `${BASE_URL}/dailyRecord/${record_id}`,
      updatedDailyRecord,
      { headers }
    );
    return resUpdatedDailyRecord.data;
  } catch (error) {
    console.log("Error in updateDailyRecord");
    throw error;
  }
};

// Create new daily record
export const createDailyRecord = async (user_id, activityData) => {
  try {
    const headers = await makeAuthHeaders();
    const newDailyRecord = await axios.post(
      `${BASE_URL}/dailyRecord`,
      {
        ...activityData,
        uid: user_id,
        streak_status: "continue", // default
      },
      {
        headers,
      }
    );
    return newDailyRecord.data;
  } catch (error) {
    throw error;
  }
};
