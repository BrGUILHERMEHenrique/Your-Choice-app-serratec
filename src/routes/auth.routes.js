import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from '../pages/SignUP';

const Auth = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Auth.Navigator screenOptions={{
      headerShown: false
    }}>
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  )
}

export default AuthRoutes;