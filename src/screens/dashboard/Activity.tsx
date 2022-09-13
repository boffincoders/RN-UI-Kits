import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LineChart} from 'react-native-chart-kit'
import {Colors} from '../../constants/Colors';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import FitChart from '../../components/charts/fitChart';
interface IDates {
  date: string;
  month: string;
}
const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      strokeWidth: 2, // optional
    },
  ],
};
const Activity = () => {
  const [allDates, setAllDates] = useState<IDates[]>([]);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const now = new Date();
  const currentDate = new Date();
  const getAllDatesCurrentMonth = () => {
    const date = new Date(now.getFullYear(), currentDate.getMonth(), 1);
    const dates = [];
    while (date.getMonth() === currentDate.getMonth()) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    const currentMonthsAllDates = dates.map(x => {
      const splitString = moment(x).format('DD-MMM').toString().split('-');
      const date = splitString[0];
      const month = splitString[1];
      return {date: date, month: month};
    });
    setAllDates(currentMonthsAllDates);
  };

  useEffect(() => {
    getAllDatesCurrentMonth();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.user}>Activity</Text>
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#332B8A', '#905DE9']}
          style={styles.iconContainer}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/a1.png')} />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled={false}>
          {allDates.map((x, i) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDate(i)} key={i}>
                <LinearGradient
                  start={{x: 1, y: 1}}
                  end={{x: 1, y: 0}}
                  colors={
                    selectedDate === i
                      ? ['#332B8A', '#905DE9']
                      : ['#2D3450', '#2D3450']
                  }
                  style={styles.iconContainer}>
                  <Text style={{color: Colors.WHITE, fontSize: 20}}>
                    {x.date}
                  </Text>
                  <Text style={{color: Colors.WHITE, fontSize: 12}}>
                    {x.month.toUpperCase()}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {/* <View > */}
      <ScrollView>
        <View style={{flex: 1}}>
          <Grid style={{marginTop: 10}}>
            <Col size={2} style={{paddingHorizontal: 5}}>
              <Row style={{height: '40%'}}>
                <LinearGradient
                  colors={['#332B8A', '#905DE9']}
                  style={{flex: 1, alignItems: 'center', borderRadius: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: Colors.WHITE, fontSize: 14}}>
                      Steps
                    </Text>
                    <LinearGradient
                      colors={['#332B8A', '#905DE9']}
                      style={{padding: 5, borderRadius: 10}}>
                      <Image source={require('../../assets/images/shoe.png')} />
                    </LinearGradient>
                  </View>
                  <AnimatedCircularProgress
                    size={100}
                    width={8}
                    fill={75}
                    tintColorSecondary="#332B8A"
                    tintColor="#332B8A"
                    backgroundColor="#905DE9"
                    style={{marginTop: 30}}>
                    {fill => (
                      <View>
                        <Text
                          style={{
                            color: Colors.WHITE,
                            fontSize: 28,
                            fontWeight: '700',
                          }}>{`${fill}`}</Text>
                        <Text
                          style={{color: Colors.WHITE, alignSelf: 'center'}}>
                          Steps
                        </Text>
                      </View>
                    )}
                  </AnimatedCircularProgress>
                </LinearGradient>
              </Row>
              <Row style={{marginTop: 10, height: '20%'}}>
                <LinearGradient
                  colors={['#332B8A', '#905DE9']}
                  style={{flex: 1, alignItems: 'center', borderRadius: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      width: '100%',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: Colors.WHITE, fontSize: 14}}>
                      Training
                    </Text>
                    <LinearGradient
                      colors={['#332B8A', '#905DE9']}
                      style={{padding: 5, borderRadius: 10}}>
                      <Image
                        source={require('../../assets/images/muscle.png')}
                      />
                    </LinearGradient>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: Colors.WHITE, fontSize: 20}}>120</Text>
                    <Text style={{color: Colors.WHITE, marginLeft: 4}}>
                      minutes
                    </Text>
                  </View>
                </LinearGradient>
              </Row>
              <Row style={{marginTop: 10, marginBottom: 10, height: '45%'}}>
                <LinearGradient
                  colors={['#332B8A', '#905DE9']}
                  style={{flex: 1, alignItems: 'center', borderRadius: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      width: '100%',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: Colors.WHITE, fontSize: 14}}>
                      Sleep
                    </Text>
                    <LinearGradient
                      colors={['#332B8A', '#905DE9']}
                      style={{padding: 5, borderRadius: 10}}>
                      <Image
                        source={require('../../assets/images/sleep.png')}
                      />
                    </LinearGradient>
                  </View>
                  {/* <AnimatedCircularProgress
                    size={100}
                    width={8}
                    fill={75}
                    tintColorSecondary="#332B8A"
                    tintColor="#332B8A"
                    backgroundColor="#905DE9"
                    style={{marginTop: 30}}>
                    {fill => (
                      <View>
                        <Text
                          style={{
                            color: Colors.WHITE,
                            fontSize: 28,
                            fontWeight: '700',
                          }}>{`${fill}`}</Text>
                        <Text
                          style={{color: Colors.WHITE, alignSelf: 'center'}}>
                          Steps
                        </Text>
                      </View>
                    )}
                  </AnimatedCircularProgress> */}
                  {/* <View style={{height : "20%" , width : "20%"}}> */}

                  <FitChart
          title={"Sleep"}
          description={"7h 48m • Yesterday"}
          data={line}
          baseline={8}
        />
                  {/* </View> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: Colors.WHITE, fontSize: 20}}>7.5</Text>
                    <Text style={{color: Colors.WHITE, marginLeft: 4}}>
                      hourse
                    </Text>
                  </View>
                </LinearGradient>
              </Row>
            </Col>
            <Col size={2} style={{paddingHorizontal: 5}}>
              <Row style={{height: '40%'}}>
                <LinearGradient
                  colors={['#332B8A', '#905DE9']}
                  style={{flex: 1, alignItems: 'center', borderRadius: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      width: '100%',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: Colors.WHITE}}>Heart rate</Text>
                    <LinearGradient
                      colors={['#332B8A', '#905DE9']}
                      style={{padding: 5, borderRadius: 10}}>
                      <Image
                        source={require('../../assets/images/heart.png')}
                      />
                    </LinearGradient>
                  </View>
                  {/* <AnimatedCircularProgress
                    size={100}
                    width={8}
                    fill={75}
                    tintColorSecondary="#332B8A"
                    tintColor="#332B8A"
                    backgroundColor="#905DE9"
                    style={{marginTop: 30}}>
                    {fill => (
                      <View>
                        <Text
                          style={{
                            color: Colors.WHITE,
                            fontSize: 28,
                            fontWeight: '700',
                          }}>{`${fill}`}</Text>
                        <Text
                          style={{color: Colors.WHITE, alignSelf: 'center'}}>
                          Steps
                        </Text>
                      </View>
                    )}
                  </AnimatedCircularProgress> */}
              <LineChart
    data={line}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    yAxisLabel={'$'}
    
    chartConfig={{
      // backgroundColor: '#e26a00',
      // backgroundGradientFrom: '#fb8c00',
      // backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        // borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      // borderRadius: 16
    }}
  />
                </LinearGradient>
              </Row>
              <Row style={{height: '43%', marginTop: 10}}>
                <LinearGradient
                  colors={['#332B8A', '#905DE9']}
                  style={{flex: 1, alignItems: 'center', borderRadius: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      width: '100%',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: Colors.WHITE, fontSize: 14}}>
                      Calories
                    </Text>
                    <LinearGradient
                      colors={['#332B8A', '#905DE9']}
                      style={{padding: 5, borderRadius: 10}}>
                      <Image source={require('../../assets/images/fire.png')} />
                    </LinearGradient>
                  </View>
                  <AnimatedCircularProgress
                    size={100}
                    width={8}
                    fill={75}
                    tintColorSecondary="#332B8A"
                    tintColor="#332B8A"
                    backgroundColor="#905DE9"
                    style={{marginTop: 30}}>
                    {fill => (
                      <View>
                        <Text
                          style={{
                            color: Colors.WHITE,
                            fontSize: 28,
                            fontWeight: '700',
                          }}>{`${fill}`}</Text>
                        <Text
                          style={{color: Colors.WHITE, alignSelf: 'center'}}>
                          KCal
                        </Text>
                      </View>
                    )}
                  </AnimatedCircularProgress>
                </LinearGradient>
              </Row>
              <Row style={{marginTop: 10, marginBottom: 10, height: '22%'}}>
                <LinearGradient
                  colors={['#332B8A', '#905DE9']}
                  style={{flex: 1, alignItems: 'center', borderRadius: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      width: '100%',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    <Text style={{color: Colors.WHITE, fontSize: 14}}>
                      Distance
                    </Text>
                    <LinearGradient
                      colors={['#332B8A', '#905DE9']}
                      style={{padding: 5, borderRadius: 10}}>
                      <Image source={require('../../assets/images/car.png')} />
                    </LinearGradient>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      alignSelf: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: Colors.WHITE, fontSize: 20}}>55</Text>
                    <Text style={{color: Colors.WHITE, marginLeft: 4}}>
                      minutes
                    </Text>
                  </View>
                </LinearGradient>
              </Row>
            </Col>
          </Grid>
        </View>
      </ScrollView>

      {/* </View> */}
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
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  Cell_1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6D00',
  },
  Cell_2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E2723',
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default Activity;
