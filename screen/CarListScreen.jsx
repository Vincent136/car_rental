import React, { useEffect, useState } from 'react';

import {
  View,
  FlatList,
  Button,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CarCard from '../component/CarCard';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, selectCar } from '../redux/reducer/car';
import { resetState } from '../redux/reducer/form';

function CarListScreen() {

  const dispatch = useDispatch();
  const car = useSelector(selectCar);
  const fetchData = async () => {
    await dispatch(getCars());
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        fetchData();
      };
    }, [])
  );

  useEffect(
    () => {
      fetchData();
    }, []
  )

  const navigation = useNavigation();

  return (
    <SafeAreaView style={style.container}>
      <FlatList data={car.data}
      renderItem={({item, index}) => 
        <CarCard item={item} key={item.id} onPress={() => {if((item.id !== car.details?.id)) dispatch(resetState()); navigation.navigate("Detail", {id: item.id}) }}/>
      } 
      numColumns={1} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});

export default CarListScreen;
