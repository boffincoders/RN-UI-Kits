import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

const AppInput = ({
  placeholder,
  style,
  placeholderTextColor,
  onChangeText,
  value,
  secureTextEntry
 
}: TextInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={style}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

export default AppInput;
