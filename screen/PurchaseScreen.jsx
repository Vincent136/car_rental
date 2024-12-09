import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Button
} from 'react-native';
import CarCard from '../component/CarCard';
import {useSelector} from 'react-redux';
import {selectCar} from '../redux/reducer/car';
import { selectForm } from '../redux/reducer/form';
import Clipboard from '@react-native-clipboard/clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountDown from 'react-native-countdown-fixed';

const labels = ['Pilih Metode', 'Bayar', 'Tiket'];

const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Augustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
const days = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu',
];

function PurchaseScreen({}) {
  const [rekening, setRekening] = useState('xxx-xxx-xxx-xxx');
  const [price, setPrice] = useState('1000000');

  const car = useSelector(selectCar);
  const form = useSelector(selectForm);
  const navigation = useNavigation();

  const today = new Date();
  const formattedDate = (date) => {
  return `${days[date.getDay()]}, ${date
    .getDate()
    .toString()
    .padStart(2, '0')} ${
    months[date.getMonth()]
  } ${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, '0')} : ${date.getMinutes().toString().padStart(2, '0')} WIB`
  }

  const copyToClipboard = text => {
    Clipboard.setString(text);
  };

  console.log(form);

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <Pressable style={style.backIcon} onPress={() => navigation.goBack()}>
          <IonIcon name="arrow-back-outline" size={32} />
          <Text style={{fontWeight: 'bold'}}> {form.bank?.name} Transfer </Text>
        </Pressable>
        <StepIndicator
          // customStyles={customStyles}
          direction="horizontal"
          customStyle={style.StepIndicator}
          currentPosition={1}
          labels={labels}
          stepCount={3}
        />

        <View style={{...style.padContainer}}>
          <View style={{flexDirection:"row"}}>
            <Text style={{...style.textBold, marginVertical: 10}}>
              Selesaikan Pembayaran Sebelum
            </Text>
            <CountDown
              until={100}
              size={10}
              digitStyle={{backgroundColor: 'red'}}
              digitTxtStyle={{color: 'white'}}
              timeToShow={['M', 'S', 'H']}
              timeLabels={{h:null, m: null, s: null}}
            />
            </View>
            <Text style={{...style.textBold, marginBottom: 10}}>
              {formattedDate(today)}
            </Text>
        </View>
        <CarCard item={car.details} />
        <View style={{...style.padContainer}}>
          <Text style={{...style.textBold, marginBottom: 10}}>
            Lakukan Transfer ke
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image style={style.bankIcon} source={form.bank?.img} />
            <View style={style.bankInfoContainer}>
              <Text style={style.text}>{form.bank?.name} TMMIN CAR RENTAL</Text>
              <Text style={style.text}>No. Rekening 1234567890</Text>
            </View>
          </View>
          <Text style={style.copyTitle}>Nomor Rekening</Text>
          <TouchableOpacity
            style={style.copyContainer}
            onPress={() => {
              copyToClipboard(rekening);
            }}>
            <Text>{rekening}</Text>
            <Feather name="copy" size={24} />
          </TouchableOpacity>
          <Text style={style.copyTitle}>Total Bayar</Text>
          <TouchableOpacity
            style={style.copyContainer}
            onPress={() => {
              copyToClipboard(price);
            }}>
            <Text>Rp {price}</Text>
            <Feather name="copy" size={24} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={style.purchaseContainer}>
            <Text style={{...style.textBold, marginBottom: 10}}> Klik konfirmasi pembayaran untuk mempercepat proses pengecekan </Text>
            <TouchableOpacity style={{...style.purchaseButton, backgroundColor:"green"}}> 
              <Text style={{...style.purchaseTitle, color:"white"}}>
                Konfirmasi Pembayaran
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...style.purchaseButton, backgroundColor:"white"}} onPress={() => navigation.navigate("Daftar Order")}>
              <Text style={{...style.purchaseTitle, color:"green"}}>
                Lihat Daftar Pesanan
              </Text> 
            </TouchableOpacity>
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
  padContainer: {
    paddingHorizontal: 20,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  copyContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  copyTitle: {
    color: 'grey',
    marginVertical: 10,
  },
  bankIcon: {
    width: 50,
    height: 'auto',
    margin: 10
  },
  bankInfoContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  purchaseContainer: {
    backgroundColor: 'lightgrey',
    height: '20%',
    padding: 15,
    width: '100%',
  },
  purchaseButton: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 35,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'green',
  },
  purchaseTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'  // Centered text in the view
  }
});

export default PurchaseScreen;
