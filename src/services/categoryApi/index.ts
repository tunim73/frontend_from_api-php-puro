import { api } from "services";

const connectionWithEndpoints = () => ({
  findOne: async (id: number) => {
    try {
      const res = await api.get(`/category/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  findAll: async () => {
    try {
      const res = await api.get(`/category`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
});

export const categoryApi = connectionWithEndpoints();
