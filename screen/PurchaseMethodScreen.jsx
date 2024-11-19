import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { View, Pressable, Text, StyleSheet, FlatList, TextInput, SafeAreaView, Button } from 'react-native';
import CarCard from '../component/CarCard';

const labels = ["Pilih Metode","Bayar", "Tiket"];

const bank = [
    {id: 1, name: 'BCA Transfer', img: 'bank'},
    {id: 2, name: 'BNI Transfer', img: 'bank'},
    {id: 3, name: 'Mandiri Transfer', img: 'bank'},
    {id: 4, name: 'CIMB Niaga Transfer', img: 'bank'},
]

function PurchaseMethod({route}) {

    const {dataCar} = route.params;

    const navigation = useNavigation();

    return (
    <SafeAreaView style={style.container}>
            <Pressable style={style.backIcon} onPress={() => navigation.goBack()}>
                <IonIcon  name="arrow-back-outline" size={32}/>
                <Text style={style.bold}> Pembayaran </Text>
            </Pressable>
        <StepIndicator
            // customStyles={customStyles}
            direction='horizontal'
            customStyle={style.StepIndicator}
            currentPosition={0}
            labels={labels}
            stepCount={3}
        />
        <CarCard item={dataCar} />
        <View>
            <Text style={style.bold}>Pilih Bank Transfer</Text>
            <Text style={style.bold}>Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau Mobile Banking</Text>
        </View> 

        <View style={{height:185}}>
            <FlatList data={bank}
            renderItem={({item, index}) => 
                <Pressable style={style.bankItem} >
                    <View style={style.bankIcon}>
                        {/* <IonIcon name={item.img} size={32} color="#007aff"/> */}
                    </View>
                    <Text style={style.bankName}>{item.name}</Text>
                </Pressable>
            } 
        numColumns={1} />
        </View>
        <View style={style.promoContainer}>
            <Text style={style.promoTitle}>% Pakai Kode Promo</Text>
            <View style={style.promoFieldContainer}>
                <TextInput style={style.promoField} placeholder='Masukkan kode'></TextInput>
                <Pressable style={style.promoButton}><Text style={style.promoButtonText}>Terapkan</Text></Pressable>
            </View>
        </View>
        <View style={style.purchaseContainer}>
            <View>
                <Text style={style.priceText}>Rp {dataCar.price}</Text>
            </View>
            <Button color="green" style={style.purchaseButton} title="Lanjutkan Pembayaran" onPress={() => {navigation.navigate("Method", {dataCar:dataCar})}}/>
        </View>
    </SafeAreaView>
        
    );
}

const style = StyleSheet.create({
    backIcon: {
        position: 'relative',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    StepIndicator: {
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bold: {
        fontWeight: 'bold',
        fontSize:18
    },
    bankItem: {
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 10,
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    bankIcon: {
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bankName: {
        fontSize: 18,
        marginLeft: 10,
    },
    promoContainer: {
        // flexDirection:'row',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
        borderRadius: 10,
        padding:25,
        marginTop: 10
    },
    promoField: {
        flex:1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 4,
        height: 50,
    },
    promoFieldContainer: {
        flexDirection: 'row',
        // justifyContent:'space-between',
        marginBottom: 10,
    },
    promoButton: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    promoButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    promoTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    purchaseContainer: {
        height: '15%',
        padding: 15,
        width: '100%',
        backgroundColor: '#EEEEEE',
        position:'absolute',
        bottom: 0,
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 20,
    }
})

export default PurchaseMethod;
