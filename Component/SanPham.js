import React from "react";
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback }
    from "react-native";
export default function SanPham(props) {
    const { dataProd, handlePress } = props;
    const fun_handlePress = () => {
        handlePress ? handlePress(dataProd) : null;
    }
    return (
        <TouchableWithoutFeedback onPress={fun_handlePress}>

   
        <View style={styles.shadow}>
            <View style={styles.container}>
                <Image source={{ uri: dataProd.anhSP }}
                    style={styles.img} />
                <View style={styles.info}>
                    <Text style={styles.tensp} >{dataProd.tenSP}</Text>
                    <View style={styles.star_sold_product}>
                        <Image style={styles.star} source={{ uri: 'https://iili.io/HgVbF2t.png' }} />
                        <Text >100</Text><Text style={{ marginLeft: 5 }}>Đã bán</Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={styles.item_price}>{dataProd.giaBan}</Text>
                        <Text style={styles.kihieu}>đ</Text>
                    </View>
                </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )

}
const styles = StyleSheet.create({
shadow:{
    shadowColor:'#000'

}
})