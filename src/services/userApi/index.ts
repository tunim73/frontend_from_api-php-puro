import axios from "axios";
import { api, settingAxios } from "services";
import { ApiException, Product } from "types";

const connectionWithEndpoints = () => ({

  create: async (
    data:any
  ): Promise<boolean | ApiException> => {
    try {
      await api.post("/user", data);

      return true;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return false;
    }
  },

  myProducts: async(
    id:number
  ):Promise<Product[] | false> => {
    
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const resposta = await api.get(`/user/${id}/product`, settingGeneralAxios);
    return resposta.data.data;

    } catch (error) {
      console.error(error);
      return false;
    }


  }
});

export const userApi = connectionWithEndpoints();
