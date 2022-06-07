import { StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import { UserContext } from '../contexts/user-context'
const Terrains = () => {
const {user} = useContext(UserContext)

  return (
    <View>
      <Text>{user.email}</Text>
    </View>
  )
}

export default Terrains

const styles = StyleSheet.create({})