import { StyleSheet,TouchableOpacity,Text } from 'react-native'
import React,{useState,useContext} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CircleContainer from '../reusable/circle-container';
import {auth} from '../../firebase'
import { useNavigation } from '@react-navigation/core';
import { InputCustom, TouchableOpacityCustom } from '../reusable';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { UserContext } from '../contexts/user-context'
import { useAddUser } from '../../custom-hooks';

const Signup = () => {
    const navigation = useNavigation()
    const [form, setForm] = useState({email:'',password:'',name:''})
    const {setUser} = useContext(UserContext)
    const handleChangeLogIn=(value,key)=>setForm({...form,...{[key]:value}})
    const handleSignup =async()=>{
    try {
        var {user}=await createUserWithEmailAndPassword(auth,form.email,form.password)
        await updateProfile(user,{'displayName':form.name})
        useAddUser(user,form.name)
        setUser(user)
    } catch (error) {
        console.log(error)
    }
    navigation.navigate('Terrains')
    
}
    const dataInput=[
        {
            id:'name',
            placeHolder:'Name',
            pass:false,
           keyboardType:'default',
           style:styles.wpTopBot,
        },
        {
            id:'email',
            placeHolder:'Email',
            pass:false,
           keyboardType:'email-address',
           style:styles.width,
        },
        {
           id:'password',
           placeHolder:'Password',
           pass:true,
           keyboardType:'default',
           style:styles.widthCenter,
       }
    ]
  return (
    <CircleContainer>
        {dataInput.map(data=>
            <InputCustom key={data.id} placeHolder={data.placeHolder} style={data.style}
            autoFocus={data.id==='name'} pass={data.pass} keyboardType={data.keyboardType}
            onChangeText={text=>handleChangeLogIn(text,data.id)}/>
        )}
        <TouchableOpacityCustom text='Signup' fnc={()=>handleSignup()} style={styles.btn}/>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={[{alignItems:'center',marginTop:hp('2%')},styles.wpTopBot]}>
            <Text style={{textAlign:'center',fontSize:20,color:'#AD9C9D'}}>Already have an account?</Text>
        </TouchableOpacity>
    </CircleContainer>
  )
}

export default Signup

const styles = StyleSheet.create({
    btn:{
        marginTop:hp('3%'),
    },
    width:{width:wp('60%')},
    widthCenter:{width:wp('65%')},

    wpTopBot:{
        width:wp('55%')
      },
})