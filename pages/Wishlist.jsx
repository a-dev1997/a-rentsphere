import { Button, ScrollView, Text ,TouchableOpacity,Image,View, ActivityIndicator,StyleSheet} from "react-native"
import { useRoute,useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react";


const Wishlist=()=>{
    const route = useRoute();
    const {id} =route.params;
    const nav = useNavigation();
    const [list,setList]=useState(null);
    let [count,setCount]=useState(1);
    const getList = async () => {
        // Assuming `id` is defined somewhere and contains an `id` property
        let user_id = id.id;
    
        // Logging for debugging purposes
        console.log(user_id)
    
        // Sending the POST request with the user_id wrapped in a JSON object
        let a = await fetch(`https://rentsphere.onavinfosolutions.com/api/get-wishlist/${user_id}`).then((res)=>res.json()).then((result)=>{setList(result.data),console.log(result)}).catch((err)=>console.log(err))
    }

    const removeProperty=async(property_id)=>{
        await fetch(`https://rentsphere.onavinfosolutions.com/api/remove-property/${property_id}/${id.id}`).then((res)=>res.json()).then((result)=>{setCount(count+1)}).catch((err)=>console.log(err))
    }

useEffect(()=>{
getList()
},[count])
    return(
        <ScrollView >
            <View>
                <Button onPress={()=>{nav.goBack()}} title="Back"/>
            </View>
           {  list!=null ?  list?.map((propty)=>{
            console.log(propty)
            if (propty.message ) {
                // Handle cases where propty or propty.get_property is invalid
                return (
                  <View key="invalid-property" style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{textAlign:'center'}}>{propty.message}</Text>
                  
                  </View>
                );
                }else{
            return(

                <TouchableOpacity onPress={() => { nav.navigate('Property', { id: propty.get_property.id }) }} key={propty.get_property.id} style={styles.propertyView}>
                {/* <TouchableOpacity onPress={()=>{addWishlist(user,propty.get_property.id)}} style={{position:"absolute",top:20,zIndex:20,right:10}}>
                <Image  source={require('../assets/images/heartwhite.png')}  />
                </TouchableOpacity>
                 */}
                <Image style={{ height: 120, width: '40%' }} source={{ uri: `https://rentsphere.onavinfosolutions.com/public/uploads/propertyImages/${propty.get_property.featured_image}` }} />
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', width: 150 }}>
                    <Text style={{ fontWeight: 'bold' }}>{propty.get_property.price}<Text style={{ fontWeight: 100 }}>/{propty.get_property.payment_type}</Text></Text>
                    <Text><Image style={{ height: 10, width: 10 }} source={require('../assets/images/location.png')} />{propty.get_property.city}</Text>
                    <Text>{propty.get_property.furnishing}</Text>
                    <TouchableOpacity style={{backgroundColor:'#1C183D',paddingVertical:10,paddingHorizontal:20,borderRadius:5}} onPress={()=>{removeProperty( propty.get_property.id)}}>

                        <Text style={{color:'white',fontWeight:'bold'}}>Remove</Text>
                    </TouchableOpacity>
                    {/* <Text>{propty.category['category']}</Text> */}
                </View>
            </TouchableOpacity>
            )}
           }) :<ActivityIndicator  size="large" />

                               
}
        </ScrollView>
    )
}

export default Wishlist;

const styles = StyleSheet.create({


    propertyView: {
        backgroundColor: 'white',
     
        overflow: 'hidden',
        shadowOffset: { width: 12, height: -14 },
        shadowColor: '#171717',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 3,
        borderRadius: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 10,
        marginHorizontal: 20,
        position:'relative'

    },

})