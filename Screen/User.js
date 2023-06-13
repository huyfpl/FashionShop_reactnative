import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_LIST_USER_ID } from "../helpers/api";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      user: null,
    };
    this.handlePressLogin = this.handlePressLogin.bind(this)
    this.handlePressEdit = this.handlePressEdit.bind(this)
  }

  componentDidMount() {
    this.getUserData();
  }

  async getUserData() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      this.setState({ userId: userId }, () => {
        this.fetchUserData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUserData() {
    const { userId } = this.state;
    try {
      const response = await axios.get(`${API_LIST_USER_ID}/${userId}`);
      const data = response.data;
      this.setState({ user: data.products }); // Sửa thành user: data.products
    } catch (error) {
      console.error(error);
    }
  }
  handlePressLogin = async () => {
    try {
      await AsyncStorage.clear(); // Xóa toàn bộ dữ liệu trong AsyncStorage
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  handlePressEdit = () => {
      this.props.navigation.navigate('EditUser',{data: this.state.userId});
  };

  render() {
    const { user } = this.state;

    return (
      <View>
        <Text style={styles.title}>Tài khoản của tôi</Text>
        {user ? (
          <View>
            {user.map((item, index) => (
              <View key={index} style={styles.userInfoContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />

                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.ten}</Text>
                  <Text style={styles.username}>{item.tentaikhoan}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text>No user data available</Text>
        )}

        <View style={styles.buttonContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="shopping-cart" size={25} color="gray" style={styles.icon} />
            </View>
            <TouchableOpacity style={[styles.button, { flex: 1 }]}>
              <Text style={styles.buttonText}>Đơn hàng của tôi</Text>
            </TouchableOpacity>
            <View style={styles.iconContainerChevron}>
              <Icon name="chevron-right" size={25} color="gray" />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="gear" size={25} color="gray" style={styles.icon} />
            </View>
            <TouchableOpacity style={[styles.button, { flex: 1 }]} >
              <Text style={styles.buttonText}>Giỏ hàng</Text>
            </TouchableOpacity>
            <View style={styles.iconContainerChevron}>
              <Icon name="chevron-right" size={25} color="gray" />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="home" size={25} color="gray" style={styles.icon} />
            </View>
            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => this.handlePressEdit()}>
              <Text style={styles.buttonText}>Cài đặt</Text>
            </TouchableOpacity>
            <View style={styles.iconContainerChevron}>
              <Icon name="chevron-right" size={25} color="gray" />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => this.handlePressLogin()}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 50,
    marginLeft: 10
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    margin: 15,
    marginTop: 100
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 50,
    alignSelf: 'center',
    width: 300,
    height: 50
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  iconContainer: {
    marginRight: 10,
    marginTop: 8,
  },
  icon: {
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  iconContainerChevron: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    marginTop: 6
  },
});
