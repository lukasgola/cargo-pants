import { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, TouchableOpacity } from 'react-native';

//Maps
import mapSettings from '../data/mapSettings';
import MapView, { Marker, PROVIDER_GOOGLE, Heatmap, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

//Theme
import { colors } from '../theme/Theme'
import { Ionicons } from '@expo/vector-icons';


import markers from '../data/markers';

export default function Map() {

    const mapRef = useRef();

    const DEFAULT_DELTA = {
        latitudeDelta: 0.1922,
        longitudeDelta: 0.1921,
    }

    const [ placeSelected, setPlaceSelected ] = useState(null)

    const [ distance, setDistance ] = useState(null);
    const [ duration, setDuration ] = useState(null);

    const [origin, setOrigin] = useState({
        latitude: 50.29761,
        longitude: 18.67658
    })

    const [destination, setDestination] = useState({
        latitude: null,
        longitude: null
    })


    const renderMarkers = () => {
        return(
            markers.map((marker) => (
                <Marker
                    key={marker.id}
                    coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude
                    }}
                    onPress={() => markerClick(marker)}
                >
                    <Ionicons name='location' size={40} color={marker.type == 'restaurant' ? colors.secondary : marker.type == 'sightseeing' ? colors.primary : "red"} />

                </Marker>
                    
            ))
        )
    }

    const [markerType, setMarkerType ] = useState(null);

    const markerClick = (marker) => {
        console.log(marker.id)
        setPlaceSelected(marker.id)
        setDestination({latitude: marker.latitude, longitude: marker.longitude})
        onPlaceSelected({latitude: marker.latitude, longitude: marker.longitude})
        setMarkerType(marker.type)
    }

    const moveTo = async (position) => {
        const camera = await mapRef.current.getCamera();
        if(camera){
            camera.center = position;
            mapRef.current.animateCamera(camera, {duration: 500})
        }
    }

    
    const onPlaceSelected = (details) => {
        const position = {
                latitude: details.latitude,
                longitude: details.longitude,
                latitudeDelta: DEFAULT_DELTA.latitudeDelta,
                longitudeDelta: DEFAULT_DELTA.longitudeDelta
        }
        moveTo(position)
    }


  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={{width: '100%', height: '100%'}} 
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapSettings}
        //onRegionChange={reg => setRegion(reg)}
        initialRegion={{
            latitude: 50.29761,
            longitude: 18.67658,
            latitudeDelta: DEFAULT_DELTA.latitudeDelta,
            longitudeDelta: DEFAULT_DELTA.longitudeDelta
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        //onPress={() => setDestination({latitude: null, longitude: null})}
    >
        {renderMarkers()}

        {destination.latitude != null ? 
        <MapViewDirections
            origin={origin}
            destination={destination}
            strokeWidth={3}
            strokeColor={colors.text}
            mode="WALKING"
            apikey='AIzaSyAW_vjG_Tr8kxNtZF7Iq6n72JF1Spi2RZE'
            onReady={result => {

                setDistance(result.distance);
                setDuration(result.duration);

                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)

                mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                        right: 100,
                        bottom: 250,
                        left: 100,
                        top: 100,
                    },
                    animated: true
                })}}
        />
        : <View></View>}

        {destination.latitude != null ?
            <View style={{
                width: '80%',
                marginLeft: '10%',
                height: 100,
                position: 'absolute',
                bottom: 40,
                backgroundColor: colors.background,
                padding: 10,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.48,
                shadowRadius: 11.95,

                elevation: 18,

            }}>
                <TouchableOpacity 
                    onPress={() => setDestination({latitude: null, longitude: null})}
                    style={{position: 'absolute', width: 40, height: 40, zIndex: 1, right: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Ionicons name='close-outline' size={30} color={colors.text} />
                </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{markerType}</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Distance: {distance} km</Text>
            <Text style={{fontSize:16}}>Duration: {duration} min.</Text>
            </View> :
            <View></View>
        }
    </MapView>
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