import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import App from './App'

const {
  REACT_APP_GRAPQHL_API_DEVELOPMENT,
  REACT_APP_GRAPQHL_API_PRODUCTION,
  NODE_ENV
} = process.env

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.error(`graphql error ${message}`)
    })
  }
})

const authLink = setContext((_, { headers }) => {
  const { token } = JSON.parse(localStorage.getItem('user'))

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const link = from([
  errorLink,
  authLink.concat(
    new HttpLink({
      uri:
        NODE_ENV === 'development'
          ? REACT_APP_GRAPQHL_API_DEVELOPMENT
          : REACT_APP_GRAPQHL_API_PRODUCTION,
      credentials: 'same-origin',
      fetchOptions: {
        mode: 'cors'
      }
    })
  )
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

