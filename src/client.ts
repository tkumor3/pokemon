import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { offsetLimitPagination } from "@apollo/client/utilities";

const link = from([
  new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 5,
      retryIf: (error, _operation) => !!error,
    },
  }),
  new HttpLink({ uri: "https://beta.pokeapi.co/graphql/v1beta" }),
]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon_v2_pokemon: offsetLimitPagination(["$ids", "$like", "$name"]),
        },
      },
    },
  }),
});
