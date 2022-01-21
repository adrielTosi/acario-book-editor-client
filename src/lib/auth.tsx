import { useApolloClient } from "@apollo/client";
import { useLogoutMutation } from "graphql/generated/mutations";
import { useCurrentUser } from "graphql/generated/page";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const usePrivateRoute = () => {
  const router = useRouter();
  const { data, loading, error } = useCurrentUser();

  useEffect(() => {
    if (!loading && error) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, router, loading, error]);

  return data;
};

export const useAppLogout = () => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const logoutFunction = async () => {
    try {
      await logout();
      await apolloClient.resetStore();
    } catch (err) {
      // todo: HANDLE ERROR
      console.log(err);
    }
  };
  return logoutFunction;
};
