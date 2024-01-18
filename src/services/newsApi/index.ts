import axios from "axios";
import { api, settingAxios } from "services";
import { News } from "types";

const connectionWithEndpoints = () => ({
  create: async (data: News) => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const resposta = await api.post("/news", data, settingGeneralAxios);
      return resposta.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  update: async (data: News) => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const resposta = await api.put(`/news/${data.id}`,data ,settingGeneralAxios);
      return resposta.data.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return null;
    }
  },
  findAll: async () => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const resposta = await api.get("/news", settingGeneralAxios);
      return resposta.data.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return null;
    }
  },
  findOne: async () => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const resposta = await api.get("/auth", settingGeneralAxios);
      return resposta.data.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return null;
    }
  },
  delete: async () => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const resposta = await api.get("/auth", settingGeneralAxios);
      return resposta.data.data;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) return error.response?.data.data;
      return null;
    }
  },
  findHighlightedNews: async (): Promise<News[] | null | false> => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const resposta = await api.get("/news/highlight", settingGeneralAxios);

      return resposta.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
});

export const newsApi = connectionWithEndpoints();
