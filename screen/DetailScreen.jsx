import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Button,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getCarsDetails, selectCar} from '../redux/reducer/car';

const md = `## Include
  
  - Apa saja yang termasuk dalam paket misal durasi max 12 jam
  - Sudah termasuk bensin selama 12 jam
  - Sudah termasuk Tiket Wisata
  - Sudah termasuk pajak
  
  ## Exclude
  
  - Tidak termasuk biaya makan sopir Rp 75.000/hari
  - Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
  - Tidak termasuk akomodasi penginapan

  ## Exclude
  
  - Tidak termasuk biaya makan sopir Rp 75.000/hari
  - Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
  - Tidak termasuk akomodasi penginapan

  ## Exclude
  
  - Tidak termasuk biaya makan sopir Rp 75.000/hari
  - Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
  - Tidak termasuk akomodasi penginapan

  ## Exclude
  
  - Tidak termasuk biaya makan sopir Rp 75.000/hari
  - Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
  - Tidak termasuk akomodasi penginapan
  
  `.toString();

function DetailScreen({route}) {
  const {id} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cars = useSelector(selectCar);

  const fetchData = async () => {
    await dispatch(getCarsDetails(id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = () => {
    navigation.navigate('Order', {dataCar: cars.details});
  };

  return (
    <SafeAreaView style={style.container}>
      <Pressable style={style.backIcon} onPress={() => navigation.goBack()}>
        <IonIcon name="arrow-back-outline" size={32} />
      </Pressable>
      <View style={style.headerContainer}>
        <Text style={style.headerText}>{cars.details.name}</Text>
        <View style={style.iconContainer}>
          <Feather name="users" size={10} color="#8A8A8A" />
          <Text
            style={{
              ...style.headerText,
              fontWeight: 'bold',
              marginLeft: 2,
              marginRight: 10,
            }}>
            {cars.details.seat}
          </Text>
          <Feather name="briefcase" size={10} color="#8A8A8A" />
          <Text
            style={{...style.headerText, fontWeight: 'bold', marginLeft: 2}}>
            {cars.details.baggage}
          </Text>
        </View>
        <Image
          style={style.headerImage}
          source={require('../media/images/zenix.png')}
        />
      </View>
      <ScrollView style={style.infoContainer}>
        {/* <Image style={style.infoImage} source={require("../media/images/zenix.png")} /> */}
        <Markdown style={style.detail}>{md}</Markdown>
      </ScrollView>
      <View style={style.purchaseContainer}>
        <View>
          <Text style={style.priceText}>Rp {cars.details.price}</Text>
        </View>
        <Button
          color="green"
          style={style.purchaseButton}
          title="Lanjutkan Pembayaran"
          onPress={() => {
            navigation.navigate('Order', {dataCar: cars.details});
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    height: '30%',
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#222222',
  },
  headerImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 20,
    width: '90%',
    height: '55%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  detail: {
    body: {
      fontSize: 16,
      marginBottom: 10,
    },
    bullet_list: {
      marginBottom: 10,
    },
    heading2: {
      marginBottom: 10,
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'PoppinsBold',
    },
  },
  purchaseContainer: {
    height: '15%',
    padding: 15,
    width: '100%',
    backgroundColor: '#EEEEEE',
    position: 'relative',
    bottom: 0,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 20,
  },
});

export default DetailScreen;
