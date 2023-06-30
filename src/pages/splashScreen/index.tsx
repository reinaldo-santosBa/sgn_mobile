import React from 'react'
import SplashScreen from '../../components/splashAnimations'
import * as Splash from 'expo-splash-screen'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/fullScreen.routes'

Splash.hideAsync()

type SplashScreensProps = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>

const SplashScreens: React.FC<SplashScreensProps> = ({ navigation }: SplashScreensProps) => {
  return (
    <SplashScreen
      navigation={navigation}
    />
  )
}

export default SplashScreens
