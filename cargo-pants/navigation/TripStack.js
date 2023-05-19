import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Trip from '../src/Trip';

//Theme
import {colors} from '../theme/Theme';


const Stack = createNativeStackNavigator();

export default function TripStack() {

    
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
                name='Trip' 
                component={Trip} 
                options={{
                    headerTitle: () => <Text>Trip</Text>
                }}
            />

        </Stack.Navigator>
    ) 
}