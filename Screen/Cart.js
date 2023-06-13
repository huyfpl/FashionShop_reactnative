import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
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
      danhMuc: {}, // Lưu trữ danh sách danh mục
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

      this.setState({ giohang, danhMuc });
    } catch (error) {
      console.error(error);
    }
  }

  handleIncreaseQuantity = (itemIndex) => {
    // Logic to increase quantity for the product at itemIndex
  }

  handleDecreaseQuantity = (itemIndex) => {
    // Logic to decrease quantity for the product at itemIndex
  }

  renderProductItem = ({ item, index }) => {
    return (
      <View style={styles.productItem}>
        <View style={styles.productInfo}>
          <Image source={{ uri: item.anhSP }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.tenSP}</Text>
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
    const { danhMuc } = this.state;
    return (
      <View style={styles.container}>
        {Object.keys(danhMuc).length > 0 ? (
          Object.keys(danhMuc).map(categoryName => (
            <View key={categoryName} style={styles.carouselContainer}>
              <Text style={styles.title}>{categoryName}</Text>
              <Carousel
              data={danhMuc[categoryName]}
              renderItem={this.renderProductItem}
              sliderHeight={100} 
              itemHeight={150} 
              vertical={true} 
              contentContainerStyle={styles.carouselContentContainer}
            />
            </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>No user data available</Text>
        )}
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
  carouselContainer:{
  backgroundColor:'red',
  },
  carouselContentContainer:{
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
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
  emptyCartText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

