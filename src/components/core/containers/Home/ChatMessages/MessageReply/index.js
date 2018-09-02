import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const ADD_MESSAGE = gql`
  mutation addMessage(
    $text: String!
    $date: String!
    $idUserFrom: String!
    $idUserTo: String!
  ) {
    createMessage(
      text: $text
      idUserFrom: $idUserFrom
      idUserTo: $idUserTo
      date: $date
    ) {
      id
      text
    }
  }
`;

const USER_WRITING = gql`
  mutation updateUserWriting($id: ID!, $date: String!) {
    updateUser(id: $id, writing: "Escribiendo...", lastActivity: $date) {
      id
    }
  }
`;

const USER_NOT_WRITING = gql`
  mutation updateUserNotWriting($id: ID!, $date: String!) {
    updateUser(id: $id, writing: "", lastActivity: $date) {
      id
    }
  }
`;

const container = T =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        newMessage: '',
        displayEmoji: false,
        displayCamera: false
      };

      this.handleEmojiClick = this.handleEmojiClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.displayEmoji = this.displayEmoji.bind(this);
      this.displayCamera = this.displayCamera.bind(this);
    }

    handleChange({ e, addMessage, updateUserWriting }) {
      this.setState({
        newMessage: e.target.value
      });

      updateUserWriting({
        variables: {
          id: this.props.idUserFrom,
          date: new Date().toLocaleString()
        }
      });
    }

    displayEmoji = () =>
      this.setState({ displayEmoji: !this.state.displayEmoji });
    displayCamera = () =>
      this.setState({ displayCamera: !this.state.displayCamera });

    handleEmojiClick(code, emoji, addMessage) {
      this.setState({
        displayEmoji: !this.state.displayEmoji
      });

      addMessage({
        variables: {
          text: ':' + emoji.name + ':',
          date: new Date().toLocaleString(),
          idUserFrom: this.props.idUserFrom,
          idUserTo: this.props.idUserTo
        }
      });
    }

    render() {
      return (
        <Mutation mutation={ADD_MESSAGE}>
          {addMessage => (
            <Mutation mutation={USER_WRITING}>
              {updateUserWriting => (
                <Mutation mutation={USER_NOT_WRITING}>
                  {updateUserNotWriting => (
                    <T
                      updateUserWriting={updateUserWriting}
                      updateUserNotWriting={updateUserNotWriting}
                      theme={this.props.theme}
                      displayEmoji={this.displayEmoji}
                      state={this.state}
                      handleEmojiClick={this.handleEmojiClick}
                      addMessage={addMessage}
                      handleChange={this.handleChange}
                      idUserFrom={this.props.idUserFrom}
                      idUserTo={this.props.idUserTo}
                      setState={this.setState}
                      {...this.props}
                    />
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      );
    }
  };

export default container;
