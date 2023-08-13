import BackgroundFetch from 'react-native-background-fetch';
import { fetchActivityData } from '../api/healthInfoAPI';

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
    BackgroundFetch.finish(taskId); 
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
  console.log('Fetching activity data on background...');

  // execute fetchActivityData
  try {
    const result = await fetchActivityData();
    console.log('[Background] Fetched data:', result);
  } catch (error) {
    console.error('[Background] Error fetching data:', error);
  }
};

export default startBackgroundTask;
