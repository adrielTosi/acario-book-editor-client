import * as Types from "./graphqlTypes";

import * as Operations from "./graphqlTypes";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { QueryHookOptions, useQuery } from "@apollo/client";
import * as Apollo from "@apollo/client";
import type React from "react";
import { getApolloClient } from "apollo/withApollo";
export async function getServerPageCurrentUser(
  options: Omit<Apollo.QueryOptions<Types.CurrentUserQueryVariables>, "query">,
  ctx?: any
) {
  const apolloClient = getApolloClient(ctx);

  const data = await apolloClient.query<Types.CurrentUserQuery>({
    ...options,
    query: Operations.CurrentUserDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export const useCurrentUser = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.CurrentUserQuery, Types.CurrentUserQueryVariables>
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.CurrentUserDocument, options);
};
export type PageCurrentUserComp = React.FC<{
  data?: Types.CurrentUserQuery;
  error?: Apollo.ApolloError;
}>;
export const withPageCurrentUser =
  (
    optionsFunc?: (
      router: NextRouter
    ) => QueryHookOptions<
      Types.CurrentUserQuery,
      Types.CurrentUserQueryVariables
    >
  ) =>
  (WrappedComponent: PageCurrentUserComp): NextPage =>
  (props) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    const { data, error } = useQuery(Operations.CurrentUserDocument, options);
    return <WrappedComponent {...props} data={data} error={error} />;
  };
export const ssrCurrentUser = {
  getServerPage: getServerPageCurrentUser,
  withPage: withPageCurrentUser,
  usePage: useCurrentUser,
};
