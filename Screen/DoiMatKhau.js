import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, ToastAndroid,TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_UPDATE_USER_ID } from '../helpers/api';
import { API_LOGIN } from '../helpers/api';

export default class DoiMatKhau extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            userList: [],
            isChanged: false,
            passwordVisible: false,
            passwordVisiblenew: false,
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            title: 'Đổi mật khẩu'
        });
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

    handleInputChange = (key, value) => {
        this.setState({
            [key]: value,
            isChanged: true,
        });
    };

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            passwordVisible: !prevState.passwordVisible,
        }));
    };
    togglePasswordVisibilityNew = () => {
        this.setState((prevState) => ({
            passwordVisiblenew: !prevState.passwordVisiblenew,
        }));
    };
    handleSave = async () => {
        const { oldPassword, newPassword, confirmPassword, userList, isChanged, passwordVisible } = this.state;

        if (newPassword !== confirmPassword) {
            alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        if (newPassword === oldPassword) {
            alert('Mật khẩu mới không được trùng với mật khẩu cũ.');
            return;
        }

        const isOldPasswordCorrect = userList.some((user) => user.pass === oldPassword);
        if (!isOldPasswordCorrect) {
            alert('Mật khẩu hiện tại không đúng.');
            return;
        }
        try {
            if (isChanged) {
                const userId = await AsyncStorage.getItem('userId');
                const updatedUser = {
                    pass: newPassword
                };
                await axios.post(`${API_UPDATE_USER_ID}/${userId}`, updatedUser);
                ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
                setTimeout(() => { this.props.navigation.goBack(); }, 1000)
            } else {

            }
        } catch (error) {
            console.error(error);
            alert('Đã xảy ra lỗi');
        }

    };

    render() {
        const {passwordVisible,passwordVisiblenew } = this.state;
        return (
            <ImageBackground source={require('../images/backgroup.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../images/logo1.png')} style={styles.logo} />
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Đổi mật khẩu</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={25} color="gray" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                value={this.state.oldPassword}
                                onChangeText={(text) => this.handleInputChange('oldPassword', text)}
                                placeholder="Mật khẩu hiện tại"
                                placeholderTextColor="gray"
                                secureTextEntry={!passwordVisible}
                            />
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={this.togglePasswordVisibility}
                            >
                                <Icon
                                    name={this.state.oldPassword.length > 0 ? (passwordVisible ? 'thumbs-o-up' : 'thumbs-o-down') : ''}
                                    size={20}
                                    color="blue"
                                    style={styles.icon}

                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={25} color="gray" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                value={this.state.newPassword}
                                onChangeText={(text) => this.handleInputChange('newPassword', text)}
                                placeholder="Mật khẩu mới"
                                placeholderTextColor="gray"
                                secureTextEntry={!passwordVisiblenew}
                            />
                             <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={this.togglePasswordVisibilityNew}
                            >
                                <Icon
                                    name={this.state.newPassword.length > 0 ? (passwordVisiblenew ? 'eye-slash' : 'eye') : ''}
                                    size={20}
                                    color="blue"
                                    style={styles.icon}

                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={25} color="gray" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                value={this.state.confirmPassword}
                                onChangeText={(text) => this.handleInputChange('confirmPassword', text)}
                                placeholder="Xác nhận mật khẩu mới"
                                placeholderTextColor="gray"
                                secureTextEntry={!passwordVisiblenew}
                            />
                              <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={this.togglePasswordVisibilityNew}
                            >
                                <Icon
                                    name={this.state.confirmPassword.length > 0 ? (passwordVisiblenew ? 'eye-slash' : 'eye') : ''}
                                    size={20}
                                    color="blue"
                                    style={styles.icon}

                                />
                            </TouchableOpacity>
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
    iconContainer: {
        marginRight: 10,
        marginTop: 10,
        position:'absolute',
        right:-10
      },
      icon: {
        alignSelf: 'center',
        
      },
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
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
    buttonContainer: {
        marginTop: 20,
    },
});
