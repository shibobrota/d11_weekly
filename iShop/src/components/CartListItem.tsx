import React from 'react';
import {Product} from '../types';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CANCEL_ICON, PLACEHOLDER_IMAGE} from '../values';

export function CartListItem(props: {product: Product; removeItem?: Function}) {
  function onRemovePress() {
    if (props.removeItem) {
      props.removeItem(props.product);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={
            props.product.imageURL
              ? {uri: props.product.imageURL}
              : PLACEHOLDER_IMAGE
          }
          style={styles.img}
        />
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {props.product.name}
        </Text>
      </View>
      <TouchableOpacity onPress={onRemovePress}>
        <Image source={CANCEL_ICON} style={styles.cancelIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'rgba(63,63,63,0.1)',
    borderRadius: 5,
    margin: 5,
    flexDirection: 'row',
    backgroundColor: 'rgb(255, 255, 255)',
    justifyContent: 'space-between',
  },
  img: {
    width: 50,
    height: 40,
    marginLeft: 5,
  },
  description: {
    fontSize: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 20,
    color: 'rgb(42,42,42)',
    maxWidth: 200,
  },
  cancelIcon: {
    width: 5,
    height: 5,
    padding: 10,
    marginRight: 5,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
