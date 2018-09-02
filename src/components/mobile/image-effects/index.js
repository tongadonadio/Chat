import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Slider, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-expo';
import Fields from './fields';
import container from '../../core/containers/Home/ChatMessages/MessageReply';

const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform sampler2D children;
    uniform float contrast, saturation, brightness;
    const vec3 L = vec3(0.2125, 0.7154, 0.0721);
    void main() {
      vec4 c = texture2D(children, uv);
      vec3 brt = c.rgb * brightness;
      gl_FragColor = vec4(mix(
        vec3(0.5),
        mix(vec3(dot(brt, L)), brt, saturation),
        contrast), c.a);
    }
    `
  }
});

export const Saturate = ({ children, contrast, saturation, brightness }) => {
  return (
    <Node
      shader={shaders.Saturate}
      uniforms={{ contrast, saturation, brightness, children }}
    />
  );
};

class ImageEffects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: this.props.picture ? this.props.picture : '',
      contrast: 1,
      brightness: 1,
      saturation: 1
    };

    console.log('uri: ' + this.props.picture);

    this.updateValue = this.updateValue.bind(this);
    this.updatePicture = this.updatePicture.bind(this);
  }

  updateValue(value, id) {
    this.setState({ [id]: value });
  }

  updatePicture(picture) {
    this.setState({ picture: picture });
  }

  render() {
    const { addMessage } = this.props;
    return (
      <View style={styles.container}>
        <Surface style={styles.containerImg} ref="surface">
          <Saturate
            {...this.props}
            contrast={this.state.contrast}
            saturation={this.state.saturation}
            brightness={this.state.brightness}
          >
            {{ uri: this.state.picture.uri }}
          </Saturate>
        </Surface>
        <Fields updateValue={this.updateValue} />
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => {
            console.log('1: ' + this.state.picture.base64);
            console.log('2: ' + this.props.idUserFrom);
            console.log('3: ' + this.props.idUserTo);
            addMessage({
              variables: {
                text: this.state.picture.base64,
                date: new Date().toLocaleString(),
                idUserFrom: this.props.idUserFrom,
                idUserTo: this.props.idUserTo
              }
            });
          }}
        >
          <Ionicons name="ios-checkmark-circle-outline" size={45} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default container(ImageEffects);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009688'
  },
  containerImg: {
    flex: 3,
    width: '100%',
    height: '100%'
  }
});
