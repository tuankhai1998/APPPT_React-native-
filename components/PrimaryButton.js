import React from 'react';
import { TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Text from './Text';

const PrimaryButton = ({ buttonWidth, text, onclick, buttonStyle }) => {
    return (
        <TouchableOpacity
            style={[{ width: buttonWidth ? buttonWidth : 200 }, styles.primaryButton, buttonStyle]}
            onPress={() => { onclick() }}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity >
    );
}

export default PrimaryButton;


const styles = StyleSheet.create({
    primaryButton: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primaryColor,
        borderRadius: 5
    },
    buttonText: {
        textTransform: "uppercase",
        color: "#fff",
        fontWeight: "bold"
    },
})