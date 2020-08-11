import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRent, showAllRent, fetchAllRent, deleteRentReq } from '../actions/rentAction';
import HeaderComponent from '../components/HeaderComponent';
import HomeItem from '../components/HomeItem';
import PrimaryButton from '../components/PrimaryButton';
import { background2 } from '../constants/image';

const screenWidth = Dimensions.get('window').width;

export default function RentScreen() {
  const navigation = useNavigation();
  const rentProduct = useSelector(state => state.rent);
  const userID = useSelector(state => state.user.id)
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchAllRent(userID))
  }, []);

  const handleOnPress = (data) => {
    navigation.push('ProductRentScreen', { screen: 'ProductRent', params: { data, thue: true } })
  }


  const handleDelete = (id, index) => {
    dispatch(deleteRentReq(id, index))

  }


  return (
    <View style={styles.container}>
      <HeaderComponent title="Cho thuê" />
      <ImageBackground
        source={background2}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center"
        }}
      >
        <FlatList data={rentProduct}
          renderItem={({ item, index }) => {
            return (
              <HomeItem
                key={index}
                data={item}
                index={index}
                click={() => handleOnPress(item)}
                handleDelete={(id, index) => handleDelete(id, index)}
                lastChild={rentProduct.length === (index + 1)}
              />
            )
          }}
        />

        <PrimaryButton
          text="Tạo phòng mới" buttonWidth={screenWidth * 2 / 3}
          buttonStyle={styles.buttonStyle}
          onclick={() => navigation.push('AddRoom', {
            screen: 'Step1',
            params: {
              userID,
              productData: {},
              update: false
            }
          })}
        />
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff'
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 10,
    left: screenWidth / 6,
  }
});
