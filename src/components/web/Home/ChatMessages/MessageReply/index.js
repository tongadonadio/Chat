import React, { Component } from "react"
import { Col, Row, Input } from "reactstrap"
import "./index.css"
import EmojiPicker from "emoji-picker-react"
import container from '../../../../core/containers/Home/ChatMessages/MessageReply'

class MessageReply extends Component {
  render() {

    const { theme, displayEmoji, state, handleEmojiClick, addMessage, handleChange, updateUserWriting,
            idUserFrom, idUserTo, updateUserNotWriting } = this.props;

    return (
      <Row
        className={
          "message-reply-content  " + theme + "-footer"
        }
      >
        <Col md="1" className="message-reply-emojis">
          <i
            className="fa fa-smile-o fa-2x"
            onClick={displayEmoji}
          />
          {state.displayEmoji && (
            <EmojiPicker
              onEmojiClick={(code, emoji) =>
                handleEmojiClick(code, emoji, addMessage)
              }
              className="emoji-picker"
            />
          )}

          {state.displayEmoji}
        </Col>
        <Col md="10" className="reply-main">
          <Input
            type="textarea"
            value={state.newMessage}
            onChange={e => {
              handleChange({
                e,
                addMessage,
                updateUserWriting
              });
            }}
            onKeyPress={e => {
              if (state.newMessage !== "") {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addMessage({
                    variables: {
                      text: state.newMessage,
                      date: new Date().toLocaleString(),
                      idUserFrom: idUserFrom,
                      idUserTo: idUserTo
                    }
                  });
                  state.newMessage = "";
                  updateUserNotWriting({
                    variables: {
                      id: idUserFrom,
                      date: new Date().toLocaleString()
                    }
                  });
                }
              }
            }}
          />
        </Col>
        <Col md="1" className="message-reply-send">
          <i
            className="fa fa-send fa-2x"
            onClick={e => {
              if (state.newMessage !== "") {
                e.preventDefault();
                addMessage({
                  variables: {
                    text: state.newMessage,
                    date: new Date().toLocaleString(),
                    idUserFrom: idUserFrom,
                    idUserTo: idUserTo
                  }
                });
                state.newMessage = "";
              }
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default container(MessageReply);
