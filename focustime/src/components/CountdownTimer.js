import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { fontSizes, spacingSizes } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const screenWidth = Dimensions.get('window').width;

export const CountdownTimer = ({
  minutes,
  isRunning,
  onProgress,
  onEnd,
  ...props
}) => {
  const [millis, setMillis] = useState(minutesToMillis(minutes));

  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval)
        onEnd()
        return time;
      } else {
        const timeLeft = time - 1000;
        onProgress(timeLeft / minutesToMillis(minutes));
        return timeLeft;
      }
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isRunning) {
      interval.current = setInterval(countDown, 1000);
      return () => clearInterval(interval.current);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }
  }, [isRunning]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: 'white',
    padding: spacingSizes.xl,
  },
});
