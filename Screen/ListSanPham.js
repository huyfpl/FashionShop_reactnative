import React from "react";
import { FlatList, View, StyleSheet, ScrollView, ActivityIndicator, Text, RefreshControl, SafeAreaView } from "react-native";
import SanPham from "../Component/SanPham";
import Banner from "./Banner";
import { API_LIST_SANPHAM } from "../helpers/api";

export default class ListSanPham extends React.Component {
  static navigationOptions = {
    title: 'ListSanPham',
  };

  constructor() {
    super();
    this.state = {
      products: null,
      show: false,
      refreshing: false,
    };
    this.getProducts = this.getProducts.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.displayloader = this.displayloader.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    this.displayloader();
  }

  displayloader() {
    this.setState({ show: true });
    setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  }

  async getProducts() {
    try {
      const response = await fetch(API_LIST_SANPHAM, { method: 'GET' });
      const responseJSON = await response.json();
      this.setState({
        products: responseJSON.products,
        refreshing: false, 
      });
    } catch (error) {
      console.error(error);
      this.setState({ refreshing: false }); 
    }
  }

  handlePress(dataProd) {
    const { navigation } = this.props;
    navigation.navigate('ChiTietSanPham', { data: dataProd });

  }

  renderItems({ index, item }) {
    console.log(item);
    return (
      <View style={styles.wraper}>
        <SanPham dataProd={item} handlePress={this.handlePress} />
      </View>
    );
  }

  handleRefresh() {
    this.setState({ refreshing: true });
    this.getProducts();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={ 
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              colors={['#9Bd35A', '#689F38']}
            />
          }
        >
          <Banner />
          <View style={{ flex: 1 }}>
            {this.state.show ? (
              <ActivityIndicator animating={this.state.show} color="blue" />
            ) : (
              <FlatList
                data={this.state.products}
                renderItem={this.renderItems}
                numColumns={2}
                contentContainerStyle={styles.container}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    paddingTop: 10,
    backgroundColor: '#E3E3E3',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  wraper: {
    paddingHorizontal: 5,
  },
});
