import { StyleSheet, View } from 'react-native'
import React,{useContext, useEffect} from 'react'
import TouchbaleIconCustom from './touchbale-icon-custom'
import { faHome, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../contexts/user-context'
import { useNavigation } from '@react-navigation/core';

const Navigation = () => {
    const {user,setUser} = useContext(UserContext)
    const navigation = useNavigation()
    useEffect(() => {
        if(user===null)
        navigation.navigate('Login')
    }, [user])
    const handleLogout=async()=>{
        setUser(null)
        await signOut(auth)
      }
  return (
    <View style={{padding:5,paddingTop: 8,backgroundColor:'#E18787',flexDirection:'row',justifyContent:'space-between'}}>
        <TouchbaleIconCustom icon={faHome} fnc={()=>navigation.navigate('Terrains')} 
        style={styles.icon} color={{color:'#fff'}} size={35} />
        {user?<TouchbaleIconCustom icon={faRightFromBracket} fnc={()=>{handleLogout()}} 
        style={styles.icon} color={{color:'#fff'}} size={35} />:
        <TouchbaleIconCustom icon={faUser} fnc={()=>navigation.navigate('Login')} 
        style={styles.icon} color={{color:'#fff'}} size={35} />
        }
      </View>
  )
}

export default Navigation

const styles = StyleSheet.create({})