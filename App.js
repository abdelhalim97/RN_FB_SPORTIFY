import { StatusBar } from 'expo-status-bar';
import Pages from './pages'
import {setCustomText,setCustomTextInput} from 'react-native-global-props';

export default function App() {
  const customTextInputProps = {
    underlineColorAndroid: 'rgba(0,0,0,0)',
    style: {
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor:'#AD9C9D',
      paddingVertical: 5,
      fontSize:20,
    }
  };
  const customTextProps = {
    style: {
      color:"#000",
      fontSize: 25,
    }
  };
  setCustomTextInput(customTextInputProps);
  setCustomText(customTextProps);
  return (
    <>
      <Pages/>
      <StatusBar style="auto" />
    </>
  );
}


