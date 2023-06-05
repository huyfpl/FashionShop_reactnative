import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListSanPham from "./Screen/ListSanPham";
import ChiTietSanPham from "./Screen/ChiTietSanPham";
import Home from './Screen/Home';
import DanhMuc from './Screen/Danhmuc';
import Cart from './Screen/Cart';
import User from './Screen/User';
import { View,Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    function HomeStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="ListSanPham" component={ListSanPham} />
                <Stack.Screen name="ChiTietSanPham" component={ChiTietSanPham} />
            </Stack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <View>
                <Text>huy</Text>
            </View>
            <Tab.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                    activeTintColor: '#FF4D15',
                    inactiveTintColor: '#C5C5C5',
                    labelStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',

                    },


                }

                }
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen name="DanhMuc" component={DanhMuc}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="folder" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="Cart" component={Cart}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="cart" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="User" component={User}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account" color={color} size={26} />
                        ),
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
