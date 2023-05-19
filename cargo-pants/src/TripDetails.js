import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import {useRoute } from '@react-navigation/native';

export default function TripDetails() {

    const route = useRoute();

  return (
    <View style={styles.container}>
      <Text>{route.params.item.startPoint}</Text>
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