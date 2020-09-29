import { InMemoryCache, ApolloClient } from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://lenient-cub-93.hasura.app/v1/graphql',
    options: {
      reconnect: true,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
