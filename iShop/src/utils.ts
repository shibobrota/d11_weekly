import { Collection, Product } from "./types";

export function mapToProduct(resp: Collection) {
  let product: Product = {
    name: resp.name,
    imageURL: resp.banner_image_url || "",
    description: resp.description || "",
    qty: 0,
    id: resp.slug ?? "",
    misc: null,
  };
  return product;
}

export const Screen = {
  Home: "Home",
  Cart: "Cart",
};
