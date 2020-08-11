export const createImageData = (result) => {
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    return { uri: Platform.OS === "android" ? localUri : localUri.replace("file://", ""), name: filename, type };


  

}