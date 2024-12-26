import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';


const Notification = () => {
  const [notification, setNotification] = useState(null);

 

  
  return (
    <View>
      <Text>Local Notification Example</Text>
      <Button title="Show Notification"  />
      
      {/* Display notification if available */}
      {notification && <Text>Notification: {notification.message}</Text>}
    </View>
  );
};

export default Notification;
