import { ScrollView, Text, Image, View, Button, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react";


const MyProperty = () => {
    const nav = useNavigation()
    const route = useRoute();
    const [list, setList] = useState(null)
    const { id } = route.params;

    const getMyProp = async () => {
        await fetch(`https://rentsphere.onavinfosolutions.com/api/my-properties/${id.id}`).then((res) => res.json()).then((result) => { setList(result.data); console.log(result) }).catch((err) => console.log(err))

    }

    useEffect(() => {
        getMyProp()
    }, [])

    return (
        <ScrollView >
            <View>
                <Button onPress={() => { nav.goBack() }} title="Back" />
            </View>
            {list != null ? list?.map((propty) => {
                console.log(propty)
                if (propty.message) {
                    // Handle cases where propty or propty.get_property is invalid
                    return (
                        <View key="invalid-property" style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ textAlign: 'center' }}>{propty.message}</Text>

                        </View>
                    );
                } else {
                    return (

                        <TouchableOpacity onPress={() => { nav.navigate('Property', { id: propty.id }) }} key={propty.id} style={styles.propertyView}>
                            {/* <TouchableOpacity onPress={()=>{addWishlist(user,propty.get_property.id)}} style={{position:"absolute",top:20,zIndex:20,right:10}}>
                <Image  source={require('../assets/images/heartwhite.png')}  />
                </TouchableOpacity>
                 */}
                            <Image style={{ height: 120, width: '40%' }} source={{ uri: `https://rentsphere.onavinfosolutions.com/public/uploads/propertyImages/${propty.featured_image}` }} />
                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', width: 150 }}>
                                <Text style={{ fontWeight: 'bold' }}>{propty.price}<Text style={{ fontWeight: 100 }}>/{propty.payment_type}</Text></Text>
                                <Text><Image style={{ height: 10, width: 10 }} source={require('../assets/images/location.png')} />{propty.city}</Text>
                                <Text>{propty.furnishing}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',paddingTop:20}}>
                                    <TouchableOpacity style={{ backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }} onPress={() => { nav.navigate('Update Property',{id:propty.id}) }}>

                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 5 }} onPress={() => { removeProperty(propty.id) }}>

                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>delete</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* <Text>{propty.category['category']}</Text> */}
                            </View>
                        </TouchableOpacity>
                    )
                }
            }) : <ActivityIndicator size="large" />


            }
        </ScrollView>

    )
}
export default MyProperty;

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
        position: 'relative'

    },

})