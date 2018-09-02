import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import MessageSender from './message-sender';
import MessageReceiver from './message-receiver';
import WithSubscriptionsHandling from '../../../core/containers/Home/ChatMessages/MessageBody';

class MessageBody extends Component {
  render() {
    const { messages, theme, idUser } = this.props;

    if (messages) {
      return (
        <View style={styles.container}>
          {!messages.loading && !messages.error && messages.allMessages.map(
              ({ id, text, idUserFrom, idUserTo, date }) => {
                if (idUserTo === idUser) {
                  return (
                    <MessageReceiver
                      messageText={text}
                      messageDate={date}
                      messageId={id}
                      key={id}
                    />
                  );
                } else if (idUserFrom === idUser) {
                  return (
                    <MessageSender
                      messageText={text}
                      messageDate={date}
                      messageId={id}
                      key={id}
                    />
                  );
                }
                return '';
              }
            )}
        </View>
      );
    } else {
      return <View style={styles.container} />;
    }
  }
}

export default WithSubscriptionsHandling(MessageBody);

const styles = StyleSheet.create({
  container: {
    height: '90%',
    backgroundColor: '#c3c3c3'
  }
});
