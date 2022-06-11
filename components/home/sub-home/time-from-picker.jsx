import { StyleSheet } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeFromPicker = ({timing,setTiming}) => {
  const onChange = (event, selectedDate) =>{
    const currentDate = selectedDate || timing.date;
    setTiming({...timing,
      show:0,
      timeFrom:{
        hours:currentDate.getHours().toString(),
        minutes:currentDate.getMinutes().toString(),
    }})
  }
  return (
    <>
      <DateTimePicker mode="time" value={new Date()} is24Hour={true} minimumDate={new Date()} onChange={onChange}/>
    </>
  )
}

export default TimeFromPicker

const styles = StyleSheet.create({})