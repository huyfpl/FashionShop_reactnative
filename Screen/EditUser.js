import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground , Image} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.data,
      name: '',
      username: '',
      password: '',
      address: '',
      phone: '',
      avatar: '',
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  async fetchUserData() {
    try {
      const response = await axios.get(`http://10.24.48.206:3000/edit_user/${this.state.data}`);
      const data = response.data;
      this.setState({
        name: data.ten,
        username: data.tentaikhoan,
        password: data.pass,
        address: data.dia_chi,
        phone: data.sdt,
        avatar: data.avatar,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleSave = async () => {
    const { name, username, password, address, phone, avatar } = this.state;

    // Gửi dữ liệu đã chỉnh sửa lên server để lưu thay đổi
    try {
      await axios.post(`http://10.24.48.206:3000/edit_user/${this.state.userId}`, {
        ten: name,
        tentaikhoan: username,
        pass: password,
        dia_chi: address,
        sdt: phone,
        avatar: avatar,
      });
      // Thông báo thành công và điều hướng về màn hình trước đó
      alert('Cập nhật thành công');
      this.props.navigation.goBack();
    } catch (error) {
      console.error(error);
      // Thông báo lỗi nếu có lỗi xảy ra
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
              onChangeText={(text) => this.setState({ name: text })}
              placeholder="Full Name"
              placeholderTextColor="gray"
              onSubmitEditing={() => this.passwordInput.focus()}
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="lock" size={25} color="gray" style={styles.icon} />
            </View>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder="Password"
              placeholderTextColor="gray"
              ref={(input) => (this.passwordInput = input)}
              onSubmitEditing={() => this.addressInput.focus()}
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
              onChangeText={(text) => this.setState({ address: text })}
              placeholder="Address"
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
              onChangeText={(text) => this.setState({ phone: text })}
              placeholder="Phone number"
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
              onChangeText={(text) => this.setState({ avatar: text })}
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
