import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../components/AppButton';
import {Colors} from '../constants/Colors';
let optionText: string[] = [
  'Professional videos with coatches',
  'Over 100 ready-made workouts',
  'Create your personal training plan',
  'Without advertising',
];
const StartTraining = () => {
  const [boxIndex, setBoxIndex] = useState<number>(0);
  const navigation = useNavigation<ReactNavigation.RootParamList | any>()
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#332B8A', '#905DE9']}
      style={styles.container}>
      <Image
        source={require('../assets/images/Vector.png')}
        style={{height: 130, width: 200}}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.popup}>
          <Text style={[styles.titleFont, {fontWeight: '700'}]}>
            Million of User's choice
          </Text>

          <Text style={[styles.description, {marginTop: 5}]}>
            We believe that our app should inspire
          </Text>
          <Text style={styles.description}>
            you to be the best version of yourself
          </Text>
          {optionText.map((text, index) => {
            return (
              <View style={styles.options} key={index}>
                <Image
                  source={require('../assets/images/checkbox.png')}
                  style={{height: 15, width: 15}}
                />
                <Text style={{color: Colors.WHITE, paddingHorizontal: 5}}>
                  {text}
                </Text>
              </View>
            );
          })}

          <View style={styles.planContainer}>
            {[1, 2].map((x, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => setBoxIndex(index)}>
                  <LinearGradient
                  start={{x: 1, y: 1}}
                  end={{x: 1, y: 0}}
                    style={styles.plan}
                    colors={
                      boxIndex === index
                        ? ['#332B8A', '#905DE9']
                        : [ '#222332', '#2D3450']
                    }>
                    <Text style={{color: Colors.WHITE, fontSize: 16}}>
                      Monthly
                    </Text>
                    <Text
                      style={{
                        color: Colors.WHITE,
                        fontSize: 20,
                        fontWeight: '800',
                      }}>
                      5,99$
                    </Text>
                    <Text style={{color: Colors.WHITE}}>per month</Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{marginTop: 15}}>
            <AppButton width={"100%"} title="Continue" onPress={() =>navigation.navigate("SignIn" , {})} />
          </View>
          <Text style={styles.bottomText}>
            Eget nunc scelerisque viverra mauris in aliquam sem
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#222332',
    minHeight: 80,
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  bottomContainer: {
    backgroundColor: '#222332',
    borderTopLeftRadius: 25,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    minHeight: 100,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  titleFont: {
    color: Colors.WHITE,
    fontSize: 25,
  },
  description: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  options: {
    flexDirection: 'row',
    paddingVertical: 5,
    marginTop: 5,
  },
  bottomText: {marginTop: 10, fontSize: 12, color: '#F1F4F8'},
  planContainer: {
    flexDirection: 'row',
    width: '100%',
    // paddingHorizontal : 30,
    justifyContent : "space-between",
    marginTop: 10,
  },
  plan: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
});

export default StartTraining;
