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
    const dateString = result.startDate.split('T')[0];
    console.log('getStepCount:', { [dateString]: result.value });
    callback(null, { [dateString]: result.value });
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
    const dateString = result.startDate.split('T')[0];
    console.log('getDistance: ', { [dateString]: result.value });
    callback(null, { [dateString]: result.value });
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

    console.log('getActiveEnergyBurned: ', dailyEnergyBarned);
    callback(null, dailyEnergyBarned);
  });
};
