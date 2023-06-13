import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

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
      const response = await axios.get(`http://192.168.0.103:3000/edit_user/${this.state.data}`);
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
      await axios.post(`http://192.168.0.103:3000/edit_user/${this.state.userId}`, {
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
      <View style={styles.container}>
        <Text style={styles.label}>Tên:</Text>
        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
        />

        <Text style={styles.label}>Tên tài khoản:</Text>
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />

        <Text style={styles.label}>Mật khẩu:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />

        <Text style={styles.label}>Địa chỉ:</Text>
        <TextInput
          style={styles.input}
          value={this.state.address}
          onChangeText={(text) => this.setState({ address: text })}
        />

        <Text style={styles.label}>Số điện thoại:</Text>
        <TextInput
          style={styles.input}
          value={this.state.phone}
          onChangeText={(text) => this.setState({ phone: text })}
        />

        <Text style={styles.label}>Avatar:</Text>
        <TextInput
          style={styles.input}
          value={this.state.avatar}
          onChangeText={(text) => this.setState({ avatar: text })}
        />

        <Button title="Lưu" onPress={this.handleSave} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
