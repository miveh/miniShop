import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";

export const useItemsSelector = () => {
  const item = useAppSelector((state) => state.product.items);
  return useMemo(() => item, [item]);
};
export const useCategoriesSelector = () => {
  const item = useAppSelector((state) => state.product.categories);
  return useMemo(() => item, [item]);
};
export const useFilterSelector = () => {
  const item = useAppSelector((state) => state.product.filter);
  return useMemo(() => item, [item]);
};
