import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import {ICategoriesExercises} from '../../screens/dashboard/categoriesExercises';
import AppButton from '../AppButton';
type ITimerProps = {
  data: ICategoriesExercises;
};
const Timer = ({data}: ITimerProps) => {
  const [exerciseData, setExerciseData] = useState<ITimerProps | undefined>({
    data,
  });
  const [time, setTime] = useState<null>(null);
  const [minutesCounter, setMinutesCounter] = useState<string>('00');
  const [buttonStatus, setButtonStatus] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState(true);
  const [secondsCounter, setSecondsCounter] = useState<string>('00');
  // let sets: any = [];
  // data.sets.map((x: any) => {
  //   return sets.push({...x, buttonStatus: false});
  // });

  console.log('hiii');

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
  }, []);
  const onFinishTimer = () => {
    setTime(null);
    setSecondsCounter('00');
    setMinutesCounter('00');
    setIsFinished(false);
  };

  const handleTime = (data: any, index: number) => {
    const resetData = exerciseData?.data.sets.map(x => {
      return {...x, buttonStatus: !data.buttonStatus};
    });
    // setExerciseData(pre => {
    //   return {...pre, resetData};
    // });
    // data.buttonStatus = !data.buttonStatus;
  };
  return (
    <View>
      <Text style={styles.exeName}>{data?.name}</Text>
      {exerciseData?.data?.sets?.map((set: any, index: number) => {
        return (
          <View style={styles.list} key={index}>
            <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
              <View style={{marginLeft: 11}}>
                {/* <Text style={{color: Colors.WHITE}}>{name}</Text> */}
                <Text style={styles.timeCount}>{set?.time}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleTime(set, index)}>
              <Text style={{color: '#9662F1', fontSize: 20}}>
                {set?.buttonStatus ? 'Stop' : 'Start'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {/* <Text style={styles.timeCount}>
          {minutesCounter}:{secondsCounter}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.pauseButton}
            onPress={() => clearInterval(time)}>
            <Text style={{color: '#9662F1'}}>Pause</Text>
          </TouchableOpacity>
          <AppButton title="Finish" width={150} onPress={onFinishTimer} />
        </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  timeCount: {
    fontSize: 29,
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
  list: {
    backgroundColor: '#2D3450',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    margin: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  restCircle: {
    borderColor: '#9662F1',
    borderWidth: 1.5,
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    justifyContent: 'center',
    // padding : 10,
    // margin : 5,
    alignItems: 'center',
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
