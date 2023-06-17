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
    const dateString = res[1].steps[0].date;

    return { [dateString]: res[1].steps[0].value };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDistance = async () => {
  try {
    const authResult = await authorizeFit();
    const res = await GoogleFit.getDailyDistanceSamples(opt);
    const dateString = res[0].startDate.split('T')[0];

    return { [dateString]: res[0].distance };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCalories = async () => {
  try {
    const authResult = await authorizeFit();
    const res = await GoogleFit.getDailyCalorieSamples(opt);
    const dateString = res[0].startDate.split('T')[0];

    return { [dateString]: Math.abs(res[0].calorie) };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchActivityData = async () => {
  try {
    const authResult = await authorizeFit();
    const resSteps = await GoogleFit.getDailyStepCountSamples(opt);
    const resDistance = await GoogleFit.getDailyDistanceSamples(opt);
    const resCalories = await GoogleFit.getDailyCalorieSamples(opt);

    return {
      date: resCalories[0].endDate,
      steps: resSteps[1].steps[0].value,
      distance: resDistance[0].distance,
      calories: Math.abs(resCalories[0].calorie),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};