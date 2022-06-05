import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const TouchbaleOpacityCustom = (props) => {
  return (
      <TouchableOpacity onPress={props.fnc} style={[props.style ,styles.btn]}><Text style={{color:'#fff',fontSize:30}}>{props.text}</Text></TouchableOpacity>
  )
}

export default TouchbaleOpacityCustom

const styles = StyleSheet.create({
btn:{
    backgroundColor:'#E18787',
    width: wp('65%') ,
    borderRadius:20,
    alignItems:'center'
}
})