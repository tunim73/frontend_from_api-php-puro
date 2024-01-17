import { Category } from "types";

export interface Product {
  cod: number;
  name: string;
  status: number;
  value: number;
  category: Category
  quantity: number;
  description: string;
  image: number;
  userID: number | null
  createdAt: Date;
}
