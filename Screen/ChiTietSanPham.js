import React from 'react';
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback, ScrollView, Pressable, ToastAndroid } from "react-native";
import SanPham from '../Component/SanPham';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { API_ADD_GIOHANG_USER } from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default class ChiTietSanPham extends React.Component {
    constructor(props) {
        super(props);
    }

    themyeuthich = () => {
        const data = this.props.route.params.data;
        ToastAndroid.show('Đã thêm vào yêu thích ✓', ToastAndroid.SHORT);
    }
    giohang = () => {
        this.props.navigation.navigate('Cart')
    }
    componentDidMount() {
        const { navigation, route } = this.props;
        navigation.setOptions({
            title: "",
            headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    <TouchableOpacity onPress={() => this.giohang()}>
                        <MaterialCommunityIcons name="cart" size={26} style={{ marginRight: 10, color: '#FF4D15' }} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.themyeuthich()}>
                        <MaterialCommunityIcons name="heart" size={26} style={{ color: '#C5C5C5' }} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }
    addToCart = async () => {
        const data = this.props.route.params.data;
        console.log(data.idSP);
        const userId = await AsyncStorage.getItem('userId');

        console.log(userId);
        if (!userId) {
            ToastAndroid.show('bạn chưa đăng nhập!', ToastAndroid.SHORT);
            this.props.navigation.navigate("Login");
        } else {
            try {
                await axios.post(`${API_ADD_GIOHANG_USER}/${userId}/${data.idSP}`);
                ToastAndroid.show('Đã thêm vào giỏ hàng ✓', ToastAndroid.SHORT);
            } catch (error) {
                ToastAndroid.show('Lỗi bất định!', ToastAndroid.SHORT);
            }
        }
    }
    render() {
        const data = this.props.route.params.data;
        console.log(data)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.anh}>
                        <Image source={{ uri: data.anhSP }}
                            style={styles.img}
                            resizeMode="contain" />

                    </View>
                    <View style={styles.name_price}>
                        <Text style={styles.name}>{data.tenSP}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.price}>{data.giaBan}</Text>
                            <Text style={styles.kihieu}>đ</Text>
                        </View>

                    </View>
                    <View style={styles.description}>
                        <Text style={styles.mota} >Mô tả sản phẩm</Text>
                        <View style={styles.descriptionTextContainer}>
                            <Text style={styles.descriptionText}>fefefdfdfdfffffffffffffffffff fffffffffffffffffffffffffffff fefefefefefefeffefefefefe fefefefefhejfhje j
                                fefefdfdfdfffffffffffffffffff fffffffffffffffffffffffffffff fefefefefefefeffefefefefe fefefefefhejfhje jfhejfhjehehjehfje jfhejhfjehfej
                                fefefdfdfdfffffffffffffffffff fffffffffffffffffffffffffffff fefefefefefefeffefefefefe fefefefefhejfhje jfhejfhjehehjehfje jfhejhfjehfejfhejfhjehehjehfje jfhejhfjehfej</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.pay_cart}>
                    <Pressable
                        style={styles.press_pay}
                        onPress={() => console.log('Mua ngay pressed')}
                    >
                        <Text style={styles.pay}>Mua ngay</Text>
                    </Pressable>

                    <Pressable
                        style={styles.press_cart}
                        onPress={() => this.addToCart()}
                    >
                        <MaterialCommunityIcons name="cart" size={20} style={{ color: 'white' }} />
                        <Text style={styles.cart}>Thêm vào giỏ hàng</Text>
                    </Pressable>
                </View>
            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3E3E3'
    },
    anh: {
        backgroundColor: '#FFFFFF',
        width: "100%",
    },
    img: {
        height: 320,
        width: "100%",


    },
    name_price: {
        backgroundColor: '#FFFFFF',
        width: "100%",
        marginTop: 3
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 5

    },
    price: {
        fontSize: 20,
        color: '#F26C42',
        marginLeft: 10,
        marginRight: 5
    },
    kihieu: {
        fontSize: 20,
        color: '#F26C42',
        textDecorationLine: 'underline'
    },
    mota: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10
    },
    description: {
        marginTop: 2,
        backgroundColor: '#FFFFFF',

    },
    descriptionTextContainer: {
        width: '100%',
        paddingHorizontal: 10,
        padding: 5
    },
    descriptionText: {
        fontSize: 16,

    },
    pay_cart: {
        flexDirection: 'row',
        height: 50
    },
    press_pay: {
        backgroundColor: '#FF4D15',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pay: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    press_cart: {
        backgroundColor: '#0A9674',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cart: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: -5
    },

})