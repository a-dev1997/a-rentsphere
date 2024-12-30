import { useEffect, useState, useCallback } from "react";
import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../reduxstore/userdataslice";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Profile = () => {
  const nav = useNavigation();
  const [user, setUser] = useState(null); // Initial user state
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.userInfo);

  // Check user authentication
  const checkAuth = async () => {
    const res = await AsyncStorage.getItem("user");
    if (!res) {
      nav.navigate("Login");
    }
  };
 const getUserData=async()=>{
  await fetch(`https://rentsphere.onavinfosolutions.com/api/profile-data`,{
    method:'GET',
    headers:{
        'Authorization': `Bearer ${data.result.access_token}`,
    'Content-Type': 'application/json',
    }
}).then((res)=>res.json()).then((result)=>{setUser(result.data)})
 }
  const check=async()=>{
    await AsyncStorage.getItem('user').then((res)=>console.log(res))
  }
  // Logout function
  const logout = async () => {
    await AsyncStorage.removeItem("user").then(() => {
      nav.navigate("Login");
    });
  };

  // Format date function
  const dataFormat = (date) => {
    if (!date) return "";
    const a = new Date(date);
    const options = { year: "numeric", month: "long" };
    return a.toLocaleDateString("en-US", options);
  };

  useFocusEffect(
    useCallback(() => {
      
      checkAuth(); // Check if user is authenticated
      dispatch(fetchUserData()); // Fetch user data
    }, []) // Callback ensures this runs only on focus
  );

  useEffect(() => {
    if (status === "succeeded" && data?.result?.data) {
      getUserData(data.result.data.id)
      
      
      // setUser(data.result.data); // Update user state when data is successfully fetched
    }
  }, [status, data]); // Re-run effect when `status` or `data` changes

  return (
    <ScrollView>
      <View style={{ alignItems: "center", height: 200, padding: 15 }}>
        <Image
          style={{ height: 100, width: 100, borderRadius: 50 }}
          source={
            user?.profile_img
              ? { uri: `https://rentsphere.onavinfosolutions.com/public/${user.profile_img}` }
              : require("../assets/images/Profilepic.png")
          }
        />
        <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 10 }}>
          {user?.name || ""}
        </Text>
        <Text>Member since: {user ? dataFormat(user.created_at) : ""}</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#1C183D",
          marginHorizontal: 30,
          marginVertical: 30,
        }}
        onPress={() => {
          nav.navigate("Edit Profile", { data: user,token:data.result.access_token });
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            paddingVertical: 10,
          }}
        >
          View and Edit Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderTopColor: "grey",
          backgroundColor: "white",
          borderTopWidth: 1,
          paddingHorizontal: 10,
          height: 80,
          marginTop: 40,
          marginHorizontal: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={()=>{nav.navigate('Wishlist',{id:data.result.access_token})}}
      >
        <Image source={require("../assets/images/heartblack.png")} />
        <Text>My Favourite</Text>
        <Image source={require("../assets/images/arrow.png")} />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>{nav.navigate('My Property',{id:data.result.access_token})}}
        style={{
          borderTopColor: "grey",
          backgroundColor: "white",
          borderTopWidth: 1,
          paddingHorizontal: 10,
          height: 80,
         
          marginHorizontal: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image source={require("../assets/images/mypropertyicon.png")} />
        <Text>My Properties</Text>
        <Image source={require("../assets/images/arrow.png")} />
      </TouchableOpacity>
      <View
        style={{
          borderTopColor: "grey",
          backgroundColor: "white",
          borderTopWidth: 1,
          paddingHorizontal: 10,
          height: 80,
         
          marginHorizontal: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image source={require("../assets/images/serviceicon.png")} />
        <Text>Services we offer</Text>
        <Image source={require("../assets/images/arrow.png")} />
      </View>
      <View
        style={{
          borderTopColor: "grey",
          backgroundColor: "white",
          borderTopWidth: 1,
          paddingHorizontal: 10,
          height: 80,
          marginHorizontal: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image source={require("../assets/images/settingicon.png")} />
        <Text>Setting and Privacy Policies</Text>
        <Image source={require("../assets/images/arrow.png")} />
      </View>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
        style={{
          borderTopColor: "grey",
          backgroundColor: "white",
          borderTopWidth: 1,
          height: 80,
          paddingHorizontal: 10,
          marginHorizontal: 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image source={require("../assets/images/logouticon.png")} />
        <Text>Logout</Text>
        <Image source={require("../assets/images/arrow.png")} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
