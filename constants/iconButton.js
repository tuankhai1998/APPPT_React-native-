import business from '../assets/icon/business-outline.png';
import bed from '../assets/icon/bed.png';
import amenities from '../assets/icon/amenities.png';
import browser from '../assets/icon/browser.png';

import all from '../assets/icon/male-female-outline.png';
import male from '../assets/icon/male.png';
import female from '../assets/icon/woman.png';

import conditione from '../assets/icon/air-conditioner.png';
import bathroom from '../assets/icon/bathroom.png';
import security from '../assets/icon/security-camera.png';
import time from '../assets/icon/time-outline.png';
import washingmachine from '../assets/icon/washing-machine.png';
import wifi from '../assets/icon/wifi-outline.png';

export const iconButton = {
    type: [
        {
            text: 'Chung cư',
            image: business,
            value: 1
        },
        {
            text: 'Phòng trọ',
            image: bed,
            value: 2
        },
        {
            text: 'Khánh sạn',
            image: amenities,
            value: 3
        },
        {
            text: 'Căn hộ',
            image: browser,
            value: 4
        }
    ],

    sex: [
        {
            text: 'Tất cả',
            image: all,
            value: 1
        },
        {
            text: 'Nam',
            image: male,
            value: 2
        },
        {
            text: 'Nữ',
            image: female,
            value: 3
        },
    ]
}

export const utilities = [
    {
        text: 'Điều hòa',
        image: conditione,
        value: 1,
        selected: false
    },
    {
        text: 'WC riêng',
        image: bathroom,
        value: 2,
        selected: false

    },
    {
        text: 'An ninh',
        image: security,
        value: 3,
        selected: false

    },
    {
        text: 'Giường',
        image: bed,
        value: 4,
        selected: false

    },
    {
        text: 'Tự do',
        image: time,
        value: 5,
        selected: false

    },
    {
        text: 'Máy giặt',
        image: washingmachine,
        value: 6,
        selected: false

    },
    {
        text: 'Internet',
        image: wifi,
        value: 7,
        selected: false

    },

]



