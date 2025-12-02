"use client";

import { useCartItemsSelector } from "@/features/cart/cartSelectors";
import { add, remove } from "@/features/cart/cartSlice";
import { CartItem } from "@/features/cart/models/Cart";
import { productService } from "@/features/product/product.services";
import { useAppDispatch } from "@/store/hooks";
import { useGetProductQuery } from "@/store/slices/apiSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useCartItemsSelector();

  const id = Number(params.id);
  const { data, isLoading } = useGetProductQuery(id);
  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBlockStart: "64px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (!data) return <div className="p-4">Not found</div>;

  const product = productService.one(data);
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
  const cartButtonLabel = isExistingItem ? "Remove from cart" : "Add to cart";

  return (
    <main>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          marginTop: 4,
          marginInline: 8,
        }}
      >
        <Button variant="text" onClick={() => router.push("/products")}>
          {"<"} Continue Shopping
        </Button>
        <Box sx={{ display: "flex" }}>
          <Badge badgeContent={cartItems.length} color="primary">
            <IconButton onClick={() => router.push("/cart")} sx={{ p: 1 }}>
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Box>
      </Box>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          margin: { xs: 2, md: "64px" },
          padding: 4,
          columnGap: 4,
        }}
      >
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="object-contain"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column ",
            padding: { xs: 0, md: 4 },
            columnGap: 4,
          }}
        >
          <Box>
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="body1" className="text-sm text-gray-600">
              {product.description}
            </Typography>
            <Typography variant="h6" color="secondary" className="mt-2">
              {product.price} $
            </Typography>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="outlined"
              onClick={cartButtonHandler}
              color="primary"
            >
              {cartButtonLabel}
            </Button>
          </Box>
        </Box>
      </Paper>
    </main>
  );
}
