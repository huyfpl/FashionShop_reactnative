import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import axios from "axios";
import { API_LIST_DANHMUC, API_LIST_SANPHAM_DANHMUC } from "../helpers/api";
import SanPham from "../Component/SanPham";

export default class DanhMuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhMucList: [],
      selectedDanhMuc: null,
      danhSachSanPham: [],
      loading: false,
      refreshing: false,
    };
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.fetchDanhMucList();
    this.props.navigation.addListener("focus", this.componentDidFocus);
  }

  fetchDanhMucList = async () => {
    try {
      const response = await axios.get(API_LIST_DANHMUC);
      const data = response.data;
      let danhMucList = data.danhmuc;

      // Kiểm tra nếu số lượng danh mục là số lẻ, thêm một phần tử ảo vào danh sách để đảm bảo số lượng chẵn
      if (danhMucList.length % 2 !== 0) {
        danhMucList.push({ id_danhmuc: -1, ten_danhmuc: "", anh_danhmuc: "" });
      }

      // Kiểm tra và cung cấp ảnh mặc định cho trường anh_danhmuc nếu nó là chuỗi rỗng
      danhMucList = danhMucList.map((item) => ({
        ...item,
        anh_danhmuc: item.anh_danhmuc || "https://iili.io/H6SU9Wb.png",
      }));

      this.setState({ danhMucList });
    } catch (error) {
      console.error(error);
    }
  };

  fetchSanPhamByDanhMuc = async (id_danhmuc) => {
    try {
      this.setState({ loading: true });
      const response = await axios.get(`${API_LIST_SANPHAM_DANHMUC}/${id_danhmuc}`);
      const data = response.data;
      this.setState({ danhSachSanPham: data.products, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };

  handleDanhMucPress = async (item) => {
    this.setState({ selectedDanhMuc: item, loading: true });

    try {
      const response = await axios.get(`${API_LIST_SANPHAM_DANHMUC}/${item.id_danhmuc}`);
      const data = response.data;
      this.setState({ danhSachSanPham: data.products });
    } catch (error) {
      console.error(error);
    }

    this.setState({ loading: false });
  };

  handlePress = (dataProd) => {
    this.setState({ selectedDanhMuc: null }, () => {
      this.props.navigation.navigate("ChiTietSanPham", { data: dataProd });
    });
  };

  componentDidFocus = () => {
    const { selectedDanhMuc } = this.state;
    if (selectedDanhMuc) {
      this.fetchSanPhamByDanhMuc(selectedDanhMuc.id_danhmuc);
    }
  };

  // Phương thức xử lý sự kiện làm mới
  onRefresh = () => {
    const { selectedDanhMuc } = this.state;
    this.setState({ refreshing: true }, async () => {
      if (selectedDanhMuc) {
        await this.fetchSanPhamByDanhMuc(selectedDanhMuc.id_danhmuc);
      }
      this.setState({ refreshing: false });
    });
  };

  renderDanhMucItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => this.handleDanhMucPress(item)}>
      <View style={styles.danhMucItemContainer}>
        <Image source={{ uri: item.anh_danhmuc }} style={styles.danhMucImg} />
        <Text style={styles.danhMucText}>{item.ten_danhmuc}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  renderSanPhamItem = ({ item, index }) => {
    const isOddItem = index % 2 !== 0;

    if (isOddItem) {
      return null;
    }
    const nextItem = this.state.danhSachSanPham[index + 1];

    return (
      <View style={styles.sanPhamRowContainer}>
        <SanPham dataProd={item} handlePress={this.handlePress} />
        {nextItem && (
          <SanPham dataProd={nextItem} handlePress={this.handlePress} />
        )}
      </View>
    );
  };

  render() {
    const {
      danhMucList,
      selectedDanhMuc,
      danhSachSanPham,
      loading,
      refreshing,
    } = this.state;

    return (
      <View style={styles.container}>
        <View contentContainerStyle={styles.danhMucScrollView} horizontal>
          <View style={styles.danhMucContainer}>
            {danhMucList.map((item) => (
              <TouchableWithoutFeedback
                key={item.id_danhmuc}
                onPress={() => this.handleDanhMucPress(item)}
              >
                <View style={styles.danhMucItemContainer}>
                  <Image source={{ uri: item.anh_danhmuc }} style={styles.danhMucImg} />
                  <Text style={styles.danhMucText}>{item.ten_danhmuc}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>

        {selectedDanhMuc && (
          <View style={styles.wrapper}>
            {loading ? (
              <ActivityIndicator size="large" color="gray" style={styles.loader} />
            ) : (
              <FlatList
                data={danhSachSanPham}
                renderItem={this.renderSanPhamItem}
                keyExtractor={(item) => item.idSP.toString()}
                contentContainerStyle={styles.sanPhamListContainer}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                    colors={["#9Bd35A", "#689F38"]}
                  />
                }
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  danhMucScrollView: {
    flexGrow: 1,
  },
  danhMucContainer: {
    flexDirection: "row",
    paddingRight: 10,
    marginBottom: 10,
  },
  danhMucItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  danhMucImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  danhMucText: {
    marginTop: 5,
    textAlign: "center",
  },
  wrapper: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  sanPhamListContainer: {
    paddingBottom: 10,
  },
  sanPhamRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
});
