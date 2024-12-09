import React, {useEffect, useState} from 'react';

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

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import OrderCard from '../component/OrderCard';
import axios from 'axios';
import {selectUser} from '../redux/reducer/user';
import {useSelector, useDispatch} from 'react-redux';
import { getCarsDetails } from '../redux/reducer/car';

function OrderListScreen() {
  const [dataOrder, setDataOrder] = useState(null);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      if (user.isLogin) {
        console.log(user.token);
        const data = await axios(
          'http://192.168.1.57:3000/api/v1/order/myorder',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          },
        );

        setDataOrder(data.data);
      }
    } catch (e) {
      console.log('Error fetching data:', e);
    }
  };

  const onCardPress= async (id) => {
     await dispatch(getCarsDetails(id))
     navigation.navigate('Purchase')
  }

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        fetchData();
      };
    }, []),
  );

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={style.container}>
      {dataOrder ? <FlatList
        data={dataOrder.data}
        renderItem={({item, index}) => (
          <OrderCard item={item} key={item.id} onPress={() => onCardPress(item.id)} />
        )}
        numColumns={1}
      /> : <Text>No Order or Not Signed in</Text>
}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});

export default OrderListScreen;
