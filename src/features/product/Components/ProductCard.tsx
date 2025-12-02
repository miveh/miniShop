"use client";

import Image from "next/image";
import { Product } from "@/features/product/models/Product";
import { add, remove } from "@/features/cart/cartSlice";
import { CartItem } from "@/features/cart/models/Cart";
import { useAppDispatch } from "@/store/hooks";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useCartItemsSelector } from "@/features/cart/cartSelectors";
import { useRouter } from "next/navigation";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useCartItemsSelector();

  const handleAdd = () => {
    const item = new CartItem(
      product.id,
      product.title,
      product.price,
      product.image,
      1
    );
    dispatch(add(item));
  };

  const handleRemove = () => {
    dispatch(remove(product.id));
  };

  const isExistingItem = !!cartItems.find((item) => item.id === product.id)
    ? true
    : false;

  const cartButtonHandler = isExistingItem ? handleRemove : handleAdd;
  const cartButtonLabel = isExistingItem ? "Remove" : "Add to cart";

  return (
    <Card sx={{ borderRadius: "0" }}>
      <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
        <Image
          style={{ aspectRatio: 1, marginBlock: 16 }}
          src={product.image}
          alt={product.title}
          width={200}
          height={100}
          className="object-contain mx-auto"
        />
        <CardContent>
          <Typography
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace="nowrap"
            textAlign="center"
            gutterBottom
            variant="caption"
            component="div"
          >
            {product.title}
          </Typography>
          <Typography
            textAlign="center"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          fullWidth
          variant="text"
          onClick={cartButtonHandler}
          color="primary"
        >
          {cartButtonLabel}
        </Button>
      </CardActions>
    </Card>
  );
}
