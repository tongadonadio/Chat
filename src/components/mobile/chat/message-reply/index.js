import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import EmojiPicker from '../emoji-picker';
import CameraChat from '../../camera';
import container from '../../../core/containers/Home/ChatMessages/MessageReply';

class MessageReply extends Component {
  render() {
    const {
      theme,
      displayEmoji,
      displayCamera,
      state,
      handleEmojiClick,
      addMessage,
      handleChange,
      updateUserWriting,
      idUserFrom,
      idUserTo,
      updateUserNotWriting
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerIconLeft}
          onPress={displayEmoji}
        >
          <FontAwesome name="smile-o" size={45} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerIconCamera}
          onPress={this.props.showCamera}
        >
          <FontAwesome name="camera" size={35} color="grey" />
        </TouchableOpacity>
        <View style={styles.containerMessage}>
          <TextInput
            placeholder="Mensaje"
            style={styles.messageInput}
            underlineColorAndroid="transparent"
            onChangeText={e => {
              e = { target: { value: e } };
              handleChange({
                e,
                addMessage,
                updateUserWriting
              });
            }}
          >
            {' '}
          </TextInput>
        </View>
        <TouchableOpacity
          style={styles.containerIconRigth}
          onPress={e => {
            if (state.newMessage !== '') {
              e.preventDefault();
              addMessage({
                variables: {
                  text: state.newMessage,
                  date: new Date().toLocaleString(),
                  idUserFrom: idUserFrom,
                  idUserTo: idUserTo
                }
              });
              state.newMessage = '';
            }
          }}
        >
          <FontAwesome name="send" size={40} color="grey" />
        </TouchableOpacity>
        {state.displayEmoji && <EmojiPicker />}
        {state.displayCamera && <CameraChat />}
      </View>
    );
  }
}

export default container(MessageReply);

const styles = StyleSheet.create({
  container: {
    height: '10%',
    flexDirection: 'row'
  },
  containerIconLeft: {
    width: '10%',
    marginLeft: 10,
    margin: 5
  },
  containerIconCamera: {
    width: '10%',
    marginTop: 10
  },
  containerMessage: {
    margin: 5,
    height: '80%',
    width: '57%'
  },
  containerIconRigth: {
    width: '10%',
    margin: 5
  },
  messageInput: {
    height: '100%',
    borderColor: 'gray',
    borderWidth: 1
  }
});
