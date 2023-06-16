import React from "react";
import { View, Text, Image, StyleSheet, ScrollView,ToastAndroid } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_LISTGIOHANG_USER_ID, API_TANG_SOLUONG_GIOHANG, API_GIAM_SOLUONG_GIOHANG } from "../helpers/api";
import axios from "axios";

export default class Cart extends React.Component {
  state = {
    userId: null,
    giohang: [],
    danhMuc: {},
    selectedItems: {},
    tongTien: 0,
  };

  componentDidMount() {
    this.getUserData();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getUserData();
    });
    
  }
  componentWillUnmount() {
    this.focusListener(); 
  }

  async getUserData() {
    try {
      const userId = await AsyncStorage.getItem("userId");
      this.setState({ userId }, () => {
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
      const giohang = response.data.products;
      const danhMuc = {};

      giohang.forEach((item) => {
        const category = item.ten_danhmuc;
        if (!danhMuc[category]) {
          danhMuc[category] = [];
        }
        danhMuc[category].push(item);
      });

      this.setState({ giohang, danhMuc });
      this.calculateTotal();
    } catch (error) {
      console.error(error);
    }
  }

  handleCategoryPress = (categoryName, itemId) => {
    this.setState((prevState) => {
      const { selectedItems } = prevState;
      const categoryItems = selectedItems[categoryName] || {};
      const isSelected = categoryItems[itemId];

      return {
        selectedItems: {
          ...selectedItems,
          [categoryName]: {
            ...categoryItems,
            [itemId]: !isSelected,
          },
        },
      };
    }, this.calculateTotal);
  };

  handleIncreaseQuantity = async (idSP, soluong) => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      await axios.post(`${API_TANG_SOLUONG_GIOHANG}/${userId}/${idSP}`);
      this.fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };

  handleDecreaseQuantity = async (idSP, soluong) => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      await axios.post(`${API_GIAM_SOLUONG_GIOHANG}/${userId}/${idSP}`);
      this.fetchUserData();
    } catch (error) {
      console.error(error);
    }
  };

  handleSelectAll = (categoryName) => {
    this.setState((prevState) => {
      const { selectedItems, danhMuc } = prevState;
      const categoryItems = selectedItems[categoryName] || {};
      const allSelected = Object.keys(categoryItems).length === danhMuc[categoryName].length;

      let updatedCategoryItems = {};
      if (!allSelected) {
        // Select all items
        danhMuc[categoryName].forEach((item) => {
          updatedCategoryItems[item.idSP] = true;
        });
      }

      return {
        selectedItems: {
          ...selectedItems,
          [categoryName]: updatedCategoryItems,
        },
      };
    }, this.calculateTotal);
  };

  calculateTotal = () => {
    const { giohang, selectedItems } = this.state;
    let total = 0;

    Object.keys(selectedItems).forEach((categoryName) => {
      const items = selectedItems[categoryName];
      giohang.forEach((item) => {
        if (item.ten_danhmuc === categoryName && items[item.idSP]) {
          total += item.giaBan * item.soluong;
        }
      });
    });

    this.setState({ tongTien: total });
  };

  handlePayment = (value) => {
    if(value==0){
      console.warn("chưa có đơn hàng nào")
    }
    else{
      console.warn("ấy ấy chưa làm")
    }
   
  };

  render() {
    const { giohang, tongTien, danhMuc, selectedItems } = this.state;
    const allSelected = (categoryName) => {
      const categoryItems = selectedItems[categoryName] || {};
      return Object.keys(categoryItems).length === danhMuc[categoryName].length;
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          {Object.keys(danhMuc).map((categoryName) => (
            <View key={categoryName} style={styles.all}>
              <View style={styles.categoryHeader}>
                <Checkbox
                  status={allSelected(categoryName) ? "checked" : "unchecked"}
                  onPress={() => this.handleSelectAll(categoryName)}
                  style={styles.selectAllButton}
                  color="#3399ff"
                />
                <Text style={styles.categoryTitle}>{categoryName}</Text>
              </View>
              {danhMuc[categoryName].map((item) => (
                <View key={item.idSP} style={styles.productItem}>
                  <View style={styles.productInfo}>
                    <Checkbox
                      status={selectedItems[categoryName]?.[item.idSP] ? "checked" : "unchecked"}
                      onPress={() => this.handleCategoryPress(categoryName, item.idSP)}
                      color="#3399ff"
                    />
                    <Image source={{ uri: item.anhSP }} style={styles.productImage} />
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{item.tenSP}</Text>
                      <Text style={styles.giaBan}>Giá: {item.giaBan}</Text>
                      <View style={styles.quantityContainer}>
                        <Button
                          icon="minus"
                          onPress={() => this.handleDecreaseQuantity(item.idSP, item.soluong)}
                          style={styles.quantityButton}
                        >
                        </Button>
                        <Text style={styles.quantityText}>{item.soluong}</Text>
                        <Button
                          icon="plus"
                          onPress={() => this.handleIncreaseQuantity(item.idSP, item.soluong)}
                          style={styles.quantityButton}
                        >

                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomContainer}>
          <View style={styles.totalTextContainer}>
            <Text style={styles.totalText}>Tổng thiệt hại: <Text style={styles.tongtien}>{tongTien}</Text> <Text style={styles.kihieutongtien}>vnđ</Text></Text>
          </View>
          <Button
            onPress={()=>this.handlePayment(tongTien)}
            style={styles.paymentButton}
          >
            <Text style={styles.paymentButtonText}>Thanh toán</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    
    width: "100%",
    backgroundColor: '#E0E0E0',
   
    marginTop:10
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectAllButton: {
    marginLeft: 10,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    
    backgroundColor:'#F9F9F9'
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
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  totalTextContainer: {
    marginRight: 20,
  },
  totalText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ee4d2d",

    height:20
  },
  tongtien:{
   fontSize:12,
   color:'#606060',
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  paymentButton: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor:'red'
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
