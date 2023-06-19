import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image,ToastAndroid } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_UPDATE_USER_ID } from '../helpers/api';

export default class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      phone: '',
      avatar: '',
      isChanged: false, 
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData() {
    try {
      const { data } = this.props.route.params;
      this.setState({
        name: data[0].ten,
        address: data[0].dia_chi,
        phone: data[0].sdt,
        avatar: data[0].avatar,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value,
      isChanged: true, 
    });
  };

  handleSave = async () => {
    const { name, address, phone, avatar, isChanged } = this.state;
    const { data } = this.props.route.params;

    try {
      if (isChanged) { 
        const userId = await AsyncStorage.getItem('userId');
        const updatedUser = {
          ten: name,
          dia_chi: address,
          sdt: phone,
          avatar: avatar,
        };

        await axios.post(`${API_UPDATE_USER_ID}/${userId}`, updatedUser);
        ToastAndroid.show('Cập nhật thành công ✓', ToastAndroid.SHORT); 
      } else {
        
      }

      this.props.navigation.goBack();
    } catch (error) {
      console.error(error);
      alert('Đã xảy ra lỗi');
    }
  };

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
                value={this.state.name}
                onChangeText={(text) => this.handleInputChange('name', text)}
                placeholder="Họ và tên"
                placeholderTextColor="gray"
                onSubmitEditing={() => this.passwordInput.focus()}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="home" size={25} color="gray" style={styles.icon} />
              </View>
              <TextInput
                style={styles.input}
                value={this.state.address}
                onChangeText={(text) => this.handleInputChange('address', text)}
                placeholder="Địa chỉ"
                placeholderTextColor="gray"
                ref={(input) => (this.addressInput = input)}
                onSubmitEditing={() => this.phoneInput.focus()}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="phone" size={25} color="gray" style={styles.icon} />
              </View>
              <TextInput
                style={styles.input}
                value={this.state.phone}
                onChangeText={(text) => this.handleInputChange('phone', text)}
                placeholder="Số điện thoại"
                placeholderTextColor="gray"
                ref={(input) => (this.phoneInput = input)}
                onSubmitEditing={() => this.avatarInput.focus()}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Icon name="user" size={25} color="gray" style={styles.icon} />
              </View>
              <TextInput
                style={styles.input}
                value={this.state.avatar}
                onChangeText={(text) => this.handleInputChange('avatar', text)}
                placeholder="Avatar"
                placeholderTextColor="gray"
                ref={(input) => (this.avatarInput = input)}
                onSubmitEditing={this.handleSave}
                returnKeyType="done"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Lưu" onPress={this.handleSave} />
            </View>
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
