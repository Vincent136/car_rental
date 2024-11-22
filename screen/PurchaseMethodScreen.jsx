import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { View, Pressable, Text, StyleSheet, Dimensions, TextInput, SafeAreaView, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import CarCard from '../component/CarCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectForm, setBank, setPromo } from '../redux/reducer/form';
import { selectCar } from '../redux/reducer/car';

const labels = ["Pilih Metode","Bayar", "Tiket"];

const bank = [
    {id: 1, name: 'BCA', img: require('../media/images/bca.png')},
    {id: 2, name: 'Mandiri', img: require('../media/images/mandiri.jpg')},
    {id: 3, name: 'CIMB Niaga', img: require('../media/images/BNI.png')},
]

const { height } = Dimensions.get('window')

function PurchaseMethod({route}) {
    const [promoLocal, setPromoLocal] = useState("");
    const [disabledButton, setDisabledButton] = useState(true);

    const {dataCar} = route.params;

    const form = useSelector(selectForm);
    const car = useSelector(selectCar);

    const dispatch = useDispatch();

    const navigation = useNavigation();


    useEffect(() => {
        if (form.bank) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [form])

    // useEffect(() => {
    //     console.log(promoLocal);
    // }, [promoLocal])

    return (
    <SafeAreaView style={style.container}>
        <ScrollView>
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
        <CarCard item={car.details} />
        <View style={style.padContainer}>
            <Text style={style.bold}>Pilih Bank Transfer</Text>
            <Text style={style.bold}>Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau Mobile Banking</Text>
        </View> 

        <View style={{...style.padContainer}}>
            {bank.map(item => {
                return (
                <TouchableOpacity key={item.id} style={style.bankItem} onPress={() => {dispatch(setBank(item))}}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={style.bankIcon} source={item.id} />
                        <Text style={style.bankName}>{item.name} Transfer</Text>
                    </View>
                    {(form.bank?.id == item.id) &&<IonIcon name="checkmark-outline" size={24} color="green"/>}
                </TouchableOpacity>
                )
            })
            } 
        </View>
        <View style={style.promoContainer}>
            <Text style={style.promoTitle}>% Pakai Kode Promo</Text>
            <View style={style.promoFieldContainer}>
                <TextInput style={style.promoField} onChangeText={(item) => setPromoLocal(item)} placeholder='Masukkan kode'></TextInput>
                <Pressable style={style.promoButton} onPress={() => dispatch(setPromo(promoLocal))}><Text style={style.promoButtonText}>Terapkan</Text></Pressable>
            </View>
        </View>
        </ScrollView>
        <View style={style.purchaseContainer}>
            <View>
                <Text style={style.priceText}>Rp {dataCar.price}</Text>
            </View>
            <Button disabled={disabledButton} color="green" style={style.purchaseButton} title="Lanjutkan Pembayaran" onPress={() => {navigation.navigate("Purchase", {dataCar:dataCar})}}/>
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
        justifyContent:'space-between',
    },
    bankIcon: {
        width: 50,
        height: 'auto',
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
        marginTop: 10,
        marginBottom: height* 0.15
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
    },
    padContainer: {
        paddingHorizontal:20
    }
})

export default PurchaseMethod;
