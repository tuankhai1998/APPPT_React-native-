import React, { useEffect } from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from './Icon';
import Colors from '../constants/Colors';
import { formatCurrency } from '../constants/FormatCurrency';
import { FontAwesome } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import PrimaryButton from './PrimaryButton';
import Text from './Text';
import { checkDonGia } from '../constants/handleFuntion';
import { imageUrl } from '../api/urlAPI';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const itemWidth = screenWidth * 80 / 100;
const itemWidth2 = screenWidth * 0.9;

const bigImageWidth = itemWidth2 / 2 - 3;
const smallImageWidth = itemWidth2 / 3 - 3;

const HomeItem = ({ click, data, home, handleDelete, lastChild, index }) => {
    let images = [...JSON.parse(data.url)];
    let url = [];
    images.forEach(image => {
        url.push(`${imageUrl}` + `${image}`)
    });




    let detail = [...JSON.parse(data.detail)]

    const checkSex = () => {
        if (data.sex === 0) {
            return 'tất cả'
        } else if (data.sex === 1) {
            return 'nam'
        }
        return 'nữ'
    }

    const checkType = (value) => {
        switch (value) {
            case 2: return 'Phòng trọ';
            case 3: return 'Căn hộ';
            case 4: return 'Khánh sạn';
            default: return 'Chung cư';
        }
    }

    const checkHome = () => {
        if (home) {
            return (
                <TouchableOpacity
                    style={[styles.item, { flex: 1, width: itemWidth2, marginHorizontal: screenWidth / 20 }]}
                    onPress={() => click()}
                >
                    <View style={[styles.listImage, { flex: 80 }]}>
                        <View style={styles.row1}>
                            <View style={styles.bigImage}>
                                <Image style={styles.image} source={{ uri: `${url[0]}` }} />
                            </View>
                            <View style={styles.bigImage}>
                                <Image style={styles.image} source={{ uri: `${url[0]}` }} />
                            </View>
                        </View>
                        <View style={[styles.row2, { flex: 20 }]}>
                            <View style={styles.smallImage}>
                                <Image style={styles.image} source={{ uri: `${url[0]}` }} />
                            </View>
                            <View style={styles.smallImage}>
                                <Image style={styles.image} source={{ uri: `${url[0]}` }} />
                            </View>
                            <View style={styles.smallImage}>
                                <Image style={styles.image} source={{ uri: `${url[0]}` }} />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.textContent, { paddingVertical: 10 }]}>
                        <View style={styles.textTitle}>
                            <View style={styles.Icon}>
                                <Icon name='ios-document' size={20} color="#000" />
                            </View>
                            <Text style={styles.text}>{`Cho thuê : ${checkType(data.type)} ${data.acreage}m`}</Text>
                        </View>
                        <View style={styles.textTitle}>
                            <View style={styles.Icon}>
                                <FontAwesome style={{ marginHorizontal: 5 }} name="map-marker" size={20} color="#000" />
                            </View>
                            <Text style={styles.text}>{data.address}</Text>
                        </View>
                        <View style={styles.textTitle}>
                            <View style={styles.Icon}>
                                <Icon name='ios-people' size={20} color="#000" />
                            </View>
                            <Text style={styles.text}>{`Tối đa ${data.number_people} người. Giới tính: ${checkSex()}.`}</Text>
                        </View>
                        <View style={styles.textTitle}>
                            <View style={styles.Icon}>
                                <Icon name='md-home' size={20} color="#000" />
                            </View>
                            <Text style={[styles.text]}>{`Có ${data.number_room} phòng ngủ và ${data.gadget.length} tiện ích`}.</Text>
                        </View>
                        <View style={styles.textTitle}>
                            <View style={styles.Icon}>
                                <Icon name='ios-pricetag' size={20} color="#000" />
                            </View>
                            <Text
                                style={{
                                    color: Colors.primaryColor,
                                    flex: 1, justifyContent: "center",
                                    alignItems: "flex-start",
                                    marginLeft: -5
                                }}
                            >
                                <Text
                                    style={{ fontSize: 20, fontWeight: "700" }}
                                >
                                    {formatCurrency(detail[0].price)}
                                </Text>
                                {checkDonGia(detail[0].type, 1)}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity >
            )
        } return (
            <View
                style={[{ marginHorizontal: screenWidth / 10, marginVertical: 10, marginBottom: lastChild ? 70 : null, height: screenHeight / 2 }, styles.item]}
            >
                <View style={[styles.listImage, { height: screenHeight / 4, flex: 50 }]}>
                    <SliderBox
                        images={url}
                        dotStyle={{
                            marginBottom: 5,
                        }}
                    />
                </View>
                <View style={[styles.textContent, { marginVertical: 10, marginHorizontal: 12, flex: 50, alignItems: 'center' }]}>
                    <View style={styles.textTitle}>
                        <View style={styles.Icon}>
                            <Icon name='ios-document' size={20} color="#000" />
                        </View>
                        <Text style={styles.text}>{`Cho thuê : ${checkType(data.type)} ${data.acreage}m2`}</Text>
                    </View>
                    <View style={styles.textTitle}>
                        <View style={styles.Icon}>
                            <Icon name='ios-people' size={20} color="#000" />
                        </View>
                        <Text style={styles.text}>{`Tối đa ${data.number_people} người. Giới tính: ${checkSex()}.`}</Text>
                    </View>
                    <View style={styles.textTitle}>
                        <View style={styles.Icon}>
                            <Icon name='md-home' size={20} color="#000" />
                        </View>
                        <Text style={styles.text}>{`Có ${data.number_room} phòng ngủ và ${data.gadget.length} tiện ích`}.</Text>
                    </View>

                    <View style={styles.textTitle}>
                        <View style={styles.Icon}>
                            <Icon name='ios-pricetag' size={20} color="#000" />
                        </View>
                        <View style={[styles.text, { color: Colors.primaryColor, flex: 1, justifyContent: "center", lineHeight: 1 }]} >
                            <Text
                                style={{
                                    color: Colors.primaryColor,
                                    flex: 1, justifyContent: "center",
                                    alignItems: "flex-start", marginLeft: -5,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: "700" }}>
                                    {formatCurrency(detail[0].price)}
                                </Text>
                                {checkDonGia(detail[0].type, 1)}
                            </Text>
                        </View>

                    </View>
                    <View style={styles.groupButton}>
                        <PrimaryButton text="Chi tiết" onclick={() => click()} buttonWidth={"45%"} />
                        <PrimaryButton text="Xóa" onclick={() => handleDelete(data.id, index)} buttonWidth={"45%"} buttonStyle={{ backgroundColor: "#db3236" }} />
                    </View>

                </View>
            </View>
        )
    }

    return (
        checkHome()
    );
}

export default HomeItem;


const styles = StyleSheet.create({
    item: {
        width: itemWidth,
        maxHeight: screenWidth * 1.3,
        marginRight: 30,
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
        overflow: "hidden",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    row2: {
        width: itemWidth2,
        flex: 50,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    row1: {
        width: itemWidth2,
        flex: 35,
        flexDirection: "row",
        justifyContent: "space-between",

    },
    listImage: {
        flexDirection: 'column',
        flex: 65,
        justifyContent: "center",
        alignItems: "center",
    },
    textContent: {
        flex: 50,
        width: itemWidth - 20,
        marginHorizontal: 20,
        justifyContent: "space-around"
    },
    bigImage: {
        width: bigImageWidth,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 3
    },
    smallImage: {
        width: smallImageWidth,
    },
    image: {
        flex: 100,
        width: '100%',
        height: '100%',
    },
    textTitle: {
        flexDirection: "row",
        marginTop: 3,
        alignItems: "center",
        width: "100%",

    },
    text: {
        flex: 1,

    },
    groupButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
        width: '100%'

    },
    Icon: {
        width: 30,
        justifyContent: "center",
        alignItems: "center"
    }

})