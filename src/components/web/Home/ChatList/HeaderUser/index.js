import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import "./index.css";

class HeaderUser extends Component {
  render() {
    return (
      <Row className={"header-user " + this.props.theme}>
        <Col md="3">
          <div className="header-user-avatar">
            <img src={sessionStorage.getItem("imageUser")} alt="avatar" />
          </div>
        </Col>
        <Col md="9">{sessionStorage.getItem("username")}</Col>
      </Row>
    );
  }
}

export default HeaderUser;
