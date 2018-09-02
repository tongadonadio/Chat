import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  AsyncStorage
} from 'react-native';
import container from '../../core/containers/Login';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUser: 'img',
      username: ''
    };

    this.login = this.login.bind(this);
  }

  async login({ addUser, data }) {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem('@username:key', this.state.username);
      if (data && data.allUsers && data.allUsers[0]) {
        await AsyncStorage.setItem('@userId:key', data.allUsers[0].id);
      } else {
        const promiseUser = addUser({
          variables: {
            name: this.state.username,
            photo: this.state.imgUser,
            date: new Date().toLocaleString()
          }
        });
        promiseUser.then(async response => {
          await AsyncStorage.setItem(
            '@userId:key',
            response.data.createUser.id
          );
        });
      }
      this.props.navigation.navigate('Contacts');
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = username => {
    this.setState({ username });
  };

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
          onChangeText={this.handleChange}
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
