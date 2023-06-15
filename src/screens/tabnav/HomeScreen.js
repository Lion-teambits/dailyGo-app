import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
3;
import {
  requestAuthorization,
  getStepCount,
  getAuthStatus,
  getDistance,
  getActiveEnergyBurned,
} from '../../api/appleHealthKit';

const HomeScreen = () => {
  if (Platform.OS === 'ios') {
    const [authStatus, setAuthStatus] = useState({});
    const [todayStep, setTodayStep] = useState(0);
    const [todayDistance, setTodayDistance] = useState(0);
    const [todayEnergyBarned, setTodayEnergyBarned] = useState(0);

    useEffect(() => {
      requestAuthorization((error) => {
        if (error) {
          console.log('[ERROR] Cannot grant permissions!');
          return;
        }
        getStepCount((err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          setTodayStep(result);
        });

        getDistance((err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          setTodayDistance(result);
        });

        getActiveEnergyBurned((err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          setTodayEnergyBarned(result);
        });
      });
    }, [authStatus]);

    const handlePressGetAuthStatus = () => {
      getAuthStatus((err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        setAuthStatus(result);
      });
    };

    return (
      <View>
        <Text>Steps: {todayStep}</Text>
        <Text>Distance: {todayDistance}</Text>
        <Text>Calories: {JSON.stringify(todayEnergyBarned)}</Text>
      </View>
    );
  } else if (Platform.OS === 'android') {
    return <Text>This is android</Text>;
  }
};

export default HomeScreen;
