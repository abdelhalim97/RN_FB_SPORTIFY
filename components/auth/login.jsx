import { StyleSheet,TouchableOpacity,Text } from 'react-native'
import React,{useState,useContext} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {InputCustom, TouchableOpacityCustom} from '../reusable';
import {auth} from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import CircleContainer from '../reusable/circle-container';
import { useNavigation } from '@react-navigation/core';
import GoogleAuth from './google-auth';
import { UserContext } from '../contexts/user-context'
 const Login = () => {
     const navigation = useNavigation()
     const [form, setForm] = useState({email:'',password:''})
     const {setUser} = useContext(UserContext)
     const handleChangeLogIn=(value,key)=>setForm({...form,...{[key]:value}})
     const handleLogin =async()=>{
         try {
            var {user} = await signInWithEmailAndPassword(auth,form.email,form.password)
         setUser(user)
         } catch (error) {
             console.log(error)
         }
        //  navigation.navigate('Terrains')
     }
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
        <TouchableOpacityCustom text='Login' fnc={()=>handleLogin()} style={styles.btn}/>
        {/* TODO: when the user connected but got out and get back to login page change the login 
        text detect with user */}
        <GoogleAuth/>
        <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')} style={{alignItems:'center',marginTop:hp('1%')}}>
            <Text style={{fontSize:20,color:'#AD9C9D'}}>Forgot password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={{alignItems:'center',marginTop:hp('1%')}}>
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