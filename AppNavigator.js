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
import Banner from './Screen/Banner';
import Login from './Screen/Login';
import Register from './Screen/Register';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { TouchableOpacity } from 'react-native';

function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#FF4D15',
                inactiveTintColor: '#C5C5C5',
                labelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={ListSanPham}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="DanhMuc"
                component={DanhMuc}
                options={{
                    title: 'Danh Mục',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="folder" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="User"
                component={User}
                options={{
                    title: 'User',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }}/>
                <Stack.Screen name="ChiTietSanPham" component={ChiTietSanPham} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
