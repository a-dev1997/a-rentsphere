import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"


const AddProperty=()=>{
    let [cat,setCat]=useState();
const nav=useNavigation()

    const getCategory =async()=>{
        await fetch('https://rentsphere.onavinfosolutions.com/api/property-category').then((res)=>res.json()).then((result)=>{
         setCat(result.data)
         console.log(result)
         console.log(cat)
         
        })
    }

    useEffect(()=>{
            getCategory()
    },[])
    return(
        <ScrollView>
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <TouchableOpacity onPress={()=>{nav.goBack()}} style={{backgroundColor:'#1C183D',paddingVertical:5,paddingHorizontal:10,marginVertical:10,borderRadius:10,marginLeft:10,marginRight:20}}>
                    <Text style={{color:'white'}}>Cancel</Text>
                </TouchableOpacity>
            <Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,paddingVertical:10}}>
    What are you offering ?
</Text>
            </View>

<View style={{borderTopWidth:1,borderTopColor:'black'}}> 
<View style={{flexDirection:'row',justifyContent:'space-evenly',flexWrap:'wrap',marginTop:20}}>
        {
            cat?.map((val,index)=>{
                return(
                   
                    <TouchableOpacity key={index} onPress={()=>nav.navigate('PropertyAdd',{id:val.id,name:val.category})} style={{alignItems:'center',width:'40%',paddingVertical:20,backgroundColor:'#1C183D',marginVertical:5,borderRadius:10}}>
                        <Image style={{height:50,width:50}} source={{uri:`https://rentsphere.onavinfosolutions.com/public/uploads/images/${val.image}`}} />
                        <Text style={{color:'white',fontWeight:'bold'}}>{val.category}</Text>
                    </TouchableOpacity>
                    
             
                )
            })
        }
        </View>
     
</View>
        </ScrollView>
    )
}

export default AddProperty;