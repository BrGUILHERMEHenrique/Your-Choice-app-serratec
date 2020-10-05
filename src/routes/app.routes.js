import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Liked from '../pages/Liked';
import Choice from '../pages/Choice';
import Rejected from '../pages/Rejected';

const App = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <App.Navigator 
      initialRouteName="Your Choice"
    >
      <App.Screen 
        name="Liked" 
        component={Liked} 
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="view-dashboard" color="#000" size={30} />
          )
        }}
      />
      <App.Screen 
        name="Your Choice" 
        component={Choice} 
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="playlist-edit" color="#000" size={30} />
          )
        }}
      />
      <App.Screen 
        name="Rejected" 
        component={Rejected} 
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="view-dashboard" color="#000" size={30} />
          )
        }}
      />
    </App.Navigator>
  )
}

export default AppRoutes;