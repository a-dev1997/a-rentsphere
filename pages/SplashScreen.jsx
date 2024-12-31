import { useNavigation } from "@react-navigation/native";
import { View,Image, ActivityIndicator,Text ,SafeAreaView} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../reduxstore/userdataslice";
import { useEffect } from "react";

const SplashScreen=()=>{
const nav = useNavigation();
//     setTimeout(() => {
//        
//     }, 3000);
 const dispatch =useDispatch();
    const { data, status } = useSelector((state) => state.userInfo);
    console.log(data)
    useEffect(()=>{
        dispatch(fetchUserData())
    },[])
    useEffect(()=>{
        if(status=='succeeded'){
            nav.navigate('bottomtab');
        }
    })
    return(
        <SafeAreaView style={{backgroundColor:'#1C183D',flex:1,alignItems:"center",justifyContent:"center"}}>
         <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>RentSpere</Text>
            <Image source={require('../assets/images/nativelogo.png')} />
            <ActivityIndicator size="large" color="white"/>
        </SafeAreaView>
    )
}

export default SplashScreen;