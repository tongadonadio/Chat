import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Text
} from 'react-native';
import LoginForm from './loginForm';

import img from '../../../img/upload-mobile-img.png';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  render() {
    const navigate = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageUpload} source={img} />
        </View>
        <View style={styles.formContainer}>
          <LoginForm navigation={navigate} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009688'
  },
  headerContainer: { alignItems: 'center', backgroundColor: '#019688' },
  title: {
    paddingTop: 30,
    fontSize: 30
  },
  imageContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  imageUpload: {
    width: 150,
    height: 150
  }
});
