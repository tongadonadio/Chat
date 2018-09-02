import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";

const query = gql`
query allUsers($id: ID)
{
  allUsers(orderBy: lastActivity_DESC, filter: {id_not: $id }) {
    id
    name
    photo
    lastActivity
    state
  }
}
`;

const container = T => class extends Component {
  render() {
    return (
      <Query query={query} variables={{ id:this.props.messages.idUserFrom }}>
        {({ loading, error, data }) => 
          <T users={data} loading={loading} error={error} {...this.props} />
        }
      </Query>
    )
  }
};

const mapStateToProps = state => {
  return {
    messages: {
      idUserFrom: state.messages.idUserFrom,
      idUserTo: state.messages.idUserTo
    }
  };
};

export default T => connect(mapStateToProps)(container(T));