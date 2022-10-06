import React, { useEffect } from 'react';
import {TextInput, TextInputProps} from 'react-native';

const AppInput = ({
  placeholder,
  style,
  placeholderTextColor,
  onChangeText,
  value,
  secureTextEntry,
  autoCapitalize
}: TextInputProps) => {
  useEffect(()=>{
 
  },[value])
  
  return (
    <TextInput
      placeholder={placeholder}
      value={value?.toString()}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={style}
      autoCapitalize={"none"}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

export default AppInput;
