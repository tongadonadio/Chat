import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';

class EmojiPicker extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true
    };

    this.handleEmojiPress = this.handleEmojiPress.bind(this);
  }

  handleEmojiPress(emoji) {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <EmojiSelector
            onEmojiSelected={emoji => this.handleEmojiPress(emoji)}
          />
        </Modal>
      </View>
    );
  }
}

export default EmojiPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
