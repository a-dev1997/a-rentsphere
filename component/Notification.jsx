import { Channel } from 'pusher-js';
import React, { useState, useEffect } from 'react';
import { View, Text, Button,SafeAreaView,  } from 'react-native';
import PushNotification,{Importance} from 'react-native-push-notification'
// Must be outside of any component LifeCycle (such as `componentDidMount`).
// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log("TOKEN:", token);
//   },

  
// });
PushNotification.createChannel(
  {
    channelId: "1dfdfdf", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
const Notification = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Create default notification channel
      PushNotification.createChannel(
        {
          channelId: 'default-channel', // Unique ID for the channel
          channelName: 'Default Notifications', // Name of the channel
          channelDescription: 'A channel for default notifications', // Description of the channel
          playSound: true,
          soundName: 'default',
          importance: PushNotification.Importance.HIGH,
          vibrate: true,
        },
        (created) => console.log(`Create Default Channel returned: ${created ? 'Channel created' : 'Channel already exists'}`)
      );

      // Create an urgent notification channel
      PushNotification.createChannel(
        {
          channelId: 'urgent-channel', // Unique ID for urgent notifications
          channelName: 'Urgent Notifications', // Name of the channel
          channelDescription: 'A channel for urgent notifications', // Description of the channel
          playSound: true,
          soundName: 'default',
          importance: PushNotification.Importance.HIGH, // Urgent notifications should have high importance
          vibrate: true,
        },
        (created) => console.log(`Create Urgent Channel returned: ${created ? 'Channel created' : 'Channel already exists'}`)
      );

      // Create a low priority notification channel
      PushNotification.createChannel(
        {
          channelId: 'low-priority-channel', // Unique ID for low priority notifications
          channelName: 'Low Priority Notifications', // Name of the channel
          channelDescription: 'A channel for low-priority notifications', // Description of the channel
          playSound: false, // No sound for low-priority notifications
          soundName: 'default',
          importance: PushNotification.Importance.LOW, // Low priority
          vibrate: false, // No vibration
        },
        (created) => console.log(`Create Low Priority Channel returned: ${created ? 'Channel created' : 'Channel already exists'}`)
      );
    }
  }, []);
const handle=()=>{
  PushNotification.localNotification({
    channelId: '1dfdfdf',  // Use the 'default-channel' we created earlier
    title: 'Hello World!',         // Notification title
    message: 'This is a test notification triggered by the button click!', // Notification message
    playSound: true,
    soundName: 'default',
    vibrate: true,
  })
  PushNotification.cancelAllLocalNotifications()
}
  return (
    <SafeAreaView>
      <Text>Hello, World!</Text>
      <Button title='notify' onPress={()=>{handle()}} />
    </SafeAreaView>
  );
};

export default Notification;
