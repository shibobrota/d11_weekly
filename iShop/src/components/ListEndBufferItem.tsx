import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function ListEndBufferItem({message}: {message: string}) {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
});
