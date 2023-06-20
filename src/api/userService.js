import axios from 'axios';
import { BACKEND_URL } from './constants';

const BASE_URL = BACKEND_URL + '/api/v1';

export const retrieveUserInfo = async (user_id) => {
  try {
    const userData = await axios.get(BASE_URL + '/user/' + user_id);
    return userData.data;
  } catch (error) {
    throw error;
  }
};

// Update daily challenge status
export const updateDailyChallengeStatus = async (user_id, challengeStatus) => {
  try {
    const userInfo = await axios.put(BASE_URL + '/user/' + user_id, {
      finish_daily_goal: challengeStatus,
    });
    return userInfo.data;
  } catch (error) {
    throw error;
  }
};
