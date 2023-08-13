export const calculateRemainingTime = (target_time) => {
  const currentTime = new Date().toISOString();
  const targetTime = new Date(target_time);

  const timeDifference = targetTime - new Date(currentTime);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return `${days}d ${hours % 24}h`;
  } else if (hours >= 1) {
    return `${hours}h`;
  } else if (minutes >= 1) {
    return `${minutes}m`;
  } else {
    return `10d 23h`;
  }
};
