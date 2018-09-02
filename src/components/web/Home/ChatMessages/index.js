import React from "react";
import { Col } from "reactstrap";
import "./index.css";
import HeaderUser from "./HeaderUser";
import MessageBody from "./MessageBody";
import MessageReply from "./MessageReply";
import { connect } from "react-redux";

const ChatMessages = ({ messages, logout, theme, changeTheme }) => {
  return (
    <Col md="8" className="chat-messages" id="ChatMessages">
      <HeaderUser
        idUserTo={messages.idUserTo}
        logout={logout}
        theme={theme}                                                                        
        changeTheme={changeTheme}
      />
      <MessageBody
        idUserFrom={messages.idUserFrom}
        idUserTo={messages.idUserTo}
        theme={theme}
      />
      <MessageReply
        idUserFrom={messages.idUserFrom}
        idUserTo={messages.idUserTo}
        theme={theme}
      />
    </Col>
  );
};

const mapStateToProps = state => {
  return {
    messages: {
      idUserFrom: state.messages.idUserFrom,
      idUserTo: state.messages.idUserTo
    }
  };
};

export default connect(mapStateToProps)(ChatMessages);
