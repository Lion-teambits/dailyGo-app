import GoogleFit, { Scopes } from 'react-native-google-fit';

/* Permission options */
const options = {
  scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_LOCATION_READ],
};

// initialize permissions
export async function authorizeFit() {
  try {
    const authResult = await GoogleFit.authorize(options);
    if (authResult.success) {
      return authResult;
    } else {
      throw new Error(authResult.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// GET health info
// date constant
const today = new Date();
today.setHours(0, 0, 0, 0);

const opt = {
  startDate: today.toISOString(),
  endDate: new Date().toISOString(),
};

// Today's current step count
export const getStepCount = async () => {
  try {
    const authResult = await authorizeFit();
    const res = await GoogleFit.getDailyStepCountSamples(opt);
    console.log('steps: ', res);
    return res[1].steps[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDistance = async () => {
  try {
    const authResult = await authorizeFit();
    const res = await GoogleFit.getDailyDistanceSamples(opt);
    console.log('distance: ', res);
    return res[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCalories = async () => {
  try {
    const authResult = await authorizeFit();
    const res = await GoogleFit.getDailyCalorieSamples(opt);
    console.log('calories: ', res);
    return res[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
