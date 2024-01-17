import { useCallback, useEffect, useState } from "react";
import { studentApi, userApi } from "services";
import { useAuthContext } from "shared/contexts";
import { Course } from "types";

export const useMyCourses = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState<Course[]>([]);

  const fetcher = useCallback(async () => {
    if (!user) return;

    const userWithCourse =
      user.type === "student"
        ? await studentApi.myCourses(user.id)
        : await userApi.myCourses(user.id);

    if (!userWithCourse) return;

    return setCourses(userWithCourse.courses);
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

  return { courses, fetcher };
};
