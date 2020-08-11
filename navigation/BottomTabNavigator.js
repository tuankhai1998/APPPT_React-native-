import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';
import HomeStackNavigator from './HomeStackNavigator';
import LikeStackNavigation from './LikeStackNavigation';
import RentStackNavigator from './RentStackNavigator';
import Colors from '../constants/Colors';
import TabBarLabel from '../components/TabBarLabel';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'HomeScreen';

export default function BottomTabNavigator({ navigation }) {

    navigation.setOptions({ header: () => null, });

    return (
        <BottomTab.Navigator
            nitialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{
                activeTintColor: Colors.primaryColor,
                style: {
                    backgroundColor: '#000',
                    paddingVertical: 10,
                    height: 55,
                    elevation: 0,
                }

            }}
        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeStackNavigator}
                options={{
                    tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} text='Trang Chủ' />,
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
                }}
            />
            <BottomTab.Screen
                name="Like"
                component={LikeStackNavigation}

                options={{
                    tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} text='Yêu thích' />,
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-heart" />,
                }}
            />
            <BottomTab.Screen
                name="User"
                component={ProfileScreen}
                options={{
                    tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} text='Tài khoản' />,
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-person" />,
                }}
            />
            <BottomTab.Screen
                name="Rent"
                component={RentStackNavigator}
                options={{
                    tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} text='Cho thuê' />,
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />
        </BottomTab.Navigator>
    );
}

