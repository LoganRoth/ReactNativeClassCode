import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacingSizes } from '../../utils/sizes';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ history, onClear }) => {
  const clearHistory = () => onClear();
  return (
    <>
      <SafeAreaView style={styles.container}>
        {!history.length ? null : (
          <>
            <Text style={styles.title}>{"Things we've focused on"}</Text>
            <FlatList
              style={styles.simpleContainer}
              contentContainerStyle={styles.contentContainer}
              data={history}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton title="Clear" size={75} onPress={onClear} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
  },
  simpleContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
    paddingBottom: spacingSizes.md,
  },
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),
  clearContainer: {
    alignItems: 'center',
    padding: spacingSizes.md,
  },
});
