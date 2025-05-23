import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import sha256 from "crypto-js/sha256";

const persistedQueriesLink = createPersistedQueryLink({
  generateHash: (query) => sha256(query).toString(),
  useGETForHashedQueries: true,
});

const batchLink = new BatchHttpLink({
  uri: "/api/graphql",
  batchMax: 10,
  batchInterval: 20,
});

const httpLink = new HttpLink({ uri: "/api/graphql" });

const link = from([persistedQueriesLink, batchLink, httpLink]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
