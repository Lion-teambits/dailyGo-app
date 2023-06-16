import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
3;
import {
  requestAuthorization,
  getStepCount,
  getDistance,
  getCalories
} from '../../api/healthInfoAPI';

const HomeScreen = () => {
  if (Platform.OS === 'ios') {
    const [todayStep, setTodayStep] = useState({});
    const [todayDistance, setTodayDistance] = useState({});
    const [todayEnergyBarned, setTodayEnergyBarned] = useState({});

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

        getCalories((err, result) => {
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
        <Text>Steps: {JSON.stringify(todayStep)}</Text>
        <Text>Distance: {JSON.stringify(todayDistance)}</Text>
        <Text>Calories: {JSON.stringify(todayEnergyBarned)}</Text>
      </View>
    );
  } else if (Platform.OS === 'android') {
    const [todayStep, setTodayStep] = useState({});
    const [todayDistance, setTodayDistance] = useState({});
    const [todayEnergyBarned, setTodayEnergyBarned] = useState({});

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
        <Text>Steps: {JSON.stringify(todayStep)}</Text>
        <Text>Distance: {JSON.stringify(todayDistance)}</Text>
        <Text>Calories: {JSON.stringify(todayEnergyBarned)}</Text>
      </View>
    );
  }
};

export default HomeScreen;
