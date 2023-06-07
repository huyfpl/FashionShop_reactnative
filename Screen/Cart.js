import React from "react";
import { View,Text } from "react-native";
export default class Cart extends  React.Component{
    static navigationOptions = {
        title: 'Cart',
      };
    render(){
        return(
            <View>
                <Text>Cart</Text>
            </View>
        )
    }
}