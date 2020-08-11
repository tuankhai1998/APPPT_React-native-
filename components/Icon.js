import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const Icon = ({ name, size, color }) => {


    return (
        <Ionicons style={{ marginHorizontal: 5 }} name={name} color={color ? color : Colors.primaryColor} size={size} />
    );
}

export default Icon;
