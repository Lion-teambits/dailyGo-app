import BackgroundService from 'react-native-background-actions';
import { fetchActivityData } from '../src/api/healthInfoAPI';

const getActivityDataTask = async () => {
  console.log('Getting activity data..');
  try {
    const data = await fetchActivityData();
    console.log(data);
    // Compare with data in DB & update DB
  } catch (error) {
    console.error(error);
  }
};

const options = {
  taskName: 'GetActivityDataTask',
  taskTitle: 'Get ACtivity Data Task',
  taskDesc: 'Task to get activity data',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: {
    delay: 5000, // 60000ms = 1min
  },
};

export default function updateActivityData() {
  BackgroundService.start(getActivityDataTask, options);
}
