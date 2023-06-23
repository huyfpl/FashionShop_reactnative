import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
export default function SanPham(props) {
  const { dataProd, handlePress } = props;
  const fun_handlePress = () => {
    handlePress ? handlePress(dataProd) : null;
  }
  let tensp = dataProd.tenSP.length > 40 ? dataProd.tenSP.slice(0, 40) + '...' : dataProd.tenSP;
  return (
    <View>
      <TouchableWithoutFeedback onPress={fun_handlePress} style={styles.all}>
        <View style={styles.shadow}>
          <View style={styles.container}>
          <Image source={{ uri: dataProd.anhSP }} style={styles.img} />
            {dataProd.phantramgiamgia > 0 ? (
              <>
                <Image source={{ uri: dataProd.anhsale }} style={styles.imgsale} />
                <Text style={styles.textsale}>{dataProd.phantramgiamgia}</Text>
              </>
            ) : null}


            <View style={styles.info}>
              <Text style={styles.tensp} >{tensp}</Text>
              <View style={styles.star_sold_product}>
                <Image style={styles.star} source={{ uri: 'https://iili.io/HgVbF2t.png' }} />
                <Text>100</Text><Text style={{ marginLeft: 5 }}>Đã bán</Text>
              </View>
              <View style={styles.price}>
                <Text style={styles.item_price}>{dataProd.giaBan - (dataProd.giaBan * dataProd.phantramgiamgia / 100)}</Text>
                <Text style={styles.kihieu}>đ</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )

}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    margin: 8,
    height:270,
    marginTop:0

  },
  star_sold_product: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    height: 10,
    width: 10,
    marginRight: 5,
  },
  container: {

    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#FFFBF9",

    width: 170,
    flex: 1
  },

  info: {
    padding: 8,
  },
  img: {
    height: 135,
    width: 130,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    alignSelf: 'center'
  },
  imgsale: {
    height: 60,
    width: 63,
    position: "absolute",
    top: 0,
    right: 0,

  },
  textsale: {
    position: 'absolute',
    right: 30,
    top: 34,
    color: 'white',
    fontWeight: "bold"
  },
  tensp: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: 'red'
  },
  kihieu: {
    fontSize: 16,
    color: '#FF4500'
  },
})
// hi