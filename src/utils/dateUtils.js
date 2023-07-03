export const eventDateStatus = (startDate, expiredDate, userJoin) => {
  const startDateObj = new Date(startDate);
  const expiredDateObj = new Date(expiredDate);
  const currentDate = new Date();

  let status = "";
  let timeDifference = 0;
  let timeDifferenceDisplay = "";

  if (currentDate < startDateObj) {
    status = "UPCOMING EVENT";
    timeDifference = startDateObj.getTime() - currentDate.getTime();
    timeDifferenceDisplay =
      timeDifference >= 1000 * 60 * 60 * 24
        ? `Starts in: ${Math.floor(timeDifference / (1000 * 60 * 60 * 24))}d`
        : `Starts in: ${startDateObj.getHours()}h`;
  } else if (currentDate >= startDateObj && currentDate <= expiredDateObj) {
    status = userJoin ? "CURRENT EVENT" : "ACTIVE EVENT";
    timeDifference = expiredDateObj.getTime() - currentDate.getTime();
    timeDifferenceDisplay =
      timeDifference >= 1000 * 60 * 60 * 24
        ? `Time left: ${Math.floor(timeDifference / (1000 * 60 * 60 * 24))}d`
        : `Time left: ${startDateObj.getHours()}h`;
  } else {
    status = null;
  }

  return {
    status: status,
    timeDifference: timeDifferenceDisplay,
  };
};
