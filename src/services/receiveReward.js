
const receiveReward = async (user_id) => {
  const rewardObj = await calculateStreakDaysAndReward(user_id);
  await updateUserInfo(userInfo.uid, {
    fireflies: userInfo.fireflies + rewardObj.firefliesToday,
    hearts: userInfo.hearts + rewardObj.heartToday,
    streak_days: userInfo.streak_days + 1,
  });
  console.log("Reward received into user collection")
};

export default receiveReward;
