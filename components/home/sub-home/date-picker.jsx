import { StyleSheet } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({timing,setTiming}) => {
  const onChange = (event, selectedDate) =>{
    const currentDate = selectedDate || timing.date;
    setTiming({...timing,
      show:0,
      date:{
        year:currentDate.getFullYear().toString(),
        month:currentDate.getMonth().toString(),
        day:currentDate.getDate().toString()
    }})
  }
  return (
      <DateTimePicker minimumDate={new Date()} onChange={onChange} value={new Date()} />
  )
}

export default DatePicker

const styles = StyleSheet.create({})