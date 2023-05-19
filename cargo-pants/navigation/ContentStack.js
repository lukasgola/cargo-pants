import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Content from '../src/Content';

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
                name='Content' 
                component={Content} 
                options={{
                    headerTitle: () => <Text>Content</Text>
                }}
            />

        </Stack.Navigator>
    ) 
}