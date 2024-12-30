import { useEffect, useState } from "react";
import { ScrollView, Text, View,StyleSheet, TouchableOpacity, Image, ViewComponent } from "react-native";
import { useSelector,useDispatch } from "react-redux";


const Tenent=()=>{
const {data,status}=useSelector((state)=>state.userInfo);
const [list ,setList]=useState(null)
    const getTenent=async()=>{
        
        await fetch('https://rentsphere.onavinfosolutions.com/api/get-tenent',{

              
                headers:{
                    'Authorization': `Bearer ${data.result.access_token}`,
                // 'Content-Type': 'application/json',
                }
           
        
    }).then((res)=>res.json()).then((result)=>setList(result.data)).catch((err)=>console.log("this is  erro"+err))
    }
useEffect(()=>{
    getTenent()
},[])
    return(

        <ScrollView>
            {
                list!=null ? list?.map((val,index)=>{
                    return(
                    <TouchableOpacity key={index} style={{backgroundColor:'#1C183D',flexDirection:'row',justifyContent:'space-between',margin:10,borderRadius:10,paddingVertical:10,paddingHorizontal:10}}>
                        <Image  source={require('../assets/images/profile.png')} /> 
                        <View>
                            <Text style={{color:'white'}}>{val.name}</Text>
                            <Text style={{color:'white'}}>{val.property_name}</Text>
                             <Text style={{color:'white'}}>{val.rent}.Rs</Text>
                             <Text style={{color:'white'}}>{val.phone ?val.phone :'not available'}</Text>
                             <Text style={{color:'white'}}>{val.address}</Text>
                             <Text style={{color:'white'}}>{val.city}</Text>
                             <Text style={{color:'white'}}>{val.state}</Text>
                        </View>
                        <View style={{justifyContent:'space-between'}}>
                            <TouchableOpacity style={{backgroundColor:'green',paddingVertical:5,paddingHorizontal:10}}>
                                <Text style={{color:'white',fontWeight:'bold'}}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'red',paddingVertical:5,paddingHorizontal:10}}>
                                <Text style={{color:'white',fontWeight:'bold'}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    )
                })
                :''
            }
            <TouchableOpacity onPress={getTenent} style={styles.card}>
                <Text style={{textAlign:'center'}}>+ Add Tenent</Text>
            </TouchableOpacity>
        </ScrollView>

    )
}

export default Tenent;


const styles=StyleSheet.create({
    card:{
        backgroundColor:'grey',
        height:150,
        margin:10,
        borderRadius:10,
        // shadowOffset: { width: 0, height: 15 },
        // shadowColor:'green',
        // shadowOpacity:0.1,
        elevation:5,
        alignItems:'center',
        justifyContent:'center'
        
    }
})