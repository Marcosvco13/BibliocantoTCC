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
  currentScreen: 'Book' | 'Resenha'; // Adicione todas as opções aqui
  idLivro: number;
};

const TAB_ITEMS: TabItem[] = [
  { name: 'Book', route: 'Book', label: 'Visão geral' },
  { name: 'Resenha', route: 'Resenha', label: 'Resenhas' }
];

const TabBarLivro = ({ currentScreen, idLivro }: TabBarProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleTabPress = (tab: TabItem) => {
    navigation.navigate(tab.route, {idLivro} as never);
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
    backgroundColor: '#F8F9FA',
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
    backgroundColor: '#47211c',
    width: '50%',
    marginTop: 4,
    borderRadius: 2,
  },
});

export default TabBarLivro;