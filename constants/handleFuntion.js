export const checkDonGia = (value, type) => {
    switch (value) {
        case 1: return 'VNĐ/tháng';
        case 2: {
            if (type === 1) {
                return 'VNĐ/ngày'
            }
            return 'VNĐ/số '
        };
        default: return 'miễn phí';
    }
}

export const checkType = (value) => {

    switch (value) {
        case 2: return 'Phòng trọ';
        case 3: return 'Căn hộ';
        case 4: return 'Khánh sạn';
        default: return 'Chung cư';
    }
}
