import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import ReactDOM from 'react-dom';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} >
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)

