import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUserReq } from '../actions/loginAction';
import { baseUrl } from '../api/urlAPI';
import HeaderComponent from '../components/HeaderComponent';
import PrimaryButton from '../components/PrimaryButton';
import Text from '../components/Text';
import Colors from '../constants/Colors';
import { background2 } from '../constants/image';
import { createImageData } from '../constants/createImageData';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSDT] = useState('');
    const [editTable, setEditTable] = useState(false);
    const navigation = useNavigation();
    const [avatar, setAvatar] = useState({ uri: 'https://static.gamehub.vn/img/files/2017/07/11/GameHubVN-top-10-chieu-thuat-loi-hai-nhat-trong-naruto-11.jpg' });

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        setName(user.full_name);
        setEmail(user.email);
        setSDT(user.phone);
        if (user.avatar) {
            let uri = `${baseUrl}/upload/${user.avatar}`;
            setAvatar({ uri })
        }

        getPermissionAsync()
    }, []);




    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });
            if (!result.cancelled) {


                let formData = new FormData();
                formData.append('avatar', createImageData(result));
                formData.append('userID', user.id)

                return await fetch(`${baseUrl}/upload/avatar`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                }).then(res => {
                    setAvatar({ uri: result.uri })
                }).catch(error => {
                    console.log("upload error", error);
                    alert("Upload failed!");
                });
            }
        } catch (E) {
            console.log(E);
        }
    };

    const getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

    };


    const onLogout = () => {
        navigation.navigate("Login")
    }

    const handelUpdateUser = () => {
        if (editTable) {
            let newUser = {
                full_name: name,
                email: email,
                phone: sdt
            }
            dispatch(updateUserReq({ id: user.id, newUser }))
            setEditTable(!editTable)
        } else (
            setEditTable(!editTable)
        )
    }

    const handleChangeAvatar = () => {
        pickImage()
    }




    return (
        <View style={styles.container}>
            <HeaderComponent title="Tài khoản" right={onLogout} />
            <ImageBackground
                source={background2}
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center"
                }}
            >
                <View style={[{ justifyContent: "center", alignItems: 'center' }]}>

                    <TouchableOpacity
                        onPress={() => handleChangeAvatar()}
                    >
                        <View style={styles.avatar}>
                            <Image style={styles.image} source={{ uri: avatar.uri }} />
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.userProfile, styles.border]}>
                        <Text style={styles.title} >Họ và tên:</Text>
                        <View style={editTable ? styles.border : styles.input}>
                            <TextInput editable={editTable} value={name} onChangeText={text => setName(text)} />
                        </View>
                        <Text style={styles.title} >Email:</Text>
                        <View style={editTable ? styles.border : styles.input}>
                            <TextInput editable={editTable} value={email} onChangeText={text => setEmail(text)} />
                        </View>
                        <Text style={styles.title} >Số điện thoại:</Text>
                        <View style={editTable ? styles.border : styles.input}>
                            <TextInput editable={editTable} value={sdt} onChangeText={text => setSDT(text)} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton text={editTable ? 'Hoàn tất' : 'Sửa thông tin'} onclick={() => handelUpdateUser()} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default ProfileScreen;

const screenWidth = Dimensions.get('window').width;




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avatar: {
        width: screenWidth / 2.5,
        height: screenWidth / 2.5,
        borderRadius: screenWidth / 2.5,
        backgroundColor: "#ccc",
        overflow: 'hidden',
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 1,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    userProfile: {
        width: screenWidth * 2 / 3,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 20,
    },
    title: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    primaryButton: {
        height: 60,
        paddingHorizontal: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primaryColor,
        borderRadius: 5

    },
    buttonText: {
        textTransform: "uppercase",
        color: "#fff",
        fontWeight: 'bold'
    },
    border: {
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5
    },
    input: {
        borderColor: 'rgba(250,250,250,0)',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5
    }

})