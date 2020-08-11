import React from 'react';
import Colors from '../constants/Colors';
import Text from './Text';

const TabBarLabel = ({ focused, text }) => {
    return (
        <Text style={{ color: focused ? Colors.primaryColor : '#fff', fontSize: 12 }}>
            {text}
        </Text>
    );
}

export default TabBarLabel;
