import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StatusBar, Text } from 'react-native';


//Theme
import {colors} from '../theme/Theme';

//Icons
import { Ionicons } from '@expo/vector-icons';

//Stacks
import TripStack from './TripStack';
import MapStack from './MapStack';
import TravellersStack from './TravellersStack';
import ContentStack from './ContentStack';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {

    const Item = (props) => {
        return(
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Ionicons name={props.focused ? props.filled : props.icon} size={25} color={props.focused ? colors.primary : colors.grey} />
                <Text size={10} color={props.focused ? colors.text : colors.grey}>{props.title}</Text>
            </View>
        )
    }


    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: colors.grey_d,
                tabBarActiveTintColor: colors.primary,
                tabBarStyle:{
                    backgroundColor: colors.background,
                }
            }}
            
        >
            <Tab.Screen name='TripStack' component={TripStack} options={{
                tabBarIcon: ({focused}) => (
                    <Item focused={focused} icon='calendar-outline' filled='calendar' title='Trip' />
                )
            }}
            />
            <Tab.Screen name='MapStack' component={MapStack} options={{
                tabBarIcon: ({focused}) => (
                    <Item focused={focused} icon='navigate-outline' filled='navigate' title='Map' />
                )
            }}/>
            <Tab.Screen name='TravellersStack' component={TravellersStack} options={{
                tabBarIcon: ({focused}) => (
                    <Item focused={focused} icon='people-outline' filled='people' title='People' />
                )
            }}/>
            <Tab.Screen name='ContentStack' component={ContentStack} options={{
                tabBarIcon: ({focused}) => (
                    <Item focused={focused} icon='image-outline' filled='image' title='Content' />
                )
            }}/>
        </Tab.Navigator>
    );
}


export default BottomTabs;