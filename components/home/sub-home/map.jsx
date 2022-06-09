import { StyleSheet, View } from 'react-native';
import React from 'react'
import MapView from 'react-native-maps';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Marker } from 'react-native-maps';

const Map = (props) => {
    const region = {
      latitude: parseFloat(props.lat),
      longitude: parseFloat(props.lng),
      latitudeDelta:0.00111,
      longitudeDelta: 0.00111}
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={region}>
        <Marker
        pinColor="orange"
        coordinate={region}
        title='title'
        description={props.name}
    />
        </MapView>
      
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: wp('90%'),
        height: hp('20%'),
      },
})