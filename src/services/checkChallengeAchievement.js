import { fetchActivityData } from '../api/healthInfoAPI.ios';
import { retrieveUserInfo } from '../api/userService';

async function checkChallengeAchievement() {
  // Fetch current activity data
  const activityData = await fetchActivityData();

  // Retrieve daily challenge goal (could be Recoil)
  const userInfo = await retrieveUserInfo();

  // Daily challenge
  if (!userInfo.finihs_daily_goal) {
    const dailyResult = checkChallengeGoal(
      activityData.steps,
      userInfo.daily_mode
    );
    // if daily challenge is achieved
    if (dailyResult) {
      // [TODO]
      // Trigger Success Modal
      // Give firefries (& heart)
      // Change finish_daily_goal status in Database
    }
  }

  // Event challenge
  // Coop challenge
  // Retrieve ongoing event challenge
  // Check challenge achievement

  // return current status of all challenges (daily challenge, evnet challenge, coop challenge)
  return;
}

const checkChallengeGoal = (steps, goal) => {
  if (steps > goal) {
    return true;
  }
};
