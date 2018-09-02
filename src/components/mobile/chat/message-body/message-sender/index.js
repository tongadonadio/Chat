import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MessageSender extends Component {
  render() {
    return (
      <View style={styles.container} key={this.props.messageId}>
        <View>
          <Text style={styles.messageText}>{this.props.messageText}</Text>
        </View>
        <View>
          <Text style={styles.messageInformation}>
            {this.props.messageDate}
          </Text>
        </View>
      </View>
    );
  }
}

export default MessageSender;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    padding: 15,
    borderRadius: 10,
    margin: 10
  },
  messageText: {
    fontSize: 16
  },
  messageInformation: {
    fontSize: 12,
    color: '#9a9a9a'
  }
});
