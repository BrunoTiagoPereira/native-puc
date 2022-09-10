
import { NativeRouter, Route, Routes } from 'react-router-native';
import { UpdateView, HomeView, AddView} from './src/routes'
import {NativeBaseProvider, extendTheme} from 'native-base'
import { StatusBar } from 'expo-status-bar';

const theme = extendTheme({
  colors:{
    primary:{
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
    }
  }
})
export default function App() {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#fb923c" />
      <NativeBaseProvider theme={theme}>
        <NativeRouter>
          <Routes>
            <Route exact path="/" element={<HomeView/>}></Route>
            <Route exact path="/add" element={<AddView/>}></Route>
            <Route exact path="/update/:id" element={<UpdateView/>}></Route>
          </Routes>
        </NativeRouter>
      </NativeBaseProvider>
    </>
  );
}
