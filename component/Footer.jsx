import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Home from "../pages/HomePage";
import Profile from '../pages/ProfilePage';
import { useNavigation } from "@react-navigation/native";
import Message from "../pages/MessagePage";
import Tenent from "../pages/TenentPage";
import AddProperty from "../pages/AddProperty";
import Header from "./header";

const BottomNav = () => {
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel:false,
            tabBarLabel:false,
            tabBarStyle:{
                backgroundColor:"#1C183D",
                height:60,
              paddingTop:10
                
            }
        }}  >
                     <Tabs.Screen options={{
                        header:()=>(<Header/>),
                        headerShown:true,
                        tabBarIcon:({focused})=>{
                            return(
                                
                                <View style={{justifyContent:'center',width:'100%'}}>
                                    <Image resizeMode="contain" source={require('../assets/images/homenavicon.png')}/>
                                    <Text style={{color:'white',fontSize:8,textAlign:'center'}}>Home</Text>
                                </View>
                            )
                        }
                     }} name="Home" component={Home} />
            <Tabs.Screen  options={{
                        tabBarIcon:()=>{
                            return(
                                <View style={{justifyContent:'center',width:'100%'}}>
                                    <Image resizeMode="contain" source={require('../assets/images/tenentnavicon.png')}/>
                                    <Text style={{color:'white',fontSize:8,textAlign:'center'}}>Tenent</Text>
                                </View>
                            )
                        }
                     }}  name="Tenent" component={Tenent} />
   
            <Tabs.Screen  options={{
                headerShown:false,
                               tabBarStyle:{
                                display:'none'
                               },
                        tabBarIcon:()=>{
                            return(
                                <View style={{justifyContent:'center'}}>
                                    <Image resizeMode="contain" source={require('../assets/images/addnavicon.png')}/>
                                    <Text style={{color:'white',fontSize:8,textAlign:'center'}}>Add</Text>
                                </View>
                            )
                        }
                     }} name="Add" component={AddProperty} />
          
            <Tabs.Screen  options={{
                        tabBarIcon:()=>{
                            return(
                                <View style={{justifyContent:'center'}}>
                                    <Image resizeMode="contain" source={require('../assets/images/messagenavicon.png')}/>
                                    <Text style={{color:'white',fontSize:8,textAlign:'center'}}>Message</Text>
                                </View>
                            )
                        }
                     }} name="Message" component={Message} />
            <Tabs.Screen options={{
                headerShown:false,
                headerTitleAlign:'center',
                headerStyle:{backgroundColor:'#1C183D'},
                headerTintColor:'white',
                tabBarIcon:()=>{
                    return(
                        <View style={{justifyContent:'center'}}>
                            <Image  resizeMode="contain" source={require('../assets/images/profilenavicon.png')}/>
                            <Text style={{color:'white',fontSize:8,textAlign:'center'}}>Profile</Text>
                        </View>
                    )
                }
            }} name="Profile" component={Profile} />
        </Tabs.Navigator>

    )
}

export default BottomNav;

const TabBar = ({ state }) => {
    const nav = useNavigation()
    return (
        <View style={{ backgroundColor: '#1C183D', height: 80, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
            {state.routes.map(route,indes)}
        </View>
    )
}