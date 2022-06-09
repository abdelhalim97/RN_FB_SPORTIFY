import React,{useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Signup,ForgotPassword } from './components/auth';
import {Terrains} from './components/home'
import { UserContext } from './components/contexts/user-context';
const Pages = () => {
    const Stack = createNativeStackNavigator();
    const [user, setUser] = useState(null)
    // const userData = setUser(user)
    // useEffect(() => {
    //   setUser(userData)
    // }, [user])
    
  return (
    <NavigationContainer>
      <UserContext.Provider value={{user,setUser}}>
      <Stack.Navigator>
        {user===null?
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown:false }}/>
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown:false }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown:true }}/>
        </>
        :
        <>
          <Stack.Screen name="Terrains" component={Terrains} options={{ headerShown:false }}/>
        </>
        }
      </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  )
}

export default Pages

