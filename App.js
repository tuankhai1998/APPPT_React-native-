import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as React from 'react';
import { ActivityIndicator, AsyncStorage, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import LoginScreen from './screens/LoginScreen';
import store from './store';
import Root from './Root';


const Stack = createStackNavigator();

export default function App(props) {


    const isLoadingComplete = useCachedResources();
    let [fontsLoaded] = useFonts({
        'Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),
        'Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
        'Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
        'Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
        'Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
        'Thin': require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
        'Rowdies-Bold': require('./assets/fonts/Rowdies-Bold.ttf'),

    });



    if (!isLoadingComplete && !fontsLoaded) return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    );

    return (
        <Provider store={store}>
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle={"dark-content"} />}
                <NavigationContainer linking={LinkingConfiguration} >
                    <Root />
                </NavigationContainer>
            </View>
        </Provider>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',

    },
});
