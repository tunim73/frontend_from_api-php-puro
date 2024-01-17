import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courseApi } from "services";
import { useAuthContext } from "shared/contexts";
import { Course, isApiException } from "types";

export const useCourse = () => {
  const [course, setCourse] = useState<Course>({} as Course);
  const { user } = useAuthContext();
  const { id } = useParams();

  const fetcher = useCallback(async () => {
    if (!user || !id || !user) return;

    const course =
      user.type === "student"
        ? await courseApi.getCourseAndCompletedlesson(Number(id), user.id)
        : await courseApi.getCourseForTeacher(Number(id));

    if (!course || isApiException(course)) return;

    return setCourse(course);
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

  return { course, fetcher };
};
