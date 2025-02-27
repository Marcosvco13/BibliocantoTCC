import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import BookScreen from '../screens/BookScreen';

export type DrawerParamList = {
  Home: undefined;
  Book: { idLivro: number };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Drawer.Screen name="Book" component={BookScreen} options={{ title: 'Livro' }} />
    </Drawer.Navigator>
  );
}
