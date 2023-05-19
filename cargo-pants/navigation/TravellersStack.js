import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Travellers from '../src/Travellers';

//Theme
import {colors} from '../theme/Theme';


const Stack = createNativeStackNavigator();

export default function TravellersStack() {

    
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
                name='Travellers' 
                component={Travellers} 
                options={{
                    headerTitle: () => <Text>Travellers</Text>
                }}
            />

        </Stack.Navigator>
    ) 
}