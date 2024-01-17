import { Lesson, User } from "types";

export interface Categories {
  id?: string;
  category: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  categories: Categories[];
  lessons?: Lesson[]
  teachers?: User[]
}
