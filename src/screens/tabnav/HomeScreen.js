import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { fetchActivityData } from '../../api/healthInfoAPI';

const HomeScreen = () => {

  const [os, setOs] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchActivityData();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
