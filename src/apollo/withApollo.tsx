import { NextPage } from "next";
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
// import { isServerSide } from "./utils/isServerSide";

export const withApollo = (Comp: NextPage<any>) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(null, props.apolloState)}>
      <Comp {...props} />
    </ApolloProvider>
  );
};

export const getApolloClient = (_?: any, initialState?: NormalizedCacheObject) => {
  return new ApolloClient({
    ssrMode: process.env.NODE_ENV === "production",
    link: createHttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
};

export type TApolloClient = ReturnType<typeof getApolloClient>
