import axios from 'axios';
import { BACKEND_URL } from './constants';

const BASE_URL = BACKEND_URL + '/api/v1';

// Retrieve single challenge information
export const retrieveChallengeInfo = async (challenge_id) => {
  try {
    const challengeInfo = await axios.get(
      BASE_URL + '/challenge/' + challenge_id
    );
    return challengeInfo.data;
  } catch (error) {
    throw error;
  }
};

// Retrieve all challenge information for a specific user
export const retrieveChallenges = async (userData) => {
  const challengeArr = userData.challenge;
  const results = [];

  for (const challenge_id of challengeArr) {
    const challenge = await retrieveChallengeInfo(challenge_id);
    if (challenge) {
      results.push(challenge);
    }
  }

  return results;
};
