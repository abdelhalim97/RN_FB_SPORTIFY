import { StyleSheet } from 'react-native'
import React,{useState} from 'react'
import CircleContainer from '../reusable/circle-container'
import { InputCustom, TouchbaleOpacityCustom } from '../reusable'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const resetPassword=async()=>{
        try {
            await sendPasswordResetEmail(auth,email)
        } catch (error) {
            console.log(error)
        }
      }
  return (
    <CircleContainer>
        <InputCustom placeHolder='Type your email here' autoFocus keyboardType='email-address'
        onChangeText={text=>setEmail(text)}/>
        <TouchbaleOpacityCustom text='Send Email' fnc={()=>resetPassword()} style={{marginTop:hp('3%')}} />
    </CircleContainer>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})