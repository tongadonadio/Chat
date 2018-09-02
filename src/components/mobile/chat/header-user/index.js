import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import img from '../../../../img/upload-img.png';
import container from '../../../core/containers/Home/ChatMessages/HeaderUser';

class UserChat extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      idUser: this.props.id
    };
  }*/

  static navigationOptions = {
    title: 'El emi lbdp'
  };

  render() {
    const {
      user,
      theme,
      dropdownOpen,
      toggle,
      loadThemeLight,
      loadThemeDark
    } = this.props;

    if (user && user.User) {
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageUser}
              source={{
                uri: user.User.photo
              }}
            />
          </View>
          <View style={styles.informationContainer}>
            <View>
              <Text style={styles.userName}>{user.User.name}</Text>
            </View>
            <View>
              <Text style={styles.informationText}>{user.User.writing}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return <View style={styles.container} />;
    }
  }
}

export default container(UserChat);

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginBottom: 8,
    flexDirection: 'row'
  },
  imageContainer: {
    margin: 5,
    marginLeft: 15
  },
  informationContainer: {
    flexDirection: 'column'
  },
  imageUser: {
    width: 50,
    height: 50
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 15
  },
  informationText: {
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: -5,
    marginLeft: 15
  }
});
