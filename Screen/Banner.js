import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Text, SafeAreaView, Dimensions, Image } from "react-native";

const images = [
  'https://iili.io/H4nYOzb.png',
  'https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-blue-swimming-pool-swim-ring-banner-background-material-poolswimming-poolswimming-ringsummerpool-image_50634.jpg',
  'https://png.pngtree.com/thumb_back/fw800/back_pic/04/52/15/08585f9ccc93f5b.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevf00TTArB_-yDdH7dzyNocSIKzD7iNHLLbO_4hCBvyjhOSDlphgSLMWzbU38hs7Rfuo&usqp=CAU',
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
    else if(slide===maxImg){
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
