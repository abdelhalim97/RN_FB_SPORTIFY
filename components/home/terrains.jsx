import { StyleSheet, View,FlatList,SafeAreaView,StatusBar, Modal, Text } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { UserContext } from '../contexts/user-context'
import { signOut } from 'firebase/auth'
import { ref,onValue } from 'firebase/database'
import { auth,db } from '../../firebase'
import {TouchbaleIconCustom} from '../reusable'
import { faCalendarDay, faRightFromBracket, faClock, faBook, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import {DatePicker, Map, TimeToPicker, TimeFromPicker} from './sub-home'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Terrains = () => {
  const [data, setData] = useState([])
  const {user,setUser} = useContext(UserContext)
  const [rent, setRent] = useState(null)
  const [timing, setTiming] = useState({show:0,date:null,timeFrom:null,timeTo:null})
  const visible=rent?true:false
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
const labels=[
  {id:0,
  text:`Date: ${timing?.date?.year} ${timing?.date?.month} ${timing?.date?.day} `,
  show:1,
  icon:faCalendarDay,
},
{id:1,
  text:`Date from: ${timing?.timeFrom?.hours} ${timing?.timeFrom?.minutes} `,
  show:2,
  icon:faClock,
},
{id:2,
  text:`Date to : ${timing?.timeTo?.hours} ${timing?.timeTo?.minutes} `,
  show:3,
  icon:faClock,
},
]
const handleBook = ()=>{
  console.log('done')
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
        transparent={false}
        visible={visible}
        onRequestClose={() => {
          setRent(null);
        }}>
          <View style={{flex: 1,alignItems:'center',justifyContent:'flex-end',marginBottom:20}}>
            {labels.map(data=>
              <View key={data.id} style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:25}} >
              <Text>{data.text}</Text>
              <TouchbaleIconCustom fnc={()=>setTiming({...timing,show:data.show})} style={styles.icon}
              color={{color:'#fff'}} icon={data.icon} size={35} disabled={data.id===2&&!timing.timeFrom?true:false}/>
            </View>
              )}
            {timing.show===1&&<DatePicker timing={timing} setTiming={setTiming} />}
            {timing.show===2&&<TimeFromPicker timing={timing} setTiming={setTiming} />}
            {timing.show===3&&<TimeToPicker timing={timing} setTiming={setTiming} />}
          </View>
          <TouchbaleIconCustom fcn={()=>handleBook()} style={styles.icon} color={{color:'#fff'}} icon={faCheck} size={35}
          disabled={timing.timeFrom?.hours>timing.timeTo?.hours||(timing?.timeFrom?.hours===timing?.timeTo?.hours&&timing?.timeFrom?.minutes>=timing?.timeTo?.minutes)?true:false}//wakteh disbled
          />
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
    borderRadius:30,
    color:'#fff',
    width:wp('9%'),
    padding:9,
    paddingHorizontal:25
  },
})