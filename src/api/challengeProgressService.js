import axios from "axios";
import { BACKEND_URL } from "./constants";
import { retrieveUserInfo } from "./userService";

const BASE_URL = BACKEND_URL + "/api/v1";

// Create challenge information
export const createChallengeProgress = async (challenge, isGroupChallenge) => {
  try {
    const challengProgressInitData = {
      expired_date: challenge.expired_date,
      monster_name: challenge.monster_name,
      monster_image: challenge.monster_image,
      current_steps: 0,
      badge_info: challenge.badge_info,
    };

    if (isGroupChallenge) {
      challengProgressInitData.group_challenge_info = challenge._id;
    } else {
      challengProgressInitData.event_challenge_info = challenge._id;
    }

    const challengProgressData = await axios.post(
      `${BASE_URL}/challengeProgress`,
      challengProgressInitData
    );
    return challengProgressData.data;
  } catch (error) {
    throw error;
  }
};

// Retrieve single challenge progress
export const retrieveChallengeProgressInfo = async (challengeProgress_id) => {
  try {
    const challengeProgressInfo = await axios.get(
      `${BASE_URL}/challengeProgress/${challengeProgress_id}`
    );
    return challengeProgressInfo.data;
  } catch (error) {
    console.log("Error in retrieveChallengeProgressInfo");
    throw error;
  }
};

// Retrieve all challenge information for a specific user
export const retrieveChallengeProgresses = async (user_id, eventType) => {
  const userInfo = await retrieveUserInfo(user_id);

  let challengeProgressIds = [];
  let challengeProgressArray = [];

  if (eventType === "event") {
    challengeProgressIds = userInfo.event_challenge_progress;
  } else {
    challengeProgressIds = userInfo.group_challenge_progress;
  }

  // Retrieve Challenge Progress object
  for (const challengeProgress_id of challengeProgressIds) {
    const challengeProgress = await retrieveChallengeProgressInfo(
      challengeProgress_id
    );
    if (challengeProgress) {
      challengeProgressArray.push(challengeProgress);
    }
  }

  return challengeProgressArray;
};

// Update challenge progress
export const updateChallengeProgress = async (
  challengeProgress_id,
  newChallengeProgressData
) => {
  try {
    const challenge = await axios.put(
      `${BASE_URL}/challengeProgress/${challengeProgress_id}`,
      newChallengeProgressData
    );
    return challenge.data;
  } catch (error) {
    console.log("Error in updateChallengeProgress");
    throw error;
  }
};

// Delete challenge progress
export const deleteChallengeProgress = async (challengeProgress_id) => {
  try {
    const challenge = await axios.delete(
      `${BASE_URL}/challengeProgress/${challengeProgress_id}`
    );
    return challenge.data;
  } catch (error) {
    console.log("Error in deleteChallengeProgress");
    throw error;
  }
};