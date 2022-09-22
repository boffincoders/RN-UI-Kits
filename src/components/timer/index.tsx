import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../constants/Colors';
import AppButton from '../AppButton';
const Timer = () => {
  const [time, setTime] = useState<null>(null);
  const [minutesCounter, setMinutesCounter] = useState<string>('00');
  const [isFinished, setIsFinished] = useState(true);
  const [secondsCounter, setSecondsCounter] = useState<string>('00');
  useEffect(() => {
    let timer = setInterval(() => {
      var num = (Number(secondsCounter) + 1).toString(),
        count = minutesCounter;
      if (Number(secondsCounter) == 59) {
        count = (Number(minutesCounter) + 1).toString();
        num = '00';
      }
      setMinutesCounter(count.length == 1 ? '0' + count : count);
      setSecondsCounter(num.length == 1 ? '0' + num : num);
    }, 1000);
    setTime(timer as any);
    return () => {
      clearInterval(timer);
    };
  }, [secondsCounter]);
  const onFinishTimer = () => {
    setTime(null);
    setSecondsCounter('00');
    setMinutesCounter('00');
    setIsFinished(false);
  };

  return (
    <View>
      {isFinished ? (
        <>
          <Text style={styles.timeCount}>
            {minutesCounter}:{secondsCounter}
          </Text>
          <Text style={styles.exeName}>Lung Jumps Atlernated</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={() => clearInterval(time)}>
              <Text style={{color: '#9662F1'}}>Pause</Text>
            </TouchableOpacity>
            <AppButton title="Finish" width={150} onPress={onFinishTimer} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.exeName}>Your exercise is completed</Text>
          <Text style={styles.exeName}>Thank You</Text>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  timeCount: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.WHITE,
    textAlign: 'center',
  },
  exeName: {
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: '500',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 50,
  },
  pauseButton: {
    borderColor: '#9662F1',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 150,
    alignItems: 'center',
  },
});
export default Timer;
