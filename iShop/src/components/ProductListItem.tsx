import React, { useState } from "react";
import { ItemState, Product } from "../types";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { ADD_ITEM, NO_DESCRIPTION_AVAILABLE, REMOVE_ITEM } from "../strings";
import { PLACEHOLDER_IMAGE } from "../values";

export function ProductListItem({
  product,
  addRemoveItem,
}: {
  product: Product;
  addRemoveItem?: Function;
}) {
  const [isAdded, setIsAdded] = useState(false);
  product.misc = setIsAdded;

  function onPress() {
    setIsAdded(!isAdded);
    if (addRemoveItem) {
      addRemoveItem(product, !isAdded ? ItemState.ADDED : ItemState.REMOVED);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          product.imageURL ? { uri: product.imageURL } : PLACEHOLDER_IMAGE
        }
        style={styles.img}
      />
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {(product.description || NO_DESCRIPTION_AVAILABLE) + "\n "}
      </Text>
      <Button title={!isAdded ? ADD_ITEM : REMOVE_ITEM} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: "rgba(63,63,63,0.1)",
    borderRadius: 7,
    margin: 7,
    backgroundColor: "rgb(255, 255, 255)",
  },
  img: {
    width: 130,
    height: 100,
  },
  description: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5,
    color: "rgb(42,42,42)",
  },
});
