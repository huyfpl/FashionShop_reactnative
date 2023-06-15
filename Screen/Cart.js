import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_LISTGIOHANG_USER_ID, API_TANG_SOLUONG_GIOHANG, API_GIAM_SOLUONG_GIOHANG} from "../helpers/api";
import axios from "axios";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      giohang: null,
      danhMuc: {},
      selectedCategory: null,
      tongTien: 0,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  async getUserData() {
    try {
      const userId = await AsyncStorage.getItem("userId");
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
      const response = await axios.get(`${API_LISTGIOHANG_USER_ID}/${userId}`);
      const data = response.data;
      const giohang = data.products;
      const danhMuc = {};

      giohang.forEach((item) => {
        if (!danhMuc[item.ten_danhmuc]) {
          danhMuc[item.ten_danhmuc] = [];
        }
        danhMuc[item.ten_danhmuc].push(item);
      });

      let tongTien = 0;
      giohang.forEach((item) => {
        tongTien += item.giaBan * item.soluong;
      });

      this.setState({ giohang, danhMuc, tongTien });
    } catch (error) {
      console.error(error);
    }
  }

  handleCategoryPress = (categoryName) => {
    this.setState({ selectedCategory: categoryName });
  };

  handleIncreaseQuantity = async (idSP, soluong) => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.post(`${API_TANG_SOLUONG_GIOHANG}/${userId}/${idSP}`);
      this.fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };
  
  handleDecreaseQuantity = async (idSP, soluong) => {
    const userId = await AsyncStorage.getItem('userId');
    try {
      const response = await axios.post(`${API_GIAM_SOLUONG_GIOHANG}/${userId}/${idSP}`);
      this.fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };  
  

  calculateTotal = () => {
    const { giohang } = this.state;
    let tongTien = 0;
    giohang.forEach((item) => {
      tongTien += item.giaBan * item.soluong;
    });
    this.setState({ tongTien });
  };

  renderProductItem = ({ item, index }) => {
    return (
      <View style={styles.productItem}>
        <View style={styles.productInfo}>
          <Image source={{ uri: item.anhSP }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.tenSP}</Text>
            <Text style={styles.giaBan}>Giá: {item.giaBan}</Text>
            <View style={styles.quantityContainer}>
              <Button
                icon="minus"
                mode="outlined"
                onPress={() => this.handleDecreaseQuantity(item.idSP, item.soluong)}
                style={styles.quantityButton}
              />
              <Text style={styles.quantityText}>{item.soluong}</Text>
              <Button
                icon="plus"
                mode="outlined"
                onPress={() => this.handleIncreaseQuantity(item.idSP, item.soluong)}
                style={styles.quantityButton}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { giohang, tongTien } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {giohang && giohang.length > 0 ? (
            giohang.map((item, index) => (
              <View key={index} style={styles.productItem}>
                <View style={styles.productInfo}>
                  <Image
                    source={{ uri: item.anhSP }}
                    style={styles.productImage}
                  />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.tenSP}</Text>
                    <Text style={styles.giaBan}>Giá: {item.giaBan}</Text>
                    <View style={styles.quantityContainer}>
                      <Button
                        icon="minus"
                        mode="outlined"
                        onPress={() =>
                          this.handleDecreaseQuantity(item.idSP, item.soluong)
                        }
                        style={styles.quantityButton}
                      />
                      <Text style={styles.quantityText}>{item.soluong}</Text>
                      <Button
                        icon="plus"
                        mode="outlined"
                        onPress={() =>
                          this.handleIncreaseQuantity(item.idSP, item.soluong)
                        }
                        style={styles.quantityButton}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.title}>Không có sản phẩm</Text>
          )}
        </ScrollView>

        {/* Hiển thị tổng tiền và nút thanh toán */}
        <View style={styles.bottomContainer}>
          <View style={styles.totalTextContainer}>
            <Text style={styles.totalText}>Tổng tiền: {tongTien}</Text>
          </View>
          <Button
            mode="contained"
            onPress={this.handlePayment}
            style={styles.paymentButton}
          >
            Thanh toán
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    marginHorizontal: 5,
    borderColor: "#000",
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 8,
    color: "red",
  },
  totalTextContainer: {
    marginRight: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ee4d2d", // Shopee's primary color
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  paymentButton: {
    backgroundColor: "#ee4d2d", // Shopee's primary color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
