import axios from "axios";
import { BACKEND_URL } from "./constants";

const BASE_URL = BACKEND_URL + "/api/v1";

// Retrieve single badge data
export const retreiveBadgeInfo = async (badge_id) => {
  try {
    const badgeInfo = await axios.get(`${BASE_URL}/badge/${badge_id}`);
    return badgeInfo.data;
  } catch (error) {
    throw error;
  }
};

// Retrieve all badge data for a specific user
export const retreiveBadges = async (userData) => {
  const badgeArr = userData.badges;
  const results = [];

  for (const badge_id of badgeArr) {
    const badge = await retreiveBadgeInfo(badge_id);
    if (badge) {
      results.push(badge);
    }
  }

  return results;
};
