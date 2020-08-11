import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SearchScreen1 from '../screens/Advanced search/SearchScreen1';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import AroundMap from '../screens/AroundMap';
import searchScreen2 from '../screens/Advanced search/searchScreen2';

const Home = createStackNavigator();
const Search = createStackNavigator();
const Around = createStackNavigator();
const AroundScreenStack = createStackNavigator();



const HomeStackNavigator = () => {
    return (
        <Home.Navigator>
            <Home.Screen name="Home" component={HomeScreen} />
            <Home.Screen name="Product" component={ProductScreen} />
            <Home.Screen name="Search" component={SearchStackNavigator} />
            <Home.Screen name="Around" component={AroundStackNavigator} />
        </Home.Navigator>
    );
}

const SearchStackNavigator = () => {
    return (
        <Search.Navigator>
            <Search.Screen name="SearchScreen1" component={SearchScreen1} />
            <Search.Screen name="SearchScreen2" component={searchScreen2} />

        </Search.Navigator>
    )
}


const AroundStackNavigator = () => {
    return (
        <Around.Navigator>
            <Around.Screen name="AroundMap" component={AroundScreenStackNavigatior} />
        </Around.Navigator>
    )
}

const AroundScreenStackNavigatior = () => {
    return (
        <AroundScreenStack.Navigator>
            <AroundScreenStack.Screen name="AroundMap" component={AroundMap} />
            <AroundScreenStack.Screen name="Product" component={ProductScreen} />
        </AroundScreenStack.Navigator>
    )
}


export default HomeStackNavigator;
