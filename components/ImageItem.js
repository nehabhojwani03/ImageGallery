import { Image, StyleSheet, View} from 'react-native'
import React from 'react'

const ImageItem = (item) => {
  
    
    return (
        <View style={styles.container} key={item.id}>
            <View style={styles.imageContainer}>
                <Image
                    onError={() => { }}
                    style={styles.img}
                    source={{
                        uri: item.url,
                    }}
                    resizeMode={'cover'}
                />
            </View>
        </View>
    )
}

export default ImageItem

const styles = StyleSheet.create({
    container:{
        width: '47%',
        height: 100,
        backgroundColor: 'gray',
        margin: 4,
        marginHorizontal: 5,
        borderRadius: 18,
    },
    img: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 18,
    },
    
})