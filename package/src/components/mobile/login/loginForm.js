import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import container from '../../core/containers/Login';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    this.login = this.login.bind(this);
  }

  login({ addUser, data }) {
    sessionStorage.setItem('username', this.state.username);
    if (data && data.allUsers && data.allUsers[0]) {
      sessionStorage.setItem('userId', data.allUsers[0].id);
    } else {
      const promiseUser = addUser({
        variables: {
          name: this.state.username,
          photo: this.state.imgUser,
          date: new Date().toLocaleString()
        }
      });
      promiseUser.then(response =>
        sessionStorage.setItem('userId', response.data.createUser.id)
      );
      this.props.navigation.navigate('Contacts');
    }
  }

  render() {
    const { addUser, getUser, client } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Usuario"
          returnKeyType="go"
          underlineColorAndroid="transparent"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={async () => {
            const { data } = await client.query({
              query: getUser,
              variables: { userName: this.state.username }
            });
            this.login({ addUser, data });
          }}
          block
        >
          <Text style={styles.buttonText}> INGRESAR </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default container(LoginForm);

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#FFFFFF'
  }
});
