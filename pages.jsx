import React,{useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Signup,ForgotPassword } from './components/auth';
import {Terrains} from './components/home'
import { UserContext } from './components/contexts/user-context';
const Pages = () => {
    const Stack = createNativeStackNavigator();
    const [user, setUser] = useState(null)
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
          <Stack.Screen name="Terrains" component={Terrains} options={{ headerShown:true }}/>
        </>
        }
      </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  )
}

export default Pages

