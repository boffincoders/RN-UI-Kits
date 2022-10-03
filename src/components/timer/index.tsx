import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import firestore from '@react-native-firebase/firestore';
import {ICategoriesExercises} from '../../screens/dashboard/categoriesExercises';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import {IUserType} from '../../screens/dashboard';
import {getStoredData} from '../../storage';
import RNBeep from 'react-native-a-beep';
interface ITimerProps {
  data: ICategoriesExercises;
  categoryId: string;
}
interface IExerciseSchedule {
  id?: string;
  name?: string;
  totalSets?: number;
  sets?: [
    {
      name?: string;
      duration?: string;
      timeConsuming?: string;
    },
  ];
  user_id?: string;
  email?: string;
  createdAt?: string;
}
const Timer = (data: ITimerProps) => {
  const exercises = data?.data;
  const categoryId = data?.categoryId;
  const [exerciseData, setExerciseData] = useState<any>();
  const [timer, setTimer] = useState<any>(null);
  const [isFinishModal, setIsFinishModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [minutesCounter, setMinutesCounter] = useState<string>('00');
  const [secondsCounter, setSecondsCounter] = useState<string>('00');
  const [clickedTime, setClickedTime] = useState<{
    time: string;
    buttonStatus: boolean;
    index: number;
    name: string;
  }>();
  const [exerciseSchedule, setExerciseSchedule] = useState<IExerciseSchedule>();
  useEffect(() => {
    {
      (async () => {
        setLoader(true);
        await firestore()
          .collection(`Categories/${categoryId}/Exercises`)
          .doc(exercises?.id)
          .get()
          .then(res => {
            const formattedData = {
              ...res.data(),
              sets: res?.data()?.sets?.map((x: any, index: number) => {
                return {
                  ...x,
                  buttonStatus: false,
                  isDisabled: index > 0 ? true : false,
                };
              }),
            };
            setExerciseData(formattedData);
          })
          .catch(err => {
            console.log(err, 'error on fetching exercises');
          });
        setLoader(false);
      })();
    }
  }, [exercises.id]);
  const getCurrentUser = async () => {
    const user: IUserType = await getStoredData('currentUser');
    if (user) {
      setExerciseSchedule({
        user_id: user?.user_id!,
        email: user?.email!,
        name: exercises.name!,
        id: exercises.id,
        totalSets: exercises.sets?.length,
      });
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  const handleTimeInterval = () => {
    let second = secondsCounter;
    let mint = minutesCounter;
    let _timer = setInterval(() => {
      second = (Number(second) + 1).toString();
      mint = mint;
      if (Number(second) == 59) {
        mint = (Number(mint) + 1).toString();
        second = '00';
      }
      if (mint !== minutesCounter)
        setMinutesCounter(() => (mint.length == 1 ? '0' + mint : mint));
      if (second !== secondsCounter)
        setSecondsCounter(() => (second.length == 1 ? '0' + second : second));
    }, 1000);
    if (!timer) setTimer(_timer);
  };
  const handleTime = (data: any, index: number) => {
    setClickedTime({...data, index: index});
    const resetData = exerciseData?.sets?.map((x: any, i: number) => {
      let obj = {...x};
      if (index === i) obj.buttonStatus = !data.buttonStatus;
      return obj;
    });
    setExerciseData({...exerciseData.data, sets: resetData});
    handleTimeInterval();
  };
  const handleClearInterval = (data: any, index: number) => {
    let sets: any = [];
    setExerciseData((prevState: any) => {
      prevState.sets[index].buttonStatus = !data.buttonStatus;
      prevState.sets[index].isDisabled = true;
      if (
        index !== undefined &&
        prevState?.sets[index + 1]?.isDisabled !== undefined
      ) {
        prevState.sets[index + 1].isDisabled = false;
      }
      return prevState;
    });

    sets.push({
      duration: data.time,
      timeConsuming: `${minutesCounter}:${secondsCounter}`,
    }),
      setExerciseSchedule(preData => {
        return {...preData, sets: sets, createdAt: new Date().toString()};
      });
    clearInterval(timer);
    setTimer(null);
    setMinutesCounter(() => '00');
    setSecondsCounter(() => '00');
  };

  const resetSets = () => {
    const resetState = {
      ...exerciseData,
      sets: exerciseData?.sets?.map((x: any, index: number) => {
        return {
          ...x,
          buttonStatus: false,
          isDisabled: index > 0 ? true : false,
        };
      }),
    };
    setExerciseData(resetState);
  };

  const onSubmitSchedule = async () => {
    await firestore()
      .collection('UserExerciseSchedule')
      .add(exerciseSchedule!)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const checkTimeAndBeep = (
    index: number,
    counter: string,
    givenTime: number,
  ) => {
    if (index === clickedTime?.index && Number(counter) > Number(givenTime)) {
      RNBeep.PlaySysSound(RNBeep.AndroidSoundIDs.TONE_CDMA_ABBR_ALERT);
      return true;
    } else return false;
  };
  return (
    <View>
      {loader ? (
        <Spinner
          visible={loader}
          textStyle={{color: Colors.WHITE}}
          textContent={'Loading...'}
          overlayColor={'#222332'}
          customIndicator={<ActivityIndicator color={'#9662F1'} size="large" />}
        />
      ) : (
        <View>
          <Text style={styles.exeName}>{data?.data?.name}</Text>
          {exerciseData?.sets?.map((set: any, index: number) => {
            const counter = minutesCounter.concat(secondsCounter);
            const setTime = set.time.split(':');
            let givenTime = setTime[1].concat(setTime[2]);
            return (
              <View
                style={[
                  styles.list,
                  {backgroundColor: set?.isDisabled ? '#dddddd' : '#2D3450'},
                ]}
                key={index}>
                <View style={{flexDirection: 'row', paddingHorizontal: 2}}>
                  <View style={{marginLeft: 1}}>
                    <Text
                      style={[
                        styles.timeCount,
                        {
                          color: checkTimeAndBeep(index, counter, givenTime)
                            ? '#f93154'
                            : 'white',
                        },
                      ]}>
                      {set.buttonStatus
                        ? `${minutesCounter}:${secondsCounter}`
                        : '00:00'}
                    </Text>
                    <Text style={{color: 'white', paddingHorizontal: 1}}>
                      {`d ${set.time}`}
                    </Text>
                  </View>
                </View>
                {set?.isDisabled ? (
                  <View></View>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      set?.buttonStatus
                        ? handleClearInterval(set, index)
                        : handleTime(set, index)
                    }
                    disabled={set?.isDisabled ? true : false}>
                    <Text style={{color: '#9662F1', fontSize: 20}}>
                      {set?.buttonStatus ? 'Stop' : 'Start'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
          <View style={styles.footerButtonContainer}>
            <TouchableOpacity
              onPress={() => setIsFinishModal(true)}
              style={styles.finishButton}>
              <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetSets} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View>
        <Modal isVisible={isFinishModal}>
          <View style={styles.content}>
            {exerciseData?.sets?.some((x: any) => !x.isDisabled) ? (
              <>
                <Text style={styles.contentTitle}>
                  Are you sure you want to finish
                </Text>
                <Text style={styles.contentTitle}>
                  exercise in between sets?
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.contentTitle}>
                  Are you sure you want to finish the
                </Text>
                <Text style={styles.contentTitle}>exercise?</Text>
              </>
            )}
            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={onSubmitSchedule}>
                <Text style={{fontSize: 20, color: '#f93154'}}>Yes</Text>
              </TouchableOpacity>

              <Text> </Text>
              <TouchableOpacity onPress={() => setIsFinishModal(false)}>
                <Text style={{fontSize: 20, color: '#9662F1'}}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,

    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 16,
    // marginBottom: 12,
  },
  finishButton: {
    backgroundColor: '#f93154',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 100,
    borderRadius: 20,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#9662F1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 100,
    borderRadius: 20,
  },
  timeCount: {
    fontSize: 29,
    fontWeight: '700',
    color: Colors.WHITE,
    textAlign: 'center',
  },
  finishButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  resetButtonText: {
    color: '#9662F1',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
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
  footerButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  modalFooter: {
    flexDirection: 'row',
    // alignSelf: 'flex-end',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});
export default Timer;
