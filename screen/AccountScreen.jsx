import React, {useEffect, useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';
import {getProfile, logout, selectUser} from '../redux/reducer/user';

function AccountScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const onOpen = async () => {
    await dispatch(getProfile(user.token));
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        onOpen();
      };
    }, []),
  );

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <SafeAreaView style={style.container}>
      {!user.isLogin ? (
        <View style={style.textContainer}>
          <Image source={require('../media/images/akun_bg.png')} />
          <Text style={style.text}>
            Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di
            TMMIN Car Rental lebih mudah
          </Text>
          <Button
            title="Register"
            color="green"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      ) : (
        <View style={style.textContainer}>
          <Text style={style.text}>Selamat datang di TMMIN Car Rental!</Text>
          <Button
            title="Logout"
            color="red"
            onPress={() => {
              dispatch(logout());
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AccountScreen;
