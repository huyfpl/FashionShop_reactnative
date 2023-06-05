import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, SafeAreaView, Dimensions, Image } from "react-native";

const images = [
  'https://web.hn.ss.bfcplatform.vn/muadienmay/content/article2/3087889034-1620532650.jpg',
  'https://iili.io/H4nYOzb.png',
  'https://iili.io/H4nYOzb.png'
];
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Banner() {
  const [img, setImg] = useState(0);

  const onChange = (event) => {
    if (event) {
      const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
      if (slide !== img) {
        setImg(slide);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={onChange}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {images.map((e, index) => (
            <Image
              key={e}
              resizeMode='stretch'
              style={styles.wrap}
              source={{ uri: e }}
            />
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {images.map((e, index) => (
            <Text
              key={e}
              style={img === index ? styles.dotActive : styles.dot}
            >
                  ●
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
alignItems:'center',

  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf:'center'
  },
  dotActive: {
    margin: 3,
    color: 'red',
    fontSize: 18,
  },
  dot: {
    margin: 3,
    color: 'blue',
    fontSize: 18,
    
  },
});
