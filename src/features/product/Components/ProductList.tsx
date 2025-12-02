"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";

import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/store/slices/apiSlice";
import { productService } from "../product.services";
import { ProductCard } from "./ProductCard";
import { Box, CircularProgress, Grid, Pagination } from "@mui/material";

import SubHeader from "./SubHeader";
import { useAppDispatch } from "@/store/hooks";
import { useFilterSelector, useItemsSelector } from "../productSelectors";
import { setCategories, setItems, setPage } from "../productSlice";
import { SortOption } from "@/features/cart/cart.const";

export default function ProductList() {
  const [search, setSearch] = useState<string>("");

  const dispatch = useAppDispatch();
  const items = useItemsSelector();
  const filter = useFilterSelector();

  const { data: productsList, isLoading: loadingProducts } =
    useGetProductsQuery();
  const { data: Categories, isLoading: loadingCategories } =
    useGetCategoriesQuery();

  useEffect(() => {
    if (productsList) {
      const mapped = productService.list(productsList);
      dispatch(setItems(mapped));
    }
  }, [productsList, dispatch]);

  useEffect(() => {
    if (Categories) {
      dispatch(setCategories(Categories));
    }
  }, [Categories, dispatch]);

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  const filteredProductList = useMemo(() => {
    const byCategory =
      filter.category === "All"
        ? items
        : items.filter((p) =>
            filter.category ? p.category === filter.category : true
          );
    const bySearch = byCategory.filter((p) =>
      p.title.toLowerCase().includes(search.trim().toLowerCase())
    );
    const sorted = bySearch.sort((a, b) => {
      if (filter.sort === SortOption.PriceAsc) return a.price - b.price;
      if (filter.sort === SortOption.PriceDesc) return b.price - a.price;
      return 0;
    });
    return sorted;
  }, [items, filter, search]);

  const start = (filter.page - 1) * (filter.perPage ?? 8);
  const pageItems = filteredProductList.slice(
    start,
    start + (filter.perPage ?? 8)
  );
  const totalPages = Math.ceil(
    filteredProductList.length / (filter.perPage ?? 8)
  );

  const isLoading = loadingProducts || loadingCategories;
  return (
    <Box>
      <SubHeader search={search} handleSearch={handleSearch} />
      {isLoading ? (
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={2} columns={12}>
          {pageItems.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      )}

      {isLoading ? (
        <></>
      ) : (
        <Box sx={{ display: "flex", marginBlock: 4, justifyContent: "center" }}>
          <Pagination
            onChange={(_, value) => dispatch(setPage(value))}
            count={totalPages}
            page={filter.page}
            boundaryCount={2}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
