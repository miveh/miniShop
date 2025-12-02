"use client";
import { useAppDispatch } from "@/store/hooks";
import { setCategory, setSort } from "@/features/product/productSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Badge,
  Box,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useCategoriesSelector, useFilterSelector } from "../productSelectors";
import { useCartItemsSelector } from "@/features/cart/cartSelectors";
import { SortOption } from "@/features/cart/cart.const";
import { SelectEventType, SubHeaderPropsType } from "../products.type";
import { useRouter } from "next/navigation";

function SubHeader({ search, handleSearch }: SubHeaderPropsType) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const categories = useCategoriesSelector();
  const filter = useFilterSelector();
  const cartItems = useCartItemsSelector();

  const selectCategoryHandler = (e: SelectEventType) =>
    dispatch(setCategory(e.target.value || undefined));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        my: 4,
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", width: "100%", columnGap: 1 }}>
        <OutlinedInput
          value={search}
          onChange={(e) => handleSearch(e)}
          placeholder="Search..."
        />
        <Select
          sx={{ width: "200px" }}
          value={filter.category}
          onChange={(e) => selectCategoryHandler(e)}
        >
          <MenuItem value="All">All</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
        <Select
          sx={{ width: "100px" }}
          value={filter.sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
        >
          <MenuItem value={SortOption.Default}>Default</MenuItem>
          <MenuItem value={SortOption.PriceAsc}>asc</MenuItem>
          <MenuItem value={SortOption.PriceDesc}>desc</MenuItem>
        </Select>
      </Box>
      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Badge badgeContent={cartItems.length} color="primary">
          <IconButton onClick={() => router.push("/cart")} sx={{ p: 1 }}>
            <ShoppingCartIcon />
          </IconButton>
        </Badge>
      </Box>
    </Box>
  );
}

export default SubHeader;
