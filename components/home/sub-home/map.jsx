import { StyleSheet, View, Text } from 'react-native';
import React, { useContext } from 'react'
import MapView from 'react-native-maps';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Marker } from 'react-native-maps';
import { TouchbaleIconCustom } from '../../reusable';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../contexts/user-context';

const Map = (props) => {
    const {user} = useContext(UserContext)
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
          title={props.name}
          description={props.name}/>
      </MapView>
      <View style={styles.title}>
        <Text style={{color:'#E18787'}}>{props.name}</Text>
      </View>
      <TouchbaleIconCustom style={styles.booking} text='rent' size={20} disabled={!user}
       icon={faFutbol} fnc={()=>props.setRent(props)} color={{color:'#E18787'}}/>
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
      title:{
        position: "absolute",
        top: hp('0%'),
        left:wp('0%'),
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius:5
      },
      booking:{
        color:'#E18787',
        fontWeight:'bold',
        position: "absolute",
        bot: hp('0%'),
        right:wp('-1%'),
        width:wp('20%'),
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius:9,
      }
})