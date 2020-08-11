import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from './IconButton';

const GroupUtilities = ({ utilities, updateState }) => {
    let [unti, setUnti] = useState([]);

    useEffect(() => {
        setUnti([...utilities])
        console.log('gadget', unti)
    }, []);

    let handleSelected = (index, selected) => {
        let newUnti = [...unti];
        newUnti[index].selected = selected;
        setUnti([...newUnti])
    }

    useEffect(() => {
        updateState(unti)
    }, [unti]);

    return (
        <View style={[styles.sectionContent, { justifyContent: "flex-start" }]}>
            {
                unti.map(
                    (item, index) => <IconButton
                        text={item.text}
                        srcIcon={item.image}
                        value={item.value}
                        key={index}
                        selected={item.selected}
                        index={index}
                        handleSelected={(index, selected) => handleSelected(index, selected)}
                    />
                )
            }

        </View>
    )
}

export default GroupUtilities;

const styles = StyleSheet.create({
    sectionContent: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
})
