import React from "react";
import { StyleSheet } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";


function Loading({visible}) {
    return (
        <Spinner
            visible={visible}
            textContent={"Loading..."}
            textStyle={style.loading}
            color="#A43333"
        />
    )
}

const style = StyleSheet.create({
    loading: {
        color: '#A43333',
        fontSize: 18,
    },
});

export default Loading;