export const randomID = () => {
    let i = Math.floor(Math.random() * 10);
    let x = Math.floor(Math.random() * 100);
    let z = Math.floor(Math.random() * 1000)
    return i + x + z
}
