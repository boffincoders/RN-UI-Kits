import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import {Colors} from '../../../constants/Colors';
interface IProps {
  parentProps: BottomTabBarProps;
}
const BottomTabBar = (props: IProps) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {props.parentProps.state.routes.map((route, index) => {
        const {options} = props.parentProps.descriptors[route.key];
        let label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        let isFocused = props.parentProps.state.index === index;

        const onPress = () => {
          const event = props.parentProps.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            props.parentProps.navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          props.parentProps.navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <React.Fragment key={index}>
            {label === 'ViewAllCategory' ||
            label === 'WorkoutDetails' ||
            label === 'StartWorkout' ||
            label === 'ViewAllExercise' ||
            label === 'AccountInformation' ||
            label === 'CategoriesExercises' ? null : (
              <View style={styles.container}>
                <TouchableOpacity
                  accessibilityRole="image"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}>
                  <View style={styles.lableContainer}>
                    <Image
                      style={{
                        tintColor: isFocused ? '#673ab7' : Colors.WHITE,
                      }}
                      source={
                        label == 'Home'
                          ? require('../../../assets/images/home.png')
                          : label == 'Training'
                          ? require('../../../assets/images/training.png')
                          : label == 'Activity'
                          ? require('../../../assets/images/activity.png')
                          : label == 'Profile'
                          ? require('../../../assets/images/user.png')
                          : null
                      }
                    />
                    <Text
                      style={[
                        styles.labelText,
                        {
                          color: isFocused ? '#673ab7' : Colors.WHITE,
                        },
                      ]}>
                      {label as any}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#2D3450',
  },
  lableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    alignItems: 'center',
    marginTop: 6,
  },
});

export default BottomTabBar;
