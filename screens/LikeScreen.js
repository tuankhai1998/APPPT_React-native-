import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductInLikeReq, selectAllLikeReq } from '../actions/likeAction';
import { getUser } from '../actions/loginAction';
import HeaderComponent from '../components/HeaderComponent';
import HomeItem from '../components/HomeItem';
import { background2 } from '../constants/image';


// const products = require('../location.json');




const LikeScreen = () => {
    const navigation = useNavigation();
    const listItems = useSelector(state => state.like);
    const userID = useSelector(state => state.user.id);
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser())
        dispatch(selectAllLikeReq({ userID, token }))
    }, []);

    const handleDelete = (id, index) => {
        let payload = {
            data: { id_room: id, id_user: userID, index },
            token
        }
        dispatch(deleteProductInLikeReq(payload))
    }

    return (

        <View style={styles.container}>
            <HeaderComponent title="Yêu thích" />
            <ImageBackground
                source={background2}
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center"
                }}
            >

                <FlatList style={styles.container} data={listItems}
                    renderItem={({ item, index }) => {
                        return (
                            <HomeItem
                                key={item.id}
                                data={item}
                                id={item.id}
                                index={index}
                                click={() => navigation.push("Product", { thue: false, data: item })} handleDelete={(id, index) => handleDelete(id, index)}
                            />
                        )
                    }}
                />

            </ImageBackground>
        </View>
    );
}



export default LikeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


})