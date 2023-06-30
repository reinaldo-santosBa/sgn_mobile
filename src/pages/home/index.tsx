import React, { useContext, useEffect } from 'react'
import Container from '../../components/container'
import FlatListImage from '../../components/flatListImage'
import ScrollViewMenu from '../../components/menu/ScrollViewMenu'
import { Alert, BackHandler } from 'react-native'
import FlatButtonExitHome from '../../components/FlatButtonExit'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AuthContext } from '../../contexts/contextApi'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../routes/fullScreen.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true
  })
})

const Home: React.FC = () => {
  const {
    version,
    url
  } = useContext(AuthContext)
  type FullNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'MovDiaria'
  >;

  const navigation = useNavigation<FullNavigationProp>()
  useEffect(() => {
    (
      async () => {
        console.log('====================================')
        alert((await Notifications.getExpoPushTokenAsync()).data)
        console.log('====================================')
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
          const tokenExpo = (await Notifications.getExpoPushTokenAsync()).data
          const user = await AsyncStorage.getItem('user')
          alert(tokenExpo)
          axios.patch(`${url}${version}/usuario/setTokenApp`, {
            USUA_SIGLA: user,
            USUA_APP_TOKEN: tokenExpo
          })
            .then(() => {
              console.log('====================================')
              console.log(tokenExpo)
              console.log('====================================')
            })
            .catch((e) => {
              console.log('====================================')
              console.log(e.response)
              console.log('====================================')
            })
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
        }
      }
    )()
  }, [])
  const backAction = () => {
    Alert.alert('Atenção!', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'SIM',
        onPress: () => {
          navigation.navigate('Login')
          BackHandler.exitApp()
        }
      }
    ])
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction)
  }, [])

  return (
    <Container>

      <FlatButtonExitHome/>

      <FlatListImage/>

      <ScrollViewMenu/>

    </Container>
  )
}

export default Home
