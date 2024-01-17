import axios from "axios";
import { api, settingAxios } from "services";
import { ApiException, Course } from "types";

const connectionWithEndpoints = () => ({
  getCourseAndCompletedlesson: async (
    courseId: number,
    studentId: number
  ): Promise<Course | ApiException | false> => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const response = await api.get(
        `/course/${courseId}/student/${studentId}`,
        settingGeneralAxios
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
      return false;
    }
  },

  getCourseForTeacher: async (
    courseId: number
  ): Promise<Course | ApiException | false> => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const response = await api.get(
        `/course/${courseId}/teacher/`,
        settingGeneralAxios
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
      return false;
    }
  },

  create: async (
    { title, description, categories, image }: Course,
    teacherId: number
  ): Promise<boolean | ApiException> => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      await api.post(
        `/course`,
        {
          title,
          description,
          categories,
          image,
          teacherId,
        },
        settingGeneralAxios
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
      return false;
    }
  },

  update: async ({
    title,
    description,
    categories,
    image,
    id,
  }: Course): Promise<Course | ApiException | false> => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      const response = await api.patch(
        `/course/${id}`,
        {
          title,
          description,
          categories,
          image,
        },
        settingGeneralAxios
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
      return false;
    }
  },

  addTeacherInCourse: async (
    courseId: number,
    email: string
  ): Promise<boolean | ApiException> => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      await api.put(
        `/course/${courseId}/teacher/add`,
        { email },
        settingGeneralAxios
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
      return false;
    }
  },

  removeTeacherInCourse: async (
    courseId: number,
    teacherId: number
  ): Promise<boolean | ApiException> => {
    const settingGeneralAxios = settingAxios();
    if (!settingGeneralAxios) return false;

    try {
      await api.put(
        `/course/${courseId}/teacher/${teacherId}/remove`,
        {},
        settingGeneralAxios
      );
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
      return false;
    }
  },
});

export const courseApi = connectionWithEndpoints();
