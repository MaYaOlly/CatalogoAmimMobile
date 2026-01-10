import React, { useRef, useState } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';

type Props = {
  label: string;
};

export function FloatingInput({ label }: Props) {
  const [value, setValue] = useState('');
  const animated = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      Animated.timing(animated, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    top: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -1],
    }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {label}
      </Animated.Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginVertical: 6,
  },
  label: {
    position: 'absolute',
    left: 20,
    color: '#a3214d',
    fontWeight: 'bold',
    
    paddingHorizontal: 6,
    zIndex: 1,
  },
  input: {
    height: 65,
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    paddingHorizontal: 20,
    color: '#a3214d',
    fontWeight: 'bold',
  },
});
