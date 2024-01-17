import { useCallback, useEffect, useState } from "react";
import { productApi } from "services";
import { Product } from "types";

export const useHome = () => {
  const [products, setproducts] = useState<Product[]>([]);
  
  const fetcher = useCallback(async () => {
    const products = await productApi.activeProducts();
    if (!products) return;
    return setproducts(products);
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

  return { products, fetcher };
};
