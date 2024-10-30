import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../config';

type ButtonProps = {
  onButtonPress: () => void;
  text: string;
};

const Button: React.FC<ButtonProps> = ({onButtonPress, text}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onButtonPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '34%',
    backgroundColor: COLORS.submit,
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
