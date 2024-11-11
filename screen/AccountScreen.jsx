import React  from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Text, Button, StyleSheet, Image } from 'react-native';


function AccountScreen() {
    const navigation = useNavigation();

    const isLogin = false;

    return (
        <View style={style.container}>
            {!isLogin && 
                <View style={style.textContainer}>
                    <Image source={require('../media/images/akun_bg.png')} />
                    <Text style={style.text}>Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah</Text>
                    <Button
                        title="Register"
                        color="green"
                        onPress={() => navigation.navigate('SignUp')}
                    />
                </View>
            }
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center'
    },
    textContainer: {
        padding: 20,
        alignItems:'center',
        justifyContent:'center'
    },
});

export default AccountScreen;