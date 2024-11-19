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

function CarListScreen() {
  const [dataCarList, setDataCarList] = useState([])

  const fetchData = async () => {
    try {
      console.log("masuk");
      const res = await axios.get('http://192.168.1.57:3000/api/v1/cars')
      setDataCarList(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    } 
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
      <FlatList data={dataCarList}
      renderItem={({item, index}) => 
        <CarCard item={item} key={item.id} onPress={() => navigation.navigate("Detail", {id:item.id})}/>
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
