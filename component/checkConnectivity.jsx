import { useNetInfo,fetch } from "@react-native-community/netinfo"

export const checkconnectivity=async()=>{

let b = await fetch().then(state => {

 state.isConnected
});
return b;
}