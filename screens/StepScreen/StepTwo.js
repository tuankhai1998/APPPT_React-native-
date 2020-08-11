import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, ScrollView, Slider, StyleSheet } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import StepIndicator from 'react-native-step-indicator';
import Text from '../../components/Text';
import { formatCurrency } from '../../constants/FormatCurrency';
import * as Location from 'expo-location';
import { ScreenWidth } from '../../constants/Layout';
import { customStyles } from '../../constants/CustomStepStyle';
import Colors from '../../constants/Colors';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import PrimaryButton from '../../components/PrimaryButton';

const phong = [
    { label: '/ngày', value: 2 },
    { label: '/tháng', value: 1 }
]

const dien = [
    { label: '/số', value: 1 },
    { label: '/tháng', value: 2 },
    { label: 'miễn phí', value: 0 }
]

const nuoc = [
    { label: '/số', value: 1 },
    { label: '/tháng', valuae: 2 },
    { label: 'miễn phí', value: 0 }
]

const internet = [
    { label: '/tháng', value: 1 },
    { label: 'miễn phí', value: 0 }
]

const StepTwo = () => {
    const navigation = useNavigation();
    const router = useRoute();
    const { rentData, update } = router.params
    const [data, setData] = useState(rentData);
    const [tDien, setTDien] = useState('3000');
    const [tPhong, setTPhong] = useState('100000');
    const [tNuoc, setTNuoc] = useState('10000');
    const [tInternet, setTInternet] = useState('10000');
    const [dienDonGia, setDienDonGia] = useState(1);
    const [phongDonGia, setPhongDonGia] = useState(1);
    const [nuocDonGia, setNuocDonGia] = useState(1);
    const [acreage, setAcreage] = useState(15);
    const [people, setPeople] = useState(1);
    const [address, setAddress] = useState('');
    const [bedRoom, setBedRoom] = useState(1)
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [internetDonGia, setInternetDonGia] = useState(1);

    useEffect(() => {
        if (update) {
            console.log(rentData   )
            // setTPhong(rentData.price);
            // setPhongDonGia(rentData.phongDonGia);
            // setTDien(rentData.tDien);
            // setDienDonGia(rentData.dienDonGia);
            // setTNuoc(rentData.nuocDonGia);
            // setTInternet(rentData.tInternet);
            // setInternetDonGia(rentData.internetDonGia);
            // setAcreage(rentData.acreage);
            // setPeople(rentData.people)
            // setAddress(rentData.address)
        }
    }, [])

    useEffect(() => {
        getLocationAsync()
    }, []);



    const getLocationAsync = async () => {
        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        await setLongitude(location.coords.longitude)
        await setLatitude(location.coords.latitude)

    }


    useEffect(() => {
        let newData = {};
        if (address) {
            newData = { ...data, detail: [{ price: tPhong, type: phongDonGia }, { price: tDien, type: dienDonGia }, { price: tNuoc, type: nuocDonGia }, { price: tInternet, type: internetDonGia }], acreage, number_people: people, number_room: bedRoom }
        } else {
            newData = { ...data, detail: [{ price: tPhong, type: phongDonGia }, { price: tDien, type: dienDonGia }, { price: tNuoc, type: nuocDonGia }, { price: tInternet, type: internetDonGia }], acreage, number_people: people, longitude, latitude, number_room: bedRoom }
        }
        setData(newData);

    }, [tPhong, tDien, tNuoc, tInternet, dienDonGia, nuocDonGia, phongDonGia, internetDonGia, acreage, address, people, longitude, latitude]);



    const handleNextStep = () => {
        if (tDien || dienDonGia === 0 && tNuoc || nuocDonGia === 0 && tInternet || internetDonGia === 0 && tPhong && acreage) {
            navigation.push('Step3', { rentData: data, update })

        } else {
            alert('Bạn phải nhập đầy đủ.')
        }
    }
    return (
        <View style={styles.container}>
            <HeaderComponent title='Tạo Phòng' back={() => navigation.goBack()} />
            <View style={{ marginVertical: 10 }}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={1}
                    stepCount={3}
                />
            </View>
            <ScrollView style={[styles.container, { paddingHorizontal: 30 }]}>
                <View style={[styles.section, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                    <View style={{ width: "100%", marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Giá phòng: {formatCurrency(tPhong)} </Text>
                        <View style={styles.sectionContent}>
                            <Text>Giá phòng trong khoảng 100 ngàn đến 100 triệu</Text>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={100000}
                                maximumValue={100000000}
                                step={100000}
                                thumbTintColor={Colors.primaryColor}
                                onValueChange={(value) => setTPhong(`${value}`)}
                                minimumTrackTintColor={Colors.primaryColor}
                                maximumTrackTintColor={Colors.primaryColor}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 5 }}>
                                {
                                    phong.map((p) => {
                                        return <RadioFormButton
                                            label={p.label}
                                            value={p.value}
                                            onclick={(value) => setPhongDonGia(value)} active={phongDonGia === p.value}
                                        />
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ width: "100%", marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Tiền điện: {formatCurrency(tDien)}</Text>
                        <View style={styles.sectionContent}>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={0}
                                maximumValue={dienDonGia === 1 ? 5000 : 10000000}
                                step={500}
                                value={3000}
                                thumbTintColor={Colors.primaryColor}
                                onValueChange={(value) => { dienDonGia === 0 ? null : setTDien(`${value}`) }}
                                minimumTrackTintColor={Colors.primaryColor}
                                maximumTrackTintColor={Colors.primaryColor}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 5 }}>
                                {
                                    dien.map((p) => {
                                        return <RadioFormButton
                                            label={p.label}
                                            value={p.value}
                                            onclick={(value) => { setDienDonGia(value); value === 0 ? setTDien('') : null }} active={dienDonGia === p.value}
                                        />
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ width: "100%", marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Tiền nước: {formatCurrency(tNuoc)}</Text>
                        <View style={styles.sectionContent}>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={10000}
                                maximumValue={nuocDonGia === 1 ? 100000 : 500000}
                                step={10000}
                                thumbTintColor={Colors.primaryColor}
                                onValueChange={(value) => { setTNuoc(`${value}`) }}
                                minimumTrackTintColor={Colors.primaryColor}
                                maximumTrackTintColor={Colors.primaryColor}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 5 }}>
                                {
                                    nuoc.map((p) => {
                                        return <RadioFormButton
                                            label={p.label}
                                            value={p.value}
                                            onclick={(value) => { setNuocDonGia(value); value === 0 ? setTNuoc('') : null }} active={nuocDonGia === p.value}
                                        />
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ width: "100%", marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Tiền Internet: {formatCurrency(tInternet)} </Text>
                        <View style={styles.sectionContent}>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={10000}
                                maximumValue={internetDonGia === 1 ? 100000 : 500000}
                                step={10000}
                                thumbTintColor={Colors.primaryColor}
                                onValueChange={(value) => { setTInternet(`${value}`) }}
                                minimumTrackTintColor={Colors.primaryColor}
                                maximumTrackTintColor={Colors.primaryColor}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 5 }}>
                                {
                                    internet.map((p) => {
                                        return <RadioFormButton
                                            label={p.label}
                                            value={p.value}
                                            onclick={(value) => { setInternetDonGia(value); value === 0 ? setTInternet('') : null }} active={internetDonGia === p.value}
                                        />
                                    })
                                }
                            </View>
                        </View>
                    </View>

                    <View style={{ width: "100%", marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Vị trí: </Text>
                        <View style={styles.sectionContent}>
                            <Text>Nếu không nhập sẽ lấy vị trí hiện tại.</Text>
                            <TextInput style={styles.inputStyle} placeholder="Nhập vị trí" valuae={address} onChangeText={(text) => setAddress(text)} />
                        </View>
                    </View>
                    <View style={{ width: "100%", marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Số phòng ngủ: {bedRoom} </Text>
                        <View style={styles.sectionContent}>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={bedRoom}
                                maximumValue={10}
                                step={1}
                                thumbTintColor={Colors.primaryColor}
                                onValueChange={(value) => { setBedRoom(`${value}`) }}
                                minimumTrackTintColor={Colors.primaryColor}
                                maximumTrackTintColor={Colors.primaryColor}
                            />
                        </View>
                    </View>

                    <View style={{ width: "50%", marginTop: 10, paddingRight: 5, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Diện tích: {acreage}m2 </Text>
                        <Slider
                            style={{ width: "100%", height: 40 }}
                            minimumValue={15}
                            maximumValue={100}
                            step={1}
                            thumbTintColor={Colors.primaryColor}
                            onValueChange={(value) => setAcreage(`${value}`)}
                            minimumTrackTintColor={Colors.primaryColor}
                            maximumTrackTintColor={Colors.primaryColor}
                        />

                    </View>

                    <View style={{ width: "50%", marginTop: 10, paddingLeft: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Số người: {people} </Text>
                        <Slider
                            style={{ width: "100%", height: 40 }}
                            minimumValue={1}
                            maximumValue={20}
                            step={1}
                            thumbTintColor={Colors.primaryColor}
                            onValueChange={(value) => setPeople(`${value}`)}
                            minimumTrackTintColor={Colors.primaryColor}
                            maximumTrackTintColor={Colors.primaryColor}
                        />
                    </View>
                </View>
            </ScrollView>
            <PrimaryButton text={'Tiếp tục'} buttonStyle={styles.bottomStyle} buttonWidth={ScreenWidth * 2 / 3} onclick={() => handleNextStep()} />
        </View>

    )
}
export default StepTwo;


const RadioFormButton = ({ label, value, onclick, active }) => {
    const checkActive = () => {
        if (active) {
            return (
                <TouchableOpacity
                    onPress={() => onclick(value)}
                >
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ width: 15, height: 15, borderRadius: 10, borderWidth: 1, borderColor: Colors.primaryColor, marginHorizontal: 10, backgroundColor: Colors.primaryColor }}></View>
                        <Text>{label}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity
                onPress={() => onclick(value)}
            >
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <View style={{ width: 15, height: 15, borderRadius: 10, borderWidth: 1, borderColor: Colors.primaryColor, marginHorizontal: 10 }}></View>
                    <Text>{label}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        checkActive()
    )
}

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
