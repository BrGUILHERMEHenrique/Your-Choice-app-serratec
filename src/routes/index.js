  
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { data } = useAuth();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Root" component={!data ?  AuthRoutes : AppRoutes } />
    </Stack.Navigator>
  )
}

export default RootNavigator;