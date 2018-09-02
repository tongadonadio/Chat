import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import container from '../../core/containers/Home/ChatList/UsersList';
import { withMessageHandlers } from '../../../containers/Message/hocs';

class ContactsList extends Component {
  static navigationOptions = {
    title: 'Chats'
  };

  constructor() {
    super();

    this.contactPress = this.contactPress.bind(this);
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  async contactPress(id, fun) {
    try {
      const value = await AsyncStorage.getItem('@userId:key');
      fun(value, id);
      this.props.navigation.navigate('Chat', { id });
    } catch (error) {
      console.log(error);
    }
  }

  renderItem = ({ item }, fun) => {
    return (
      <TouchableOpacity
        style={styles.contactRow}
        onPress={() => this.contactPress(item.id, fun)}
      >
        <Image style={styles.contactImage} source={{ uri: item.photo }} />
        <View style={styles.contactInformation}>
          <Text style={styles.contactNameText}>{item.name}</Text>
          <Text style={styles.contactLastConnectionText}>
            {item.lastActivity}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      users,
      theme,
      loading,
      error,
      modifyUsersConversation
    } = this.props;

    return loading ? (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.titleText}> Chats </Text>
        </View>
        <View>
          <FlatList
            data={users.allUsers}
            renderItem={item => this.renderItem(item, modifyUsersConversation)}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

export default withMessageHandlers(container(ContactsList));

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerHeader: {
    backgroundColor: '#eeeeee',
    height: 150
  },
  titleText: {
    marginTop: 80,
    fontSize: 50,
    fontWeight: 'bold'
  },
  contactRow: {
    flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  contactImage: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 100
  },
  contactInformation: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5
  },
  contactNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  contactLastConnectionText: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.4)'
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
