import { StyleSheet, Text, View,FlatList,SafeAreaView,StatusBar } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { UserContext } from '../contexts/user-context'
import { signOut } from 'firebase/auth'
import { ref,onValue } from 'firebase/database'
import { auth,db } from '../../firebase'
import {TouchbaleIconCustom} from '../reusable'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {Map} from './sub-home'

const Terrains = () => {
  const [data, setData] = useState([])
  const {user,setUser} = useContext(UserContext)
  useEffect(() => {
    onValue(ref(db,'stadiums'),(snapshot)=>{
      setData([])
      const dataLocal = snapshot.val();
      if(dataLocal!==null){
        Object.values(dataLocal).map((d)=>{
          setData((oldArray)=>[...oldArray,d]);
          return 0
        })
      }
    })
}, [user])
  const handleLogout=async()=>{
  setUser(null)
  await signOut(auth)
}

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.name}</Text>
    <View style={styles.container1}>
      <Map lat={item.lat} lng={item.lng} name={item.name} />
    </View>
  </View>
);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={data} keyExtractor={item => item.uid} renderItem={renderItem} />
      <View style={{marginHorizontal: 16,marginVertical: 8}}>
        <TouchbaleIconCustom icon={faRightFromBracket} fnc={()=>handleLogout()} style={styles.icon}/>
      </View>
    </SafeAreaView>
  )
}

export default Terrains

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#AD9C9D',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  icon:{
    color:'#fff'
  },
})