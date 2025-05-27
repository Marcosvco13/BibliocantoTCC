import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './routes/StackNavigator';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#808080" />
      
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
      
    </SafeAreaProvider>
  );
}
