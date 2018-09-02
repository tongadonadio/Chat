import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

class PreviewPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: this.props.picture
    };
    let a = { a: 'inicio', b: this.props.picture, c: 'fin' };
    this.updatePicture = this.updatePicture.bind(this);
  }

  updatePicture(picture) {
    this.setState({ picture: picture });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ flex: 1 }}
          source={{
            uri: this.state.picture.uri
          }}
        />
      </View>
    );
  }
}

export default PreviewPicture;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
