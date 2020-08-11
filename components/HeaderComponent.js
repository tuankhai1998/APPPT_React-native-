import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, TextInput, StatusBar } from 'react-native';
import Colors from '../constants/Colors';
import HeaderLeft from './HeaderLeft';
import Icon from './Icon';
import { useNavigation } from '@react-navigation/native';
import Text from './Text';




const screenWidth = Dimensions.get('window').width;

const HeaderComponent = ({ home, title, back, right, onclick, search }) => {

    return (
        <View style={styles.header}>
            {
                home ? (
                    <Header home />
                ) : back ? (
                    <Header back title={title} />

                ) : right ? (
                    <Header right title={title} />
                ) : search ? <Header back title={title} search /> : (
                    <Header title={title} />
                )
            }

        </View >
    );
}


const Header = ({ home, title, right, back, onclick, search }) => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState(null)
    useEffect(() => {
        StatusBar.setBarStyle('light-content', true)

    }, []);

    return (
        <LinearGradient
            colors={['#000', '#000']}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "flex-end", justifyContent: 'space-between', width: "100%", paddingVertical: 5 }}>
                {home ? <Image
                    source={require('../assets/ItemImg/Logo.png')}
                    style={styles.logo}
                /> : <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {back ? <HeaderLeft color={Colors.primaryColor} back={() => navigation.goBack()} /> : null}
                        {search ? null : <Text type="Bold" style={{ textTransform: 'capitalize', color: Colors.primaryColor, fontSize: 25 }}>{title}</Text>}
                    </View>
                }
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {search ? (<View style={styles.inputForm}>
                        <TextInput style={[styles.input, { color: '#fff' }]} value={searchText} onChangeText={(text) => setSearchText(text)} placeholder="Nhập nơi muốn tìm" autoFocus={true} />
                        <Icon name="ios-search" size={30} color={Colors.primaryColor} />
                    </View>) : right ? <HeaderRight right={() => alert('log out')} /> : (<TouchableOpacity
                        onPress={() => {
                            navigation.navigate('HomeScreen', {
                                screen: 'Search'
                            })
                        }}
                    >
                        <Icon name="ios-search" size={30} color={Colors.primaryColor} />
                    </TouchableOpacity>)
                    }
                </View>
            </View>
        </LinearGradient>
    )
}



const HeaderRight = ({ right }) => {
    return (
        <TouchableOpacity
            onPress={() => right()}
        >
            <Image
                source={require('../assets/ItemImg/exit.png')}
                style={{ width: 20, height: 20, tintColor: Colors.safetyOrange }}
            />
        </TouchableOpacity>
    )
}

export default HeaderComponent;


const styles = StyleSheet.create({
    header: {
        height: 65,
        width: screenWidth,
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: '#ccc',

    },
    headerContent: {
        width: screenWidth,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        position: 'relative',
    },
    inputForm: {
        width: screenWidth * 0.75,
        height: 35,
        borderRadius: 50,
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    input: {
        marginLeft: 5,
        width: screenWidth * 0.7,
        flex: 1,
        color: '#fff'
    },
    title: {
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 20,

    },
    logo: {
        height: 35,
        width: 40,
    }
})