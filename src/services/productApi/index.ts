import axios from "axios";
import { api, settingAxios } from "services";
import { Product, ProductCreate } from "types";

const connectionWithEndpoints = () => ({
  activeProducts: async ():Promise<Product[]|null> => {
    try {
      const res = await api.get("/product");
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  create: async (data: Product) => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;
    try {
      const res = await api.post("/product", data, settingGeneralAxios);
      console.log('res: ', res)
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  myProducts: async (id: number) => {
    console.log("my prodcuts, id ", id);
    return;
    /* try {
      const res = await api.get("/product");
      return res.data.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return null;
    } */
  },

  update: async (data: Product) => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const res = await api.post(`/product/${data.cod}`, data, settingGeneralAxios);
      return res.data.data.product;
    } catch (error) {
      console.error(error);
      return null;
    }
  },




});

export const productApi = connectionWithEndpoints();
