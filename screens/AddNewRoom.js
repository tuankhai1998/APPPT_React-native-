import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import StepOne from './StepScreen/StepOne';
import StepThree from './StepScreen/StepThree';
import StepTwo from './StepScreen/StepTwo';



const screenWidth = Dimensions.get('window').width;

const AddRoom = createStackNavigator();





const AddNewRoom = () => {
    return (
        <View style={styles.container}>
            <AddRoom.Navigator>
                <AddRoom.Screen name='Step1' component={StepOne} />
                <AddRoom.Screen name='Step2' component={StepTwo} />
                <AddRoom.Screen name='Step3' component={StepThree} />
            </AddRoom.Navigator>

        </View>
    );
}




export default AddNewRoom;

const itemSize = (screenWidth - 60) * 3 / 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    bottomStyle: {
        marginHorizontal: screenWidth / 6,
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
