/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IonIcons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screen/HomeScreen';
import CarListScreen from './screen/CarListScreen';
import AccountScreen from './screen/AccountScreen';
import SignInScreen from './screen/SignInScreen';
import SignUpScreen from './screen/SignUpScreen';
import DetailScreen from './screen/DetailScreen';
import PurchaseScreen from './screen/PurchaseScreen';
import OrderScreen from './screen/OrderScreen';
import OrderListScreen from './screen/OrderListScreen';

import {persistor, store} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from './redux/reducer/user';
import {getProfile} from './redux/reducer/user';
import { logout } from './redux/reducer/user';

const Tab = createBottomTabNavigator();

function Tabs() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const checkUserData = async () => {
    try {
      await dispatch(getProfile(user.token));
    } catch (error) {
    }

    if (user.status == 'failed') {
      await dispatch(logout());
    }
  };

  useEffect(() => {
    checkUserData();
  }, []);


  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Daftar Mobil') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Akun') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Daftar Order') {
            iconName = focused ? 'list' : 'list-outline';
          }
          return <IonIcons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#AF392F',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Daftar Mobil"
        component={CarListScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Daftar Order"
        component={OrderListScreen}
        options={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen name="Akun" component={AccountScreen} />
    </Tab.Navigator>
  );
}

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Order"
              component={OrderScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Purchase"
              component={PurchaseScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
