import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Timing } from './Timing';
import { CountdownTimer } from '../../components/CountdownTimer';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacingSizes } from '../../utils/sizes';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;

export const Timer = ({ task, onTimerEnd }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const platform_vibrate = () => {
    if (Platform.OS === 'ios') {
      const intval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(intval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsRunning(false);
    platform_vibrate();
    onTimerEnd()
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <CountdownTimer
          minutes={minutes}
          isRunning={isRunning}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.focusInfo}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{task}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          color="#5e84e2"
          style={styles.progressBar}
          progress={progress}
        />
      </View>
      <View style={styles.timingButtonsContainer}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.controlButtonContainer}>
        <RoundedButton
          title={isRunning ? 'Pause' : 'Start'}
          onPress={() => setIsRunning(!isRunning)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  focusInfo: {
    paddingTop: spacingSizes.xxxl,
  },
  title: {
    fontSize: fontSizes.lg,
    color: 'white',
    textAlign: 'center',
  },
  task: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  timerContainer: {
    paddingTop: spacingSizes.xxxl,
    alignItems: 'center',
  },
  controlButtonContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacingSizes.xxl,
  },
  timingButtonsContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacingSizes.xxl,
    flexDirection: 'row',
  },
  progressBar: {
    height: spacingSizes.md,
  },
  progressBarContainer: {
    paddingTop: spacingSizes.md,
  },
});
