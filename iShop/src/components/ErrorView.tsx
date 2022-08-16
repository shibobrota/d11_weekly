import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const ErrorView = (props: {message: string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(216,32,0)',
    padding: 15,
    alignItems: 'center',
  },
  textStyle: {
    color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
  },
});
