import React from "react";
import { FlatList, View, StyleSheet, ScrollView, ActivityIndicator, Text } from "react-native";
export default class ChiTietSanPham extends React.Component {
    static navigationOptions = {
        title: 'ListSanPham',
    };
    render() {
        return (
            <View>
                <Text>chi tiết sản phẩm</Text>
            </View>
        )
    }
}