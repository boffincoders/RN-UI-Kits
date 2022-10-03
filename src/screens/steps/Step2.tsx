import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../constants/Colors';
import {SignUpInitialValueContext} from '../../contextAPI/UserSignupContext';
import {IPropsSteps} from './Step1';
import Spinner from 'react-native-loading-spinner-overlay/lib';
interface IMainGoals {
  name: string;
  id: string;
  image: string;
}
const Step2 = ({onInputChanges}: IPropsSteps) => {
  const [mainGoals, setMainGoals] = useState<IMainGoals[]>([]);
  const [listLoader, setListLoader] = useState<boolean>(false);
  const getMainGoals = async () => {
    setListLoader(true);
    firestore()
      .collection('MainGoals')
      .get()
      .then(response => {
        const data = response.docs.map(x => x.data());
        setMainGoals(data as IMainGoals[]);
      })
      .catch(err => console.log(err));
    setListLoader(false);
  };
  const [selectedList, setSelectedList] = useState<string>(
    mainGoals[0]?.name.toString()
  );
  const {setSignUpdata, signUpdata} = useContext(SignUpInitialValueContext);
  useEffect(() => {
    getMainGoals();
    setSignUpdata({...signUpdata, mainGoal: selectedList});
  }, []);
  const onMainGoal = (name: string) => {
    console.log(name,"name");
    
    setSelectedList(name);
    setSignUpdata({
      ...signUpdata,
      mainGoal: name,
    });
    onInputChanges({mainGoal: name});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.listContainer}>
          <Spinner
            visible={listLoader}
            textStyle={{color: Colors.WHITE}}
            textContent={'Loading...'}
            customIndicator={<ActivityIndicator color={'#9662F1'} size="large"/>}
          />
          <Text style={styles.gender}>Choose main goal</Text>
          {!listLoader &&
            mainGoals.map((x, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => onMainGoal(x.name)}>
                  <LinearGradient
                    start={{x: 1, y: 1}}
                    end={{x: 1, y: 0}}
                    colors={
                      selectedList === x.name
                        ? ['#332B8A', '#905DE9']
                        : ['#2D3450', '#2D3450']
                    }
                    style={styles.listItem}>
                    <View style={styles.textAndIconWrapper}>
                      <LinearGradient
                        start={{x: 1, y: 1}}
                        end={{x: 1, y: 0}}
                        colors={
                          selectedList === x.name
                            ? ['#332B8A', '#905DE9']
                            : ['#2D3450', '#2D3450']
                        }
                        style={styles.iconContainer}>
                        <Image
                          style={{width: 30, height: 30}}
                          source={{
                            uri: x.image,
                          }}
                        />
                      </LinearGradient>
                      <Text
                        style={{
                          color: Colors.WHITE,
                          marginLeft: 5,
                          fontSize: 16,
                        }}>
                        {x.name}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
        </View>
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

export default Step2;
