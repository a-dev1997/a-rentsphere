import { ScrollView,View,Text,Button,Image,StyleSheet, TouchableOpacity ,ActivityIndicator} from "react-native"
import { useNavigation } from "@react-navigation/native";
import Input from "../component/Input";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Screen } from "react-native-screens";


const Login=()=>{
const nav=useNavigation();
const [email,setemail]=useState('');
const [password,setpassword]=useState('');
const [errmsg,seterrmsg]=useState('');
const [erremail,seterrEmail]=useState('');
const [errpassword,setErrPassword]=useState('');
const [isloading,setLoading]=useState(false);

const storeuser=async(data)=>{
    await AsyncStorage.setItem('user',data).then((res)=>{
        if(res){
            nav.navigate('drawer')
        }
    })
}

const handleEmail=(text)=>{
    setemail(text)
}

const handlePassword=(text)=>{
    setpassword(text)
}

const handleLogin=async()=>{

       setLoading(true)
    await fetch('https://rentsphere.onavinfosolutions.com/api/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            'content-Type':'application/json'
        }
    }).then((res)=>res.json()).then((result)=>{
        seterrEmail('')
        setErrPassword('')
        console.log(result)
        if(result.data){
        if(result.data.email){
            seterrEmail(result.data.email)
        }

        if(result.data.password){
            setErrPassword(result.data.password) 
        }
    }
        if(result.message =="Invalid Credentials"){
            seterrmsg(result.message)
            
        }else{
            seterrmsg('')
            
        }
        if(result.access_token){
        let a =JSON.stringify({result});
        storeuser(a);
        nav.navigate('bottomtab',{
            Screen:'Home'
        });
        console.log(result)
        }

    }).catch((err)=>console.log(err)).finally((a)=>{setLoading(false)})
}
const checkStorage=async()=>{
   await AsyncStorage.getItem('user').then((res)=>{
        if(res){
            nav.navigate('bottomtab',{
                Screen:'Home'
            })
        }
       })
}

    useEffect(()=>{
       checkStorage()
       
    },[])
//    if(isloading==true){
//            return( <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
//                    <ActivityIndicator size="large" />
//             </View>)
//    }else
//    { 
    return(
        <ScrollView>
            <View style={styles.logocontainer}>
                <Image  source={require('../assets/images/nativelogo.png')} />
            </View>
            <View style={styles.maincontainer}>
                <View >
                <Text style={{color:'red'}}>{errmsg}</Text>
                <Input errorMessage={erremail} onChangeHandler={handleEmail} label={'EMAIL'}/>
                <Input errorMessage={errpassword} onChangeHandler={handlePassword} label={'PASSWORD'}/>
                <TouchableOpacity style={styles.loginbtn} onPress={handleLogin}>
                   { isloading==true?<ActivityIndicator size={41} color="white"  />: <Text style={{textAlign:'center',color:'white',fontWeight:'bold',paddingVertical:10}}>Login</Text>}
                </TouchableOpacity>
                <View style={{flexDirection:'row',marginVertical:20,justifyContent:'center'}}>
                    <Text>Already have Account ?  </Text>
                    <TouchableOpacity onPress={()=>{
                        nav.navigate('Signup')
                    }}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{flexDirection:'row',marginVertical:20,justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>{nav.navigate('bottomtab')}}>
                    <Text style={{fontWeight:'bold',fontSize:20}}>Skip</Text>
                    </TouchableOpacity>
               
                </View>
                </View>
                
            </View>
           
        </ScrollView>
    )
}

export default Login;

const styles=StyleSheet.create({
    logocontainer:{
        backgroundColor:"#1C183D",
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    maincontainer:{
        flex:3,
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:30
    },
    loginbtn:{
        backgroundColor:"#1C183D",
        borderRadius:20
    }
})