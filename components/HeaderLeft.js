import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from './Icon';

const HeaderLeft = ({ position, back }) => {

    return (
        <TouchableOpacity
            onPress={() => back()}
            style={{ marginRight: 5 }}
        >
            <Icon name="ios-arrow-back" size={30} />
        </TouchableOpacity>
    );
}

export default HeaderLeft;

