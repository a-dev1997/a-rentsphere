import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native"

import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
    const nav = useNavigation();
    const route = useRoute();
    let [user, setUser] = useState();
    let [name, setname] = useState()

    let [phone, setPhone] = useState();
    let [address, setAddress] = useState();
    let [city, setCity] = useState();
    const [selectedOption, setSelectedOption] = useState();
    let [state, setState] = useState();
    const { data } = route.params;
    const [file, setFile] = useState(null);
    const [isloading,setLoading]=useState(false)

    

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images], // You can specify file types like .pdf, .docx, etc.
            });
            setFile(res);
            console.log('Picked document:', res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Unknown error: ', err);
            }
        }
    };

    const uploadHandle = async () => {
            setLoading(true)
        if (file!=null) {
            const formImg = new FormData();
            formImg.append('profile_image', file[0]);
            formImg.append('email', user.email)
         await fetch('https://rentsphere.onavinfosolutions.com/api/profile-pic-update', {
                method: 'post',
                body: formImg,
            }).then((res) => res.json()).then((result) => console.log(result)).finally((final) =>{})

            const formData = new FormData();


            formData.append('name', name);
            // formData.append('email',email);
            formData.append('gender', selectedOption)
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('city', city);
            formData.append('state', state)
            formData.append('email', user.email)
    
           await fetch('https://rentsphere.onavinfosolutions.com/api/update-profile', {
                method: 'post',
                body: formData,
            }).then((res) => res.json()).then((result) => console.log(result)).finally((final) => {
               nav.goBack()
            })
        }else{

            const formData = new FormData();


            formData.append('name', name);
            // formData.append('email',email);
            formData.append('gender', selectedOption)
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('city', city);
            formData.append('state', state)
            formData.append('email', user.email)
    
           await fetch('https://rentsphere.onavinfosolutions.com/api/update-profile', {
                method: 'post',
                body: formData,
            }).then((res) => res.json()).then((result) => console.log(result)).finally((final) => {
               nav.goBack()
            })
        }

      
    
       
        

   
    }

useEffect(() => {
    setUser(data)
    setname(data.name)

    setPhone(data.phone)
   
    setAddress(data.address)
    setSelectedOption(data.gender)
    setCity(data.city)
    setState(data.state)
    console.log(data)
    
}, [user])
return (
    <ScrollView style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { pickDocument() }}>
                {
                    file == null ? <Image style={{ height: 100, width: 100, borderRadius: 50 }} source={user ? { uri: `https://rentsphere.onavinfosolutions.com/public/${user.profile_img}` } : ''} /> : <Image style={{ height: 100, width: 100, borderRadius: 50 }} source={{ uri: file[0].uri }} />
                }


            </TouchableOpacity>
            {/* <Text>
                    {user?user.name:''}
                </Text> */}
            <TextInput onChangeText={(text) => { setname(text) }} style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: '70%' }} value={user ? name : ''} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 }}>
            <View style={styles.container}>

                <Picker
                    selectedValue={selectedOption}
                        onValueChange={(itemValue) => setSelectedOption(itemValue)}
                        style={styles.picker}
                >
                    <Picker.Item label="Male" value="M" />
                    <Picker.Item label="Female" value="F" />

                </Picker>

            </View>

            {/* <Text>
                    {user?user.name:''}
                </Text> */}
            <TextInput keyboardType="numeric" onChangeText={(text) => { setPhone(text) }} style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: '40%' }} value={user ? phone : ''} placeholder="enter phone no." />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 }}>
            <TextInput onChangeText={(text) => { setCity(text) }} style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: '40%' }} value={user ? city : ''} placeholder="ender city" />
            {/* <Text>
                    {user?user.name:''}
                </Text> */}
            <TextInput onChangeText={(text) => { setAddress(text) }} style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: '40%' }} value={user ? address : ''} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 }}>
            {/* <Text>
                    {user?user.name:''}
                </Text> */}
            <TextInput onChangeText={(text) => { setState(text) }} style={{ borderBottomColor: 'black', borderBottomWidth: 2, width: '40%' }} value={user ? state : ''} />
        </View>
        <TouchableOpacity onPress={uploadHandle} style={{ backgroundColor: '#1C183D', paddingVertical: 10, borderRadius: 10, marginVertical: 20 }}>
        {
            isloading==false? <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Update</Text>:<ActivityIndicator size={20} color="white" />
        }   
        </TouchableOpacity>
    </ScrollView>
)


}

export default EditProfile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    picker: {
        width: 200,
        height: 50,
    },

});