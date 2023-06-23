import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity ,ToastAndroid} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_LIST_USER_ID } from "../helpers/api";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      user: null,
      diachi: null,
    };
    this.handlePressLogin = this.handlePressLogin.bind(this)
    this.handlePressEdit = this.handlePressEdit.bind(this)
    this.handlePressCart = this.handlePressCart.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Thông tin của bạn',
    
    });
    this.getUserData();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getUserData();
    });
    
  }
  componentWillUnmount() {
    this.focusListener(); // Hủy bỏ listener khi component bị unmount
  }
  async getUserData() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      this.setState({ userId: userId }, () => {
        this.fetchUserData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchUserData() {
    const { userId } = this.state;
    try {
      const response = await axios.get(`${API_LIST_USER_ID}/${userId}`);
      const data = response.data;
      this.setState({ user: data.products }); 
    } catch (error) {
      console.error(error);
    }
  }
  handlePressLogin = async () => {
    try {
      await AsyncStorage.clear(); // Xóa toàn bộ dữ liệu trong AsyncStorage
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  handlePressEdit = () => {
     {this.state.userId?this.props.navigation.navigate('EditUser',{data: this.state.user}):
     ToastAndroid.show('Tính năng ko khả dụng bạn cần đăng nhập!', ToastAndroid.SHORT);}
      
  };
  handlePressSetting=() => {
    {this.state.userId?this.props.navigation.navigate('Setting',{data: this.state.user}):
     ToastAndroid.show('Tính năng ko khả dụng bạn cần đăng nhập!', ToastAndroid.SHORT);}
  }
  MyOrder=()=>{
    {this.state.userId?this.props.navigation.navigate('MyOrder',{data: this.state.user}):
     ToastAndroid.show('Tính năng ko khả dụng bạn cần đăng nhập!', ToastAndroid.SHORT);}
  }
  handlePressCart =()=>{
    this.props.navigation.navigate('Cart');
  }
  Doimatkhau=()=>{
    this.props.navigation.navigate('DoiMatKhau');
  }
  render() {
    const { user } = this.state;
    
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Tài khoản của tôi</Text>
        <View style={styles.contentContainer}>
        {user ? (
          <View>
            {user.map((item, index) => (
              <View key={index} style={styles.userInfoContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.ten}</Text>
                  <Image style={styles.veri} source={{uri:"https://iili.io/HPxwArl.png"}}/>
                  <View style={{marginTop:10}}><Text style={{fontSize:15,fontWeight:"bold"}}>Tên tài khoản: <Text style={styles.username}>{item.tentaikhoan}</Text></Text></View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text>.......Loading</Text>
        )}

        <View style={styles.buttonContainer}>
        <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="lock" size={25} color="gray" style={styles.icon1} />
            </View>
            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => this.Doimatkhau()}>
              <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <View style={styles.iconContainerChevron}>
              <Icon name="chevron-right" size={25} color="gray" />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="shopping-cart" size={25} color="gray" style={styles.icon2} />
            </View>
            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => this.MyOrder()}>
              <Text style={styles.buttonText}>Đơn hàng của tôi</Text>
            </TouchableOpacity>
            <View style={styles.iconContainerChevron}>
              <Icon name="chevron-right" size={25} color="gray" />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="gear" size={25} color="gray" style={styles.icon3} />
            </View>
            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => this.handlePressCart()} >
              <Text style={styles.buttonText}>Giỏ hàng</Text>
            </TouchableOpacity>
            <View style={styles.iconContainerChevron}>
              <Icon name="chevron-right" size={25} color="gray" />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="user" size={25} color="gray" style={styles.icon4} />
            </View>
            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => this.handlePressEdit()}>
              <Text style={styles.buttonText}>Cập nhật lại thông tin</Text>
            </TouchableOpacity>
            <View style={styles.iconContainerChevron}>
              <Icon name="chevron-right" size={25} color="gray" />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="home" size={25} color="gray" style={styles.icon5} />
            </View>
            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => this.handlePressSetting()}>
              <Text style={styles.buttonText}>Cài đặt</Text>
            </TouchableOpacity>
            <View style={styles.iconContainerChevron}>
              <Icon name="chevron-right" size={25} color="gray" />
            </View>
          </View>
        </View>
        </View>
        {this.state.userId? <TouchableOpacity style={styles.logoutButton} onPress={() => this.handlePressLogin()}>
          
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>:<TouchableOpacity style={styles.loginButton} onPress={() => this.handlePressLogin()}>
          
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>}
       
      </View>
    );
  }
}
const styles = StyleSheet.create({

  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginLeft: 10,
    alignSelf:'center',
    paddingTop:20,
    color:'#3399FF'

  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FF3399',
    paddingHorizontal:10
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 15,
    color: 'blue',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    margin: 15,

  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    width: 300,
    height: 50
  },
  loginButton: {
    backgroundColor: '#00FF00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    width: 300,
    height: 50
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  iconContainer: {
    marginRight: 10,
    marginTop: 10,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 0,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  iconContainerChevron: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    marginTop: 15
  },
  icon1:{
    marginLeft:9
  },
  icon2:{
    marginLeft:3
  },
  icon3:{
    marginLeft:5
  },
  icon4:{
    marginLeft:7
  },
  icon5:{
    marginLeft:5
  },
  veri:{
    width:20,
    height:20,
    position:"absolute",
    left:125,
    top:2
  }
});
