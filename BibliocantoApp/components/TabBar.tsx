import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../routes/StackNavigator';

type TabItem = {
  name: string;
  route: keyof RootStackParamList;
  label: string;
};

type TabBarProps = {
  currentScreen: 'Todos' | 'Lidos' | 'Relidos'; // Adicione todas as opções aqui
};

const TAB_ITEMS: TabItem[] = [
  { name: 'Todos', route: 'MyLibrary', label: 'Todos' },
  { name: 'Lidos', route: 'Lidos', label: 'Lidos' },
  { name: 'Relidos', route: 'Relidos', label: 'Relidos' },
];

const TabBar = ({ currentScreen }: TabBarProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleTabPress = (tab: TabItem) => {
    navigation.navigate(tab.route as never);
    // Não precisa mais do estado interno, pois é controlado pelo parâmetro
  };

  return (
    <View style={styles.tabBar}>
      {TAB_ITEMS.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => handleTabPress(tab)}
          style={styles.tab}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.tabText, 
            currentScreen === tab.name && styles.activeTabText
          ]}>
            {tab.label}
          </Text>
          {currentScreen === tab.name && <View style={styles.activeUnderline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
    height: 50,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },
  activeUnderline: {
    height: 3,
    backgroundColor: '#6200ee',
    width: '70%',
    marginTop: 4,
    borderRadius: 2,
  },
});

export default TabBar;