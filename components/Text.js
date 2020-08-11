import React from 'react';
import { Text } from 'react-native';
const CustomText = (props) => {
    const { children, type } = props;
    const styles = [{ fontFamily: type ? type : 'Regular' }, props.style];
    const allProps = Object.assign({}, props, { style: styles })

    return (
        <Text {...allProps}> {children}</Text >
    );
}

export default CustomText;

// 'Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),
// 'Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
// 'Light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
// 'Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
// 'Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
// 'Thin': require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
// 'Rowdies-Bold': require('./assets/fonts/Rowdies-Bold.ttf'),