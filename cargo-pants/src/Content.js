import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';

export default function Content() {


  data = [
    {
      id: 1,
      photo: require('../assets/ttc4.jpeg')
    },
    {
      id: 2,
      photo: require('../assets/ttc3.jpeg')
    },
  ]


  const Item = ({item}) => {
    return(
      <View style={{width: '100%'}}>
        <Image source={item.photo} resizeMode='center' style={{width: 450, height: 300, marginTop: 20}} />
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <FlatList
          style={{
              width: '100%',
          }}
          data={data}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});