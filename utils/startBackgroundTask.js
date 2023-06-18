import BackgroundFetch from 'react-native-background-fetch';
import { fetchActivityData } from '../src/api/healthInfoAPI';

const startBackgroundTask = async () => {
  // callback function
  const onEvent = async (taskId) => {
    console.log('[BackgroundFetch] task: ', taskId);

    // Stop the previous background task, if any.
    await BackgroundFetch.stop();

    // helper function
    await fetchActivityDataFromAPI();

    // inform OS the task is done
    BackgroundFetch.finish(taskId);
  };

  const onTimeout = (taskId) => {
    console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
    // BackgroundFetch.finish(taskId); // This code is commented out to start the next task, even if this task times out (experiment)
  };

  const fetchConfig = {
    minimumFetchInterval: 15, //15 minuites
    forceAlarmManager: false,
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: true,
  };

  await BackgroundFetch.configure(fetchConfig, onEvent, onTimeout);
};

const fetchActivityDataFromAPI = async () => {
  console.log('Fetching activity data...');

  // execute fetchActivityData
  try {
    const result = await fetchActivityData();
    console.log('Fetched data:', result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default startBackgroundTask;
