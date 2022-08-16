import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {App} from './src';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const iShop = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default iShop;
