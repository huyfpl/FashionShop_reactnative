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
import EditUser from './Screen/EditUser';
import Splash from './Screen/Splash';
import SearchResults from './Screen/SearchResults';
import DoiMatKhau from './Screen/DoiMatKhau';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import * as Animatable from 'react-native-animatable';
import React, { useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
function TabButton({ onPress, accessibilityState, children }) {
    const viewRef = useRef(null);

    useEffect(() => {
        if (accessibilityState.selected) {
            viewRef.current.animate({ 0: { scale: .5,rotate:'0deg' }, 1: { scale: 1.5,rotate:'360deg'  } });
        } else {
            viewRef.current.animate({0: { scale: .5,rotate:'360deg' }, 1: { scale: 1.5,rotate:'0deg'  } });
        }
    }, [accessibilityState.selected]);

    return (
        <TouchableWithoutFeedback onPress={onPress} style={{ flex: 1 }}>
            <Animatable.View ref={viewRef} duration={500} style={{ flex: 1 }}>
                {children}
            </Animatable.View>
        </TouchableWithoutFeedback>
    );
}

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
               
                tabBarStyle: {
                    height: 50,
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    right: 10,
                    borderRadius: 50
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={ListSanPham}
                options={{
                    
                    tabBarShowLabel: false,
                    title: 'Chào mừng bạn',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={20} />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />
                }}

            />
            <Tab.Screen
                name="DanhMuc"
                component={DanhMuc}
                options={{
                    tabBarShowLabel: false,
                    title: 'Danh Mục',
                    tabBarIcon: ({ color }) => (
                        <Icon name="th-large" size={18} color={color}  />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />
                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                
                    tabBarShowLabel: false,
                    title: 'Cart',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={20} />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />
                }}
            />
            <Tab.Screen
                name="User"
                component={User}
                options={{
                    tabBarShowLabel: false,
                    title: 'User',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={20} />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}  />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="EditUser" component={EditUser} options={{
                    title: 'Cập nhật thông tin'
                }} />
                <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="ChiTietSanPham" component={ChiTietSanPham} />
                <Stack.Screen name="SearchResults" component={SearchResults} />
                <Stack.Screen name="DoiMatKhau" component={DoiMatKhau} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
