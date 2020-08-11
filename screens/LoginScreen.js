import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Dimensions, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginReq, createUserReq } from '../actions/loginAction';
import PrimaryButton from '../components/PrimaryButton';
import Text from '../components/Text';
import Colors from '../constants/Colors';
import { AsyncStorage } from 'react-native';

const { width, height } = Dimensions.get('window');


const LoginScreen = () => {
    const navigation = useNavigation();
    const [login, setLogin] = useState(true);
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [retypePassword, setRetypePassword] = useState('');


    const loginUser = useSelector(state => state.user)
    const dispatch = useDispatch();

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.multiSet([
                ['token', value.token],
                ['user', jsonValue]
            ])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        dispatch(checkLoginReq({ userName, passWord }))
    }, [userName, passWord]);

    const handleLogin = () => {
        dispatch(checkLoginReq({ userName, passWord }))
        if (userName && passWord) {
            if (loginUser.login) {
                storeData(loginUser);
                navigation.navigate('Root');
            } else {
                alert('Tên đăng nhập hoặc mật khẩu sai ')
            }
        } else {
            alert('Bạn phải nhập đủ tên đăng nhập và mật khẩu')
        }
    }

    const handleSignUp = async () => {
        if (userName && passWord && retypePassword) {
            if (passWord === retypePassword) {
                let user = await {
                    email: userName,
                    password: passWord
                }
                await dispatch(createUserReq(user))
                setLogin(true)
            } else {
                alert('nhập lại password')
            }
        } else {
            alert('Bạn phải nhập đủ tên đăng nhập và mật khẩu')
        }
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: 'https://divui.com/blog/wp-content/uploads/2016/11/nha-hang-bangkok-view-dep.jpg' }} style={styles.background} >
                <View style={{ position: 'absolute', top: '30%', left: '10%' }}>

                    <Text type="Bold" style={{ fontSize: 40, color: '#fff' }}>Wlcome</Text>
                    <Text style={{ color: '#fff', width: width * 3 / 4 }}>It is a long established fact that a reader will be distracted by the</Text>
                </View>
            </ImageBackground>
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={styles.login}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity
                            onPress={() => setLogin(true)}>
                            <Text style={[styles.loginHeader, login ? null : styles.unActive]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setLogin(false)}>
                            <Text style={[styles.loginHeader, login ? styles.unActive : null]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput placeholder="Username" style={styles.textInput} onChangeText={(text) => setUserName(text)} value={userName} keyboardType={"email-address"} />
                        <TextInput placeholder="Password" style={styles.textInput} secureTextEntry={true} onChangeText={(text) => setPassWord(text)} value={passWord} />
                        {login ? (<TouchableOpacity><Text style={{ color: '#ccc', fontSize: 14, marginVertical: 20 }}>Quên mật khẩu</Text></TouchableOpacity>)
                            : (<TextInput
                                placeholder="Retype password"
                                style={styles.textInput}
                                secureTextEntry={true}
                                onChangeText={(text) => setRetypePassword(text)} value={retypePassword}
                            />)}
                        {login ? <PrimaryButton text='Login' buttonWidth={"90%"} onclick={() => handleLogin()} /> : <PrimaryButton text='Sign up' buttonWidth={"90%"} onclick={() => handleSignUp()} />}

                    </View>
                </View>
                {login ? (<View style={{ width: width * 3 / 4, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity style={{ width: "45%", backgroundColor: "#3b5998", borderRadius: 50, justifyContent: "center", height: 50, alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 13 }}>FaceBook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "45%", backgroundColor: "#db3236", borderRadius: 50, justifyContent: "center", height: 50, alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 13 }}>Google</Text>
                    </TouchableOpacity>
                </View>) : null}
            </View>
        </View >
    );
}


export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        width: width,
        height: height / 3,
        position: 'relative'
    },
    login: {
        width: 3 * width / 4,
        height: 3 * height / 6,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -40,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textInput: {
        width: "90%",
        height: 50,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        backgroundColor: '#e3eaf1'

    },
    loginHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.primaryColor,
        textTransform: 'uppercase',
        marginHorizontal: 10,
        marginVertical: 5
    },
    unActive: {
        fontSize: 20, color: '#ccc'
    }
})