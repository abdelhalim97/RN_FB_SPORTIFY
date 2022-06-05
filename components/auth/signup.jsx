import { StyleSheet,TouchableOpacity,Text } from 'react-native'
import React,{useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CircleContainer from '../reusable/circle-container';
import {auth} from '../../firebase'
import { useNavigation } from '@react-navigation/core';
import { InputCustom, TouchbaleOpacityCustom } from '../reusable';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
const Signup = () => {
    const [form, setForm] = useState({email:'',password:''})
    const handleChangeLogIn=(value,key)=>setForm({...form,...{[key]:value}})
     const handleSignup =async()=>{
         try {
            const {user}=await createUserWithEmailAndPassword(auth,form.email,form.password)
            await updateProfile(user,{'displayName':name,})
         } catch (error) {
             console.log(error)
         }
     }
     const navigation = useNavigation()
    const dataInput=[
        {
            id:'name',
            placeHolder:'Name',
            pass:false,
           keyboardType:'default',
        },
        {
            id:'email',
            placeHolder:'Email',
            pass:false,
           keyboardType:'email-address',
        },
        {
           id:'password',
           placeHolder:'Password',
           pass:true,
           keyboardType:'default',
       }
    ]
  return (
    <CircleContainer>
        {dataInput.map(data=>
            <InputCustom key={data.id} placeHolder={data.placeHolder}
            autoFocus={data.id==='name'} pass={data.pass} keyboardType={data.keyboardType}
            onChangeText={text=>handleChangeLogIn(text,data.id)}/>
        )}
        <TouchbaleOpacityCustom text='Signup' fnc={()=>handleSignup()} style={styles.btn}/>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{alignItems:'center',marginTop:hp('2%')}}>
            <Text style={{fontSize:20,color:'#AD9C9D'}}>Already have an account?</Text>
        </TouchableOpacity>
    </CircleContainer>
  )
}

export default Signup

const styles = StyleSheet.create({
    btn:{
        marginTop:hp('3%'),
    },
})