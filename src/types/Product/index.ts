import { Category, User } from "types";

export interface Product {
  cod: number;
  name: string;
  status: number;
  value: number;
  category: Category
  quantity: number;
  description: string;
  image: string;
  userID: number | null
  user?: User 
  createdAt: Date;
}


export interface ProductCreate {
  name: string;
  value: number;
  quantity: number;
  description: string;
  image?: string;
  userId: number;
  categoryId: number;
}