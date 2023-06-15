import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { API_SIGNUP } from '../helpers/api';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      ten: '',
      dia_chi: '',
      sdt: '',
      avatar: '',
    };
  }

  handleRegister() {
    const { username, password, ten, dia_chi, sdt, avatar } = this.state;
    const url = API_SIGNUP;
    axios
      .post(url, {
        tentaikhoan: username,
        pass: password,
        ten: ten,
        dia_chi: dia_chi,
        sdt: sdt,
        avatar: avatar,
      })
      .then((response) => {
        this.props.navigation.navigate('Home');
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ImageBackground source={require('../images/backgroup.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../images/logo1.png')} style={styles.logo} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Icon name="user" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ ten: text })}
                value={this.state.ten}
                placeholder="Họ và tên"
                placeholderTextColor="gray"
                onSubmitEditing={() => this.usernameInput.focus()}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ username: text })}
                value={this.state.username}
                placeholder="Tài khoản"
                placeholderTextColor="gray"
                ref={(input) => (this.usernameInput = input)}
                onSubmitEditing={() => this.passwordInput.focus()}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="phone" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry
                placeholder="Mật khẩu"
                placeholderTextColor="gray"
                ref={(input) => (this.passwordInput = input)}
                onSubmitEditing={() => this.phoneInput.focus()}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="pencil" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ sdt: text })}
                value={this.state.sdt}
                placeholder="Số điện thoại"
                placeholderTextColor="gray"
                ref={(input) => (this.phoneInput = input)}
                onSubmitEditing={this.handleRegister}
                returnKeyType="done"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.handleRegister()}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    backgroundColor:'#DDDDDD',
    paddingHorizontal:5,
    borderRadius:10
  },
  icon: {
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
