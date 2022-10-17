import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
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
import Toast from 'react-native-simple-toast';
interface ITimerProps {
  data: IExerciseSchedule;
  categoryId: string;
}
export interface IExerciseSchedule {
  id?: string;
  name?: string;
  totalSets?: number;
  image?: string;
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
  const [exerciseSchedule, setExerciseSchedule] = useState<IExerciseSchedule>();
  const [timer, setTimer] = useState<any>(null);
  const [isFinishModal, setIsFinishModal] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [finishLoader, setFinishLoader] = useState<boolean>(false);
  const [minutesCounter, setMinutesCounter] = useState<string>('00');
  const [secondsCounter, setSecondsCounter] = useState<string>('00');
  const [clickedTime, setClickedTime] = useState<{
    time: string;
    buttonStatus: boolean;
    index: number;
    name: string;
  }>();
  useEffect(() => {
    {
      (async () => {
        setLoader(true);
        if (categoryId) {
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
        } else {
          const formattedData = {
            ...data,
            sets: data?.data?.sets?.map((x: any, index: number) => {
              return {
                ...x,
                buttonStatus: false,
                isDisabled: index > 0 ? true : false,
              };
            }),
          };
          setExerciseData(formattedData);
        }
        setLoader(false);
      })();
    }
  }, [exercises.id]);
  const getCurrentUser = async () => {
    const user: IUserType = await getStoredData('currentUser');
    if (user) {
      setExerciseSchedule({
        user_id: user?.user_id ?? '',
        email: user?.email ?? '',
        name: exercises.name ?? '',
        id: exercises.id,
        totalSets: exercises.sets?.length,
        sets: [{timeConsuming: '', duration: ''}],
        createdAt: new Date().toString(),
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
    setIsDisabled(true);
    setClickedTime({...data, index: index});
    const resetData = exerciseData?.sets?.map((x: any, i: number) => {
      let obj = {...x};
      if (index === i) obj.buttonStatus = !data.buttonStatus;
      return obj;
    });
    setExerciseData({...exerciseData.data, sets: resetData});
    handleTimeInterval();
    index === 0 &&
      Toast.showWithGravity(
        `You can stop your set time 
        after half time of your exercise set.`,
        Toast.LONG,
        Toast.TOP,
      );
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
    setIsDisabled(false);
    clearInterval(timer);
    setTimer(null);
    // setMinutesCounter(() => '00');
    // setSecondsCounter(() => '00');
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
    setIsDisabled(false);
    clearInterval(timer);
    setTimer(null);
    setMinutesCounter(() => '00');
    setSecondsCounter(() => '00');
  };
  const onSubmitSchedule = async () => {
    setFinishLoader(true);
    await firestore()
      .collection('UserExerciseSchedule')
      .add(exerciseSchedule ?? [])
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    setFinishLoader(false);
    setIsFinishModal(false);
    resetSets();
  };
  const checkTimeAndBeep = (
    index: number,
    counter: string,
    givenTime: number,
  ) => {
    if (index === clickedTime?.index && Number(counter) > Number(givenTime)) {
      if (Platform.OS === 'ios') {
        return true;
      } else {
        RNBeep?.PlaySysSound(RNBeep.AndroidSoundIDs.TONE_CDMA_ABBR_ALERT);
      }
      return true;
    } else return false;
  };
  return (
    <View>
      {loader || finishLoader ? (
        <Spinner
          visible={loader || finishLoader}
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
            let variations = givenTime / 2;
            return (
              <View
                style={[
                  styles.list,
                  {backgroundColor: set?.isDisabled ? '#C0C0C0' : '#2D3450'},
                ]}
                key={index}>
                <View style={{flexDirection: 'row'}}>
                  <View>
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
                        : index === clickedTime?.index
                        ? `${minutesCounter}:${secondsCounter}`
                        : '00:00'}
                    </Text>
                    <View>
                      <Text style={{color: 'white' ,fontFamily : "Poppins-Regular"}}>
                        {`duration ${set.time}`}
                      </Text>
                    </View>
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
                    disabled={
                      Number(counter) > Number(variations)
                        ? false
                        : true && isDisabled
                        ? true
                        : false
                    }>
                    <Text
                      style={{
                        color:
                          Number(counter) > Number(variations)
                            ? '#9662F1'
                            : '#C0C0C0' && isDisabled
                            ? '#C0C0C0'
                            : '#9662F1',
                        fontSize: 20,
                        fontFamily : "Poppins-Regular"
                      }}>
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
                <Text style={{fontSize: 20, color: '#f93154',fontFamily : "Poppins-Regular"}}>Yes</Text>
              </TouchableOpacity>

              <Text>{" "}</Text>
              <TouchableOpacity onPress={() => setIsFinishModal(false)}>
                <Text style={{fontSize: 20, color: '#9662F1',fontFamily : "Poppins-Regular"}}>No</Text>
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
    fontFamily : "Poppins-Regular"
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
    fontFamily : "Poppins-Regular"
  },
  finishButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily : "Poppins-Regular"
  },
  resetButtonText: {
    color: '#9662F1',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily : "Poppins-Regular"
  },
  exeName: {
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily : "Poppins-Regular"
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});
export default Timer;
