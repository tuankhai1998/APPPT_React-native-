import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Text from './Text';

const IconButton = ({ srcIcon, text, selected, handleSelected, index }) => {
    const checkActive = () => {
        if (selected) {
            return (
                <TouchableOpacity style={styles.item} onPress={() => { handleSelected(index, !selected) }}>
                    <Image style={{ width: 40, height: 40, tintColor: Colors.primaryColor }} source={srcIcon} />
                    <Text style={{ fontSize: 12, color: Colors.primaryColor }}>{text}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.item} onPress={() => { handleSelected(index, !selected) }}>
                    <Image style={{ width: 40, height: 40 }} source={srcIcon} />
                    <Text style={{ fontSize: 12 }}>{text}</Text>
                </TouchableOpacity >
            )

        }
    }
    return (
        checkActive()
    )
}

export default IconButton;


const styles = StyleSheet.create({
    item: {
        flexBasis: "25%",
        marginVertical: 10,
        alignItems: "center"
    },
})