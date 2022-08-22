import React, {useEffect, useRef} from 'react';
import {useInfiniteQuery} from 'react-query';
import {getAllData} from '../ApiHandlers';
import {mapToProduct, Screen} from '../utils';
import {ItemState, Product} from '../types';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {ProductListItem} from '../components/ProductListItem';
import {DataStore} from '../DataStore';
import {AppBar} from '../components/AppBar';

export const Home = ({navigation}) => {
  const addProducts = DataStore(state => state.addProducts);
  const setErrorState = DataStore(state => state.setErrorStatus);
  const setLoadingState = DataStore(state => state.setLoadingStatus);
  const productsState = DataStore(state => state.products);
  const addToCart = DataStore(state => state.addToCart);
  const removeFromCart = DataStore(state => state.removeFromCart);
  const offset = useRef({start: 0, end: 10});

  const {isError, isFetchingNextPage, isLoading, fetchNextPage} =
    useInfiniteQuery('get-all-data', () => getAllData(offset.current), {
      onSuccess: data => {
        addProducts(
          data?.pages[data?.pages.length - 1].data.collections?.map(el =>
            mapToProduct(el),
          ),
        );
        offset.current.start = offset.current.start + 10;
        offset.current.end = offset.current.end + 10;
      },
      getNextPageParam: () => {
        // console.log(startOffset, endOffset);
        return offset.current;
      },
    });

  useEffect(() => {
    setErrorState(isError);
  }, [isError, setErrorState]);

  useEffect(() => {
    console.log('isFetchingNextPage', isFetchingNextPage);
    setLoadingState(isFetchingNextPage || isLoading);
  }, [isLoading, isFetchingNextPage, setLoadingState]);

  const renderProduct: ListRenderItem<Product> = (
    prod: ListRenderItemInfo<Product>,
  ) => {
    return (
      <ProductListItem product={prod.item} addRemoveItem={addRemoveItem} />
    );
  };

  function addRemoveItem(prod: Product, state: ItemState) {
    console.log(prod, state);
    if (state === ItemState.ADDED) {
      addToCart(prod);
    } else {
      removeFromCart(prod);
    }
  }

  function onListEnd() {
    fetchNextPage();
  }

  function onCartClick() {
    console.log('Cart Clicked');
    navigation.navigate(Screen.Cart);
  }

  return (
    <>
      <AppBar isHome={true} onCartPress={onCartClick} />
      <FlatList
        data={productsState}
        renderItem={renderProduct}
        keyExtractor={(prod, idx) => {
          prod.id = idx.toString();
          return idx.toString();
        }}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReachedThreshold={0.5}
        onEndReached={onListEnd}
      />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
