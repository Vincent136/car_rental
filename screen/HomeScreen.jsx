import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {SafeAreaView} from 'react-native-safe-area-context';

import CarCard from '../component/CarCard';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {resetState} from '../redux/reducer/form';
import {selectCar} from '../redux/reducer/car';
import {useSelector, useDispatch} from 'react-redux';
import { getCars } from '../redux/reducer/car';

const dataMenu = [
  {uri: '../media/images/Bg.png', title: 'Sewa Mobil', icon: 'truck'},
  {uri: '../media/images/Bg.png', title: 'Oleh-Oleh', icon: 'box'},
  {uri: '../media/images/Bg.png', title: 'Penginapan', icon: 'key'},
  {uri: '../media/images/Bg.png', title: 'Camera', icon: 'camera'},
];

function Menu({item}) {
  return (
    <View style={style.containerItem}>
      <Pressable
        style={style.menu}
        onPress={() => {
          console.log(item.title);
        }}>
        <Feather name={item.icon} size={30} color="white" />
      </Pressable>
      <Text style={style.menuTitle}>{item.title}</Text>
    </View>
  );
}

function HomeScreen() {
  const [dataCarList, setDataCarList] = useState([]);

  const car = useSelector(selectCar);
  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(getCars());
  };

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
      <View style={style.header}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={[
              style.text,
              style.textBold,
              {
                fontSize: 18,
              },
            ]}>
            Hi, Vincent
          </Text>
          <Text
            style={[
              style.text,
              style.textBold,
              {
                fontSize: 20,
              },
            ]}>
            Your Location
          </Text>
        </View>
        <View style={style.avatarContainer}>
          <Image
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/0378/6ae3/d101f354911576fc8814c5fe373af941?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Agqrv9Z8V3X6wynU~uC52bxq8kimhJGy6thIrMifLkdsqgt0z2Tp-oIMSD-BCkKLFSmazflaziE0gIvEu5fYmMi2gLP-6laLKgm6n-Y7fybZOn0ObZt6TRp0Ke0YqzexS-6sGcFsKlxQpuzpw1G~JgO4Qvva6Ff7da-1MsSzCo9JBW5ZhT4o7h1uC-LxZp3iy5mRvU-JRvSnRYr9ieBL06NzzVUVdxy3SwD6gKsZ4jAtjAb6695-nnJy719p7UB~t77R3g6AOGO4hMOXPCZ1KT9GgNc-aHiWx9SMEYWVrtq6N4bYRhOAWctpKsznvH4nDfzJfhPQiJdVawxEc468Pg__',
            }}
            style={style.avatar}
          />
        </View>
      </View>
      <View style={style.menuContainer}>
        <View
          style={{
            backgroundColor: '#af392f',
            flexDirection: 'row',
            width: '93%',
            height: 180,
            marginTop: -90,
            borderRadius: 20,
            padding: 20,
          }}>
          <View
            style={{
              flex: 0.8,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                style.text,
                {
                  fontSize: 20,
                },
              ]}>
              Sewa Mobil Berkualitas di lokasimu
            </Text>
            <Button color="green" title="Sewa Mobil" />
          </View>
          <View
            style={{
              flex: 1.2,
              marginTop: 10,
              marginLeft: 0,
            }}>
            <Image
              source={require('../media/images/img_car.png')}
              style={{
                width: 225,
                height: 150,
                borderRadius: 20,
              }}
            />
          </View>
        </View>
        <View style={style.menuList}>
          {dataMenu.map((item, index) => {
            return <Menu item={item} key={index} />;
          })}
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1.5,
          padding: 20,
        }}>
        <Text style={{...style.textBold, fontSize: 20}}>
          Daftar Mobil Pilihan
        </Text>
        <FlatList
          data={car.data}
          renderItem={({item, index}) => (
            <CarCard
              item={item}
              onPress={() => {
                if (item.id !== car.details?.id) dispatch(resetState());
                navigation.navigate('Detail', {id: item.id});
              }}
            />
          )}
          numColumns={1}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  header: {
    backgroundColor: '#A43333',
    flex: 0.8,
    flexDirection: 'row',
    padding: 20,
  },
  textBold: {
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  containerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: 'white',
    flex: 1.2,
    alignItems: 'center',
  },
  menu: {
    backgroundColor: '#A43333',
    padding: 18,
    borderRadius: 10,
    marginTop: 32,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  choiceContainer: {
    justifyContent: 'center',
  },
  choice: {
    backgroundColor: 'white',
    borderWidth: 2,
    height: 150,
    borderRadius: 10,
    borderColor: 'lightgrey',
    marginVertical: 8,
    flexDirection: 'row',
  },
  choiceTitle: {},
  choiceText: {},
  choiceImage: {
    width: 100,
    height: 100,
  },
  menuList: {
    flexDirection: 'row',
  },
});

export default HomeScreen;
