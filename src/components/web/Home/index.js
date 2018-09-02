import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import "./index.css";
import ChatList from "./ChatList/index";
import ChatMessages from "./ChatMessages/index";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "theme-light"
    };

    this.logout = this.logout.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(theme) {
    this.setState({ theme: "theme-" + theme });
  }

  logout() {
    this.props.history.push("/login");
  }

  render() {
    return (
      <Container className="app">
        <Row className={"row-container-app " + this.state.theme + "-home"}>
          <ChatList theme={this.state.theme} />
          <ChatMessages
            logout={this.logout}
            theme={this.state.theme}
            changeTheme={this.changeTheme}
          />
        </Row>
      </Container>
    );
  }
}

export default Home;
