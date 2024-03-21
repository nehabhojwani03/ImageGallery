import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    ActivityIndicator,
    FlatList
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageItem from '../components/ImageItem.js';
import {isNetworkAvailable} from '../NetworkCheck.js';

const HomeScreen = () => {

    const route = useRoute();
    const selectedAnimation = route && route.params && route.params.animationType;
    const [imageURLArray, setImageURLArray] = useState([]);
    const [prevImageURLArray, setPrevImageURLArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const mapData = (response) => {
        return response.map(({ id, url_s, height_s, width_s }) => ({
            id: id,
            url: url_s,
            height: height_s,
            width: width_s,
           
        }))
    }

    const getCachedImages = () => {
        AsyncStorage.getItem("imgArray").then(apiResponse => {
            if (apiResponse === null) {
                fetchApiData();
            } else {
                let jsonData = JSON.parse(apiResponse);

                setImageURLArray(mapData(jsonData.data.photos.photo));

            }
        }).catch((err) => {
            console.log("getCachedImages" + err)

        });
    }

    useEffect(() => {
        isNetworkAvailable()
            .then(() => {
                console.log('internet is connected');
                removeCachedData();
                fetchApiData();
            })
            .catch(() => {
                console.log('internet is not connected');
                getCachedImages();
            })
        const fetchDataInterval = setInterval(() => {
            fetchApiData();
        }, 20000);

        return () => clearInterval(fetchDataInterval);

    }, []);

    const removeCachedData = () => {
        AsyncStorage.removeItem("imgArray").then(response => {
            console.log("Data is Removed");
        }).catch(err => {
            console.log("Delete Error " + err);
        });

    }

    const fetchApiData = () => {
        setIsLoading(true)
        axios({
            method: 'get',
            url: 'https://api.flickr.com/services/rest/',
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8' },
            params: {
                method: 'flickr.photos.getRecent',
                per_page: '20',
                page: '1',
                api_key: '6f102c62f41998d151e5a1b48713cf13',
                format: 'json',
                nojsoncallback: '1',
                extras: 'url_s'
            },

        }).then((apiResponse) => {
            setIsLoading(false);
            if (JSON.stringify(apiResponse.data.photos.photo) !== JSON.stringify(prevImageURLArray)) {
                storeCacheData(JSON.stringify(apiResponse));
                setImageURLArray(mapData(apiResponse.data.photos.photo));
                setPrevImageURLArray(mapData(apiResponse.data.photos.photo));
            }

        }).catch((err) => {
            console.log("Api Data",err);
            setIsLoading(false);
        });
    };

    const storeCacheData = (response) => {
        AsyncStorage.setItem('imgArray', response).then(() => {
            console.log("Array Saved")

        }).catch(error => {
            console.log("Data Was Not Stored: " + error)
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.mainView}>
                {isLoading ? (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator color={'black'} size={'large'} />
                    </View>
                ) : (
                    <FlatList
                        data={imageURLArray}
                        numColumns={2}
                        animationType={selectedAnimation}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => ImageItem(item)}
                        LoadingView={
                            <View style={styles.activityIndicator}>
                                <ActivityIndicator color={'black'} size={'large'} />
                            </View>
                        }
                    />

                )}
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles= StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: 'gray',
    },
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    activityIndicator: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 0,
        alignSelf: 'stretch',
    },
})