import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, Slider, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showAllProduct } from '../../actions/productAction';
import { searchAdvanced } from '../../actions/searchAction';
import BorderButton from '../../components/BorderButton';
import GroupUtilities from '../../components/GroupUtilities';
import HeaderComponent from '../../components/HeaderComponent';
import PrimaryButton from '../../components/PrimaryButton';
import Colors from '../../constants/Colors';
import { formatCurrency } from '../../constants/FormatCurrency';
import { iconButton, utilities } from '../../constants/iconButton';
import Text from '../../components/Text';

const screenWidth = Dimensions.get('window').width;


const SearchScreen1 = () => {
    const [type, setType] = useState(null);
    const newUtilities = [...utilities];
    const [sex, setSex] = useState(1);
    const [price, setPrice] = useState('100000');
    const [acreage, setAcreage] = useState(15);
    const [people, setPeople] = useState(1);
    const navigation = useNavigation();
    let [tienIch, setTienIch] = useState(newUtilities);

    const listDataRes = useSelector(state => state.search);
    const allData = useSelector(state => state.product)
    const dispatch = useDispatch();

    const updateState = (newState) => {
        setTienIch(convertTienIchToUtilities(newState));

    }

    const convertTienIchToUtilities = (tienIch) => {
        let utili = [];
        for (let i = 0; i < tienIch.length; i++) {
            if (tienIch[i].selected) {
                utili.push(i)
            }
        }
        return utili
    }


    const handelSearch = () => {
        let dataSearch = {
            type,
            sex,
            price,
            utilities: tienIch
        }
        if (type && sex && price && tienIch) {
            dispatch(searchAdvanced(dataSearch))
            navigation.push('SearchScreen2', { dataRes: { listDataRes } })
        } else {
            const changeScreen = async () => {
                await dispatch(showAllProduct());
                navigation.push('SearchScreen2', { dataRes: { allData } })
            }

            changeScreen()
        }
    }

    return (
        <View style={{
            flex: 1
        }}>
            <HeaderComponent title="Tìm kiếm năng cao" search={true} />
            <ScrollView >
                <View style={styles.section}>
                    <View style={{ width: "100%" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Loại phòng: </Text>
                    </View>
                    <View style={styles.sectionContent}>
                        {
                            iconButton.type.map(
                                (icon, index) => <BorderButton key={index} text={icon.text} iconName={icon.image} type={icon.value} active={type} handleActive={(type) => { setType(type) }} />)
                        }

                    </View>
                </View>
                <View style={[styles.section, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                    <View style={{ width: "100%", marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Giá phòng: {formatCurrency(price)} </Text>
                        <View style={styles.sectionContent}>
                            <Slider
                                style={{ width: "100%", height: 40 }}
                                minimumValue={100000}
                                maximumValue={100000000}
                                step={100000}
                                thumbTintColor={Colors.primaryColor}
                                onValueChange={(value) => setPrice(`${value}`)}
                                minimumTrackTintColor={Colors.primaryColor}
                                maximumTrackTintColor={Colors.primaryColor}
                            />

                        </View>
                    </View>
                    <View style={{ width: "50%", marginTop: 10, paddingRight: 5, }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Diện tích: {acreage}m2 </Text>
                        <View style={styles.sectionContent}>
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
                    </View>

                    <View style={{ width: "50%", marginTop: 10, paddingLeft: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Số người: {people} </Text>
                        <View style={styles.sectionContent}>
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

                </View>
                <View style={styles.section}>
                    <View style={{ width: "100%" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Các tiện ích: </Text>
                    </View>
                    <GroupUtilities utilities={newUtilities} updateState={(newState) => updateState(newState)} />
                </View>
                <View style={styles.section}>
                    <View style={{ width: "100%" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Giới tính: </Text>
                    </View>
                    <View style={styles.sectionContent}>
                        {
                            iconButton.sex.map(
                                (icon, index) => <BorderButton key={index} text={icon.text} iconName={icon.image} type={icon.value} active={sex} handleActive={(type) => { setSex(type) }} />)
                        }

                    </View>
                </View>
                <PrimaryButton
                    text="Tìm kiếm"
                    buttonStyle={{ height: 50, marginHorizontal: screenWidth / 6, marginBottom: 10 }}
                    buttonWidth={screenWidth * 2 / 3}
                    onclick={() => handelSearch()}
                />
            </ScrollView>
        </View >
    );
}

export default SearchScreen1;

const styles = StyleSheet.create({
    section: {
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 45
    },
    sectionContent: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    item: {
        flexBasis: "20%",
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: "center"
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5

    }
})
