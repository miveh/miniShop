import { Product } from "./models/Product";
import { Product as ProductItemType } from "./products.type";
import { productMapper } from "./mappers";

export const productService = {
  list(raws: ProductItemType[]): Product[] {
    return raws.map(productMapper);
  },
  one(raw: ProductItemType): Product {
    return productMapper(raw);
  },
};
