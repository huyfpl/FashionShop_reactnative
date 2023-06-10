import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

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
    const url = 'http://192.168.1.12:3000/api/listuser';
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
        this.props.navigation.navigate('Home');
      console.log('Login successful');
    } else {
      console.log('Invalid credentials');
    }
  }
  handleRegister(){
    this.props.navigation.navigate('Register');
  }
  render() {
    return (
      <View style={styles.container}>
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
        <TouchableOpacity style={styles.button} onPress={() => this.handleLogin()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
