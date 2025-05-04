import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './routes/StackNavigator';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // SafeAreaProvider
import { SafeAreaView } from 'react-native'; // SafeAreaView

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#000000" />
      
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
      
    </SafeAreaProvider>
  );
}
