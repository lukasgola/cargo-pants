import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';

export default function Travellers() {


  return (
    <View style={styles.container}>
      <Text>Travellers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});