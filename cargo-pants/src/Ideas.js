import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';


import { colors } from '../theme/Theme';

export default function Ideas() {


  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{
          color: colors.text,
          fontSize: 48,
          fontWeight: 'bold'
        }}>Trav</Text>
        <Text style={{
          color: colors.primary,
          fontSize: 48,
          fontWeight: 'bold'
        }}>corp</Text>
      </View>
      
      <Text style={{
        color: colors.grey_d,
        fontSize: 20,
        marginTop: 20
      }}>Stay In Touch!</Text>

      <View style={{
        width: '80%',
        height: 60,
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
      }}>
        <Text style={{
          color: colors.background,
          fontSize: 24,
          fontWeight: 'bold'
        }}>Let's go!</Text>
      </View>

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