import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Animated } from 'react-native';

const Splash = ({ navigation }) => {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
      // console.log('db')
    }, 3000);

    // Hiệu ứng lắc logo
    Animated.loop(
      Animated.sequence([
        Animated.spring(dotAnim, {
          toValue: 1,
          friction: 1,
          useNativeDriver: true,
        }),
        Animated.spring(dotAnim, {
          toValue: 0,
          friction: 1,
          useNativeDriver: true,
        }),
      ]),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(logoAnim, {
          toValue: -1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(logoAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <ImageBackground source={require('../images/backgroup.png')} style={styles.backgroundImage}>
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require('../images/logo1.png')}
          style={[
            styles.logo,
            {
              transform: [
                { translateY: logoAnim.interpolate({ inputRange: [-1, 1], outputRange: [-10, 10] }) },
                { translateX: dotAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 5] }) },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [
                { translateX: dotAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 5] }) },
              ],
            },
          ]}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 240,
  },
  logo: {
    width: 150,
    height: 240,
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    top: -20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  star: {
    height: 10,
    width: 10,
    marginRight: 5,
  },
  backgroundImage: {
    flex: 1,
    
    height: "110%",
  },
});

export default Splash;
