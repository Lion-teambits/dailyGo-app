import axios from "axios";
import { BACKEND_URL } from "./constants";
import { createDailyRecord } from "./dailyRecordService";
import { makeAuthHeaders } from "./apiUtils";

const BASE_URL = BACKEND_URL + "/api/v1";

export const createUserInfo = async (name, photo, targetSteps, uid) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const activityInit = {
      uid: uid,
      date: today.toISOString,
      steps: 0,
      distance: 0,
      calories: 0,
    };
    const dailyRecord = await createDailyRecord(uid, activityInit);

    const userInitData = {
      name: name,
      avatar: photo,
      preferred_daily_mode: targetSteps,
      uid: uid,
      today_record: dailyRecord._id,
      fireflies: 0,
      streak_days: 0,
      hearts: 0,
    };
    const headers = await makeAuthHeaders();
    const userData = await axios.post(`${BASE_URL}/user`, userInitData, {
      headers,
    });
    return userData.data;
  } catch (error) {
    throw error;
  }
};

export const retrieveUserInfo = async (user_id) => {
  try {
    const headers = await makeAuthHeaders();
    const userData = await axios.get(`${BASE_URL}/user/${user_id}`, {
      headers,
    });
    return userData.data;
  } catch (error) {
    throw error;
  }
};

// Update user info
export const updateUserInfo = async (user_id, updatedUserInfo) => {
  try {
    const headers = await makeAuthHeaders();
    const updatedUserInfoRes = await axios.put(
      `${BASE_URL}/user/${user_id}`,
      updatedUserInfo,
      { headers }
    );

    return updatedUserInfoRes.data;
  } catch (error) {
    console.log("Error in updateUserInfo");
    throw error;
  }
};
