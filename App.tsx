import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home-screen/HomeScreen';
import FavoritesScreen from './screens/favorite-screen/FavoritesScreen';
import { LeftHandedProvider } from './contexts/LeftHandedContext'; 

export type RootStackParamList = {
  Home: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <LeftHandedProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LeftHandedProvider>
  );
}

