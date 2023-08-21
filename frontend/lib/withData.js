import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';
import paginationField from './paginationField';

function createClient({ headers, initialState }) {
  return new ApolloClient({
    // error handling link
    link: ApolloLink.from([
      // takes in 2 different types of errors
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // createUploadLink uses apollo-link-http under the hood, but layered on additional code that allows us to do file uploads
      // responsible for fetching data or making post requests
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        // whenever it fetches data from GraphQL endpoint it should send cookies
        fetchOptions: {
          credentials: 'include',
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allProducts: paginationField(),
          },
        },
      },
      // if there is any intialState, restore it- avoids hitting API twice
      // apollo takes data from the server and gives it to the hydration on the client
    }).restore(initialState || {}),
  });
}

// allows us to crawl all of our pages and components and look for any queries and it will make sure we have fetched before server sends HTML from server to client
export default withApollo(createClient, { getDataFromTree });
