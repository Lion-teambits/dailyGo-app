import axios from "axios";
import { BACKEND_URL } from "./constants";

const BASE_URL = BACKEND_URL + "/api/v1";

export const retrieveGroupChallengeInfo = async (id) => {
  try {
    const groupChallengeInfo = await axios.get(
      `${BASE_URL}/groupChallenge/${id}`
    );
    return groupChallengeInfo.data;
  } catch (error) {
    throw error;
  }
};
