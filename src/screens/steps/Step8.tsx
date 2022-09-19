import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../constants/Colors';
import {IPropsSteps} from './Step1';
let selectedColors = ['#332B8A', '#905DE9'];
let defaultColors = ['#2D3450', '#2D3450'];
interface IActivities {
  name: string;
  icon?: any;
  isSelected?: boolean;
  id: string;
  color?: any;
}
const Step8 = ({onInputChanges}: IPropsSteps) => {
  const [selectedActivities, setSelectedActivities] = useState<IActivities[]>(
    [],
  );
  const [activities, setActivities] = useState<IActivities[]>([
  ]);

  useEffect(() => {
    firestore()
      .collection('Activities')
      .get()
      .then(res => {
        const fullData = res.docs.map(x => x.data());
        const newData = fullData[0].activities.map((x: any) => {
          return {
            ...x,
            icon: require('../../assets/images/yoga.png'),
            isSelected: false,
            color: defaultColors,
          };

        });
        setActivities(newData)
      });
  }, []);
  useEffect(() => {
    if (selectedActivities.length > 0) {
      onInputChanges({InterestedActivities: selectedActivities});
    }
  }, [selectedActivities]);

  const selectItem = (data: any) => {
    data.isSelected = !data.isSelected;
    data.color = data.isSelected ? selectedColors : defaultColors;
    let unique = activities.filter((item, i, ar) => ar.indexOf(item) === i);
    if (data.isSelected) {
      setSelectedActivities(prevState => {
        return [...prevState, {name: data?.name, id: data?.id}];
      });
    } else if (!data.isSelected) {
      const unSelectedData = selectedActivities.filter(x => x.id != data.id);
      setSelectedActivities(unSelectedData);
    }
    setActivities(unique);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.gender}>Choose activities</Text>
        <Text style={styles.gender}>that interest</Text>
        <FlatList
          data={activities}
          extraData={[]}
          keyExtractor={item => item.id.toString()}
          renderItem={({index, item}) => {
            return (
              <TouchableOpacity key={index} onPress={() => selectItem(item)}>
                <LinearGradient
                  start={{x: 1, y: 1}}
                  end={{x: 1, y: 0}}
                  colors={item?.color}
                  style={styles.listItem}>
                  <View style={styles.textAndIconWrapper}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <LinearGradient
                        start={{x: 1, y: 1}}
                        end={{x: 1, y: 0}}
                        colors={item.color}
                        style={styles.iconContainer}>
                        <Image source={item.icon} />
                      </LinearGradient>
                      <Text
                        style={{
                          color: Colors.WHITE,
                          marginLeft: 5,
                          fontSize: 16,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      {item.isSelected ? (
                        <Image
                          source={require('../../assets/images/checkbox.png')}
                          style={{height: 20, width: 20}}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/images/unchecked.png')}
                          style={{height: 20, width: 20}}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          }}
        />
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
    justifyContent: 'space-between',
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

export default Step8;
