import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import {useRoute } from '@react-navigation/native';

import { colors } from '../theme/Theme'

//Icons
import { Ionicons } from '@expo/vector-icons';

export default function TripDetails() {

    const route = useRoute();
    const [loading, setLoading] = useState(false);
  
    const [result, setResult] = useState('');

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

    const [ selectedPlace, setSelectedPlace ] = useState(route.params.item.days[0].activities[0].name);
    const API_URL = 'http://localhost:3000/api';

  const onSubmit = async () => {
    //console.log(selectedPlace)
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    try {
      const response = await fetch(`${API_URL}/generate-travel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({selectedPlace}),
      });
      const data = await response.json();
      Alert.alert("Ideas: ", data.result);
      setResult(data.result);
      console.log(data.result)
      
    } catch (e) {
      Alert.alert("Couldn't generate ideas", e.message);
    } finally {
      setLoading(false);
    }
  };

    const Item = ({item}) => {
        return(
            <TouchableOpacity style={{
                width: 80,
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 5,
                backgroundColor: selectedId == item.id ? colors.primary : colors.background,
            }}
            onPress={() => [setSelectedId(item.id), setSelectedDay(route.params.item.days[item.id-1])]}
            >
                <Text style={{
                    fontSize: 16,
                    color: selectedId == item.id ? colors.background : colors.grey,
                    fontWeight: selectedId == item.id ? 'bold' : '400',
                }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const Activity = ({item}) => {
        return(
            <View style={{marginTop: 20}}>
                <View style={{flexDirection: "row", alignItems: 'center', paddingHorizontal: 20}}>
                    <View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5, 
                        backgroundColor: colors.text,
                        marginRight: 20
                    }}></View>
                    <Text style={{
                        fontSize: 20
                    }}>{item.startTime}</Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>   {item.name}</Text>
                    <Text style={{
                        fontSize: 20,
                    }}>   {item.optional}</Text>
                </View>
                <View style={{height: 50, paddingLeft: 50, flexDirection: 'row'}}>
                    <Ionicons name='ellipsis-vertical-outline' size={30} color={colors.grey} style={{marginTop: 10}} />
                    {item.name == 'Free time' ? <TouchableOpacity onPress={onSubmit} style={{width: 200, height:  40, marginTop: 10, marginLeft: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderRadius: 10}}><Text style={{color: colors.background, fontSize: 20, fontWeight: 'bold'}}>Check ideas</Text></TouchableOpacity> : <View />}

                </View>
                <View style={{flexDirection: "row", alignItems: 'center', paddingHorizontal: 20}}>
                    <View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5, 
                        marginRight: 20
                    }}></View>
                    <Text style={{
                        fontSize: 20,
                        marginTop: 10
                    }}> {item.endTime}</Text>
                </View>
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
            borderRadius: 30,
            marginTop: -30,
            backgroundColor: '#f3f3f2',
            padding: 10
        }}>

            <FlatList
                style={{
                    width: '100%',
                }}
                data={DATA}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={item => item.id}
            />

            <FlatList
                style={{
                    width: '100%',
                    height: 500
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

  },
});