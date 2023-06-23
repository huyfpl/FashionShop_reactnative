import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { API_LOGIN } from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userList: [],
      passwordVisible: false,
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
    try {
      const user = userList.find((user) => user.tentaikhoan === username.trim() && user.pass === password);
    const usernameExists = userList.some((user) => user.tentaikhoan === username.trim());
    const passwordExists = userList.some((user) => user.pass === password);

    if (username.trim().length === 0) {
      ToastAndroid.show('Không để rỗng!', ToastAndroid.SHORT);
      return;
    } else if (!usernameExists) {
      ToastAndroid.show('Tài khoản không tồn tại!', ToastAndroid.SHORT);
    }
    else if (!passwordExists) {
      ToastAndroid.show('Mật khẩu không đúng!', ToastAndroid.SHORT);
    }
    else if (!user) {
      ToastAndroid.show('Tài khoản hoặc mật khẩu không chính xác!', ToastAndroid.SHORT);
    } else {
      const userId = user.id.toString();
      AsyncStorage.setItem('userId', userId).then(() => {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        ToastAndroid.show('Chúc mừng bạn đăng nhập thành công ✓', ToastAndroid.SHORT);
      });
    }
    } catch (error) {
      ToastAndroid.show('Lỗi Mạng ✓', ToastAndroid.SHORT);
    }
    
  }


  handleRegister() {
    this.props.navigation.navigate('Register');
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      passwordVisible: !prevState.passwordVisible,
    }));
  };

  handlePasswordSubmit = () => {
    this.setState({
      password: this.state.password + '\n',
    });
  };
  handleHome=() => {
    this.props.navigation.navigate('Home');
    ToastAndroid.show('Chúc mừng bạn ✓', ToastAndroid.SHORT);
  }
  render() {
    const { passwordVisible } = this.state;

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
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
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
                secureTextEntry={!passwordVisible}
                returnKeyType="next"
                ref={(input) => (this.passwordInput = input)}
              />
                <TouchableOpacity style={styles.button} onPress={() => this.handleLogin()}>
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={this.togglePasswordVisibility}
              >
                <Icon
                  name={this.state.password.length > 0 ? (passwordVisible ? 'eye-slash' : 'eye') : ''}
                  size={20}
                  color="blue"
                  style={styles.icon}

                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={() => this.handleRegister()}>
              <Text style={styles.registerText}>Đăng kí</Text>
            </TouchableOpacity>

          
          </View>
        </View>
        <View>
        <TouchableOpacity style={styles.buttonHome} onPress={() => this.handleHome()}>
          {this.state.username.trim().length === 0 ? (
            <Image style={styles.vaohome} source={{ uri: 'https://iili.io/H6Z39fV.png' }} />
          ) : null}
        </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: "110%",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 70,
    paddingBottom: 10,
  },
  logo: {
    width: 110,
    height: 180,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    paddingBottom:50,
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
    position:'absolute',
    top:50,
    left:100
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
  buttonHome:{
  
  },
  vaohome:{
    width:55,
    height:55,
    position:'absolute',
    bottom:50,alignSelf:'center'
  
  }
});
