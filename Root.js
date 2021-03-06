import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LoginScreen from './screens/LoginScreen';
import { AsyncStorage, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginReq } from './actions/loginAction';

const Stack = createStackNavigator();

const Root = () => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const userToken = useSelector(state => state.user.token)
    const userData = useSelector(state => state.user)

    const dispatch = useDispatch()


    const setItem = async (key, value) => {

        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }

    const getData = async () => {
        try {
            await AsyncStorage.getItem('user').then((userValue) => {
                let user = JSON.parse(userValue);
                if (user !== null) {
                    setToken(user.token)
                    dispatch(checkLoginReq({ id: user.id, token: user.token }))
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                }
            }
            )
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        setItem('user', userData)
        setToken(userToken)
    }, [userToken])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <Stack.Navigator>
            {
                token ? <Stack.Screen name="Root" component={BottomTabNavigator} /> : <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        header: () => null,
                    }}
                />
            }
        </Stack.Navigator>
    );
}

export default Root;
