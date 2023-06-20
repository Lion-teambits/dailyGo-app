import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import updateDatabase from '../../services/updateDatabase';
import { retrieveChallenges } from '../../api/challengeService';

// get Data when user open app or Home screen

// setTimer to get data in foregraound

const HomeScreen = () => {
  const [os, setOs] = useState('');
  const [data, setdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await updateDatabase(); // user_id
      const challenge_data = await retrieveChallenges(userInfo);
      setdata(challenge_data);
      console.log(challenge_data);
    };

    fetchData();
    if (Platform.OS === 'ios') {
      setOs('iOS');
    } else {
      setOs('Android');
    }
  }, []);

  return (
    <View>
      <Text>This is {os}</Text>
      <Text>{data ? JSON.stringify(data) : 'none'}</Text>
    </View>
  );
};

export default HomeScreen;
