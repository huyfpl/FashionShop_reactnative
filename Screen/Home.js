
import React from "react";
import {View,Text } from "react-native";

export default class Home extends React.Component{
    static navigationOptions = {
        title: 'Thông tin sản phẩm',
      };
    render(){
        return(
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}