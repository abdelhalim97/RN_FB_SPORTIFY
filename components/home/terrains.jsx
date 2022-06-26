import { StyleSheet, View,FlatList,SafeAreaView,StatusBar, Modal, Text, ActivityIndicator } from 'react-native'
import React,{useContext,useState} from 'react'
import { UserContext } from '../contexts/user-context'
import {Error, Navigation, TouchbaleIconCustom} from '../reusable'
import { faCalendarDay, faClock, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import {DatePicker, Map, TimeToPicker, TimeFromPicker} from './sub-home'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useFetchAllStadiums,useAddReservation, useFetchReservation} from '../../custom-hooks'

const Terrains = () => {
  const {user,setUser} = useContext(UserContext)
  const [rent, setRent] = useState(null)
  const [timing, setTiming] = useState({show:0,date:null,timeFrom:null,timeTo:null})
  const [errorDisplay, setErrorDisplay] = useState(false)
  const visible=rent?true:false
  const allStadiums = useFetchAllStadiums()
  const rentData = useFetchReservation(rent)
const handleCloseModal = ()=>{
  setRent(null)
  setErrorDisplay(false)
}
  const timeFromReserved = (parseInt(timing?.timeFrom?.hours)*60)+parseInt(timing?.timeFrom?.minutes)
  const timeToReserved = (parseInt(timing?.timeTo?.hours)*60)+parseInt(timing?.timeTo?.minutes)
  const handleRservation = ()=>{
    let test = true
    rentData.map(rentData=>{
      const timeFromDB = (parseInt(rentData.fromHours)*60)+parseInt(rentData.fromMinutes)
      const timeToDB = (parseInt(rentData.toHours)*60)+parseInt(rentData.toMinutes)
      const timeDBDiff=timeToDB+timeFromDB
      const timeReservatoinDiff=timeToReserved+timeFromReserved
    if(rentData.year===timing.date.year &&rentData.month===timing.date.month&& rentData.day===timing.date.day){
      if(timeDBDiff>timeReservatoinDiff&&timeToReserved<timeFromDB){true}
      else if(timeDBDiff<timeReservatoinDiff&&timeToDB<timeFromReserved){true}
      else{ test=false }
    }
    })
    if(test){
      useAddReservation(user,rent,timing)
      setTiming({show:0,date:null,timeFrom:null,timeTo:null})
      setRent(false)
      setErrorDisplay(false)
    }
    else{setErrorDisplay(true)}
  }

  
  const labels=[
    {id:0,
    text:`Date: ${timing?.date?.year} ${parseInt(timing?.date?.month)+1} ${timing?.date?.day} `,
    curObj:timing.date,
    show:1,
    icon:faCalendarDay,
  },
  {id:1,
    text:`Date from: ${timing?.timeFrom?.hours} ${timing?.timeFrom?.minutes} `,
    curObj:timing.timeFrom,
    show:2,
    icon:faClock,
  },
  {id:2,
    text:`Date to : ${timing?.timeTo?.hours} ${timing?.timeTo?.minutes} `,
    curObj:timing.timeTo,
    show:3,
    icon:faClock,
  },
  ]
  const btns=[
  {
    id:0,
    disabled:!timing.timeTo||!timing.timeFrom||!timing.date||!((parseInt(timing?.timeFrom?.hours)*60)+parseInt(timing?.timeFrom?.minutes) < (parseInt(timing?.timeTo?.hours)*60)+parseInt(timing?.timeTo?.minutes)),
    fnc:handleRservation,
    icon:faCheck,
  },
  {
    id:1,
    disabled:false,
    fnc:handleCloseModal,
    icon:faXmark,
  }
]

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.container1}>
      <Map userId={item.userId} cost={item.cost} lat={item.lat} lng={item.lng} name={item.name} setRent={setRent} uid={item.uid} />
    </View>
  </View>
);
  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" visible={visible} onRequestClose={() => {setRent(null);}}>
        <View style={{elevation:15}}><Text style={styles.name}>{rent?.name}</Text></View>
          <View style={{flex: 1,alignItems:'center',justifyContent:'flex-end',marginBottom:20}}>
            {labels.map(data=>
            <View key={data.id} style={styles.date} >
              <Text>{data.curObj&&data.text}</Text>
              <TouchbaleIconCustom fnc={()=>setTiming({...timing,show:data.show})} style={styles.icon}
              color={{color:'#fff'}} icon={data.icon} size={35} disabled={data.id===2&&!timing.timeFrom?true:false}/>
            </View>
              )}
            {timing.show===1&&<DatePicker timing={timing} setTiming={setTiming} />}
            {timing.show===2&&<TimeFromPicker timing={timing} setTiming={setTiming} />}
            {timing.show===3&&<TimeToPicker timing={timing} setTiming={setTiming} />}
          </View>
          {errorDisplay&&<View style={{marginBottom:20}}><Error text='Sorry this date already reserved' /></View>}
          <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:20}}>
            {btns.map(data=>
              <TouchbaleIconCustom key={data.id} fnc={data.fnc} style={styles.icon} color={{color:'#fff'}}
              icon={data.icon} size={35} disabled={data.disabled?true:false} />)}
          </View>
        </Modal>
        {console.log(allStadiums)}
        {!allStadiums?<ActivityIndicator size="large" color="#E18787" />:
        <FlatList data={allStadiums} keyExtractor={item => item.uid} renderItem={renderItem} />}
      <Navigation/>
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
  name:{textAlign:'center',borderBottomWidth:2,borderColor:'#AD9C9D',backgroundColor:'#fff',elevation:25},
  date:{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:25},
  icon:{
    borderRadius:30,
    color:'#fff',
    width:wp('9%'),
    padding:9,
    paddingHorizontal:25
  },
})