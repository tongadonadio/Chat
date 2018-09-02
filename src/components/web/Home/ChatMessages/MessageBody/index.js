import React, { Component } from "react"
import "./index.css"
import MessageBodyReceiver from "./index-receiver"
import MessageBodySender from "./index-sender"
import WithSubscriptionsHandling from '../../../../core/containers/Home/ChatMessages/MessageBody'

class Chat extends Component {
  render() {

    const { messages, theme, idUser } = this.props;

    if (messages) {
      return (
        <div className={"message-body-content " + theme + "-body"}>
          {!messages.loading && !messages.error && messages.allMessages.map(
            ({ id, text, idUserFrom, idUserTo, date }) => {
              if (idUserTo === idUser) {
                return (
                  <MessageBodyReceiver
                    messageText={text}
                    messageDate={date}
                    messageId={id}
                    key={id}
                  />
                );
              } else if (idUserFrom === idUser) {
                return (
                  <MessageBodySender
                    messageText={text}
                    messageDate={date}
                    messageId={id}
                    key={id}
                  />
                );
              }
              return "";
            }
          )}
        </div>
      );
    } else {
      return (
        <div
          className={"message-body-content  " + theme + "-body"}
        />
      );
    }
  }
}

export default WithSubscriptionsHandling(Chat);
