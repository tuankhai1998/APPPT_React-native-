import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import Icon from './Icon';
import { FontAwesome } from '@expo/vector-icons';
import { formatCurrency } from '../constants/FormatCurrency';
import Text from './Text';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SmallItem = ({ onclick, itemstyle, data }) => {
    const checkData = () => {
        if (data) {
            return (
                <TouchableOpacity
                    style={[styles.item, itemstyle, styles.swipeOut]}
                    onPress={() => onclick()}
                >
                    <View style={styles.itemImage}>
                        <Image style={styles.image} source={{ uri: data.image }} />
                    </View>

                    <View style={styles.textContent}>
                        <View style={styles.textTitle}>
                            <Icon name='ios-document' size={20} color="#000" />
                            <Text style={{ flex: 1 }}>{`Cho thuê : ${data.type} ${data.acreage}m`}</Text>
                        </View>
                        <View style={styles.textTitle}>
                            <FontAwesome style={{ marginHorizontal: 5 }} name="map-marker" size={20} color="#000" />
                            <Text style={{ flex: 1 }}>{data.address}</Text>
                        </View>

                        <View style={styles.textTitle}>
                            <Icon name='ios-pricetag' size={20} color="#000" />
                            <Text style={{ color: Colors.primaryColor, flex: 1 }}><Text style={{ fontSize: 20, fontWeight: "700" }}>{formatCurrency(data.price)}</Text>vnđ/tháng</Text>
                        </View>
                    </View>
                </TouchableOpacity >
            )
        }
        return <View></View>;
    }


    return (
        checkData()

    );
}

export default SmallItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        width: screenWidth - 20,
        height: screenHeight / 4,
        marginHorizontal: 10,
        justifyContent: "center",
        borderRadius: 5,

        overflow: 'hidden',
        paddingRight: 10,

    },
    textContent: {
        flex: 55,
        paddingVertical: 10,
        paddingHorizontal: 10,

    },
    itemImage: {
        flex: 45,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    textTitle: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "center",
    },
    swipeOut: {
        backgroundColor: '#fff',
        flexDirection: "row",
        width: screenWidth - 20,
        height: screenHeight / 4,
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: '#f5f5f5',

        overflow: 'hidden',


    }
})