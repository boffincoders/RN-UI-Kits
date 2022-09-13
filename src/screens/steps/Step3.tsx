
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-modern-datepicker';
import {Colors} from '../../constants/Colors';
import {IPropsSteps} from './Step1';
const Step3 = ({onInputChanges}: IPropsSteps) => {
  const [selectedDate, setSelectedDate] = useState<string>();
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.gender}>Select birth date</Text>

        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#332B8A', '#905DE9']}
          style={styles.listItem}>
          <DatePicker
            onDateChange={date => {
              setSelectedDate(date);
              onInputChanges({birthDate: date});
            }}
            selectorStartingYear={1990}
            options={{
              textDefaultColor: '#332B8A',
              selectedTextColor: Colors.WHITE,
              mainColor: '#905DE9',
              textSecondaryColor: '#332B8A',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
           
            selected={selectedDate}
            mode="datepicker"
            minuteInterval={30}
            style={{borderRadius: 10}}
          />
        </LinearGradient>
      </View>
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
  gender: {
    fontSize: 27,
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 60,
    paddingHorizontal: 10,
  },

  listItem: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 14,
  },
  textAndIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  iconContainer: {
    width: '10%',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFooter: {
    position: 'absolute',
    right: 18,
    bottom: 20,
  },
});

export default Step3;
