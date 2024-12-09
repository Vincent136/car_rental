import { useFocusEffect } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import CountDown from 'react-native-countdown-fixed';


export default function OrderCard ({item, onPress}) {
    const [countdown, setCountdown] = useState(0);
    
    useFocusEffect(
        React.useCallback(() => {
            console.log(new Date(item.overdue_time))
            console.log(new Date())
            const overdue_countdown =  (new Date(item.overdue_time) - new Date()) / 1000;
            setCountdown(Math.floor(overdue_countdown))
        }, [])
    )

    useEffect(() => {
        console.log(countdown);
    }, [countdown])
    return (
    <TouchableOpacity style={style.card} onPress={onPress}>
        <View style={style.cardInfo}>
            {item.order_no ? <Text>i{item.order_no}</Text> : <CountDown until={countdown} />}
            <Text>{item.status}</Text>
            <Text>{item.overdue_time}</Text>
        </View>
    </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    card: {
        flexDirection:'row',
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
        marginBottom: 10,
        marginVertical: 20,
        marginHorizontal: 15,
        padding:25,
    },
    cardImage: {
        width: 60,
        height: 40,
        marginRight: 10,
    },
    cardSubText: {
        fontWeight: 'bold',
        color: '#8A8A8A',
        marginHorizontal: 2
    },
    cardSubInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#8A8A8A'
    },
    cardPrice: {
        color: '#5CB85F',
        marginTop: 10,
    }
})