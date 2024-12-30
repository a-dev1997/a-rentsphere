
import PushNotification,{Importance} from 'react-native-push-notification'

  


export  const notification = (channel_id,title,message) => {

    if (Platform.OS === 'android') {
      // Create default notification channel
      PushNotification.createChannel(
        {
          channelId: channel_id, // Unique ID for the channel
          channelName: 'Default Notifications', // Name of the channel
          channelDescription: 'A channel for default notifications', // Description of the channel
          playSound: true,
          soundName: 'default',
          importance: PushNotification.Importance.HIGH,
          vibrate: true,
        },
        (created) => console.log(`Create Default Channel returned: ${created ? 'Channel created' : 'Channel already exists'}`)
      );

      
      PushNotification.localNotification({
        channelId: channel_id, // Use the channel ID defined above
          ticker: "My Notification Ticker",
          autoCancel: true,
          largeIcon: "ic_launcher",  // You can customize the icon if needed
          smallIcon: "ic_notification", // Customize the notification icon if needed
          title: 'notification',
          message: message,
          playSound: true,
          soundName: "default",
          vibrate: true,
          vibration: 300,  // vibration duration in ms
          priority: "high", // Set notification priority
          badge: 1, // Set badge count (on app icon)
          number: 10, // 
      })
     
    }




  // return (
  //   <SafeAreaView>
  //     <Text>Hello, World!</Text>
  //     <Button title='notify' onPress={()=>{handle()}} />
  //   </SafeAreaView>
  // );
};

// export default Notification;
