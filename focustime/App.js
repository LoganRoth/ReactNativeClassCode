import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { colours } from './src/utils/colors';
import { spacingSizes } from './src/utils/sizes';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  useEffect(() => {
    if (focusSubject) {
      setFocusHistory([...focusHistory, focusSubject]);
    }
  }, [focusSubject]);

  const onTimerEnd = () => {
    addFocusHistoryWithStatus(focusSubject, STATUSES.COMPLETE);
    setFocusSubject(null);
  };

  const onCancel = () => {
    addFocusHistoryWithStatus(focusSubject, STATUSES.CANCELLED);
    setFocusSubject(null);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([{ key: String(focusHistory.length + 1), subject, status }, ...focusHistory]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  useEffect(() => {
    loadFocusHistory();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          task={focusSubject}
          onTimerEnd={onTimerEnd}
          onCancel={onCancel}
        />
      ) : (
        <View style={styles.simpleContainer}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory history={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  simpleContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colours.darkBlue,
    paddingTop: Platform.OS === 'ios' ? spacingSizes.xxxl : spacingSizes.lg,
  },
});
