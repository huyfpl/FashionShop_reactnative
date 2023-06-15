import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Text, SafeAreaView, Dimensions, Image } from "react-native";

const images = [
  'https://cdn.vuahanghieu.com/unsafe/0x540/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/20-03-2023/1519577818_banner-19-1630x540.jpg',
  'https://cdn.vuahanghieu.com/unsafe/0x540/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/27-03-2023/1804266831_uu-dai-gio-vang.jpg',
  'https://cdn.vuahanghieu.com/unsafe/750x250/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/18-05-2023/1437874447_ao-phong-750x250.jpg',
  'https://cdn.vuahanghieu.com/unsafe/750x250/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/22-05-2023/960280214_promotion-right-my-pham-02.jpg',
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const maxImg = images.length - 1;

export default function Banner() {
  const [img, setImg] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImg((prevImg) => (prevImg + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: img * WIDTH,
        animated: true,
      });
    }
  }, [img]);
  const onScrollEnd = (event) => {
    const slide = Math.floor(event.nativeEvent.contentOffset.x / WIDTH);
    if (slide !== img) {
      setImg(slide);
    }
    else if (slide === maxImg) {
      setImg(0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          ref={scrollViewRef}
          onMomentumScrollEnd={onScrollEnd}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {images.map((e, index) => (
            <Image
              key={e}
              resizeMode='stretch'
              style={{ ...styles.wrap, width: WIDTH }}
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
  container: {
    alignItems: 'center',
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dotActive: {
    margin: 3,
    color: '#FF6C4B',
    fontSize: 18,
  },
  dot: {
    margin: 3,
    color: '#E0E0E0',
    fontSize: 18,
  },
});
