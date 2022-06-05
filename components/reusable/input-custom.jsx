import { StyleSheet, TextInput } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const InputCustom = (props) => {
  return (
    <>
      <TextInput  style={{color:"#000",width:wp('65%')}}
      maxLength={300} secureTextEntry={props.pass} placeholder={props.placeHolder}
      {...props} keyboardType={props.keyboardType}/>
    </>
  )
}

export default InputCustom

const styles = StyleSheet.create({})