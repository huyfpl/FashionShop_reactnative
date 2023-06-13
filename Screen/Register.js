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
        // Xử lý sau khi đăng kí thành công
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
              <View style={styles.iconContainer}>
                <Icon name="user" size={25} color="gray" style={styles.icon} />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ ten: text })}
                value={this.state.ten}
                placeholder="Full Name"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="lock" size={25} color="gray" style={styles.icon} />
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
                <Icon name="phone" size={25} color="gray" style={styles.icon} />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="pencil" size={25} color="gray" style={styles.icon} />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ sdt: text })}
                value={this.state.sdt}
                placeholder="Phone Number"
                placeholderTextColor="gray"
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
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
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
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: 750,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 10,
    marginBottom: 20,
  },
  logo: {
    width: 110,
    height: 180,
  },
});
