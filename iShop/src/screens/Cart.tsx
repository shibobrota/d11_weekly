import React from 'react';
import {AppBar} from '../components/AppBar';
import {
  FlatList,
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DataStore} from '../DataStore';
import {Product} from '../types';
import {CartListItem} from '../components/CartListItem';
import {ListEndBufferItem} from '../components/ListEndBufferItem';
import {EMPTY_CART} from '../values';

export function Cart({navigation}) {
  const cartList = DataStore(state => state.cartList);
  const removeFromCart = DataStore(state => state.removeFromCart);

  function onItemRemove(prod: Product) {
    removeFromCart(prod);
    prod.misc(false);
  }

  const renderProduct: ListRenderItem<Product> = (
    prod: ListRenderItemInfo<Product>,
  ) => {
    return <CartListItem product={prod.item} removeItem={onItemRemove} />;
  };

  function onBackPressed() {
    console.log('Back Pressed in Cart Screen');
    navigation.pop();
  }

  return (
    <>
      <AppBar isHome={false} onBackPress={onBackPressed} />
      {cartList.length === 0 && (
        <View style={styles.emptyView}>
          <Image source={EMPTY_CART} style={styles.emptyViewImage} />
          <Text style={styles.message}>Cart Empty!</Text>
        </View>
      )}
      {cartList.length !== 0 && (
        <FlatList
          data={cartList}
          renderItem={renderProduct}
          keyExtractor={prod => {
            return prod.id.toString();
          }}
          ListFooterComponent={ListEndBufferItem}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyViewImage: {
    width: 100,
    height: 100,
  },
  message: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 25,
  },
});
