import axios from "axios";
import { BACKEND_URL } from "./constants";

const BASE_URL = BACKEND_URL + "/api/v1";

export const createGroupChallenge = async (
  title,
  selectImgInfo,
  uId,
  badgeInfo
) => {
  try {
    const groupChallengeInitData = {
      title: title,
      monster_name: selectImgInfo.title,
      monster_image: selectImgInfo.source,
      target_steps: selectImgInfo.steps,
      badge_info: badgeInfo,
      group_current_steps: 0,
      member_list: [uId],
    };
    const groupChallengeData = await axios.post(
      `${BASE_URL}/groupChallenge`,
      groupChallengeInitData
    );
    return groupChallengeData.data;
  } catch (error) {
    throw error;
  }
};

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
