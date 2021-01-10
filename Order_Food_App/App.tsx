import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LandingScreen } from './src/screens/LandingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { SearchScreen } from './src/screens/SearchScreen';
import { RestaurantScreen } from './src/screens/RestaurantScreen';
import { FoodDetailScreen } from './src/screens/FoodDetailScreen';
import { CartScreen } from './src/screens/CartScreen';

//Redux Store
import { Provider } from 'react-redux';
import { store } from './src/redux';


//Navigation Import
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { UserScreen } from './src/screens/UserScreen';
import { OrderScreen } from './src/screens/OrderScreen';
import { ThanksScreen } from './src/screens/ThanksScreen';
import { OrderHistoryScreen } from './src/screens/OrderHistoryScreen';
import { OrderDetailScreen } from './src/screens/OrderDetailScreen';




const switchNavigator = createSwitchNavigator({
  
    landingStack: {
      screen: createStackNavigator({
        Landing: LandingScreen,
        //Search address screen
      },{
        defaultNavigationOptions: {
          headerShown: false,
        }
      }),
    },
    
    homeStack: createBottomTabNavigator({

      //Create ICON FOOTER
      //Home tab Icon
      Home:{
        screen: createStackNavigator({
          HomePage: HomeScreen,
          SearchPage: SearchScreen,
          RestaurantPage: RestaurantScreen,
          FoodDetailPage: FoodDetailScreen,
        },{
          defaultNavigationOptions: {
            headerShown: false,
          }
        }),
        navigationOptions:{
          tabBarIcon: ({ focused, tintColor }) => {
            let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
            return <Image source={icon} style={styles.tabIcon} />
          }
        }
      },

      //Order tab Icon
      Order:{
        screen: createStackNavigator({
          OrderHistoryPage: OrderHistoryScreen,
          OrderDetailPage: OrderDetailScreen
        },{
          defaultNavigationOptions: {
            headerShown: false,
          }
        }),
        navigationOptions:{
          tabBarIcon: ({focused, tintColor}) => {
            let icon = focused == true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png')
            return <Image source={icon} style={styles.tabIcon} />
          }
        }
      },

      //Cart tab Icon
      Cart:{
        screen: createStackNavigator({
          CartPage: CartScreen, 
          OrderPage: OrderScreen,
          ThanksPage: ThanksScreen
        },{
          defaultNavigationOptions: {
            headerShown: false,
          }
        }),
        navigationOptions:{
          tabBarIcon: ({focused, tintColor}) => {
            let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png')
            return <Image source={icon} style={styles.tabIcon} />
          }
        }
      },

      //Account tab Icon
      Account:{
        screen: createStackNavigator({
          UserPage: UserScreen,
          LoginPage: LoginScreen
        },{
          defaultNavigationOptions: {
            headerShown: false,
          }
        }),
        navigationOptions:{
          tabBarIcon: ({focused, tintColor}) => {
            let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')
            return <Image source={icon} style={styles.tabIcon} />
          }
        }
      }

    })
});

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabIcon:{
    width: 30,
    height: 30
  }
});
