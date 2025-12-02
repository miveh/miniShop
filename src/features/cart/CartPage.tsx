"use client";

import { useSelector, useDispatch } from "react-redux";
import { clear, remove } from "@/features/cart/cartSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((s: RootState) => s.cart.items);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <main>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={4}
        sx={{ marginBlock: 4, marginInline: { xs: 2, md: "64px" } }}
      >
        <Grid container size={{ xs: 12, sm: 8 }} rowSpacing={2}>
          <Box>
            <Button variant="text" onClick={() => router.push("/products")}>
              {"<"} Continue Shopping
            </Button>
            <Divider flexItem sx={{ marginBlock: 2 }} />
            <Typography variant="h5">Shopping Cart</Typography>
            <Typography>You have {items.length} items in your cart</Typography>
          </Box>
          {items.map((i) => (
            <Grid size={12} key={i.id}>
              <Card sx={{ display: "flex", paddingInline: 3 }}>
                <Image
                  style={{ aspectRatio: 1, marginBlock: 16 }}
                  src={i.image}
                  alt={i.title}
                  width={150}
                  height={100}
                  className="object-contain"
                />
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ color: "text.secondary", userSelect: "none" }}
                    >
                      {i.title}
                    </Typography>
                    <Typography component="div" variant="subtitle1">
                      {i.price} $
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => dispatch(remove(i.id))}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper variant="outlined" sx={{ padding: 3 }}>
            <Box sx={{ marginBottom: 3 }}>
              <Typography>Qty: {totalQty}</Typography>
              <Typography>Total: {totalPrice.toFixed(2)} $</Typography>
            </Box>
            <Button fullWidth disabled={items.length <= 0} variant="contained">
              Pay
            </Button>
          </Paper>
        </Grid>
        {items.length > 0 && (
          <Button onClick={() => dispatch(clear())}>Remove All Items</Button>
        )}
      </Grid>
    </main>
  );
}
