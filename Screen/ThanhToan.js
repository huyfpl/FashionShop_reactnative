import React, { Component } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';


export default class ThanhToan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProducts: [],
            danhMuc: {},
            tongtien: {},
            tongsoluong: {},
            selectedPaymentMethod: null
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.setOptions({
            title: "Thanh toán",

        });
        const { selectedProducts } = this.props.route.params;
        const danhMuc = {};

        selectedProducts.forEach((item) => {
            const category = item.tenDanhMuc;
            if (!danhMuc[category]) {
                danhMuc[category] = [];
            }
            danhMuc[category].push(item);
        });

        const tongtien = this.calculateTotal(danhMuc);
        const tongsoluong = this.calculatetongsoluong(danhMuc);

        this.setState({
            selectedProducts,
            danhMuc,
            tongtien,
            tongsoluong
        });
    }
    calculatetongsoluong(danhMuc) {
        const tongsoluong = {};

        Object.keys(danhMuc).forEach((categoryName) => {
            const categoryItems = danhMuc[categoryName];
            let totalQuantity = 0;

            categoryItems.forEach((item) => {
                totalQuantity += item.soluong;
            });

            tongsoluong[categoryName] = totalQuantity;
        });

        return tongsoluong;
    }
    calculateTotal(danhMuc) {
        const tongtien = {};

        Object.keys(danhMuc).forEach((categoryName) => {
            const categoryItems = danhMuc[categoryName];
            let totalAmount = 0;

            categoryItems.forEach((item) => {
                const itemAmount =
                    item.phantramgiamgia > 0
                        ? item.giaBan - (item.giaBan * item.phantramgiamgia) / 100
                        : item.giaBan;
                totalAmount += itemAmount * item.soluong;
            });

            tongtien[categoryName] = totalAmount;
        });

        return tongtien;
    }
    handlePaymentMethodChange = (item) => {
        this.setState({ selectedPaymentMethod: item.value });
    };

    render() {
        const { danhMuc, tongtien, tongsoluong } = this.state;
        const { selectedProducts } = this.props.route.params;
        const { selectedPaymentMethod } = this.state;
        const paymentMethods = [
            { label: 'Thanh toán khi nhận hàng', value: 'cash_on_delivery' },
            { label: 'Thẻ bạn', value: 'your_card' },
        ];
        return (
            <View style={{ flex: 1, marginBottom: 50, backgroundColor: "red" }}>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.all_diachi}>
                            <Image source={{ uri: "https://iili.io/HPGJV6X.png" }} style={styles.icon_gps} />
                            <View>
                                <Text style={styles.tieude_diachi}>Địa chỉ nhận hàng</Text>
                                <View key={1} style={styles.diachiItem}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.ten}>{selectedProducts[0].ten}</Text>
                                        <Text style={{
                                            color: "black",
                                            fontSize: 16
                                        }}>{"| (+84) "}</Text>
                                        <Text style={styles.sdt}>{selectedProducts[0].sdt}</Text>
                                    </View>

                                    <Text style={styles.diachi}>{selectedProducts[0].dia_chi}</Text>
                                </View>

                            </View>

                        </View>
                        {
                            Object.keys(danhMuc).map((categoryName) => (

                                <View key={categoryName} style={styles.all}>

                                    <View style={styles.categoryHeader}>
                                        <Text style={styles.yeuthich}>Yêu thích</Text>
                                        <Text style={styles.categoryTitle}>{categoryName}</Text>

                                    </View>
                                    {danhMuc[categoryName].map((item) => (
                                        <View key={item.idSP} style={styles.productItem}>
                                            <View style={styles.productall}>
                                                <View style={styles.productInfo}>
                                                    <Image
                                                        source={{ uri: item.anhSP }}
                                                        style={styles.productImage}
                                                    />
                                                    <View style={styles.productDetails}>
                                                        <Text style={styles.productName}>{item.tenSP.length > 10 ? item.tenSP.slice(0, 32) + '...' : item.tenSP}</Text>

                                                        <Text style={styles.phanloai}>
                                                            Phân loại: {item.sizesp}
                                                        </Text>

                                                        <Text style={styles.giaBan}>

                                                            {item.phantramgiamgia > 0
                                                                ? item.giaBan -
                                                                (item.giaBan * item.phantramgiamgia) / 100
                                                                : item.giaBan} Vnđ{""}
                                                        </Text>


                                                    </View>

                                                </View>

                                            </View>
                                            <Text style={styles.soluong}>{"x"}{item.soluong}</Text>
                                        </View>
                                    ))}
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.categoryTotal}>
                                            Tổng số tiền({tongsoluong[categoryName]} {"sản phẩm"}):

                                        </Text>
                                        <Text style={styles.categorytongtien}>

                                            {tongtien[categoryName]}{" Vnđ"}
                                        </Text>
                                    </View>

                                </View>
                            ))}
                        <View style={styles.paymentMethod}>
                            <Text style={styles.paymentMethodTitle}>Phương thức thanh toán</Text>
                            <DropDownPicker
                                items={paymentMethods}
                                defaultValue={selectedPaymentMethod}
                                containerStyle={styles.dropdownContainer}
                                style={styles.dropdown}
                                itemStyle={styles.dropdownItem}
                                dropDownStyle={styles.dropdownMenu}
                                onChangeItem={item => this.setState({ selectedPaymentMethod: item.value })}
                                placeholder="Chọn phương thức thanh toán"
                                searchable={false}
                            />
                        </View>
                    </ScrollView>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBE7E7",
    },
    all: {
        marginBottom: 8,
        marginTop: 8,
        backgroundColor: "white"
    },
    categoryHeader: {
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 5,
        marginLeft: 10
    },
    categoryTotal: {
        fontSize: 15,
        margin: 15
        ,
        fontWeight: "400"
    },
    categorytongtien: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#EF5435",
        margin: 15,
    },
    productItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        backgroundColor: '#F0F0F0',
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 8,
    },
    productInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    productName: {
        fontSize: 16,
        color: "black",
        fontWeight: "500",
        marginBottom: 4,
    },
    phanloai: {
        color: "#5C5C5C",
        marginBottom: 5
    },
    giaBan: {
        fontSize: 15,
        marginBottom: 4,
        color: "red"
    },
    diaChi: {
        fontSize: 14,
        marginBottom: 4,
    },
    tenDanhMuc: {
        fontSize: 14,
        fontStyle: "italic",
    },
    all_diachi: {
        flexDirection: 'row',
        backgroundColor: "#CCE5FF",
        padding: 10,
        borderBottomWidth: 5,
        borderColor: "#FF3333",

    },
    icon_gps: {
        width: 40,
        height: 40,
        margin: 5,
        marginLeft: 5,
        marginTop: 0
    },
    tieude_diachi: {
        marginTop: 10,
        marginLeft: 8, color: "black",
        fontSize: 16
    },
    diachiItem: {
        marginTop: 5,
        marginLeft: 8,

    },
    ten: {
        color: "black",
        fontSize: 16
    },
    sdt: {
        color: "black",
        fontSize: 16
    },
    diachi: {
        color: "black",
        fontSize: 16
    },
    yeuthich: {
        color: "white",
        backgroundColor: "#EE4D2D",
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 2,
        marginLeft: 15
    },
    soluong: {
        position: "absolute",
        right: 30,
        top: 62,
        color: "#5C5C5C",
        fontSize: 15
    },
    // thanh toán
    paymentMethod: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    paymentMethodTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dropdownContainer: {
        height: 40,
    },
    dropdown: {
        backgroundColor: '#F0F0F0',
    },
    dropdownItem: {
        justifyContent: 'flex-start',
    },
    dropdownMenu: {
        backgroundColor: '#F0F0F0',
    },
});
