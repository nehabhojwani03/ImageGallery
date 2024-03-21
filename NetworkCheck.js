import NetInfo from "@react-native-community/netinfo";

export function isNetworkAvailable() {
    return new Promise((resolve, reject) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                resolve();
            }
            else {
                reject();
            }
        });
    })
}