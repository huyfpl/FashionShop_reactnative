import React from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_LIST_USER_ID } from "../helpers/api";
import axios from 'axios';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      user: null,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  async getUserData() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      this.setState({userId: userId});
      
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUserData() {
    const { userId } = this.state;
    try {
      this.setState({ loading: true });
      const response = await axios.get(`${API_LIST_USER_ID}/${userId}`);
      const data = response.data;
      this.setState({ user: data.users});
  } catch (error) {
      console.error(error);
  }
  }

  render() {
    console.warn(this.state.userId)

    return (
      <View>

          <Text>Cart is empty</Text>
      </View>
    );
  }
}
