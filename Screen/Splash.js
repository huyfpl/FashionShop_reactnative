import React, { useEffect } from 'react';
import { View, Text, StyleSheet , Image} from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.star} source={{ uri: 'https://iili.io/HgVbF2t.png' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
});

export default Splash;
