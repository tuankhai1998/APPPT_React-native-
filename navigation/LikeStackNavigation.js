import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProductScreen from '../screens/ProductScreen';
import LikeScreen from '../screens/LikeScreen';


const Like = createStackNavigator();


const LikeStackNavigation = () => {
    return (
        <Like.Navigator>
            <Like.Screen name="LikeScreen" component={LikeScreen} />
            <Like.Screen name="Product" component={ProductScreen} />
        </Like.Navigator>
    );
}

export default LikeStackNavigation;


