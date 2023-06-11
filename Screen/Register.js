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
