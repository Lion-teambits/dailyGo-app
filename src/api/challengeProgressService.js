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
    if (isInvalidNumber(challengeProgressInfo.data.current_distance)) {
      challengeProgressInfo.data.current_distance =
        Math.floor(challengeProgressInfo.data.current_distance * 100) / 100;
    }

    if (isInvalidNumber(challengeProgressInfo.data.current_calories)) {
      challengeProgressInfo.data.current_calories =
        Math.floor(challengeProgressInfo.data.current_calories * 100) / 100;
    }
    return challengeProgressInfo.data;
  } catch (error) {
    console.log("Error in retrieveChallengeProgressInfo");
    throw error;
  }
};

// Helper function: Check if a number has an incorrect decimal point
const isInvalidNumber = (number) => {
  const decimalPlaces = getDecimalPlaces(number);
  return decimalPlaces > 2;
};

// Helper function: Get the number of decimal places
const getDecimalPlaces = (number) => {
  const decimalPart = String(number).split(".")[1];
  return decimalPart ? decimalPart.length : 0;
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
