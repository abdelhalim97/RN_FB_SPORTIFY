import { StyleSheet } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeToPicker = ({timing,setTiming}) => {
  const onChange = (event, selectedDate) =>{
    const currentDate = selectedDate || timing.date;
    setTiming({...timing,
      show:0,
      timeTo:{
        hours:currentDate.getHours().toString(),
        minutes:currentDate.getMinutes().toString(),
    }})
  }
  return (
      <DateTimePicker mode="time" value={new Date()} is24Hour={true} onChange={onChange}/>
  )
}

export default TimeToPicker

const styles = StyleSheet.create({})