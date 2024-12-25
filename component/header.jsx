import { useEffect ,useState} from "react";
import { Image, View ,Text,ActivityIndicator} from "react-native";
import GetLocation from "react-native-get-location";
const Header=()=>{
    const [locatinName, setLocationName] = useState();

    const getLatLong = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                getLocation(location.latitude, location.longitude)

            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }
    const getLocation = (lat, long) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=193c7f6157929f624b350a72abbecf85`).then((res) => res.json()).then((result) => {
            // console.log(result)
            setLocationName(result.name )

        })
    }

 



    useEffect(()=>{
        getLatLong()
       
    },[])

    return(
        <View style={{backgroundColor:'#1C183D',paddingHorizontal:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Image style={{height:80,width:80,objectFit:"contain"}} source={require('../assets/images/nativelogo.png')} />
           <View style={{flexDirection:"row",alignItems:'center'}}> 
            
            <Image style={{height:30,width:30,objectFit:"contain"}} source={require('../assets/images/locationlogo.png')} /> <Text style={{color:'white'}}>{(!locatinName) ? <ActivityIndicator size="small" color="white" /> : locatinName}</Text>  </View> 
        </View>
    )
}

export default Header;