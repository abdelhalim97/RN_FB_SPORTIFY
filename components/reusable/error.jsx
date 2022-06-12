import { View, Text } from 'react-native'
import React from 'react'

const Error = (props) => {
  return (
    <>
      <Text style={{textAlign:'center',color:'red'}} >{props.text}</Text>
    </>
  )
}

export default Error    