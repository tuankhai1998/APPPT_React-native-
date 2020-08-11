import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import { ScrollView } from 'react-native-gesture-handler';
import Text from '../../components/Text';
import { iconButton, utilities } from '../../constants/iconButton';
import PrimaryButton from '../../components/PrimaryButton';
import GroupUtilities from '../../components/GroupUtilities';
import { customStyles } from '../../constants/CustomStepStyle';
import IconButton from '../../components/IconButton';
import { ScreenWidth } from '../../constants/Layout';
import StepIndicator from 'react-native-step-indicator'
import Colors from '../../constants/Colors';
import BorderButton from '../../components/BorderButton';

const newUti = [...utilities]

const StepOne = () => {
    const navigation = useNavigation();
    const router = useRoute();
    const { userID, productData, update } = router.params;

    const [type, setType] = useState(1);
    const [sex, setSex] = useState(1);
    const [tienIch, setTienIch] = useState(newUti)
    const [data, setData] = useState({});

    useEffect(() => {
        if (update && productData) {
            setType(productData.type);
            setSex(productData.sex);
            let gadget = convertGadgetToTienIch([...JSON.parse(productData.gadget)])
            setTienIch(gadget)
        }

    }, []);


    useEffect(() => {
        let newData = {};
        if (update) {
            newData = { ...productData, sex, type, gadget: convertTienIchToUtilities(tienIch) }
            console.log(newData)
            setData(newData);
        } else {
            newData = { ...data, sex, type, gadget: convertTienIchToUtilities(tienIch), user_id: userID }
            setData(newData);
        }
    }, [type, sex, tienIch]);

    const convertTienIchToUtilities = (tienIch) => {
        let utili = [];
        for (let i = 0; i < tienIch.length; i++) {
            if (tienIch[i].selected) {
                utili.push(i)
            }
        }
        return utili
    }

    const convertGadgetToTienIch = (gadget) => {
        let newTienIch = [...newUti];
        for (let i = 0; i < gadget.length; i++) {
            newTienIch[gadget[i]] = {
                ...newTienIch[gadget[i]],
                selected: true
            }
        }
        return newTienIch
    }


    const handleChangeStep = () => {
        navigation.push('Step2', { rentData: data, update });

    }


    const updateState = (newState) => {
        setTienIch(newState);
    }

    return (
        <View style={styles.container}>
            <HeaderComponent title='Tạo Phòng' back={() => navigation.goBack()} />
            <View style={{ marginVertical: 10 }}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={0}
                    stepCount={3}
                />
            </View>
            <ScrollView style={[styles.container, { paddingHorizontal: 30 }]}>
                <View style={styles.section}>
                    <View style={{ width: "100%" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Loại phòng: </Text>
                    </View>
                    <View style={styles.sectionContent}>
                        {
                            iconButton.type.map(
                                (icon, index) => <BorderButton
                                    key={index} text={icon.text}
                                    iconName={icon.image}
                                    type={icon.value}
                                    active={type}
                                    handleActive={(type) => { setType(type) }}
                                />
                            )
                        }

                    </View>
                </View>
                <View style={styles.section}>
                    <View style={{ width: "100%" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Giới tính: </Text>
                    </View>
                    <View style={styles.sectionContent}>
                        {
                            iconButton.sex.map(
                                (icon, index) => <BorderButton
                                    key={index}
                                    text={icon.text}
                                    iconName={icon.image}
                                    type={icon.value}
                                    active={sex}
                                    handleActive={(type) => { setSex(type) }}
                                />)
                        }

                    </View>
                </View>

                <View style={styles.section}>
                    <View style={{ width: "100%" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.primaryColor }}>Các tiện ích: </Text>
                    </View>
                    <GroupUtilities utilities={tienIch} updateState={(newState) => updateState(newState)} />
                </View>

            </ScrollView>
            <PrimaryButton text={'Tiếp tục '} buttonStyle={styles.bottomStyle} buttonWidth={ScreenWidth * 2 / 3} onclick={() => handleChangeStep()} />

        </View>

    )
}

export default StepOne;

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
