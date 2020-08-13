import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import HeaderComponent from '../components/HeaderComponent';
import Colors from '../constants/Colors';
import { formatCurrency } from '../constants/FormatCurrency';
import * as Location from 'expo-location';
import Text from '../components/Text';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductAround } from '../actions/productAction';
import { imageUrl } from '../api/urlAPI';

// const sampleLocation = require('../location.json');

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 80 / 100;
const CARD_PADDING = width * 0.1 - 10;


const AroundMap = () => {
    const navigation = useNavigation();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);


    const aroundItem = useSelector(state => state.around);
    const dispatch = useDispatch();


    let mapAnimation = new Animated.Value(0);
    let mapIndex = 0;

    const _map = useRef(null);
    const _scrollView = useRef(null)

    useEffect(() => {
        getLocationAsync();

    }, []);


    const getItemAround = async (longitude, latitude) => {
        dispatch(fetchProductAround({ longitude, latitude }));
    }

    const getLocationAsync = async () => {
        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        await getItemAround(location.coords.latitude, location.coords.longitude)
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
    }

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= aroundItem.length) { index = aroundItem.length - 1 }
            if (index <= 0) { index = 0 }

            clearTimeout(regionTimeOut)

            const regionTimeOut = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { latitude, longitude } = aroundItem[index];
                    _map.current.animateToRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }, 500)
                }
            }, 10)
        })
    });


    let handleOnPress = (data) => {
        navigation.push('Product', { thue: false, data })
    }


    let onMarkerPress = (mapMarkerData) => {
        let markerID = mapMarkerData._targetInst.return.key;
        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - CARD_PADDING;
        }
        _scrollView.current.getNode().scrollTo({ x: x, y: 0, animated: true })
    }


    return (
        <View style={styles.container}>
            <HeaderComponent title="Gần đây" back={() => navigation.goBack()} />
            <View style={styles.mapContainer}>
                <MapView
                    ref={_map}
                    style={styles.mapStyle}
                    showsUserLocation={true}
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {
                        aroundItem.map((marker, idx) => {
                            const { latitude, longitude } = marker
                            return (

                                <Marker
                                    key={idx}
                                    coordinate={{ latitude, longitude }}
                                    onPress={(e) => onMarkerPress(e)}
                                >
                                </Marker>
                            )
                        })
                    }
                </MapView>
                <Animated.ScrollView
                    ref={_scrollView}
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={CARD_WIDTH + 20}
                    style={styles.scrollView}
                    contentInset={{
                        top: 0,
                        bottom: 0,
                        left: width * 0.1 - 10,
                        right: width * 0.1 - 10,
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: Platform.OS === "android" ? width * 0.1 - 10 : 0
                    }}
                    onScroll={
                        Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: mapAnimation,
                                        }
                                    }
                                }
                            ],
                            { useNativeDriver: true }
                        )
                    }
                >
                    {
                        aroundItem.map((item, idx) => <MapItem data={item} key={idx} handleDetailClick={(data) => handleOnPress(data)} />)
                    }
                </Animated.ScrollView>
            </View>
        </View>
    );
}

export default AroundMap;

const MapItem = ({ data, handleDetailClick }) => {
    let images = [...JSON.parse(data.url)]
    let url = [];
    images.forEach(image => {
        url.push(`${imageUrl}` + `${image}`)
    });

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: url[0] }}
                resizeMode="cover"
                style={styles.itemImage}
            />
            <View style={styles.textContent}>
                <Text
                    numberOfLines={2}
                >
                    {data.address ? data.address : ""}
                </Text>
                <Text
                    numberOfLines={1}
                >
                    {/* {`${formatCurrency(d)} VND/Tháng`} */}

                </Text>
                <View style={styles.groupButton}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleDetailClick(data)}
                    >
                        <Text style={[styles.buttonText, { color: Colors.primaryColor }]}>
                            Chi Tiết
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={[styles.buttonText, { color: Colors.redColor }]}>
                            Chỉ Đường
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    mapStyle: {
        flex: 2,
        position: 'relative'
    },
    scrollView: {
        flex: 1,
        width: width,
        marginTop: -160
    },
    itemImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center"
    },
    textContent: {
        flex: 2,
        padding: 10
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        elevation: 2,
        borderRadius: 5,
        overflow: 'hidden',
        marginHorizontal: 10,
        backgroundColor: '#fff',

    },
    groupButton: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: CARD_WIDTH,
        height: 40,
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    button: {
        width: "45%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
    }, buttonText: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    mapContainer: {
        flex: 1,
        backgroundColor: '#dcdcdc'
    }
})