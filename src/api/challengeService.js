import axios from "axios";
import { BACKEND_URL } from "./constants";

const BASE_URL = BACKEND_URL + "/api/v1";

// Retrieve single challenge information
export const retrieveChallengeInfo = async (challenge_id) => {
  try {
    const challengeInfo = await axios.get(
      `${BASE_URL}/challenge/${challenge_id}`
    );
    return challengeInfo.data;
  } catch (error) {
    throw error;
  }
};

// Retrieve all challenge information for a specific user
export const retrieveChallenges = async (userInfoObj) => {
  const challengeArr = userInfoObj.challenge;
  const results = [];

  for (const challenge_id of challengeArr) {
    const challenge = await retrieveChallengeInfo(challenge_id);
    if (challenge) {
      results.push(challenge);
    }
  }

  return results;
};

// Update challenge
export const updateChallenge = async (challenge_id, newChallengeData) => {
  try {
    const challenge = await axios.put(
      `${BASE_URL}/challenge/${challenge_id}`,
      newChallengeData
    );
    return challenge.data;
  } catch (error) {
    console.log("Error in updateChallenge");
    throw error;
  }
};
