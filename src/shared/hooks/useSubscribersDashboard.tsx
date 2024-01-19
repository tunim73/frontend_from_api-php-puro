import { useCallback, useEffect, useState } from "react";
import { userApi } from "services";
import { useAuthContext } from "shared/contexts";
import { User } from "types";

export const useSubscribersDashboard = () => {
  const { user } = useAuthContext();
  const [users, setusers] = useState<User[]>([]);

  const fetcher = useCallback(async () => {
    if (!user) return;

    const users = await userApi.findAllSubscribers(Number(user.id));

    if (!users) return;
    setusers(users);
    return;
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

  return { users, fetcher };
};
