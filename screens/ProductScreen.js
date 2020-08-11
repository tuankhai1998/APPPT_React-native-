import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableWithoutFeedback, View, StatusBar } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { useDispatch, useSelector } from 'react-redux';
import { addLikeProduct, addLikeProductReq } from '../actions/likeAction';
import MapView, { Marker } from 'react-native-maps';
import { changeRentState } from '../actions/rentAction';
import PrimaryButton from '../components/PrimaryButton';
import Colors from '../constants/Colors';
import { formatCurrency } from '../constants/FormatCurrency';
import { utilities } from '../constants/iconButton';
import Text from '../components/Text';
import { checkDonGia, checkType } from '../constants/handleFuntion';
import { getUser } from '../actions/loginAction';
import { imageUrl, baseUrl } from '../api/urlAPI';


const markerIcon = require('../assets/ItemImg/marker.png')
const screenWidth = Dimensions.get('window').width;


const ProductScreen = () => {
    const navigation = useNavigation();
    const route = useRoute()
    const { thue, data } = route.params;
    let images = [...JSON.parse(data.url)];
    let url = [];
    images.forEach(image => {
        url.push(`${imageUrl}` + `${image}`)
    });
    let detail = [...JSON.parse(data.detail)]
    let gadget = [...JSON.parse(data.gadget)]
    let coords = {
        longitude: Number(data.longitude),
        latitude: Number(data.latitude),
    }
    const dispatch = useDispatch();
    const product = useSelector(state => state.product)

    const user = useSelector(state => state.user)
    const [avatar, setAvatar] = useState({ uri: 'https://static.gamehub.vn/img/files/2017/07/11/GameHubVN-top-10-chieu-thuat-loi-hai-nhat-trong-naruto-11.jpg' });


    useEffect(() => {
        StatusBar.setBarStyle('dark-content', true);
        if (data.avatar) {
            let uri = `${imageUrl}${data.avatar}`;
            setAvatar({ uri })
        }

    }, []);



    const handleAddLike = () => {

        let payload = {
            data: {
                id_user: user.id, id_room: data.id
            },
            token: user.token
        }
        dispatch(addLikeProductReq(payload));
    }

    const getIcon = () => {
        let iconArray = [];
        for (const value of gadget) {
            for (let i = 0; i < utilities.length; i++) {
                if (value === i) {
                    iconArray.push(utilities[i])
                }
            }
        }
        return iconArray
    }


    const handleRentState = (rentState) => {
        dispatch(changeRentState({ ...dataProduct, rentState }))
        setDataProduct(product)
    }


    return (
        <View>
            <ScrollView style={{ position: 'relative' }}>
                <View style={styles.container} >
                    <View style={styles.sliderImage}>
                        <SliderBox
                            images={url}
                            dotStyle={{
                                marginBottom: 20,
                            }}
                        />
                        <View
                            style={{ position: 'absolute', left: 7.5, top: 7.5, width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.6)", borderRadius: 50, justifyContent: "center", alignItems: "center" }}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons name='ios-arrow-back' size={30} color={Colors.darkPurple} />
                            </TouchableWithoutFeedback>

                        </View>
                        {thue ? null : <View
                            style={{ position: 'absolute', right: 7.5, top: 7.5, width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.6)", borderRadius: 50, justifyContent: "center", alignItems: "center" }}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => handleAddLike()}
                            >
                                <Ionicons name='ios-heart-empty' size={30} color={Colors.primaryColor} />
                            </TouchableWithoutFeedback>

                        </View>}

                    </View>

                    <View style={styles.productContent}>
                        <View style={styles.productContentHeader}>
                            <View style={styles.avatar}>
                                <Image style={styles.avatarImage} source={{ uri: avatar.uri }} />
                            </View>
                            <View>
                                <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>{data.full_name}</Text>
                                <Text style={{ color: '#ccc' }}>Ngày đăng : {data.create_date.slice(0, data.create_date.indexOf("T"))}</Text>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: 20, color: Colors.primaryColor }}>Cho thuê {checkType(data.type)}</Text>
                            <Text style={{ color: Colors.primaryColor, fontSize: 16, fontWeight: "bold" }}>{formatCurrency(detail[0].price)} {checkDonGia(detail[0].type, 1)}</Text>
                        </View>
                        <View style={styles.section}>
                            <View style={{ width: "100%" }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: Colors.primaryColor }}>Thông tin: </Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.description}>
                                    <Ionicons style={{ flexBasis: 22, marginRight: 5 }} name='ios-square' color={Colors.primaryColor} size={22} />
                                    <Text style={{ fontSize: 12 }}>Diện tích {data.acreage}M2</Text>
                                </View>
                                <View style={styles.description}>
                                    <Ionicons style={{ flexBasis: 22, marginRight: 5 }} name='ios-wifi' color={Colors.primaryColor} size={22} />
                                    <Text style={{ fontSize: 12 }}>{formatCurrency(detail[1].price)} {checkDonGia(detail[1].type, 0)}</Text>
                                </View>
                                <View style={styles.description}>
                                    <Ionicons style={{ flexBasis: 22, marginRight: 5 }} name='ios-water' color={Colors.primaryColor} size={22} />
                                    <Text style={{ fontSize: 12 }}>{formatCurrency(detail[2].price)} {checkDonGia(detail[2].type, 0)}</Text>
                                </View>
                                <View style={styles.description}>
                                    <MaterialCommunityIcons style={{ flexBasis: 22, marginRight: 5 }} name='flash' color={Colors.primaryColor} size={22} />
                                    <Text style={{ fontSize: 12 }}>{formatCurrency(detail[3].price)} {checkDonGia(detail[3].type, 0)}</Text>
                                </View>
                                <View style={styles.description}>
                                    <Ionicons style={{ flexBasis: 22, marginRight: 5 }} name='ios-people' color={Colors.primaryColor} size={22} />
                                    <Text style={{ fontSize: 12 }}>Tối đa {data.number_people} người</Text>
                                </View>
                                <View style={styles.description}>
                                    <MaterialCommunityIcons style={{ flexBasis: 22, marginRight: 5 }} name='gender-male-female' color={Colors.primaryColor} size={22} />
                                    <Text style={{ fontSize: 12 }}>{data.sex === 0 ? 'Tất cả' : data.sex === 1 ? 'Nam' : 'Nữ'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={{ width: "100%" }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: Colors.primaryColor }}>Các tiện ích: </Text>
                            </View>
                            <View style={[styles.sectionContent, { justifyContent: 'flex-start' }]}>
                                {
                                    getIcon().map((icon, index) => {
                                        return (
                                            <View style={styles.item} key={index}>
                                                <Image style={{ width: 40, height: 40 }} source={icon.image} />
                                                <Text style={{ fontSize: 12 }}>{icon.text}</Text>
                                            </View>
                                        )
                                    })
                                }

                            </View>
                        </View>

                        <View style={styles.section}>
                            <View style={{ width: "100%" }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: Colors.primaryColor }}>Địa chỉ: </Text>
                            </View>
                            <View style={{ alignItems: "flex-start", flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                                <Text>{data.address}</Text>

                                <MapView
                                    style={styles.map}
                                    showsUserLocation={true}
                                    region={{
                                        ...coords,
                                        latitudeDelta: 0.9,
                                        longitudeDelta: 0.9,
                                    }}
                                >
                                    <Marker
                                        coordinate={coords}
                                    >
                                    </Marker>

                                </MapView>
                            </View>
                        </View>
                    </View>

                </View>

            </ScrollView >
            {
                thue ? <GroupButton data={data} handleRentState={(rentState) => handleRentState(rentState)} /> : <PrimaryButton text="liên hệ" buttonWidth={screenWidth * 2 / 3} buttonStyle={styles.button} onclick={() => alert('do some think')} />
            }
        </View >
    );
}

