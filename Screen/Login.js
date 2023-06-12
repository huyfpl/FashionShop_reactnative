import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {API_LOGIN} from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userList: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const url = API_LOGIN;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        this.setState({
          userList: response.data.products,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleLogin() {
    const { username, password, userList } = this.state;
    const user = userList.find((user) => user.tentaikhoan === username && user.pass === password);
    if (user) {
      console.warn('User already'+user.id);
      const userId = user.id.toString();
      AsyncStorage.setItem('userId',user.id.toString())
      .then((value)=>{
          this.props.navigation.navigate('Home');
          console.warn('Login successful');
      })
     
    } else {
      console.warn('Invalid credentials');
    }
  }
  handleRegister() {
    this.props.navigation.navigate('Register');
  }
  render() {
    return (
      <ImageBackground source={require('../images/backgroup.png')} style={styles.backgroundImage}>
        <View style={styles.logoContainer}>
            <Image source={require('../images/logo1.png')} style={styles.logo} />
          </View>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="user" size={25} color="gray" style={styles.icon} />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ username: text })}
                value={this.state.username}
                placeholder="Username"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="lock" size={25} color="gray" style={styles.icon} />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={() => this.handleRegister()}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.handleLogin()}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: 750,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 70,
    paddingBottom:10

  },
  logo: {
    width: 110,
    height: 180
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
    marginTop: 10,
  },
  icon: {
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  registerText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },  
});
