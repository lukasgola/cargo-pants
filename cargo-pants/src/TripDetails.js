import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import {useRoute } from '@react-navigation/native';

import { colors } from '../theme/Theme'

export default function TripDetails() {

    const route = useRoute();

    const [ selectedId, setSelectedId ] = useState(1);

    DATA = [
        {
            id: 1,
            name: 'Day 1'
        },
        {
            id: 2,
            name: 'Day 2'
        },
        {
            id: 3,
            name: 'Day 3'
        },
        {
            id: 4,
            name: 'Day 4'
        },
        {
            id: 5,
            name: 'Day 5'
        },
        {
            id: 6,
            name: 'Day 6'
        },
        {
            id: 7,
            name: 'Day 7'
        },
        {
            id: 8,
            name: 'Day 8'
        },
        {
            id: 9,
            name: 'Day 9'
        },

    ]

    const [ selectedDay, setSelectedDay ] = useState(route.params.item.days[0]);

    const Item = ({item}) => {
        return(
            <TouchableOpacity style={{
                width: 80,
                height: 40,
                backgroundColor: colors.background,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 5,
            }}
            onPress={() => [setSelectedId(item.id), setSelectedDay(route.params.item.days[item.id-1])]}
            >
                <Text style={{
                    fontSize: 16,
                    color: selectedId == item.id ? colors.text : colors.grey,
                    fontWeight: selectedId == item.id ? 'bold' : '400',
                }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const Activity = ({item}) => {
        return(
            <View style={{flexDirection: "row"}}>
                <Text>{item.startTime} -</Text>

                <Text> {item.endTime}</Text>
                <Text>   {item.name}</Text>
            </View>
        )
    }

  return (
    <View style={styles.container}>
        <Image 
            style={{
                width: '100%',
                height: 200,
            }}
            source={{uri: route.params.item.photo}} 
        />
        <View style={{
            width: '100%',
            height: 400,
            borderRadius: 30,
            marginTop: -30,
            backgroundColor: '#f3f3f2',
            padding: 10
        }}>

            <FlatList
                style={{
                    width: '100%'
                }}
                data={DATA}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={item => item.id}
            />

            <FlatList
                style={{
                    width: '100%'
                }}
                data={selectedDay.activities}
                renderItem={({item}) => <Activity item={item} />}
                keyExtractor={item => item.id}
            />


        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});