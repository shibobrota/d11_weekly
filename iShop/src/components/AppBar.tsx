import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DataStore} from '../DataStore';

const shoppingCart = require('../assets/shopping-cart.png');
const leftArrow = require('../assets/left.png');
const logo = require('../assets/shop.png');

export function AppBar(props: {
  isHome: boolean;
  onCartPress?: Function;
  onBackPress?: Function;
}) {
  const cartList = DataStore(state => state.cartList);

  function onCartPress() {
    if (props.onCartPress) {
      props.onCartPress();
    }
  }

  function onBackPress() {
    if (!props.isHome && props.onBackPress) {
      props.onBackPress();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onBackPress}>
          <Image
            source={props.isHome ? logo : leftArrow}
            style={styles.leftArrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {props.isHome ? 'iShop' : 'Your Cart'}
        </Text>
      </View>
      {props.isHome && (
        <TouchableOpacity onPress={onCartPress}>
          <Image source={shoppingCart} style={styles.shoppingCart} />
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cartList.length}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'rgb(251,251,251)',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shoppingCart: {
    width: 25,
    height: 25,
    marginRight: 7,
    marginTop: 5,
  },
  leftArrow: {
    width: 30,
    height: 30,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'rgb(0, 0, 0)',
  },
  cartCount: {
    position: 'absolute',
    flex: 1,
    right: 0,
    top: 0,
    backgroundColor: 'rgb(255,55,0)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    borderRadius: 5,
    paddingRight: 3,
    paddingLeft: 3,
  },
  cartCountText: {
    fontSize: 13,
    color: 'rgb(255, 255, 255)',
  },
});
