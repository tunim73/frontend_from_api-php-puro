import axios from "axios";
import { api, settingAxios } from "services";
import { ApiException, Lesson } from "types";

const connectionWithEndpoints = () => ({
  create: async (
    { name, teacher, lessonType, embed }: Lesson,
    courseId: number
  ): Promise<boolean | ApiException> => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      await api.post(
        `/lesson`,
        {
          name,
          teacherEmail: teacher?.email,
          lessonTypeId: lessonType.id,
          courseId,
          embed,
        },
        settingGeneralAxios
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
      return false;
    }
  },
  delete: async (id: number): Promise<boolean | ApiException> => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      await api.delete(
        `/lesson/${id}`,
        settingGeneralAxios
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
      return false;
    }
  },
});

export const lessonApi = connectionWithEndpoints();
