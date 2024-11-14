import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import Markdown from 'react-native-markdown-display';
import Feather from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const md = `## Include
  
  - Apa saja yang termasuk dalam paket misal durasi max 12 jam
  - Sudah termasuk bensin selama 12 jam
  - Sudah termasuk Tiket Wisata
  - Sudah termasuk pajak
  
  ## Exclude
  
  - Tidak termasuk biaya makan sopir Rp 75.000/hari
  - Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
  - Tidak termasuk akomodasi penginapan`.toString();


function DetailScreen({route}) {
    const [dataCar, setDataCar] = useState([]);

  const {id} = route.params;
    useEffect(() =>{
        console.log(id);
    }, []);

    const navigation = useNavigation();

    const fetchData = async () => {
        const res = await axios.get(`http://192.168.1.57:3000/api/v1/cars/${id}`)
        setDataCar(res.data.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

  return (
  <SafeAreaView style={style.container}>
    <Pressable style={style.backIcon} onPress={() => navigation.goBack()}>
        <IonIcon  name="arrow-back-outline" size={32}/>
    </Pressable>
    <View style={style.headerContainer}>
        <Text style={style.headerText}>{dataCar.name}</Text>
        <View style={style.iconContainer}>
            <Feather name="users" size={10} color="#8A8A8A" />
            <Text style={{...style.headerText, fontWeight:'bold', marginLeft:2, marginRight:10}}>{dataCar.seat}</Text>
            <Feather name="briefcase" size={10} color="#8A8A8A" />
            <Text style={{...style.headerText, fontWeight:'bold', marginLeft:2}}>{dataCar.baggage}</Text>
        </View>
        <Image style={style.headerImage} source={require("../media/images/zenix.png")} />
    </View>
    <ScrollView style={style.infoContainer}>
        {/* <Image style={style.infoImage} source={require("../media/images/zenix.png")} /> */}
        <Markdown style={style.detail}>{md}</Markdown>
    </ScrollView>
  </SafeAreaView>
  );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        height:'30%',
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
        width: '100%',
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
        heading2: { marginBottom: 10, fontSize: 18, fontWeight:'bold', fontFamily: 'PoppinsBold' },
    }
});

export default DetailScreen;
