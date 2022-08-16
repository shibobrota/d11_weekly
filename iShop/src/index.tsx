import React from 'react';
import {Home} from './screens/Home';
import {Loader} from './components/Loader';
import {StyleSheet, View} from 'react-native';
import {DataStore} from './DataStore';
import {ErrorView} from './components/ErrorView';
import {Cart} from './screens/Cart';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screen} from './utils';

const Stack = createNativeStackNavigator();

export function App() {
  const isLoading = DataStore(state => state.isLoading);
  const isError = DataStore(state => state.isError);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Screen.Home}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={Screen.Home} component={Home} />
          <Stack.Screen name={Screen.Cart} component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
      {/*<Cart />*/}
      {isError && (
        <ErrorView message="Something Went Wrong, Please Try Again!" />
      )}
      {isLoading && (
        <View style={styles.loaderWrapper}>
          <Loader />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loaderWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
