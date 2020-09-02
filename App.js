import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { LocalNotification } from './src/services/LocalPushController';
import RemotePushController from './src/services/RemotePushController'

import firebase from 'react-native-firebase';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      firebase
        .messaging()
        .getToken()
        .then(fcmToken => {
          if (fcmToken) {
            alert(fcmToken);
          } else {
            alert("user doesn't have a device token yet");
          }
        });
    } else {
      alert("no");
    }
  }

  handleButtonPress = () => {
    LocalNotification();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button
          title={"Get Notification"}
          onPress={this.handleButtonPress}
        />
        <RemotePushController />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});