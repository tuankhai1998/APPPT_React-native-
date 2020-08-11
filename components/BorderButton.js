import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, Image, Text } from 'react-native';
import Colors from '../constants/Colors';

const screenWidth = Dimensions.get('window').width;


const BorderButton = ({ active, type, text, iconName, handleActive }) => {
    const checkActive = (active, type) => {
        if (active == type) {
            return (
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { handleActive(type) }}>
                    <View style={styles.borderButtonActive}>
                        <Image style={{ width: 20, height: 20, marginRight: 10, tintColor: '#fff' }} source={iconName} />
                        <Text style={{ color: '#fff' }}>{text}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { handleActive(type) }}>
                    <View style={styles.borderButton}>
                        <Image style={{ width: 20, height: 20, marginRight: 10 }} source={iconName} />
                        <Text >{text}</Text>
                    </View>
                </TouchableOpacity >
            )
        }
    }

    return (
        checkActive(active, type)

    )
}

export default BorderButton;

const styles = StyleSheet.create({
    borderButton: {
        width: screenWidth / 3,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        borderColor: '#ccc',
        borderRadius: 20,
        borderWidth: 1,
        paddingVertical: 10,
    },
    borderButtonActive: {
        width: screenWidth / 3,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        tintColor: '#FFF',
        borderRadius: 20,
        overflow: 'hidden',
        paddingVertical: 10,
    },
})
