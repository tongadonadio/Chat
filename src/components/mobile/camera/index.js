import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class CameraChat extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    };

    this.pressReverseCam = this.pressReverseCam.bind(this);
    this.pressTakePhoto = this.pressTakePhoto.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  pressReverseCam() {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  }

  async pressTakePhoto() {
    let photo = await this.camera.takePictureAsync({ base64: true });
    this.props.showPreview(photo);
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera
            style={styles.container}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View style={styles.containerView}>
              <TouchableOpacity onPress={this.pressReverseCam}>
                <Ionicons name="md-reverse-camera" size={45} color="grey" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.pressTakePhoto}>
                <FontAwesome name="circle-o" size={100} color="grey" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="md-camera" size={45} color="transparent" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default CameraChat;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerView: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 15,
    alignItems: 'flex-end'
  }
});
