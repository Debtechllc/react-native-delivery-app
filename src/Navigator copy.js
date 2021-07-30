import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import HomeScreen from './screens/Home';
import SignUp from './screens/SignUp';
import ProfileScreen from './screens/Profile';
import ProductScreen from './screens/Product';
import SettingsScreen from './screens/Settings';
import MyOrderList from './screens/MyOrderList';
import ShoppingCart from './screens/ShoppingCart';
import ProductDetails from './screens/ProductDetails';
import DeliveryDetails from './screens/DeliveryDetails';
import LoginScreen from './screens/Login';
import CategoryScreen from './screens/Category';
import AboutUsScreen from './screens/AboutUs';
import ContactUsScreen from './screens/ContactUs';
import MyWishListScreen from './screens/MyWishlist';
import { CustomDrawerContent } from './components';
import { colors } from './utils/constants';
import {Image} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export const AppMainTab = createBottomTabNavigator({
  Home: {
     screen: HomeScreen,
      },
  Settings: {
    screen: SettingsScreen,
  },
  Product: {
    screen: ProductScreen,
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
      backgroundColor: colors.PINK_300,
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
  Login: {
    screen: LoginScreen,
  },
  Category: {
    screen: CategoryScreen,
  },
  MyOrderList: {
    screen: MyOrderList,
  },
  ShoppingCart: {
    screen: ShoppingCart,
  },
  MyWishList: {
    screen: MyWishListScreen,
  },
  AboutUs: {
    screen: AboutUsScreen,
  },
  ContactUs: {
    screen: ContactUsScreen,
  },
  Settings: {
    screen: SettingsScreen,
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


export const AppMainStack = createStackNavigator({
  Home: { screen: AppDrawer ,
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
SignUp: { screen: SignUp,
  navigationOptions: {
    header: null
} },
OrderDetails:{
  screen: DeliveryDetails ,
  navigationOptions: {
    header: null
}},
}, {
  cardStyle: {
    backgroundColor: colors.PINK_50,
  },
  mode: 'modal',
    headerStyle: {display:"none"},
    headerLeft: null

}); 




export default createAppContainer(AppMainStack);
