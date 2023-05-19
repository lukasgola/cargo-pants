import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Map from '../src/Map';

//Theme
import {colors} from '../theme/Theme';


const Stack = createNativeStackNavigator();

export default function MapStack() {

    
    return(
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.primary,
                headerStyle:{
                    backgroundColor: colors.background
                },
                headerShown: true
            }}
        >
            <Stack.Screen 
                name='Map' 
                component={Map} 
                options={{
                    headerTitle: () => <Text>Map</Text>
                }}
            />

        </Stack.Navigator>
    ) 
}