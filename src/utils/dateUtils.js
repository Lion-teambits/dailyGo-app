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

export const convertToBase64 = (number) => {
  const base64Characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  while (number > 0) {
    const index = number % 64;
    result = base64Characters[index] + result;
    number = Math.floor(number / 64);
  }
  return result || "0";
};

export const convertToBase32 = (number) => {
  const base32Characters = "0123456789abcdefghijklmnopqrstuv";
  let result = "";
  while (number > 0) {
    const index = number % 32;
    result = base32Characters[index] + result;
    number = Math.floor(number / 32);
  }
  return result || "0";
};
