import {View,Text,StyleSheet,TextInput} from 'react-native';
import React from 'react';
function Input({
    label,
    outlined,
    placeholder,
    value,
    lefticon,
    righticon,
    numLines,
    onChangeHandler,
    secure,
    validate,
    errorMessage,
    errorColor='red',
    readonly,
    type,
    multiline,
}){
    return(
        <View style={{width:300}} >
            <Text style={styles.label}>{label}</Text>
        <View   style={styles.container}>
            
            
            <TextInput multiline={multiline} value={value} keyboardType={type}  readOnly={readonly} style={{width:'100%',textAlign:'left'}} errorMessage={errorMessage}  secureTextEntry={secure} placeholder={`ENTER ${label}`} onChangeText={onChangeHandler}
            onEndEditing={validate}
            />
            
        </View>
        <Text style={{color:errorColor}}> {errorMessage} </Text>
        </View>
    )
}


const styles=StyleSheet.create({
    label:{
        fontWeight:400,
    },
    container:{
        
        backgroundColor:'#F1F1F1',
      
        borderRadius:'black',
        borderRadius:4,
        alignItems:'center',
        borderColor: "#fcfdfb",
        
        borderWidth: 2,
        width:'50vw',
        shadowColor:'black',
        shadowOffset: { width: -3, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 3,  
        
    },
    outlined:{
       
    },
    placeholder:{
        color:'black'
    }
})

export default Input;