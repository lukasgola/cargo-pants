//import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { StatusBar, View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import BottomTabs from './navigation/BottomTabs';

import Ideas from './src/Ideas';

export default function App() {

    const Indicator = () => {
      <View styles={{flex:1}}>
        <ActivityIndicator />
      </View>
    }

    return (
        <NavigationContainer> 
          <StatusBar
              backgroundColor="#fff"
              barStyle="dark-content" // Here is where you change the font-color
          />

          <BottomTabs/>
          

        </NavigationContainer>
    );
}