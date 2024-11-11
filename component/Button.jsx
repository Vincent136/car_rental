import React from "react";
import { StyleSheet, Button } from "react-native";


function GreenButton (props) {
    return (
        <Button 
        style={{
            ...style.ButtonStyle,
            ...props.style,
        }}
        color="green"
        title={props.title}
        />
    );
}

const style = StyleSheet.create({
    ButtonStyle: {
       
    },
});

export default GreenButton;