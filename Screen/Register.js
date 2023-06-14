import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
<<<<<<< Updated upstream
      <View style={styles.container}>
         <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ ten: text })}
          value={this.state.ten}
        />
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry
        />
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ sdt: text })}
          value={this.state.sdt}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.handleRegister()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
=======
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
                onSubmitEditing={() => this.usernameInput.focus()} // Nhảy đến ô input username khi nhấn Enter
                returnKeyType="next"
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
                ref={(input) => (this.usernameInput = input)} // Gán ref cho ô input username
                onSubmitEditing={() => this.passwordInput.focus()} // Nhảy đến ô input password khi nhấn Enter
                returnKeyType="next"
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
                ref={(input) => (this.passwordInput = input)} // Gán ref cho ô input password
                onSubmitEditing={() => this.phoneInput.focus()} // Nhảy đến ô input phone khi nhấn Enter
                returnKeyType="next"
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
                ref={(input) => (this.phoneInput = input)} // Gán ref cho ô input phone
                onSubmitEditing={this.handleRegister} // Khi nhấn Enter ở ô input phone, thực hiện hàm handleRegister
                returnKeyType="done"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.handleRegister()}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
>>>>>>> Stashed changes
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
