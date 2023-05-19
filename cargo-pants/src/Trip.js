import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';


import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/Theme';

import trips from '../data/trips'


export default function Trip() {


    const navigation = useNavigation();

  const Item = ({item, navigation}) => {
    return(
      <TouchableOpacity style={{
        width: '90%',
        height: 100,
        marginLeft: '5%',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: colors.background,
        flexDirection: 'row'
      }}
      onPress={() => navigation.navigate('TripDetails', {item})}
      >
        <Image 
          source={{uri:item.photo}} 
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            marginTop: 10,
            marginLeft: 10,
            opacity: item.current ? 1 : 0.5
          }}
        />
        <View style={{marginLeft: 10}}>
          <Ionicons style={{position: 'absolute', left: 45, top: 35}} name='chevron-down-outline' size={25} color={item.current ? colors.primary : colors.grey} />
          <Ionicons style={{position: 'absolute', right: 80, top: 35}} name='chevron-down-outline' size={25} color={item.current ? colors.primary : colors.grey} />
          <View style={{
            width: 290,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
            <View style={{flexDirection: 'row', height: 50}}>
              <Text style={{
                color: item.current ? colors.text : colors.grey_d,
                fontSize: 18,
                fontWeight: 'bold'
              }}>{item.startPlace.city}</Text>
              <Text style={{
                color: item.current ? colors.text : colors.grey_d,
                fontSize: 18,
                fontWeight: '300'
              }}>, {item.startPlace.country}</Text>
            </View>
            <Text style={{
              color: item.current ? colors.text : colors.grey_d,
              fontSize: 18,
              fontWeight: '300',
              marginRight: 30,
              fontWeight: 'bold'
            }}>{item.firstDepartureDate}</Text>
          </View>
          <View style={{
            width: 290,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            paddingTop: 15
          }}>
            <View style={{flexDirection: 'row', height: 50}}>
              <Text style={{
                color: item.current ? colors.text : colors.grey_d,
                fontSize: 18,
                fontWeight: 'bold'
              }}>{item.endPlace.city}</Text>
              <Text style={{
                color: item.current ? colors.text : colors.grey_d,
                fontSize: 18,
                fontWeight: '300'
              }}>, {item.endPlace.country}</Text>
            </View>
            <Text style={{
              color: item.current ? colors.text : colors.grey_d,
              fontSize: 18,
              fontWeight: '300',
              marginRight: 30,
              fontWeight: 'bold'
            }}>{item.lastDepartureDate}</Text>
          </View>
        </View>
        

      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{
          width: '100%'
        }}
        data={trips}
        renderItem={({item}) => <Item item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});