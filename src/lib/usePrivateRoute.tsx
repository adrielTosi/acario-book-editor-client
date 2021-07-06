import { useCurrentUser } from "graphql/generated/page";
import { useRouter } from "next/router";
import { useEffect } from "react";

const usePrivateRoute = () => {
  const router = useRouter();
  const { data, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading && !data?.currentUser) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, router, loading]);
};

export default usePrivateRoute;
