import { StyleSheet,TouchableOpacity,Text } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const TouchbaleIconCustom = (props) => {
  return (
    <TouchableOpacity onPress={props.fnc} style={[styles.to,props.style]}>
        <FontAwesomeIcon icon={props.icon} size={props.size}  style={props.color} />
        {props.text&&<Text style={props.color} >{' ' +props.text}</Text>}
    </TouchableOpacity>
  )
}

export default TouchbaleIconCustom

const styles = StyleSheet.create({
  to:{
    backgroundColor:'#E18787',flexDirection:'row',alignItems:'center',justifyContent:'center'
  }
})