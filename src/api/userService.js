import axios from "axios";
import { BACKEND_URL } from "./constants";

const BASE_URL = BACKEND_URL + "/api/v1";

export const createUserInfo = async (name, photo, targetSteps, uid) => {
  try {
    const userInitData = {
      name: name,
      photo: photo,
      daily_mode: targetSteps,
      uid: uid,
    };

    const userData = await axios.post(`${BASE_URL}/user`, userInitData);
    return userData.data;
  } catch (error) {
    throw error;
  }
};

export const retrieveUserInfo = async (user_id) => {
  try {
    const userData = await axios.get(`${BASE_URL}/user/${user_id}`);
    // console.log("retrieveUserInfo: ", userData.data);
    return userData.data;
  } catch (error) {
    // console.log("retrieveUserInfo Error: ", error.message);
    throw error;
  }
};

// Update user info
export const updateUserInfo = async (user_id, updatedFields) => {
  try {
    const userInfo = await retrieveUserInfo(user_id);

    const updatedUserInfo = { ...userInfo, ...updatedFields };
    // Update user info in DB
    const updatedUserInfoRes = await axios.put(
      `${BASE_URL}/user/${userInfo._id}`,
      updatedUserInfo
    );

    return updatedUserInfoRes.data;
  } catch (error) {
    console.log("Error in updateUserInfo");
    throw error;
  }
};

// Update daily challenge status
export const updateDailyChallengeStatus = async (user_id, challengeStatus) => {
  try {
    const userInfo = await axios.put(`${BASE_URL}/user/${user_id}`, {
      finish_daily_goal: challengeStatus,
    });
    return userInfo.data;
  } catch (error) {
    throw error;
  }
};
