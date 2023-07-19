import AsyncStorage from "@react-native-async-storage/async-storage";

export const makeAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("@accessToken");
  const headers = {
    Authorization: token,
  };
  return headers;
};
