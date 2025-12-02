import { ChangeEvent } from "react";

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export type SubHeaderPropsType = {
  search: string;
  handleSearch: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export type SelectEventType =
  | ChangeEvent<
      Omit<HTMLInputElement, "value"> & {
        value: string;
      }
    >
  | (Event & {
      target: {
        value: string;
        name: string;
      };
    });
