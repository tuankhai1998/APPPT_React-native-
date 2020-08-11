import * as React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, AsyncStorage } from 'react-native';
import Swiper from 'react-native-swiper';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';
import HomeItem from '../components/HomeItem';
import Icon from '../components/Icon';
import Colors from '../constants/Colors';
import { background2 } from '../constants/image';
import { fetchAllProducts } from '../actions/productAction';


export default function HomeScreen({ navigation }) {
    const products = useSelector(state => state.product);
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const productOnPress = (data) => {
        navigation.push('Product', {
            thue: false,
            data
        })
    }


    React.useEffect(() => {
        dispatch(fetchAllProducts(token));
    }, []);
    return (
        <View style={styles.container}>
            <HeaderComponent title="Trang chủ" input={true} home />
            <ImageBackground
                source={background2}
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center"
                }}
            >


                <View style={styles.container, styles.homeContainer}>
                    <Swiper
                        dot={
                            <View
                                style={{
                                    backgroundColor: '#ccc',
                                    width: 10,
                                    height: 10,
                                    borderRadius: 7,
                                    marginLeft: 7,
                                    marginRight: 7
                                }}
                            />
                        }

                        activeDot={
                            <View
                                style={{
                                    backgroundColor: Colors.primaryColor,
                                    width: 13,
                                    height: 13,
                                    borderRadius: 7,
                                    marginLeft: 7,
                                    marginRight: 7
                                }}
                            />
                        }
                        paginationStyle={{
                            bottom: -2
                        }}
                        loop={false}
                    >


                        {
                            products.map((product, index) =>
                                <HomeItem index={index} key={product.id} click={() => productOnPress(product)} thue={false} data={product} home />
                            )
                        }

                    </Swiper>


                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.push('Around')}
                    >
                        <Icon name="ios-pin" size={30} color="#fff" />

                    </TouchableOpacity>

                </View>


            </ImageBackground>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontFamily: 'Rowdies-Bold'
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    homeContainer: {
        flex: 100,
        paddingVertical: 10
    },
    buttonText: {
        textTransform: "uppercase",
        color: "#fff",
        fontWeight: "bold"
    },
    listItem: {
        flex: 100,
        marginVertical: 10,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    secondaryButton: {
        height: 55,
        width: 55,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primaryColor,
        position: 'absolute',
        bottom: 10,
        right: 10

    },


});
