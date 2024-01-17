import axios from "axios";
import { api, settingAxios } from "services";
import { ApiException, Course, User } from "types";

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
});

export const userApi = connectionWithEndpoints();
