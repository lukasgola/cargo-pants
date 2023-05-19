import { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';

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
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const [ placeSelected, setPlaceSelected ] = useState(null)

    const [origin, setOrigin] = useState({
        latitude: markers[0].latitude,
        longitude: markers[0].longitude
    })

    const [destination, setDestination] = useState({
        latitude: markers[1].latitude,
        longitude: markers[1].longitude
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
                    <Ionicons name='location' size={40} color={marker.type == 'restaurant' ? colors.secondary : colors.primary} />

                </Marker>
                    
            ))
        )
    }

    const markerClick = (marker) => {
        console.log(marker.id)
        setPlaceSelected(marker.id)
        setDestination({latitude: marker.latitude, longitude: marker.longitude})
        onPlaceSelected({latitude: marker.latitude, longitude: marker.longitude})
        //setItem(marker)
        //setDestination({latitude: marker.latitude, longitude: marker.longitude})
        //renderMapViewDirections()
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
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
    >
        {renderMarkers()}
        <MapViewDirections
            origin={origin}
            destination={destination}
            strokeWidth={3}
            strokeColor={colors.text}
            mode="WALKING"
            apikey='AIzaSyAW_vjG_Tr8kxNtZF7Iq6n72JF1Spi2RZE'
        />
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