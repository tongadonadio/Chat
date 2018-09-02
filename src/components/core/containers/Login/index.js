import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';

const addUser = gql`
  mutation addUser($name: String!, $photo: String, $date: String!) {
    createUser(
      name: $name
      photo: $photo
      lastActivity: $date
      state: "Conectado"
    ) {
      id
      name
    }
  }
`;

const getUser = gql`
  query allUsers($userName: String!) {
    allUsers(filter: { name: $userName }) {
      id
      name
      photo
      lastActivity
      state
    }
  }
`;

const container = T =>
  class extends Component {
    searchUser(userName, client) {
      client.query({
        query: getUser,
        variables: { userName: userName }
      });
    }

    render() {
      return (
        <Mutation mutation={addUser}>
          {addUser => (
            <ApolloConsumer>
              {client => (
                <T
                  addUser={addUser}
                  handleChange={this.handleChange}
                  getUser={getUser}
                  client={client}
                  {...this.props}
                />
              )}
            </ApolloConsumer>
          )}
        </Mutation>
      );
    }
  };

export default container;
