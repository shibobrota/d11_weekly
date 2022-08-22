import create from "zustand";
import { Product, ProductDataStore } from "./types";

export const DataStore = create<ProductDataStore>(set => ({
  products: [],
  cartList: [],
  isLoading: false,
  isError: false,
  setProducts: (products: Product[]) => {
    return set(() => ({ products: products }));
  },
  addProducts: (products: Product[]) => {
    // console.log(products.length + 'products added');
    return set(state => ({ products: [...state.products, ...products] }));
  },
  addToCart: (prod: Product) => {
    // console.log(prod);
    return set(state => ({ cartList: [...state.cartList, prod] }));
  },
  removeFromCart: (prod: Product) => {
    // console.log(prod);
    return set(state => ({
      cartList: state.cartList.filter(p => {
        return p.id !== prod.id;
      }),
    }));
  },
  setLoadingStatus: (status: boolean) => {
    return set(() => ({ isLoading: status }));
  },
  setErrorStatus: (status: boolean) => {
    return set(() => ({ isError: status }));
  },
}));
