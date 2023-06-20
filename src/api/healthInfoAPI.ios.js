import AppleHealthKit from 'react-native-health';

/* Permission options */
const params = AppleHealthKit.Constants.Permissions;
const permissions = {
  permissions: {
    read: [
      params.Steps,
      params.ActiveEnergyBurned,
      params.DistanceWalkingRunning,
    ],
    write: [],
  },
};

// initialize permissions
export const requestAuthorization = (callback) => {
  AppleHealthKit.initHealthKit(permissions, (error) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null);
  });
};

// GET health info
// date constant
const today = new Date();
today.setHours(0, 0, 0, 0);

// Today's current step count
export const getStepCount = (callback) => {
  let options = {
    includeManuallyAdded: true, // for iOS simulator, inlude data manually added
  };

  AppleHealthKit.getStepCount(options, function (err, result) {
    if (err) {
      console.error('Error in getStepCount:', err);
      callback(err, null);
      return;
    }
    // console.log('getStepCount:', result.value);
    callback(null, result.value);
  });
};

// Today's current distance
export const getDistance = (callback) => {
  let options = {
    includeManuallyAdded: true, // for iOS simulator, inlude data manually added
  };

  AppleHealthKit.getDistanceWalkingRunning(options, function (err, result) {
    if (err) {
      console.error('Error in getStepCount:', err);
      callback(err, null);
      return;
    }
    // console.log('getDistance: ', result.value);
    callback(null, result.value);
  });
};

// Today's current Active Energy Burned
export const getCalories = (callback) => {
  let options = {
    startDate: today.toISOString(),
  };

  AppleHealthKit.getActiveEnergyBurned(options, function (err, results) {
    if (err) {
      console.error('Error in getDailyActiveEnergyBurnedSamples: ', err);
      callback(err, null);
      return;
    }
    const data = results;
    const dailyEnergyBarned = {};

    // calculate distance on each day
    data.forEach((entry) => {
      const startDate = entry.startDate.split('T')[0];
      const value = entry.value;

      if (dailyEnergyBarned[startDate]) {
        dailyEnergyBarned[startDate] += value;
      } else {
        dailyEnergyBarned[startDate] = value;
      }
    });
    // console.log('getActiveEnergyBurned: ', dailyEnergyBarned);
    callback(null, dailyEnergyBarned);
  });
};
export const fetchActivityData = async () => {
  let activityObj = {
    date: today.toISOString(),
    steps: 0,
    distance: 0,
    calories: 0,
  };

  try {
    await new Promise((resolve, reject) => {
      requestAuthorization((error) => {
        if (error) {
          console.log('[ERROR] Cannot grant permissions!');
          reject(error);
          return;
        }
        resolve();
      });
    });

    const stepsResult = await new Promise((resolve, reject) => {
      getStepCount((err, result) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
    activityObj.steps = stepsResult;

    const distancesResult = await new Promise((resolve, reject) => {
      getDistance((err, result) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
    activityObj.distance = distancesResult;

    const caloriesResult = await new Promise((resolve, reject) => {
      getCalories((err, result) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(result);
      });
    });

    const keys = Object.keys(caloriesResult);
    if (caloriesResult[keys[0]]) {
      activityObj.calories = caloriesResult[keys[0]];
    }

    console.log('Apple Healthkit data: ', activityObj);
    return activityObj;
  } catch (error) {
    console.error(error);
  }
};
