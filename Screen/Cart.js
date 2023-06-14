import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_LISTGIOHANG_USER_ID } from "../helpers/api";
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      giohang: null,
      danhMuc: {},
      selectedCategory: null, // Danh mục được chọn
      tongTien: 0,
    };
  }

  componentDidMount() {
    this.getUserData();
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
      const response = await axios.get(`${API_LISTGIOHANG_USER_ID}/${userId}`);
      const data = response.data;
      const giohang = data.products;
      const danhMuc = {};

      giohang.forEach(item => {
        if (!danhMuc[item.ten_danhmuc]) {
          danhMuc[item.ten_danhmuc] = [];
        }
        danhMuc[item.ten_danhmuc].push(item);
      });

      let tongTien = 0;
      giohang.forEach(item => {
        tongTien += item.giaBan * item.soluong;
      });

      this.setState({ giohang, danhMuc, tongTien });
    } catch (error) {
      console.error(error);
    }
  }

  handleCategoryPress = (categoryName) => {
    this.setState({ selectedCategory: categoryName });
  }

  hhandleIncreaseQuantity = (itemIndex) => {
    const { giohang } = this.state;
    giohang[itemIndex].soluong += 1;
    this.calculateTotal(); // Thêm dòng này
  }
  
  handleDecreaseQuantity = (itemIndex) => {
    const { giohang } = this.state;
    if (giohang[itemIndex].soluong > 1) {
      giohang[itemIndex].soluong -= 1;
      this.calculateTotal(); // Thêm dòng này
    }
  }

  calculateTotal = () => {
    const { giohang } = this.state;
    let tongTien = 0;
    giohang.forEach(item => {
      tongTien += item.giaBan * item.soluong;
    });
    this.setState({ tongTien });
  }

  renderProductItem = ({ item, index }) => {
    return (
      <View style={styles.productItem}>
        <View style={styles.productInfo}>
          <Image source={{ uri: item.anhSP }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.tenSP}</Text>
            <Text style={styles.giaBan}>Giá: {item.giaBan}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => this.handleDecreaseQuantity(index)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.soluong}</Text>
              <TouchableOpacity onPress={() => this.handleIncreaseQuantity(index)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
  const { danhMuc, tongTien, selectedCategory } = this.state;
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Hiển thị các danh mục */}
        {Object.keys(danhMuc).map(categoryName => (
          <TouchableOpacity
            key={categoryName}
            style={styles.categoryButton}
            onPress={() => this.handleCategoryPress(categoryName)}
          >
            <Text style={styles.categoryButtonText}>{categoryName}</Text>
          </TouchableOpacity>
        ))}

        {/* Hiển thị sản phẩm trong danh mục được chọn */}
        {selectedCategory && danhMuc[selectedCategory] ? (
          <View style={styles.categoryProducts}>
            <Text style={styles.title}>{selectedCategory}</Text>
            <FlatList
              data={danhMuc[selectedCategory]}
              renderItem={this.renderProductItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null}
      </ScrollView>

      {/* Hiển thị tổng tiền và nút thanh toán */}
      <View style={styles.bottomContainer}>
        <View style={styles.totalTextContainer}>
          <Text style={styles.totalText}>Tổng tiền: {tongTien}</Text>
        </View>
        <TouchableOpacity style={styles.paymentButton} onPress={this.handlePayment}>
          <Text style={styles.paymentButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  categoryButton: {
    backgroundColor: '#ebebeb',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryProducts: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalTextContainer: {
    marginRight: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
