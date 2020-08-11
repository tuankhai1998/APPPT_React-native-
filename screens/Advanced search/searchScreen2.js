import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import HomeItem from '../../components/HomeItem';
import { useNavigation, useRoute } from '@react-navigation/native';
const searchScreen2 = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { dataRes } = route.params
    return (
        <View style={styles.container}>
            <HeaderComponent back={() => navigation.goBack()} title="Tìm kiếm năng cao" />
            <FlatList style={styles.container} data={dataRes}
                renderItem={({ item, index }) => {
                    return (
                        <HomeItem
                            key={index}
                            data={item}
                            index={index}
                            click={() => navigation.push("Product", { thue: false, data: item })}
                        />
                    )
                }}
            />
        </View>
    );
}

export default searchScreen2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },


})