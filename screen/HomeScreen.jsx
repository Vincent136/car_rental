import React from 'react';
import {View, Text, Button, StyleSheet, Image, FlatList, Pressable} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import CarCard from '../component/CarCard';
import Feather from 'react-native-vector-icons/Feather';

const dataMenu = [
  {uri: '../media/images/Bg.png', title: 'Sewa Mobil', icon: 'truck'},
  {uri: '../media/images/Bg.png', title: 'Oleh-Oleh', icon: 'box'},
  {uri: '../media/images/Bg.png', title: 'Penginapan', icon: 'key'},
  {uri: '../media/images/Bg.png', title: 'Camera', icon: 'camera'},
];

const dataCarList = [
  {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 1', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
  {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 2', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
  {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 3', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
  {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 4', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
  {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 5', person: 1, baggage:1, price: 1000000, currency: 'Rp'}
];

function HomeScreen() {
  const renderMenu = (item) => {
    return (
      <View style={style.containerItem}>
        <Pressable style={style.menu} onPress={()=>{}}>
          <Feather name={item.item.icon} size={30} color="white" />
        </Pressable>
        <Text style={style.menuTitle}>{item.item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={
        style.container
      }>
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
        <View
          style={style.avatarContainer}>
          <Image
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/0378/6ae3/d101f354911576fc8814c5fe373af941?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Agqrv9Z8V3X6wynU~uC52bxq8kimhJGy6thIrMifLkdsqgt0z2Tp-oIMSD-BCkKLFSmazflaziE0gIvEu5fYmMi2gLP-6laLKgm6n-Y7fybZOn0ObZt6TRp0Ke0YqzexS-6sGcFsKlxQpuzpw1G~JgO4Qvva6Ff7da-1MsSzCo9JBW5ZhT4o7h1uC-LxZp3iy5mRvU-JRvSnRYr9ieBL06NzzVUVdxy3SwD6gKsZ4jAtjAb6695-nnJy719p7UB~t77R3g6AOGO4hMOXPCZ1KT9GgNc-aHiWx9SMEYWVrtq6N4bYRhOAWctpKsznvH4nDfzJfhPQiJdVawxEc468Pg__',
            }}
            style={style.avatar}
          />
        </View>
      </View>
      <View
        style={style.menuContainer}>
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
              marginLeft: 0
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

        <FlatList
          data={dataMenu}
          renderItem={renderMenu}
          numColumns={4}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1.5,
          padding: 20,
        }}>
        <Text style={{...style.textBold, fontSize:20}}>Daftar Mobil Pilihan</Text>
        <FlatList
          data={dataCarList}
          renderItem={CarCard}
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
      flex: 1,
      alignItems: 'center',
    },
  menu: {
    backgroundColor: '#A43333',
    padding: 20,
    borderRadius: 10,
    marginTop: 32,
    marginBottom:8,
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
  }
});

export default HomeScreen;
