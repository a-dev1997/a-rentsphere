import { useNavigation } from "@react-navigation/native";
import { View,Image, ActivityIndicator,Text ,SafeAreaView} from "react-native";


const SplashScreen=()=>{
const nav = useNavigation();
    setTimeout(() => {
        nav.navigate('bottomtab');
    }, 3000);


    return(
        <SafeAreaView style={{backgroundColor:'#1C183D',flex:1,alignItems:"center",justifyContent:"center"}}>
         <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>RentSpere</Text>
            <Image source={require('../assets/images/nativelogo.png')} />
            <ActivityIndicator size="large" color="white"/>
        </SafeAreaView>
    )
}

export default SplashScreen;