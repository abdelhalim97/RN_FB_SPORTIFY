import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = () => {
  return (
    <View style={{flex: 1}} >
        <DateTimePicker value={new Date()}/>
        <DateTimePicker mode="time" value={new Date()}/>
    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({})