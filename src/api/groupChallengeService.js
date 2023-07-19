import axios from "axios";
import { BACKEND_URL } from "./constants";
import { makeAuthHeaders } from "./apiUtils";

const BASE_URL = BACKEND_URL + "/api/v1";

export const createGroupChallenge = async (
  title,
  selectImgInfo,
  uId,
  badgeInfo,
  shareCode
) => {
  try {
    const groupChallengeInitData = {
      title: title,
      monster_name: selectImgInfo.title,
      monster_image: selectImgInfo.source,
      target_steps: selectImgInfo.steps,
      badge_info: badgeInfo,
      group_current_steps: 0,
      group_current_calories: 0,
      group_current_distance: 0,
      member_list: [uId],
      share_id: shareCode,
    };
    const headers = await makeAuthHeaders();
    const groupChallengeData = await axios.post(
      `${BASE_URL}/groupChallenge`,
      groupChallengeInitData,
      { headers }
    );
    return groupChallengeData.data;
  } catch (error) {
    throw error;
  }
};

export const retrieveGroupChallengeInfo = async (id) => {
  try {
    const headers = await makeAuthHeaders();
    const groupChallengeInfo = await axios.get(
      `${BASE_URL}/groupChallenge/${id}`,
      { headers }
    );
    return groupChallengeInfo.data;
  } catch (error) {
    throw error;
  }
};

export const retrieveGroupChallengeInfoByShareId = async (shareId) => {
  try {
    const headers = await makeAuthHeaders();
    const groupChallengeInfo = await axios.get(
      `${BASE_URL}/groupChallenge/code/${shareId}`,
      { headers }
    );
    return groupChallengeInfo.data;
  } catch (error) {
    throw error;
  }
};

// Update challenge progress
export const updateGroupChallenge = async (
  groupChallenge_id,
  newGroupChallengeData
) => {
  try {
    const headers = await makeAuthHeaders();
    const challenge = await axios.put(
      `${BASE_URL}/groupChallenge/${groupChallenge_id}`,
      newGroupChallengeData,
      { headers }
    );
    return challenge.data;
  } catch (error) {
    console.log("Error in updateGroupChallenge");
    throw error;
  }
};
