import React from "react";
import { FlatList, View, StyleSheet, ScrollView, ActivityIndicator, Text,SafeAreaView} from "react-native";
import SanPham from "../Component/SanPham";
import Banner from "./Banner";

export default class ListSanPham extends React.Component {
    static navigationOptions = {
        title: 'ListSanPham',
    };

    constructor() {
        super();
        this.state = {
            products: null,
            show: false,
           
        };
        this.getProducts = this.getProducts.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.displayloader = this.displayloader.bind(this);


    }
    componentDidMount() {
        this.getProducts();
        this.displayloader();

    }
    displayloader() {
        this.setState({ show: true });
        setTimeout(() => {
            this.setState({ show: false })
        }, 3000);
    }
    async getProducts() {
        const url = 'https://huyfpl.github.io/Shop_quanao_reactnative/Sever/sanpham.json';
        let response = await fetch(url, { method: 'GET' });
        let responseJSON = await response.json();
        this.setState({
            products: responseJSON.products,
        });

    }

    handlePress(dataProd) {
        const { navigation } = this.props;
        navigation.navigate('ChiTietSanPham', { data: dataProd });

    }
    renderItems({ index, item }) {
        console.log(item)
        return (
            <View style={styles.wraper}>
                <SanPham
                    dataProd={item}
                    handlePress={this.handlePress}
                />
            </View>



        );

    }
    render() {

        return (
            <View style={styles.container}>
                <Banner/>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        {
                            this.state.show ?
                                <ActivityIndicator animating={this.state.show} color="blue" /> : <FlatList
                                    data={this.state.products}
                                    renderItem={this.renderItems}
                                    numColumns={2}
                                    contentContainerStyle={styles.container}
                                    removeClippedSubviews
                                />
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
    paddingHorizontal:8,
    paddingTop:10,
    backgroundColor:'#E3E3E3',
    flex:1
    },
    wraper: {
        flex:1,
        paddingHorizontal: 4
    }
})