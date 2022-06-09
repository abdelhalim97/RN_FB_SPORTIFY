import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/user-context'


WebBrowser.maybeCompleteAuthSession();

const GoogleAuth = () => {
  const {setUser} = useContext(UserContext)
  const navigation = useNavigation()
  const [accessToken, setAccessToken] = useState();
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
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });
    userInfoResponse.json().then(data => {
      setUser(data);
    });
    // navigation.navigate('Terrains')
  }
  return (
    <TouchableOpacity style={styles.container} 
    // disabled={!request}
    onPress={() => {
      accessToken ? getUserData() : promptAsync({showInRecents: true})
      }}>
      <FontAwesomeIcon icon={faGooglePlusSquare} size={35} color='#fff'/>
      <Text style={{color:'#fff',padding:5}}>{accessToken ? "Get User Data" : "Login"}</Text>
    </TouchableOpacity>
  )
}

export default GoogleAuth

const styles = StyleSheet.create({
    width: wp('65%'),
    container:{backgroundColor:'#AD9C9D',
    borderRadius:5,
    flexDirection:'row',
    alignItems:'center',
    marginTop:hp('1%')},
})