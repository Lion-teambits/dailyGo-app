import GoogleFit, { Scopes } from "react-native-google-fit";

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
// today.setDate(today.getDate() - 1); // yesterday data for testing
today.setHours(0, 0, 0, 0);

const opt = {
  startDate: today.toISOString(),
  endDate: new Date().toISOString(),
};

export const fetchActivityData = async () => {
  let activityObj = {
    date: opt.startDate,
    steps: 0,
    distance: 0,
    calories: 0,
  };

  try {
    const authResult = await authorizeFit();
    const resSteps = await GoogleFit.getDailyStepCountSamples(opt);
    const resDistance = await GoogleFit.getDailyDistanceSamples(opt);
    const resCalories = await GoogleFit.getDailyCalorieSamples(opt);

    // Find steps data
    const mergeStepDeltasData = resSteps.find(
      (item) => item.source === "com.google.android.gms:merge_step_deltas"
    );
    if (mergeStepDeltasData.steps.length > 0) {
      activityObj.steps = mergeStepDeltasData.steps[0].value;
    }

    // Add distance
    if (resDistance.length > 0) {
      activityObj.distance = Math.floor(resDistance[0].distance * 0.001);
    }

    // Add calories (need to be fixed)
    if (resCalories.length > 0) {
      activityObj.calories = Math.floor(resCalories[0].calorie);
    }

    console.log("googleFit data: ", activityObj);
    return activityObj;
  } catch (error) {
    throw new Error(error.message);
  }
};
