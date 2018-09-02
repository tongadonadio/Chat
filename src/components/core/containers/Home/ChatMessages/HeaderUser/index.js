import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const User = gql`
  query User($id: ID!) {
    User(id: $id) {
      name
      photo
      writing
    }
  }
`;

const subscriptionUser = gql`
  subscription userUpdated($id: ID!) {
    User(filter: { mutation_in: [UPDATED], node: { id: $id } }) {
      node {
        name
        photo
        writing
      }
    }
  }
`;

const container = T =>
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        dropdownOpen: false
      };
      this.props = props;

      this.idUserTo = this.props.idUserTo;
      this.toggle = this.toggle.bind(this);
      this.loadThemeLight = this.loadThemeLight.bind(this);
      this.loadThemeDark = this.loadThemeDark.bind(this);
    }

    toggle() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    setupSubscription = ({ idUserTo, userQuery }) => {
      if (userQuery) {
        this.updatedUserSubscription = userQuery.subscribeToMore({
          document: subscriptionUser,
          variables: { id: idUserTo },
          updateQuery: (previousState, { subscriptionData }) => {
            const updatedUser = subscriptionData.data.User.node;
            return {
              User: updatedUser
            };
          },
          onError: err => console.error(err)
        });
      }
    };

    componentDidUpdate(prevProps) {
      if (
        prevProps.userQuery &&
        prevProps.userQuery.User !== this.props.userQuery.User &&
        this.endRef
      ) {
        this.endRef.scrollIntoView();
      }
    }

    loadThemeLight() {
      this.toggle();
      this.props.changeTheme('light');
    }

    loadThemeDark() {
      this.toggle();
      this.props.changeTheme('dark');
    }

    componentWillReceiveProps({ idUserTo, userQuery }) {
      if (
        this.props.idUserTo !== idUserTo ||
        (!this.props.userQuery && userQuery)
      ) {
        if (this.updatedUserSubscription) {
          this.updatedUserSubscription();
        }
        this.setupSubscription({ idUserTo, userQuery });
      }
    }

    render() {
      return (
        <T
          user={this.props.userQuery}
          theme={this.props.theme}
          dropdownOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          loadThemeLight={this.loadThemeLight}
          loadThemeDark={this.loadThemeDark}
          {...this.props}
        />
      );
    }
  };

const withHeaderUser = graphql(User, {
  name: 'userQuery',
  skip: props => !props.idUserTo,
  options: props => ({
    variables: { id: props.idUserTo }
  })
});

const composedHOC = T => withHeaderUser(container(T));
export default composedHOC;
