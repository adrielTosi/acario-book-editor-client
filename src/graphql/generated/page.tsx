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
export async function getServerPageGetChapter(
  options: Omit<Apollo.QueryOptions<Types.GetChapterQueryVariables>, "query">,
  ctx?: any
) {
  const apolloClient = getApolloClient(ctx);

  const data = await apolloClient.query<Types.GetChapterQuery>({
    ...options,
    query: Operations.GetChapterDocument,
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
export const useGetChapter = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.GetChapterQuery, Types.GetChapterQueryVariables>
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetChapterDocument, options);
};
export type PageGetChapterComp = React.FC<{
  data?: Types.GetChapterQuery;
  error?: Apollo.ApolloError;
}>;
export const withPageGetChapter =
  (
    optionsFunc?: (
      router: NextRouter
    ) => QueryHookOptions<Types.GetChapterQuery, Types.GetChapterQueryVariables>
  ) =>
  (WrappedComponent: PageGetChapterComp): NextPage =>
  (props) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    const { data, error } = useQuery(Operations.GetChapterDocument, options);
    return <WrappedComponent {...props} data={data} error={error} />;
  };
export const ssrGetChapter = {
  getServerPage: getServerPageGetChapter,
  withPage: withPageGetChapter,
  usePage: useGetChapter,
};
export async function getServerPageGetChaptersFromUser(
  options: Omit<
    Apollo.QueryOptions<Types.GetChaptersFromUserQueryVariables>,
    "query"
  >,
  ctx?: any
) {
  const apolloClient = getApolloClient(ctx);

  const data = await apolloClient.query<Types.GetChaptersFromUserQuery>({
    ...options,
    query: Operations.GetChaptersFromUserDocument,
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
export const useGetChaptersFromUser = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.GetChaptersFromUserQuery,
    Types.GetChaptersFromUserQueryVariables
  >
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetChaptersFromUserDocument, options);
};
export type PageGetChaptersFromUserComp = React.FC<{
  data?: Types.GetChaptersFromUserQuery;
  error?: Apollo.ApolloError;
}>;
export const withPageGetChaptersFromUser =
  (
    optionsFunc?: (
      router: NextRouter
    ) => QueryHookOptions<
      Types.GetChaptersFromUserQuery,
      Types.GetChaptersFromUserQueryVariables
    >
  ) =>
  (WrappedComponent: PageGetChaptersFromUserComp): NextPage =>
  (props) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    const { data, error } = useQuery(
      Operations.GetChaptersFromUserDocument,
      options
    );
    return <WrappedComponent {...props} data={data} error={error} />;
  };
export const ssrGetChaptersFromUser = {
  getServerPage: getServerPageGetChaptersFromUser,
  withPage: withPageGetChaptersFromUser,
  usePage: useGetChaptersFromUser,
};
export async function getServerPageGetTimelineTales(
  options: Omit<
    Apollo.QueryOptions<Types.GetTimelineTalesQueryVariables>,
    "query"
  >,
  ctx?: any
) {
  const apolloClient = getApolloClient(ctx);

  const data = await apolloClient.query<Types.GetTimelineTalesQuery>({
    ...options,
    query: Operations.GetTimelineTalesDocument,
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
export const useGetTimelineTales = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.GetTimelineTalesQuery,
    Types.GetTimelineTalesQueryVariables
  >
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetTimelineTalesDocument, options);
};
export type PageGetTimelineTalesComp = React.FC<{
  data?: Types.GetTimelineTalesQuery;
  error?: Apollo.ApolloError;
}>;
export const withPageGetTimelineTales =
  (
    optionsFunc?: (
      router: NextRouter
    ) => QueryHookOptions<
      Types.GetTimelineTalesQuery,
      Types.GetTimelineTalesQueryVariables
    >
  ) =>
  (WrappedComponent: PageGetTimelineTalesComp): NextPage =>
  (props) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    const { data, error } = useQuery(
      Operations.GetTimelineTalesDocument,
      options
    );
    return <WrappedComponent {...props} data={data} error={error} />;
  };
export const ssrGetTimelineTales = {
  getServerPage: getServerPageGetTimelineTales,
  withPage: withPageGetTimelineTales,
  usePage: useGetTimelineTales,
};
export async function getServerPageGetUser(
  options: Omit<Apollo.QueryOptions<Types.GetUserQueryVariables>, "query">,
  ctx?: any
) {
  const apolloClient = getApolloClient(ctx);

  const data = await apolloClient.query<Types.GetUserQuery>({
    ...options,
    query: Operations.GetUserDocument,
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
export const useGetUser = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<Types.GetUserQuery, Types.GetUserQueryVariables>
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetUserDocument, options);
};
export type PageGetUserComp = React.FC<{
  data?: Types.GetUserQuery;
  error?: Apollo.ApolloError;
}>;
export const withPageGetUser =
  (
    optionsFunc?: (
      router: NextRouter
    ) => QueryHookOptions<Types.GetUserQuery, Types.GetUserQueryVariables>
  ) =>
  (WrappedComponent: PageGetUserComp): NextPage =>
  (props) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    const { data, error } = useQuery(Operations.GetUserDocument, options);
    return <WrappedComponent {...props} data={data} error={error} />;
  };
export const ssrGetUser = {
  getServerPage: getServerPageGetUser,
  withPage: withPageGetUser,
  usePage: useGetUser,
};
