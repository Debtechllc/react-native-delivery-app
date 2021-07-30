import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import HomeScreen from './screens/Home';
import SignUp from './screens/SignUp';
import ProfileScreen from './screens/Profile';
import Myaccount from './screens/Myaccount';
import ProductScreen from './screens/Product';
import SettingsScreen from './screens/Settings';
import MyOrderList from './screens/MyOrderList';
import Checkout from './screens/Checkout';
import ShoppingCart from './screens/ShoppingCart';
import ProductDetails from './screens/ProductDetails';
import DeliveryDetails from './screens/DeliveryDetails';
import LoginScreen from './screens/Login';
import CategoryScreen from './screens/Category';
import AboutUsScreen from './screens/AboutUs';
import ContactUsScreen from './screens/ContactUs';
import MyWishListScreen from './screens/MyWishlist';
import ChangeLocation from './screens/ChangeLocation';
import { CustomDrawerContent } from './components';
import { colors } from './utils/constants';
import {Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Signout from './screens/Signout';
import navigation from './reducers/navigation';
//createAppContainer,
  //createSwitchNavigator

export const AppMainTab = createBottomTabNavigator({
  Home: {
     screen: HomeScreen,
      },
  Settings: {
    screen: SettingsScreen,
  },

  Profile: {
    screen: ProfileScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: colors.WHITE,
    inactiveTintColor: '#99ccff',
    inactiveBackgroundColor: colors.FOOTER_BG,
    activeBackgroundColor: colors.FOOTER_BG,
    showIcon: true,
    showLabel: Platform.OS === 'ios',
    indicatorStyle: {
      backgroundColor: 'white',//colors.PINK_300
    },
    style: {
      backgroundColor: colors.FOOTER_BG,
    },
    upperCaseLabel: false,
  },
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  initialRouteName:'Home',
  navigationOptions:
  {
    title: 'Home',
    drawerLabel: 'Home',
    tabBarVisible: true,
    drawerIcon: ({ tintcolor }) => (
    <Image source={require('./images/home.png')}
                   style={{height: 25,width: 25}}/>
      //<Icon name='ios-menu' size={30} />
  ),
  },
});

const AppDrawer = createDrawerNavigator({
  Home: {
    screen: AppMainTab,

  },
 
  Settings: {
    screen: SettingsScreen,
  },
  Login: {
    screen: LoginScreen
  },
},

{
  contentComponent: props =>
    (<CustomDrawerContent
      {...props}
    />),
  contentOptions: {
    activeBackgroundColor: colors.BLUE_TRANSPERENT,
    activeTintColor: colors.BLACK,
		inactiveTintColor: colors.BLACK,
  },
  initialRouteName:'Home',
});

const AuthDrawer = createDrawerNavigator({
  Home: {
    screen: AppMainTab,

  },
  Myaccount: {
    screen: Myaccount,

  },


  Settings: {
    screen: SettingsScreen,
  },
  Signout: {
    screen: Signout,
  }


},

{
  contentComponent: props =>
    (<CustomDrawerContent
      {...props}
    />),
  contentOptions: {
    activeBackgroundColor: colors.BLUE_TRANSPERENT,
    activeTintColor: colors.BLACK,
		inactiveTintColor: colors.BLACK,
  },
  initialRouteName:'Home',
});


export const AppMainStack = createStackNavigator({


Login: { screen: LoginScreen,
  navigationOptions: {
    header: null
} },
ProductDetails:{
  screen: ProductDetails ,
  navigationOptions: {
    header: null
}},
Checkout:{
  screen: Checkout ,
  navigationOptions: {
    header: null
}},
ChangeLocation:{
  screen: ChangeLocation ,
  navigationOptions: {
    header: null
}},
}, {
  cardStyle: {
    backgroundColor: 'white', //colors.PINK_50
  },
  mode: 'modal',
    headerStyle: {display:"none"},
    headerLeft: null

});

export const AuthMainStack = createStackNavigator({
  Home: { screen: AuthDrawer ,
    navigationOptions: {
      header: null,
}},
ProductDetails: { screen: ProductDetails ,
  navigationOptions: {
    header: null
}},
  Settings: { screen: SettingsScreen,
    navigationOptions: {
      header: null
} },
Product: { screen: ProductScreen ,
  navigationOptions: {
    header: null
}},
Category: { screen: CategoryScreen ,
  navigationOptions: {
    header: null
}},
OrderDetails:{
  screen: DeliveryDetails ,
  navigationOptions: {
    header: null
}},

}, {
  cardStyle: {
    backgroundColor: 'white',//colors.PINK_50
  },
  mode: 'modal',
    headerStyle: {display:"none"},
    headerLeft: null

});



export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading:AuthLoadingScreen,
      App:AppMainStack,
      Auth: AuthMainStack
    },
    {
      initialRouteName: 'AuthLoading',
    }

  ));
