import { Product } from "./models/Product";
import { Product as ProductType } from "./products.type";

export const productMapper = (p: ProductType): Product =>
  new Product(p.id, p.title, p.price, p.description, p.category, p.image);
