import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import StepIndicator from 'react-native-step-indicator';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import CarCard from '../component/CarCard';

const labels = ["Pilih Metode","Bayar", "Tiket"];


function PurchaseScreen({route}) {

    const {id} = route.params;

    const [dataCar, setDataCar] = useState([]);

    const navigation = useNavigation();

    const fetchData = async () => {
        const res = await axios.get(`http://192.168.1.57:3000/api/v1/cars/${id}`)
        setDataCar(res.data.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={style.container}>
            <Pressable style={style.backIcon} onPress={() => navigation.goBack()}>
                <IonIcon  name="arrow-back-outline" size={32}/>
                <Text style={{fontWeight: 'bold'}}> BCA Transfer </Text>
            </Pressable>
        <StepIndicator
            // customStyles={customStyles}
            direction='horizontal'
            customStyle={style.StepIndicator}
            currentPosition={1}
            labels={labels}
            stepCount={3}
        />
        <CarCard item={dataCar} />
        </View>
        
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
})

export default PurchaseScreen;
