import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { fetchActivityData } from '../../api/healthInfoAPI';

// get Data when user open app or Home screen

// setTimer to get data in foregraound

const HomeScreen = () => {

  const [os, setOs] = useState('');

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setOs('iOS');
    } else {
      setOs('Android');
    }
  }, []);

  return (
    <View>
      <Text>This is {os}</Text>
    </View>
  );
};

export default HomeScreen;
