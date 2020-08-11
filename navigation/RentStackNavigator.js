

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddNewRoom from '../screens/AddNewRoom';
import RentScreen from '../screens/RentScreen';
import RentProductStackNavigator from './RentProductStackNavigation';


const Rent = createStackNavigator();

const RentStackNavigator = () => {
    return (
        <Rent.Navigator>
            <Rent.Screen name="RentScreen" component={RentScreen} />
            <Rent.Screen name="ProductRentScreen" component={RentProductStackNavigator} />
            <Rent.Screen name="AddRoom" component={AddNewRoom} />
        </Rent.Navigator>
    );
}

export default RentStackNavigator;
