

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProductScreen from '../screens/ProductScreen';
import AddNewRoom from '../screens/AddNewRoom';


const Rent = createStackNavigator();

const RentProductStackNavigator = () => {
    return (
        <Rent.Navigator>
            <Rent.Screen name="ProductRent" component={ProductScreen} />
            <Rent.Screen name="AddRoom" component={AddNewRoom} />
        </Rent.Navigator>
    );
}

export default RentProductStackNavigator;