export default ProductScreen;


const GroupButton = ({ data, handleRentState }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.groupButton}>
            <PrimaryButton
                text={data.rentState ? 'đã thuê' : 'đang thuê'}
                buttonWidth={screenWidth * 2 / 5}
                buttonStyle={{ height: 50 }} onclick={() => handleRentState(!data.rentState)}
            />
            <PrimaryButton
                text="Sửa thông tin" buttonWidth={screenWidth * 2 / 5}
                buttonStyle={{ height: 50 }}
                onclick={() => { navigation.navigate('AddRoom', { screen: 'Step1', params: { productData: data, update: true } }) }}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        position: 'relative',
    },
    section: {
        alignItems: 'center',
        marginVertical: 20
    },
    sectionContent: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    description: {
        flexDirection: 'row',
        flex: 1,
        flexBasis: '50%',
        alignItems: "center",
        marginVertical: 10,

    },
    sliderImage: {
        position: 'relative',
        zIndex: 100,
    },
    productContent: {
        width: screenWidth - 20,
        backgroundColor: '#fff',
        marginTop: -20,
        marginBottom: 20,
        zIndex: 110,
        marginHorizontal: 10,
        borderRadius: 30,
        overflow: 'hidden',
        paddingHorizontal: 30,
        paddingVertical: 30

    },
    productContentHeader: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    avatar: {
        backgroundColor: 'black',
        width: screenWidth / 4,
        height: screenWidth / 4,
        borderRadius: screenWidth / 8,
        overflow: 'hidden'

    },
    avatarImage: {
        flex: 1,
        width: "100%",

    },
    item: {
        flexBasis: "25%",
        marginVertical: 10,
        alignItems: "center"
    },
    itemImage: {
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: '100%',
        height: 40,

    },
    map: {
        width: screenWidth - 80,
        height: screenWidth / 2,
        marginVertical: 10,
    },
    addFavorite: {
        position: 'absolute',
        top: 0,
        right: 7.5
    },
    button: {
        position: 'absolute',
        bottom: 10,
        zIndex: 110,
        left: screenWidth / 6,
        height: 50
    },
    groupButton: {
        width: screenWidth,
        position: 'absolute',
        bottom: 10,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})