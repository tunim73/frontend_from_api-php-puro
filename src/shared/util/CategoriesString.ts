import { Categories } from "types";

export const categoriesString = (categories?: Categories[]) => {
  if (!categories) return ""
  return categories.map((e) => e.category.trim()).join(", ");
};
