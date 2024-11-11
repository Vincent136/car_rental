import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

const CarCard = ({item}) => (
    <View style={style.card}>
        <Image source={{uri: item.uri}} style={style.cardImage} />
        <View style={style.cardInfo}>
            <Text>{item.title}</Text>
            <View style={style.cardSubInfo}>
                <Feather name="users" size={10} color="#8A8A8A" />
                <Text style={{...style.cardSubText, marginRight:10}}>{item.person}</Text>
                <Feather name="briefcase" size={10} color="#8A8A8A" />
                <Text style={{...style.cardSubText}}>{item.baggage}</Text>
            </View>
            <View style={style.cardSubInfo}>
                <Text style={style.cardPrice}>{item.currency} </Text>
                <Text style={style.cardPrice}>{item.price}</Text>
            </View>
        </View>
    </View>
)

const style = StyleSheet.create({
    card: {
        flex: 1,
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
        marginVertical: 10,
        marginHorizontal: 15,
        padding:25
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

export default CarCard;