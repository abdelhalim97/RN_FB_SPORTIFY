import { StatusBar } from 'expo-status-bar';
import Pages from './pages'
import {setCustomText} from 'react-native-global-props';

export default function App() {
  const customTextProps = {
    style: {
      color:"#000",
      fontSize: 25,
    }
  };
  setCustomText(customTextProps);
  return (
    <>
      <Pages/>
      <StatusBar style="auto" />
    </>
  );
}


