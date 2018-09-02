import React, { Component } from "react";
import { Col } from "reactstrap";
import "./index.css";
import HeaderUser from "./HeaderUser/index";
import UsersList from "./UsersList/index";

class Home extends Component {
  render() {
    return (
      <Col md="4" className="chat-list" id="Home">
        <HeaderUser theme={this.props.theme} />
        <UsersList theme={this.props.theme} />
      </Col>
    );
  }
}

export default Home;
