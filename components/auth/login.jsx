import { StyleSheet, View } from 'react-native'
import React,{useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {InputCustom, TouchbaleOpacityCustom} from '../reusable';

 const Login = () => {
     const [form, setForm] = useState({email:'',password:''})
     const handleChangeLogIn=(value,key)=>setForm({...form,...{[key]:value}})
     const dataInput=[
         {
             id:'email',
             text:'',
             placeHolder:'Email',
             pass:false,
            keyboardType:'email-address',
            //  value:email,
         },
         {
            id:'password',
            text:'',
            placeHolder:'Password',
            pass:true,
            keyboardType:'default',
           //  value:email,
        }
     ]
  return (
    <View style={styles.container}>
        <View style={styles.containerCircle}>
            <View style={styles.circle}>
                {dataInput.map(data=>
                <InputCustom key={data.id} placeHolder={data.placeHolder}
                autoFocus={data.id===0} pass={data.pass} keyboardType={data.keyboardType}
                onChangeText={text=>handleChangeLogIn(text,data.id)}/>
                )}
                <TouchbaleOpacityCustom text='Login' fnc={console.log('s')} style={styles.btn}/>
            </View>
        </View>
    </View>
  )
}
export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E18787',
    // #AD9C9D
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCircle:{
    backgroundColor:'#fff',
    borderRadius:500,
    width: wp('90%'),
    height:hp('53%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle:{
      backgroundColor:'#fff',
      borderRadius:500,
      width: wp('85%'),
      height:hp('50%'),
      borderWidth:5,
      borderColor:'#E18787',
      alignItems: 'center',
      justifyContent: 'center'
  },
  btn:{
      marginTop:hp('3%'),
  },
});