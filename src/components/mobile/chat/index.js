import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserChat from './header-user';
import MessageBody from './message-body';
import MessageReply from './message-reply';
import CameraChat from '../camera';
import ImageEffects from '../image-effects';
import { connect } from 'react-redux';

const Chat = ({ messages, logout, theme, changeTheme }) => (
  <View style={styles.container}>
    <ChatLogic messages={messages} />
  </View>
);

class ChatLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCamera: false,
      showPreview: false
    };
    this.showCamera = this.showCamera.bind(this);
    this.showPreview = this.showPreview.bind(this);
  }

  showPreview(picture) {
    this.setState({
      showCamera: false,
      showPreview: !this.state.showPreview,
      picturePreview: picture
    });
  }

  showCamera() {
    this.setState({
      showCamera: !this.state.showCamera,
      showPreview: false
    });
  }

  render() {
    const showCamera = this.state.showCamera;
    const showPreview = this.state.showPreview;
    return (
      <View style={styles.container}>
        {showCamera && <CameraChat showPreview={this.showPreview} />}
        {showPreview && (
          <ImageEffects
            idUserFrom={this.props.messages.idUserFrom}
            idUserTo={this.props.messages.idUserTo}
            picture={this.state.picturePreview}
          />
        )}
        {!showCamera &&
          !showPreview && (
            <MessageBody
              idUserFrom={this.props.messages.idUserFrom}
              idUserTo={this.props.messages.idUserTo}
            />
          )}
        {!showCamera &&
          !showPreview && (
            <MessageReply
              showCamera={this.showCamera}
              idUserFrom={this.props.messages.idUserFrom}
              idUserTo={this.props.messages.idUserTo}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a7a7a7'
  }
});

const mapStateToProps = state => {
  return {
    messages: {
      idUserFrom: state.messages.idUserFrom,
      idUserTo: state.messages.idUserTo
    }
  };
};

Chat.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: <UserChat idUserTo={navigation.state.params.id} />
  };
};

export default connect(mapStateToProps)(Chat);
