import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';
import { 
  RestaurentsScreen, 
  HistoryScreen, 
  ProfileScreen, 
  ChangeEmailScreen, 
  ChangePasswordScreen, 
  AboutScreen 
} from './../views';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation }) => {
  
  const toast = useToast();
  const route = useRoute();

  useEffect(()=> {
    CheckToken();
  }, [])

  const CheckToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value == null || value == undefined ) {
        toast.show("Not authorized, please log in !", {
          type: "danger",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
        navigation.navigate("LoginScreen");
      }
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Drawer.Navigator
      initialRouteName="Restaurents"
      screenOptions={{ headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Restaurents" 
        component={RestaurentsScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="restaurant-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="History" 
        component={HistoryScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="ios-sync-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Profile" 
        component={ProfileScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="md-person-outline" size={22} color={color}/>
          ),
        }}
      />
      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Change Email" 
        component={ChangeEmailScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="md-mail-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Change Password" 
        component={ChangePasswordScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="md-lock-closed-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="About" 
        component={AboutScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="md-information-circle-outline" size={22} color={color}/>
          ),
        }}
      />

    </Drawer.Navigator>
  )
}

export default DrawerNavigation