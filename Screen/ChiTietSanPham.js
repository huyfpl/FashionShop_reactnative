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
                            <Text style={styles.price}>{data.giaBan - (data.giaBan * data.phantramgiamgia / 100)}</Text>
                            <Text style={styles.kihieu}>đ</Text>
                        </View>

                    </View>
                    <View style={styles.description}>
                        <Text style={styles.mota} >Mô tả sản phẩm</Text>
                        <View style={styles.descriptionTextContainer}>
                            <Text style={styles.descriptionText}>
                                - Thương hiệu: khác; Độ tuổi áp dụng: 40-49 tuổi; Kích thước: 2XL, 3XL, 4XL, L, XL;
                                <Text>{"\n"}</Text>
                                - Mẫu quần áo phụ nữ trung niên và cao tuổi: màu trơn; Phong cách quần áo của phụ nữ trung niên và cao tuổi: đi làm;
                                <Text>{"\n"}</Text>
                                - Đi lại: đơn giản; Chiều dài quần: quần âu; phân loại màu: trắng, vàng, đen; dạng kết hợp: một mảnh; số mặt hàng: 931; mùa năm: hè 2022; độ dày: mỏng;
                                <Text>{"\n"}</Text>
                                - phiên bản quần áo: rộng rãi; chi tiết kiểu quần áo: túi; Quần chiều dài: quần; Thành phần chất liệu: khác 100%;
                                <Text>{"\n\n"}</Text>
                                Xin chào! Chào mừng bạn đến với cửa hàng của chúng tôi. Hy vọng bạn có một mua sắm tốt!
                                <Text>{"\n"}</Text>
                                Kính thưa:
                                <Text>{"\n"}</Text>
                                1. Tất cả các mặt hàng trong cửa hàng đều có trong kho. Thời gian giao hàng thông thường là 10 ngày.
                                <Text>{"\n"}</Text>
                                2. Nhiều sản phẩm mới được cập nhật trong cửa hàng của tôi mỗi ngày. Để giúp bạn nhận được chiết khấu lớn nhất, hãy chú ý theo dõi.
                                <Text>{"\n"}</Text>
                                3. Chúng tôi sẽ tiến hành kiểm tra chất lượng nghiêm ngặt về chất lượng của hàng hóa bạn mua. Nếu bạn có bất kỳ vấn đề chất lượng, xin vui lòng sử dụng "trò chuyện" để liên hệ với chúng tôi, chúng tôi sẽ giải quyết tất cả các vấn đề hợp lý cho bạn càng sớm càng tốt. Cảm ơn bạn!
                            </Text>
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
        color:"black",
        fontStyle:"normal"

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