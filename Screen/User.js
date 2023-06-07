import React from "react";
import { View, Text } from "react-native";
export default class User extends React.Component {
  static navigationOptions = {
    title: 'User',
  };

  render() {
    return (
      <View>
        <Text>User</Text>
      </View>
    );
  }
}
