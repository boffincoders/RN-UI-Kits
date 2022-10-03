import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Timer from '../../components/timer';
import {Colors} from '../../constants/Colors';
import {ICategoriesExercises} from './categoriesExercises';
const StartWorkout = ({route, navigation}: any) => {
  const data: ICategoriesExercises = route?.params.data;
  const categoryId = route?.params.categoryId;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/backButton.png')} />
        </TouchableOpacity>
        <Text style={styles.time}>05:39</Text>
      </View>
      <LinearGradient
        style={styles.imageBox}
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}
        colors={['#332B8A', '#905DE9']}>
        <Image
          source={require('../../assets/images/Vector.png')}
          style={{height: 150, width: 150, resizeMode: 'contain'}}
        />
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Timer data={data} categoryId={categoryId} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222332',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    // paddingVertical: 10,
  },
  time: {
    fontSize: 27,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: '50%',
    margin: 15,
    borderRadius: 7,
  },
});
export default StartWorkout;
