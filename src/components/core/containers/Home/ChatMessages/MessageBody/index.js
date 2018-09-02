import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const allMessages = gql`
  query allMessages($idUserFrom: String!, $idUserTo: String!) {
    allMessages(
      filter: {
        OR: [
          { idUserFrom: $idUserFrom, idUserTo: $idUserTo }
          { idUserTo: $idUserFrom, idUserFrom: $idUserTo }
        ]
      }
    ) {
      id
      text
      idUserFrom
      idUserTo
      date
    }
  }
`;

const subscriptionMessage = gql`
  subscription messages($idUserFrom: String!, $idUserTo: String!) {
    Message(
      filter: {
        OR: [
          {
            mutation_in: [CREATED]
            node: { idUserFrom: $idUserFrom, idUserTo: $idUserTo }
          }
          {
            mutation_in: [CREATED]
            node: { idUserTo: $idUserFrom, idUserFrom: $idUserTo }
          }
        ]
      }
    ) {
      node {
        id
        text
        idUserFrom
        idUserTo
        date
      }
    }
  }
`;

const withSubscriptionsHandling = T =>
  class extends Component {
    setupSubscription = ({ idUserFrom, idUserTo, allMessagesQuery }) => {
      console.log('setup');
      if (allMessagesQuery) {
        this.createMessageSubscription = allMessagesQuery.subscribeToMore({
          document: subscriptionMessage,
          variables: { idUserFrom: idUserFrom, idUserTo: idUserTo },
          updateQuery: (previousState, { subscriptionData }) => {
            const newMessage = subscriptionData.data.Message.node;
            const messages = previousState.allMessages.concat([newMessage]);
            return {
              allMessages: messages
            };
          },
          onError: err => console.error(err)
        });
      }
    };

    componentDidUpdate(prevProps) {
      if (
        prevProps.allMessagesQuery &&
        prevProps.allMessagesQuery.allMessages !==
          this.props.allMessagesQuery.allMessages &&
        this.endRef
      ) {
        this.endRef.scrollIntoView();
      }
    }

    _endRef = element => {
      this.endRef = element;
    };

    componentWillReceiveProps({ idUserFrom, idUserTo, allMessagesQuery }) {
      if (
        this.props.idUserFrom !== idUserFrom ||
        this.props.idUserTo !== idUserTo ||
        (!this.props.allMessagesQuery && allMessagesQuery)
      ) {
        if (this.createMessageSubscription) {
          this.createMessageSubscription();
        }
        this.setupSubscription({ idUserFrom, idUserTo, allMessagesQuery });
      }
    }

    render() {
      return (
        <T
          messages={this.props.allMessagesQuery}
          theme={this.props.theme}
          idUser={this.props.idUserFrom}
          {...this.props}
        />
      );
    }
  };

const withAllMessages = graphql(allMessages, {
  name: 'allMessagesQuery',
  skip: props => !props.idUserFrom || !props.idUserTo,
  options: props => ({
    variables: { idUserFrom: props.idUserFrom, idUserTo: props.idUserTo },
    pollInterval: 5
  })
});

const composedHOC = T => withAllMessages(withSubscriptionsHandling(T));

export default composedHOC;
