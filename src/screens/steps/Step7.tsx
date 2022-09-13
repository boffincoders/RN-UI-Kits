import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Colors} from '../../constants/Colors';

import {IPropsSteps} from './Step1';
const list = [
  {
    title: 'Medium',
    des: 'I train 1-2 times a week',
  },
  {
    title: 'Irregular training',
    des: 'I train 1-2 times a week',
  },
  {
    title: 'Advanced',
    des: 'I train more than 5 times a week',
  },
];
const Step7 = ({onInputChanges}: IPropsSteps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('Medium');
  useEffect(() => {
    onInputChanges({trainingLevel: selectedPlan});
  }, [selectedPlan]);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.gender}>Choose training</Text>
        <Text style={styles.gender}>level</Text>
        <ScrollView>
          {list.map((x, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedPlan(x.title)}>
                <LinearGradient
                  start={{x: 1, y: 1}}
                  end={{x: 1, y: 0}}
                  colors={
                    selectedPlan === x.title
                      ? ['#332B8A', '#905DE9']
                      : ['#2D3450', '#2D3450']
                  }
                  style={styles.listItem}>
                  <Text
                    style={{
                      color: Colors.WHITE,
                      marginLeft: 5,
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    {x.title}
                  </Text>
                  <Text
                    style={{color: Colors.WHITE, marginLeft: 5, fontSize: 14}}>
                    {x.des}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {/* <View style={styles.buttonFooter}>
        <AppButton title="Continue" width={350} onPress={onContinue} />
      </View> */}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  step: {
    color: '#9662F1',
    fontSize: 16,
  },
  listContainer: {
    marginTop: 60,
    paddingHorizontal: 10,
  },
  gender: {
    fontSize: 27,
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 10,
  },

  listItem: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 14,
  },
  buttonFooter: {
    position: 'absolute',
    right: 18,
    bottom: 20,
  },
});
export default Step7;
