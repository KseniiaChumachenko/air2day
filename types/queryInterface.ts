import { ApolloError } from "apollo-client";

export interface QueryInterface<TData>{
  data?: TData;
  loading?: boolean;
  error?: ApolloError;
}