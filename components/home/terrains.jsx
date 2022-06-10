import { StyleSheet, View,FlatList,SafeAreaView,StatusBar, Modal, Text } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { UserContext } from '../contexts/user-context'
import { signOut } from 'firebase/auth'
import { ref,onValue } from 'firebase/database'
import { auth,db } from '../../firebase'
import {TouchbaleIconCustom} from '../reusable'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {DatePicker, Map} from './sub-home'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Terrains = () => {
  const [data, setData] = useState([])
  const {user,setUser} = useContext(UserContext)
  const [rent, setRent] = useState(null)
  const visible=rent?true:false
  console.log(visible)
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
    <View style={styles.container1}>
      <Map lat={item.lat} lng={item.lng} name={item.name} setRent={setRent} uid={item.uid} />
    </View>
  </View>
);
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setRent(null);
        }}>
          <DatePicker/>
        </Modal>
      <FlatList data={data} keyExtractor={item => item.uid} renderItem={renderItem} />
      <View style={{marginHorizontal: 16,marginVertical: 8}}>
        <TouchbaleIconCustom icon={faRightFromBracket} fnc={()=>handleLogout()} 
        style={styles.icon} color={{color:'#fff'}} size={35} />
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
    color:'#fff',
    width:wp('9%')
  },
})