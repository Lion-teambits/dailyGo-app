
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Event {
  constructor(taskId, isHeadless, timestamp) {
    if (!timestamp) {
      const now = new Date();
      timestamp = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    }

    this.taskId = taskId;
    this.isHeadless = isHeadless;
    this.timestamp = timestamp;
    this.key = `${this.taskId}-${this.timestamp}`;
  }

  static destroyAll() {
    AsyncStorage.setItem('events', JSON.stringify([]));
  }

  static async create(taskId, isHeadless) {
    const event = new Event(taskId, isHeadless);

    // Persist event into AsyncStorage.
    AsyncStorage.getItem('events')
      .then((json) => {
        const data = json === null ? [] : JSON.parse(json);
        data.push(event.toJson());
        AsyncStorage.setItem('events', JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Event.create error: ', error);
      });
    return event;
  }

  static async all() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('events')
        .then((json) => {
          const data = json === null ? [] : JSON.parse(json);
          resolve(
            data.map((record) => {
              return new Event(record.taskId, record.isHeadless, record.timestamp);
            })
          );
        })
        .catch((error) => {
          console.error('Event.create error: ', error);
          reject(error);
        });
    });
  }

  toJson() {
    return {
      taskId: this.taskId,
      timestamp: this.timestamp,
      isHeadless: this.isHeadless,
    };
  }
}
