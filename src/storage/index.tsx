import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
};
export const getStoredData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
export const clearStorage = async (value: any) => {
  try {
    await AsyncStorage.clear(value);
  } catch (e) {
    console.log(e);
  }
};
