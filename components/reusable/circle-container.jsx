import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CircleContainer = ({children}) => {
  return (
    <View style={styles.container}>
        <View style={styles.containerCircle}>
            <View style={styles.circle}>
                {children}
            </View>
        </View>
    </View>
  )
}

export default CircleContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E18787',
        alignItems: 'center',
        justifyContent: 'center',
      },
      containerCircle:{
        backgroundColor:'#fff',
        borderRadius:500,
        width: wp('91%'),
        height:hp('48%'),
        alignItems: 'center',
        justifyContent: 'center',
      },
      circle:{
          backgroundColor:'#fff',
          borderRadius:500,
          width: wp('87%'),
          height:hp('46%'),
          borderWidth:5,
          borderColor:'#E18787',
          alignItems: 'center',
          justifyContent: 'center'
      },
})