import { ApolloError } from "@apollo/client"
import { TApolloClient } from "apollo/withApollo"
import { GraphQLError } from "graphql"

export type ServerSideProps<T> = {
  apolloState: TApolloClient
  data: T
  error: readonly GraphQLError[] | ApolloError | null
}