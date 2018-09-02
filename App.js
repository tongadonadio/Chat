import React from 'react';
import Expo from 'expo';
import { createStackNavigator } from 'react-navigation';
import Login from './src/components/mobile/login';
import ContactsList from './src/components/mobile/contacts-list';
import Chat from './src/components/mobile/chat';
import ImageEffects from './src/components/mobile/image-effects';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { createHttpLink } from 'apollo-link-http';
import { Provider } from 'react-redux';
import store from './src/store';
import CameraChat from './src/components/mobile/camera';

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <NavigationApp store={store} />
        </Provider>
      </ApolloProvider>
    );
  }
}

const NavigationApp = createStackNavigator(
  {
    Login: { screen: Login },
    Contacts: { screen: ContactsList },
    Chat: { screen: Chat },
    Image: { screen: ImageEffects }
  },
  {
    navigationOptions: {
      headerStyle: {
        marginTop: 24,
        backgroundColor: '#9c8d8d'
      },
      headerTintColor: '#fff'
    }
  },
  {
    initialRouteName: 'Login'
  }
);

const httpLink = new createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjh0oslax87on0108pmvch7by'
});

const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/cjh0oslax87on0108pmvch7by`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
