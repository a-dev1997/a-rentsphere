import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Text,Alert } from "react-native";

import SplashScreen from "./pages/SplashScreen";
import { NavigationContainer,useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/HomePage";
import BottomNav from './component/Footer';
import PropertyView from './pages/PropertyView';
import Login from './pages/LoginPage';
import Header from './component/header';
import { Provider } from 'react-redux';
import store from './reduxstore/store';
import Pusher from 'pusher-js';
import { useEffect } from 'react';
import EditProfile from './pages/EditProfile';
import PropertyForm from './pages/PropertyForm';
import Wishlist from './pages/Wishlist';
import MyProperty from './pages/MyProperty';
import UpdateProperty from './pages/UpdateProperty';
import Message from './pages/MessagePage';
import Notification from './pages/NotificationPage';
import { notification } from './component/Notification';


const App=()=>{
 useEffect(()=>{

 },[])

  return(
    
      <GestureHandlerRootView>

      <Provider store={store}>
  <NavigationContainer>
  <StackPages/>

  </NavigationContainer>
  </Provider>
  </GestureHandlerRootView>
  );
}
export default App;


  const StackPages=()=>{
    const Stack=createNativeStackNavigator();
    return(
      <Stack.Navigator screenOptions={{
       headerShown:false
      }}>
      <Stack.Screen options={{headerShown:false}}  name="splash" component={SplashScreen}/>
      <Stack.Screen name="bottomtab" component={BottomNav}/>
      <Stack.Screen options={{headerShown:true,
        headerStyle:{backgroundColor:'#1C183D'},
        headerTintColor:'white',
        headerTitleAlign:'center'
        
        }} name='Property' component={PropertyView}  />
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
        <Stack.Screen name='Edit Profile' component={EditProfile} />
        <Stack.Screen  name='PropertyAdd' component={PropertyForm} />
        <Stack.Screen name='Wishlist' component={Wishlist} />
        <Stack.Screen name='My Property' component={MyProperty}/>
        <Stack.Screen name='Update Property' component={UpdateProperty} />
        <Stack.Screen options={{headerShown:true,headerStyle:{backgroundColor:"#1C183D"},headerTintColor:'white',headerTitleAlign:'center'}} name='Notification' component={Notification} />
    </Stack.Navigator>
    )
  }