import { useEffect } from "react";
import { ScrollView, Text, View,StyleSheet, TouchableOpacity } from "react-native";



const Tenent=()=>{

    const getTenent=async()=>{
        console.log('fjdk');
        await fetch('https://rentsphere.onavinfosolutions.com/api/get-tenent').then((res)=>res.json()).then((result)=>console.log(result)).catch((err)=>console.log("this is  erro"+err))
    }
useEffect(()=>{
    getTenent()
},[])
    return(

        <ScrollView>
            <TouchableOpacity onPress={getTenent} style={styles.card}>
                <Text>+ Add Tenent</Text>
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
        
        
    }
})