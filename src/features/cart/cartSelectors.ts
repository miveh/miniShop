import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";

export const useCartItemsSelector = () => {
  const items = useAppSelector((state) => state.cart.items);
  return useMemo(() => items, [items]);
};
