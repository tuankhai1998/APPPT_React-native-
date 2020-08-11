import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StepIndicator from 'react-native-step-indicator';
import { useDispatch } from 'react-redux';
import { addRentReq } from '../../actions/rentAction';
import HeaderComponent from '../../components/HeaderComponent';
import PrimaryButton from '../../components/PrimaryButton';
import Text from '../../components/Text';
import Colors from '../../constants/Colors';
import { createImageData } from '../../constants/createImageData';
import { customStyles } from '../../constants/CustomStepStyle';
import { ScreenWidth } from '../../constants/Layout';


const StepThree = () => {
    const navigation = useNavigation();
    const router = useRoute();
    const { rentData, update } = router.params;
    const [images, setImages] = useState([]);
    const [data, setData] = useState(rentData);
    const [imgResult, setImgResult] = useState([])
    const dispatch = useDispatch();


    let image = [
        "https://nhadepphucuong.com/wp-content/uploads/2018/06/THIET-KE-BIET-THU-MAI-THAI-9.jpg",
        "https://vinavic.vn/wp-content/uploads/2016/09/mau-thiet-ke-nha-biet-thu-dep-2-tang-BT1623-11.jpg",
        "https://kientrucnhavietmoi.com/wp-content/uploads/2019/06/2-6.jpg",
        "https://i0.wp.com/mauthietkenhadep.net/wp-content/uploads/2018/04/mau-nha-dep-1.jpg",
        "https://phanthinh.vn/wp-content/uploads/2018/10/thiet-ke-nha-dep-t%E1%BA%A1i-quang-ninh-2.jpg"
    ];

    let formData = new FormData();


    useEffect(() => {
        getPermissionAsync()
        if (update) {
            setImages(rentData.url)
        }
    }, []);


    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setImgResult([...imgResult, result])
                setImages([...images, result.uri]);
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

    const handelFinist = () => {
        if (update) {
            dispatch(updateRent(data))
            alert('update thanh cong ')
            navigation.navigate('Rent', {
                screen: "RentScreen"
            })
        } else {
            imgResult.forEach(result => {
                formData.append('rooms', createImageData(result));
            })
            formData.append("data", JSON.stringify(rentData))
            dispatch(addRentReq(formData));
            alert('tao thanh cong ');
            navigation.navigate('Rent', {
                screen: "RentScreen"
            })

        }
    }


    return (
        <View style={[styles.container]}>
            <HeaderComponent title='Tạo Phòng' back={() => navigation.goBack()} />
            <View style={{ marginVertical: 10 }}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={2}
                    stepCount={3}
                />
            </View>
            <View style={[styles.section, { flex: 1, paddingHorizontal: 30 }]}>
                <View style={{ width: "100%" }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Đăng ảnh: </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {
                        images.map((image, idx) => {
                            return (
                                <View key={idx} style={styles.itemImage}>
                                    <Image style={{ width: '100%', height: '100%' }} source={{ uri: image }} />
                                </View>
                            )
                        })
                    }
                    <TouchableOpacity style={styles.itemImage}
                        onPress={() => pickImage()}
                    >
                        <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/icon/duplicate-outline.png')} />
                    </TouchableOpacity>

                </View>
                <Text
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: Colors.primaryColor
                    }}
                >Cần đăng tối thiểu 5 ảnh về căn phòng</Text>
            </View>
            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginBottom: 10 }}>
                <PrimaryButton text={'Hoàn tất'} buttonWidth={ScreenWidth * 2 / 3} onclick={() => handelFinist()} />
            </View>

        </View>
    )
}

export default StepThree;

const itemSize = (ScreenWidth - 60) * 3 / 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    bottomStyle: {
        marginHorizontal: ScreenWidth / 6,
        marginBottom: 10
    },
    sectionContent: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5

    },
    itemImage: {
        width: itemSize,
        height: itemSize,
        marginBottom: 15,
    },

})
