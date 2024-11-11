import React from 'react';

import { View, FlatList, Button, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CarCard from '../component/CarCard';


function CarListScreen({navigation}) {
    const dataCarList = [
        {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 1', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
        {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 2', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
        {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 3', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
        {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 4', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
        {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 5', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
        {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 2', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
        {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 3', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
        {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 4', person: 1, baggage:1, price: 1000000, currency: 'Rp'},
        {uri: 'https://s3-alpha-sig.figma.com/img/de32/01fa/69420676705055d2fbaf709faad5fd9e?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=e6BrkU2omjsJL~jnBOzgbkuQWSTKE6n3laKTRJAkWui7pgLsytRv54ngpcPt4sLTm-ZKffDevazNCZKO-duW-s1sDlvvmG3G~jtcYBSq4yIuzi9F30xRPEtj~~PDBXfAORkFhNXEw8eHmfW9SIe91pid4lEVAXlnJOj5gL4q-zQ9HuTNiHWCzkZq7OZtFHTIxMnXktKh~3GCWlf6YvOXVF2m595aUNgXd3lpw15GvxyWoBmUhUQv0osRjjd9LVviS~JRJuXUp0YoKWZIyR0Y8RLNi4L~7XsrA-GatTuF~BpLQwBsjVDgroLRXB3N8tNGXxHxK-tlworfl-~dHknxKw__', title: 'Car 5', person: 1, baggage:1, price: 1000000, currency: 'Rp'}
    ]

    return (
        <SafeAreaView style={style.container}>
            <FlatList
                data={dataCarList}
                renderItem={CarCard}
                numColumns={1}
            />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    }
})

export default CarListScreen;