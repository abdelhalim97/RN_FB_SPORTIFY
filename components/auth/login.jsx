import { StyleSheet,TouchableOpacity,Text } from 'react-native'
import React,{useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {InputCustom, TouchbaleOpacityCustom} from '../reusable';
import {auth} from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import CircleContainer from '../reusable/circle-container';
import { useNavigation } from '@react-navigation/core';

 const Login = () => {
     const [form, setForm] = useState({email:'',password:''})
     const handleChangeLogIn=(value,key)=>setForm({...form,...{[key]:value}})
     const handleLogin =async()=>{
         try {
             await signInWithEmailAndPassword(auth,form.email,form.password)
         } catch (error) {
             console.log(error)
         }
     }
     const navigation = useNavigation()
     const dataInput=[
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
        autoFocus={data.id==='email'} pass={data.pass} keyboardType={data.keyboardType}
        onChangeText={text=>handleChangeLogIn(text,data.id)}/>
        )}
        <TouchbaleOpacityCustom text='Login' fnc={()=>handleLogin()} style={styles.btn}/>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={{alignItems:'center',marginTop:hp('2%')}}>
            <Text style={{fontSize:20,color:'#AD9C9D'}}>You don't have an account?</Text>
        </TouchableOpacity>
    </CircleContainer>
  )
}
export default Login
const styles = StyleSheet.create({
  btn:{
      marginTop:hp('3%'),
  },
});