import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import Root from "../src/components/core/containers/index";
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { createHttpLink } from 'apollo-link-http'

const httpLink = new createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cjh0oslax87on0108pmvch7by' })

const wsLink = new WebSocketLink({
    uri: `wss://subscriptions.graph.cool/v1/cjh0oslax87on0108pmvch7by`,
    options: {
      reconnect: true
    }
})

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root store={store} />
    </ApolloProvider>, document.getElementById('root')
);
registerServiceWorker();
