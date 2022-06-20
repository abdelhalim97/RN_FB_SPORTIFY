import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { UserContext } from '../contexts/user-context'
import { db } from '../../firebase';
import { onValue, push, ref, set } from 'firebase/database';
import { View } from 'react-native-web';
import { useNavigation } from '@react-navigation/core';

WebBrowser.maybeCompleteAuthSession();

const GoogleAuth = () => {
  const {setUser} = useContext(UserContext)
  const [dataUsers, setDataUsers] = useState([]);
  const [accessToken, setAccessToken] = useState();
  const navigation = useNavigation()
  useEffect(() => {
    onValue(ref(db,'users'),(snapshot)=>{
        setDataUsers([])
      const dataLocal = snapshot.val();
      if(dataLocal!==null){
        Object.values(dataLocal).map((d)=>{
            setDataUsers((oldArray)=>[...oldArray,d]);
          return 0
        })
      }
    })
}, [])
  const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId:'832258486032-jfr3eq7ap5oisq5v66blvkdt3ggh04es.apps.googleusercontent.com',
      androidClientId: '832258486032-k612bqp9ff5t1pn6qrkoucaa300rscbl.apps.googleusercontent.com',
      iosClientId:'832258486032-ig2hqt3b707j82ns2tn0e6bv97aou74i.apps.googleusercontent.com',
    });
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setAccessToken(response.authentication.accessToken);
      }
  }, [response])

  async function getUserData() {
    let test = false
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    userInfoResponse.json().then(user => {
    dataUsers.map(userDB=>userDB.email===user.email?test=true:null)
      if(!test){
        const newRef=ref(db,'users')
        const newUserRef=push(newRef)
        const newUserKey=newUserRef.key
        set(newUserRef,{
          uid:newUserKey,
          displayName:user.name,
          email:user.email,
          photoURL:user.id?user.picture:user.photoURL,
        })
      }
      setUser(user);
  navigation.navigate('Terrains')
    });
  }
  return (
    <TouchableOpacity style={styles.container} 
    disabled={!dataUsers}
    onPress={() => {
      accessToken ? getUserData() : promptAsync({showInRecents: true})
      }}>
        <FontAwesomeIcon icon={faGooglePlusSquare} size={35} color='#fff' />
      <Text style={{color:'#fff',padding:5}}>{accessToken ? "Connected Get In" : "Login"}</Text>
    </TouchableOpacity>
  )
}

export default GoogleAuth

const styles = StyleSheet.create({
    width: wp('65%'),
    container:{
      justifyContent:'center',
      width:wp('65%'),
      backgroundColor:'#AD9C9D',
    borderRadius:5,
    flexDirection:'row',
    alignItems:'center',
    marginTop:hp('1%')},
})