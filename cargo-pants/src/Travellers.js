import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';


import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/Theme';

import travellers from '../data/travellers'


export default function Travellers() {


    const navigation = useNavigation();

  const Item = ({item, navigation}) => {
    return(
      <View style={{
        width: '90%',
        height: 100,
        marginLeft: '5%',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: colors.background,
        flexDirection: 'row'
      }}
      //onPress={() => navigation.navigate('TripDetails', {item})}
      >
        
        <Image 
          source={item.photo} 
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            marginTop: 10,
            marginLeft: 10,
          }}
        />
        <View style={{marginLeft: 10}}>
          <View style={{
            width: 290,
            height: 100,
            justifyContent: 'space-between',
            padding: 10,
          }}>
            <View style={{flexDirection: 'row', height: 20}}>
              <Text style={{
                color: item.current ? colors.text : colors.grey_d,
                fontSize: 18,
                fontWeight: 'bold'
              }}>{item.firstName}</Text>
              <Text style={{
                color: item.current ? colors.text : colors.grey_d,
                fontSize: 18,
                fontWeight: '300'
              }}> {item.secondName}</Text>
              {item.guide ? <Text style={{
                color: "red",
                fontSize: 18,
                fontWeight: 'bold',
              }}> (Guide)</Text> : <View></View>}
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{
                width: '30%',
                height: 40,
                backgroundColor: '#f3f3f2',
                marginRight: '3%',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Ionicons name='call-outline' size={25} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: '30%',
                height: 40,
                backgroundColor: '#f3f3f2',
                marginRight: '3%',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Ionicons name='chatbubbles-outline' size={25} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: '30%',
                height: 40,
                backgroundColor: '#f3f3f2',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Ionicons name='location-outline' size={25} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
        

      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{
          width: '100%'
        }}
        data={travellers}
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