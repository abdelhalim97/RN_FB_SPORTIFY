import { StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const TouchbaleIconCustom = (props) => {
  return (
    <TouchableOpacity style={{backgroundColor:'#E18787',width:wp('9%')}}>
        <FontAwesomeIcon icon={props.icon} size={35} onPress={props.fnc} style={{color:'#fff'}} />
    </TouchableOpacity>
  )
}

export default TouchbaleIconCustom

const styles = StyleSheet.create({})