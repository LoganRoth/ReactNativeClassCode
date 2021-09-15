import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { colours } from './src/utils/colors';
import { spacingSizes } from './src/utils/sizes';

export default function App() {
  const [focusSubject, setFocusSubject] = useState('Gardening');

  const onTimerEnd = () => {
    setFocusSubject(null);
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer task={focusSubject} onTimerEnd={onTimerEnd} />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.darkBlue,
    paddingTop: Platform.OS === 'ios' ? spacingSizes.xxxl : spacingSizes.lg,
  },
});
