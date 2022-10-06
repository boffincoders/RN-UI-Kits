import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../constants/Colors';
interface IButtonProps {
  title?: string;
  onPress?: () => void;
  width?: number | string;
  }
const AppButton = ({title, onPress, width}: IButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{y: 0.0, x: 0.0}}
        end={{y: 0.0, x: 2}}
        colors={['#9662F1', '#9662F1', '#9662F1', '#FFFFFF', '#9662F1']}
        style={[styles.container, {width: width}]}>
        <Text style={{color: 'white'}}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    color: Colors.WHITE,
    paddingVertical: 10,
  },
});
export default AppButton;
