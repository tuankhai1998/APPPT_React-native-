export const formatCurrency = (number) => {
    let n = number.split(',').join("");
    let n2 = n.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return n2;
}
