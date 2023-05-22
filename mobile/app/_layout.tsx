import { styled } from "nativewind";
import { ImageBackground } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from "expo-status-bar";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";

import { 
  useFonts, 
  Roboto_400Regular, 
  Roboto_700Bold 
} from '@expo-google-fonts/roboto'

import {  
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'


const Styledstripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthemticate] = useState<null | boolean>(null)

  const [hasLoadeedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      setIsUserAuthemticate(!!token)
    })
  }, [])

  if(!hasLoadeedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground  
      source={blurBg} 
      className='bg-gray-900 relative flex-1'
      imageStyle={{ position: 'absolute', left: '-100%' }}
    > 
      <Styledstripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack 
        screenOptions={{ 
          headerShown: false, 
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade', 
        }} 
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}