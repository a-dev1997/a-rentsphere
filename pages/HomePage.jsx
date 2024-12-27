import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet,ActivityIndicator ,Alert} from "react-native";

import Header from "../component/header";
import { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../reduxstore/userdataslice";
import { checkconnectivity } from "../component/checkConnectivity";

import Pusher from "pusher-js";
import { notification } from "../component/Notification";
const Home = () => {
    const nav = useNavigation();
    const [user, setUser] = useState('');
    let [count, setCount] = useState(1);
    const [list, setList] = useState(null);
    const dispatch = useDispatch();
    // Initialize wishlist state
    // const [isInWishlist, setisInWishlist] = useState();
    const [wishlistLoading,setWishlistLoading]=useState(false)
    // const [heard, setHeart] = useState();
    const { data, status } = useSelector((state) => state.userInfo);
    // let [name,setName]=useState();
    let [cat, setCat] = useState();
    const [propery, setPropery] = useState();
    const getProperty = () => {
        fetch('https://rentsphere.onavinfosolutions.com/api/properties').then((res) => res.json()).then((result) => {
            setPropery(result)


        }).catch((err) => console.log(err))
    }
    const getCategory = async () => {
        await fetch('https://rentsphere.onavinfosolutions.com/api/property-category').then((res) => res.json()).then((result) => {
            setCat(result.data)
            //  console.log(result)
            //  console.log(cat)
        })
    }

    const addWishlist = async (id, prop) => {

        await fetch('https://rentsphere.onavinfosolutions.com/api/post-wishlist', {
            method: 'POST',
            body: JSON.stringify({ user_id: id, property_id: prop }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((resutl) => { setCount(count + 1) }).catch((err) => { console.log(err) })
    }
    // Check if property is in wishlist
    const isPropertyInWishlist = (propertyId) => {
        if (list != null) {
            return list.some(item => item.property_id == propertyId);
        }

    };
    const getList = async (user1) => {
        // Assuming `id` is defined somewhere and contains an `id` property
        let user_id = user1;

        // Logging for debugging purposes
        // console.log(user_id)

        // Sending the POST request with the user_id wrapped in a JSON object
        let a = await fetch(`https://rentsphere.onavinfosolutions.com/api/get-wishlist/${user_id}`).then((res) => res.json()).then((result) => { setList(result.data); }).catch((err) => console.log(err))
    }
    const removeProperty = async (property_id, user_id) => {
        await fetch(`https://rentsphere.onavinfosolutions.com/api/remove-property/${property_id}/${user_id}`).then((res) => res.json()).then((result) => { setCount(count + 1) }).catch((err) => console.log(err))
    }

    // console.log(wishlistMatch());
    useFocusEffect(
        useCallback(() => {
            getProperty()
            getCategory()
            dispatch(fetchUserData());

        }, [count]) // Callback ensures this runs only on focus
    );

    useEffect(() => {
        if (status === "succeeded" && data?.result?.data) {

            // console.log(data.result.data.id)
            setUser(data.result.data.id);
            //  console.log(user)
            // Update user state when data is successfully fetched
            getList(user)
            console.log(list)
        }

        //    console.log(checkconnectivity());
    }, [data, user])

    useEffect(()=>{
        var pusher = new Pusher('8f73656210544fae641f', {
            cluster: 'ap2'
          });
      
          var channel = pusher.subscribe('chat');
          channel.bind('BroadcastMessages', function(data) {
           
        //    Alert.alert(JSON.stringify(data))
           notification(`channel_${data}`,data,data)
          
           
            
          });
    },[])


    return (

        <ScrollView>


            <View style={{ backgroundColor: '#c4c4c4', paddingVertical: 5, }}>
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>
                    <TouchableOpacity style={{ backgroundColor: 'white', marginHorizontal: 10, marginVertical: 10, borderColor: 'black', borderWidth: 1, borderRadius: 5, paddingHorizontal: 2, paddingVertical: 5, width: '85%', flexDirection: "row", alignItems: 'center' }}>

                        <Image source={require('../assets/images/Magnifyingglass.png')} />
                        <Text style={{ color: '#c4c4c4', marginLeft: 5 }}>Find Rooms ,Appartments, PGs,Offices etc...</Text>

                    </TouchableOpacity > 
                    <TouchableOpacity onPress={()=>{nav.navigate('Notification')}}>
                    <Image style={{ height: 20, width: 20 }} source={require('../assets/images/notification.png')} />
                    </TouchableOpacity>
                   
                </View>

                <View style={{ backgroundColor: 'white', marginVertical: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5, paddingVertical: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Categories</Text>
                        <TouchableOpacity>
                            <Text>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} style={{ padding: 10 }}>

                        {
                            cat?.map((val, index) => {

                                return (
                                    <View key={index} style={{ alignItems: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 5 }}>
                                        <Image style={{ height: 50, width: 50, objectFit: "contain" }} source={{ uri: `https://rentsphere.onavinfosolutions.com/public/uploads/images/${val.image}` }} />
                                        <Text style={{ fontWeight: 'bold' }}>{val.category}</Text>
                                    </View>
                                )
                            })
                        }


                        {/* 
                            <View style={{ alignItems: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 5 }}>
                                <Image style={{ height: 50, width: 50, objectFit: "contain" }} source={require('../assets/images/room.png')} />
                                <Text style={{ fontWeight: 'bold' }}>Rooms</Text>
                            </View>
                            <View style={{ alignItems: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 5 }}>
                                <Image style={{ height: 50, width: 50, objectFit: "contain" }} source={require('../assets/images/office.png')} />
                                <Text style={{ fontWeight: 'bold' }}>Office</Text>
                            </View>
                            <View style={{ alignItems: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 5 }}>
                                <Image style={{ height: 50, width: 50, objectFit: "contain" }} source={require('../assets/images/shop.png')} />
                                <Text style={{ fontWeight: 'bold' }}>Shop</Text>
                            </View>
                            <View style={{ alignItems: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, marginHorizontal: 5 }}>
                                <Image style={{ height: 50, width: 50, objectFit: "contain" }} source={require('../assets/images/apartment.png')} />
                                <Text style={{ fontWeight: 'bold' }}>Appartment/PG</Text>
                            </View> */}
                    </ScrollView>

                </View>

            </View>
            <View style={{ paddingHorizontal: 5 }}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Property Near You</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {propery?.data?.map((propty) => {
                        // console.log(propty)
                        const isInWishlist = isPropertyInWishlist(propty.id);
                        const handleWishlistToggle = (propertyId) => {
                            setWishlistLoading(prevState => ({ ...prevState, [propertyId]: true }));

                            if (isInWishlist) {
                                removeProperty(propertyId, user).finally(() => {
                                    setWishlistLoading(prevState => ({ ...prevState, [propertyId]: false }));
                                });
                            } else {
                                addWishlist(user, propertyId).finally(() => {
                                    setWishlistLoading(prevState => ({ ...prevState, [propertyId]: false }));
                                });
                            }
                        };

                        return (
                            <TouchableOpacity onPress={() => { nav.navigate('Property', { id: propty.id }) }} key={propty.id} style={styles.propertyView}>


                                <TouchableOpacity
                                    key={propty.id}
                                    onPress={() => handleWishlistToggle(propty.id)}
                                    style={{ position: "absolute", top: 18, right: 10, zIndex: 20 }}
                                >
                                    {wishlistLoading[propty.id] ? (
                                        <ActivityIndicator />
                                    ) : (
                                        <Image
                                            source={isInWishlist ? require('../assets/images/heartred.png') : require('../assets/images/heartwhite.png')}
                                            style={{ width: 25, height: 25 }}
                                        />
                                    )}
                                </TouchableOpacity>


                                <Image style={{ height: 120, width: '90%' }} source={{ uri: `https://rentsphere.onavinfosolutions.com/public/uploads/propertyImages/${propty.featured_image}` }} />
                                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', width: 150 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{propty.price}<Text style={{ fontWeight: 100 }}>/{propty.payment_type}</Text></Text>
                                    <Text><Image style={{ height: 10, width: 10 }} source={require('../assets/images/location.png')} />{propty.city}</Text>
                                    <Text>{propty.furnishing}</Text>
                                    {/* <Text>{propty.category['category']}</Text> */}
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            {/* <TouchableOpacity  style={{position:'sticky',right:0,zIndex:10,backgroundColor:'red',width:50}}>
                <Text>Login</Text>
            </TouchableOpacity> */}
        </ScrollView>
    )
}

export default Home;

const styles = StyleSheet.create({


    propertyView: {
        backgroundColor: 'white',
        width: "48%",
        overflow: 'hidden',
        shadowOffset: { width: 4, height: -4 },
        shadowColor: '#171717',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 3,
        borderRadius: 2,
        paddingVertical: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-center',
        marginVertical: 5,
        marginHorizontal: 1,
        position: 'relative'

    },

})