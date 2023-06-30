import axios from "axios";
import { BACKEND_URL } from "./constants";
import { retrieveUserInfo } from "./userService";

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
export const retrieveChallengeProgresses = async (user_id) => {
  const userInfo =  await retrieveUserInfo(user_id);

  const eventChallengeIds = userInfo.event_challenge_progress;
  const groupChallengeIds = userInfo.group_challenge_progress;

    const eventChallengeArray = [];
    const groupChallengeArray = [];

    // Retrieve Event Challenge object
    for (const challenge_id of eventChallengeIds) {
      const challenge = await retrieveChallengeInfo(challenge_id);
      if (challenge) {
        eventChallengeArray.push(challenge);
      }
    }

    // Retrieve Group Challenge object
    for (const challenge_id of groupChallengeIds) {
      const challenge = await retrieveChallengeInfo(challenge_id);
      if (challenge) {
        groupChallengeArray.push(challenge);
      }
    }

    return {
      eventChallenges: eventChallengeArray,
      coopChallenges: groupChallengeArray,
    };
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
