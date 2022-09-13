import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppButton from '../../components/AppButton';
import {Colors} from '../../constants/Colors';
let tag1 = ['Beginner', 'Legs', 'Arms', 'Yoga'];
let tag2 = ['Boxing', 'Running', 'Personal'];

const exercises = [
  {name: 'Core Control', time: '32 min'},
  {name: 'Full Body Fast', time: '32 min'},
  {name: 'Express Tabata', time: '32 min'},
  {name: 'Bodyweight Stretch', time: '32 min'},
  {name: 'Glutes & Abs', time: '32 min'},
  {name: 'Interval Pilates', time: '32 min'},
];

const Trainings = () => {
  const [selectedTag, setSelectedTag] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<number>(0);
  const [selectedEquipment, setSelectedEquipment] = useState<number>(0);
  const bottomSheetRef = useRef<RBSheet | null>(null);
  const [tags] = useState([
    'ClearAll',
    'Beginner',
    'Beginner',
    'Beginner',
    'Beginner',
  ]);

  const [prices] = useState(['Free', 'Preminum']);
  const [levels] = useState(['Beginner', 'Medium', 'Advanced']);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [duration] = useState(['10-20 min', '20-30 min', '30-40 min']);
  const [equipment] = useState(['Kettlebell', 'Dumbbells', 'Yoga mat']);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.user}>Trainings</Text>
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#332B8A', '#905DE9']}
          style={styles.iconContainer}>
          <TouchableOpacity onPress={() => bottomSheetRef.current?.open()}>
            <Image source={require('../../assets/images/filter.png')} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tags.map((x, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedTag(index)}>
                <LinearGradient
                  style={styles.tags}
                  start={{x: 1, y: 1}}
                  end={{x: 1, y: 0}}
                  colors={
                    selectedTag === index
                      ? ['#332B8A', '#905DE9']
                      : ['#2D3450', '#2D3450', '#2D3450']
                  }>
                  <Text style={styles.tagText}>{x}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <LinearGradient
              style={styles.training}
              start={{x: 1, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#332B8A', '#905DE9']}>
              <View style={styles.subContainer}>
                <View>
                  <Text style={styles.trainingText}>Create Personal</Text>
                  <Text style={styles.trainingText}>Training</Text>
                </View>

                <Image
                  style={{height: 60, width: 90}}
                  source={require('../../assets/images/Vector.png')}
                />
              </View>
            </LinearGradient>
          </View>
          <FlatList
            data={exercises}
            numColumns={2}
            key={2}
            renderItem={({item, index}) => {
              return (
                <View style={{flex: 1}}>
                  <View style={styles.box}>
                    <Image
                      source={require('../../assets/images/Vector.png')}
                      style={{height: 40, width: 60}}
                    />
                  </View>
                  <View style={{paddingHorizontal: 5}}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <View style={styles.boxFooterText}>
                      <Text style={{fontSize: 12, color: '#9662F1'}}>
                        Beginner
                      </Text>
                      <Text style={styles.footerTextItem}>.</Text>
                      <Text style={styles.footerTextItem}>{item.time}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
      <View style={{marginTop: 20}}>
        <RBSheet
          ref={bottomSheetRef}
          openDuration={250}
          customStyles={{
            container: {
              // flex: 1,
              height: '100%',
              marginTop: 50,
              backgroundColor: '#222332',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}>
          <View>
            <View style={styles.closeIcon}>
              <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                <Image source={require('../../assets/images/close.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.filter}>Filters</Text>
            <View style={{marginTop: 25}}>
              <Text style={styles.subHeadingText}>Category</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                {tag1.map((x: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedCategory(index)}>
                      <LinearGradient
                        style={styles.tags}
                        start={{x: 1, y: 1}}
                        end={{x: 1, y: 0}}
                        colors={
                          selectedCategory === index
                            ? ['#332B8A', '#905DE9']
                            : ['#2D3450', '#2D3450', '#2D3450']
                        }>
                        <Text style={styles.tagText}>{x}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                {tag2.map((x: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedTag(index)}>
                      <LinearGradient
                        style={styles.tags}
                        start={{x: 1, y: 1}}
                        end={{x: 1, y: 0}}
                        colors={
                          selectedTag === index
                            ? ['#332B8A', '#905DE9']
                            : ['#2D3450', '#2D3450', '#2D3450']
                        }>
                        <Text style={styles.tagText}>{x}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={{marginTop: 25}}>
              <Text style={styles.subHeadingText}>Price</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                {prices.map((x: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedPrice(index)}>
                      <LinearGradient
                        style={styles.tags}
                        start={{x: 1, y: 1}}
                        end={{x: 1, y: 0}}
                        colors={
                          selectedPrice === index
                            ? ['#332B8A', '#905DE9']
                            : ['#2D3450', '#2D3450', '#2D3450']
                        }>
                        <Text style={styles.tagText}>{x}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={{marginTop: 25}}>
              <Text style={styles.subHeadingText}>Levels</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                {levels.map((x: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedLevel(index)}>
                      <LinearGradient
                        style={styles.tags}
                        start={{x: 1, y: 1}}
                        end={{x: 1, y: 0}}
                        colors={
                          selectedLevel === index
                            ? ['#332B8A', '#905DE9']
                            : ['#2D3450', '#2D3450', '#2D3450']
                        }>
                        <Text style={styles.tagText}>{x}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={{marginTop: 25}}>
              <Text style={styles.subHeadingText}>Duration</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                {duration.map((x: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedDuration(index)}>
                      <LinearGradient
                        style={styles.tags}
                        start={{x: 1, y: 1}}
                        end={{x: 1, y: 0}}
                        colors={
                          selectedDuration === index
                            ? ['#332B8A', '#905DE9']
                            : ['#2D3450', '#2D3450', '#2D3450']
                        }>
                        <Text style={styles.tagText}>{x}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={{marginTop: 25}}>
              <Text style={styles.subHeadingText}>Equipment</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                {equipment.map((x: any, index: number) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedEquipment(index)}>
                      <LinearGradient
                        style={styles.tags}
                        start={{x: 1, y: 1}}
                        end={{x: 1, y: 0}}
                        colors={
                          selectedEquipment === index
                            ? ['#332B8A', '#905DE9']
                            : ['#2D3450', '#2D3450', '#2D3450']
                        }>
                        <Text style={styles.tagText}>{x}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.resetBtn}>
                <Text style={styles.resetBtnText}>Reset</Text>
              </TouchableOpacity>
              <AppButton title="Apply" width={130} />
            </View>
          </View>
        </RBSheet>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222332',
  },
  tags: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  tagText: {
    color: Colors.WHITE,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  iconContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  user: {
    fontSize: 27,
    color: Colors.WHITE,
    fontWeight: '500',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  box: {
    backgroundColor: '#CAD0D8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    marginTop: 20,
    borderRadius: 10,
    margin: 10,
  },
  titleText: {
    color: Colors.WHITE,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  boxFooterText: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  footerTextItem: {
    color: Colors.WHITE,
    fontSize: 12,
  },
  training: {
    // width: '100%',
    borderRadius: 10,
  },
  trainingText: {fontSize: 20, color: Colors.WHITE, fontWeight: '400'},
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  filter: {
    paddingHorizontal: 15,
    color: Colors.WHITE,
    fontSize: 20,
    fontWeight: '500',
  },
  subHeadingText: {
    paddingHorizontal: 15,
    color: Colors.WHITE,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    position : 'absolute',
    // top : 0, 
    bottom : -100  ,
    paddingHorizontal: 15,
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: '#9662F1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 130,
  },
  resetBtnText: {
    color: '#9662F1',
    textAlign: 'center',
  },
});

export default Trainings;
