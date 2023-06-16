import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
3;
import {
  requestAuthorization,
  getStepCount,
  getAuthStatus,
  getDistance,
  getActiveEnergyBurned,
} from '../../api/healthInfoAPI';

const HomeScreen = () => {
  if (Platform.OS === 'ios') {
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
    }, []);

    return (
      <View>
        <Text>This is iOS</Text>
        <Text>Steps: {todayStep}</Text>
        <Text>Distance: {todayDistance}</Text>
        <Text>Calories: {JSON.stringify(todayEnergyBarned)}</Text>
      </View>
    );
  } else if (Platform.OS === 'android') {
    const [todayStep, setTodayStep] = useState(0);
    const [todayDistance, setTodayDistance] = useState(0);
    const [todayEnergyBarned, setTodayEnergyBarned] = useState(0);

    useEffect(() => {
      async function retrieveData() {
        try {
          const stepResult = await getStepCount();
          setTodayStep(stepResult);
          const distanceResult = await getDistance();
          setTodayDistance(distanceResult);
          const caloriesResult = await getCalories();
          setTodayEnergyBarned(caloriesResult);
        } catch (error) {
          console.log('Error :', error.message);
        }
      }
      retrieveData();
    }, []);

    return (
      <View>
        <Text>This is android</Text>
        <Text>Steps: {todayStep}</Text>
        <Text>Distance: {todayDistance}</Text>
        <Text>Calories: {todayEnergyBarned}</Text>
      </View>
    );
  }
};

export default HomeScreen;
